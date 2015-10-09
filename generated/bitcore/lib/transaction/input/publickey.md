<a name="PublicKeyInput"></a>
## PublicKeyInput
**Kind**: global class  

* [PublicKeyInput](#PublicKeyInput)
  * [new PublicKeyInput()](#new_PublicKeyInput_new)
  * [.getSignatures(transaction, privateKey, index, [sigtype])](#PublicKeyInput+getSignatures) ⇒ <code>Array</code>
  * [.addSignature(signature)](#PublicKeyInput+addSignature) ⇒ <code>[PublicKeyInput](#PublicKeyInput)</code>
  * [.clearSignatures()](#PublicKeyInput+clearSignatures) ⇒ <code>PublicKeyHashInput</code>
  * [.isFullySigned()](#PublicKeyInput+isFullySigned) ⇒ <code>boolean</code>

<a name="new_PublicKeyInput_new"></a>
### new PublicKeyInput()
Represents a special kind of input of PayToPublicKey kind.

<a name="PublicKeyInput+getSignatures"></a>
### publicKeyInput.getSignatures(transaction, privateKey, index, [sigtype]) ⇒ <code>Array</code>
**Kind**: instance method of <code>[PublicKeyInput](#PublicKeyInput)</code>  
**Returns**: <code>Array</code> - of objects that can be  

| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>Transaction</code> | the transaction to be signed |
| privateKey | <code>PrivateKey</code> | the private key with which to sign the transaction |
| index | <code>number</code> | the index of the input in the transaction input vector |
| [sigtype] | <code>number</code> | the type of signature, defaults to Signature.SIGHASH_ALL |

<a name="PublicKeyInput+addSignature"></a>
### publicKeyInput.addSignature(signature) ⇒ <code>[PublicKeyInput](#PublicKeyInput)</code>
Add the provided signature

**Kind**: instance method of <code>[PublicKeyInput](#PublicKeyInput)</code>  
**Returns**: <code>[PublicKeyInput](#PublicKeyInput)</code> - this, for chaining  

| Param | Type |
| --- | --- |
| signature | <code>Object</code> | 
| signature.publicKey | <code>PublicKey</code> | 
| signature.signature | <code>Signature</code> | 
| [signature.sigtype] | <code>number</code> | 

<a name="PublicKeyInput+clearSignatures"></a>
### publicKeyInput.clearSignatures() ⇒ <code>PublicKeyHashInput</code>
Clear the input's signature

**Kind**: instance method of <code>[PublicKeyInput](#PublicKeyInput)</code>  
**Returns**: <code>PublicKeyHashInput</code> - this, for chaining  
<a name="PublicKeyInput+isFullySigned"></a>
### publicKeyInput.isFullySigned() ⇒ <code>boolean</code>
Query whether the input is signed

**Kind**: instance method of <code>[PublicKeyInput](#PublicKeyInput)</code>  
