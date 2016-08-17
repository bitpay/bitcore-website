<a name="UnspentOutput"></a>

## UnspentOutput
**Kind**: global class  

* [UnspentOutput](#UnspentOutput)
    * [new UnspentOutput(data)](#new_UnspentOutput_new)
    * _instance_
        * [.toObject](#UnspentOutput+toObject) ⇒ <code>object</code>
        * [.inspect()](#UnspentOutput+inspect) ⇒
        * [.toString()](#UnspentOutput+toString) ⇒
    * _static_
        * [.fromObject(data)](#UnspentOutput.fromObject) ⇒

<a name="new_UnspentOutput_new"></a>

### new UnspentOutput(data)
Represents an unspent output information: its script, associated amount and address,
transaction id and output index.


| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> |  |
| data.txid | <code>string</code> | the previous transaction id |
| [data.txId] | <code>string</code> | alias for `txid` |
| data.vout | <code>number</code> | the index in the transaction |
| [data.outputIndex] | <code>number</code> | alias for `vout` |
| data.scriptPubKey | <code>string</code> &#124; <code>Script</code> | the script that must be resolved to release the funds |
| data.script | <code>string</code> &#124; <code>Script</code> | alias for `scriptPubKey` |
| data.amount | <code>number</code> | amount of bitcoins associated |
| [data.satoshis] | <code>number</code> | alias for `amount`, but expressed in satoshis (1 BTC = 1e8 satoshis) |
| data.address | <code>string</code> &#124; <code>Address</code> | the associated address to the script, if provided |

<a name="UnspentOutput+toObject"></a>

### unspentOutput.toObject ⇒ <code>object</code>
Returns a plain object (no prototype or methods) with the associated info for this output

**Kind**: instance property of <code>[UnspentOutput](#UnspentOutput)</code>  
<a name="UnspentOutput+inspect"></a>

### unspentOutput.inspect() ⇒
Provide an informative output when displaying this object in the console

**Kind**: instance method of <code>[UnspentOutput](#UnspentOutput)</code>  
**Returns**: string  
<a name="UnspentOutput+toString"></a>

### unspentOutput.toString() ⇒
String representation: just "txid:index"

**Kind**: instance method of <code>[UnspentOutput](#UnspentOutput)</code>  
**Returns**: string  
<a name="UnspentOutput.fromObject"></a>

### UnspentOutput.fromObject(data) ⇒
Deserialize an UnspentOutput from an object

**Kind**: static method of <code>[UnspentOutput](#UnspentOutput)</code>  
**Returns**: UnspentOutput  

| Param | Type |
| --- | --- |
| data | <code>object</code> &#124; <code>string</code> | 

