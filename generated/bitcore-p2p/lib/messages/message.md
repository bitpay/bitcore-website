<a name="Message"></a>

## Message
**Kind**: global class  

* [Message](#Message)
    * [new Message([options])](#new_Message_new)
    * [.toBuffer](#Message+toBuffer)

<a name="new_Message_new"></a>

### new Message([options])
Base message that can be inherited to add an additional
`getPayload` method to modify the message payload.


| Param | Type |
| --- | --- |
| [options] | <code>Object</code> | 
| [options.command] | <code>String</code> | 
| [options.network] | <code>Network</code> | 

<a name="Message+toBuffer"></a>

### message.toBuffer
**Kind**: instance class of <code>[Message](#Message)</code>  
