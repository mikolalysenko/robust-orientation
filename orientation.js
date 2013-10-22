"use strict"

var twoProduct = require("two-product")
var robustSum = require("robust-sum")
var robustScale = require("robust-scale")

module.exports = getOrientation

function cofactor(m, c) {
  var result = new Array(m.length-1)
  for(var i=1; i<m.length; ++i) {
    var r = result[i-1] = new Array(m.length-1)
    for(var j=0,k=0; j<m.length; ++j) {
      if(j === c) {
        continue
      }
      r[k++] = m[i][j]
    }
  }
  return result
}

function matrix(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = new Array(n)
    for(var j=0; j<n; ++j) {
      result[i][j] = ["m[", j, "][", (n-i-1), "]"].join("")
    }
  }
  return result
}

function sign(n) {
  if(n & 1) {
    return "-"
  }
  return ""
}

function generateSum(expr) {
  if(expr.length === 1) {
    return expr[0]
  } else if(expr.length === 2) {
    return ["sum(", expr[0], ",", expr[1], ")"].join("")
  } else {
    var m = expr.length>>1
    return ["sum(", generateSum(expr.slice(0, m)), ",", generateSum(expr.slice(m)), ")"].join("")
  }
}

function determinant(m) {
  if(m.length === 2) {
    return ["sum(prod(", m[0][0], ",", m[1][1], "),prod(-", m[0][1], ",", m[1][0], "))"].join("")
  } else {
    var expr = []
    for(var i=0; i<m.length; ++i) {
      expr.push(["scale(", determinant(cofactor(m, i)), ",", sign(i), m[0][i], ")"].join(""))
    }
    return generateSum(expr)
  }
}

function orientation(n) {
  var pos = []
  var neg = []
  var m = matrix(n)
  for(var i=0; i<n; ++i) {
    if((i&1)===0) {
      pos.push(determinant(cofactor(m, i)))
    } else {
      neg.push(determinant(cofactor(m, i)))
    }
  }
  var posExpr = generateSum(pos)
  var negExpr = generateSum(neg)
  var code = ["function orientation", n, "(m){var p=", posExpr, ",n=", negExpr, ";\
for(var i=p.length-1,j=n.length-1;i>=0&&j>=0;--i,--j){\
if(p[i]<n[j]){return -1}else if(p[i]>n[j]){return 1}}\
if(i>=0){return p[i]>0?1:(p[i]<0?-1:0)}\
if(j>=0){return n[j]<0?1:(n[j]>0?-1:0)}\
return 0};return orientation", n].join("")
  var proc = new Function("sum", "prod", "scale", code)
  return proc(robustSum, twoProduct, robustScale)
}

var CACHED = [
  function orientation0() { return 0 },
  function orientation1() { return 0 },
  function orientation2(a) { 
    var d = a[0][0] - a[1][0]
    if(d < 0) { return -1 }
    if(d > 0) { return 1 }
    return 0
  }
]

function getOrientation(m) {
  while(CACHED.length <= m.length) {
    CACHED.push(orientation(CACHED.length))
  }
  var p = CACHED[m.length]
  return p(m)
}