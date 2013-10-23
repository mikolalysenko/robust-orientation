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

  t.equals(orientation([
      [0,0],
      [Infinity,-Infinity],
      [-Infinity,Infinity]
    ]), 0)

  t.equals(orientation([
      [0,0],
      [-Infinity, Infinity],
      [Infinity, Infinity]
    ]), 1)

  t.equals(orientation([
      [0,0],
      [-Infinity, -Infinity],
      [Infinity, -Infinity]
    ]), -1)

  t.equals(orientation([
    [0,0],
    [0,Infinity],
    [Infinity, -Infinity]
    ]), 1)

  t.end()
})