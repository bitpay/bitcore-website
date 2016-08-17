<a name="Message"></a>

## Message(message) ⇒ <code>[Message](#Message)</code>
constructs a new message to sign and verify.

**Kind**: global function  

| Param | Type |
| --- | --- |
| message | <code>String</code> | 


* [Message(message)](#Message) ⇒ <code>[Message](#Message)</code>
    * _instance_
        * [.sign(privateKey)](#Message+sign) ⇒ <code>String</code>
        * [.verify(bitcoinAddress, signatureString)](#Message+verify) ⇒ <code>Boolean</code>
        * [.toObject()](#Message+toObject) ⇒ <code>Object</code>
        * [.toJSON()](#Message+toJSON) ⇒ <code>String</code>
        * [.toString()](#Message+toString) ⇒ <code>String</code>
        * [.inspect()](#Message+inspect) ⇒ <code>String</code>
    * _static_
        * [.fromString(str)](#Message.fromString) ⇒ <code>[Message](#Message)</code>
        * [.fromJSON(json)](#Message.fromJSON) ⇒ <code>[Message](#Message)</code>

<a name="Message+sign"></a>

### message.sign(privateKey) ⇒ <code>String</code>
Will sign a message with a given bitcoin private key.

**Kind**: instance method of <code>[Message](#Message)</code>  
**Returns**: <code>String</code> - A base64 encoded compact signature  

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>PrivateKey</code> | An instance of PrivateKey |

<a name="Message+verify"></a>

### message.verify(bitcoinAddress, signatureString) ⇒ <code>Boolean</code>
Will return a boolean of the signature is valid for a given bitcoin address.
If it isn't the specific reason is accessible via the "error" member.

**Kind**: instance method of <code>[Message](#Message)</code>  

| Param | Type | Description |
| --- | --- | --- |
| bitcoinAddress | <code>Address</code> &#124; <code>String</code> | A bitcoin address |
| signatureString | <code>String</code> | A base64 encoded compact signature |

<a name="Message+toObject"></a>

### message.toObject() ⇒ <code>Object</code>
**Kind**: instance method of <code>[Message](#Message)</code>  
**Returns**: <code>Object</code> - A plain object with the message information  
<a name="Message+toJSON"></a>

### message.toJSON() ⇒ <code>String</code>
**Kind**: instance method of <code>[Message](#Message)</code>  
**Returns**: <code>String</code> - A JSON representation of the message information  
<a name="Message+toString"></a>

### message.toString() ⇒ <code>String</code>
Will return a the string representation of the message

**Kind**: instance method of <code>[Message](#Message)</code>  
**Returns**: <code>String</code> - Message  
<a name="Message+inspect"></a>

### message.inspect() ⇒ <code>String</code>
Will return a string formatted for the console

**Kind**: instance method of <code>[Message](#Message)</code>  
**Returns**: <code>String</code> - Message  
<a name="Message.fromString"></a>

### Message.fromString(str) ⇒ <code>[Message](#Message)</code>
Instantiate a message from a message string

**Kind**: static method of <code>[Message](#Message)</code>  
**Returns**: <code>[Message](#Message)</code> - A new instance of a Message  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | A string of the message |

<a name="Message.fromJSON"></a>

### Message.fromJSON(json) ⇒ <code>[Message](#Message)</code>
Instantiate a message from JSON

**Kind**: static method of <code>[Message](#Message)</code>  
**Returns**: <code>[Message](#Message)</code> - A new instance of a Message  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>String</code> | An JSON string or Object with keys: message |

