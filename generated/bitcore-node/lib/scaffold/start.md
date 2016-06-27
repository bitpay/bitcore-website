## Functions

<dl>
<dt><a href="#checkConfigVersion2">checkConfigVersion2()</a></dt>
<dd><p>Checks for configuration options from version 2. This includes an &quot;address&quot; and
&quot;db&quot; service, or having &quot;datadir&quot; at the root of the config.</p>
</dd>
<dt><a href="#start">start(options)</a></dt>
<dd><p>This function will instantiate and start a Node, requiring the necessary service
modules, and registering event handlers.</p>
</dd>
<dt><a href="#checkService">checkService(service)</a></dt>
<dd><p>Checks a service for the expected methods</p>
</dd>
<dt><a href="#loadModule">loadModule(req, service)</a></dt>
<dd><p>Will require a module from local services directory first
and then from available node_modules</p>
</dd>
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
<dt><a href="#cleanShutdown">cleanShutdown(_process, node)</a></dt>
<dd><p>Will shutdown a node and then the process</p>
</dd>
<dt><a href="#exitHandler">exitHandler(options, _process, node, error)</a></dt>
<dd><p>Will handle all the shutdown tasks that need to take place to ensure a safe exit</p>
</dd>
<dt><a href="#registerExitHandlers">registerExitHandlers(_process, node)</a></dt>
<dd><p>Will register event handlers to stop the node for <code>process</code> events
<code>uncaughtException</code> and <code>SIGINT</code>.</p>
</dd>
</dl>

<a name="checkConfigVersion2"></a>

## checkConfigVersion2()
Checks for configuration options from version 2. This includes an "address" and
"db" service, or having "datadir" at the root of the config.

**Kind**: global function  
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
| options.config.network | <code>String</code> | 'livenet', 'testnet' or 'regtest |
| options.config.port | <code>Number</code> | The port to use for the web service |

<a name="checkService"></a>

## checkService(service)
Checks a service for the expected methods

**Kind**: global function  

| Param | Type |
| --- | --- |
| service | <code>Object</code> | 

<a name="loadModule"></a>

## loadModule(req, service)
Will require a module from local services directory first
and then from available node_modules

**Kind**: global function  

| Param | Type |
| --- | --- |
| req | <code>function</code> | 
| service | <code>Object</code> | 

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

<a name="cleanShutdown"></a>

## cleanShutdown(_process, node)
Will shutdown a node and then the process

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| _process | <code>Object</code> | The Node.js process object |
| node | <code>Node</code> | The Bitcore Node instance |

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

<a name="registerExitHandlers"></a>

## registerExitHandlers(_process, node)
Will register event handlers to stop the node for `process` events
`uncaughtException` and `SIGINT`.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| _process | <code>Object</code> | The Node.js process |
| node | <code>Node</code> |  |

