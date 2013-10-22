"use strict"

var orientation = require("../orientation.js")

require("tape")(function(t) {

  console.log(orientation([
      [0,0],
      [-1e-64,0],
      [0,1]
    ]))

  t.end()
})