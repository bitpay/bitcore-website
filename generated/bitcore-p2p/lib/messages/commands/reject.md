<a name="RejectMessage"></a>
## RejectMessage ⇐ <code>Message</code>
**Kind**: global class  
**Extends:** <code>Message</code>  
**See**: https://en.bitcoin.it/wiki/Protocol_documentation#reject  
<a name="new_RejectMessage_new"></a>
### new RejectMessage([arg], options)
The reject message is sent when messages are rejected.


| Param | Type | Description |
| --- | --- | --- |
| [arg] | <code>Object</code> | properties for the reject message |
| [arg.message] | <code>String</code> | type of message rejected |
| [arg.ccode] | <code>Number</code> | code relating to rejected message |
| [arg.reason] | <code>String</code> | text version of reason for rejection |
| [arg.data] | <code>Buffer</code> | Optional extra data provided by some errors. |
| options | <code>Object</code> |  |

