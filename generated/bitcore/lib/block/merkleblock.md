<a name="MerkleBlock"></a>
## MerkleBlock
**Kind**: global class  

* [MerkleBlock](#MerkleBlock)
  * [new MerkleBlock(arg)](#new_MerkleBlock_new)
  * _instance_
    * [.header](#MerkleBlock+header) : <code>BlockHeader</code>
    * [.numTransactions](#MerkleBlock+numTransactions) : <code>Number</code>
    * [.hashes](#MerkleBlock+hashes) : <code>Array.&lt;String&gt;</code>
    * [.flags](#MerkleBlock+flags) : <code>Array.&lt;Number&gt;</code>
    * [.toObject](#MerkleBlock+toObject) ⇒ <code>Object</code>
    * [.toBuffer()](#MerkleBlock+toBuffer) ⇒ <code>Buffer</code>
    * [.toBufferWriter(bw)](#MerkleBlock+toBufferWriter) ⇒ <code>BufferWriter</code>
    * [.validMerkleTree()](#MerkleBlock+validMerkleTree) ⇒ <code>Boolean</code>
  * _static_
    * [.fromBuffer(buf)](#MerkleBlock.fromBuffer) ⇒ <code>[MerkleBlock](#MerkleBlock)</code>
    * [.fromBufferReader(br)](#MerkleBlock.fromBufferReader) ⇒ <code>[MerkleBlock](#MerkleBlock)</code>
    * [.fromObject(obj)](#MerkleBlock.fromObject) ⇒ <code>Block</code>

<a name="new_MerkleBlock_new"></a>
### new MerkleBlock(arg)
Instantiate a MerkleBlock from a Buffer, JSON object, or Object with
the properties of the Block


| Param | Type | Description |
| --- | --- | --- |
| arg | <code>\*</code> | A Buffer, JSON string, or Object representing a MerkleBlock |

<a name="MerkleBlock+header"></a>
### merkleBlock.header : <code>BlockHeader</code>
**Kind**: instance property of <code>[MerkleBlock](#MerkleBlock)</code>  
<a name="MerkleBlock+numTransactions"></a>
### merkleBlock.numTransactions : <code>Number</code>
**Kind**: instance property of <code>[MerkleBlock](#MerkleBlock)</code>  
<a name="MerkleBlock+hashes"></a>
### merkleBlock.hashes : <code>Array.&lt;String&gt;</code>
**Kind**: instance property of <code>[MerkleBlock](#MerkleBlock)</code>  
<a name="MerkleBlock+flags"></a>
### merkleBlock.flags : <code>Array.&lt;Number&gt;</code>
**Kind**: instance property of <code>[MerkleBlock](#MerkleBlock)</code>  
<a name="MerkleBlock+toObject"></a>
### merkleBlock.toObject ⇒ <code>Object</code>
**Kind**: instance property of <code>[MerkleBlock](#MerkleBlock)</code>  
**Returns**: <code>Object</code> - - A plain object with the MerkleBlock properties  
<a name="MerkleBlock+toBuffer"></a>
### merkleBlock.toBuffer() ⇒ <code>Buffer</code>
**Kind**: instance method of <code>[MerkleBlock](#MerkleBlock)</code>  
**Returns**: <code>Buffer</code> - - A buffer of the block  
<a name="MerkleBlock+toBufferWriter"></a>
### merkleBlock.toBufferWriter(bw) ⇒ <code>BufferWriter</code>
**Kind**: instance method of <code>[MerkleBlock](#MerkleBlock)</code>  
**Returns**: <code>BufferWriter</code> - - An instance of BufferWriter representation of the MerkleBlock  

| Param | Type | Description |
| --- | --- | --- |
| bw | <code>BufferWriter</code> | An existing instance of BufferWriter |

<a name="MerkleBlock+validMerkleTree"></a>
### merkleBlock.validMerkleTree() ⇒ <code>Boolean</code>
Verify that the MerkleBlock is valid

**Kind**: instance method of <code>[MerkleBlock](#MerkleBlock)</code>  
**Returns**: <code>Boolean</code> - - True/False whether this MerkleBlock is Valid  
<a name="MerkleBlock.fromBuffer"></a>
### MerkleBlock.fromBuffer(buf) ⇒ <code>[MerkleBlock](#MerkleBlock)</code>
**Kind**: static method of <code>[MerkleBlock](#MerkleBlock)</code>  
**Returns**: <code>[MerkleBlock](#MerkleBlock)</code> - - A MerkleBlock object  

| Param | Type | Description |
| --- | --- | --- |
| buf | <code>Buffer</code> | MerkleBlock data in a Buffer object |

<a name="MerkleBlock.fromBufferReader"></a>
### MerkleBlock.fromBufferReader(br) ⇒ <code>[MerkleBlock](#MerkleBlock)</code>
**Kind**: static method of <code>[MerkleBlock](#MerkleBlock)</code>  
**Returns**: <code>[MerkleBlock](#MerkleBlock)</code> - - A MerkleBlock object  

| Param | Type | Description |
| --- | --- | --- |
| br | <code>BufferReader</code> | MerkleBlock data in a BufferReader object |

<a name="MerkleBlock.fromObject"></a>
### MerkleBlock.fromObject(obj) ⇒ <code>Block</code>
**Kind**: static method of <code>[MerkleBlock](#MerkleBlock)</code>  
**Returns**: <code>Block</code> - - An instance of block  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | A plain JavaScript object |

