<a name="Address"></a>

## Address
**Kind**: global class  

* [Address](#Address)
    * [new Address(data, network, [type])](#new_Address_new)
    * _instance_
        * [.toObject](#Address+toObject) ⇒ <code>Object</code>
        * [._classifyArguments(data, network, [type])](#Address+_classifyArguments) ⇒ <code>Object</code>
        * [.isPayToPublicKeyHash()](#Address+isPayToPublicKeyHash) ⇒
        * [.isPayToScriptHash()](#Address+isPayToScriptHash) ⇒
        * [.toBuffer()](#Address+toBuffer) ⇒ <code>Buffer</code>
        * [.toString()](#Address+toString) ⇒ <code>string</code>
        * [.inspect()](#Address+inspect) ⇒ <code>string</code>
    * _static_
        * [.PayToPublicKeyHash](#Address.PayToPublicKeyHash)
        * [.PayToScriptHash](#Address.PayToScriptHash)
        * [._transformObject(data)](#Address._transformObject) ⇒ <code>[Address](#Address)</code>
        * [.createMultisig(publicKeys, threshold, network)](#Address.createMultisig) ⇒ <code>[Address](#Address)</code>
        * [.fromPublicKey(data, network)](#Address.fromPublicKey) ⇒ <code>[Address](#Address)</code>
        * [.fromPublicKeyHash(hash, network)](#Address.fromPublicKeyHash) ⇒ <code>[Address](#Address)</code>
        * [.fromScriptHash(hash, network)](#Address.fromScriptHash) ⇒ <code>[Address](#Address)</code>
        * [.payingTo(script, network)](#Address.payingTo) ⇒ <code>[Address](#Address)</code>
        * [.fromScript(script, network)](#Address.fromScript) ⇒ <code>[Address](#Address)</code>
        * [.fromBuffer(buffer, network, [type])](#Address.fromBuffer) ⇒ <code>[Address](#Address)</code>
        * [.fromString(str, network, [type])](#Address.fromString) ⇒ <code>[Address](#Address)</code>
        * [.fromObject(json)](#Address.fromObject) ⇒ <code>[Address](#Address)</code>
        * [.getValidationError(data, network, type)](#Address.getValidationError) ⇒ <code>null</code> &#124; <code>Error</code>
        * [.isValid(data, network, type)](#Address.isValid) ⇒ <code>boolean</code>

<a name="new_Address_new"></a>

### new Address(data, network, [type])
Instantiate an address from an address String or Buffer, a public key or script hash Buffer,
or an instance of [PublicKey](PublicKey) or [Script](Script).

This is an immutable class, and if the first parameter provided to this constructor is an
`Address` instance, the same argument will be returned.

An address has two key properties: `network` and `type`. The type is either
`Address.PayToPublicKeyHash` (value is the `'pubkeyhash'` string)
or `Address.PayToScriptHash` (the string `'scripthash'`). The network is an instance of [Network](Network).
You can quickly check whether an address is of a given kind by using the methods
`isPayToPublicKeyHash` and `isPayToScriptHash`

**Returns**: <code>[Address](#Address)</code> - A new valid and frozen instance of an Address  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The encoded data in various formats |
| network | <code>Network</code> &#124; <code>String</code> &#124; <code>number</code> | The network: 'livenet' or 'testnet' |
| [type] | <code>string</code> | The type of address: 'script' or 'pubkey' |

**Example**  
```javascript
// validate that an input field is valid
var error = Address.getValidationError(input, 'testnet');
if (!error) {
  var address = Address(input, 'testnet');
} else {
  // invalid network or checksum (typo?)
  var message = error.messsage;
}

// get an address from a public key
var address = Address(publicKey, 'testnet').toString();
```
<a name="Address+toObject"></a>

### address.toObject ⇒ <code>Object</code>
**Kind**: instance property of <code>[Address](#Address)</code>  
**Returns**: <code>Object</code> - A plain object with the address information  
<a name="Address+_classifyArguments"></a>

### address._classifyArguments(data, network, [type]) ⇒ <code>Object</code>
Internal function used to split different kinds of arguments of the constructor

**Kind**: instance method of <code>[Address](#Address)</code>  
**Returns**: <code>Object</code> - An "info" object with "type", "network", and "hashBuffer"  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The encoded data in various formats |
| network | <code>Network</code> &#124; <code>String</code> &#124; <code>number</code> | The network: 'livenet' or 'testnet' |
| [type] | <code>string</code> | The type of address: 'script' or 'pubkey' |

<a name="Address+isPayToPublicKeyHash"></a>

### address.isPayToPublicKeyHash() ⇒
Returns true if an address is of pay to public key hash type

**Kind**: instance method of <code>[Address](#Address)</code>  
**Returns**: boolean  
<a name="Address+isPayToScriptHash"></a>

### address.isPayToScriptHash() ⇒
Returns true if an address is of pay to script hash type

**Kind**: instance method of <code>[Address](#Address)</code>  
**Returns**: boolean  
<a name="Address+toBuffer"></a>

### address.toBuffer() ⇒ <code>Buffer</code>
Will return a buffer representation of the address

**Kind**: instance method of <code>[Address](#Address)</code>  
**Returns**: <code>Buffer</code> - Bitcoin address buffer  
<a name="Address+toString"></a>

### address.toString() ⇒ <code>string</code>
Will return a the string representation of the address

**Kind**: instance method of <code>[Address](#Address)</code>  
**Returns**: <code>string</code> - Bitcoin address  
<a name="Address+inspect"></a>

### address.inspect() ⇒ <code>string</code>
Will return a string formatted for the console

**Kind**: instance method of <code>[Address](#Address)</code>  
**Returns**: <code>string</code> - Bitcoin address  
<a name="Address.PayToPublicKeyHash"></a>

### Address.PayToPublicKeyHash
**Kind**: static property of <code>[Address](#Address)</code>  
<a name="Address.PayToScriptHash"></a>

### Address.PayToScriptHash
**Kind**: static property of <code>[Address](#Address)</code>  
<a name="Address._transformObject"></a>

### Address._transformObject(data) ⇒ <code>[Address](#Address)</code>
Deserializes an address serialized through `Address#toObject()`

**Kind**: static method of <code>[Address](#Address)</code>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> |  |
| data.hash | <code>string</code> | the hash that this address encodes |
| data.type | <code>string</code> | either 'pubkeyhash' or 'scripthash' |
| [data.network] | <code>Network</code> | the name of the network associated |

<a name="Address.createMultisig"></a>

### Address.createMultisig(publicKeys, threshold, network) ⇒ <code>[Address](#Address)</code>
Creates a P2SH address from a set of public keys and a threshold.

The addresses will be sorted lexicographically, as that is the trend in bitcoin.
To create an address from unsorted public keys, use the [Script#buildMultisigOut](Script#buildMultisigOut)
interface.

**Kind**: static method of <code>[Address](#Address)</code>  

| Param | Type | Description |
| --- | --- | --- |
| publicKeys | <code>Array</code> | a set of public keys to create an address |
| threshold | <code>number</code> | the number of signatures needed to release the funds |
| network | <code>String</code> &#124; <code>Network</code> | either a Network instance, 'livenet', or 'testnet' |

<a name="Address.fromPublicKey"></a>

### Address.fromPublicKey(data, network) ⇒ <code>[Address](#Address)</code>
Instantiate an address from a PublicKey instance

**Kind**: static method of <code>[Address](#Address)</code>  
**Returns**: <code>[Address](#Address)</code> - A new valid and frozen instance of an Address  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>PublicKey</code> |  |
| network | <code>String</code> &#124; <code>Network</code> | either a Network instance, 'livenet', or 'testnet' |

<a name="Address.fromPublicKeyHash"></a>

### Address.fromPublicKeyHash(hash, network) ⇒ <code>[Address](#Address)</code>
Instantiate an address from a ripemd160 public key hash

**Kind**: static method of <code>[Address](#Address)</code>  
**Returns**: <code>[Address](#Address)</code> - A new valid and frozen instance of an Address  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>Buffer</code> | An instance of buffer of the hash |
| network | <code>String</code> &#124; <code>Network</code> | either a Network instance, 'livenet', or 'testnet' |

<a name="Address.fromScriptHash"></a>

### Address.fromScriptHash(hash, network) ⇒ <code>[Address](#Address)</code>
Instantiate an address from a ripemd160 script hash

**Kind**: static method of <code>[Address](#Address)</code>  
**Returns**: <code>[Address](#Address)</code> - A new valid and frozen instance of an Address  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>Buffer</code> | An instance of buffer of the hash |
| network | <code>String</code> &#124; <code>Network</code> | either a Network instance, 'livenet', or 'testnet' |

<a name="Address.payingTo"></a>

### Address.payingTo(script, network) ⇒ <code>[Address](#Address)</code>
Builds a p2sh address paying to script. This will hash the script and
use that to create the address.
If you want to extract an address associated with a script instead,
see {{Address#fromScript}}

**Kind**: static method of <code>[Address](#Address)</code>  
**Returns**: <code>[Address](#Address)</code> - A new valid and frozen instance of an Address  

| Param | Type | Description |
| --- | --- | --- |
| script | <code>Script</code> | An instance of Script |
| network | <code>String</code> &#124; <code>Network</code> | either a Network instance, 'livenet', or 'testnet' |

<a name="Address.fromScript"></a>

### Address.fromScript(script, network) ⇒ <code>[Address](#Address)</code>
Extract address from a Script. The script must be of one
of the following types: p2pkh input, p2pkh output, p2sh input
or p2sh output.
This will analyze the script and extract address information from it.
If you want to transform any script to a p2sh Address paying
to that script's hash instead, use {{Address#payingTo}}

**Kind**: static method of <code>[Address](#Address)</code>  
**Returns**: <code>[Address](#Address)</code> - A new valid and frozen instance of an Address  

| Param | Type | Description |
| --- | --- | --- |
| script | <code>Script</code> | An instance of Script |
| network | <code>String</code> &#124; <code>Network</code> | either a Network instance, 'livenet', or 'testnet' |

<a name="Address.fromBuffer"></a>

### Address.fromBuffer(buffer, network, [type]) ⇒ <code>[Address](#Address)</code>
Instantiate an address from a buffer of the address

**Kind**: static method of <code>[Address](#Address)</code>  
**Returns**: <code>[Address](#Address)</code> - A new valid and frozen instance of an Address  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Buffer</code> | An instance of buffer of the address |
| network | <code>String</code> &#124; <code>Network</code> | either a Network instance, 'livenet', or 'testnet' |
| [type] | <code>string</code> | The type of address: 'script' or 'pubkey' |

<a name="Address.fromString"></a>

### Address.fromString(str, network, [type]) ⇒ <code>[Address](#Address)</code>
Instantiate an address from an address string

**Kind**: static method of <code>[Address](#Address)</code>  
**Returns**: <code>[Address](#Address)</code> - A new valid and frozen instance of an Address  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | An string of the bitcoin address |
| network | <code>String</code> &#124; <code>Network</code> | either a Network instance, 'livenet', or 'testnet' |
| [type] | <code>string</code> | The type of address: 'script' or 'pubkey' |

<a name="Address.fromObject"></a>

### Address.fromObject(json) ⇒ <code>[Address](#Address)</code>
Instantiate an address from an Object

**Kind**: static method of <code>[Address](#Address)</code>  
**Returns**: <code>[Address](#Address)</code> - A new valid instance of an Address  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>string</code> | An JSON string or Object with keys: hash, network and type |

<a name="Address.getValidationError"></a>

### Address.getValidationError(data, network, type) ⇒ <code>null</code> &#124; <code>Error</code>
Will return a validation error if exists

**Kind**: static method of <code>[Address](#Address)</code>  
**Returns**: <code>null</code> &#124; <code>Error</code> - The corresponding error message  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The encoded data |
| network | <code>String</code> &#124; <code>Network</code> | either a Network instance, 'livenet', or 'testnet' |
| type | <code>string</code> | The type of address: 'script' or 'pubkey' |

**Example**  
```javascript
// a network mismatch error
var error = Address.getValidationError('15vkcKf7gB23wLAnZLmbVuMiiVDc1Nm4a2', 'testnet');
```
<a name="Address.isValid"></a>

### Address.isValid(data, network, type) ⇒ <code>boolean</code>
Will return a boolean if an address is valid

**Kind**: static method of <code>[Address](#Address)</code>  
**Returns**: <code>boolean</code> - The corresponding error message  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | The encoded data |
| network | <code>String</code> &#124; <code>Network</code> | either a Network instance, 'livenet', or 'testnet' |
| type | <code>string</code> | The type of address: 'script' or 'pubkey' |

**Example**  
```javascript
assert(Address.isValid('15vkcKf7gB23wLAnZLmbVuMiiVDc1Nm4a2', 'livenet'));
```
