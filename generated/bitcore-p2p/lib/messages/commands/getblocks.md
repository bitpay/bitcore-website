<a name="GetblocksMessage"></a>

## GetblocksMessage ⇐ <code>Message</code>
**Kind**: global class  
**Extends:** <code>Message</code>  
<a name="new_GetblocksMessage_new"></a>

### new GetblocksMessage([arg], options)
Query another peer about blocks. It can query for multiple block hashes,
and the response will contain all the chains of blocks starting from those
hashes.


| Param | Type | Description |
| --- | --- | --- |
| [arg] | <code>Object</code> |  |
| [arg.starts] | <code>Array</code> | Array of buffers or strings with the starting block hashes |
| [arg.stop] | <code>Buffer</code> | Hash of the last block |
| options | <code>Object</code> |  |

