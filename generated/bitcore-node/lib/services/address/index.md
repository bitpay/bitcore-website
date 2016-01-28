<a name="AddressService"></a>
## AddressService(options)
The Address Service builds upon the Database Service and the Bitcoin Service to add additional
functionality for getting information by base58check encoded addresses. This includes getting the
balance for an address, the history for a collection of addresses, and unspent outputs for
constructing transactions. This is typically the core functionality for building a wallet.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.node | <code>Node</code> | An instance of the node |
| options.name | <code>String</code> | An optional name of the service |


* [AddressService(options)](#AddressService)
  * [.getAPIMethods()](#AddressService+getAPIMethods)
  * [.getPublishEvents()](#AddressService+getPublishEvents)
  * [.transactionOutputHandler(messages, tx, outputIndex, rejected)](#AddressService+transactionOutputHandler)
  * [.transactionLeaveHandler(txInfo)](#AddressService+transactionLeaveHandler)
  * [.transactionHandler(txInfo, [callback])](#AddressService+transactionHandler)
  * [.updateMempoolIndex(tx, add)](#AddressService+updateMempoolIndex)
  * [.blockHandler(block, addOutput, callback)](#AddressService+blockHandler)
  * [.transactionEventHandler(obj)](#AddressService+transactionEventHandler)
  * [.balanceEventHandler(block, obj)](#AddressService+balanceEventHandler)
  * [.subscribe(name, emitter, addresses)](#AddressService+subscribe)
  * [.unsubscribe(name, emitter, addresses)](#AddressService+unsubscribe)
  * [.unsubscribeAll(name, emitter)](#AddressService+unsubscribeAll)
  * [.getBalance(address, queryMempool, callback)](#AddressService+getBalance)
  * [.getInputForOutput(txid, outputIndex, options, callback)](#AddressService+getInputForOutput)
  * [.createInputsStream(addressStr, options, callback)](#AddressService+createInputsStream)
  * [.getInputs(addressStr, options, callback)](#AddressService+getInputs)
  * [.getOutputs(addressStr, options, callback)](#AddressService+getOutputs)
  * [.getUnspentOutputs(addresses, queryMempool, callback)](#AddressService+getUnspentOutputs)
  * [.getUnspentOutputsForAddress(address, queryMempool, callback)](#AddressService+getUnspentOutputsForAddress)
  * [.isUnspent(output, options, callback)](#AddressService+isUnspent)
  * [.isSpent(output, options, callback)](#AddressService+isSpent)
  * [.getAddressHistory(addresses, options, callback)](#AddressService+getAddressHistory)
  * [.getAddressSummary(address, options, callback)](#AddressService+getAddressSummary)

<a name="AddressService+getAPIMethods"></a>
### addressService.getAPIMethods()
Called by the Node to get the available API methods for this service,
that can be exposed over the JSON-RPC interface.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  
<a name="AddressService+getPublishEvents"></a>
### addressService.getPublishEvents()
Called by the Bus to get the available events for this service.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  
<a name="AddressService+transactionOutputHandler"></a>
### addressService.transactionOutputHandler(messages, tx, outputIndex, rejected)
Will process each output of a transaction from the daemon "tx" event, and construct
an object with the data for the message to be relayed to any subscribers for an address.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| messages | <code>Object</code> | An object to collect messages |
| tx | <code>Transaction</code> | Instance of the transaction |
| outputIndex | <code>Number</code> | The index of the output in the transaction |
| rejected | <code>Boolean</code> | If the transaction was rejected by the mempool |

<a name="AddressService+transactionLeaveHandler"></a>
### addressService.transactionLeaveHandler(txInfo)
This will handle data from the daemon "txleave" that a transaction has left the mempool.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txInfo | <code>Object</code> | The data from the daemon.on('txleave') event |
| txInfo.buffer | <code>Buffer</code> | The transaction buffer |
| txInfo.hash | <code>String</code> | The hash of the transaction |

<a name="AddressService+transactionHandler"></a>
### addressService.transactionHandler(txInfo, [callback])
This will handle data from the daemon "tx" event, go through each of the outputs
and send messages by calling `transactionEventHandler` to any subscribers for a
particular address.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txInfo | <code>Object</code> | The data from the daemon.on('tx') event |
| txInfo.buffer | <code>Buffer</code> | The transaction buffer |
| txInfo.mempool | <code>Boolean</code> | If the transaction was accepted in the mempool |
| txInfo.hash | <code>String</code> | The hash of the transaction |
| [callback] | <code>function</code> | Optional callback |

<a name="AddressService+updateMempoolIndex"></a>
### addressService.updateMempoolIndex(tx, add)
This function will update the mempool address index with the necessary
information for further lookups.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| tx | <code>Transaction</code> | An instance of a Bitcore Transaction |
| add | <code>Boolean</code> | Add/remove from the index |

<a name="AddressService+blockHandler"></a>
### addressService.blockHandler(block, addOutput, callback)
The Database Service will run this function when blocks are connected and
disconnected to the chain during syncing and reorganizations.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| block | <code>Block</code> | An instance of a Bitcore Block |
| addOutput | <code>Boolean</code> | If the block is being removed or added to the chain |
| callback | <code>function</code> |  |

<a name="AddressService+transactionEventHandler"></a>
### addressService.transactionEventHandler(obj)
This function is responsible for emitting events to any subscribers to the
`address/transaction` event.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> |  |
| obj.tx | <code>Transaction</code> | The transaction |
| obj.addressInfo | <code>Object</code> |  |
| obj.addressInfo.hashHex | <code>String</code> | The hex string of address hash for the subscription |
| obj.addressInfo.hashBuffer | <code>String</code> | The address hash buffer |
| obj.addressInfo.addressType | <code>String</code> | The address type |
| obj.outputIndexes | <code>Array</code> | Indexes of the inputs that includes the address |
| obj.inputIndexes | <code>Array</code> | Indexes of the outputs that includes the address |
| obj.timestamp | <code>Date</code> | The time of the block the transaction was included |
| obj.height | <code>Number</code> | The height of the block the transaction was included |
| obj.rejected | <code>Boolean</code> | If the transaction was not accepted in the mempool |

<a name="AddressService+balanceEventHandler"></a>
### addressService.balanceEventHandler(block, obj)
The function is responsible for emitting events to any subscribers for the
`address/balance` event.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type |
| --- | --- |
| block | <code>Block</code> | 
| obj | <code>Object</code> | 
| obj.hashHex | <code>String</code> | 
| obj.hashBuffer | <code>Buffer</code> | 
| obj.addressType | <code>String</code> | 

<a name="AddressService+subscribe"></a>
### addressService.subscribe(name, emitter, addresses)
The Bus will use this function to subscribe to the available
events for this service. For information about the available events
please see `getPublishEvents`.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the event |
| emitter | <code>EventEmitter</code> | An event emitter instance |
| addresses | <code>Array</code> | An array of addresses to subscribe |

<a name="AddressService+unsubscribe"></a>
### addressService.unsubscribe(name, emitter, addresses)
The Bus will use this function to unsubscribe to the available
events for this service.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the event |
| emitter | <code>EventEmitter</code> | An event emitter instance |
| addresses | <code>Array</code> | An array of addresses to subscribe |

<a name="AddressService+unsubscribeAll"></a>
### addressService.unsubscribeAll(name, emitter)
A helper function for the `unsubscribe` method to unsubscribe from all addresses.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the event |
| emitter | <code>EventEmitter</code> | An instance of an event emitter |

<a name="AddressService+getBalance"></a>
### addressService.getBalance(address, queryMempool, callback)
Will sum the total of all unspent outputs to calculate the balance
for an address.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>String</code> | The base58check encoded address |
| queryMempool | <code>Boolean</code> | Include mempool in the results |
| callback | <code>function</code> |  |

<a name="AddressService+getInputForOutput"></a>
### addressService.getInputForOutput(txid, outputIndex, options, callback)
Will give the input that spends an output if it exists with:
  inputTxId - The input txid hex string
  inputIndex - A number with the spending input index

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txid | <code>String</code> &#124; <code>Buffer</code> | The transaction hash with the output |
| outputIndex | <code>Number</code> | The output index in the transaction |
| options | <code>Object</code> |  |
| options.queryMempool | <code>Object</code> | Include mempool in results |
| callback | <code>function</code> |  |

<a name="AddressService+createInputsStream"></a>
### addressService.createInputsStream(addressStr, options, callback)
A streaming equivalent to `getInputs`, and returns a transform stream with data
emitted in the same format as `getInputs`.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addressStr | <code>String</code> | The relevant address |
| options | <code>Object</code> | Additional options for query the outputs |
| [options.start] | <code>Number</code> | The relevant start block height |
| [options.end] | <code>Number</code> | The relevant end block height |
| callback | <code>function</code> |  |

<a name="AddressService+getInputs"></a>
### addressService.getInputs(addressStr, options, callback)
Will give inputs that spend previous outputs for an address as an object with:
  address - The base58check encoded address
  hashtype - The type of the address, e.g. 'pubkeyhash' or 'scripthash'
  txid - A string of the transaction hash
  outputIndex - A number of corresponding transaction input
  height - The height of the block the transaction was included, will be -1 for mempool transactions
  confirmations - The number of confirmations, will equal 0 for mempool transactions

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addressStr | <code>String</code> | The relevant address |
| options | <code>Object</code> | Additional options for query the outputs |
| [options.start] | <code>Number</code> | The relevant start block height |
| [options.end] | <code>Number</code> | The relevant end block height |
| [options.queryMempool] | <code>Boolean</code> | Include the mempool in the results |
| callback | <code>function</code> |  |

<a name="AddressService+getOutputs"></a>
### addressService.getOutputs(addressStr, options, callback)
Will give outputs for an address as an object with:
  address - The base58check encoded address
  hashtype - The type of the address, e.g. 'pubkeyhash' or 'scripthash'
  txid - A string of the transaction hash
  outputIndex - A number of corresponding transaction output
  height - The height of the block the transaction was included, will be -1 for mempool transactions
  satoshis - The satoshis value of the output
  script - The script of the output as a hex string
  confirmations - The number of confirmations, will equal 0 for mempool transactions

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addressStr | <code>String</code> | The relevant address |
| options | <code>Object</code> | Additional options for query the outputs |
| [options.start] | <code>Number</code> | The relevant start block height |
| [options.end] | <code>Number</code> | The relevant end block height |
| [options.queryMempool] | <code>Boolean</code> | Include the mempool in the results |
| callback | <code>function</code> |  |

<a name="AddressService+getUnspentOutputs"></a>
### addressService.getUnspentOutputs(addresses, queryMempool, callback)
Will give unspent outputs for an address or an array of addresses.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addresses | <code>Array</code> &#124; <code>String</code> | An array of addresses |
| queryMempool | <code>Boolean</code> | Include or exclude the mempool |
| callback | <code>function</code> |  |

<a name="AddressService+getUnspentOutputsForAddress"></a>
### addressService.getUnspentOutputsForAddress(address, queryMempool, callback)
Will give unspent outputs for an address.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>String</code> | An address in base58check encoding |
| queryMempool | <code>Boolean</code> | Include or exclude the mempool |
| callback | <code>function</code> |  |

<a name="AddressService+isUnspent"></a>
### addressService.isUnspent(output, options, callback)
Will give the inverse of isSpent

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| output | <code>Object</code> |  |
| options | <code>Object</code> |  |
| options.queryMempool | <code>Boolean</code> | Include mempool in results |
| callback | <code>function</code> |  |

<a name="AddressService+isSpent"></a>
### addressService.isSpent(output, options, callback)
Will determine if an output is spent.

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| output | <code>Object</code> | An output as returned from getOutputs |
| options | <code>Object</code> |  |
| options.queryMempool | <code>Boolean</code> | Include mempool in results |
| callback | <code>function</code> |  |

<a name="AddressService+getAddressHistory"></a>
### addressService.getAddressHistory(addresses, options, callback)
This will give the history for many addresses limited by a range of block heights (to limit
the database lookup times) and/or paginated to limit the results length.

The response format will be:
{
  totalCount: 12 // the total number of items there are between the two heights
  items: [
    {
      addresses: {
        '12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX': {
          inputIndexes: [],
          outputIndexes: [0]
        }
      },
      satoshis: 100,
      height: 300000,
      confirmations: 1,
      timestamp: 1442337090 // in seconds
      fees: 1000 // in satoshis
      tx: <Transaction>
    }
  ]
}

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addresses | <code>Array</code> | An array of addresses |
| options | <code>Object</code> | The options to limit the query |
| [options.from] | <code>Number</code> | The pagination "from" index |
| [options.to] | <code>Number</code> | The pagination "to" index |
| [options.start] | <code>Number</code> | The beginning block height (e.g. 1500 the most recent block height). |
| [options.end] | <code>Number</code> | The ending block height (e.g. 0 the older block height, results are inclusive). |
| [options.queryMempool] | <code>Boolean</code> | Include the mempool in the query |
| callback | <code>function</code> |  |

<a name="AddressService+getAddressSummary"></a>
### addressService.getAddressSummary(address, options, callback)
This will give an object with:
  balance - confirmed balance
  unconfirmedBalance - unconfirmed balance
  totalReceived - satoshis received
  totalSpent - satoshis spent
  appearances - number of transactions
  unconfirmedAppearances - number of unconfirmed transactions
  txids - list of txids (unless noTxList is set)

**Kind**: instance method of <code>[AddressService](#AddressService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>String</code> |  |
| options | <code>Object</code> |  |
| [options.noTxList] | <code>Boolean</code> | if set, txid array will not be included |
| callback | <code>function</code> |  |

