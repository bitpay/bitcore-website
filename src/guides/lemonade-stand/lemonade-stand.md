# Lemonade Stand

This tutorial will go over how to accept bitcoin payments via a web site directly to your wallet. We will interact with a Bitcore node from a web browser to receive payment notifications. And we will generate new keys on the server side for each purchase.

## Create a Service

Please refer to the [service development document](service-development).

## Generate Invoice Page

For our simple application, we're going to have two pages. One page to generate an invoice, and another page to display and pay the invoice.

Let's start with generating an invoice. We'll need a route:

```js
LemonadeStand.prototype.setupRoutes = function(app, express) {
  app.use('/', express.static(__dirname + '/static'));
};

LemonadeStand.prototype.getRoutePrefix = function() {
  return 'lemonade-stand';
};
```

Create a `static` and put an `index.html` in it:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Lemonade Stand</title>
</head>

<body>
  <h1>Lemonade Stand</h1>
  <h2>Invoice</h2>

  <form method="post" action="invoice">
    Amount: <input type="text" name="amount"/> BTC <input type="submit" value="Generate Invoice" />
  </form>
</body>

</html>
```

You can access this page at `http://localhost:3001/lemonade-stand`.

## Pay Invoice Page

Next we'll need to be able to generate the invoice server-side and display a page to pay the invoice. Back to `index.js`:

```js
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var bitcore = require('bitcore-lib');
var bodyParser = require('body-parser');

function LemonadeStand(options) {
  EventEmitter.call(this);

  this.node = options.node;
  this.log = this.node.log;

  this.invoiceHtml = fs.readFileSync(__dirname + '/invoice.html', 'utf8');

  // Use 1 HD Private Key and generate a unique address for every invoice
  this.hdPrivateKey = new bitcore.HDPrivateKey(this.node.network);
  this.log.info('Using key:', this.hdPrivateKey);
  this.addressIndex = 0;
}

inherits(LemonadeStand, EventEmitter);

LemonadeStand.dependencies = ['bitcoind'];

LemonadeStand.prototype.start = function(callback) {
  setImmediate(callback);
};

LemonadeStand.prototype.stop = function(callback) {
  setImmediate(callback);
};

LemonadeStand.prototype.getAPIMethods = function() {
  return [];
};

LemonadeStand.prototype.getPublishEvents = function() {
  return [];
};

LemonadeStand.prototype.setupRoutes = function(app, express) {
  var self = this;

  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/', express.static(__dirname + '/static'));

  app.post('/invoice', function(req, res, next) {
    self.addressIndex++;
    self.amount = parseFloat(req.body.amount) * 1e8;
    res.status(200).send(self.filterInvoiceHTML());
  });
};

LemonadeStand.prototype.getRoutePrefix = function() {
  return 'lemonade-stand';
};

LemonadeStand.prototype.filterInvoiceHTML = function() {
  var btc = this.amount / 1e8;
  var address = this.hdPrivateKey.derive(this.addressIndex).privateKey.toAddress();
  this.log.info('New invoice with address:', address);
  var hash = address.hashBuffer.toString('hex');
  var transformed = this.invoiceHtml
    .replace(/{{amount}}/g, btc)
    .replace(/{{address}}/g, address)
    .replace(/{{hash}}/g, hash)
    .replace(/{{baseUrl}}/g, '/' + this.getRoutePrefix() + '/');
  return transformed;
};

module.exports = LemonadeStand;
```

Let's walk through this. In our constructor we are loading the HTML data into memory. We'll use this later to replace variables. In a normal application, you would probably use a templating engine like Handlebars or Mustache.

We generate a random HDPrivateKey from which all of our invoice addresses will be generated. Normally what you would do is generate this on a separate computer and put the corresponding HDPublicKey on the server. That way if your server is hacked, your bitcoin is still safe!

Each new invoice bumps the addressIndex by 1. This will create a unique bitcoin address for every invoice that is generated.

In `setupRoutes()` we add an express middleware for parsing form data. Then we add a handler for `/invoice`. When the user submits the form from the first page we created, `amount` is passed to this `/invoice` route. We then parse the amount and respond back with the html, replacing our placeholder values with real values.

Here is what `invoice.html` looks like:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Lemonade Stand</title>
  <base href="{{baseUrl}}" />
  <script src="/socket.io/socket.io.js"></script>
  <script src="js/jquery/dist/jquery.js"></script>
  <script src="js/jquery-qrcode/jquery.qrcode.min.js"></script>
  <script src="js/bitcore-lib/bitcore-lib.js"></script>
</head>

<body>
  <h1>Lemonade Stand</h1>
  <h2>Invoice</h2>
  <div id="qrcode"></div>
  <p>Please send {{amount}} BTC to {{address}}</p>
  <h2>Transactions Received</h2>
  <ul id="txids">
  </ul>

  <script type="text/javascript">
    $('#qrcode').qrcode("bitcoin:{{address}}?amount={{amount}}");
  </script>

  <script language="javascript">
    var bitcore = require('bitcore-lib');
    var socket = io('http://localhost:3001');
    socket.on('bitcoind/addresstxid', function(data) {
      var address = bitcore.Address(data.address);
      if (address.toString() == '{{address}}') {
        var txidsElm = document.getElementById('txids');
        var elm = document.createTextNode('txid: ' + data.txid);
        txidsElm.appendChild(elm);
      }
    });
    socket.emit('subscribe', 'bitcoind/addresstxid', ['{{address}}']);
  </script>
</body>

</html>
```

This will generate a QR code with the bitcoin address and amount. It subscribes to the `bitcoind/addresstxid` event from the `bitcoind` service for the given address. Every time the address received a transaction, we receive an event over socket.io and we update the data received accordingly.

The file uses bitcore on the client side to derive the address from the address object. We use bower to install the dependency in `static/js` directory.

## Conclusion

So there we've built our very own bitcoin-accepting lemonade stand using Bitcore Node! Please see the [git repository](https://github.com/bitpay/lemonade-stand) for all of the code.
