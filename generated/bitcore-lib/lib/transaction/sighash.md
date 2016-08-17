<a name="Signing"></a>

## Signing : <code>object</code>
**Kind**: global namespace  

* [Signing](#Signing) : <code>object</code>
    * [.sighash](#Signing.sighash)
    * [.sign](#Signing.sign) ⇒ <code>Signature</code>
    * [.verify](#Signing.verify) ⇒ <code>boolean</code>

<a name="Signing.sighash"></a>

### Signing.sighash
Returns a buffer of length 32 bytes with the hash that needs to be signed
for OP_CHECKSIG.

**Kind**: static property of <code>[Signing](#Signing)</code>  

| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>Transaction</code> | the transaction to sign |
| sighashType | <code>number</code> | the type of the hash |
| inputNumber | <code>number</code> | the input index for the signature |
| subscript | <code>Script</code> | the script that will be signed |

<a name="Signing.sign"></a>

### Signing.sign ⇒ <code>Signature</code>
Create a signature

**Kind**: static property of <code>[Signing](#Signing)</code>  

| Param | Type |
| --- | --- |
| transaction | <code>Transaction</code> | 
| privateKey | <code>PrivateKey</code> | 
| sighash | <code>number</code> | 
| inputIndex | <code>number</code> | 
| subscript | <code>Script</code> | 

<a name="Signing.verify"></a>

### Signing.verify ⇒ <code>boolean</code>
Verify a signature

**Kind**: static property of <code>[Signing](#Signing)</code>  

| Param | Type |
| --- | --- |
| transaction | <code>Transaction</code> | 
| signature | <code>Signature</code> | 
| publicKey | <code>PublicKey</code> | 
| inputIndex | <code>number</code> | 
| subscript | <code>Script</code> | 

