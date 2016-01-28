<a name="DB"></a>
## DB(options)
This service synchronizes a leveldb database with bitcoin block chain by connecting and
disconnecting blocks to build new indexes that can be queried. Other services can extend
the data that is indexed by implementing a `blockHandler` method.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.node | <code>Node</code> | A reference to the node |
| options.store | <code>Node</code> | A levelup backend store |


* [DB(options)](#DB)
  * [.start(callback)](#DB+start)
  * [.stop(callback)](#DB+stop)
  * [.getInfo(callback)](#DB+getInfo)
  * [.close(callback)](#DB+close)
  * [.transactionHandler(txInfo)](#DB+transactionHandler)
  * [.getAPIMethods()](#DB+getAPIMethods)
  * [.getBlock(hash)](#DB+getBlock)
  * [.getBlockHashesByTimestamp(high, low, callback)](#DB+getBlockHashesByTimestamp)
  * [.getTransaction(txid, queryMempool, callback)](#DB+getTransaction)
  * [.getTransactionWithBlockInfo(txid, queryMempool, callback)](#DB+getTransactionWithBlockInfo)
  * [.sendTransaction(tx, callback)](#DB+sendTransaction)
  * [.estimateFee(blocks, callback)](#DB+estimateFee)
  * [.getPublishEvents()](#DB+getPublishEvents)
  * [.getPrevHash(blockHash, callback)](#DB+getPrevHash)
  * [.connectBlock(block, callback)](#DB+connectBlock)
  * [.disconnectBlock(block, callback)](#DB+disconnectBlock)
  * [.runAllBlockHandlers(block, add, callback)](#DB+runAllBlockHandlers)
  * [.findCommonAncestor(block, done)](#DB+findCommonAncestor)
  * [.syncRewind(block, done)](#DB+syncRewind)
  * [.sync()](#DB+sync)

<a name="DB+start"></a>
### dB.start(callback)
Called by Node to start the service.

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="DB+stop"></a>
### dB.stop(callback)
Called by Node to stop the service

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="DB+getInfo"></a>
### dB.getInfo(callback)
Will give information about the database from bitcoin.

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="DB+close"></a>
### dB.close(callback)
Closes the underlying store database

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="DB+transactionHandler"></a>
### dB.transactionHandler(txInfo)
This function is responsible for emitting `db/transaction` events.

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txInfo | <code>Object</code> | The data from the bitcoind.on('tx') event |
| txInfo.buffer | <code>Buffer</code> | The transaction buffer |
| txInfo.mempool | <code>Boolean</code> | If the transaction was accepted in the mempool |
| txInfo.hash | <code>String</code> | The hash of the transaction |

<a name="DB+getAPIMethods"></a>
### dB.getAPIMethods()
Called by Node to determine the available API methods.

**Kind**: instance method of <code>[DB](#DB)</code>  
<a name="DB+getBlock"></a>
### dB.getBlock(hash)
Will get a block from bitcoind and give a Bitcore Block

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>String</code> &#124; <code>Number</code> | A block hash or block height |

<a name="DB+getBlockHashesByTimestamp"></a>
### dB.getBlockHashesByTimestamp(high, low, callback)
Get block hashes between two timestamps

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| high | <code>Number</code> | high timestamp, in seconds, inclusive |
| low | <code>Number</code> | low timestamp, in seconds, inclusive |
| callback | <code>function</code> |  |

<a name="DB+getTransaction"></a>
### dB.getTransaction(txid, queryMempool, callback)
Will give a Bitcore Transaction from bitcoind by txid

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txid | <code>String</code> | A transaction hash |
| queryMempool | <code>Boolean</code> | Include the mempool |
| callback | <code>function</code> |  |

<a name="DB+getTransactionWithBlockInfo"></a>
### dB.getTransactionWithBlockInfo(txid, queryMempool, callback)
Will give a Bitcore Transaction and populated information about the block included.

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txid | <code>String</code> | A transaction hash |
| queryMempool | <code>Boolean</code> | Include the mempool |
| callback | <code>function</code> |  |

<a name="DB+sendTransaction"></a>
### dB.sendTransaction(tx, callback)
Will send a transaction to the Bitcoin network.

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tx | <code>Transaction</code> | An instance of a Bitcore Transaction |
| callback | <code>function</code> |  |

<a name="DB+estimateFee"></a>
### dB.estimateFee(blocks, callback)
Will estimate fees for a transaction and give a result in
satoshis per kilobyte. Similar to the bitcoind estimateFee method.

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| blocks | <code>Number</code> | The number of blocks for the transaction to be included. |
| callback | <code>function</code> |  |

<a name="DB+getPublishEvents"></a>
### dB.getPublishEvents()
Called by the Bus to determine the available events.

**Kind**: instance method of <code>[DB](#DB)</code>  
<a name="DB+getPrevHash"></a>
### dB.getPrevHash(blockHash, callback)
Will give the previous hash for a block.

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type |
| --- | --- |
| blockHash | <code>String</code> | 
| callback | <code>function</code> | 

<a name="DB+connectBlock"></a>
### dB.connectBlock(block, callback)
Connects a block to the database and add indexes

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Block</code> | The bitcore block |
| callback | <code>function</code> |  |

<a name="DB+disconnectBlock"></a>
### dB.disconnectBlock(block, callback)
Disconnects a block from the database and removes indexes

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Block</code> | The bitcore block |
| callback | <code>function</code> |  |

<a name="DB+runAllBlockHandlers"></a>
### dB.runAllBlockHandlers(block, add, callback)
Will collect all database operations for a block from other services that implement
`blockHandler` methods and then save operations to the database.

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Block</code> | The bitcore block |
| add | <code>Boolean</code> | If the block is being added/connected or removed/disconnected |
| callback | <code>function</code> |  |

<a name="DB+findCommonAncestor"></a>
### dB.findCommonAncestor(block, done)
This function will find the common ancestor between the current chain and a forked block,
by moving backwards on both chains until there is a meeting point.

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Block</code> | The new tip that forks the current chain. |
| done | <code>function</code> | A callback function that is called when complete. |

<a name="DB+syncRewind"></a>
### dB.syncRewind(block, done)
This function will attempt to rewind the chain to the common ancestor
between the current chain and a forked block.

**Kind**: instance method of <code>[DB](#DB)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Block</code> | The new tip that forks the current chain. |
| done | <code>function</code> | A callback function that is called when complete. |

<a name="DB+sync"></a>
### dB.sync()
This function will synchronize additional indexes for the chain based on
the current active chain in the bitcoin daemon. In the event that there is
a reorganization in the daemon, the chain will rewind to the last common
ancestor and then resume syncing.

**Kind**: instance method of <code>[DB](#DB)</code>  
