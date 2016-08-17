<a name="PublicKey"></a>

## PublicKey
**Kind**: global class  

* [PublicKey](#PublicKey)
    * [new PublicKey(data, extra)](#new_PublicKey_new)
    * _instance_
        * [.toObject](#PublicKey+toObject) ⇒ <code>Object</code>
        * [.toBuffer](#PublicKey+toBuffer) ⇒ <code>Buffer</code>
        * [._classifyArgs(data, extra)](#PublicKey+_classifyArgs)
        * [._getID()](#PublicKey+_getID) ⇒ <code>Buffer</code>
        * [.toAddress(network)](#PublicKey+toAddress) ⇒ <code>Address</code>
        * [.toString()](#PublicKey+toString) ⇒ <code>string</code>
        * [.inspect()](#PublicKey+inspect) ⇒ <code>string</code>
    * _static_
        * [.fromDER](#PublicKey.fromDER) ⇒ <code>[PublicKey](#PublicKey)</code>
        * [.fromPrivateKey(privkey)](#PublicKey.fromPrivateKey) ⇒ <code>[PublicKey](#PublicKey)</code>
        * [.fromPoint(point, [compressed])](#PublicKey.fromPoint) ⇒ <code>[PublicKey](#PublicKey)</code>
        * [.fromString(str, [encoding])](#PublicKey.fromString) ⇒ <code>[PublicKey](#PublicKey)</code>
        * [.fromX(odd, x)](#PublicKey.fromX) ⇒ <code>[PublicKey](#PublicKey)</code>
        * [.getValidationError(data)](#PublicKey.getValidationError) ⇒ <code>null</code> &#124; <code>Error</code>
        * [.isValid(data)](#PublicKey.isValid) ⇒ <code>Boolean</code>

<a name="new_PublicKey_new"></a>

### new PublicKey(data, extra)
Instantiate a PublicKey from a [PrivateKey](PrivateKey), [Point](Point), `string`, or `Buffer`.

There are two internal properties, `network` and `compressed`, that deal with importing
a PublicKey from a PrivateKey in WIF format. More details described on [PrivateKey](PrivateKey)

**Returns**: <code>[PublicKey](#PublicKey)</code> - A new valid instance of an PublicKey  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The encoded data in various formats |
| extra | <code>Object</code> | additional options |
| [extra.network] | <code>Network</code> | Which network should the address for this public key be for |
| [extra.compressed] | <code>String</code> | If the public key is compressed |

**Example**  
```javascript
// instantiate from a private key
var key = PublicKey(privateKey, true);

// export to as a DER hex encoded string
var exported = key.toString();

// import the public key
var imported = PublicKey.fromString(exported);
```
<a name="PublicKey+toObject"></a>

### publicKey.toObject ⇒ <code>Object</code>
**Kind**: instance property of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>Object</code> - A plain object of the PublicKey  
<a name="PublicKey+toBuffer"></a>

### publicKey.toBuffer ⇒ <code>Buffer</code>
Will output the PublicKey to a DER Buffer

**Kind**: instance property of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>Buffer</code> - A DER hex encoded buffer  
<a name="PublicKey+_classifyArgs"></a>

### publicKey._classifyArgs(data, extra)
Internal function to differentiate between arguments passed to the constructor

**Kind**: instance method of <code>[PublicKey](#PublicKey)</code>  

| Param | Type |
| --- | --- |
| data | <code>\*</code> | 
| extra | <code>Object</code> | 

<a name="PublicKey+_getID"></a>

### publicKey._getID() ⇒ <code>Buffer</code>
Will return a sha256 + ripemd160 hash of the serialized public key

**Kind**: instance method of <code>[PublicKey](#PublicKey)</code>  
**See**: https://github.com/bitcoin/bitcoin/blob/master/src/pubkey.h#L141  
<a name="PublicKey+toAddress"></a>

### publicKey.toAddress(network) ⇒ <code>Address</code>
Will return an address for the public key

**Kind**: instance method of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>Address</code> - An address generated from the public key  

| Param | Type | Description |
| --- | --- | --- |
| network | <code>String</code> &#124; <code>Network</code> | Which network should the address be for |

<a name="PublicKey+toString"></a>

### publicKey.toString() ⇒ <code>string</code>
Will output the PublicKey to a DER encoded hex string

**Kind**: instance method of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>string</code> - A DER hex encoded string  
<a name="PublicKey+inspect"></a>

### publicKey.inspect() ⇒ <code>string</code>
Will return a string formatted for the console

**Kind**: instance method of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>string</code> - Public key  
<a name="PublicKey.fromDER"></a>

### PublicKey.fromDER ⇒ <code>[PublicKey](#PublicKey)</code>
Instantiate a PublicKey from a Buffer

**Kind**: static property of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>[PublicKey](#PublicKey)</code> - A new valid instance of PublicKey  

| Param | Type | Description |
| --- | --- | --- |
| buf | <code>Buffer</code> | A DER hex buffer |
| [strict] | <code>bool</code> | if set to false, will loosen some conditions |

<a name="PublicKey.fromPrivateKey"></a>

### PublicKey.fromPrivateKey(privkey) ⇒ <code>[PublicKey](#PublicKey)</code>
Instantiate a PublicKey from a PrivateKey

**Kind**: static method of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>[PublicKey](#PublicKey)</code> - A new valid instance of PublicKey  

| Param | Type | Description |
| --- | --- | --- |
| privkey | <code>PrivateKey</code> | An instance of PrivateKey |

<a name="PublicKey.fromPoint"></a>

### PublicKey.fromPoint(point, [compressed]) ⇒ <code>[PublicKey](#PublicKey)</code>
Instantiate a PublicKey from a Point

**Kind**: static method of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>[PublicKey](#PublicKey)</code> - A new valid instance of PublicKey  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Point</code> | A Point instance |
| [compressed] | <code>boolean</code> | whether to store this public key as compressed format |

<a name="PublicKey.fromString"></a>

### PublicKey.fromString(str, [encoding]) ⇒ <code>[PublicKey](#PublicKey)</code>
Instantiate a PublicKey from a DER hex encoded string

**Kind**: static method of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>[PublicKey](#PublicKey)</code> - A new valid instance of PublicKey  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | A DER hex string |
| [encoding] | <code>String</code> | The type of string encoding |

<a name="PublicKey.fromX"></a>

### PublicKey.fromX(odd, x) ⇒ <code>[PublicKey](#PublicKey)</code>
Instantiate a PublicKey from an X Point

**Kind**: static method of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>[PublicKey](#PublicKey)</code> - A new valid instance of PublicKey  

| Param | Type | Description |
| --- | --- | --- |
| odd | <code>Boolean</code> | If the point is above or below the x axis |
| x | <code>Point</code> | The x point |

<a name="PublicKey.getValidationError"></a>

### PublicKey.getValidationError(data) ⇒ <code>null</code> &#124; <code>Error</code>
Check if there would be any errors when initializing a PublicKey

**Kind**: static method of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>null</code> &#124; <code>Error</code> - An error if exists  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The encoded data in various formats |

<a name="PublicKey.isValid"></a>

### PublicKey.isValid(data) ⇒ <code>Boolean</code>
Check if the parameters are valid

**Kind**: static method of <code>[PublicKey](#PublicKey)</code>  
**Returns**: <code>Boolean</code> - If the public key would be valid  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The encoded data in various formats |

