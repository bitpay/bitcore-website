<a name="Block"></a>

## Block
**Kind**: global class  

* [Block](#Block)
    * [new Block(arg)](#new_Block_new)
    * _instance_
        * [.toObject](#Block+toObject) ⇒ <code>Object</code>
        * [.toBuffer()](#Block+toBuffer) ⇒ <code>Buffer</code>
        * [.toString()](#Block+toString) ⇒ <code>string</code>
        * [.toBufferWriter(bw)](#Block+toBufferWriter) ⇒ <code>BufferWriter</code>
        * [.getTransactionHashes()](#Block+getTransactionHashes) ⇒ <code>Array</code>
        * [.getMerkleTree()](#Block+getMerkleTree) ⇒ <code>Array</code>
        * [.getMerkleRoot()](#Block+getMerkleRoot) ⇒ <code>Buffer</code>
        * [.validMerkleRoot()](#Block+validMerkleRoot) ⇒ <code>Boolean</code>
        * [._getHash()](#Block+_getHash) ⇒ <code>Buffer</code>
        * [.inspect()](#Block+inspect) ⇒ <code>string</code>
    * _static_
        * [.fromObject(obj)](#Block.fromObject) ⇒ <code>[Block](#Block)</code>
        * [.fromBufferReader(br)](#Block.fromBufferReader) ⇒ <code>[Block](#Block)</code>
        * [.fromBuffer(buf)](#Block.fromBuffer) ⇒ <code>[Block](#Block)</code>
        * [.fromString(str)](#Block.fromString) ⇒ <code>[Block](#Block)</code>
        * [.fromRawBlock(data)](#Block.fromRawBlock) ⇒ <code>[Block](#Block)</code>

<a name="new_Block_new"></a>

### new Block(arg)
Instantiate a Block from a Buffer, JSON object, or Object with
the properties of the Block


| Param | Type | Description |
| --- | --- | --- |
| arg | <code>\*</code> | A Buffer, JSON string, or Object |

<a name="Block+toObject"></a>

### block.toObject ⇒ <code>Object</code>
**Kind**: instance property of <code>[Block](#Block)</code>  
**Returns**: <code>Object</code> - - A plain object with the block properties  
<a name="Block+toBuffer"></a>

### block.toBuffer() ⇒ <code>Buffer</code>
**Kind**: instance method of <code>[Block](#Block)</code>  
**Returns**: <code>Buffer</code> - - A buffer of the block  
<a name="Block+toString"></a>

### block.toString() ⇒ <code>string</code>
**Kind**: instance method of <code>[Block](#Block)</code>  
**Returns**: <code>string</code> - - A hex encoded string of the block  
<a name="Block+toBufferWriter"></a>

### block.toBufferWriter(bw) ⇒ <code>BufferWriter</code>
**Kind**: instance method of <code>[Block](#Block)</code>  
**Returns**: <code>BufferWriter</code> - - An instance of BufferWriter representation of the Block  

| Param | Type | Description |
| --- | --- | --- |
| bw | <code>BufferWriter</code> | An existing instance of BufferWriter |

<a name="Block+getTransactionHashes"></a>

### block.getTransactionHashes() ⇒ <code>Array</code>
Will iterate through each transaction and return an array of hashes

**Kind**: instance method of <code>[Block](#Block)</code>  
**Returns**: <code>Array</code> - - An array with transaction hashes  
<a name="Block+getMerkleTree"></a>

### block.getMerkleTree() ⇒ <code>Array</code>
Will build a merkle tree of all the transactions, ultimately arriving at
a single point, the merkle root.

**Kind**: instance method of <code>[Block](#Block)</code>  
**Returns**: <code>Array</code> - - An array with each level of the tree after the other.  
**Link**: https://en.bitcoin.it/wiki/Protocol_specification#Merkle_Trees  
<a name="Block+getMerkleRoot"></a>

### block.getMerkleRoot() ⇒ <code>Buffer</code>
Calculates the merkleRoot from the transactions.

**Kind**: instance method of <code>[Block](#Block)</code>  
**Returns**: <code>Buffer</code> - - A buffer of the merkle root hash  
<a name="Block+validMerkleRoot"></a>

### block.validMerkleRoot() ⇒ <code>Boolean</code>
Verifies that the transactions in the block match the header merkle root

**Kind**: instance method of <code>[Block](#Block)</code>  
**Returns**: <code>Boolean</code> - - If the merkle roots match  
<a name="Block+_getHash"></a>

### block._getHash() ⇒ <code>Buffer</code>
**Kind**: instance method of <code>[Block](#Block)</code>  
**Returns**: <code>Buffer</code> - - The little endian hash buffer of the header  
<a name="Block+inspect"></a>

### block.inspect() ⇒ <code>string</code>
**Kind**: instance method of <code>[Block](#Block)</code>  
**Returns**: <code>string</code> - - A string formatted for the console  
<a name="Block.fromObject"></a>

### Block.fromObject(obj) ⇒ <code>[Block](#Block)</code>
**Kind**: static method of <code>[Block](#Block)</code>  
**Returns**: <code>[Block](#Block)</code> - - An instance of block  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | A plain JavaScript object |

<a name="Block.fromBufferReader"></a>

### Block.fromBufferReader(br) ⇒ <code>[Block](#Block)</code>
**Kind**: static method of <code>[Block](#Block)</code>  
**Returns**: <code>[Block](#Block)</code> - - An instance of block  

| Param | Type | Description |
| --- | --- | --- |
| br | <code>BufferReader</code> | A buffer reader of the block |

<a name="Block.fromBuffer"></a>

### Block.fromBuffer(buf) ⇒ <code>[Block](#Block)</code>
**Kind**: static method of <code>[Block](#Block)</code>  
**Returns**: <code>[Block](#Block)</code> - - An instance of block  

| Param | Type | Description |
| --- | --- | --- |
| buf | <code>Buffer</code> | A buffer of the block |

<a name="Block.fromString"></a>

### Block.fromString(str) ⇒ <code>[Block](#Block)</code>
**Kind**: static method of <code>[Block](#Block)</code>  
**Returns**: <code>[Block](#Block)</code> - - A hex encoded string of the block  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | str - A hex encoded string of the block |

<a name="Block.fromRawBlock"></a>

### Block.fromRawBlock(data) ⇒ <code>[Block](#Block)</code>
**Kind**: static method of <code>[Block](#Block)</code>  
**Returns**: <code>[Block](#Block)</code> - - An instance of block  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Binary</code> | Raw block binary data or buffer |

