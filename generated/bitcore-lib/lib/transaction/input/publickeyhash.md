<a name="PublicKeyHashInput"></a>
## PublicKeyHashInput
**Kind**: global class  

* [PublicKeyHashInput](#PublicKeyHashInput)
  * [new PublicKeyHashInput()](#new_PublicKeyHashInput_new)
  * [.getSignatures(transaction, privateKey, index, [sigtype], [hashData])](#PublicKeyHashInput+getSignatures) ⇒ <code>Array</code>
  * [.addSignature(signature)](#PublicKeyHashInput+addSignature) ⇒ <code>[PublicKeyHashInput](#PublicKeyHashInput)</code>
  * [.clearSignatures()](#PublicKeyHashInput+clearSignatures) ⇒ <code>[PublicKeyHashInput](#PublicKeyHashInput)</code>
  * [.isFullySigned()](#PublicKeyHashInput+isFullySigned) ⇒ <code>boolean</code>

<a name="new_PublicKeyHashInput_new"></a>
### new PublicKeyHashInput()
Represents a special kind of input of PayToPublicKeyHash kind.

<a name="PublicKeyHashInput+getSignatures"></a>
### publicKeyHashInput.getSignatures(transaction, privateKey, index, [sigtype], [hashData]) ⇒ <code>Array</code>
**Kind**: instance method of <code>[PublicKeyHashInput](#PublicKeyHashInput)</code>  
**Returns**: <code>Array</code> - of objects that can be  

| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>Transaction</code> | the transaction to be signed |
| privateKey | <code>PrivateKey</code> | the private key with which to sign the transaction |
| index | <code>number</code> | the index of the input in the transaction input vector |
| [sigtype] | <code>number</code> | the type of signature, defaults to Signature.SIGHASH_ALL |
| [hashData] | <code>Buffer</code> | the precalculated hash of the public key associated with the privateKey provided |

<a name="PublicKeyHashInput+addSignature"></a>
### publicKeyHashInput.addSignature(signature) ⇒ <code>[PublicKeyHashInput](#PublicKeyHashInput)</code>
Add the provided signature

**Kind**: instance method of <code>[PublicKeyHashInput](#PublicKeyHashInput)</code>  
**Returns**: <code>[PublicKeyHashInput](#PublicKeyHashInput)</code> - this, for chaining  

| Param | Type |
| --- | --- |
| signature | <code>Object</code> | 
| signature.publicKey | <code>PublicKey</code> | 
| signature.signature | <code>Signature</code> | 
| [signature.sigtype] | <code>number</code> | 

<a name="PublicKeyHashInput+clearSignatures"></a>
### publicKeyHashInput.clearSignatures() ⇒ <code>[PublicKeyHashInput](#PublicKeyHashInput)</code>
Clear the input's signature

**Kind**: instance method of <code>[PublicKeyHashInput](#PublicKeyHashInput)</code>  
**Returns**: <code>[PublicKeyHashInput](#PublicKeyHashInput)</code> - this, for chaining  
<a name="PublicKeyHashInput+isFullySigned"></a>
### publicKeyHashInput.isFullySigned() ⇒ <code>boolean</code>
Query whether the input is signed

**Kind**: instance method of <code>[PublicKeyHashInput](#PublicKeyHashInput)</code>  
