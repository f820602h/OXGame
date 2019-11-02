let step = 0
let gamePlay = []
let isCross = false

let gameTemplate = $('main').html()
let oWinTemplate = $('.oWinTemplate').html()
let xWinTemplate = $('.xWinTemplate').html()
let drawTemplate = $('.drawTemplate').html()

let oScore = localStorage.getItem('oScore') * 1
let xScore = localStorage.getItem('xScore') * 1

let switchTurn = function() {
	isCross = !isCross
	$('body').toggleClass('xTurn')
}

// let whoWin = function() {
// 	let winner = null
// 	for (let i = 0; i < 3; i++) {
// 		if (gamePlay[3 * i] == gamePlay[3 * i + 1] && gamePlay[3 * i] == gamePlay[3 * i + 2]) {
// 			winner = gamePlay[3 * i] != undefined ? gamePlay[3 * i] : winner
// 		} else if (gamePlay[i] == gamePlay[i + 3] && gamePlay[i] == gamePlay[i + 6]) {
// 			winner = gamePlay[i] != undefined ? gamePlay[i] : winner
// 		}
// 	}
// 	if (gamePlay[0] == gamePlay[4] && gamePlay[0] == gamePlay[8]) {
// 		winner = gamePlay[0] != undefined ? gamePlay[0] : winner
// 	} else if (gamePlay[2] == gamePlay[4] && gamePlay[2] == gamePlay[6]) {
// 		winner = gamePlay[2] != undefined ? gamePlay[2] : winner
// 	}
// 	return winner
// }

let whoWin = function() {
	let winner = null
	let lrCross = Math.abs( gamePlay[0] + gamePlay[4] + gamePlay[8] )
	let rlCross = Math.abs( gamePlay[2] + gamePlay[4] + gamePlay[6] )
	for (let i = 0; i < 3; i++) {
		let row = Math.abs( gamePlay[3*i] + gamePlay[3*i+1] + gamePlay[3*i+2] )
		let col = Math.abs( gamePlay[i] + gamePlay[i+3] + gamePlay[i+6] )
		if( row == 3 ) winner = gamePlay[3*i]
		if( col == 3 ) winner = gamePlay[i]
	}
	if( lrCross == 3 ) winner = gamePlay[0]
	if( rlCross == 3 ) winner = gamePlay[2]
	return winner
}


let gameOver = function() {
	step++
	if (whoWin() == null && step == 9) {
		$('main').html(drawTemplate)
	} else if (whoWin() == null) {
		switchTurn()
	} else if (whoWin() == 1) {
		oScore = oScore + 1
		$('main').html(oWinTemplate)
	} else if (whoWin() == -1) {
		xScore = xScore + 1
		$('main').html(xWinTemplate)
	}
	localStorage.setItem('oScore', oScore)
	localStorage.setItem('xScore', xScore)
	showScore()
}

let showScore = function() {
	$('.oScore h3').text(oScore)
	$('.xScore h3').text(xScore)
}

let init = function() {
	step = 0
	gamePlay.length = 0
	isCross = false
	$('body').removeClass('xTurn')
	$('main').html(gameTemplate)
	$('.restartBtn').addClass('disable')
	showScore()
}
init()

$('main').on('click', '.box', function() {
	let index = $(this).data('num')
	let which = 'circle'
	let whichNum = 1
	if (isCross) {
		which = 'cross'
		whichNum = -1
	}
	if (gamePlay[index] != undefined) return
	else {
		$(this).find('div').addClass(which)
		gamePlay[index] = whichNum
		gameOver()
	}
	$('.restartBtn').removeClass('disable')
})

$('.startBtn').on('click', function() {
	init()
	$('body').animate({ top: '-100vh' }, 500)
})
$('.restartBtn').on('click', function() {
	init()
})
