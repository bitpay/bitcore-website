<a name="GetheadersMessage"></a>

## GetheadersMessage ⇐ <code>Message</code>
**Kind**: global class  
**Extends:** <code>Message</code>  
<a name="new_GetheadersMessage_new"></a>

### new GetheadersMessage([options])
Query another peer about block headers. It can query for multiple block hashes,
and the response will contain all the chains of blocks starting from those
hashes.


| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> |  |
| [options.starts] | <code>Array</code> | Array of buffers or strings with the starting block hashes |
| [options.stop] | <code>Buffer</code> | Hash of the last block |

