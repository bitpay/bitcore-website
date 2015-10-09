<a name="Inventory"></a>
## Inventory
**Kind**: global class  

* [Inventory](#Inventory)
  * [new Inventory(obj)](#new_Inventory_new)
  * _instance_
    * [.toBuffer()](#Inventory+toBuffer) ⇒ <code>Buffer</code>
    * [.toBufferWriter(bw)](#Inventory+toBufferWriter)
  * _static_
    * [.forItem(type, hash)](#Inventory.forItem) ⇒ <code>[Inventory](#Inventory)</code>
    * [.forBlock(hash)](#Inventory.forBlock) ⇒ <code>[Inventory](#Inventory)</code>
    * [.forFilteredBlock(hash)](#Inventory.forFilteredBlock) ⇒ <code>[Inventory](#Inventory)</code>
    * [.forTransaction(hash)](#Inventory.forTransaction) ⇒ <code>[Inventory](#Inventory)</code>
    * [.fromBuffer(payload)](#Inventory.fromBuffer)
    * [.fromBufferReader(br)](#Inventory.fromBufferReader)

<a name="new_Inventory_new"></a>
### new Inventory(obj)
A constructor for inventory related Bitcoin messages such as
"getdata", "inv" and "notfound".


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> |  |
| obj.type | <code>Number</code> | Inventory.TYPE |
| obj.hash | <code>Buffer</code> | The hash for the inventory |

<a name="Inventory+toBuffer"></a>
### inventory.toBuffer() ⇒ <code>Buffer</code>
**Kind**: instance method of <code>[Inventory](#Inventory)</code>  
**Returns**: <code>Buffer</code> - - Serialized inventory  
<a name="Inventory+toBufferWriter"></a>
### inventory.toBufferWriter(bw)
**Kind**: instance method of <code>[Inventory](#Inventory)</code>  

| Param | Type | Description |
| --- | --- | --- |
| bw | <code>BufferWriter</code> | An instance of BufferWriter |

<a name="Inventory.forItem"></a>
### Inventory.forItem(type, hash) ⇒ <code>[Inventory](#Inventory)</code>
A convenience constructor for Inventory.

**Kind**: static method of <code>[Inventory](#Inventory)</code>  
**Returns**: <code>[Inventory](#Inventory)</code> - - A new instance of Inventory  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>Number</code> | Inventory.TYPE |
| hash | <code>Buffer</code> &#124; <code>String</code> | The hash for the inventory |

<a name="Inventory.forBlock"></a>
### Inventory.forBlock(hash) ⇒ <code>[Inventory](#Inventory)</code>
A convenience constructor for Inventory for block inventory types.

**Kind**: static method of <code>[Inventory](#Inventory)</code>  
**Returns**: <code>[Inventory](#Inventory)</code> - - A new instance of Inventory  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>Buffer</code> &#124; <code>String</code> | The hash for the block inventory |

<a name="Inventory.forFilteredBlock"></a>
### Inventory.forFilteredBlock(hash) ⇒ <code>[Inventory](#Inventory)</code>
A convenience constructor for Inventory for filtered/merkle block inventory types.

**Kind**: static method of <code>[Inventory](#Inventory)</code>  
**Returns**: <code>[Inventory](#Inventory)</code> - - A new instance of Inventory  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>Buffer</code> &#124; <code>String</code> | The hash for the filtered block inventory |

<a name="Inventory.forTransaction"></a>
### Inventory.forTransaction(hash) ⇒ <code>[Inventory](#Inventory)</code>
A convenience constructor for Inventory for transaction inventory types.

**Kind**: static method of <code>[Inventory](#Inventory)</code>  
**Returns**: <code>[Inventory](#Inventory)</code> - - A new instance of Inventory  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>Buffer</code> &#124; <code>String</code> | The hash for the transaction inventory |

<a name="Inventory.fromBuffer"></a>
### Inventory.fromBuffer(payload)
**Kind**: static method of <code>[Inventory](#Inventory)</code>  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Buffer</code> | Serialized buffer of the inventory |

<a name="Inventory.fromBufferReader"></a>
### Inventory.fromBufferReader(br)
**Kind**: static method of <code>[Inventory](#Inventory)</code>  

| Param | Type | Description |
| --- | --- | --- |
| br | <code>BufferWriter</code> | An instance of BufferWriter |

