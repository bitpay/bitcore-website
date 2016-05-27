# I Made This

<div id="i-made-this-container" align="center">
  <img src="/images/guides/i-made-this/picturesinboxes-imadethis.jpg" />
  <p>
    Courtesy of <a href="http://www.picturesinboxes.com/2014/01/01/internet/">
      picturesinboxes
    </a>
  </p>
</div>

In this tutorial, we will build a desktop app that timestamps original files into the blockchain by including their unique hashes as part of the [OP_RETURN](http://bitcoin.stackexchange.com/questions/29554/explanation-of-what-an-op-return-transaction-looks-like) data of bitcoin transactions. The timestamps will serve as immutable proof that the files existed at a certain point in time, which can be used to demonstrate ownership of original content. You can [view the completed project files on GitHub](https://github.com/bitpay/i-made-this).




#### How it works
1. The user uploads a file via the desktop app.
2. The app hashes the file and asks Bitcore node whether the file has already been timestamped in the blockchain.
3. If the file has not yet been timestamped, the app generates a new BTC address and displays that address to the user in the form of a QR code, prompting the user to send a small amount of BTC to that address.
4. Once the user's BTC arrives at the address, your Bitcore node utilizes the received bitcoin to broadcast a new transaction with the file hash included, serving as a permanent timestamp in the blockchain.

#### What we will use

1. A [Bitcore](http://bitcore.io/) node to communicate with the blockchain
2. A custom Bitcore service to extend your Bitcore node so that it can timestamp files
3. [Electron](http://electron.atom.io) and [AngularJS](https://angularjs.org/) to serve as the Desktop UI to communicate with your Bitcore server. (The details of Electron and AngularJS will not be covered as part of this tutorial.)

The final app will look like this:

<div align="center">
  <img src="/images/guides/i-made-this/screenshot.png" />
</div>


### Starting your project

Create a new directory for your project:

```
mkdir i-made-this
cd i-made-this

```

### Setting up your Bitcore node
To set up your Bitcore node, [follow the instructions in this guide](/guides/full-node). Be sure to configure your Bitcore node to run on [testnet](https://en.bitcoin.it/wiki/Testnet) to avoid spending real bitcoins during development. Also, ensure you are running Node v0.12 or v4.2 LTS.

Start your new Bitcore node from within the newly created `mynode` directory (the start command must always be executed from within the `mynode` directory):

```
cd mynode
bitcored
```

You should now see your Bitcore node begin to download the testnet blockchain (this can take up to 1 hour):
```
[2015-10-21T22:53:25.974Z] info: Starting bitcoind
[2015-10-21T22:53:27.991Z] info: Bitcoin Daemon Ready
[2015-10-21T22:53:27.992Z] info: Starting db
[2015-10-21T22:53:28.004Z] info: Bitcoin Database Ready
[2015-10-21T22:53:28.005Z] info: Starting address
[2015-10-21T22:53:28.005Z] info: Starting web
[2015-10-21T22:53:28.040Z] info: Bitcore Node ready
[2015-10-21T22:53:29.994Z] info: Bitcoin Height: 16 Percentage: 0.000008310586963489186
[2015-10-21T22:53:30.999Z] info: Bitcoin Height: 64 Percentage: 0.00003177577309543267
[2015-10-21T22:53:32.002Z] info: Bitcoin Height: 112 Percentage: 0.000055240951041923836
```

### Extending your Bitcore node with a custom service

To create your custom Bitcore timestamping service, create a new `stampingservice` directory in your project root:

```
cd ~/i-made-this
mkdir stampingservice
cd stampingservice
nano index.js
```

We will need several Node.js modules:
- async - For asynchronous workflows
- levelup - Interface for storing data
- leveldown - Bindings to LevelDB
- mkdirp - Creating directories
- bitcore-lib - For working with bitcoin data

Install the dependencies to your `stampingservice` with:
```
npm install async levelup leveldown mkdirp bitcore-lib --save
```

Place the following boilerplate code into `index.js`:

```javascript
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var async = require('async');
var levelup = require('levelup');
var leveldown = require('leveldown');
var mkdirp = require('mkdirp');
var bitcore = require('bitcore-lib');
var BufferUtil = bitcore.util.buffer;
var Networks = bitcore.Networks;
var Block = bitcore.Block;
var $ = bitcore.util.preconditions;

function enableCors(response) {
  // A convenience function to ensure
  // the response object supports cross-origin requests
  response.set('Access-Control-Allow-Origin','*');
  response.set('Access-Control-Allow-Methods','POST, GET, OPTIONS, PUT');
  response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
}

function StampingService(options) {
  EventEmitter.call(this);
  this.node = options.node;

  $.checkState(this.node.network, 'Node is expected to have a "network" property');
  this.network = this.node.network;

  this.log = this.node.log;
}
util.inherits(StampingService, EventEmitter);

StampingService.dependencies = ['bitcoind'];

StampingService.prototype.getAPIMethods = function(){
  return [];
}

StampingService.prototype.getPublishEvents = function(){
  return [];
}

StampingService.prototype.getRoutePrefix = function() {
  return 'stampingservice';
}

StampingService.prototype.start = function(callback) {
  setImmediate(callback);
}

StampingService.prototype.stop = function(callback) {
  setImmediate(callback);
}

module.exports = StampingService;
```

#### Checking for previous timestamps

To check whether a file has been previously timestamped in the blockchain we need to add several methods to `index.js` to keep our database is sync with the bitcoin block chain. Because there can be block reorganizations where the chain can go into a different direction, we will need to make sure that all our operations are reversable. The effects of each block will commited to our database atomically. We can then connect and disconnect blocks into the chain.

We will need to be able to:
- Setup a LevelDB database
- Record our current position in the chain
- Parse a block for the data of interest, in this case OP_RETURN data
- Connect a new block to the chain
- Disconnect the current tip from the chain
- Walk the chain, and verify it is continuous
- Lookup the data that we've stored


To setup the LevelDB database, we will first establish the path of the database, with a helper method:

```javascript
StampingService.prototype._setDataPath = function() {
  $.checkState(this.node.services.bitcoind.spawn.datadir, 'bitcoind is expected to have a "spawn.datadir" property');
  var datadir = this.node.services.bitcoind.spawn.datadir;
  if (this.node.network === Networks.livenet) {
    this.dataPath = datadir + '/bitcore-stamps.db';
  } else if (this.node.network === Networks.testnet) {
    if (this.node.network.regtestEnabled) {
      this.dataPath = datadir + '/regtest/bitcore-stamps.db';
    } else {
      this.dataPath = datadir + '/testnet3/bitcore-stamps.db';
    }
  } else {
    throw new Error('Unknown network: ' + this.network);
  }
};
```

And then call this function at construction and setup levelup, and other variables needed:
```javascript
function StampingService(options) {
  //...
  this._setDataPath();
  this.levelupStore = leveldown;
  if (options.store) {
    this.levelupStore = options.store;
  }
  //...
}
util.inherits(StampingService, EventEmitter);
```

And then in our start function, and some additional logic:
```javascript
StampingService.prototype.start = function(callback) {
  if (!fs.existsSync(this.dataPath)) {
    mkdirp.sync(this.dataPath);
  }

  this.store = levelup(this.dataPath, { db: this.levelupStore });
};
```

And some code to close the database on shutdown:
```javascript
StampingService.prototype.stop = function(callback) {
    self.store.close(callback);
};
```

We should now be able to open and close the levelup database to store our data.

Next we will go into how we can keep our database is sync with the blockchain. Let's start by
working on the method that will actually parse the block and store and remove the data. The blockHandler
method is included below. Add this method to `index.js`.

```javascript
StampingService.prototype.blockHandler = function(block, add, callback) {
  var self = this;

  var operations = [];

  // Update tip
  var tipHash = add ? new Buffer(block.hash, 'hex') : BufferUtil.reverse(block.header.prevHash);
  operations.push({
    type: 'put',
    key: StampingService.PREFIX_TIP,
    value: tipHash
  });

  var txs = block.transactions;
  var height = block.__height;

  // Loop through every transaction in the block
  var transactionLength = txs.length;
  for (var i = 0; i < transactionLength; i++) {
    var tx = txs[i];
    var txid = tx.id;
    var outputs = tx.outputs;
    var outputScriptHashes = {};
    var outputLength = outputs.length;

    // Loop through every output in the transaction
    for (var outputIndex = 0; outputIndex < outputLength; outputIndex++) {
      var output = outputs[outputIndex];
      var script = output.script;

      if(!script || !script.isDataOut()) {
        self.log.debug('Invalid script');
        continue;
      }

      // If we find outputs with script data, we need to store the transaction into level db
      var scriptData = script.getData().toString('hex');
      self.log.info('scriptData added to index:', scriptData);

      // Prepend a prefix to the key to prevent namespacing collisions
      // Append the block height, txid, and outputIndex for ordering purposes (ensures transactions will be returned
      // in the order they occured)
      var key = [StampingService.PREFIX, scriptData, height, txid, outputIndex].join('-');
      var value = block.hash;

      var action = add ? 'put' : 'del';
      var operation = {
        type: action,
        key: key,
        value: value
      };

      operations.push(operation);
    }
  }

  self.log.debug('Updating the database with operations', operations);
  self.store.batch(operations, callback);
}
```

Now we will add two methods that will call `blockHandler`:

```javascript
StampingService.prototype.connectBlock = function(block, callback) {
  this.log.info('adding block', block.hash);
  this.blockHandler(block, true, callback);
};

StampingService.prototype.disconnectBlock = function(block, callback) {
  this.log.info('disconnecting block', block.hash);
  this.blockHandler(block, false, callback);
};

```

Now that we can add and remove blocks from the database, we need to be able to
get the current tip of the chain, and then connect and remove blocks from the chain.

First lets get the code to load and remove the tip of the chain.

**Note**: Ideally to ensure that we always have access to the block data that we have
written, we would also keep a record of the latest blocks locally *(without relying on bitcoind)*.
Here we attempt several times and then give up.

```javascript
StampingService.prototype.loadTip = function(callback) {
  var self = this;

  var options = {
    keyEncoding: 'binary',
    valueEncoding: 'binary'
  };

  self.store.get(StampingService.PREFIX_TIP, options, function(err, tipData) {
    if(err && err instanceof levelup.errors.NotFoundError) {
      self.tip = self.genesis;
      self.tip.__height = 0;
      self.connectBlock(self.genesis, function(err) {
        if(err) {
          return callback(err);
        }

        self.emit('addblock', self.genesis);
        callback();
      });
      return;
    } else if(err) {
      return callback(err);
    }

    var hash = tipData.toString('hex');

    var times = 0;
    async.retry({times: 3, interval: self.retryInterval}, function(done) {
      self.node.getBlock(hash, function(err, tip) {
        if(err) {
          times++;
          self.log.warn('Bitcoind does not have our tip (' + hash + '). Bitcoind may have crashed and needs to catch up.');
          if(times < 3) {
            self.log.warn('Retrying in ' + (self.retryInterval / 1000) + ' seconds.');
          }
          return done(err);
        }

        done(null, tip);
      });
    }, function(err, tip) {
      if(err) {
        self.log.warn('Giving up after 3 tries. Please report this bug to https://github.com/bitpay/bitcore-node/issues');
        self.log.warn('Please reindex your database.');
        return callback(err);
      }

      self.tip = tip;
      self.node.getBlockHeader(self.tip.hash, function(err, blockHeader) {
        if (err) {
          return callback(err);
        }
        if(!blockHeader) {
          return callback(new Error('Could not get height for tip.'));
        }
        self.tip.__height = blockHeader.height;
        callback();
      });

    });
  });
};

```

This method then needs to be called when we start:

```javascript
StampingService.prototype.start = function(callback) {
  // ...
  self.loadTip(function(err) {
    if (err) {
      return callback(err);
    }
    self.emit('ready');
    callback();
  });
};
```

We now also need to be able to remove the tip:

```javascript
StampingService.prototype.disconnectTip = function(done) {
  var self = this;

  var tip = self.tip;

  // TODO: expose prevHash as a string from bitcore
  var prevHash = BufferUtil.reverse(tip.header.prevHash).toString('hex');

  self.node.getBlock(prevHash, function(err, previousTip) {
    if (err) {
      done(err);
    }

    // Undo the related indexes for this block
    self.disconnectBlock(tip, function(err) {
      if (err) {
        return done(err);
      }

      // Set the new tip
      previousTip.__height = self.tip.__height - 1;
      self.tip = previousTip;
      self.emit('removeblock', tip);
      done();
    });
  });
};
```

Next we need a function that will take our current tip and advance the chain and verify that the chain continues. In the case that the chain does not continue, we will remove the current tip, and the try to advance the chain again.

```javascript
StampingService.prototype.sync = function() {
  var self = this;

  if (self.bitcoindSyncing || self.node.stopping || !self.tip) {
    return;
  }

  self.bitcoindSyncing = true;

  var height;

  async.whilst(function() {
    if (self.node.stopping) {
      return false;
    }
    height = self.tip.__height;
    return height < self.node.services.bitcoind.height;
  }, function(done) {
    self.node.getRawBlock(height + 1, function(err, blockBuffer) {
      if (err) {
        return done(err);
      }

      var block = Block.fromBuffer(blockBuffer);

      // TODO: expose prevHash as a string from bitcore
      var prevHash = BufferUtil.reverse(block.header.prevHash).toString('hex');

      if (prevHash === self.tip.hash) {

        // This block appends to the current chain tip and we can
        // immediately add it to the chain and create indexes.

        // Populate height
        block.__height = self.tip.__height + 1;

        // Create indexes
        self.connectBlock(block, function(err) {
          if (err) {
            return done(err);
          }
          self.tip = block;
          self.log.debug('Chain added block to main chain');
          self.emit('addblock', block);
          done();
        });
      } else {
        // This block doesn't progress the current tip, so we'll attempt
        // to rewind the chain to the common ancestor of the block and
        // then we can resume syncing.
        self.log.warn('Reorg detected! Current tip: ' + self.tip.hash);
        self.disconnectTip(function(err) {
          if(err) {
            return done(err);
          }
          self.log.warn('Disconnected current tip. New tip is ' + self.tip.hash);
          done();
        });
      }
    });
  }, function(err) {
    if (err) {
      Error.captureStackTrace(err);
      return self.node.emit('error', err);
    }

    if(self.node.stopping) {
      self.bitcoindSyncing = false;
      return;
    }

    self.node.isSynced(function(err, synced) {
      if (err) {
        Error.captureStackTrace(err);
        return self.node.emit('error', err);
      }

      if (synced) {
        self.bitcoindSyncing = false;
        self.node.emit('synced');
      } else {
        self.bitcoindSyncing = false;
      }
    });

  });

};
```

We now need to call the `sync` method when there is a new block and after we have loaded the chain tip from the database. We can do this by adding some code to the `start` method:
```javascript
StampingService.prototype.start = function(callback) {
  //...
  this.once('ready', function() {
    self.log.info('Bitcoin Database Ready');

    self.node.services.bitcoind.on('tip', function() {
      if(!self.node.stopping) {
        self.sync();
      }
    });
  });

  self.loadTip(function(err) {
    if (err) {
      return callback(err);
    }

    self.sync();
    self.emit('ready');
    callback();
  });
  //...
};
```

Now that the database will be kept in sync with the blockchain we can add a method to lookup the data stored.

The `lookupHash` method shown below will be called by the client-side code whenever a user uploads a file to
check whether that file has already been timestamped. This method will query the data that has
been stored by the blockHandler method above.

```javascript
StampingService.prototype.lookupHash = function(req, res, next) {
  /*
    This method is used to determine whether a file hash has
    already been included in the blockchain. We are querying data
    from level db that we previously stored into level db via the blockHanlder.
  */
  var self = this;
  enableCors(res);

  var hash = req.params.hash; // the hash of the uploaded file
  this.log.info('request for hash:', hash);
  var node = this.node;

  // Search level db for instances of this file hash
  // and put them in objArr
  var stream = self.store.createReadStream({
    gte: [StampingService.PREFIX, hash].join('-'),
    lt: [StampingService.PREFIX, hash].join('-') + '~'
  });

  var objArr = [];

  stream.on('data', function(data) {
    // Parse data as matches are found and push it
    // to the objArr
    data.key = data.key.split('-');
    var obj = {
      hash: data.value,
      height: data.key[2],
      txid: data.key[3],
      outputIndex: data.key[4]
    };
    objArr.push(obj);
  });

  var error;

  stream.on('error', function(streamError) {
    // Handle any errors during the search
    if (streamError) {
      error = streamError;
    }
  });

  stream.on('close', function() {
    if (error) {
      return res.send(500, error.message);
    } else if(!objArr.length) {
      return res.sendStatus(404);
    }

    // For each transaction that included our file hash, get additional
    // info from the blockchain about the transaction (such as the timestamp and source address).
    async.each(objArr, function(obj, eachCallback) {
      var txid = obj.txid;
      var includeMempool = true;

      node.log.info('getting details for txid:', txid);
      node.getDetailedTransaction(txid, function(err, transaction) {
        if (err){
          return eachCallback(err);
        }
        var address = transaction.inputs[0].address;

        obj.sourceAddress = address;
        obj.timestamp = transaction.blockTimestamp;
        return eachCallback();
      });
    }, function doneGrabbingTransactionData(err) {
      if (err){
        return res.send(500, err);
      }

      // Send back matches to the client
      res.send(objArr);
    });

  });
}

```

#### Monitoring BTC addresses

To determine whether the user has sent BTC to the address generated by the desktop client, we'll add the following method to `index.js`:

```javascript
StampingService.prototype.getAddressData = function(req, res, next) {
  /*
    This method is called by the client to determine whether a BTC address
    has recieved funds yet
  */
  var self = this;
  enableCors(res);
  var address = req.params.address;
  this.node.getAddressUnspentOutputs(address, {}, function(err, unspentOutputs) {
    if (err){
      return self.log('err', err);
    }
    self.log.info('Address data (' + address + '):', unspentOutputs);
    res.send(unspentOutputs);
  });
}
```

#### Creating transactions

To broadcast the transaction that includes the file hash, we need to add the following method to `index.js`:

```javascript
StampingService.prototype.sendTransaction = function(req, res, next){
  enableCors(res);
  var self = this;
  var serializedTransaction = req.params.transaction;

  this.node.sendTransaction(serializedTransaction, function(err) {
    if (err){
      self.log('error sending transaction', err);
      return res.send(500, err);
    }
    res.sendStatus(200);
  });
}
```

#### Registering api endpoints

In order for the client to query our custom Bitcore methods, we need to register those methods with Bitcore
by adding the following code to `index.js`:

```javascript
StampingService.prototype.setupRoutes = function(app) {
  app.get('/hash/:hash', this.lookupHash.bind(this));
  app.get('/address/:address', this.getAddressData.bind(this));
  app.get('/send/:transaction', this.sendTransaction.bind(this));
}
```

Symlink your `stampingservice` into the node_modules directory of `mynode`:

```
cd ~/i-made-this/mynode/node_modules
ln -s ~/i-made-this/stampingservice
```

And symlink the `bitcore-lib` module, to a locally shared version for development:

```
cd ~
git clone git@github.com:bitpay/bitcore-lib.git
cd bitcore-lib
npm install --production
cd ~/i-made-this/stampingservice/node_modules
ln -s ~/bitcore-lib
```

Add `stampingservice` as a dependency in `mynode/bitcore-node.json`:

```json
{
  "network": "testnet",
  "port": 3001,
  "services": [
    "bitcoind",
    "web",
    "stampingservice" //add this
  ]
}
```

Restart your Bitcore node, and visit [http://localhost:3001/stampingservice/hash/aCrAzYHaSh](http://localhost:3001/stampingservice/hash/aCrAzYHaSh) in your browser. If all went well, the server response will be "Not Found", indicating that 'aCrAzYHaSh' has never been included in the blockchain.

## Wiring the client-side app to your Bitcore endpoints

Since the focus of this tutorial is Bitcore, only Bitcore-specific client-side code
will be covered. The rest of the client code can be viewed in the [project repository on GitHub](https://github.com/bitpay/i-made-this).

To install the Bitcore client-side library, run:
`bower install bitcore-lib --save`

Include bitcore in your `index.html` file via a script tag:
```html
<script src="bower_components/bitcore-lib/bitcore-lib.js"></script>
```
Then require Bitcore globally via:

```javascript
bitcore = require('bitcore-lib');
```

#### Hashing the uploaded file

When a user uploads a file, we first need to hash the file client-side. This tutorial uses [ng-file-upload](https://github.com/danialfarid/ng-file-upload)'s
base64DataUrl to convert the file dataUrl to base64, which can then be used as an input to Bitcore's
Buffer class for hashing.

```javascript
function hashFile(file, cb){
  Upload.base64DataUrl(file).then(function(urls){
    var Buffer = bitcore.deps.Buffer;
    var data = new Buffer(urls, 'base64');
    var hash = bitcore.crypto.Hash.sha256sha256(data);
    var hashString = hash.toString('hex');
    return cb(hashString);
  });
}
```

After hashing the file and converting to a hex string, we are ready
to query our bitcore node to see if this file has already been stamped. In the code
below, we are sending a request to http://localhost:3001/stampingservice/hash/:fileHash,
which will trigger the lookupHash method we've configured on our Bitcore node:

```javascript
function isFileInBlockchain(fileHashString){
  // Asks bitcore-node if the hash of the uploaded file has been timestamped in
  // the blockchain before
  $http.get(bitcoreServiceBasePath + '/hash/' + fileHashString)
    .success(gotFile)

  function gotFile(data, statusCode){
    $scope.previousTimestamps = data;
    $scope.previousTimestamps = $scope.previousTimestamps.map(function(ts){
      // convert the integer timestamp to a date object for UI rendering
      ts.date = new Date(ts.timestamp*1000);
      return ts;
    });
  }

}
```

If the user chooses to timestamp the uploaded file, we'll need to generate
a new bitcoin address to which the user can send a small amount of Bitcoin, which will be used to fund the timestamping
transaction. An address can be generated with the following code:

```javascript
privateKey = new bitcore.PrivateKey();
var publicKey = new bitcore.PublicKey(privateKey);
$scope.address = new bitcore.Address(publicKey, bitcore.Networks.testnet).toString();
```

We can be notified when the user has sent funds to this address by polling
our Bitcore node via the [http://localhost:3001/stampingservice/address/:address]()
endpoint:

```javascript
function montiorAddress(address, cb){
  // Asks bitcore-node whether the input BTC address has received funds from the user
  function gotAddressInfo(data, statusCode){
    if(data.length){
      var unspentOutput = data[0];
      $interval.cancel(pollInterval);
      cb(unspentOutput);
    }
  }

  pollInterval = $interval(function(){
    console.log('montiorAddress interval called for address:', address);
    $http.get(bitcoreServiceBasePath + '/address/' + address)
      .success(gotAddressInfo)
  }, 1000); // poll every second
}
```
Once the user's BTC arrives at the generated address, we can now create a new transaction
to which we will attach the hash of the uploaded file.

```javascript
function timeStampFile(unspentOutput, privateKey){
  // Uses the BTC received from the user to create a new transaction object
  // that includes the hash of the uploaded file
  var UnspentOutput = bitcore.Transaction.UnspentOutput;
  var Transaction = bitcore.Transaction;
  var unspent2 = UnspentOutput(unspentOutput);

  // Let's create a transaction that sends all recieved BTC to a miner
  // (no coins will go to a change address)
  var transaction2 = Transaction();
  transaction2
    .from(unspent2)
    .fee(50000);

  // Append the hash of the file to the transaction
  transaction2.addOutput(new Transaction.Output({
    script: bitcore.Script.buildDataOut(fileHash, 'hex'),
    satoshis: 0
  }));

  // Sign transaction with the original private key that generated
  // the address to which the user sent BTC
  transaction2.sign(privateKey);
  $scope.transactionId = transaction2.id;
  var serializedTransaction = transaction2.checkedSerialize();

  sendTransaction(serializedTransaction);
}

function sendTransaction(serializedTransaction){
  // Asks bitcore-node to broadcast the timestamped transaction
  $http.get(bitcoreServiceBasePath + '/send/' + serializedTransaction)
    .success(sentTransaction);

  function sentTransaction(){
    $scope.stampSuccess = true;
    pendingFileHashes[fileHash] = {date: new Date()};
  }
}
```
## The End
That's it! Have questions about this tutorial? [Post them here](https://forum.bitcore.io).
You can also [view the completed project files on GitHub](https://github.com/bitpay/i-made-this).
