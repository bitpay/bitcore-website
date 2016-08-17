<a name="Interpreter"></a>

## Interpreter()
Bitcoin transactions contain scripts. Each input has a script called the
scriptSig, and each output has a script called the scriptPubkey. To validate
an input, the input's script is concatenated with the referenced output script,
and the result is executed. If at the end of execution the stack contains a
"true" value, then the transaction is valid.

The primary way to use this class is via the verify function.
e.g., Interpreter().verify( ... );

**Kind**: global function  

* [Interpreter()](#Interpreter)
    * [.verify(scriptSig, scriptPubkey, [tx], nin, flags)](#Interpreter+verify)
    * [.checkSignatureEncoding()](#Interpreter+checkSignatureEncoding)
    * [.checkPubkeyEncoding()](#Interpreter+checkPubkeyEncoding)
    * [.evaluate()](#Interpreter+evaluate)
    * [.checkLockTime(nLockTime)](#Interpreter+checkLockTime) ⇒ <code>boolean</code>
    * [.step()](#Interpreter+step)

<a name="Interpreter+verify"></a>

### interpreter.verify(scriptSig, scriptPubkey, [tx], nin, flags)
Verifies a Script by executing it and returns true if it is valid.
This function needs to be provided with the scriptSig and the scriptPubkey
separately.

**Kind**: instance method of <code>[Interpreter](#Interpreter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| scriptSig | <code>Script</code> | the script's first part (corresponding to the tx input) |
| scriptPubkey | <code>Script</code> | the script's last part (corresponding to the tx output) |
| [tx] | <code>Transaction</code> | the Transaction containing the scriptSig in one input (used    to check signature validity for some opcodes like OP_CHECKSIG) |
| nin | <code>number</code> | index of the transaction input containing the scriptSig verified. |
| flags | <code>number</code> | evaluation flags. See Interpreter.SCRIPT_* constants Translated from bitcoind's VerifyScript |

<a name="Interpreter+checkSignatureEncoding"></a>

### interpreter.checkSignatureEncoding()
Translated from bitcoind's CheckSignatureEncoding

**Kind**: instance method of <code>[Interpreter](#Interpreter)</code>  
<a name="Interpreter+checkPubkeyEncoding"></a>

### interpreter.checkPubkeyEncoding()
Translated from bitcoind's CheckPubKeyEncoding

**Kind**: instance method of <code>[Interpreter](#Interpreter)</code>  
<a name="Interpreter+evaluate"></a>

### interpreter.evaluate()
Based on bitcoind's EvalScript function, with the inner loop moved to
Interpreter.prototype.step()
bitcoind commit: b5d1b1092998bc95313856d535c632ea5a8f9104

**Kind**: instance method of <code>[Interpreter](#Interpreter)</code>  
<a name="Interpreter+checkLockTime"></a>

### interpreter.checkLockTime(nLockTime) ⇒ <code>boolean</code>
Checks a locktime parameter with the transaction's locktime.
There are two times of nLockTime: lock-by-blockheight and lock-by-blocktime,
distinguished by whether nLockTime < LOCKTIME_THRESHOLD = 500000000

See the corresponding code on bitcoin core:
https://github.com/bitcoin/bitcoin/blob/ffd75adce01a78b3461b3ff05bcc2b530a9ce994/src/script/interpreter.cpp#L1129

**Kind**: instance method of <code>[Interpreter](#Interpreter)</code>  
**Returns**: <code>boolean</code> - true if the transaction's locktime is less than or equal to
                  the transaction's locktime  

| Param | Type | Description |
| --- | --- | --- |
| nLockTime | <code>BN</code> | the locktime read from the script |

<a name="Interpreter+step"></a>

### interpreter.step()
Based on the inner loop of bitcoind's EvalScript function
bitcoind commit: b5d1b1092998bc95313856d535c632ea5a8f9104

**Kind**: instance method of <code>[Interpreter](#Interpreter)</code>  
