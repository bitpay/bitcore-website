<a name="WebService"></a>
## WebService(options)
This service represents a hub for combining several services over a single HTTP port. Services
can extend routes by implementing the methods `getRoutePrefix` and `setupRoutes`. Additionally
events that are exposed via the `getPublishEvents` and API methods exposed via `getAPIMethods`
will be available over a socket.io connection.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.node | <code>Node</code> | A reference to the node |
| options.https | <code>Boolean</code> | Enable https, will default to node.https settings. |
| options.httpsOptions | <code>Object</code> | Options passed into https.createServer, defaults to node settings. |
| options.httpsOptions.key | <code>String</code> | Path to key file |
| options.httpsOptions.cert | <code>String</code> | Path to cert file |
| options.port | <code>Number</code> | The port for the service, defaults to node settings. |


* [WebService(options)](#WebService)
  * [.start(callback)](#WebService+start)
  * [.stop(callback)](#WebService+stop)
  * [.setupAllRoutes()](#WebService+setupAllRoutes)
  * [.createMethodsMap()](#WebService+createMethodsMap)
  * [.getEventNames()](#WebService+getEventNames)
  * [.socketHandler(socket)](#WebService+socketHandler)
  * [.socketMessageHandler(message, socketCallback)](#WebService+socketMessageHandler)
  * [.transformHttpsOptions()](#WebService+transformHttpsOptions)

<a name="WebService+start"></a>
### webService.start(callback)
Called by Node to start the service

**Kind**: instance method of <code>[WebService](#WebService)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="WebService+stop"></a>
### webService.stop(callback)
Called by Node. stop the service

**Kind**: instance method of <code>[WebService](#WebService)</code>  

| Param | Type |
| --- | --- |
| callback | <code>function</code> | 

<a name="WebService+setupAllRoutes"></a>
### webService.setupAllRoutes()
This function will iterate over all of the available services gathering
all of the exposed HTTP routes.

**Kind**: instance method of <code>[WebService](#WebService)</code>  
<a name="WebService+createMethodsMap"></a>
### webService.createMethodsMap()
This function will construct an API methods map of all of the
available methods that can be called from enable services.

**Kind**: instance method of <code>[WebService](#WebService)</code>  
<a name="WebService+getEventNames"></a>
### webService.getEventNames()
This function will gather all of the available events exposed from
the enabled services.

**Kind**: instance method of <code>[WebService](#WebService)</code>  
<a name="WebService+socketHandler"></a>
### webService.socketHandler(socket)
This function is responsible for managing a socket.io connection, including
instantiating a new Bus, subscribing/unsubscribing and handling RPC commands.

**Kind**: instance method of <code>[WebService](#WebService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Socket</code> | A socket.io socket instance |

<a name="WebService+socketMessageHandler"></a>
### webService.socketMessageHandler(message, socketCallback)
This method will handle incoming RPC messages to a socket.io connection,
call the appropriate method, and respond with the result.

**Kind**: instance method of <code>[WebService](#WebService)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Object</code> | The socket.io "message" object |
| socketCallback | <code>function</code> |  |

<a name="WebService+transformHttpsOptions"></a>
### webService.transformHttpsOptions()
This method will read `key` and `cert` from disk based on `httpsOptions` and
replace the options with the files.

**Kind**: instance method of <code>[WebService](#WebService)</code>  
