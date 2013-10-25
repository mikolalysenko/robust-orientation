"use strict"

var orientation = require("../orientation.js")

require("tape")(function(t) {

  t.equals(orientation([
      [0,0],
      [-1e-64,0],
      [0,1]
    ]), 1)

  t.equals(orientation([
      [0,0],
      [1e-64,1e-64],
      [1,1]
    ]), 0)

  t.equals(orientation([
      [0,0],
      [1e-64,0],
      [0,1]
    ]), -1)

  var x = 1e-64
  for(var i=0; i<200; ++i) {
    t.equals(orientation([
        [-x, 0],
        [0, 1],
        [x, 0]
      ]), 1)
   t.equals(orientation([
        [-x, 0],
        [0, 0],
        [x, 0]
      ]), 0)
   t.equals(orientation([
        [-x, 0],
        [0, -1],
        [x, 0]
      ]), -1)
   t.equals(orientation([
      [0, 1],
      [0, 0],
      [x, x]
    ]), -1)
    x *= 10
  }
  t.end()
})