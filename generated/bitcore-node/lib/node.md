<a name="Node"></a>

## Node(config)
A node is a hub of services, and will manage starting and stopping the services in
the correct order based the the dependency chain. The node also holds common configuration
properties that can be shared across services, such as network settings.

The array of services should have the format:
```js
{
  name: 'bitcoind',
  config: {}, // options to pass into constructor
  module: ServiceConstructor
}
```

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | The configuration of the node |
| config.formatLogs | <code>Array</code> | Option to disable formatting of logs |
| config.services | <code>Array</code> | The array of services |
| config.port | <code>Number</code> | The HTTP port for services |
| config.https | <code>Boolean</code> | Enable https |
| config.httpsOptions | <code>Object</code> | Options for https |
| config.httpsOptions.key | <code>String</code> | Path to key file |
| config.httpsOptions.cert | <code>String</code> | Path to cert file |
|  |  |  |


* [Node(config)](#Node)
    * [._setNetwork(config)](#Node+_setNetwork)
    * [.openBus()](#Node+openBus) ⇒ <code>Bus</code>
    * [.getAllAPIMethods()](#Node+getAllAPIMethods) ⇒ <code>Array</code>
    * [.getAllPublishEvents()](#Node+getAllPublishEvents) ⇒ <code>Array</code>
    * [.getServiceOrder()](#Node+getServiceOrder) ⇒ <code>Array</code>
    * [.start(callback)](#Node+start)
    * [.stop(callback)](#Node+stop)

<a name="Node+_setNetwork"></a>

### node._setNetwork(config)
Will set the this.network based on a network string.

**Kind**: instance method of <code>[Node](#Node)</code>  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> |  |
| config.network | <code>String</code> | Possible options "testnet", "regtest" or "livenet" |

<a name="Node+openBus"></a>

### node.openBus() ⇒ <code>Bus</code>
Will instantiate a new Bus for this node.

**Kind**: instance method of <code>[Node](#Node)</code>  
<a name="Node+getAllAPIMethods"></a>

### node.getAllAPIMethods() ⇒ <code>Array</code>
Will get an array of API method descriptions from all of the available services.

**Kind**: instance method of <code>[Node](#Node)</code>  
<a name="Node+getAllPublishEvents"></a>

### node.getAllPublishEvents() ⇒ <code>Array</code>
Will get an array of events from all of the available services.

**Kind**: instance method of <code>[Node](#Node)</code>  
<a name="Node+getServiceOrder"></a>

### node.getServiceOrder() ⇒ <code>Array</code>
Will organize services into the order that they should be started
based on the service's dependencies.

**Kind**: instance method of <code>[Node](#Node)</code>  
<a name="Node+start"></a>

### node.start(callback)
Will start all running services in the order based on the dependency chain.

**Kind**: instance method of <code>[Node](#Node)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Called when all services are started |

<a name="Node+stop"></a>

### node.stop(callback)
Will stop all running services in the reverse order that they
were initially started.

**Kind**: instance method of <code>[Node](#Node)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Called when all services are stopped |

