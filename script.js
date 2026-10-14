var board = null;
var game = new Chess();
var moveAudio = new Audio('https://images.chesscomfiles.com/chess-themes/sounds/wet/move-self.mp3');

const MESSAGES = {
    start: "أيو شتمر اللعبة راهي ابدات",
    check: "ارعَ",
    checkmate: "راهي انكعرت بيك يواجعة",
    restart: "العب مرة ثانية"
};

function playMoveSound() {
    moveAudio.currentTime = 0;
    moveAudio.play().catch(function(e) {});
}

function onDragStart (source, piece, position, orientation) {
    if (game.game_over()) return false;
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false;
    }
}

function onDrop (source, target) {
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q'
    });

    if (move === null) return 'snapback';

    playMoveSound();
    updateStatus();
}

function onSnapEnd () {
    board.position(game.fen());
}

function updateStatus() {
    var statusEl = document.getElementById('status');
    var turnInfoEl = document.getElementById('turnInfo');
    var moveColor = (game.turn() === 'w') ? 'الأبيض' : 'الأسود';

    if (game.in_checkmate()) {
        statusEl.innerText = MESSAGES.checkmate;
    } else if (game.in_check()) {
        statusEl.innerText = MESSAGES.check + " (" + moveColor + ")";
    } else {
        statusEl.innerText = MESSAGES.start;
    }
    turnInfoEl.innerText = "دور: " + moveColor;
}

var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
};

function resetGame() {
    game.reset();
    board.start();
    updateStatus();
}

window.onload = function() {
    board = Chessboard('board', config);
    updateStatus();
};
