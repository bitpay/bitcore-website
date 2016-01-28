<a name="Bitcoin"></a>
## Bitcoin(options)
Provides an interface to native bindings to [Bitcoin Core](https://github.com/bitcoin/bitcoin)
compiled as a static library. The C++ bindings can be found at `src/libbitcoind.cc`

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.node | <code>Node</code> | A reference to the node |


* [Bitcoin(options)](#Bitcoin)
  * [.start(callback)](#Bitcoin+start)
  * [.isSynced()](#Bitcoin+isSynced) ⇒ <code>Boolean</code>
  * [.syncPercentage()](#Bitcoin+syncPercentage) ⇒ <code>Number</code>
  * [.getBlock(block)](#Bitcoin+getBlock)
  * [.isSpent(txid, outputIndex)](#Bitcoin+isSpent) ⇒ <code>Boolean</code>
  * [.getBlockIndex(block)](#Bitcoin+getBlockIndex) ⇒ <code>Object</code>
  * [.isMainChain(blockHash)](#Bitcoin+isMainChain) ⇒ <code>Boolean</code>
  * [.estimateFee(blocks)](#Bitcoin+estimateFee) ⇒ <code>Number</code>
  * [.sendTransaction(transaction, allowAbsurdFees)](#Bitcoin+sendTransaction)
  * [.getTransaction(txid, queryMempool, callback)](#Bitcoin+getTransaction)
  * [.getTransactionWithBlockInfo(txid, queryMempool, callback)](#Bitcoin+getTransactionWithBlockInfo)
  * [.getMempoolTransactions()](#Bitcoin+getMempoolTransactions) ⇒ <code>Array</code>
  * [.addMempoolUncheckedTransaction(transaction)](#Bitcoin+addMempoolUncheckedTransaction)
  * [.getBestBlockHash()](#Bitcoin+getBestBlockHash) ⇒ <code>String</code>
  * [.getNextBlockHash(hash)](#Bitcoin+getNextBlockHash) ⇒ <code>String</code>
  * [.getInfo()](#Bitcoin+getInfo)
  * [.stop(callback)](#Bitcoin+stop)

<a name="Bitcoin+start"></a>
### bitcoin.start(callback)
Called by Node to start the service

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Bitcoin+isSynced"></a>
### bitcoin.isSynced() ⇒ <code>Boolean</code>
Helper to determine the state of the database.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  
**Returns**: <code>Boolean</code> - If the database is fully synced  
<a name="Bitcoin+syncPercentage"></a>
### bitcoin.syncPercentage() ⇒ <code>Number</code>
Helper to determine the progress of the database.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  
**Returns**: <code>Number</code> - An estimated percentage of the syncronization status  
<a name="Bitcoin+getBlock"></a>
### bitcoin.getBlock(block)
Will retrieve a block as a Node.js Buffer from disk.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>String</code> &#124; <code>Number</code> | A block hash or block height number |

<a name="Bitcoin+isSpent"></a>
### bitcoin.isSpent(txid, outputIndex) ⇒ <code>Boolean</code>
Will return the spent status of an output (not including the mempool)

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  
**Returns**: <code>Boolean</code> - If the output has been spent  

| Param | Type | Description |
| --- | --- | --- |
| txid | <code>String</code> | The transaction hash |
| outputIndex | <code>Number</code> | The output index in the transaction |

<a name="Bitcoin+getBlockIndex"></a>
### bitcoin.getBlockIndex(block) ⇒ <code>Object</code>
Will return the block index information, the output will have the format:
{
  prevHash: '7194fcf33f58c96720f88f21ab28c34ebc5638c5f88d7838517deb27313b59de',
  hash: '7c5caf0af1bf16e3467b275a3b408bc1d251bff3c25be20cb727c47b66a7b216',
  chainWork: '0000000000000000000000000000000000000000000000000000000000000016',
  height: 10
}

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>String</code> &#124; <code>Number</code> | A block hash or block height |

<a name="Bitcoin+isMainChain"></a>
### bitcoin.isMainChain(blockHash) ⇒ <code>Boolean</code>
Will return if the block is a part of the main chain.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type |
| --- | --- |
| blockHash | <code>String</code> | 

<a name="Bitcoin+estimateFee"></a>
### bitcoin.estimateFee(blocks) ⇒ <code>Number</code>
Will estimate the fee per kilobyte.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| blocks | <code>Number</code> | The number of blocks for the transaction to be confirmed. |

<a name="Bitcoin+sendTransaction"></a>
### bitcoin.sendTransaction(transaction, allowAbsurdFees)
Will add a transaction to the mempool and relay to connected peers, the function
will throw an error if there were validation problems.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>String</code> | The hex string of the transaction |
| allowAbsurdFees | <code>Boolean</code> | Enable large fees |

<a name="Bitcoin+getTransaction"></a>
### bitcoin.getTransaction(txid, queryMempool, callback)
Will get a transaction as a Node.js Buffer from disk and the mempool.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txid | <code>String</code> | The transaction hash |
| queryMempool | <code>Boolean</code> | Include the mempool |
| callback | <code>function</code> |  |

<a name="Bitcoin+getTransactionWithBlockInfo"></a>
### bitcoin.getTransactionWithBlockInfo(txid, queryMempool, callback)
Will get a transaction with additional information about the block, in the format:
{
  blockHash: '2725743288feae6bdaa976590af7cb12d7b535b5a242787de6d2789c73682ed1',
  height: 48,
  timestamp: 1442951110, // in seconds
  buffer: <Buffer...> // transaction buffer
}

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txid | <code>String</code> | The transaction hash |
| queryMempool | <code>Boolean</code> | Include the mempool |
| callback | <code>function</code> |  |

<a name="Bitcoin+getMempoolTransactions"></a>
### bitcoin.getMempoolTransactions() ⇒ <code>Array</code>
Will return the entire mempool as an Array of transaction Buffers.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  
<a name="Bitcoin+addMempoolUncheckedTransaction"></a>
### bitcoin.addMempoolUncheckedTransaction(transaction)
Will add a transaction to the mempool without any validation. This is used
exclusively for testing purposes.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>String</code> | The hex string for the transaction |

<a name="Bitcoin+getBestBlockHash"></a>
### bitcoin.getBestBlockHash() ⇒ <code>String</code>
Will get the best block hash for the chain.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  
<a name="Bitcoin+getNextBlockHash"></a>
### bitcoin.getNextBlockHash(hash) ⇒ <code>String</code>
Will get the next block hash for a block hash.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| hash | <code>String</code> | The starting block hash |

<a name="Bitcoin+getInfo"></a>
### bitcoin.getInfo()
This will return information about the database in the format:
{
  version: 110000,
  protocolversion: 70002,
  blocks: 151,
  timeoffset: 0,
  connections: 0,
  difficulty: 4.6565423739069247e-10,
  testnet: false,
  relayfee: 1000,
  errors: ''
}

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  
<a name="Bitcoin+stop"></a>
### bitcoin.stop(callback)
Called by Node to stop the service.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

