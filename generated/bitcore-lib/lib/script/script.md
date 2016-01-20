<a name="Script"></a>
## Script
**Kind**: global class  

* [Script](#Script)
  * [new Script(from)](#new_Script_new)
  * _instance_
    * [.isPublicKeyHashOut()](#Script+isPublicKeyHashOut) ⇒ <code>boolean</code>
    * [.isPublicKeyHashIn()](#Script+isPublicKeyHashIn) ⇒ <code>boolean</code>
    * [.isPublicKeyOut()](#Script+isPublicKeyOut) ⇒ <code>boolean</code>
    * [.isPublicKeyIn()](#Script+isPublicKeyIn) ⇒ <code>boolean</code>
    * [.isScriptHashOut()](#Script+isScriptHashOut) ⇒ <code>boolean</code>
    * [.isScriptHashIn()](#Script+isScriptHashIn) ⇒ <code>boolean</code>
    * [.isMultisigOut()](#Script+isMultisigOut) ⇒ <code>boolean</code>
    * [.isMultisigIn()](#Script+isMultisigIn) ⇒ <code>boolean</code>
    * [.isDataOut()](#Script+isDataOut) ⇒ <code>boolean</code>
    * [.getData()](#Script+getData) ⇒ <code>Buffer</code>
    * [.isPushOnly()](#Script+isPushOnly) ⇒ <code>boolean</code>
    * [.classify()](#Script+classify) ⇒ <code>object</code>
    * [.isStandard()](#Script+isStandard) ⇒ <code>boolean</code>
    * [.prepend(obj)](#Script+prepend) ⇒ <code>[Script](#Script)</code>
    * [.equals()](#Script+equals)
    * [.add(obj)](#Script+add) ⇒ <code>[Script](#Script)</code>
    * [.toScriptHashOut()](#Script+toScriptHashOut) ⇒ <code>[Script](#Script)</code>
    * [.getAddressInfo()](#Script+getAddressInfo) ⇒ <code>Address</code> &#124; <code>boolean</code>
    * [.toAddress([network])](#Script+toAddress) ⇒ <code>Address</code> &#124; <code>boolean</code>
    * [.findAndDelete()](#Script+findAndDelete)
    * [.checkMinimalPush()](#Script+checkMinimalPush) ⇒ <code>boolean</code>
    * [._decodeOP_N(opcode)](#Script+_decodeOP_N) ⇒ <code>number</code>
    * [.getSignatureOperationsCount(use)](#Script+getSignatureOperationsCount) ⇒ <code>number</code>
  * _static_
    * [.buildMultisigOut(publicKeys, threshold, [opts])](#Script.buildMultisigOut) ⇒ <code>[Script](#Script)</code>
    * [.buildMultisigIn(pubkeys, threshold, signatures, [opts])](#Script.buildMultisigIn) ⇒ <code>[Script](#Script)</code>
    * [.buildP2SHMultisigIn(pubkeys, threshold, signatures, [opts])](#Script.buildP2SHMultisigIn) ⇒ <code>[Script](#Script)</code>
    * [.buildPublicKeyHashOut(to)](#Script.buildPublicKeyHashOut) ⇒ <code>[Script](#Script)</code>
    * [.buildPublicKeyOut()](#Script.buildPublicKeyOut) ⇒ <code>[Script](#Script)</code>
    * [.buildDataOut(data, encoding)](#Script.buildDataOut) ⇒ <code>[Script](#Script)</code>
    * [.buildScriptHashOut(script)](#Script.buildScriptHashOut) ⇒ <code>[Script](#Script)</code>
    * [.buildPublicKeyIn(signature, [sigtype])](#Script.buildPublicKeyIn)
    * [.buildPublicKeyHashIn(publicKey, signature, [sigtype])](#Script.buildPublicKeyHashIn)
    * [.empty()](#Script.empty) ⇒ <code>[Script](#Script)</code>
    * [.fromAddress()](#Script.fromAddress) ⇒ <code>[Script](#Script)</code>

<a name="new_Script_new"></a>
### new Script(from)
A bitcoin transaction script. Each transaction's inputs and outputs
has a script that is evaluated to validate it's spending.

See https://en.bitcoin.it/wiki/Script


| Param | Type | Description |
| --- | --- | --- |
| from | <code>Object</code> &#124; <code>string</code> &#124; <code>Buffer</code> | optional data to populate script |

<a name="Script+isPublicKeyHashOut"></a>
### script.isPublicKeyHashOut() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - if this is a pay to pubkey hash output script  
<a name="Script+isPublicKeyHashIn"></a>
### script.isPublicKeyHashIn() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - if this is a pay to public key hash input script  
<a name="Script+isPublicKeyOut"></a>
### script.isPublicKeyOut() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - if this is a public key output script  
<a name="Script+isPublicKeyIn"></a>
### script.isPublicKeyIn() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - if this is a pay to public key input script  
<a name="Script+isScriptHashOut"></a>
### script.isScriptHashOut() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - if this is a p2sh output script  
<a name="Script+isScriptHashIn"></a>
### script.isScriptHashIn() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - if this is a p2sh input script
Note that these are frequently indistinguishable from pubkeyhashin  
<a name="Script+isMultisigOut"></a>
### script.isMultisigOut() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - if this is a mutlsig output script  
<a name="Script+isMultisigIn"></a>
### script.isMultisigIn() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - if this is a multisig input script  
<a name="Script+isDataOut"></a>
### script.isDataOut() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - true if this is a valid standard OP_RETURN output  
<a name="Script+getData"></a>
### script.getData() ⇒ <code>Buffer</code>
Retrieve the associated data for this script.
In the case of a pay to public key hash or P2SH, return the hash.
In the case of a standard OP_RETURN, return the data

**Kind**: instance method of <code>[Script](#Script)</code>  
<a name="Script+isPushOnly"></a>
### script.isPushOnly() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - if the script is only composed of data pushing
opcodes or small int opcodes (OP_0, OP_1, ..., OP_16)  
<a name="Script+classify"></a>
### script.classify() ⇒ <code>object</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>object</code> - The Script type if it is a known form,
or Script.UNKNOWN if it isn't  
<a name="Script+isStandard"></a>
### script.isStandard() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - if script is one of the known types  
<a name="Script+prepend"></a>
### script.prepend(obj) ⇒ <code>[Script](#Script)</code>
Adds a script element at the start of the script.

**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>[Script](#Script)</code> - this script instance  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | a string, number, Opcode, Buffer, or object to add |

<a name="Script+equals"></a>
### script.equals()
Compares a script with another script

**Kind**: instance method of <code>[Script](#Script)</code>  
<a name="Script+add"></a>
### script.add(obj) ⇒ <code>[Script](#Script)</code>
Adds a script element to the end of the script.

**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>[Script](#Script)</code> - this script instance  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>\*</code> | a string, number, Opcode, Buffer, or object to add |

<a name="Script+toScriptHashOut"></a>
### script.toScriptHashOut() ⇒ <code>[Script](#Script)</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>[Script](#Script)</code> - a new pay to script hash script that pays to this script  
<a name="Script+getAddressInfo"></a>
### script.getAddressInfo() ⇒ <code>Address</code> &#124; <code>boolean</code>
Will return the associated address information object

**Kind**: instance method of <code>[Script](#Script)</code>  
<a name="Script+toAddress"></a>
### script.toAddress([network]) ⇒ <code>Address</code> &#124; <code>boolean</code>
**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>Address</code> &#124; <code>boolean</code> - the associated address for this script if possible, or false  

| Param | Type |
| --- | --- |
| [network] | <code>Network</code> | 

<a name="Script+findAndDelete"></a>
### script.findAndDelete()
Analogous to bitcoind's FindAndDelete. Find and delete equivalent chunks,
typically used with push data chunks.  Note that this will find and delete
not just the same data, but the same data with the same push data op as
produced by default. i.e., if a pushdata in a tx does not use the minimal
pushdata op, then when you try to remove the data it is pushing, it will not
be removed, because they do not use the same pushdata op.

**Kind**: instance method of <code>[Script](#Script)</code>  
<a name="Script+checkMinimalPush"></a>
### script.checkMinimalPush() ⇒ <code>boolean</code>
Comes from bitcoind's script interpreter CheckMinimalPush function

**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>boolean</code> - if the chunk {i} is the smallest way to push that particular data.  
<a name="Script+_decodeOP_N"></a>
### script._decodeOP_N(opcode) ⇒ <code>number</code>
Comes from bitcoind's script DecodeOP_N function

**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>number</code> - numeric value in range of 0 to 16  

| Param | Type |
| --- | --- |
| opcode | <code>number</code> | 

<a name="Script+getSignatureOperationsCount"></a>
### script.getSignatureOperationsCount(use) ⇒ <code>number</code>
Comes from bitcoind's script GetSigOpCount(boolean) function

**Kind**: instance method of <code>[Script](#Script)</code>  
**Returns**: <code>number</code> - number of signature operations required by this script  

| Param | Type | Description |
| --- | --- | --- |
| use | <code>boolean</code> | current (true) or pre-version-0.6 (false) logic |

<a name="Script.buildMultisigOut"></a>
### Script.buildMultisigOut(publicKeys, threshold, [opts]) ⇒ <code>[Script](#Script)</code>
**Kind**: static method of <code>[Script](#Script)</code>  
**Returns**: <code>[Script](#Script)</code> - a new Multisig output script for given public keys,
requiring m of those public keys to spend  

| Param | Type | Description |
| --- | --- | --- |
| publicKeys | <code>Array.&lt;PublicKey&gt;</code> | list of all public keys controlling the output |
| threshold | <code>number</code> | amount of required signatures to spend the output |
| [opts] | <code>Object</code> | Several options:        - noSorting: defaults to false, if true, don't sort the given                      public keys before creating the script |

<a name="Script.buildMultisigIn"></a>
### Script.buildMultisigIn(pubkeys, threshold, signatures, [opts]) ⇒ <code>[Script](#Script)</code>
A new Multisig input script for the given public keys, requiring m of those public keys to spend

**Kind**: static method of <code>[Script](#Script)</code>  

| Param | Type | Description |
| --- | --- | --- |
| pubkeys | <code>Array.&lt;PublicKey&gt;</code> | list of all public keys controlling the output |
| threshold | <code>number</code> | amount of required signatures to spend the output |
| signatures | <code>Array</code> | and array of signature buffers to append to the script |
| [opts] | <code>Object</code> |  |
| [opts.noSorting] | <code>boolean</code> | don't sort the given public keys before creating the script (false by default) |
| [opts.cachedMultisig] | <code>[Script](#Script)</code> | don't recalculate the redeemScript |

<a name="Script.buildP2SHMultisigIn"></a>
### Script.buildP2SHMultisigIn(pubkeys, threshold, signatures, [opts]) ⇒ <code>[Script](#Script)</code>
A new P2SH Multisig input script for the given public keys, requiring m of those public keys to spend

**Kind**: static method of <code>[Script](#Script)</code>  

| Param | Type | Description |
| --- | --- | --- |
| pubkeys | <code>Array.&lt;PublicKey&gt;</code> | list of all public keys controlling the output |
| threshold | <code>number</code> | amount of required signatures to spend the output |
| signatures | <code>Array</code> | and array of signature buffers to append to the script |
| [opts] | <code>Object</code> |  |
| [opts.noSorting] | <code>boolean</code> | don't sort the given public keys before creating the script (false by default) |
| [opts.cachedMultisig] | <code>[Script](#Script)</code> | don't recalculate the redeemScript |

<a name="Script.buildPublicKeyHashOut"></a>
### Script.buildPublicKeyHashOut(to) ⇒ <code>[Script](#Script)</code>
**Kind**: static method of <code>[Script](#Script)</code>  
**Returns**: <code>[Script](#Script)</code> - a new pay to public key hash output for the given
address or public key  

| Param | Type | Description |
| --- | --- | --- |
| to | <code>Address</code> &#124; <code>PublicKey</code> | destination address or public key |

<a name="Script.buildPublicKeyOut"></a>
### Script.buildPublicKeyOut() ⇒ <code>[Script](#Script)</code>
**Kind**: static method of <code>[Script](#Script)</code>  
**Returns**: <code>[Script](#Script)</code> - a new pay to public key output for the given
 public key  
<a name="Script.buildDataOut"></a>
### Script.buildDataOut(data, encoding) ⇒ <code>[Script](#Script)</code>
**Kind**: static method of <code>[Script](#Script)</code>  
**Returns**: <code>[Script](#Script)</code> - a new OP_RETURN script with data  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> &#124; <code>Buffer</code> | the data to embed in the output |
| encoding | <code>string</code> | the type of encoding of the string |

<a name="Script.buildScriptHashOut"></a>
### Script.buildScriptHashOut(script) ⇒ <code>[Script](#Script)</code>
**Kind**: static method of <code>[Script](#Script)</code>  
**Returns**: <code>[Script](#Script)</code> - new pay to script hash script for given script  

| Param | Type | Description |
| --- | --- | --- |
| script | <code>[Script](#Script)</code> &#124; <code>Address</code> | the redeemScript for the new p2sh output.    It can also be a p2sh address |

<a name="Script.buildPublicKeyIn"></a>
### Script.buildPublicKeyIn(signature, [sigtype])
Builds a scriptSig (a script for an input) that signs a public key output script.

**Kind**: static method of <code>[Script](#Script)</code>  

| Param | Type | Description |
| --- | --- | --- |
| signature | <code>Signature</code> &#124; <code>Buffer</code> | a Signature object, or the signature in DER canonical encoding |
| [sigtype] | <code>number</code> | the type of the signature (defaults to SIGHASH_ALL) |

<a name="Script.buildPublicKeyHashIn"></a>
### Script.buildPublicKeyHashIn(publicKey, signature, [sigtype])
Builds a scriptSig (a script for an input) that signs a public key hash
output script.

**Kind**: static method of <code>[Script](#Script)</code>  

| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>Buffer</code> &#124; <code>string</code> &#124; <code>PublicKey</code> |  |
| signature | <code>Signature</code> &#124; <code>Buffer</code> | a Signature object, or the signature in DER canonical encoding |
| [sigtype] | <code>number</code> | the type of the signature (defaults to SIGHASH_ALL) |

<a name="Script.empty"></a>
### Script.empty() ⇒ <code>[Script](#Script)</code>
**Kind**: static method of <code>[Script](#Script)</code>  
**Returns**: <code>[Script](#Script)</code> - an empty script  
<a name="Script.fromAddress"></a>
### Script.fromAddress() ⇒ <code>[Script](#Script)</code>
**Kind**: static method of <code>[Script](#Script)</code>  
**Returns**: <code>[Script](#Script)</code> - an output script built from the address  
