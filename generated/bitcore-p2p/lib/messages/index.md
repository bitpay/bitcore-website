<a name="Messages"></a>
## Messages
**Kind**: global class  

* [Messages](#Messages)
  * [new Messages([options])](#new_Messages_new)
  * [.parseBuffer(dataBuffer)](#Messages+parseBuffer)

<a name="new_Messages_new"></a>
### new Messages([options])
A factory to build Bitcoin protocol messages.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.network] | <code>Network</code> |  |
| [options.Block] | <code>function</code> | A block constructor |
| [options.BlockHeader] | <code>function</code> | A block header constructor |
| [options.MerkleBlock] | <code>function</code> | A merkle block constructor |
| [options.Transaction] | <code>function</code> | A transaction constructor |

<a name="Messages+parseBuffer"></a>
### messages.parseBuffer(dataBuffer)
**Kind**: instance method of <code>[Messages](#Messages)</code>  

| Param | Type |
| --- | --- |
| dataBuffer | <code>Buffers</code> | 

