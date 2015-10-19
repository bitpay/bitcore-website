## Functions
<dl>
<dt><a href="#removeConfig">removeConfig(configFilePath, service, done)</a></dt>
<dd><p>Will remove a service from bitcore-node.json</p>
</dd>
<dt><a href="#uninstallService">uninstallService(configDir, service, done)</a></dt>
<dd><p>Will uninstall a Node.js service and remove from package.json.</p>
</dd>
<dt><a href="#removeService">removeService(configDir, service, done)</a></dt>
<dd><p>Will remove a Node.js service if it is installed.</p>
</dd>
<dt><a href="#remove">remove(done)</a></dt>
<dd><p>Will remove the Node.js service and from the bitcore-node configuration.</p>
</dd>
</dl>
<a name="removeConfig"></a>
## removeConfig(configFilePath, service, done)
Will remove a service from bitcore-node.json

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| configFilePath | <code>String</code> | The absolute path to the configuration file |
| service | <code>String</code> | The name of the module |
| done | <code>function</code> |  |

<a name="uninstallService"></a>
## uninstallService(configDir, service, done)
Will uninstall a Node.js service and remove from package.json.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| configDir | <code>String</code> | The absolute configuration directory path |
| service | <code>String</code> | The name of the service |
| done | <code>function</code> |  |

<a name="removeService"></a>
## removeService(configDir, service, done)
Will remove a Node.js service if it is installed.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| configDir | <code>String</code> | The absolute configuration directory path |
| service | <code>String</code> | The name of the service |
| done | <code>function</code> |  |

<a name="remove"></a>
## remove(done)
Will remove the Node.js service and from the bitcore-node configuration.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| options.cwd | <code>String</code> | The current working directory |
| options.dirname | <code>String</code> | The bitcore-node configuration directory |
| options.services | <code>Array</code> | An array of strings of service names |
| done | <code>function</code> | A callback function called when finished |

