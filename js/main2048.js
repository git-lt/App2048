/**
 * Created by liutao on 14-8-29.
 * version 0.0.1
 * GitHub: https://github.com/git-lt/App2048
 */

//界面数据、分数、检测是否碰撞过的数组
var board =[],score=0,hasConflicted=[];

//保存移动端的触控坐标
var startX=0,stratY=0,endX=0,endY=0;


$(function(){
	prepareForMobile();
	newGame();
});

//移动端的适应处理
function prepareForMobile(){
	if(documentWidth > 500){
		gridContainerWidth = 500;
		cellSpace=20;
		cellSideLength=100;
	}
	

	$('#grid-container').css('width',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);
	
	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);
}

//重新开始
function newGame(){
	//初始化棋盘格
	init();
	
	//随机生成两个数字
	generateOneNumber();
	generateOneNumber();
}

//界面初始化
function init(){
	for(var i=0; i<4; i+=1){
		board[i]=[];
		hasConflicted[i]=[];
		for(var j=0; j<4; j+=1){
			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
			
			board[i][j]=0;
			hasConflicted[i][j]=false;
		}
	}
	
	updateBoardView();
	score=0;
}

//视图更新
function updateBoardView(){
	$('.number-cell','#grid-container').remove();
	var $contentbox = $('#grid-container');
	for(var i=0; i<4; i+=1){
		for(var j=0; j<4; j+=1){
			$contentbox.append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var $curNumberCell = $('#number-cell-'+i+'-'+j);
			if(board[i][j]===0){
				$curNumberCell.css('width',0);
				$curNumberCell.css('height',0);
				$curNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				$curNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
			}else{
				$curNumberCell.css('width',cellSideLength);
				$curNumberCell.css('height',cellSideLength);
				$curNumberCell.css('top',getPosTop(i,j));
				$curNumberCell.css('left',getPosLeft(i,j));
				$curNumberCell.css('background',getNumberBackgroundColor(board[i][j]));
				$curNumberCell.css('color',getNumberColor(board[i][j]));				
				$curNumberCell.css('font-size',getFontSize(board[i][j]));
//				$curNumberCell.text(board[i][j]);
				$curNumberCell.text(settings.isNumber?board[i][j]:getTextByNum(board[i][j]));
			}
			hasConflicted[i][j]=false;
		}
	}
    $('.number-cell').css('line-height',cellSideLength+'px');
//  $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}
//随机生成数字
function generateOneNumber(){
	if(noSpace(board)){
		return false
	}
	
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4),10);
	var randy=parseInt(Math.floor(Math.random()*4),10);
	
	//算法改进，如果随机出来位置不是空的，那么
	if(board[randx][randy]!==0){
		var count=0,temp=[];
		for(var i=0; i<4; i+=1){
			for(var j=0; j<4; j+=1){
				if(board[i][j]===0){
					temp.push(i*4+j);
					count+=1;
				}
			}
		}
		var tNum= parseInt(Math.floor(Math.random()*count),10);
		randx=Math.floor(temp[tNum]/4);
		randy=Math.floor(temp[tNum]%4);
	}
	
//	while(true){
//		if(board[randx][randy]==0)
//			break;
//		randx=parseInt(Math.floor(Math.random()*4),10);
//		randy=parseInt(Math.floor(Math.random()*4),10);
//	}
	
	//随机一个数字
	var randNum = Math.random()<0.5?2:4; //以50%的概率生成2或4

	//在随机位置显示随机数字
	board[randx][randy]=randNum;
	showNumberWithAnimation(randx,randy,randNum);
	
	return true;
}

//=======================
//		事件监听处理
//=======================

