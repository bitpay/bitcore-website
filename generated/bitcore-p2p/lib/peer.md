<a name="Peer"></a>
## Peer
**Kind**: global class  

* [Peer](#Peer)
  * [new Peer(options)](#new_Peer_new)
  * [.setProxy(host, port)](#Peer+setProxy) ⇒ <code>[Peer](#Peer)</code>
  * [.connect()](#Peer+connect) ⇒ <code>[Peer](#Peer)</code>
  * [.disconnect()](#Peer+disconnect) ⇒ <code>[Peer](#Peer)</code>
  * [.sendMessage(message)](#Peer+sendMessage)
  * [._sendVersion()](#Peer+_sendVersion)
  * [._sendPong()](#Peer+_sendPong)
  * [._readMessage()](#Peer+_readMessage)
  * [._getSocket()](#Peer+_getSocket) ⇒ <code>Socket</code>

<a name="new_Peer_new"></a>
### new Peer(options)
The Peer constructor will create an instance of Peer to send and receive messages
using the standard Bitcoin protocol. A Peer instance represents one connection
on the Bitcoin network. To create a new peer connection provide the host and port
options and then invoke the connect method. Additionally, a newly connected socket
can be provided instead of host and port.

**Returns**: <code>[Peer](#Peer)</code> - A new instance of Peer.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.host | <code>String</code> | IP address of the remote host |
| options.port | <code>Number</code> | Port number of the remote host |
| options.network | <code>Network</code> | The network configuration |
| [options.relay] | <code>Boolean</code> | An option to disable automatic inventory relaying from the remote peer |
| [options.socket] | <code>Socket</code> | An existing connected socket |

**Example**  
```javascript

var peer = new Peer({host: '127.0.0.1'}).setProxy('127.0.0.1', 9050);
peer.on('tx', function(tx) {
 console.log('New transaction: ', tx.id);
});
peer.connect();
```
<a name="Peer+setProxy"></a>
### peer.setProxy(host, port) ⇒ <code>[Peer](#Peer)</code>
Set a socks5 proxy for the connection. Enables the use of the TOR network.

**Kind**: instance method of <code>[Peer](#Peer)</code>  
**Returns**: <code>[Peer](#Peer)</code> - The same Peer instance.  

| Param | Type | Description |
| --- | --- | --- |
| host | <code>String</code> | IP address of the proxy |
| port | <code>Number</code> | Port number of the proxy |

<a name="Peer+connect"></a>
### peer.connect() ⇒ <code>[Peer](#Peer)</code>
Init the connection with the remote peer.

**Kind**: instance method of <code>[Peer](#Peer)</code>  
**Returns**: <code>[Peer](#Peer)</code> - The same peer instance.  
<a name="Peer+disconnect"></a>
### peer.disconnect() ⇒ <code>[Peer](#Peer)</code>
Disconnects the remote connection.

**Kind**: instance method of <code>[Peer](#Peer)</code>  
**Returns**: <code>[Peer](#Peer)</code> - The same peer instance.  
<a name="Peer+sendMessage"></a>
### peer.sendMessage(message)
Send a Message to the remote peer.

**Kind**: instance method of <code>[Peer](#Peer)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Message</code> | A message instance |

<a name="Peer+_sendVersion"></a>
### peer._sendVersion()
Internal function that sends VERSION message to the remote peer.

**Kind**: instance method of <code>[Peer](#Peer)</code>  
<a name="Peer+_sendPong"></a>
### peer._sendPong()
Send a PONG message to the remote peer.

**Kind**: instance method of <code>[Peer](#Peer)</code>  
<a name="Peer+_readMessage"></a>
### peer._readMessage()
Internal function that tries to read a message from the data buffer

**Kind**: instance method of <code>[Peer](#Peer)</code>  
<a name="Peer+_getSocket"></a>
### peer._getSocket() ⇒ <code>Socket</code>
Internal function that creates a socket using a proxy if necessary.

**Kind**: instance method of <code>[Peer](#Peer)</code>  
**Returns**: <code>Socket</code> - A Socket instance not yet connected.  
