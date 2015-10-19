<a name="AddressHistory"></a>
## AddressHistory()
This represents an instance that keeps track of data over a series of
asynchronous I/O calls to get the transaction history for a group of
addresses. History can be queried by start and end block heights to limit large sets
of results (uses leveldb key streaming).

**Kind**: global function  

* [AddressHistory()](#AddressHistory)
  * _instance_
    * [.get()](#AddressHistory+get)
    * [.getTransactionInfo(address, next)](#AddressHistory+getTransactionInfo)
    * [.combineTransactionInfo()](#AddressHistory+combineTransactionInfo)
    * [.sortAndPaginateCombinedArray()](#AddressHistory+sortAndPaginateCombinedArray)
    * [.getDetailedInfo(txInfo, next)](#AddressHistory+getDetailedInfo)
    * [.getConfirmationsDetail(transaction)](#AddressHistory+getConfirmationsDetail)
    * [.getSatoshisDetail(transaction, txInfo)](#AddressHistory+getSatoshisDetail)
  * _static_
    * [.sortByHeight(a, b)](#AddressHistory.sortByHeight)

<a name="AddressHistory+get"></a>
### addressHistory.get()
This function will give detailed history for the configured
addresses. See AddressService.prototype.getAddressHistory
for complete documentation about options and response format.

**Kind**: instance method of <code>[AddressHistory](#AddressHistory)</code>  
<a name="AddressHistory+getTransactionInfo"></a>
### addressHistory.getTransactionInfo(address, next)
This function will retrieve input and output information for an address
and set the property `this.transactionInfo`.

**Kind**: instance method of <code>[AddressHistory](#AddressHistory)</code>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>String</code> | A base58check encoded address |
| next | <code>function</code> |  |

<a name="AddressHistory+combineTransactionInfo"></a>
### addressHistory.combineTransactionInfo()
This function combines results from getInputs and getOutputs at
`this.transactionInfo` to be "txid" unique at `this.combinedArray`.

**Kind**: instance method of <code>[AddressHistory](#AddressHistory)</code>  
<a name="AddressHistory+sortAndPaginateCombinedArray"></a>
### addressHistory.sortAndPaginateCombinedArray()
A helper function to sort and slice/paginate the `combinedArray`

**Kind**: instance method of <code>[AddressHistory](#AddressHistory)</code>  
<a name="AddressHistory+getDetailedInfo"></a>
### addressHistory.getDetailedInfo(txInfo, next)
This function will transform items from the combinedArray into
the detailedArray with the full transaction, satoshis and confirmation.

**Kind**: instance method of <code>[AddressHistory](#AddressHistory)</code>  

| Param | Type | Description |
| --- | --- | --- |
| txInfo | <code>Object</code> | An item from the `combinedArray` |
| next | <code>function</code> |  |

<a name="AddressHistory+getConfirmationsDetail"></a>
### addressHistory.getConfirmationsDetail(transaction)
A helper function for `getDetailedInfo` for getting the confirmations.

**Kind**: instance method of <code>[AddressHistory](#AddressHistory)</code>  

| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>Transaction</code> | A transaction with a populated __height value. |

<a name="AddressHistory+getSatoshisDetail"></a>
### addressHistory.getSatoshisDetail(transaction, txInfo)
A helper function for `getDetailedInfo` for getting the satoshis.

**Kind**: instance method of <code>[AddressHistory](#AddressHistory)</code>  

| Param | Type | Description |
| --- | --- | --- |
| transaction | <code>Transaction</code> | A transaction populated with previous outputs |
| txInfo | <code>Object</code> | An item from `combinedArray` |

<a name="AddressHistory.sortByHeight"></a>
### AddressHistory.sortByHeight(a, b)
A helper sort function to order by height and then by date
for transactions that are in the mempool.

**Kind**: static method of <code>[AddressHistory](#AddressHistory)</code>  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Object</code> | An item from the `combinedArray` |
| b | <code>Object</code> |  |

