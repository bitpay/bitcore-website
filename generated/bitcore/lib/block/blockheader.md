<a name="BlockHeader"></a>
## BlockHeader
**Kind**: global class  

* [BlockHeader](#BlockHeader)
  * [new BlockHeader()](#new_BlockHeader_new)
  * _instance_
    * [.toObject](#BlockHeader+toObject) ⇒ <code>Object</code>
    * [.toBuffer()](#BlockHeader+toBuffer) ⇒ <code>Buffer</code>
    * [.toString()](#BlockHeader+toString) ⇒ <code>string</code>
    * [.toBufferWriter(bw)](#BlockHeader+toBufferWriter) ⇒ <code>BufferWriter</code>
    * [.getTargetDifficulty(bits)](#BlockHeader+getTargetDifficulty) ⇒ <code>BN</code>
    * [.getDifficulty()](#BlockHeader+getDifficulty) ⇒ <code>Number</code>
    * [._getHash()](#BlockHeader+_getHash) ⇒ <code>Buffer</code>
    * [.validTimestamp()](#BlockHeader+validTimestamp) ⇒ <code>Boolean</code>
    * [.validProofOfWork()](#BlockHeader+validProofOfWork) ⇒ <code>Boolean</code>
    * [.inspect()](#BlockHeader+inspect) ⇒ <code>string</code>
  * _static_
    * [.fromObject(obj)](#BlockHeader.fromObject) ⇒ <code>[BlockHeader](#BlockHeader)</code>
    * [.fromRawBlock(data)](#BlockHeader.fromRawBlock) ⇒ <code>[BlockHeader](#BlockHeader)</code>
    * [.fromBuffer(buf)](#BlockHeader.fromBuffer) ⇒ <code>[BlockHeader](#BlockHeader)</code>
    * [.fromString(str)](#BlockHeader.fromString) ⇒ <code>[BlockHeader](#BlockHeader)</code>
    * [.fromBufferReader(br)](#BlockHeader.fromBufferReader) ⇒ <code>[BlockHeader](#BlockHeader)</code>

<a name="new_BlockHeader_new"></a>
### new BlockHeader()
Instantiate a BlockHeader from a Buffer, JSON object, or Object with
the properties of the BlockHeader

**Returns**: <code>[BlockHeader](#BlockHeader)</code> - - An instance of block header  

| Type | Description |
| --- | --- |
| <code>\*</code> | A Buffer, JSON string, or Object |

<a name="BlockHeader+toObject"></a>
### blockHeader.toObject ⇒ <code>Object</code>
**Kind**: instance property of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>Object</code> - - A plain object of the BlockHeader  
<a name="BlockHeader+toBuffer"></a>
### blockHeader.toBuffer() ⇒ <code>Buffer</code>
**Kind**: instance method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>Buffer</code> - - A Buffer of the BlockHeader  
<a name="BlockHeader+toString"></a>
### blockHeader.toString() ⇒ <code>string</code>
**Kind**: instance method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>string</code> - - A hex encoded string of the BlockHeader  
<a name="BlockHeader+toBufferWriter"></a>
### blockHeader.toBufferWriter(bw) ⇒ <code>BufferWriter</code>
**Kind**: instance method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>BufferWriter</code> - - An instance of BufferWriter representation of the BlockHeader  

| Param | Type | Description |
| --- | --- | --- |
| bw | <code>BufferWriter</code> | An existing instance BufferWriter |

<a name="BlockHeader+getTargetDifficulty"></a>
### blockHeader.getTargetDifficulty(bits) ⇒ <code>BN</code>
Returns the target difficulty for this block

**Kind**: instance method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>BN</code> - An instance of BN with the decoded difficulty bits  

| Param | Type |
| --- | --- |
| bits | <code>Number</code> | 

<a name="BlockHeader+getDifficulty"></a>
### blockHeader.getDifficulty() ⇒ <code>Number</code>
**Kind**: instance method of <code>[BlockHeader](#BlockHeader)</code>  
**Link**: https://en.bitcoin.it/wiki/Difficulty  
<a name="BlockHeader+_getHash"></a>
### blockHeader._getHash() ⇒ <code>Buffer</code>
**Kind**: instance method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>Buffer</code> - - The little endian hash buffer of the header  
<a name="BlockHeader+validTimestamp"></a>
### blockHeader.validTimestamp() ⇒ <code>Boolean</code>
**Kind**: instance method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>Boolean</code> - - If timestamp is not too far in the future  
<a name="BlockHeader+validProofOfWork"></a>
### blockHeader.validProofOfWork() ⇒ <code>Boolean</code>
**Kind**: instance method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>Boolean</code> - - If the proof-of-work hash satisfies the target difficulty  
<a name="BlockHeader+inspect"></a>
### blockHeader.inspect() ⇒ <code>string</code>
**Kind**: instance method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>string</code> - - A string formated for the console  
<a name="BlockHeader.fromObject"></a>
### BlockHeader.fromObject(obj) ⇒ <code>[BlockHeader](#BlockHeader)</code>
**Kind**: static method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>[BlockHeader](#BlockHeader)</code> - - An instance of block header  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | A plain JavaScript object |

<a name="BlockHeader.fromRawBlock"></a>
### BlockHeader.fromRawBlock(data) ⇒ <code>[BlockHeader](#BlockHeader)</code>
**Kind**: static method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>[BlockHeader](#BlockHeader)</code> - - An instance of block header  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Binary</code> | Raw block binary data or buffer |

<a name="BlockHeader.fromBuffer"></a>
### BlockHeader.fromBuffer(buf) ⇒ <code>[BlockHeader](#BlockHeader)</code>
**Kind**: static method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>[BlockHeader](#BlockHeader)</code> - - An instance of block header  

| Param | Type | Description |
| --- | --- | --- |
| buf | <code>Buffer</code> | A buffer of the block header |

<a name="BlockHeader.fromString"></a>
### BlockHeader.fromString(str) ⇒ <code>[BlockHeader](#BlockHeader)</code>
**Kind**: static method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>[BlockHeader](#BlockHeader)</code> - - An instance of block header  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | A hex encoded buffer of the block header |

<a name="BlockHeader.fromBufferReader"></a>
### BlockHeader.fromBufferReader(br) ⇒ <code>[BlockHeader](#BlockHeader)</code>
**Kind**: static method of <code>[BlockHeader](#BlockHeader)</code>  
**Returns**: <code>[BlockHeader](#BlockHeader)</code> - - An instance of block header  

| Param | Type | Description |
| --- | --- | --- |
| br | <code>BufferReader</code> | A BufferReader of the block header |

