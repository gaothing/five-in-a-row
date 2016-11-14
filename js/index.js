$(function(){
	var canvas=document.getElementById("canvas");
	var ctx=canvas.getContext("2d");
	var clockOne=document.getElementById("clockone");
	var ctx1=clockOne.getContext("2d");
	var clockTwo=document.getElementById("clocktwo");
	var ctx2=clockTwo.getContext("2d");
	var muOne=document.getElementById("mu-one");
	var muTwo=document.getElementById("mu-two");
	var over=document.getElementsByClassName("over")[0];
	var jin=document.getElementsByClassName("jin")[0];
	var enter=document.getElementsByClassName("enter")[0];
	var restart=document.getElementsByClassName("restart")[0];
	var tui=document.getElementsByClassName("tui")[0];
	var gameover=document.getElementsByClassName("gameover")[0];
	var news=document.getElementsByClassName("new")[0];
//	---------------
var status="pause";
var AI=true;
var bo=true;
var kongbai={};
var pos1;
var pos2;
//_------------------?
//開始遊戲
$(".start").on("click",function(){
	if(!AI){
		louzi(7,7,"black")
	}
	if($(".over").css("width")==="400px"){
		return
	}
	$(".zhe").css("display","none")
	status="play"
})
//进入游戏
	$(jin).on("click",function(){
	$(enter).css("display","none")
	})
//	-----------?
//	tuichu游戏
tui.onclick=function(){
	console.log(3)
		$(gameover).removeClass("game-act2").addClass("game-act")	
}
console.log(news)
//再来一局
$(".zailai").on("click",function(){
	drawbox();
	po={};
	flag=true;
	$(over).removeClass("over-act")
	$(".zailai").text("").css("display","none")
	$(".text").text("").css("display","none")
$(".zhe").css("display","block")
})
//再来一战
news.onclick=function(){
	console.log(1)
	drawbox();
	po={};
	flag=true;
	$(over).removeClass("over-act")
	$(".zailai").text("").css("display","none")
	$(".text").text("").css("display","none")
	$(".zhe").css("display","block")
	$(gameover).removeClass("game-act")	.addClass("game-act2")
}
restart.onclick=function(){
	drawbox();
	po={};
	flag=true;
	status="pause"
	$(over).removeClass("over-act")
	$(".zailai").text("").css("display","none")
	$(".text").text("").css("display","none")
	$(".zhe").css("display","block")
}
//----------------------
//保存棋譜
//	-----------------------------
//判断输赢
function check(x,y,color){
//	横
	var hen=1,k=1;
	while(po[m(x+k,y)]===color){k++;hen++;}
	 k=1
	while(po[m(x-k,y)]===color){k++;hen++;}
	
//	竖
	var shu=1,k=1;
	while(po[m(x,y+k)]===color){k++;shu++;}
	 k=1
	while(po[m(x,y-k)]===color){k++;shu++;}
//左斜
	var zX=1,k=1;
	while(po[m(x+k,y+k)]===color){k++;zX++;}
	 k=1
	while(po[m(x-k,y-k)]===color){k++;zX++;}
//右斜
	var yX=1,k=1;
	while(po[m(x+k,y-k)]===color){k++; yX++;}
	 k=1
	while(po[m(x-k,y+k)]===color){k++; yX++;}

	return Math.max(hen,shu,zX,yX)
}
function m(x,y){
	return x+"_"+y
}
///左边钟表
var s=-1
function miaozhen(){
	s+=1;
	ctx1.clearRect(0,0,100,100)
	ctx1.save()
	ctx1.beginPath();
	ctx1.translate(50,50);
	ctx1.rotate(s*(6*Math.PI/180))
	ctx1.moveTo(0,0)
	ctx1.lineTo(0,-35)
	ctx1.strokeStyle="red";
	ctx1.closePath();
	ctx1.stroke()
	ctx1.restore()
	if(s>=60){
		$(over).addClass("over-act")
		clearInterval(ts)
		status="pause"
		$(".zailai").css("display","block").text("再来一局")
		$(".text").css("display","block").text("您太慢了，您输了！黑方胜利！");
		$(".zhe").css("display","block")
	}
}
miaozhen()
//右边钟表
var z=-1
function miaozhen2(){
	z+=1;
	ctx2.clearRect(0,0,100,100)
	ctx2.save()
	ctx2.beginPath();
	ctx2.translate(50,50);
	ctx2.rotate(z*(6*Math.PI/180))
	ctx2.moveTo(0,0)
	ctx2.lineTo(0,-35)
	ctx2.closePath();
	ctx2.stroke()	
	ctx2.restore()
	if(z>=60){
		$(over).addClass("over-act")
			clearInterval(t)
			status="pause"
			$(".zailai").text("再来一局")
		$(".text").text("您太慢了，您输了！白方胜利！")
		$(".zhe").css("display","block")
	}
	
}	
miaozhen2()
//--------------------------------
//画棋盘
function drawbox(){
	ctx.strokeStyle="#E1AB55";
	ctx.clearRect(0,0,450,450)
	ctx.beginPath();
	for(var i=0;i<15;i++){
		ctx.moveTo(15.5,15.5+i*30)
		ctx.lineTo(435.5,15.5+i*30)
		ctx.moveTo(15.5+i*30,15.5)
		ctx.lineTo(15.5+i*30,435.5)
		ctx.closePath()
		ctx.stroke()
	}
	cir()
}
drawbox()
//五小点
function cir(){
//	中心
ctx.fillStyle="#666";
	ctx.save();
	
	ctx.beginPath();
	ctx.translate(225,225);
	ctx.arc(0,0,3,0,Math.PI/180*360)
	ctx.closePath();
	ctx.fill()
	ctx.restore()
//	左上
	ctx.save()
	ctx.beginPath();
	ctx.translate(15.5+3*30,15.5+3*30);
	ctx.arc(0,0,3,0,Math.PI/180*360)
	ctx.closePath();
	ctx.fill()
	ctx.restore()
//	右上
ctx.save()
	ctx.beginPath();
	ctx.translate(15.5+11*30,15.5+3*30);
	ctx.arc(0,0,3,0,Math.PI/180*360)
	ctx.closePath();
	ctx.fill()
	ctx.restore()
//	左下
ctx.save()
	ctx.beginPath();
	ctx.translate(15.5+3*30,15.5+11*30);
	ctx.arc(0,0,3,0,Math.PI/180*360)
	ctx.closePath();
	ctx.fill()
	ctx.restore()
//	右下
	ctx.save()
	ctx.beginPath();
	ctx.translate(15.5+11*30,15.5+11*30);
	ctx.arc(0,0,3,0,Math.PI/180*360)
	ctx.closePath();
	ctx.fill()
	ctx.restore()

}

//--------------------------------
//交错落子
//----坐标处理--------------------
var n=30;
var bR=12;
var flag=true;
var po={};
var t,ts;
function q(x){
	return (x+0.5)*n+0.5;
}
canvas.onclick=function(e){
	var x=Math.floor(e.offsetX/30)
	var y=Math.floor(e.offsetY/30)
	if(po[x+'_'+y]){
		return;
	}
	if(!AI){
		louzi(x,y,"white")
		delete kongbai[intel().x+"_"+intel().y];
		louzi(intel().x,intel().y,"black")
	}else{
		if(flag){
			louzi(x,y,"black")
		}else{		
			louzi(x,y,"white")
		}
		flag=!flag;
	}
	
		
}
function louzi(x,y,color){
	ctx.save()
	ctx.beginPath();
	ctx.translate(q(x),q(y));
	if(color==="black"){
		var radgrad = ctx.createRadialGradient(-5,-5,2,0,0,20);
	 	radgrad.addColorStop(0,'#fff');
	 	radgrad.addColorStop(0.1,'#fff');
	 	radgrad.addColorStop(0.8,'#ccc');
	 	radgrad.addColorStop(1, '#ccc');
		ctx.fillStyle=radgrad;
		clearInterval(t)
		s=-1;
		miaozhen()
		 ts=setInterval(miaozhen2,1000);		
			muOne.play()	
			muTwo.pause()
			if(check(x,y,color)>=5){
			$(over).addClass("over-act")
			clearInterval(ts)
			clearInterval(t)
			status="pause"
			$(".zailai").css("display","block").text("再来一局")
			$(".text").css("display","block").text("您输了！白方胜利！")
			$(".zhe").css("display","block")
//		imgss()
			}
			
	}else{
		var radgrad = ctx.createRadialGradient(-5,-5,2,0,0,20);
	 	radgrad.addColorStop(0,'#848484');
	 	radgrad.addColorStop(0.1,'#848484');
	 	radgrad.addColorStop(0.8, 'black');
	 	radgrad.addColorStop(1, 'black');
		ctx.fillStyle=radgrad;
		clearInterval(ts)
		z=-1
		miaozhen2()
		 t=setInterval(miaozhen,1000)
		muOne.pause()
		muTwo.play()
		if(check(x,y,color)>=5){
			$(over).addClass("over-act")
			clearInterval(ts)
			clearInterval(t)
			status="pause"
			$(".zailai").css("display","block").text("再来一局")
			$(".text").css("display","block").text("您输了！黑方胜利！")
			$(".zhe").css("display","block")
//		imgss()
			}
	}
	
	ctx.arc(0,0,bR,0,Math.PI/180*360)
	ctx.closePath();
	ctx.fill()
	ctx.restore()
	po[x+'_'+y]=color;
	delete kongbai[m(x,y)];
}
//游戏结束添加文本顺序
imgss=function(){
		ctx.save();
     	var g=1
     	for(var z in po){
     	var arr=z.split("_");
     	if(po[z]==='black'){
     	ctx.fillStyle="black";
     	}else{
     		ctx.fillStyle="white";
     	}
     	ctx.font='20px/1  微软雅黑';
     	ctx.textAlign="center";
     	ctx.textBaseline="middle";
     	ctx.fillText(g++,q(parseInt(arr[0])),q(parseInt(arr[1])))
     	ctx.restore();
     }
}
//$('<img>').attr('src',canvas.toDataURl()).appendTo(".chessbox")

var status="pause";
var AI=true;
var bo=true;
var kongbai={};
var pos1={};
var pos={};

for( var i=0;i<15;i++){
	for(var j=0;j<15;j++){
		kongbai[i+"_"+j]=true;
	}
}
function intel(){
	var max=-Infinity;
	var max2=-Infinity;
	for(var k in kongbai){
		var x=parseInt(k.split("_")[0]);
		var y=parseInt(k.split("_")[1]);
		var m=check(x,y,"black")
		var m2=check(x,y,"white")
		if(m>max){
			max=m
			pos1={x:x,y:y}
		}
		if(m2>max2){
			max2=m2
			pos2={x:x,y:y}
		}
	}
//	console.log(kongbai)
	if (max2 > max) {
        return pos2;
    } else {
        return pos1;
    }

}
//--------------

//---------------

//canvas.onclick=function(e){
//	var x=Math.floor(e.offsetX/30)
//	var y=Math.floor(e.offsetY/30)
//	if(po[x+'_'+y]){
//		return;
//	}
//	if(flag){
//		louzi(x,y,"black")
//	}else{		
//		louzi(x,y,"white")
//	}
//	flag=!flag;
//		
//}
//游戏模式
$(".computer").on("click",function(){
	if(status=="play"){
		return
	}
	if(AI){
		$(this).css("color","red").prev().css("color","#000");
		AI=false;
	}
	
	
})
$(".person").on("click",function(){
	if(status=="play"){
		return
	}
	if(!AI){
		$(this).css("color","red").next().css("color","#000");
		AI=true;
	}
	
	
})
})
  