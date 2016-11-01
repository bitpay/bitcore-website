# Satoshi Fire Alarm

In the beginning, when Bitcoin was only a few blocks high, Satoshi Nakamoto won some coinbases by solo mining. Those coins have never been spent. Some believe the private keys for those addresses are lost forever. The following tutorial shows how to listen for transactions associated with the aforementioned addresses.

## Create a Service

Please refer to the [service development document](/guides/service-development).

### The Code

Add a new file within the service directory `satoshi-fire-alarm` called `index.js`

```js
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var bitcore = require('bitcore-lib');
var spawn = require('child_process').spawn;

function SatoshiFireAlarm(options) {
  EventEmitter.call(this, options);
  this.node = options.node;

  this.alarmActivated = false;
  this.child = false;
  this.interestingAddresses = [
    '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', //this is the address that the genesis paid its coinbase to. Can't be spent due to a bug in the code.
    '12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX', //Block 1
    '1HLoD9E4SDFFPDiYfNYnkBLQ85Y51J3Zb1' //Block 2
  ];
  this.node.services.bitcoind.on('tx', this.transactionHandler.bind(this));
}

/*
 * We are going to need bitcoind because we will be setting event listeners (subscribers)
 * on Blocks and such
 */
SatoshiFireAlarm.dependencies = ['bitcoind'];

/*
 * inherits the serivce base class so we get some stuff for free
 */
util.inherits(SatoshiFireAlarm, EventEmitter);

/*
 * start: REQUIRED!! Ours just calls the callback
 */
SatoshiFireAlarm.prototype.start = function(callback) {
  callback();
};

/*
 * stop: REQUIRED!! Ours just calls the callback
 */
SatoshiFireAlarm.prototype.stop = function(callback) {
  callback();
};

SatoshiFireAlarm.prototype.getAPIMethods = function() {
  return [];
};

SatoshiFireAlarm.prototype.getPublishEvents = function() {
  return [];
};

/*
 * transactionHandler: this is the delegate when a transaction is received by your node
 */
SatoshiFireAlarm.prototype.transactionHandler = function(txBuffer) {
  var self = this;

  var tx = bitcore.Transaction().fromBuffer(txBuffer);

  for (var i = 0; i < tx.inputs.length; i++) {
    self.transactionInputHandler(tx.inputs[i]);
  }

};

/*
 * transactionInputHandler: helper for transactionHandler
 */
SatoshiFireAlarm.prototype.transactionInputHandler = function(input) {
  if (!input.script) {
    return;
  }
  var address = input.script.toAddress(this.node.network);
  if (address && this.interestingAddresses.indexOf(address.toString()) != -1) {
    this.soundAlarm();
  }
};

/*
 * soundAlarm: will launch a separate alarm program (not provided)
 */
SatoshiFireAlarm.prototype.soundAlarm = function() {
  if (this.alarmActivated) {
    return;
  }

  this.alarmActivated = true;
  this.child = spawn('alarm', []);
};

SatoshiFireAlarm.prototype.resetAlarm = function() {
  if (this.child) {
    this.child.kill();
  }
  this.alarmActivated = false;
};

module.exports = SatoshiFireAlarm;
```

Create a `package.json` for our service in `satoshi-fire-alarm`:

```json
npm init
npm install bitcore-lib --save
```

## Start the Node

```sh
bitcore-node start
```

## Wait for Satoshi to Spend

Just kidding, this example can be used to inform you about ANY bitcoin address. Try it by inserting your own address and transferring bitcoin in or out.
