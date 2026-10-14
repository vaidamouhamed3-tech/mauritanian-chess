// تهيئة لعبة الشطرنج باستخدام مكتبة chess.js
var board = null;
var game = new Chess();

// العبارات الحسانية
const MESSAGES = {
    start: "أيو شتمر اللعبة راهي ابدات",
    check: "ارعَ",
    checkmate: "راهي انكعرت بيك يواجعة",
    restart: "العب مرة ثانية"
};

function updateStatus() {
    var statusEl = document.getElementById('status');
    var turnInfoEl = document.getElementById('turnInfo');
    
    var moveColor = (game.turn() === 'w') ? 'الأبيض' : 'الأسود';

    // التحقق من كش مات (الفوز)
    if (game.in_checkmate()) {
        statusEl.innerText = MESSAGES.checkmate;
    } 
    // التحقق من حالة الكش (ارعَ)
    else if (game.in_check()) {
        statusEl.innerText = MESSAGES.check + " (" + moveColor + ")";
    } 
    // اللعب العادي
    else {
        statusEl.innerText = MESSAGES.start;
    }

    turnInfoEl.innerText = "دور: " + moveColor;
}

function resetGame() {
    game.reset();
    updateStatus();
    alert(MESSAGES.start);
}

// تشغيل الحالة الأولية عند تحميل الصفحة
window.onload = function() {
    updateStatus();
};
