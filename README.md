robust-orientation
==================
Robust orientation test for n-simplices

## Example

```javascript
var orientation = require("robust-orientation")

var triangle = [[0, 0], [1e-64, 0], [0, 1]]
console.log(orientation(triangle))
```

### `require("robust-orientation")(simplex)`
Exactly computes the orientation of a collection of (n+1) points in n-dimensions.

* `points` is an array of `(n+1)` arrays, each array having length `n`

**Returns** The orientation of the point set:
* `+1` if the tuple of points is positively oriented
* `-1` if the tuple of points is negatively oriented
* `0` if the points are coplanar

## Credits
(c) 2013 Mikola Lysenko. MIT License