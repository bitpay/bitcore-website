<a name="Insight"></a>

## Insight
**Kind**: global class  

* [Insight](#Insight)
    * [new Insight([url], [network])](#new_Insight_new)
    * _instance_
        * [.getUnspentUtxos(addresses, callback)](#Insight+getUnspentUtxos)
        * [.broadcast(transaction, callback)](#Insight+broadcast)
        * [.address(address, callback)](#Insight+address)
    * _static_
        * [.GetUnspentUtxosCallback](#Insight.GetUnspentUtxosCallback) : <code>function</code>
        * [.BroadcastCallback](#Insight.BroadcastCallback) : <code>function</code>
        * [.AddressCallback](#Insight.AddressCallback) : <code>function</code>

<a name="new_Insight_new"></a>

### new Insight([url], [network])
Allows the retrieval of information regarding the state of the blockchain
(and broadcasting of transactions) from/to a trusted Insight server.


| Param | Type | Description |
| --- | --- | --- |
| [url] | <code>string</code> | the url of the Insight server |
| [network] | <code>Network</code> | whether to use livenet or testnet |

<a name="Insight+getUnspentUtxos"></a>

### insight.getUnspentUtxos(addresses, callback)
Retrieve a list of unspent outputs associated with an address or set of addresses

**Kind**: instance method of <code>[Insight](#Insight)</code>  

| Param | Type |
| --- | --- |
| addresses | <code>Address</code> &#124; <code>string</code> &#124; <code>Array.Address</code> &#124; <code>Array.string</code> | 
| callback | <code>GetUnspentUtxosCallback</code> | 

<a name="Insight+broadcast"></a>

### insight.broadcast(transaction, callback)
Broadcast a transaction to the bitcoin network

**Kind**: instance method of <code>[Insight](#Insight)</code>  

| Param | Type |
| --- | --- |
| transaction | <code>transaction</code> &#124; <code>string</code> | 
| callback | <code>BroadcastCallback</code> | 

<a name="Insight+address"></a>

### insight.address(address, callback)
Retrieve information about an address

**Kind**: instance method of <code>[Insight](#Insight)</code>  

| Param | Type |
| --- | --- |
| address | <code>Address</code> &#124; <code>string</code> | 
| callback | <code>AddressCallback</code> | 

<a name="Insight.GetUnspentUtxosCallback"></a>

### Insight.GetUnspentUtxosCallback : <code>function</code>
**Kind**: static typedef of <code>[Insight](#Insight)</code>  

| Param | Type |
| --- | --- |
| err | <code>Error</code> | 
| utxos | <code>Array.UnspentOutput</code> | 

<a name="Insight.BroadcastCallback"></a>

### Insight.BroadcastCallback : <code>function</code>
**Kind**: static typedef of <code>[Insight](#Insight)</code>  

| Param | Type |
| --- | --- |
| err | <code>Error</code> | 
| txid | <code>string</code> | 

<a name="Insight.AddressCallback"></a>

### Insight.AddressCallback : <code>function</code>
**Kind**: static typedef of <code>[Insight](#Insight)</code>  

| Param | Type |
| --- | --- |
| err | <code>Error</code> | 
| info | <code>AddressInfo</code> | 

