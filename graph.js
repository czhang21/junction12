// from http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();


var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

var numSegments = 100;

var plotXMin = -10;
var plotXMax = 10;
var plotYMin = -10;
var plotYMax = 10;

var screenXMin = 0;
var screenXMax = canvas.width;
var screenYMin = canvas.height;
var screenYMax = 0;

var time = 0;

function transform(x, min1, max1, min2, max2){
  // normalizedX is between 0 and 1
  var normalizedX = (x - min1) / (max1 - min1);
  return normalizedX * (max2 - min2) + min2;
}

function drawPlot(){
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.strokeRect(0, 0, canvas.width, canvas.height);
  
  // Draw the X axis
  var xAxisYPixelCoordinate = transform(
    0, plotYMin, plotYMax, screenYMin, screenYMax);
  c.beginPath();
  c.moveTo(0, xAxisYPixelCoordinate);
  c.lineTo(canvas.width, xAxisYPixelCoordinate);
  c.stroke();
  
  // Draw the Y axis
  var yAxisXPixelCoordinate = transform(
    0, plotXMin, plotXMax, screenXMin, screenXMax);
  c.beginPath();
  c.moveTo(yAxisXPixelCoordinate, 0);
  c.lineTo(yAxisXPixelCoordinate, canvas.height);
  c.stroke();
  
  //Draw the function
  var i, plotX, plotY, screenX, screenY;
  c.beginPath();
  for(i = 0; i <= numSegments; i++){
    plotX = transform(i, 0, numSegments, plotXMin, plotXMax);
    plotY = executeEquation(plotX);
    screenX = transform(plotX, plotXMin, plotXMax, screenXMin, screenXMax);
    screenY = transform(plotY, plotYMin, plotYMax, screenYMin, screenYMax);
    if(i === 0)
      c.moveTo(screenX, screenY);
    else
      c.lineTo(screenX, screenY);
     
  }
  c.stroke();
}

(function animate(){
  requestAnimFrame(animate);
  time += 0.05;
  drawPlot();
})();

function sin(x){
  return Math.sin(x);
}

function executeEquation(x){
  var y;
  y = Math.sin(x);
  return y;
}

function plotButtonClick(text){
  var code = ["executeEquation = function(x){",
  " var y;",
  text+";",
  " return y;",
  "}"].join("\n");
  
  eval(code);