//PC端键盘事件监听
$(document).keydown(function(e){
	switch(e.keyCode){
		case 37: 	//left
			e.preventDefault();//阻止默认事件
			if(moveLeft(board)){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		break;
		case 38:	//up
			e.preventDefault();//阻止默认事件
			if(moveUp(board)){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		break;
		case 39:	//right
			e.preventDefault();//阻止默认事件
			if(moveRight(board)){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		break;
		case 40:	//down
			e.preventDefault();//阻止默认事件
			if(moveDown(board)){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		break;
	}
});

//移动端的触控监听
document.addEventListener('touchstart',function(e){
	startX=e.touches[0].pageX;
	startY=e.touches[0].pageY;
	
});
document.addEventListener('touchend',function(e){
	endX=e.changedTouches[0].pageX;
	endY=e.changedTouches[0].pageY;
	
	//触摸结束后，判断触控的方向
	var deltaX=endX-startX;
	var deltaY = endY-startY;
	
	//解决用户点击也移动的bug (如果用户触的距离过去，则不移动)
	if(Math.abs(deltaX)<0.3*cellSideLength && Math.abs(deltaY)<0.3*cellSideLength)
		return
	
	if(Math.abs(deltaX)>=Math.abs(deltaY)){
		if(deltaX>0){	//right
			if(moveRight(board)){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		}else{			//left
			if(moveLeft(board)){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
			
		}
	}else{
		if(deltaY>0){ 	//down
			if(moveDown(board)){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		}else{			//up
			if(moveUp(board)){
				setTimeout('generateOneNumber()',210);
				setTimeout('isgameover()',300);
			}
		}
	}
	
});

//解决安卓4.0上阻止默认事件的bug
document.addEventListener('touchmove',function(e){
	e.preventDefault();
})


//=======================
//		移动的逻辑处理
//=======================
//是否可以移动：有位置或数字可以合并
//落脚位置是否为空
//落脚位置是否有可合并的数字
//途中是否有障碍物
function moveLeft(){
	if(canMoveLeft(board)){
		for(var i=0; i<4; i+=1){
			for(var j=1; j<4; j+=1){
				if(board[i][j]!==0){
					for(var k=0; k<j; k++){
						if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
							//move
							showMoveAnimation(i,j,i,k);
							board[i][k]=board[i][j];
							board[i][j]=0;
							continue;
						}else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
							//move
							//add
							showMoveAnimation(i,j,i,k);
							board[i][k]+=board[i][j];
							board[i][j]=0;
							score+=board[i][k];
							updateScore(score);
							
							hasConflicted[i][k]=true;
							continue;
						}
					}
				}
			}
		}

		setTimeout('updateBoardView()',200);
		return true;
	}
	
	return false;
}
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	
	for(var i=0; i<4; i+=1){
			for(var j=2; j>=0; j-=1){
			 if(board[i][j]!==0){
			 	for(var k=3; k>j; k-=1){
			 		if(board[i][k]===0 && noBlockHorizontal(i,j,k,board)){
			 			//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
			 		}else if(board[i][k]===board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);
						
						hasConflicted[i][k]=true;
						continue;
			 		}
			 	}
			 }
		}
	}
	
	setTimeout('updateBoardView()',200);
	return true;
}
function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	
	for(var j=0; j<4; j+=1){
			for(var i=1; i<4; i+=1){
			 if(board[i][j]!==0){
			 	for(var k=0; k<i; k+=1){
			 		if(board[k][j]===0 && noBlockVartical(j,k,i,board)){
			 			//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
			 		}else if(board[k][j]===board[i][j] && noBlockVartical(j,k,i,board) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						updateScore(score);
						
						hasConflicted[k][j]=true;
						continue;
			 		}
			 	}
			 }
		}
	}
	
	setTimeout('updateBoardView()',200);
	return true;
	
	
}
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	
	for(var j=0; j<4; j+=1){
			for(var i=2;i>=0;i-=1){
			 if(board[i][j]!==0){
			 	for(var k=3; k>i; k-=1){
			 		if(board[k][j]===0 && noBlockVartical(j,i,k,board)){
			 			//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
			 		}else if(board[k][j]===board[i][j] && noBlockVartical(j,i,k,board)&& !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						updateScore(score);
						
						hasConflicted[k][j]=true;
						continue;
			 		}
			 	}
			 }
		}
	}
	
	setTimeout('updateBoardView()',200);
	return true;
}


//=======================
//		Game Over处理
//=======================
function isgameover(){
	if(noSpace(board) && noMove(board)){
		gameover();
	}
}

function gameover(){
	alert('Game Over!');
}

