/**
 * Created by liutao on 14-8-29.
 * version 0.0.1
 * GitHub: https://github.com/git-lt/App2048
 */

//var documentWidth = window.screen.availWidth,
var documentWidth = document.body.clientWidth,
	gridContainerWidth= 0.92*documentWidth,
	cellSideLength = 0.18 * documentWidth,
	cellSpace = 0.04* documentWidth;

var settings={
	isNumber:false
}
function getPosTop(i,j){
	return cellSpace + i*(cellSideLength+cellSpace);
}
function getPosLeft(i,j){
	return cellSpace + j*(cellSideLength+cellSpace);
}

function getNumberBackgroundColor(num){
	 switch( num ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}
function getNumberColor(num){
	if( num <= 4 )
        return "#776e65";

    return "white";
}
function getFontSize(num){
	//如果是文字
	if(!settings.isNumber){
		if((num+'').length>3){
			//当文字大于3个时，将字体缩小
			return 0.2*cellSideLength+'px';
		}
		return 0.3*cellSideLength+'px';
	}else{
		if((num+'').length>3){
			//当数字大于3个时，将字体缩小
			return 0.4*cellSideLength+'px';
		}
		return 0.6*cellSideLength+'px';
	}
	
}
function getTextByNum(num){
	 switch(num){
		case 2:return "小白"; break;
		case 4:return "实习生"; break;
		case 8:return "程序员"; break;
		case 16:return "工程师"; break;	
		case 32:return "主管"; break;	
		case 64:return "经理"; break;
		case 128:return "总监"; break;
		case 256:return "总经理"; break;	
		case 512:return "副总裁"; break;	
		case 1024:return "CEO"; break;	
		case 2048:return "总裁"; break	;
		case 4096:return "董事长"; break	;
		case 8192:return "乔布斯"; break	;
	}
    return "black";
}


function canMoveLeft(board){
	for(var i=0; i<4; i+=1){
		for(var j=1; j<4; j+=1){
			if(board[i][j] !=0){
				if(board[i][j-1]===0 || board[i][j-1]==board[i][j]){
					return true;
				}
			}
		}
	}
	
	return false;
}
function canMoveRight(board){
		for(var i=0; i<4; i+=1){
		for(var j=0; j<3; j+=1){
			if(board[i][j] !=0){
				if(board[i][j+1]===0 || board[i][j+1]==board[i][j]){
					return true;
				}
			}
		}
	}
	
	return false;
}
function canMoveUp(board){
	for(var i=1; i<4; i+=1){
		for(var j=0; j<4; j+=1){
			if(board[i][j] !=0){
				if(board[i-1][j]===0 || board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	
	return false;
}
function canMoveDown(board){
	for(var i=0; i<3; i+=1){
		for(var j=0; j<4; j+=1){
			if(board[i][j] !=0){
				if(board[i+1][j]===0 || board[i+1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1; i<col2; i++){
		if(board[row][i]!==0){
			return false;
		}
	}
	return true;
}
function noBlockVartical(col,row1,row2,board){
	for(var i=row1+1;i<row2;i+=1){
		if(board[i][col]!==0){
			return false;
		}
	}
	return true;
}

function noSpace(board){
	for(var i=0; i<4; i+=1){
		for(var j=0; j<4; j+=1){
			if(board[i][j]==0){
				return false;
			}
		}
	}
	
	return true;
}
function noMove(board){
	if(canMoveDown(board)|| canMoveLeft(board) || canMoveRight(board) ||canMoveUp(board)){
		return false;
	}
	return true;
}
