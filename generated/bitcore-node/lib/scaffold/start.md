## Functions
<dl>
<dt><a href="#setupServices">setupServices(req, servicesPath, config)</a> ⇒ <code>Array</code></dt>
<dd><p>This function will loop over the configuration for services and require the
specified modules, and assemble an array in this format:
[
  {
    name: &#39;bitcoind&#39;,
    config: {},
    module: BitcoinService
  }
]</p>
</dd>
<dt><a href="#registerSyncHandlers">registerSyncHandlers(node)</a></dt>
<dd><p>Will register event handlers to log the current db sync status.</p>
</dd>
<dt><a href="#cleanShutdown">cleanShutdown(_process, node)</a></dt>
<dd><p>Will shutdown a node and then the process</p>
</dd>
<dt><a href="#registerExitHandlers">registerExitHandlers(_process, node)</a></dt>
<dd><p>Will register event handlers to stop the node for <code>process</code> events
<code>uncaughtException</code> and <code>SIGINT</code>.</p>
</dd>
<dt><a href="#exitHandler">exitHandler(options, _process, node, error)</a></dt>
<dd><p>Will handle all the shutdown tasks that need to take place to ensure a safe exit</p>
</dd>
<dt><a href="#start">start(options)</a></dt>
<dd><p>This function will instantiate and start a Node, requiring the necessary service
modules, and registering event handlers.</p>
</dd>
<dt><a href="#spawnChildProcess">spawnChildProcess(datadir, _process)</a></dt>
<dd><p>This function will fork the passed in process and exit the parent process
in order to daemonize the process. If there is already a daemon for this pid (process),
then the function just returns. Stdout and stderr both append to one file, &#39;bitcore-node.log&#39;
located in the datadir.</p>
</dd>
</dl>
<a name="setupServices"></a>
## setupServices(req, servicesPath, config) ⇒ <code>Array</code>
This function will loop over the configuration for services and require the
specified modules, and assemble an array in this format:
[
  {
    name: 'bitcoind',
    config: {},
    module: BitcoinService
  }
]

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>function</code> | The require function to use |
| servicesPath | <code>Array</code> | The local path (for requiring services) |
| config | <code>Object</code> |  |
| config.services | <code>Array</code> | An array of strings of service names. |

<a name="registerSyncHandlers"></a>
## registerSyncHandlers(node)
Will register event handlers to log the current db sync status.

**Kind**: global function  

| Param | Type |
| --- | --- |
| node | <code>Node</code> | 

<a name="cleanShutdown"></a>
## cleanShutdown(_process, node)
Will shutdown a node and then the process

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| _process | <code>Object</code> | The Node.js process object |
| node | <code>Node</code> | The Bitcore Node instance |

<a name="registerExitHandlers"></a>
## registerExitHandlers(_process, node)
Will register event handlers to stop the node for `process` events
`uncaughtException` and `SIGINT`.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| _process | <code>Object</code> | The Node.js process |
| node | <code>Node</code> |  |

<a name="exitHandler"></a>
## exitHandler(options, _process, node, error)
Will handle all the shutdown tasks that need to take place to ensure a safe exit

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.sigint | <code>String</code> | The signal given was a SIGINT |
| options.exit | <code>Array</code> | The signal given was an uncaughtException |
| _process | <code>Object</code> | The Node.js process |
| node | <code>Node</code> |  |
| error | <code>Error</code> |  |

<a name="start"></a>
## start(options)
This function will instantiate and start a Node, requiring the necessary service
modules, and registering event handlers.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.servicesPath | <code>Object</code> | The path to the location of service modules |
| options.path | <code>String</code> | The absolute path of the configuration file |
| options.config | <code>Object</code> | The parsed bitcore-node.json configuration file |
| options.config.services | <code>Array</code> | An array of services names. |
| options.config.servicesConfig | <code>Object</code> | Parameters to pass to each service |
| options.config.datadir | <code>String</code> | A relative (to options.path) or absolute path to the datadir |
| options.config.network | <code>String</code> | 'livenet', 'testnet' or 'regtest |
| options.config.port | <code>Number</code> | The port to use for the web service |

<a name="spawnChildProcess"></a>
## spawnChildProcess(datadir, _process)
This function will fork the passed in process and exit the parent process
in order to daemonize the process. If there is already a daemon for this pid (process),
then the function just returns. Stdout and stderr both append to one file, 'bitcore-node.log'
located in the datadir.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| datadir | <code>String</code> | The data directory where the bitcoin blockchain and config live. |
| _process | <code>Object</code> | The process that needs to fork a child and then, itself, exit. |

