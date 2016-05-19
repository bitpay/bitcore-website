# Creating a Service

The purpose of this tutorial is to demonstrate how to create a service for a Bitcore node.

## Concepts

Services can be added to your node in order to extend the functionality of a Bitcore node and Bitcoin itself. Services are very simple to write if you follow the guidelines below. Services are intended to be node modules themselves. This is because we would like to leverage all the good things about npm.

## Creating a Node

Create a node using [these directions](full-node). If your service will not require Bitcoin code or the blockchain, feel free to skip the sync of the blockchain.

## Create the Structure for Your Service

```bash
$ cd #home dir
$ mkdir -p myservice
$ cd !$
$ npm init
$ nano index.js
```

Every service that connects to your bitcore-node must implement some methods (interface). A Bitcore node will call your service's start and stop methods, for example:

```js
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;

function MyService(options) {
  EventEmitter.call(this);
  this.node = options.node;
}
inherits(MyService, EventEmitter);

MyService.dependencies = ['bitcoind'];

MyService.prototype.start = function(callback) {
  setImmediate(callback);
};

MyService.prototype.stop = function(callback) {
  setImmediate(callback);
};

MyService.prototype.getAPIMethods = function() {
  return [];
};

MyService.prototype.getPublishEvents = function() {
  return [];
};

module.exports = MyService;
```

The code above will help you get started. The required methods are start, stop, getAPIMethods, getPublishedEvents. Additionally, your service should inherit from EventEmitter or Service (a bitcore-node prototype). The dependencies should also be noted. In the example above, we are depending on bitcoind. Bitcoind is the interface to the bitcoin daemon and the blockchain.

## Setup the Symlinks

We need to symlink our service into our created node, assuming the created node is called mynode and exists in your home directory:

```bash
$ cd ~/mynode/node_modules
$ ln -s ~/myservice
```

## Add the Service to the Node Configuration

```bash
$ nano ~/mynode/bitcore-node.json
```

```json
{
  "network": "testnet",
  "port": 3001,
  "services": [
    "bitcoind",
    "myservice"
  ],
  "servicesConfig": {
    "bitcoind": {
      "datadir": "/home/user/.bitcoin",
      "exec": "/home/user/bitcoin/src/bitcoind"
    }
  }
}
```
And now you should be able to start bitcore with your service.

## Publish Your Service to NPM

Be sure to publish your service to npm! This helps others re-use your service and make bitcore-node even better. Please see the [npm site](https://www.npmjs.com/) for more details.

```bash
$ npm publish
```

Once published, you can use your service directly (without the symlink) by:

```bash
$ cd ~/mynode
$ bitcore-node add myservice
```

Now your development version of bitcore-node is symlinked into your node modules and any changes to this project will be picked up by your node.

## Conclusion

Creating a service is easy. We encourage you to create your own services and publish them to npm.
