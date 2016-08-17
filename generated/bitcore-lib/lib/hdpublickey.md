<a name="HDPublicKey"></a>

## HDPublicKey
**Kind**: global class  

* [HDPublicKey](#HDPublicKey)
    * [new HDPublicKey(arg)](#new_HDPublicKey_new)
    * _instance_
        * [.toObject](#HDPublicKey+toObject)
        * [.derive(arg)](#HDPublicKey+derive)
        * [._buildFromBuffers(arg)](#HDPublicKey+_buildFromBuffers) ⇒ <code>[HDPublicKey](#HDPublicKey)</code>
        * [.toString()](#HDPublicKey+toString) ⇒ <code>string</code>
        * [.inspect()](#HDPublicKey+inspect) ⇒
        * [.toBuffer()](#HDPublicKey+toBuffer) ⇒ <code>Buffer</code>
    * _static_
        * [.isValidPath(arg)](#HDPublicKey.isValidPath) ⇒ <code>boolean</code>
        * [.isValidSerialized(data, network)](#HDPublicKey.isValidSerialized) ⇒ <code>boolean</code>
        * [.getSerializedError(data, network)](#HDPublicKey.getSerializedError) ⇒ <code>errors</code> &#124; <code>null</code>
        * [.fromBuffer(arg)](#HDPublicKey.fromBuffer) ⇒ <code>[HDPublicKey](#HDPublicKey)</code>

<a name="new_HDPublicKey_new"></a>

### new HDPublicKey(arg)
The representation of an hierarchically derived public key.

See https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki


| Param | Type |
| --- | --- |
| arg | <code>Object</code> &#124; <code>string</code> &#124; <code>Buffer</code> | 

<a name="HDPublicKey+toObject"></a>

### hdPublicKey.toObject
Returns a plain JavaScript object with information to reconstruct a key.

Fields are: <ul>
 <li> network: 'livenet' or 'testnet'
 <li> depth: a number from 0 to 255, the depth to the master extended key
 <li> fingerPrint: a number of 32 bits taken from the hash of the public key
 <li> fingerPrint: a number of 32 bits taken from the hash of this key's
 <li>     parent's public key
 <li> childIndex: index with which this key was derived
 <li> chainCode: string in hexa encoding used for derivation
 <li> publicKey: string, hexa encoded, in compressed key format
 <li> checksum: BufferUtil.integerFromBuffer(this._buffers.checksum),
 <li> xpubkey: the string with the base58 representation of this extended key
 <li> checksum: the base58 checksum of xpubkey
</ul>

**Kind**: instance property of <code>[HDPublicKey](#HDPublicKey)</code>  
<a name="HDPublicKey+derive"></a>

### hdPublicKey.derive(arg)
Get a derivated child based on a string or number.

If the first argument is a string, it's parsed as the full path of
derivation. Valid values for this argument include "m" (which returns the
same public key), "m/0/1/40/2/1000".

Note that hardened keys can't be derived from a public extended key.

If the first argument is a number, the child with that index will be
derived. See the example usage for clarification.

**Kind**: instance method of <code>[HDPublicKey](#HDPublicKey)</code>  

| Param | Type |
| --- | --- |
| arg | <code>string</code> &#124; <code>number</code> | 

**Example**  
```javascript
var parent = new HDPublicKey('xpub...');
var child_0_1_2 = parent.derive(0).derive(1).derive(2);
var copy_of_child_0_1_2 = parent.derive("m/0/1/2");
assert(child_0_1_2.xprivkey === copy_of_child_0_1_2);
```
<a name="HDPublicKey+_buildFromBuffers"></a>

### hdPublicKey._buildFromBuffers(arg) ⇒ <code>[HDPublicKey](#HDPublicKey)</code>
Receives a object with buffers in all the properties and populates the
internal structure

**Kind**: instance method of <code>[HDPublicKey](#HDPublicKey)</code>  
**Returns**: <code>[HDPublicKey](#HDPublicKey)</code> - this  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>Object</code> |  |
| arg.version | <code>buffer.Buffer</code> |  |
| arg.depth | <code>buffer.Buffer</code> |  |
| arg.parentFingerPrint | <code>buffer.Buffer</code> |  |
| arg.childIndex | <code>buffer.Buffer</code> |  |
| arg.chainCode | <code>buffer.Buffer</code> |  |
| arg.publicKey | <code>buffer.Buffer</code> |  |
| arg.checksum | <code>buffer.Buffer</code> |  |
| [arg.xpubkey] | <code>string</code> | if set, don't recalculate the base58      representation |

<a name="HDPublicKey+toString"></a>

### hdPublicKey.toString() ⇒ <code>string</code>
Returns the base58 checked representation of the public key

**Kind**: instance method of <code>[HDPublicKey](#HDPublicKey)</code>  
**Returns**: <code>string</code> - a string starting with "xpub..." in livenet  
<a name="HDPublicKey+inspect"></a>

### hdPublicKey.inspect() ⇒
Returns the console representation of this extended public key.

**Kind**: instance method of <code>[HDPublicKey](#HDPublicKey)</code>  
**Returns**: string  
<a name="HDPublicKey+toBuffer"></a>

### hdPublicKey.toBuffer() ⇒ <code>Buffer</code>
Return a buffer representation of the xpubkey

**Kind**: instance method of <code>[HDPublicKey](#HDPublicKey)</code>  
<a name="HDPublicKey.isValidPath"></a>

### HDPublicKey.isValidPath(arg) ⇒ <code>boolean</code>
Verifies that a given path is valid.

**Kind**: static method of <code>[HDPublicKey](#HDPublicKey)</code>  

| Param | Type |
| --- | --- |
| arg | <code>string</code> &#124; <code>number</code> | 

<a name="HDPublicKey.isValidSerialized"></a>

### HDPublicKey.isValidSerialized(data, network) ⇒ <code>boolean</code>
Verifies that a given serialized public key in base58 with checksum format
is valid.

**Kind**: static method of <code>[HDPublicKey](#HDPublicKey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> &#124; <code>Buffer</code> | the serialized public key |
| network | <code>string</code> &#124; <code>Network</code> | optional, if present, checks that the     network provided matches the network serialized. |

<a name="HDPublicKey.getSerializedError"></a>

### HDPublicKey.getSerializedError(data, network) ⇒ <code>errors</code> &#124; <code>null</code>
Checks what's the error that causes the validation of a serialized public key
in base58 with checksum to fail.

**Kind**: static method of <code>[HDPublicKey](#HDPublicKey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> &#124; <code>Buffer</code> | the serialized public key |
| network | <code>string</code> &#124; <code>Network</code> | optional, if present, checks that the     network provided matches the network serialized. |

<a name="HDPublicKey.fromBuffer"></a>

### HDPublicKey.fromBuffer(arg) ⇒ <code>[HDPublicKey](#HDPublicKey)</code>
Create a HDPublicKey from a buffer argument

**Kind**: static method of <code>[HDPublicKey](#HDPublicKey)</code>  

| Param | Type |
| --- | --- |
| arg | <code>Buffer</code> | 

