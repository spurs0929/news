import FastClick from './fastclick';

document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + "px";

// FastClick 初始化
window.addEventListener("load", function(){
  FastClick.attach(document.body);
}, false);

// 修復多手指bug
document.documentElement.addEventListener("touchmove", function(e){
  if(e.touches.length > 1) {
    e.preventDefault();
  }
}, false);