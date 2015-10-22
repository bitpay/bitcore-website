<a name="HDPrivateKey"></a>
## HDPrivateKey
**Kind**: global class  

* [HDPrivateKey](#HDPrivateKey)
  * [new HDPrivateKey(arg)](#new_HDPrivateKey_new)
  * _instance_
    * [.toObject](#HDPrivateKey+toObject) ⇒ <code>Object</code>
    * [.derive(arg, hardened)](#HDPrivateKey+derive)
    * [._buildFromBuffers(arg)](#HDPrivateKey+_buildFromBuffers) ⇒ <code>[HDPrivateKey](#HDPrivateKey)</code>
    * [.toString()](#HDPrivateKey+toString) ⇒
    * [.inspect()](#HDPrivateKey+inspect) ⇒
    * [.toBuffer()](#HDPrivateKey+toBuffer) ⇒ <code>string</code>
  * _static_
    * [.isValidPath(arg, hardened)](#HDPrivateKey.isValidPath) ⇒ <code>boolean</code>
    * [._getDerivationIndexes(path)](#HDPrivateKey._getDerivationIndexes) ⇒ <code>Array</code>
    * [.isValidSerialized(data, network)](#HDPrivateKey.isValidSerialized) ⇒ <code>boolean</code>
    * [.getSerializedError(data, network)](#HDPrivateKey.getSerializedError) ⇒ <code>errors.InvalidArgument</code> &#124; <code>null</code>
    * [.fromSeed(hexa, network)](#HDPrivateKey.fromSeed) ⇒
    * [.fromBuffer(arg)](#HDPrivateKey.fromBuffer) ⇒ <code>[HDPrivateKey](#HDPrivateKey)</code>

<a name="new_HDPrivateKey_new"></a>
### new HDPrivateKey(arg)
Represents an instance of an hierarchically derived private key.

More info on https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki


| Param | Type |
| --- | --- |
| arg | <code>string</code> &#124; <code>Buffer</code> &#124; <code>Object</code> | 

<a name="HDPrivateKey+toObject"></a>
### hdPrivateKey.toObject ⇒ <code>Object</code>
Returns a plain object with a representation of this private key.

Fields include:<ul>
<li> network: either 'livenet' or 'testnet'
<li> depth: a number ranging from 0 to 255
<li> fingerPrint: a number ranging from 0 to 2^32-1, taken from the hash of the
<li>     associated public key
<li> parentFingerPrint: a number ranging from 0 to 2^32-1, taken from the hash
<li>     of this parent's associated public key or zero.
<li> childIndex: the index from which this child was derived (or zero)
<li> chainCode: an hexa string representing a number used in the derivation
<li> privateKey: the private key associated, in hexa representation
<li> xprivkey: the representation of this extended private key in checksum
<li>     base58 format
<li> checksum: the base58 checksum of xprivkey
</ul>

**Kind**: instance property of <code>[HDPrivateKey](#HDPrivateKey)</code>  
<a name="HDPrivateKey+derive"></a>
### hdPrivateKey.derive(arg, hardened)
Get a derived child based on a string or number.

If the first argument is a string, it's parsed as the full path of
derivation. Valid values for this argument include "m" (which returns the
same private key), "m/0/1/40/2'/1000", where the ' quote means a hardened
derivation.

If the first argument is a number, the child with that index will be
derived. If the second argument is truthy, the hardened version will be
derived. See the example usage for clarification.

**Kind**: instance method of <code>[HDPrivateKey](#HDPrivateKey)</code>  

| Param | Type |
| --- | --- |
| arg | <code>string</code> &#124; <code>number</code> | 
| hardened | <code>boolean</code> | 

**Example**  
```javascript
var parent = new HDPrivateKey('xprv...');
var child_0_1_2h = parent.derive(0).derive(1).derive(2, true);
var copy_of_child_0_1_2h = parent.derive("m/0/1/2'");
assert(child_0_1_2h.xprivkey === copy_of_child_0_1_2h);
```
<a name="HDPrivateKey+_buildFromBuffers"></a>
### hdPrivateKey._buildFromBuffers(arg) ⇒ <code>[HDPrivateKey](#HDPrivateKey)</code>
Receives a object with buffers in all the properties and populates the
internal structure

**Kind**: instance method of <code>[HDPrivateKey](#HDPrivateKey)</code>  
**Returns**: <code>[HDPrivateKey](#HDPrivateKey)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>Object</code> |  |
| arg.version | <code>buffer.Buffer</code> |  |
| arg.depth | <code>buffer.Buffer</code> |  |
| arg.parentFingerPrint | <code>buffer.Buffer</code> |  |
| arg.childIndex | <code>buffer.Buffer</code> |  |
| arg.chainCode | <code>buffer.Buffer</code> |  |
| arg.privateKey | <code>buffer.Buffer</code> |  |
| arg.checksum | <code>buffer.Buffer</code> |  |
| [arg.xprivkey] | <code>string</code> | if set, don't recalculate the base58      representation |

<a name="HDPrivateKey+toString"></a>
### hdPrivateKey.toString() ⇒
Returns the string representation of this private key (a string starting
with "xprv..."

**Kind**: instance method of <code>[HDPrivateKey](#HDPrivateKey)</code>  
**Returns**: string  
<a name="HDPrivateKey+inspect"></a>
### hdPrivateKey.inspect() ⇒
Returns the console representation of this extended private key.

**Kind**: instance method of <code>[HDPrivateKey](#HDPrivateKey)</code>  
**Returns**: string  
<a name="HDPrivateKey+toBuffer"></a>
### hdPrivateKey.toBuffer() ⇒ <code>string</code>
Returns a buffer representation of the HDPrivateKey

**Kind**: instance method of <code>[HDPrivateKey](#HDPrivateKey)</code>  
<a name="HDPrivateKey.isValidPath"></a>
### HDPrivateKey.isValidPath(arg, hardened) ⇒ <code>boolean</code>
Verifies that a given path is valid.

**Kind**: static method of <code>[HDPrivateKey](#HDPrivateKey)</code>  

| Param | Type |
| --- | --- |
| arg | <code>string</code> &#124; <code>number</code> | 
| hardened | <code>boolean</code> | 

<a name="HDPrivateKey._getDerivationIndexes"></a>
### HDPrivateKey._getDerivationIndexes(path) ⇒ <code>Array</code>
Internal function that splits a string path into a derivation index array.
It will return null if the string path is malformed.
It does not validate if indexes are in bounds.

**Kind**: static method of <code>[HDPrivateKey](#HDPrivateKey)</code>  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 

<a name="HDPrivateKey.isValidSerialized"></a>
### HDPrivateKey.isValidSerialized(data, network) ⇒ <code>boolean</code>
Verifies that a given serialized private key in base58 with checksum format
is valid.

**Kind**: static method of <code>[HDPrivateKey](#HDPrivateKey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> &#124; <code>Buffer</code> | the serialized private key |
| network | <code>string</code> &#124; <code>Network</code> | optional, if present, checks that the     network provided matches the network serialized. |

<a name="HDPrivateKey.getSerializedError"></a>
### HDPrivateKey.getSerializedError(data, network) ⇒ <code>errors.InvalidArgument</code> &#124; <code>null</code>
Checks what's the error that causes the validation of a serialized private key
in base58 with checksum to fail.

**Kind**: static method of <code>[HDPrivateKey](#HDPrivateKey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> &#124; <code>Buffer</code> | the serialized private key |
| network | <code>string</code> &#124; <code>Network</code> | optional, if present, checks that the     network provided matches the network serialized. |

<a name="HDPrivateKey.fromSeed"></a>
### HDPrivateKey.fromSeed(hexa, network) ⇒
Generate a private key from a seed, as described in BIP32

**Kind**: static method of <code>[HDPrivateKey](#HDPrivateKey)</code>  
**Returns**: HDPrivateKey  

| Param | Type |
| --- | --- |
| hexa | <code>string</code> &#124; <code>Buffer</code> | 
| network | <code>\*</code> | 

<a name="HDPrivateKey.fromBuffer"></a>
### HDPrivateKey.fromBuffer(arg) ⇒ <code>[HDPrivateKey](#HDPrivateKey)</code>
Build a HDPrivateKey from a buffer

**Kind**: static method of <code>[HDPrivateKey](#HDPrivateKey)</code>  

| Param | Type |
| --- | --- |
| arg | <code>Buffer</code> | 

