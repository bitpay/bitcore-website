<a name="AddressHistory"></a>
## AddressHistory()
This represents an instance that keeps track of data over a series of
asynchronous I/O calls to get the transaction history for a group of
addresses. History can be queried by start and end block heights to limit large sets
of results (uses leveldb key streaming).

**Kind**: global function  

* [AddressHistory()](#AddressHistory)
  * [.get()](#AddressHistory+get)
  * [.getDetailedInfo(txInfo, next)](#AddressHistory+getDetailedInfo)
  * [.getConfirmationsDetail(transaction)](#AddressHistory+getConfirmationsDetail)

<a name="AddressHistory+get"></a>
### addressHistory.get()
This function will give detailed history for the configured
addresses. See AddressService.prototype.getAddressHistory
for complete documentation about options and response format.

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

