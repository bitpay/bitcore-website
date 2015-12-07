<a name="Pool"></a>
## Pool
**Kind**: global class  

* [Pool](#Pool)
  * [new Pool([options])](#new_Pool_new)
  * [.connect()](#Pool+connect)
  * [.disconnect()](#Pool+disconnect)
  * [.numberConnected()](#Pool+numberConnected) ⇒ <code>Number</code>
  * [._fillConnections()](#Pool+_fillConnections)
  * [._removeConnectedPeer(addr)](#Pool+_removeConnectedPeer)
  * [._connectPeer(addr)](#Pool+_connectPeer)
  * [._addConnectedPeer(socket, addr)](#Pool+_addConnectedPeer)
  * [._addPeerEventHandlers()](#Pool+_addPeerEventHandlers)
  * [._deprioritizeAddr(addr)](#Pool+_deprioritizeAddr)
  * [._addAddr(addr)](#Pool+_addAddr)
  * [._addAddrsFromSeed(seed, done)](#Pool+_addAddrsFromSeed)
  * [._addAddrsFromSeeds(done)](#Pool+_addAddrsFromSeeds)
  * [.inspect()](#Pool+inspect) ⇒ <code>String</code>
  * [.sendMessage(message)](#Pool+sendMessage)
  * [.listen()](#Pool+listen)

<a name="new_Pool_new"></a>
### new Pool([options])
A pool is a collection of Peers. A pool will discover peers from DNS seeds, and
collect information about new peers in the network. When a peer disconnects the pool
will connect to others that are available to maintain a max number of
ongoing peer connections. Peer events are relayed to the pool.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.network] | <code>Network</code> | The network configuration |
| [options.listenAddr] | <code>Boolean</code> | Prevent new peers being added from addr messages |
| [options.dnsSeed] | <code>Boolean</code> | Prevent seeding with DNS discovered known peers |
| [options.relay] | <code>Boolean</code> | Prevent inventory announcements until a filter is loaded |
| [options.maxSize] | <code>Number</code> | The max number of peers |

**Example**  
```javascript

var pool = new Pool({network: Networks.livenet});
pool.on('peerinv', function(peer, message) {
  // do something with the inventory announcement
});
pool.connect();
```
<a name="Pool+connect"></a>
### pool.connect()
Will initiate connection to peers, if available peers have been added to
the pool, it will connect to those, otherwise will use DNS seeds to find
peers to connect. When a peer disconnects it will add another.

**Kind**: instance method of <code>[Pool](#Pool)</code>  
<a name="Pool+disconnect"></a>
### pool.disconnect()
Will disconnect all peers that are connected.

**Kind**: instance method of <code>[Pool](#Pool)</code>  
<a name="Pool+numberConnected"></a>
### pool.numberConnected() ⇒ <code>Number</code>
**Kind**: instance method of <code>[Pool](#Pool)</code>  
**Returns**: <code>Number</code> - The number of peers currently connected.  
<a name="Pool+_fillConnections"></a>
### pool._fillConnections()
Will fill the connected peers to the maximum amount.

**Kind**: instance method of <code>[Pool](#Pool)</code>  
<a name="Pool+_removeConnectedPeer"></a>
### pool._removeConnectedPeer(addr)
Will remove a peer from the list of connected peers.

**Kind**: instance method of <code>[Pool](#Pool)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addr | <code>Object</code> | An addr from the list of addrs |

<a name="Pool+_connectPeer"></a>
### pool._connectPeer(addr)
Will connect a peer and add to the list of connected peers.

**Kind**: instance method of <code>[Pool](#Pool)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addr | <code>Object</code> | An addr from the list of addrs |

<a name="Pool+_addConnectedPeer"></a>
### pool._addConnectedPeer(socket, addr)
Adds a peer with a connected socket to the _connectedPeers object, and
initializes the associated event handlers.

**Kind**: instance method of <code>[Pool](#Pool)</code>  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>Socket</code> | socket - A new connected socket |
| addr | <code>Object</code> | addr - The associated addr object for the peer |

<a name="Pool+_addPeerEventHandlers"></a>
### pool._addPeerEventHandlers()
Will add disconnect and ready events for a peer and intialize
handlers for relay peer message events.

**Kind**: instance method of <code>[Pool](#Pool)</code>  
<a name="Pool+_deprioritizeAddr"></a>
### pool._deprioritizeAddr(addr)
Will deprioritize an addr in the list of addrs by moving it to the end
of the array, and setting a retryTime

**Kind**: instance method of <code>[Pool](#Pool)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addr | <code>Object</code> | An addr from the list of addrs |

<a name="Pool+_addAddr"></a>
### pool._addAddr(addr)
Will add an addr to the beginning of the addrs array

**Kind**: instance method of <code>[Pool](#Pool)</code>  

| Param | Type |
| --- | --- |
| addr | <code>Object</code> | 

<a name="Pool+_addAddrsFromSeed"></a>
### pool._addAddrsFromSeed(seed, done)
Will add addrs to the list of addrs from a DNS seed

**Kind**: instance method of <code>[Pool](#Pool)</code>  

| Param | Type | Description |
| --- | --- | --- |
| seed | <code>String</code> | A domain name to resolve known peers |
| done | <code>function</code> |  |

<a name="Pool+_addAddrsFromSeeds"></a>
### pool._addAddrsFromSeeds(done)
Will add addrs to the list of addrs from network DNS seeds

**Kind**: instance method of <code>[Pool](#Pool)</code>  

| Param | Type |
| --- | --- |
| done | <code>function</code> | 

<a name="Pool+inspect"></a>
### pool.inspect() ⇒ <code>String</code>
**Kind**: instance method of <code>[Pool](#Pool)</code>  
**Returns**: <code>String</code> - A string formatted for the console  
<a name="Pool+sendMessage"></a>
### pool.sendMessage(message)
Will send a message to all of the peers in the pool.

**Kind**: instance method of <code>[Pool](#Pool)</code>  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Message</code> | An instance of the message to send |

<a name="Pool+listen"></a>
### pool.listen()
Will enable a listener for peer connections, when a peer connects
it will be added to the pool.

**Kind**: instance method of <code>[Pool](#Pool)</code>  
