# I Made This

<div id="i-made-this-container" align="center">
  <img src="/src/images/guides/i-made-this/picturesinboxes-imadethis.jpg" />
  <p>
    Courtesy of <a href="http://www.picturesinboxes.com/2014/01/01/internet/">
      picturesinboxes
    </a>
  </p>
</div>

In this tutorial, we will build a desktop app that will timestamp original files into the blockchain by including their unique hashes as part of the [OP_RETURN](http://bitcoin.stackexchange.com/questions/29554/explanation-of-what-an-op-return-transaction-looks-like) data of bitcoin transactions. The timestamp will serve as immutable proof that the files existed at a certain point in time, which can be used to demonstrate ownership of original content. You can [view the completed project files on GitHub](https://github.com/bitpay/i-made-this).




#### How it works
1. The user uploads a file via the desktop app.
2. The app hashes the file and asks Bitcore node whether the file hash already been timestamped in the blockchain.
3. If the file has not yet been timestamped, the app generates a new BTC address and displays that address to the user in the form of a qrcode, prompting the user to send a small amount of BTC to that address.
4. Once the user's BTC arrives at the address, your Bitcore node utilizes the received bitcoin to broadcast a new transaction with the file hash included, serving as a permanent timestamp in the blockchain.

#### What we will use

1. A [Bitcore](http://bitcore.io/) node to communicate with the blockchain
2. A custom Bitcore service to extend your Bitcore node so that it can timestamp files
3. [Electron](http://electron.atom.io) and [AngularJS](https://angularjs.org/) to serve as the Desktop UI to communicate with your Bitcore server. (The details of Electron and AngularJS will not be covered as part of this tutorial.)

The final app will look like this:

<div align="center">
  <img src="/src/images/guides/i-made-this/screenshot.png" />
</div>


### Starting your project

Create a new directory for your project:

```
mkdir i-made-this
cd i-made-this

```

### Setting up your Bitcore node
To set up your Bitcore node, [follow the instructions in this guide](/guides/full-node). Be sure to configure your Bitcore node to run on [testnet](https://en.bitcoin.it/wiki/Testnet) to avoid spending real bitcoins during development. Also, ensure your version of Node.js is 12.0 or above.

Start your new Bitcore node from within the newly created `mynode` directory (the start command must always be executed from within the `mynode` directory):

```
cd mynode
bitcore start
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

Install async as a dependency to your `stampingservice` with:
```
npm install async --save
```

Place the following boilerplate code into `index.js`

```javascript
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var async = require('async');

// A prefix for our level db file hash keys to ensure there
// are no collisions the bitcore namespace (0-255 is reserved by bitcore)
var PREFIX = String.fromCharCode(0xff) + 'StampingService';

function enableCors(response){
  // A convenience function to ensure
  // the response object supports cross-origin requests
  response.set('Access-Control-Allow-Origin','*');
  response.set('Access-Control-Allow-Methods','POST, GET, OPTIONS, PUT');
  response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
}

function StampingService(options) {
  EventEmitter.call(this);
  this.node = options.node;
  this.data = {};
}
util.inherits(StampingService, EventEmitter);

StampingService.dependencies = ['bitcoind', 'db', 'web'];

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

To check whether a file has been previously timestamped in the blockchain we need to add 2 methods to `index.js`:

1. A blockHandler method to index any transactions containing OP_RETURN data as they come in from the bitcoin network
2. A lookupHash method to scan our indexed transactions for the hash of a specific file.

The blockHandler method is included below. Add this method to `index.js`.

```javascript
StampingService.prototype.blockHandler = function(block, add, callback) {
  /*

    This blockHandler is called whenever Bitcore node receives a new block from
    the Bitcoin network.

    Let's override the blockHandler to store transactions that have data
    embedded within them (these types of transactions may contain file hashes).

    The code below stores any transactions with scriptData into level db, a key-value
    store that ships with bitcore.

  */
  if (!add) {
    setImmediate(function() {
      callback(null, []);
    });
  } else {

    var operations = [];
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
          this.node.log.debug('Invalid script');
          continue;
        }

        // If we find outputs with script data, we need to store the transaction into level db
        var scriptData = script.getData().toString('hex');
        this.node.log.info('scriptData added to in-memory index:', scriptData);

        // Prepend a prefix to the key to prevent namespacing collisions
        // Append the block height, txid, and outputIndex for ordering purposes (ensures transactions will be returned
        // in the order they occured)
        var key = [PREFIX, scriptData, height, txid, outputIndex].join('-');
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
    setImmediate(function() {
      // store transactions with script data into level db
      callback(null, operations);
    });
  }
}

```


The lookupHash method shown below will be called by the client-side code whenever a user uploads a file to
check whether that file has already been timestamped. This method will query the data that has
been stored by the blockHanlder method above.

```javascript
StampingService.prototype.lookupHash = function(req, res, next) {
  /*
    This method is used to determine whether a file hash has
    already been included in the blockchain. We are querying data
    from level db that we previously stored into level db via the blockHanlder.
  */

  enableCors(res);

  var hash = req.params.hash; // the hash of the uploaded file
  var node = this.node;

  // Search level db for instances of this file hash
  // and put them in objArr
  var stream = this.node.services.db.store.createReadStream({
    gte: [PREFIX, hash].join('-'),
    lt: [PREFIX, hash].join('-') + '~'
  });

  var objArr = [];

  stream.on('data', function(data) {
      // Parse data as matches are found and push it
      // to the objArr
      data.key = data.key.split('-');
      obj = {
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
      return res.send(404);
    }

    // For each transaction that included our file hash, get additional
    // info from the blockchain about the transaction (such as the timestamp and source address).
    async.each(objArr, function(obj, eachCallback){
      var txid = obj.txid;
      var includeMempool = true;

      node.services.db.getTransactionWithBlockInfo(txid, includeMempool, function(err, transaction) {
        if(err){
          eachCallback(err);
        }

        var script = transaction.inputs[0].script;
        var address = script.toAddress(node.network).toString();

        obj.sourceAddress = address;
        obj.timestamp = transaction.__timestamp;
        return eachCallback();
      })
    }, function doneGrabbingTransactionData(err){
      if(err){
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
  enableCors(res);
  var addressService = this.node.services.address;
  var address = req.params.address;
  addressService.getUnspentOutputs(address, true, function(err, unspentOutputs) {
    if(err){
      console.log('err', err);
    }

    res.send(unspentOutputs);
  });
}
```

#### Creating transactions

To broadcast the transaction that includes the file hash, we need to add the following method to `index.js`:

```javascript
StampingService.prototype.sendTransaction = function(req, res, next){
  enableCors(res);
  var serializedTransaction = req.params.transaction;

  try {
    this.node.services.bitcoind.sendTransaction(serializedTransaction);
  } catch(err) {
    if(err){
      console.log('error sending transaction', err);
      return res.send(500, err);
    }
  }

  res.send(200);
}
```

#### Registering api endpoints

In order for the client to query our custom Bitcore methods, we need to register those methods with Bitcore
by adding the following code to `index.js`

```javascript
StampingService.prototype.setupRoutes = function(app) {
  app.get('/hash/:hash', this.lookupHash.bind(this));
  app.get('/address/:address', this.getAddressData.bind(this));
  app.get('/send/:transaction', this.sendTransaction.bind(this));
}
```

Symlink your `stampingservice` into the node_modules directory of `mynode`

```
cd ~/i-made-this/mynode/node_modules
ln -s ~/i-made-this/stampingservice
```

Add `StampingService` as a dependency in `mynode/bitcore-node.json`

```json
{
  "datadir": "./data",
  "network": "testnet",
  "port": 3001,
  "services": [
    "bitcoind",
    "db",
    "address",
    "web",
    "StampingService" //add this
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
privateKey1 = new bitcore.PrivateKey();
var publicKey = new bitcore.PublicKey(privateKey1);
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
function timeStampFile(unspentOutput, privateKey1){
  // Uses the BTC received from the user to create a new transaction object
  // that includes the hash of the uploaded file
  var UnspentOutput = bitcore.Transaction.UnspentOutput;
  var Transaction = bitcore.Transaction;
  var Address = bitcore.Address;

  var privateKey2 = new bitcore.PrivateKey();
  var publicKey2 = new bitcore.PublicKey(privateKey2);
  var change = new bitcore.Address(publicKey2, bitcore.Networks.testnet);

  changeAddress = change.toString();

  var unspent2 = UnspentOutput(unspentOutput);

  var transaction2 = Transaction();
  transaction2
    .from(unspent2)
    .fee(50000)
    .change(change);

  // Append the hash of the file to the transaction
  transaction2.addOutput(new Transaction.Output({
    script: bitcore.Script.buildDataOut(fileHash, 'hex'),
    satoshis: 0
  }));

  // Sign transaction with the original private key that generated
  // the address to which the user sent BTC
  transaction2.sign(privateKey1);
  $scope.transactionId = transaction2.id;
  var serializedTransaction = transaction2.checkedSerialize();

  sendTransaction(serializedTransaction);
}

function sendTransaction(serializedTransaction){
  // Asks bitcore-node to broadcast the timestamped transaction
  $http.get(bitcoreServiceBasePath + '/send/' + serializedTransaction)
    .success(sentTransaction)

  function sentTransaction(){
    montiorAddress(changeAddress, function(unspentOutput){
      $scope.stampSuccess = true;
      pendingFileHashes[fileHash] = {date: new Date()};
    });
  }
}

function sendTransaction(serializedTransaction){
  // Asks bitcore-node to broadcast the timestamped transaction
  $http.get(bitcoreServiceBasePath + '/send/' + serializedTransaction)
    .success(sentTransaction)

  function sentTransaction(){
    montiorAddress(changeAddress, function(unspentOutput){
      $scope.stampSuccess = true;
      pendingFileHashes[fileHash] = {date: new Date()};
    });
  }
}
```
## The End
That's it! Have questions about this tutorial? [Post them here](https://forum.bitcore.io).
You can also [view the completed project files on GitHub](https://github.com/bitpay/i-made-this).
