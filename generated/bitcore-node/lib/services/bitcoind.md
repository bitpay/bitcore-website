<a name="Bitcoin"></a>

## Bitcoin(options)
Provides a friendly event driven API to bitcoind in Node.js. Manages starting and
stopping bitcoind as a child process for application support, as well as connecting
to multiple bitcoind processes for server infrastructure. Results are cached in an
LRU cache for improved performance and methods added for common queries.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.node | <code>Node</code> | A reference to the node |


* [Bitcoin(options)](#Bitcoin)
    * [.getAPIMethods()](#Bitcoin+getAPIMethods)
    * [.getPublishEvents()](#Bitcoin+getPublishEvents)
    * [.unsubscribeAddressAll(name, emitter)](#Bitcoin+unsubscribeAddressAll)
    * [.start(callback)](#Bitcoin+start)
    * [.isSynced(callback)](#Bitcoin+isSynced)
    * [.syncPercentage(callback)](#Bitcoin+syncPercentage)
    * [.getAddressBalance(addressArg, options, callback)](#Bitcoin+getAddressBalance)
    * [.getAddressUnspentOutputs(addressArg, options, callback)](#Bitcoin+getAddressUnspentOutputs)
    * [.getAddressTxids(addressArg, options, callback)](#Bitcoin+getAddressTxids)
    * [._getAddressDetailedTransaction(txid, callback)](#Bitcoin+_getAddressDetailedTransaction)
    * [.getAddressHistory(addressArg, options, callback)](#Bitcoin+getAddressHistory)
    * [.getAddressSummary(addressArg, options, callback)](#Bitcoin+getAddressSummary)
    * [.getRawBlock(block, callback)](#Bitcoin+getRawBlock)
    * [.getBlockOverview(block, callback)](#Bitcoin+getBlockOverview)
    * [.getBlock(block, callback)](#Bitcoin+getBlock)
    * [.getBlockHashesByTimestamp(high, low, callback)](#Bitcoin+getBlockHashesByTimestamp)
    * [.getBlockHeader(block, callback)](#Bitcoin+getBlockHeader)
    * [.estimateFee(blocks, callback)](#Bitcoin+estimateFee)
    * [.sendTransaction(transaction, [options], callback)](#Bitcoin+sendTransaction)
    * [.getRawTransaction(txid, callback)](#Bitcoin+getRawTransaction)
    * [.getTransaction(txid, queryMempool, callback)](#Bitcoin+getTransaction)
    * [.getDetailedTransaction(txid, callback)](#Bitcoin+getDetailedTransaction)
    * [.getBestBlockHash(callback)](#Bitcoin+getBestBlockHash)
    * [.getSpentInfo(callback)](#Bitcoin+getSpentInfo)
    * [.getInfo(callback)](#Bitcoin+getInfo)
    * [.stop(callback)](#Bitcoin+stop)

<a name="Bitcoin+getAPIMethods"></a>

### bitcoin.getAPIMethods()
Called by Node to determine the available API methods.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  
<a name="Bitcoin+getPublishEvents"></a>

### bitcoin.getPublishEvents()
Called by the Bus to determine the available events.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  
<a name="Bitcoin+unsubscribeAddressAll"></a>

### bitcoin.unsubscribeAddressAll(name, emitter)
A helper function for the `unsubscribe` method to unsubscribe from all addresses.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the event |
| emitter | <code>EventEmitter</code> | An instance of an event emitter |

<a name="Bitcoin+start"></a>

### bitcoin.start(callback)
Called by Node to start the service

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Bitcoin+isSynced"></a>

### bitcoin.isSynced(callback)
Helper to determine the state of the database.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Bitcoin+syncPercentage"></a>

### bitcoin.syncPercentage(callback)
Helper to determine the progress of the database.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Bitcoin+getAddressBalance"></a>

### bitcoin.getAddressBalance(addressArg, options, callback)
Will get the balance for an address or multiple addresses

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addressArg | <code>String</code> &#124; <code>Address</code> &#124; <code>Array</code> | An address string, bitcore address, or array of addresses |
| options | <code>Object</code> |  |
| callback | <code>function</code> |  |

<a name="Bitcoin+getAddressUnspentOutputs"></a>

### bitcoin.getAddressUnspentOutputs(addressArg, options, callback)
Will get the unspent outputs for an address or multiple addresses

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addressArg | <code>String</code> &#124; <code>Address</code> &#124; <code>Array</code> | An address string, bitcore address, or array of addresses |
| options | <code>Object</code> |  |
| callback | <code>function</code> |  |

<a name="Bitcoin+getAddressTxids"></a>

### bitcoin.getAddressTxids(addressArg, options, callback)
Will get the txids for an address or multiple addresses

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addressArg | <code>String</code> &#124; <code>Address</code> &#124; <code>Array</code> | An address string, bitcore address, or array of addresses |
| options | <code>Object</code> |  |
| callback | <code>function</code> |  |

<a name="Bitcoin+_getAddressDetailedTransaction"></a>

### bitcoin._getAddressDetailedTransaction(txid, callback)
Will expand into a detailed transaction from a txid

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txid | <code>Object</code> | A bitcoin transaction id |
| callback | <code>function</code> |  |

<a name="Bitcoin+getAddressHistory"></a>

### bitcoin.getAddressHistory(addressArg, options, callback)
Will detailed transaction history for an address or multiple addresses

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addressArg | <code>String</code> &#124; <code>Address</code> &#124; <code>Array</code> | An address string, bitcore address, or array of addresses |
| options | <code>Object</code> |  |
| callback | <code>function</code> |  |

<a name="Bitcoin+getAddressSummary"></a>

### bitcoin.getAddressSummary(addressArg, options, callback)
Will get the summary including txids and balance for an address or multiple addresses

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addressArg | <code>String</code> &#124; <code>Address</code> &#124; <code>Array</code> | An address string, bitcore address, or array of addresses |
| options | <code>Object</code> |  |
| callback | <code>function</code> |  |

<a name="Bitcoin+getRawBlock"></a>

### bitcoin.getRawBlock(block, callback)
Will retrieve a block as a Node.js Buffer

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>String</code> &#124; <code>Number</code> | A block hash or block height number |
| callback | <code>function</code> |  |

<a name="Bitcoin+getBlockOverview"></a>

### bitcoin.getBlockOverview(block, callback)
Similar to getBlockHeader but will include a list of txids

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>String</code> &#124; <code>Number</code> | A block hash or block height number |
| callback | <code>function</code> |  |

<a name="Bitcoin+getBlock"></a>

### bitcoin.getBlock(block, callback)
Will retrieve a block as a Bitcore object

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>String</code> &#124; <code>Number</code> | A block hash or block height number |
| callback | <code>function</code> |  |

<a name="Bitcoin+getBlockHashesByTimestamp"></a>

### bitcoin.getBlockHashesByTimestamp(high, low, callback)
Will retrieve an array of block hashes within a range of timestamps

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| high | <code>Number</code> | The more recent timestamp in seconds |
| low | <code>Number</code> | The older timestamp in seconds |
| callback | <code>function</code> |  |

<a name="Bitcoin+getBlockHeader"></a>

### bitcoin.getBlockHeader(block, callback)
Will return the block index information, the output will have the format:
{
  hash: '0000000000000a817cd3a74aec2f2246b59eb2cbb1ad730213e6c4a1d68ec2f6',
  confirmations: 5,
  height: 828781,
  chainWork: '00000000000000000000000000000000000000000000000ad467352c93bc6a3b',
  prevHash: '0000000000000504235b2aff578a48470dbf6b94dafa9b3703bbf0ed554c9dd9',
  nextHash: '00000000000000eedd967ec155f237f033686f0924d574b946caf1b0e89551b8'
  version: 536870912,
  merkleRoot: '124e0f3fb5aa268f102b0447002dd9700988fc570efcb3e0b5b396ac7db437a9',
  time: 1462979126,
  medianTime: 1462976771,
  nonce: 2981820714,
  bits: '1a13ca10',
  difficulty: 847779.0710240941,
}

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>String</code> &#124; <code>Number</code> | A block hash or block height |
| callback | <code>function</code> |  |

<a name="Bitcoin+estimateFee"></a>

### bitcoin.estimateFee(blocks, callback)
Will estimate the fee per kilobyte.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| blocks | <code>Number</code> | The number of blocks for the transaction to be confirmed. |
| callback | <code>function</code> |  |

<a name="Bitcoin+sendTransaction"></a>

### bitcoin.sendTransaction(transaction, [options], callback)
Will add a transaction to the mempool and relay to connected peers

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>String</code> &#124; <code>Transaction</code> | The hex string of the transaction |
| [options] | <code>Object</code> |  |
| [options.allowAbsurdFees] | <code>Boolean</code> | Enable large fees |
| callback | <code>function</code> |  |

<a name="Bitcoin+getRawTransaction"></a>

### bitcoin.getRawTransaction(txid, callback)
Will get a transaction as a Node.js Buffer. Results include the mempool.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txid | <code>String</code> | The transaction hash |
| callback | <code>function</code> |  |

<a name="Bitcoin+getTransaction"></a>

### bitcoin.getTransaction(txid, queryMempool, callback)
Will get a transaction as a Bitcore Transaction. Results include the mempool.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txid | <code>String</code> | The transaction hash |
| queryMempool | <code>Boolean</code> | Include the mempool |
| callback | <code>function</code> |  |

<a name="Bitcoin+getDetailedTransaction"></a>

### bitcoin.getDetailedTransaction(txid, callback)
Will get a detailed view of a transaction including addresses, amounts and fees.

Example result:
{
  blockHash: '000000000000000002cd0ba6e8fae058747d2344929ed857a18d3484156c9250',
  height: 411462,
  blockTimestamp: 1463070382,
  version: 1,
  hash: 'de184cc227f6d1dc0316c7484aa68b58186a18f89d853bb2428b02040c394479',
  locktime: 411451,
  coinbase: true,
  inputs: [
    {
      prevTxId: '3d003413c13eec3fa8ea1fe8bbff6f40718c66facffe2544d7516c9e2900cac2',
      outputIndex: 0,
      sequence: 123456789,
      script: [hexString],
      scriptAsm: [asmString],
      address: '1LCTmj15p7sSXv3jmrPfA6KGs6iuepBiiG',
      satoshis: 771146
    }
  ],
  outputs: [
    {
      satoshis: 811146,
      script: '76a914d2955017f4e3d6510c57b427cf45ae29c372c99088ac',
      scriptAsm: 'OP_DUP OP_HASH160 d2955017f4e3d6510c57b427cf45ae29c372c990 OP_EQUALVERIFY OP_CHECKSIG',
      address: '1LCTmj15p7sSXv3jmrPfA6KGs6iuepBiiG',
      spentTxId: '4316b98e7504073acd19308b4b8c9f4eeb5e811455c54c0ebfe276c0b1eb6315',
      spentIndex: 1,
      spentHeight: 100
    }
  ],
  inputSatoshis: 771146,
  outputSatoshis: 811146,
  feeSatoshis: 40000
};

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txid | <code>String</code> | The hex string of the transaction |
| callback | <code>function</code> |  |

<a name="Bitcoin+getBestBlockHash"></a>

### bitcoin.getBestBlockHash(callback)
Will get the best block hash for the chain.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Bitcoin+getSpentInfo"></a>

### bitcoin.getSpentInfo(callback)
Will give the txid and inputIndex that spent an output

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Bitcoin+getInfo"></a>

### bitcoin.getInfo(callback)
This will return information about the database in the format:
{
  version: 110000,
  protocolVersion: 70002,
  blocks: 151,
  timeOffset: 0,
  connections: 0,
  difficulty: 4.6565423739069247e-10,
  testnet: false,
  network: 'testnet'
  relayFee: 1000,
  errors: ''
}

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="Bitcoin+stop"></a>

### bitcoin.stop(callback)
Called by Node to stop the service.

**Kind**: instance method of <code>[Bitcoin](#Bitcoin)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

