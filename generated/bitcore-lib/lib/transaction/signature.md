<a name="TransactionSignature"></a>

## TransactionSignature
**Kind**: global class  

* [TransactionSignature](#TransactionSignature)
    * [new TransactionSignature(arg)](#new_TransactionSignature_new)
    * _instance_
        * [.toObject](#TransactionSignature+toObject) ⇒ <code>Object</code>
    * _static_
        * [.fromObject(object)](#TransactionSignature.fromObject) ⇒ <code>[TransactionSignature](#TransactionSignature)</code>

<a name="new_TransactionSignature_new"></a>

### new TransactionSignature(arg)
Wrapper around Signature with fields related to signing a transaction specifically


| Param | Type |
| --- | --- |
| arg | <code>Object</code> &#124; <code>string</code> &#124; <code>[TransactionSignature](#TransactionSignature)</code> | 

<a name="TransactionSignature+toObject"></a>

### transactionSignature.toObject ⇒ <code>Object</code>
Serializes a transaction to a plain JS object

**Kind**: instance property of <code>[TransactionSignature](#TransactionSignature)</code>  
<a name="TransactionSignature.fromObject"></a>

### TransactionSignature.fromObject(object) ⇒ <code>[TransactionSignature](#TransactionSignature)</code>
Builds a TransactionSignature from an object

**Kind**: static method of <code>[TransactionSignature](#TransactionSignature)</code>  

| Param | Type |
| --- | --- |
| object | <code>Object</code> | 

