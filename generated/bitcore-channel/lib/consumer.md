<a name="Consumer"></a>
## Consumer
**Kind**: global class  

* [Consumer](#Consumer)
  * [new Consumer(opts)](#new_Consumer_new)
  * [.network](#Consumer+network) : <code>bitcore.Network</code>
  * [.expires](#Consumer+expires) : <code>number</code>
  * [.commitmentKey](#Consumer+commitmentKey) : <code>bitcore.PrivateKey</code>
  * [.providerPublicKey](#Consumer+providerPublicKey) : <code>bitcore.PublicKey</code>
  * [.providerAddress](#Consumer+providerAddress) : <code>bitcore.Address</code> &#124; <code>string</code>
  * [.fundingAddress](#Consumer+fundingAddress) : <code>bitcore.Address</code>
  * [.refundAddress](#Consumer+refundAddress) : <code>bitcore.Address</code>
  * [.commitmentTx](#Consumer+commitmentTx) : <code>Commitment</code>
  * [.processFunding(utxo)](#Consumer+processFunding)
  * [.setupRefund()](#Consumer+setupRefund) ⇒ <code>bitcore.Transaction</code>
  * [.validateRefund(messageFromProvider)](#Consumer+validateRefund) ⇒ <code>boolean</code>
  * [.incrementPaymentBy()](#Consumer+incrementPaymentBy) ⇒ <code>bitcore.Transaction</code>
  * [.getPaymentTx()](#Consumer+getPaymentTx) ⇒ <code>bitcore.Transaction</code>

<a name="new_Consumer_new"></a>
### new Consumer(opts)

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> |  |
| opts.network | <code>string</code> &#124; <code>Network</code> | 'livenet' or 'testnet' |
| opts.expires | <code>number</code> | unix timestamp in millis since epoch |
| [opts.commitmentKey] | <code>bitcore.PrivateKey</code> | key to use when negotiating the channel |
| [opts.providerPublicKey] | <code>string</code> | the public key for the server, in hexa compressed format |
| [opts.providerAddress] | <code>string</code> | the final address where the server will be paid |
| [opts.fundingKey] | <code>bitcore.PrivateKey</code> | key to use for funding the channel |
| [opts.refundAddress] | <code>string</code> | address to use for refund/change |

<a name="Consumer+network"></a>
### consumer.network : <code>bitcore.Network</code>
Either 'livenet' or 'testnet'

**Kind**: instance property of <code>[Consumer](#Consumer)</code>  
<a name="Consumer+expires"></a>
### consumer.expires : <code>number</code>
The expiration date for the channel, in seconds since UNIX epoch

**Kind**: instance property of <code>[Consumer](#Consumer)</code>  
<a name="Consumer+commitmentKey"></a>
### consumer.commitmentKey : <code>bitcore.PrivateKey</code>
This is the key used for the 2-of-2 locking of funds

**Kind**: instance property of <code>[Consumer](#Consumer)</code>  
<a name="Consumer+providerPublicKey"></a>
### consumer.providerPublicKey : <code>bitcore.PublicKey</code>
**Kind**: instance property of <code>[Consumer](#Consumer)</code>  
<a name="Consumer+providerAddress"></a>
### consumer.providerAddress : <code>bitcore.Address</code> &#124; <code>string</code>
The address where the server will be paid.

**Kind**: instance property of <code>[Consumer](#Consumer)</code>  
<a name="Consumer+fundingAddress"></a>
### consumer.fundingAddress : <code>bitcore.Address</code>
The address where the user will pay to fund the channel

**Kind**: instance property of <code>[Consumer](#Consumer)</code>  
<a name="Consumer+refundAddress"></a>
### consumer.refundAddress : <code>bitcore.Address</code>
The address where the refund will go to (also used for the change)

**Kind**: instance property of <code>[Consumer](#Consumer)</code>  
<a name="Consumer+commitmentTx"></a>
### consumer.commitmentTx : <code>Commitment</code>
The commitment transaction for this channel

**Kind**: instance property of <code>[Consumer](#Consumer)</code>  
<a name="Consumer+processFunding"></a>
### consumer.processFunding(utxo)
Adds an UTXO to the funding transaction. The funding transaction exists
merely because we can't expect the wallet of the user to support payment
channels.

**Kind**: instance method of <code>[Consumer](#Consumer)</code>  

| Param | Type |
| --- | --- |
| utxo | <code>Object</code> | 

<a name="Consumer+setupRefund"></a>
### consumer.setupRefund() ⇒ <code>bitcore.Transaction</code>
Build the refund transaction (TX 2)

**Kind**: instance method of <code>[Consumer](#Consumer)</code>  
<a name="Consumer+validateRefund"></a>
### consumer.validateRefund(messageFromProvider) ⇒ <code>boolean</code>
Validates that a message contains a valid signature from the Provider
that allows the Consumer to spend the lock transaction (TX 1)

**Kind**: instance method of <code>[Consumer](#Consumer)</code>  
**Returns**: <code>boolean</code> - true if the signature is valid  

| Param | Type | Description |
| --- | --- | --- |
| messageFromProvider | <code>string</code> | JSON-serialized message |

<a name="Consumer+incrementPaymentBy"></a>
### consumer.incrementPaymentBy() ⇒ <code>bitcore.Transaction</code>
Increments the amount being paid by a given amount of satoshis.

**Kind**: instance method of <code>[Consumer](#Consumer)</code>  
**Returns**: <code>bitcore.Transaction</code> - the updated transaction  
<a name="Consumer+getPaymentTx"></a>
### consumer.getPaymentTx() ⇒ <code>bitcore.Transaction</code>
Idiomatic shortcut to retrieve the payment transaction.

**Kind**: instance method of <code>[Consumer](#Consumer)</code>  
