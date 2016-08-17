<a name="PrivateKey"></a>

## PrivateKey
**Kind**: global class  

* [PrivateKey](#PrivateKey)
    * [new PrivateKey(data, network)](#new_PrivateKey_new)
    * _instance_
        * [.toObject](#PrivateKey+toObject) ⇒ <code>Object</code>
        * [._classifyArguments(data, network)](#PrivateKey+_classifyArguments) ⇒ <code>Object</code>
        * [.toString()](#PrivateKey+toString) ⇒ <code>string</code>
        * [.toWIF()](#PrivateKey+toWIF) ⇒ <code>string</code>
        * [.toBigNumber()](#PrivateKey+toBigNumber) ⇒ <code>BN</code>
        * [.toBuffer()](#PrivateKey+toBuffer) ⇒ <code>Buffer</code>
        * [.toPublicKey()](#PrivateKey+toPublicKey) ⇒ <code>PublicKey</code>
        * [.toAddress([network])](#PrivateKey+toAddress) ⇒ <code>Address</code>
        * [.inspect()](#PrivateKey+inspect) ⇒ <code>string</code>
    * _static_
        * [.fromString](#PrivateKey.fromString) ⇒ <code>[PrivateKey](#PrivateKey)</code>
        * [.fromBuffer(arg, network)](#PrivateKey.fromBuffer) ⇒ <code>[PrivateKey](#PrivateKey)</code>
        * [.fromObject(obj)](#PrivateKey.fromObject)
        * [.fromRandom([network])](#PrivateKey.fromRandom) ⇒ <code>[PrivateKey](#PrivateKey)</code>
        * [.getValidationError(data, [network])](#PrivateKey.getValidationError) ⇒ <code>null</code> &#124; <code>Error</code>
        * [.isValid(data, [network])](#PrivateKey.isValid) ⇒ <code>Boolean</code>

<a name="new_PrivateKey_new"></a>

### new PrivateKey(data, network)
Instantiate a PrivateKey from a BN, Buffer and WIF.

**Returns**: <code>[PrivateKey](#PrivateKey)</code> - A new valid instance of an PrivateKey  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The encoded data in various formats |
| network | <code>Network</code> &#124; <code>string</code> | a [Network](Network) object, or a string with the network name |

**Example**  
```javascript
// generate a new random key
var key = PrivateKey();

// get the associated address
var address = key.toAddress();

// encode into wallet export format
var exported = key.toWIF();

// instantiate from the exported (and saved) private key
var imported = PrivateKey.fromWIF(exported);
```
<a name="PrivateKey+toObject"></a>

### privateKey.toObject ⇒ <code>Object</code>
**Kind**: instance property of <code>[PrivateKey](#PrivateKey)</code>  
**Returns**: <code>Object</code> - A plain object representation  
<a name="PrivateKey+_classifyArguments"></a>

### privateKey._classifyArguments(data, network) ⇒ <code>Object</code>
Internal helper to instantiate PrivateKey internal `info` object from
different kinds of arguments passed to the constructor.

**Kind**: instance method of <code>[PrivateKey](#PrivateKey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> |  |
| network | <code>Network</code> &#124; <code>string</code> | a [Network](Network) object, or a string with the network name |

<a name="PrivateKey+toString"></a>

### privateKey.toString() ⇒ <code>string</code>
Will output the PrivateKey encoded as hex string

**Kind**: instance method of <code>[PrivateKey](#PrivateKey)</code>  
<a name="PrivateKey+toWIF"></a>

### privateKey.toWIF() ⇒ <code>string</code>
Will output the PrivateKey to a WIF string

**Kind**: instance method of <code>[PrivateKey](#PrivateKey)</code>  
**Returns**: <code>string</code> - A WIP representation of the private key  
<a name="PrivateKey+toBigNumber"></a>

### privateKey.toBigNumber() ⇒ <code>BN</code>
Will return the private key as a BN instance

**Kind**: instance method of <code>[PrivateKey](#PrivateKey)</code>  
**Returns**: <code>BN</code> - A BN instance of the private key  
<a name="PrivateKey+toBuffer"></a>

### privateKey.toBuffer() ⇒ <code>Buffer</code>
Will return the private key as a BN buffer

**Kind**: instance method of <code>[PrivateKey](#PrivateKey)</code>  
**Returns**: <code>Buffer</code> - A buffer of the private key  
<a name="PrivateKey+toPublicKey"></a>

### privateKey.toPublicKey() ⇒ <code>PublicKey</code>
Will return the corresponding public key

**Kind**: instance method of <code>[PrivateKey](#PrivateKey)</code>  
**Returns**: <code>PublicKey</code> - A public key generated from the private key  
<a name="PrivateKey+toAddress"></a>

### privateKey.toAddress([network]) ⇒ <code>Address</code>
Will return an address for the private key

**Kind**: instance method of <code>[PrivateKey](#PrivateKey)</code>  
**Returns**: <code>Address</code> - An address generated from the private key  

| Param | Type | Description |
| --- | --- | --- |
| [network] | <code>Network</code> | optional parameter specifying the desired network for the address |

<a name="PrivateKey+inspect"></a>

### privateKey.inspect() ⇒ <code>string</code>
Will return a string formatted for the console

**Kind**: instance method of <code>[PrivateKey](#PrivateKey)</code>  
**Returns**: <code>string</code> - Private key  
<a name="PrivateKey.fromString"></a>

### PrivateKey.fromString ⇒ <code>[PrivateKey](#PrivateKey)</code>
Instantiate a PrivateKey from a WIF string

**Kind**: static property of <code>[PrivateKey](#PrivateKey)</code>  
**Returns**: <code>[PrivateKey](#PrivateKey)</code> - A new valid instance of PrivateKey  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The WIF encoded private key string |

<a name="PrivateKey.fromBuffer"></a>

### PrivateKey.fromBuffer(arg, network) ⇒ <code>[PrivateKey](#PrivateKey)</code>
Instantiate a PrivateKey from a Buffer with the DER or WIF representation

**Kind**: static method of <code>[PrivateKey](#PrivateKey)</code>  

| Param | Type |
| --- | --- |
| arg | <code>Buffer</code> | 
| network | <code>Network</code> | 

<a name="PrivateKey.fromObject"></a>

### PrivateKey.fromObject(obj)
Instantiate a PrivateKey from a plain JavaScript object

**Kind**: static method of <code>[PrivateKey](#PrivateKey)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The output from privateKey.toObject() |

<a name="PrivateKey.fromRandom"></a>

### PrivateKey.fromRandom([network]) ⇒ <code>[PrivateKey](#PrivateKey)</code>
Instantiate a PrivateKey from random bytes

**Kind**: static method of <code>[PrivateKey](#PrivateKey)</code>  
**Returns**: <code>[PrivateKey](#PrivateKey)</code> - A new valid instance of PrivateKey  

| Param | Type | Description |
| --- | --- | --- |
| [network] | <code>string</code> | Either "livenet" or "testnet" |

<a name="PrivateKey.getValidationError"></a>

### PrivateKey.getValidationError(data, [network]) ⇒ <code>null</code> &#124; <code>Error</code>
Check if there would be any errors when initializing a PrivateKey

**Kind**: static method of <code>[PrivateKey](#PrivateKey)</code>  
**Returns**: <code>null</code> &#124; <code>Error</code> - An error if exists  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The encoded data in various formats |
| [network] | <code>string</code> | Either "livenet" or "testnet" |

<a name="PrivateKey.isValid"></a>

### PrivateKey.isValid(data, [network]) ⇒ <code>Boolean</code>
Check if the parameters are valid

**Kind**: static method of <code>[PrivateKey](#PrivateKey)</code>  
**Returns**: <code>Boolean</code> - If the private key is would be valid  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The encoded data in various formats |
| [network] | <code>string</code> | Either "livenet" or "testnet" |

