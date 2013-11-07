robust-orientation
==================
Robust orientation test for n-simplices.  Based on the work of Jonathan Shewchuk:

* Shewchuk, J.  ["Adaptive precision floating point arithmetic predicates for computational geometry"](http://www.cs.cmu.edu/~quake/robust.html)

This implementation is robust in the sense that the answers returned are exact, but it is not fully adaptive.  Basically an initial test is computed, and if the accuracy of this is too low then an exact version of the test is executed.  Compared to Shewchuk's original C code this is slower, but eventually I hope to make improvements that bring the performance closer in line to his version.

## Example

```javascript
var orientation = require("robust-orientation")

console.log(orientation([0, 0], [1e-64, 0], [0, 1]))
```

### `require("robust-orientation")(p0, p1, p2, ...)`
Exactly computes the orientation of a collection of (n+1) points in n-dimensions.

* `p0,p1,p2,...` is a list of points

**Returns** The orientation of the point set:
* `<0` if the tuple of points is positively oriented
* `>0` if the tuple of points is negatively oriented
* `=0` if the points are coplanar

## Credits
(c) 2013 Mikola Lysenko. MIT License