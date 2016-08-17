<a name="HeadersMessage"></a>

## HeadersMessage ⇐ <code>Message</code>
**Kind**: global class  
**Extends:** <code>Message</code>  
<a name="new_HeadersMessage_new"></a>

### new HeadersMessage(arg, [options])
Sent in response to a `getheaders` message. It contains information about
block headers.


| Param | Type | Description |
| --- | --- | --- |
| arg | <code>Array</code> | An array of BlockHeader instances |
| [options] | <code>Object</code> |  |
| [options.headers] | <code>Array</code> | array of block headers |
| options.BlockHeader | <code>function</code> | a BlockHeader constructor |

