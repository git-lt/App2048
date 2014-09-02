/**
 * Created by liutao on 14-8-29.
 * version 0.0.1
 * GitHub: https://github.com/git-lt/App2048
 */


//显示数字的动画处理
function showNumberWithAnimation(i,j,randNum){
	var $numberCell=$('#number-cell-'+i+'-'+j);
	
	$numberCell.css('background-color',getNumberBackgroundColor(randNum));
	$numberCell.css('color',getNumberColor(randNum));
	$numberCell.css('font-size',getFontSize(randNum));
	$numberCell.text(settings.isNumber?board[i][j]:getTextByNum(board[i][j]));

	$numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
	var $numCell=$('#number-cell-'+fromx+'-'+fromy);
	$numCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}

function updateScore(score){
	$('#score').text(score);
}


