<a name="Point"></a>
## Point ⇐ <code>elliptic.curve.point</code>
**Kind**: global class  
**Extends:** <code>elliptic.curve.point</code>  
**Link**: https://github.com/indutny/elliptic  

* [Point](#Point) ⇐ <code>elliptic.curve.point</code>
  * [new Point(x, y)](#new_Point_new)
  * _instance_
    * [.getX()](#Point+getX) ⇒ <code>BN</code>
    * [.getY()](#Point+getY) ⇒ <code>BN</code>
    * [.validate(An)](#Point+validate) ⇒ <code>[Point](#Point)</code>
  * _static_
    * [.fromX(odd, x)](#Point.fromX) ⇒ <code>[Point](#Point)</code>
    * [.getG()](#Point.getG) ⇒ <code>[Point](#Point)</code>
    * [.getN()](#Point.getN) ⇒ <code>BN</code>

<a name="new_Point_new"></a>
### new Point(x, y)
Instantiate a valid secp256k1 Point from the X and Y coordinates.

**Returns**: <code>[Point](#Point)</code> - An instance of Point  
**Throws**:

- <code>Error</code> A validation error if exists


| Param | Type | Description |
| --- | --- | --- |
| x | <code>BN</code> &#124; <code>String</code> | The X coordinate |
| y | <code>BN</code> &#124; <code>String</code> | The Y coordinate |

<a name="Point+getX"></a>
### point.getX() ⇒ <code>BN</code>
Will return the X coordinate of the Point

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>BN</code> - A BN instance of the X coordinate  
<a name="Point+getY"></a>
### point.getY() ⇒ <code>BN</code>
Will return the Y coordinate of the Point

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>BN</code> - A BN instance of the Y coordinate  
<a name="Point+validate"></a>
### point.validate(An) ⇒ <code>[Point](#Point)</code>
Will determine if the point is valid

**Kind**: instance method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - An instance of the same Point  
**Throws**:

- <code>Error</code> A validation error if exists

**Link**: https://www.iacr.org/archive/pkc2003/25670211/25670211.pdf  

| Param | Type | Description |
| --- | --- | --- |
| An | <code>[Point](#Point)</code> | instance of Point |

<a name="Point.fromX"></a>
### Point.fromX(odd, x) ⇒ <code>[Point](#Point)</code>
Instantiate a valid secp256k1 Point from only the X coordinate

**Kind**: static method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - An instance of Point  
**Throws**:

- <code>Error</code> A validation error if exists


| Param | Type | Description |
| --- | --- | --- |
| odd | <code>boolean</code> | If the Y coordinate is odd |
| x | <code>BN</code> &#124; <code>String</code> | The X coordinate |

<a name="Point.getG"></a>
### Point.getG() ⇒ <code>[Point](#Point)</code>
Will return a secp256k1 ECDSA base point.

**Kind**: static method of <code>[Point](#Point)</code>  
**Returns**: <code>[Point](#Point)</code> - An instance of the base point.  
**Link**: https://en.bitcoin.it/wiki/Secp256k1  
<a name="Point.getN"></a>
### Point.getN() ⇒ <code>BN</code>
Will return the max of range of valid private keys as governed by the secp256k1 ECDSA standard.

**Kind**: static method of <code>[Point](#Point)</code>  
**Returns**: <code>BN</code> - A BN instance of the number of points on the curve  
**Link**: https://en.bitcoin.it/wiki/Private_key#Range_of_valid_ECDSA_private_keys  
