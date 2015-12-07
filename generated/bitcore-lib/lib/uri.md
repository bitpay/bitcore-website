<a name="URI"></a>
## URI
**Kind**: global class  

* [URI](#URI)
  * [new URI(data, [knownParams])](#new_URI_new)
  * _instance_
    * [._fromObject(obj)](#URI+_fromObject)
    * [._parseAmount(amount)](#URI+_parseAmount) ⇒ <code>Object</code>
    * [.toString()](#URI+toString) ⇒ <code>string</code>
    * [.inspect()](#URI+inspect) ⇒ <code>string</code>
  * _static_
    * [.fromString(str)](#URI.fromString) ⇒ <code>[URI](#URI)</code>
    * [.fromObject(data)](#URI.fromObject) ⇒ <code>[URI](#URI)</code>
    * [.isValid(data, [knownParams])](#URI.isValid) ⇒ <code>boolean</code>
    * [.parse(uri)](#URI.parse) ⇒ <code>Object</code>

<a name="new_URI_new"></a>
### new URI(data, [knownParams])
Bitcore URI

Instantiate an URI from a bitcoin URI String or an Object. An URI instance
can be created with a bitcoin uri string or an object. All instances of
URI are valid, the static method isValid allows checking before instanciation.

All standard parameters can be found as members of the class, the address
is represented using an {Address} instance and the amount is represented in
satoshis. Any other non-standard parameters can be found under the extra member.

**Returns**: <code>[URI](#URI)</code> - A new valid and frozen instance of URI  
**Throws**:

- <code>TypeError</code> Invalid bitcoin address
- <code>TypeError</code> Invalid amount
- <code>Error</code> Unknown required argument


| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> &#124; <code>Object</code> | A bitcoin URI string or an Object |
| [knownParams] | <code>Array.&lt;string&gt;</code> | Required non-standard params |

**Example**  
```javascript

var uri = new URI('bitcoin:12A1MyfXbW6RhdRAZEqofac5jCQQjwEPBu?amount=1.2');
console.log(uri.address, uri.amount);
```
<a name="URI+_fromObject"></a>
### urI._fromObject(obj)
Internal function to load the URI instance with an object.

**Kind**: instance method of <code>[URI](#URI)</code>  
**Throws**:

- <code>TypeError</code> Invalid bitcoin address
- <code>TypeError</code> Invalid amount
- <code>Error</code> Unknown required argument


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Object with the information |

<a name="URI+_parseAmount"></a>
### urI._parseAmount(amount) ⇒ <code>Object</code>
Internal function to transform a BTC string amount into satoshis

**Kind**: instance method of <code>[URI](#URI)</code>  
**Returns**: <code>Object</code> - Amount represented in satoshis  
**Throws**:

- <code>TypeError</code> Invalid amount


| Param | Type | Description |
| --- | --- | --- |
| amount | <code>string</code> | Amount BTC string |

<a name="URI+toString"></a>
### urI.toString() ⇒ <code>string</code>
Will return a the string representation of the URI

**Kind**: instance method of <code>[URI](#URI)</code>  
**Returns**: <code>string</code> - Bitcoin URI string  
<a name="URI+inspect"></a>
### urI.inspect() ⇒ <code>string</code>
Will return a string formatted for the console

**Kind**: instance method of <code>[URI](#URI)</code>  
**Returns**: <code>string</code> - Bitcoin URI  
<a name="URI.fromString"></a>
### URI.fromString(str) ⇒ <code>[URI](#URI)</code>
Instantiate a URI from a String

**Kind**: static method of <code>[URI](#URI)</code>  
**Returns**: <code>[URI](#URI)</code> - A new instance of a URI  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | JSON string or object of the URI |

<a name="URI.fromObject"></a>
### URI.fromObject(data) ⇒ <code>[URI](#URI)</code>
Instantiate a URI from an Object

**Kind**: static method of <code>[URI](#URI)</code>  
**Returns**: <code>[URI](#URI)</code> - A new instance of a URI  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | object of the URI |

<a name="URI.isValid"></a>
### URI.isValid(data, [knownParams]) ⇒ <code>boolean</code>
Check if an bitcoin URI string is valid

**Kind**: static method of <code>[URI](#URI)</code>  
**Returns**: <code>boolean</code> - Result of uri validation  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> &#124; <code>Object</code> | A bitcoin URI string or an Object |
| [knownParams] | <code>Array.&lt;string&gt;</code> | Required non-standard params |

**Example**  
```javascript

var valid = URI.isValid('bitcoin:12A1MyfXbW6RhdRAZEqofac5jCQQjwEPBu');
// true
```
<a name="URI.parse"></a>
### URI.parse(uri) ⇒ <code>Object</code>
Convert a bitcoin URI string into a simple object.

**Kind**: static method of <code>[URI](#URI)</code>  
**Returns**: <code>Object</code> - An object with the parsed params  
**Throws**:

- <code>TypeError</code> Invalid bitcoin URI


| Param | Type | Description |
| --- | --- | --- |
| uri | <code>string</code> | A bitcoin URI string |

