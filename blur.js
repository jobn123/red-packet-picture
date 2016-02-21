var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var img = new Image();
var cilpRegion = {x:400, y:200, r:50};
var leftMargin = 0, topMargin = 0;
img.src = "./xinhuan.jpg";
img.onload = function() {
  $('#main').css({'width': canvasWidth+'px', 'height': canvasHeight+'px'});
  $('#img').css({'width': img.width+'px', 'height': img.height+'px'});

  leftMargin = (img.width - canvas.width) / 2;
  topMargin = (img.height - canvas.height) / 2;

  $('#img').css({'top': '-'+topMargin+'px', 'left': '-'+leftMargin+'px'});

  initCanvas();
}

function initCanvas() {
  cilpRegion = {x:Math.random()*300+50, y:Math.random()*200+50, r:50};
  draw(img, cilpRegion);
}

function draw(img, cilpRegion) {
  //清理canvas内容
  context.clearRect(0, 0, canvas.width, canvas.height);
  //存储当前状态
  context.save();
  setClipRegion(cilpRegion);
  // context.drawImage(img, 0, 0, canvasWidth, canvasHeight);
  context.drawImage(img, leftMargin, topMargin, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
  //状态恢复
  context.restore();
}

function setClipRegion(cilpRegion) {
  context.beginPath();
  context.arc(cilpRegion.x, cilpRegion.y, cilpRegion.r, 0, Math.PI*2, false);
  context.clip();
}
var animate;
function show() {
  clearInterval(animate);
  animate = setInterval(function() {
    console.log('tstff');
    console.log(cilpRegion.r);
    cilpRegion.r += 20;
    if( cilpRegion.r > 1000 ) {
      clearInterval(animate);
    }
    draw(img, cilpRegion);
  }, 30);
}

function reset() {
  clearInterval(animate);
  initCanvas();
}
