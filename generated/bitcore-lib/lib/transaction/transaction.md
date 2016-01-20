<a name="Transaction"></a>
## Transaction
**Kind**: global class  

* [Transaction](#Transaction)
  * [new Transaction(serialized)](#new_Transaction_new)
  * _instance_
    * [._getHash()](#Transaction+_getHash) ⇒ <code>Buffer</code>
    * [.serialize(unsafe)](#Transaction+serialize) ⇒ <code>string</code>
    * [.checkedSerialize(opts)](#Transaction+checkedSerialize) ⇒ <code>string</code>
    * [.getSerializationError(opts)](#Transaction+getSerializationError) ⇒ <code>bitcore.Error</code>
    * [.lockUntilDate(time)](#Transaction+lockUntilDate) ⇒ <code>[Transaction](#Transaction)</code>
    * [.lockUntilBlockHeight(height)](#Transaction+lockUntilBlockHeight) ⇒ <code>[Transaction](#Transaction)</code>
    * [.getLockTime()](#Transaction+getLockTime) ⇒ <code>Number</code> &#124; <code>Date</code>
    * [.from(utxo, [pubkeys], [threshold])](#Transaction+from)
    * [.addInput(input, outputScript, satoshis)](#Transaction+addInput) ⇒
    * [.uncheckedAddInput(input)](#Transaction+uncheckedAddInput) ⇒
    * [.hasAllUtxoInfo()](#Transaction+hasAllUtxoInfo) ⇒ <code>boolean</code>
    * [.fee(amount)](#Transaction+fee) ⇒ <code>[Transaction](#Transaction)</code>
    * [.feePerKb(amount)](#Transaction+feePerKb) ⇒ <code>[Transaction](#Transaction)</code>
    * [.change(address)](#Transaction+change) ⇒ <code>[Transaction](#Transaction)</code>
    * [.getChangeOutput()](#Transaction+getChangeOutput) ⇒ <code>Output</code>
    * [.to(address, amount)](#Transaction+to) ⇒ <code>[Transaction](#Transaction)</code>
    * [.addData(value)](#Transaction+addData) ⇒ <code>[Transaction](#Transaction)</code>
    * [.addOutput(output)](#Transaction+addOutput) ⇒ <code>[Transaction](#Transaction)</code>
    * [.clearOutputs()](#Transaction+clearOutputs) ⇒ <code>[Transaction](#Transaction)</code>
    * [._getOutputAmount()](#Transaction+_getOutputAmount) ⇒ <code>Number</code>
    * [._getInputAmount()](#Transaction+_getInputAmount) ⇒ <code>Number</code>
    * [.getFee()](#Transaction+getFee) ⇒ <code>Number</code>
    * [._estimateFee()](#Transaction+_estimateFee)
    * [.sort()](#Transaction+sort) ⇒ <code>[Transaction](#Transaction)</code>
    * [.shuffleOutputs()](#Transaction+shuffleOutputs) ⇒ <code>[Transaction](#Transaction)</code>
    * [.sortOutputs(sortingFunction)](#Transaction+sortOutputs) ⇒ <code>[Transaction](#Transaction)</code>
    * [.sortInputs(sortingFunction)](#Transaction+sortInputs) ⇒ <code>[Transaction](#Transaction)</code>
    * [.sign(privateKey, sigtype)](#Transaction+sign) ⇒ <code>[Transaction](#Transaction)</code>
    * [.applySignature(signature)](#Transaction+applySignature) ⇒ <code>[Transaction](#Transaction)</code>
    * [.verifySignature()](#Transaction+verifySignature) ⇒ <code>bool</code>
    * [.verify()](#Transaction+verify)
    * [.isCoinbase()](#Transaction+isCoinbase)
  * _static_
    * [.shallowCopy(transaction)](#Transaction.shallowCopy) ⇒ <code>[Transaction](#Transaction)</code>
  * _inner_
    * [~fromObject](#Transaction..fromObject) : <code>Object</code>
    * [~toObject](#Transaction..toObject) : <code>Object</code>

<a name="new_Transaction_new"></a>
### new Transaction(serialized)
Represents a transaction, a set of inputs and outputs to change ownership of tokens


| Param | Type |
| --- | --- |
| serialized | <code>\*</code> | 

<a name="Transaction+_getHash"></a>
### transaction._getHash() ⇒ <code>Buffer</code>
Retrieve the little endian hash of the transaction (used for serialization)

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
<a name="Transaction+serialize"></a>
### transaction.serialize(unsafe) ⇒ <code>string</code>
Retrieve a hexa string that can be used with bitcoind's CLI interface
(decoderawtransaction, sendrawtransaction)

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  

| Param | Type | Description |
| --- | --- | --- |
| unsafe | <code>Object</code> &#124; <code>boolean</code> | if true, skip all tests. if it's an object,   it's expected to contain a set of flags to skip certain tests: * `disableAll`: disable all checks * `disableSmallFees`: disable checking for fees that are too small * `disableLargeFees`: disable checking for fees that are too large * `disableIsFullySigned`: disable checking if all inputs are fully signed * `disableDustOutputs`: disable checking if there are no outputs that are dust amounts * `disableMoreOutputThanInput`: disable checking if the transaction spends more bitcoins than the sum of the input amounts |

<a name="Transaction+checkedSerialize"></a>
### transaction.checkedSerialize(opts) ⇒ <code>string</code>
Retrieve a hexa string that can be used with bitcoind's CLI interface
(decoderawtransaction, sendrawtransaction)

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | allows to skip certain tests. {@see Transaction#serialize} |

<a name="Transaction+getSerializationError"></a>
### transaction.getSerializationError(opts) ⇒ <code>bitcore.Error</code>
Retrieve a possible error that could appear when trying to serialize and
broadcast this transaction.

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | allows to skip certain tests. {@see Transaction#serialize} |

<a name="Transaction+lockUntilDate"></a>
### transaction.lockUntilDate(time) ⇒ <code>[Transaction](#Transaction)</code>
Sets nLockTime so that transaction is not valid until the desired date(a
timestamp in seconds since UNIX epoch is also accepted)

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this  

| Param | Type |
| --- | --- |
| time | <code>Date</code> &#124; <code>Number</code> | 

<a name="Transaction+lockUntilBlockHeight"></a>
### transaction.lockUntilBlockHeight(height) ⇒ <code>[Transaction](#Transaction)</code>
Sets nLockTime so that transaction is not valid until the desired block
height.

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this  

| Param | Type |
| --- | --- |
| height | <code>Number</code> | 

<a name="Transaction+getLockTime"></a>
### transaction.getLockTime() ⇒ <code>Number</code> &#124; <code>Date</code>
Returns a semantic version of the transaction's nLockTime.

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>Number</code> &#124; <code>Date</code> - If nLockTime is 0, it returns null,
 if it is < 500000000, it returns a block height (number)
 else it returns a Date object.  
<a name="Transaction+from"></a>
### transaction.from(utxo, [pubkeys], [threshold])
Add an input to this transaction. This is a high level interface
to add an input, for more control, use @{link Transaction#addInput}.

Can receive, as output information, the output of bitcoind's `listunspent` command,
and a slightly fancier format recognized by bitcore:

```
{
 address: 'mszYqVnqKoQx4jcTdJXxwKAissE3Jbrrc1',
 txId: 'a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458',
 outputIndex: 0,
 script: Script.empty(),
 satoshis: 1020000
}
```
Where `address` can be either a string or a bitcore Address object. The
same is true for `script`, which can be a string or a bitcore Script.

Beware that this resets all the signatures for inputs (in further versions,
SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  

| Param | Type |
| --- | --- |
| utxo | <code>[Array.&lt;fromObject&gt;](#Transaction..fromObject)</code> &#124; <code>[fromObject](#Transaction..fromObject)</code> | 
| [pubkeys] | <code>Array</code> | 
| [threshold] | <code>number</code> | 

**Example**  
```javascript
var transaction = new Transaction();

// From a pay to public key hash output from bitcoind's listunspent
transaction.from({'txid': '0000...', vout: 0, amount: 0.1, scriptPubKey: 'OP_DUP ...'});

// From a pay to public key hash output
transaction.from({'txId': '0000...', outputIndex: 0, satoshis: 1000, script: 'OP_DUP ...'});

// From a multisig P2SH output
transaction.from({'txId': '0000...', inputIndex: 0, satoshis: 1000, script: '... OP_HASH'},
                 ['03000...', '02000...'], 2);
```
<a name="Transaction+addInput"></a>
### transaction.addInput(input, outputScript, satoshis) ⇒
Add an input to this transaction. The input must be an instance of the `Input` class.
It should have information about the Output that it's spending, but if it's not already
set, two additional parameters, `outputScript` and `satoshis` can be provided.

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: Transaction this, for chaining  

| Param | Type |
| --- | --- |
| input | <code>Input</code> | 
| outputScript | <code>String</code> &#124; <code>Script</code> | 
| satoshis | <code>number</code> | 

<a name="Transaction+uncheckedAddInput"></a>
### transaction.uncheckedAddInput(input) ⇒
Add an input to this transaction, without checking that the input has information about
the output that it's spending.

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: Transaction this, for chaining  

| Param | Type |
| --- | --- |
| input | <code>Input</code> | 

<a name="Transaction+hasAllUtxoInfo"></a>
### transaction.hasAllUtxoInfo() ⇒ <code>boolean</code>
Returns true if the transaction has enough info on all inputs to be correctly validated

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
<a name="Transaction+fee"></a>
### transaction.fee(amount) ⇒ <code>[Transaction](#Transaction)</code>
Manually set the fee for this transaction. Beware that this resets all the signatures
for inputs (in further versions, SIGHASH_SINGLE or SIGHASH_NONE signatures will not
be reset).

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this, for chaining  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | satoshis to be sent |

<a name="Transaction+feePerKb"></a>
### transaction.feePerKb(amount) ⇒ <code>[Transaction](#Transaction)</code>
Manually set the fee per KB for this transaction. Beware that this resets all the signatures
for inputs (in further versions, SIGHASH_SINGLE or SIGHASH_NONE signatures will not
be reset).

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this, for chaining  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> | satoshis per KB to be sent |

<a name="Transaction+change"></a>
### transaction.change(address) ⇒ <code>[Transaction](#Transaction)</code>
Set the change address for this transaction

Beware that this resets all the signatures for inputs (in further versions,
SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this, for chaining  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>Address</code> | An address for change to be sent to. |

<a name="Transaction+getChangeOutput"></a>
### transaction.getChangeOutput() ⇒ <code>Output</code>
**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>Output</code> - change output, if it exists  
<a name="Transaction+to"></a>
### transaction.to(address, amount) ⇒ <code>[Transaction](#Transaction)</code>
Add an output to the transaction.

Beware that this resets all the signatures for inputs (in further versions,
SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this, for chaining  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> &#124; <code>Address</code> &#124; <code>[Array.&lt;toObject&gt;](#Transaction..toObject)</code> |  |
| amount | <code>number</code> | in satoshis |

<a name="Transaction+addData"></a>
### transaction.addData(value) ⇒ <code>[Transaction](#Transaction)</code>
Add an OP_RETURN output to the transaction.

Beware that this resets all the signatures for inputs (in further versions,
SIGHASH_SINGLE or SIGHASH_NONE signatures will not be reset).

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this, for chaining  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Buffer</code> &#124; <code>string</code> | the data to be stored in the OP_RETURN output.    In case of a string, the UTF-8 representation will be stored |

<a name="Transaction+addOutput"></a>
### transaction.addOutput(output) ⇒ <code>[Transaction](#Transaction)</code>
Add an output to the transaction.

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this, for chaining  

| Param | Type | Description |
| --- | --- | --- |
| output | <code>Output</code> | the output to add. |

<a name="Transaction+clearOutputs"></a>
### transaction.clearOutputs() ⇒ <code>[Transaction](#Transaction)</code>
Remove all outputs from the transaction.

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this, for chaining  
<a name="Transaction+_getOutputAmount"></a>
### transaction._getOutputAmount() ⇒ <code>Number</code>
Calculates or gets the total output amount in satoshis

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>Number</code> - the transaction total output amount  
<a name="Transaction+_getInputAmount"></a>
### transaction._getInputAmount() ⇒ <code>Number</code>
Calculates or gets the total input amount in satoshis

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>Number</code> - the transaction total input amount  
<a name="Transaction+getFee"></a>
### transaction.getFee() ⇒ <code>Number</code>
Calculates the fee of the transaction.

If there's a fixed fee set, return that.

If there is no change output set, the fee is the
total value of the outputs minus inputs. Note that
a serialized transaction only specifies the value
of its outputs. (The value of inputs are recorded
in the previous transaction outputs being spent.)
This method therefore raises a "MissingPreviousOutput"
error when called on a serialized transaction.

If there's no fee set and no change address,
estimate the fee based on size.

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>Number</code> - fee of this transaction in satoshis  
<a name="Transaction+_estimateFee"></a>
### transaction._estimateFee()
Estimates fee from serialized transaction size in bytes.

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
<a name="Transaction+sort"></a>
### transaction.sort() ⇒ <code>[Transaction](#Transaction)</code>
Sort a transaction's inputs and outputs according to BIP69

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this  
**See**: {https://github.com/bitcoin/bips/blob/master/bip-0069.mediawiki}  
<a name="Transaction+shuffleOutputs"></a>
### transaction.shuffleOutputs() ⇒ <code>[Transaction](#Transaction)</code>
Randomize this transaction's outputs ordering. The shuffling algorithm is a
version of the Fisher-Yates shuffle, provided by lodash's _.shuffle().

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this  
<a name="Transaction+sortOutputs"></a>
### transaction.sortOutputs(sortingFunction) ⇒ <code>[Transaction](#Transaction)</code>
Sort this transaction's outputs, according to a given sorting function that
takes an array as argument and returns a new array, with the same elements
but with a different order. The argument function MUST NOT modify the order
of the original array

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this  

| Param | Type |
| --- | --- |
| sortingFunction | <code>function</code> | 

<a name="Transaction+sortInputs"></a>
### transaction.sortInputs(sortingFunction) ⇒ <code>[Transaction](#Transaction)</code>
Sort this transaction's inputs, according to a given sorting function that
takes an array as argument and returns a new array, with the same elements
but with a different order.

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this  

| Param | Type |
| --- | --- |
| sortingFunction | <code>function</code> | 

<a name="Transaction+sign"></a>
### transaction.sign(privateKey, sigtype) ⇒ <code>[Transaction](#Transaction)</code>
Sign the transaction using one or more private keys.

It tries to sign each input, verifying that the signature will be valid
(matches a public key).

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this, for chaining  

| Param | Type |
| --- | --- |
| privateKey | <code>Array</code> &#124; <code>String</code> &#124; <code>PrivateKey</code> | 
| sigtype | <code>number</code> | 

<a name="Transaction+applySignature"></a>
### transaction.applySignature(signature) ⇒ <code>[Transaction](#Transaction)</code>
Add a signature to the transaction

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>[Transaction](#Transaction)</code> - this, for chaining  

| Param | Type |
| --- | --- |
| signature | <code>Object</code> | 
| signature.inputIndex | <code>number</code> | 
| signature.sigtype | <code>number</code> | 
| signature.publicKey | <code>PublicKey</code> | 
| signature.signature | <code>Signature</code> | 

<a name="Transaction+verifySignature"></a>
### transaction.verifySignature() ⇒ <code>bool</code>
**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
**Returns**: <code>bool</code> - whether the signature is valid for this transaction input  
<a name="Transaction+verify"></a>
### transaction.verify()
Check that a transaction passes basic sanity tests. If not, return a string
describing the error. This function contains the same logic as
CheckTransaction in bitcoin core.

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
<a name="Transaction+isCoinbase"></a>
### transaction.isCoinbase()
Analogous to bitcoind's IsCoinBase function in transaction.h

**Kind**: instance method of <code>[Transaction](#Transaction)</code>  
<a name="Transaction.shallowCopy"></a>
### Transaction.shallowCopy(transaction) ⇒ <code>[Transaction](#Transaction)</code>
Create a 'shallow' copy of the transaction, by serializing and deserializing
it dropping any additional information that inputs and outputs may have hold

**Kind**: static method of <code>[Transaction](#Transaction)</code>  

| Param | Type |
| --- | --- |
| transaction | <code>[Transaction](#Transaction)</code> | 

<a name="Transaction..fromObject"></a>
### Transaction~fromObject : <code>Object</code>
**Kind**: inner typedef of <code>[Transaction](#Transaction)</code>  
**Properties**

| Name | Type |
| --- | --- |
| prevTxId | <code>string</code> | 
| outputIndex | <code>number</code> | 
| script | <code>Buffer</code> &#124; <code>string</code> &#124; <code>Script</code> | 
| satoshis | <code>number</code> | 

<a name="Transaction..toObject"></a>
### Transaction~toObject : <code>Object</code>
**Kind**: inner typedef of <code>[Transaction](#Transaction)</code>  
**Properties**

| Name | Type |
| --- | --- |
| address | <code>string</code> &#124; <code>Address</code> | 
| satoshis | <code>number</code> | 

