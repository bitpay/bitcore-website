<a name="VersionMessage"></a>
## VersionMessage ⇐ <code>Message</code>
**Kind**: global class  
**Extends:** <code>Message</code>  
**See**: https://en.bitcoin.it/wiki/Protocol_documentation#version  
<a name="new_VersionMessage_new"></a>
### new VersionMessage([arg], options)
The version message is used on connection creation to advertise
the type of node. The remote node will respond with its version, and no
communication is possible until both peers have exchanged their versions.


| Param | Type | Description |
| --- | --- | --- |
| [arg] | <code>Object</code> | properties for the version message |
| [arg.nonce] | <code>Buffer</code> | a random 8 byte buffer |
| [arg.subversion] | <code>String</code> | version of the client |
| [arg.services] | <code>BN</code> |  |
| [arg.timestamp] | <code>Date</code> |  |
| [arg.startHeight] | <code>Number</code> |  |
| options | <code>Object</code> |  |

