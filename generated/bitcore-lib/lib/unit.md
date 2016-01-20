<a name="Unit"></a>
## Unit
**Kind**: global class  

* [Unit](#Unit)
  * [new Unit(amount, code)](#new_Unit_new)
  * _instance_
    * [.toMillis](#Unit+toMillis) ⇒ <code>Number</code>
    * [.toMicros](#Unit+toMicros) ⇒ <code>Number</code>
    * [.toObject](#Unit+toObject) ⇒ <code>Object</code>
    * [.to(code)](#Unit+to) ⇒ <code>Number</code>
    * [.toBTC()](#Unit+toBTC) ⇒ <code>Number</code>
    * [.toSatoshis()](#Unit+toSatoshis) ⇒ <code>Number</code>
    * [.atRate(rate)](#Unit+atRate) ⇒ <code>Number</code>
    * [.toString()](#Unit+toString) ⇒ <code>string</code>
    * [.inspect()](#Unit+inspect) ⇒ <code>string</code>
  * _static_
    * [.fromMillis](#Unit.fromMillis) ⇒ <code>[Unit](#Unit)</code>
    * [.fromMicros](#Unit.fromMicros) ⇒ <code>[Unit](#Unit)</code>
    * [.fromObject(json)](#Unit.fromObject) ⇒ <code>[Unit](#Unit)</code>
    * [.fromBTC(amount)](#Unit.fromBTC) ⇒ <code>[Unit](#Unit)</code>
    * [.fromSatoshis(amount)](#Unit.fromSatoshis) ⇒ <code>[Unit](#Unit)</code>
    * [.fromFiat(amount, rate)](#Unit.fromFiat) ⇒ <code>[Unit](#Unit)</code>

<a name="new_Unit_new"></a>
### new Unit(amount, code)
Utility for handling and converting bitcoins units. The supported units are
BTC, mBTC, bits (also named uBTC) and satoshis. A unit instance can be created with an
amount and a unit code, or alternatively using static methods like {fromBTC}.
It also allows to be created from a fiat amount and the exchange rate, or
alternatively using the {fromFiat} static method.
You can consult for different representation of a unit instance using it's
{to} method, the fixed unit methods like {toSatoshis} or alternatively using
the unit accessors. It also can be converted to a fiat amount by providing the
corresponding BTC/fiat exchange rate.

**Returns**: <code>[Unit](#Unit)</code> - A new instance of an Unit  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>Number</code> | The amount to be represented |
| code | <code>String</code> &#124; <code>Number</code> | The unit of the amount or the exchange rate |

**Example**  
```javascript
var sats = Unit.fromBTC(1.3).toSatoshis();
var mili = Unit.fromBits(1.3).to(Unit.mBTC);
var bits = Unit.fromFiat(1.3, 350).bits;
var btc = new Unit(1.3, Unit.bits).BTC;
```
<a name="Unit+toMillis"></a>
### unit.toMillis ⇒ <code>Number</code>
Returns the value represented in mBTC

**Kind**: instance property of <code>[Unit](#Unit)</code>  
**Returns**: <code>Number</code> - The value converted to mBTC  
<a name="Unit+toMicros"></a>
### unit.toMicros ⇒ <code>Number</code>
Returns the value represented in bits

**Kind**: instance property of <code>[Unit](#Unit)</code>  
**Returns**: <code>Number</code> - The value converted to bits  
<a name="Unit+toObject"></a>
### unit.toObject ⇒ <code>Object</code>
Returns a plain object representation of the Unit

**Kind**: instance property of <code>[Unit](#Unit)</code>  
**Returns**: <code>Object</code> - An object with the keys: amount and code  
<a name="Unit+to"></a>
### unit.to(code) ⇒ <code>Number</code>
Returns the value represented in the specified unit

**Kind**: instance method of <code>[Unit](#Unit)</code>  
**Returns**: <code>Number</code> - The converted value  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>String</code> &#124; <code>Number</code> | The unit code or exchange rate |

<a name="Unit+toBTC"></a>
### unit.toBTC() ⇒ <code>Number</code>
Returns the value represented in BTC

**Kind**: instance method of <code>[Unit](#Unit)</code>  
**Returns**: <code>Number</code> - The value converted to BTC  
<a name="Unit+toSatoshis"></a>
### unit.toSatoshis() ⇒ <code>Number</code>
Returns the value represented in satoshis

**Kind**: instance method of <code>[Unit](#Unit)</code>  
**Returns**: <code>Number</code> - The value converted to satoshis  
<a name="Unit+atRate"></a>
### unit.atRate(rate) ⇒ <code>Number</code>
Returns the value represented in fiat

**Kind**: instance method of <code>[Unit](#Unit)</code>  
**Returns**: <code>Number</code> - The value converted to satoshis  

| Param | Type | Description |
| --- | --- | --- |
| rate | <code>string</code> | The exchange rate between BTC/currency |

<a name="Unit+toString"></a>
### unit.toString() ⇒ <code>string</code>
Returns a the string representation of the value in satoshis

**Kind**: instance method of <code>[Unit](#Unit)</code>  
**Returns**: <code>string</code> - the value in satoshis  
<a name="Unit+inspect"></a>
### unit.inspect() ⇒ <code>string</code>
Returns a string formatted for the console

**Kind**: instance method of <code>[Unit](#Unit)</code>  
**Returns**: <code>string</code> - the value in satoshis  
<a name="Unit.fromMillis"></a>
### Unit.fromMillis ⇒ <code>[Unit](#Unit)</code>
Returns a Unit instance created from an amount in mBTC

**Kind**: static property of <code>[Unit](#Unit)</code>  
**Returns**: <code>[Unit](#Unit)</code> - A Unit instance  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>Number</code> | The amount in mBTC |

<a name="Unit.fromMicros"></a>
### Unit.fromMicros ⇒ <code>[Unit](#Unit)</code>
Returns a Unit instance created from an amount in bits

**Kind**: static property of <code>[Unit](#Unit)</code>  
**Returns**: <code>[Unit](#Unit)</code> - A Unit instance  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>Number</code> | The amount in bits |

<a name="Unit.fromObject"></a>
### Unit.fromObject(json) ⇒ <code>[Unit](#Unit)</code>
Returns a Unit instance created from JSON string or object

**Kind**: static method of <code>[Unit](#Unit)</code>  
**Returns**: <code>[Unit](#Unit)</code> - A Unit instance  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>String</code> &#124; <code>Object</code> | JSON with keys: amount and code |

<a name="Unit.fromBTC"></a>
### Unit.fromBTC(amount) ⇒ <code>[Unit](#Unit)</code>
Returns a Unit instance created from an amount in BTC

**Kind**: static method of <code>[Unit](#Unit)</code>  
**Returns**: <code>[Unit](#Unit)</code> - A Unit instance  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>Number</code> | The amount in BTC |

<a name="Unit.fromSatoshis"></a>
### Unit.fromSatoshis(amount) ⇒ <code>[Unit](#Unit)</code>
Returns a Unit instance created from an amount in satoshis

**Kind**: static method of <code>[Unit](#Unit)</code>  
**Returns**: <code>[Unit](#Unit)</code> - A Unit instance  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>Number</code> | The amount in satoshis |

<a name="Unit.fromFiat"></a>
### Unit.fromFiat(amount, rate) ⇒ <code>[Unit](#Unit)</code>
Returns a Unit instance created from a fiat amount and exchange rate.

**Kind**: static method of <code>[Unit](#Unit)</code>  
**Returns**: <code>[Unit](#Unit)</code> - A Unit instance  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>Number</code> | The amount in fiat |
| rate | <code>Number</code> | The exchange rate BTC/fiat |

