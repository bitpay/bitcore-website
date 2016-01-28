## Functions
<dl>
<dt><a href="#createBitcoinDirectory">createBitcoinDirectory(dataDir, done)</a></dt>
<dd><p>Will create a directory and bitcoin.conf file for Bitcoin.</p>
</dd>
<dt><a href="#createConfigDirectory">createConfigDirectory(options, configDir, isGlobal, done)</a></dt>
<dd><p>Will create a base Bitcore Node configuration directory and files.</p>
</dd>
<dt><a href="#create">create(options, done)</a></dt>
<dd><p>Will setup a directory with a Bitcore Node directory, configuration file,
bitcoin configuration, and will install all necessary dependencies.</p>
</dd>
</dl>
<a name="createBitcoinDirectory"></a>
## createBitcoinDirectory(dataDir, done)
Will create a directory and bitcoin.conf file for Bitcoin.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dataDir | <code>String</code> | The absolute path |
| done | <code>function</code> | The callback function called when finished |

<a name="createConfigDirectory"></a>
## createConfigDirectory(options, configDir, isGlobal, done)
Will create a base Bitcore Node configuration directory and files.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.network | <code>String</code> | "testnet" or "livenet" |
| options.datadir | <code>String</code> | The bitcoin database directory |
| configDir | <code>String</code> | The absolute path |
| isGlobal | <code>Boolean</code> | If the configuration depends on globally installed node services. |
| done | <code>function</code> | The callback function called when finished |

<a name="create"></a>
## create(options, done)
Will setup a directory with a Bitcore Node directory, configuration file,
bitcoin configuration, and will install all necessary dependencies.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.cwd | <code>String</code> | The current working directory |
| options.dirname | <code>String</code> | The name of the bitcore node configuration directory |
| options.datadir | <code>String</code> | The path to the bitcoin datadir |
| done | <code>function</code> | A callback function called when finished |

