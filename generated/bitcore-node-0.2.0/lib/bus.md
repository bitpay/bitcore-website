<a name="Bus"></a>
## Bus(params)
The bus represents a connection to node, decoupled from the transport layer, that can
listen and subscribe to any events that are exposed by available services. Services
can expose events that can be subscribed to by implementing a `getPublishEvents` method.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> |  |
| params.node | <code>Node</code> | A reference to the node |


* [Bus(params)](#Bus)
  * [.subscribe(name)](#Bus+subscribe)
  * [.unsubscribe(name)](#Bus+unsubscribe)
  * [.close()](#Bus+close)

<a name="Bus+subscribe"></a>
### bus.subscribe(name)
This function will find the service that exposes the event by name and
call the associated subscribe method with the arguments excluding the
first argument of this function.

**Kind**: instance method of <code>[Bus](#Bus)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the event |

<a name="Bus+unsubscribe"></a>
### bus.unsubscribe(name)
The inverse of the subscribe method.

**Kind**: instance method of <code>[Bus](#Bus)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of the event |

<a name="Bus+close"></a>
### bus.close()
This function will unsubscribe all events.

**Kind**: instance method of <code>[Bus](#Bus)</code>  
