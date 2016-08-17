## Classes

<dl>
<dt><a href="#Network">Network</a></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#Networks">Networks</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="Network"></a>

## Network
**Kind**: global class  
<a name="new_Network_new"></a>

### new Network()
A network is merely a map containing values that correspond to version
numbers for each bitcoin network. Currently only supporting "livenet"
(a.k.a. "mainnet") and "testnet".

<a name="Networks"></a>

## Networks : <code>object</code>
**Kind**: global namespace  

* [Networks](#Networks) : <code>object</code>
    * [.get](#Networks+get) ⇒
    * [.add](#Networks+add) ⇒
    * [.remove](#Networks+remove)
    * [.livenet](#Networks+livenet)
    * [.testnet](#Networks+testnet)
    * [.enableRegtest](#Networks+enableRegtest)
    * [.disableRegtest](#Networks+disableRegtest)

<a name="Networks+get"></a>

### networks.get ⇒
**Kind**: instance property of <code>[Networks](#Networks)</code>  
**Returns**: Network  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>string</code> &#124; <code>number</code> &#124; <code>[Network](#Network)</code> |  |
| keys | <code>string</code> &#124; <code>Array</code> | if set, only check if the magic number associated with this name matches |

<a name="Networks+add"></a>

### networks.add ⇒
**Kind**: instance property of <code>[Networks](#Networks)</code>  
**Returns**: Network  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> |  |
| data.name | <code>string</code> | The name of the network |
| data.alias | <code>string</code> | The aliased name of the network |
| data.pubkeyhash | <code>Number</code> | The publickey hash prefix |
| data.privatekey | <code>Number</code> | The privatekey prefix |
| data.scripthash | <code>Number</code> | The scripthash prefix |
| data.xpubkey | <code>Number</code> | The extended public key magic |
| data.xprivkey | <code>Number</code> | The extended private key magic |
| data.networkMagic | <code>Number</code> | The network magic number |
| data.port | <code>Number</code> | The network port |
| data.dnsSeeds | <code>Array</code> | An array of dns seeds |

<a name="Networks+remove"></a>

### networks.remove
**Kind**: instance property of <code>[Networks](#Networks)</code>  

| Param | Type |
| --- | --- |
| network | <code>[Network](#Network)</code> | 

<a name="Networks+livenet"></a>

### networks.livenet
**Kind**: instance property of <code>[Networks](#Networks)</code>  
<a name="Networks+testnet"></a>

### networks.testnet
**Kind**: instance property of <code>[Networks](#Networks)</code>  
<a name="Networks+enableRegtest"></a>

### networks.enableRegtest
**Kind**: instance property of <code>[Networks](#Networks)</code>  
<a name="Networks+disableRegtest"></a>

### networks.disableRegtest
**Kind**: instance property of <code>[Networks](#Networks)</code>  
