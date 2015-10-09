<a name="Mnemonic"></a>
## Mnemonic
**Kind**: global class  

* [Mnemonic](#Mnemonic)
  * [new Mnemonic([data], [wordlist])](#new_Mnemonic_new)
  * _instance_
    * [.toSeed([passphrase])](#Mnemonic+toSeed) ⇒ <code>Buffer</code>
    * [.toHDPrivateKey([passphrase], [network])](#Mnemonic+toHDPrivateKey) ⇒ <code>HDPrivateKey</code>
    * [.toString()](#Mnemonic+toString) ⇒ <code>String</code>
    * [.inspect()](#Mnemonic+inspect) ⇒ <code>String</code>
  * _static_
    * [.isValid(mnemonic, [wordlist])](#Mnemonic.isValid) ⇒ <code>boolean</code>
    * [._belongsToWordlist(mnemonic, wordlist)](#Mnemonic._belongsToWordlist) ⇒ <code>boolean</code>
    * [._getDictionary(mnemonic)](#Mnemonic._getDictionary) ⇒ <code>Array</code>
    * [.fromSeed([seed], [wordlist])](#Mnemonic.fromSeed) ⇒ <code>[Mnemonic](#Mnemonic)</code>
    * [._mnemonic(ENT, wordlist)](#Mnemonic._mnemonic) ⇒ <code>String</code>
    * [._entropy2mnemonic(entropy, wordlist)](#Mnemonic._entropy2mnemonic) ⇒ <code>String</code>

<a name="new_Mnemonic_new"></a>
### new Mnemonic([data], [wordlist])
This is an immutable class that represents a BIP39 Mnemonic code.
See BIP39 specification for more info: https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki
A Mnemonic code is a a group of easy to remember words used for the generation
of deterministic wallets. A Mnemonic can be used to generate a seed using
an optional passphrase, for later generate a HDPrivateKey.

**Returns**: <code>[Mnemonic](#Mnemonic)</code> - A new instance of Mnemonic  

| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>\*</code> | a seed, phrase, or entropy to initialize (can be skipped) |
| [wordlist] | <code>Array</code> | the wordlist to generate mnemonics from |

**Example**  
```js
// generate a random mnemonic
var mnemonic = new Mnemonic();
var phrase = mnemonic.phrase;

// use a different language
var mnemonic = new Mnemonic(Mnemonic.Words.SPANISH);
var xprivkey = mnemonic.toHDPrivateKey();
```
<a name="Mnemonic+toSeed"></a>
### mnemonic.toSeed([passphrase]) ⇒ <code>Buffer</code>
Will generate a seed based on the mnemonic and optional passphrase.

**Kind**: instance method of <code>[Mnemonic](#Mnemonic)</code>  

| Param | Type |
| --- | --- |
| [passphrase] | <code>String</code> | 

<a name="Mnemonic+toHDPrivateKey"></a>
### mnemonic.toHDPrivateKey([passphrase], [network]) ⇒ <code>HDPrivateKey</code>
Generates a HD Private Key from a Mnemonic.
Optionally receive a passphrase and bitcoin network.

**Kind**: instance method of <code>[Mnemonic](#Mnemonic)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [passphrase] | <code>String</code> |  |
| [network] | <code>Network</code> &#124; <code>String</code> &#124; <code>number</code> | The network: 'livenet' or 'testnet' |

<a name="Mnemonic+toString"></a>
### mnemonic.toString() ⇒ <code>String</code>
Will return a the string representation of the mnemonic

**Kind**: instance method of <code>[Mnemonic](#Mnemonic)</code>  
**Returns**: <code>String</code> - Mnemonic  
<a name="Mnemonic+inspect"></a>
### mnemonic.inspect() ⇒ <code>String</code>
Will return a string formatted for the console

**Kind**: instance method of <code>[Mnemonic](#Mnemonic)</code>  
**Returns**: <code>String</code> - Mnemonic  
<a name="Mnemonic.isValid"></a>
### Mnemonic.isValid(mnemonic, [wordlist]) ⇒ <code>boolean</code>
Will return a boolean if the mnemonic is valid

**Kind**: static method of <code>[Mnemonic](#Mnemonic)</code>  

| Param | Type | Description |
| --- | --- | --- |
| mnemonic | <code>String</code> | The mnemonic string |
| [wordlist] | <code>String</code> | The wordlist used |

**Example**  
```js
var valid = Mnemonic.isValid('lab rescue lunch elbow recall phrase perfect donkey biology guess moment husband');
// true
```
<a name="Mnemonic._belongsToWordlist"></a>
### Mnemonic._belongsToWordlist(mnemonic, wordlist) ⇒ <code>boolean</code>
Internal function to check if a mnemonic belongs to a wordlist.

**Kind**: static method of <code>[Mnemonic](#Mnemonic)</code>  

| Param | Type | Description |
| --- | --- | --- |
| mnemonic | <code>String</code> | The mnemonic string |
| wordlist | <code>String</code> | The wordlist |

<a name="Mnemonic._getDictionary"></a>
### Mnemonic._getDictionary(mnemonic) ⇒ <code>Array</code>
Internal function to detect the wordlist used to generate the mnemonic.

**Kind**: static method of <code>[Mnemonic](#Mnemonic)</code>  
**Returns**: <code>Array</code> - the wordlist or null  

| Param | Type | Description |
| --- | --- | --- |
| mnemonic | <code>String</code> | The mnemonic string |

<a name="Mnemonic.fromSeed"></a>
### Mnemonic.fromSeed([seed], [wordlist]) ⇒ <code>[Mnemonic](#Mnemonic)</code>
Will generate a Mnemonic object based on a seed.

**Kind**: static method of <code>[Mnemonic](#Mnemonic)</code>  

| Param | Type |
| --- | --- |
| [seed] | <code>Buffer</code> | 
| [wordlist] | <code>string</code> | 

<a name="Mnemonic._mnemonic"></a>
### Mnemonic._mnemonic(ENT, wordlist) ⇒ <code>String</code>
Internal function to generate a random mnemonic

**Kind**: static method of <code>[Mnemonic](#Mnemonic)</code>  
**Returns**: <code>String</code> - Mnemonic string  

| Param | Type | Description |
| --- | --- | --- |
| ENT | <code>Number</code> | Entropy size, defaults to 128 |
| wordlist | <code>Array</code> | Array of words to generate the mnemonic |

<a name="Mnemonic._entropy2mnemonic"></a>
### Mnemonic._entropy2mnemonic(entropy, wordlist) ⇒ <code>String</code>
Internal function to generate mnemonic based on entropy

**Kind**: static method of <code>[Mnemonic](#Mnemonic)</code>  
**Returns**: <code>String</code> - Mnemonic string  

| Param | Type | Description |
| --- | --- | --- |
| entropy | <code>Number</code> | Entropy buffer |
| wordlist | <code>Array</code> | Array of words to generate the mnemonic |

