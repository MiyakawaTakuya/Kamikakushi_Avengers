//カジノ空間
//canvasの設定
var canvas = document.getElementById('canvas');
canvas.width = 640;		//canvasの横幅（よこはば）
canvas.height = 640;	//canvasの縦幅（たてはば）

//コンテキストを取得
var ctx = canvas.getContext('2d');


// 角田がいじった場所------------------------------------------------------------------------------
//URL末尾を取り出し、どこから遷移してきたのかを判別し初期値を決める
let url_parts_1 = location.search.substring(1);
let user_beforePage = [];
if (url_parts_1) {
    // 「&」が含まれている場合は「&」で分割
    let param = url_parts_1.split('&');
    user_beforePage = param[1];
}

//主人公オブジェクトを作成
if (user_beforePage == 1) {
    var rico = new Object();
    rico.img = new Image();
    rico.img.src = 'img test/chara.png';
    rico.x = 32 * 15;   //主人公の初期位置 画像左上の座標をどこに持ってくるか
    rico.y = 32 * 11;
    rico.move = 0;
} else if (user_beforePage == 2) {
    var rico = new Object();
    rico.img = new Image();
    rico.img.src = 'img test/chara.png';
    rico.x = 32 * 12;   //主人公の初期位置 画像左上の座標をどこに持ってくるか
    rico.y = 32 * 13;
    rico.move = 0;
} else if (user_beforePage == 3) {     //--------------------指定先なし（ご自由にお使いください）
    var rico = new Object();
    rico.img = new Image();
    rico.img.src = 'img test/chara.png';
    rico.x = 32 * 17;   //主人公の初期位置 画像左上の座標をどこに持ってくるか
    rico.y = 32 * 19;
    rico.move = 0;
} else {
    var rico = new Object();
    rico.img = new Image();
    rico.img.src = 'img test/chara.png';
    rico.x = 32 * 17;   //主人公の初期位置 画像左上の座標をどこに持ってくるか
    rico.y = 32 * 19;
    rico.move = 0;
}
//----------------------------------------------------------------------------------------------






//キーボードのオブジェクトを作成
var key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';

//MAP作成
//フロア 点景
var mapchipJut = new Image();
mapchipJut.src = 'imgCasino/jutan.png';  //絨毯  横3*縦3
var mapchip_flo = new Image();
mapchip_flo.src = 'img test/floor.png';  //壁断面  横3*縦3
var mapchipWall = new Image();
mapchipWall.src = 'imgCasino/wall.png';  //茶色い壁  横3*縦3
var mapchipCurtain = new Image();
mapchipCurtain.src = 'imgCasino/curtain.png';   //カーテン  横3*縦3
var mapchipRuretto = new Image();
mapchipRuretto.src = 'imgCasino/ruretto.png';   //ルーレット  横4*縦2
var mapchipBlackjack = new Image();
mapchipBlackjack.src = 'imgCasino/blackjack.png';   //ブラックジャック  横4*縦3
var mapchipPiano = new Image();
mapchipPiano.src = 'imgCasino/piano.png';   //ブラックジャック  横5*縦5
var mapchipflowerL = new Image();
mapchipflowerL.src = 'imgCasino/flowerL.png';   //flowerL.png
var mapchipflowerR = new Image();
mapchipflowerR.src = 'imgCasino/flowerR.png';   //flowerR.png
var mapchipKanban = new Image();
mapchipKanban.src = 'imgCasino/kanban.png';   //看板
var mapchipSlot = new Image();
mapchipSlot.src = 'imgCasino/slot.png';   //スロット
var mapchiptable = new Image();
mapchiptable.src = 'imgCasino/table.png';   //テーブル
var mapchipSofa = new Image();
mapchipSofa.src = 'imgCasino/sofa.png';   //ソファ
var mapchipSakeshelf = new Image();
mapchipSakeshelf.src = 'imgCasino/sakeshelf.png';   //酒の棚




//サブキャラ配置
var mapchipA = new Image();
mapchipA.src = 'imgCasino/dira1.png';
var mapchipB = new Image();
mapchipB.src = 'imgCasino/dira3.png';
var mapchipE = new Image();
mapchipE.src = 'imgCasino/dira2.png';

//画面を真ん中で固定して移動する
// const fixPosX = Screen.Width * 0.5/32;
// console.log(fixPosX);
// if (rico[y][x] + map[y][x] > fixPosX) {
//     map[y][x]  -= rico[y][x] + map[y][x]  - fixPosX;
// }

// //画面を真ん中で固定して移動する
// const fixPosX = Config.Screen.Width * 0.5;
// if (rico.x + map.x > fixPosX) {
//     map.x -= rico.x + map.x - fixPosX;
// }


let map = [
    [20, 30, 31, 32, 21, 22, 23, 21, 22, 23, 21, 22, 23, 21, 100, 101, 102, 21, 22, 20],
    [20, 33, 34, 35, 24, 25, 26, 24, 25, 26, 24, 25, 26, 24, 103, 104, 105, 24, 25, 20],
    [20, 36, 37, 38, 27, 28, 29, 27, 28, 29, 27, 28, 29, 27, 28, 29, 29, 27, 28, 20],
    [20, 5, 2, 2, 70, 71, 72, 73, 74, 2, 210, 211, 212, 213, 210, 211, 212, 213, 6, 20],
    [20, 106, 0, 0, 76, 77, 78, 79, 80, 0, 214, 215, 216, 217, 214, 215, 216, 217, 107, 20],
    [20, 106, 0, 0, 82, 83, 84, 85, 86, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 20],
    [20, 106, 0, 0, 88, 89, 90, 91, 92, 0, 218, 0, 0, 218, 0, 0, 218, 0, 107, 20],
    [20, 106, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 20],
    [20, 106, 0, 0, 202, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 0, 0, 107, 20],
    [20, 106, 0, 50, 51, 52, 0, 0, 0, 0, 0, 0, 0, 0, 50, 51, 52, 0, 107, 20],
    [20, 106, 0, 54, 55, 56, 0, 0, 219, 220, 221, 0, 0, 0, 54, 55, 56, 0, 107, 20],
    [20, 106, 0, 0, 0, 0, 0, 0, 222, 223, 224, 0, 0, 0, 0, 0, 0, 0, 107, 20],
    [20, 106, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 20],
    [20, 106, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 20],
    [20, 106, 0, 0, 0, 0, 0, 0, 0, 201, 40, 41, 42, 43, 0, 0, 0, 0, 107, 20],
    [20, 106, 225, 226, 225, 226, 225, 226, 0, 0, 44, 45, 46, 47, 0, 0, 0, 0, 107, 20],
    [20, 106, 227, 228, 227, 228, 227, 228, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 20],
    [20, 106, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 107, 20],
    [20, 8, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 20],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 98, 20, 20],
];


//メインループ
function main() {
    // 塗りつぶす色を指定
    ctx.fillStyle = "rgba( 0, 0, 0 ,0)";
    // 塗りつぶす
    ctx.fillRect(0, 0, 640, 1920);
    //マップチップを表示する
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            if (map[y][x] === 0) ctx.drawImage(mapchipJut, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //絨毯 真中
            if (map[y][x] === 1) ctx.drawImage(mapchipJut, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //絨毯 左端
            if (map[y][x] === 2) ctx.drawImage(mapchipJut, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //絨毯 上端
            if (map[y][x] === 3) ctx.drawImage(mapchipJut, 32, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //絨毯 下端
            if (map[y][x] === 4) ctx.drawImage(mapchipJut, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //絨毯 右端
            if (map[y][x] === 5) ctx.drawImage(mapchipJut, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //絨毯 左上
            if (map[y][x] === 6) ctx.drawImage(mapchipJut, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //絨毯 右上
            if (map[y][x] === 7) ctx.drawImage(mapchipJut, 64, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //絨毯 右下
            if (map[y][x] === 8) ctx.drawImage(mapchipJut, 0, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //絨毯 左下
            if (map[y][x] === 20) ctx.drawImage(mapchip_flo, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //壁断面
            if (map[y][x] === 21) ctx.drawImage(mapchipCurtain, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン 3*3
            if (map[y][x] === 22) ctx.drawImage(mapchipCurtain, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン
            if (map[y][x] === 23) ctx.drawImage(mapchipCurtain, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン
            if (map[y][x] === 24) ctx.drawImage(mapchipCurtain, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン
            if (map[y][x] === 25) ctx.drawImage(mapchipCurtain, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン
            if (map[y][x] === 26) ctx.drawImage(mapchipCurtain, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン
            if (map[y][x] === 27) ctx.drawImage(mapchipCurtain, 0, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン
            if (map[y][x] === 28) ctx.drawImage(mapchipCurtain, 32, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン
            if (map[y][x] === 29) ctx.drawImage(mapchipCurtain, 64, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン
            if (map[y][x] === 30) ctx.drawImage(mapchipWall, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //茶色壁 3*3
            if (map[y][x] === 31) ctx.drawImage(mapchipWall, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //茶色壁
            if (map[y][x] === 32) ctx.drawImage(mapchipWall, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //茶色壁
            if (map[y][x] === 33) ctx.drawImage(mapchipWall, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //茶色壁
            if (map[y][x] === 34) ctx.drawImage(mapchipWall, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //茶色壁
            if (map[y][x] === 35) ctx.drawImage(mapchipWall, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //茶色壁
            if (map[y][x] === 36) ctx.drawImage(mapchipWall, 0, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //茶色壁
            if (map[y][x] === 37) ctx.drawImage(mapchipWall, 32, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //茶色壁
            if (map[y][x] === 38) ctx.drawImage(mapchipWall, 64, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //茶色壁
            if (map[y][x] === 40) ctx.drawImage(mapchipRuretto, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //ルーレット
            if (map[y][x] === 41) ctx.drawImage(mapchipRuretto, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //ルーレット
            if (map[y][x] === 42) ctx.drawImage(mapchipRuretto, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //ルーレット
            if (map[y][x] === 43) ctx.drawImage(mapchipRuretto, 96, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //ルーレット
            if (map[y][x] === 44) ctx.drawImage(mapchipRuretto, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //ルーレット
            if (map[y][x] === 45) ctx.drawImage(mapchipRuretto, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //ルーレット
            if (map[y][x] === 46) ctx.drawImage(mapchipRuretto, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //ルーレット
            if (map[y][x] === 47) ctx.drawImage(mapchipRuretto, 96, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //ルーレット
            if (map[y][x] === 50) ctx.drawImage(mapchipBlackjack, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //ブラックジャック
            if (map[y][x] === 51) ctx.drawImage(mapchipBlackjack, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 52) ctx.drawImage(mapchipBlackjack, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 53) ctx.drawImage(mapchipBlackjack, 96, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 54) ctx.drawImage(mapchipBlackjack, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 55) ctx.drawImage(mapchipBlackjack, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 56) ctx.drawImage(mapchipBlackjack, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 57) ctx.drawImage(mapchipBlackjack, 96, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 58) ctx.drawImage(mapchipBlackjack, 0, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 59) ctx.drawImage(mapchipBlackjack, 32, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 60) ctx.drawImage(mapchipBlackjack, 64, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 61) ctx.drawImage(mapchipBlackjack, 96, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 70) ctx.drawImage(mapchipPiano, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //ピアノ
            if (map[y][x] === 71) ctx.drawImage(mapchipPiano, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 72) ctx.drawImage(mapchipPiano, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 73) ctx.drawImage(mapchipPiano, 96, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 74) ctx.drawImage(mapchipPiano, 128, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 75) ctx.drawImage(mapchipPiano, 160, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 76) ctx.drawImage(mapchipPiano, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 77) ctx.drawImage(mapchipPiano, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 78) ctx.drawImage(mapchipPiano, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 79) ctx.drawImage(mapchipPiano, 96, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 80) ctx.drawImage(mapchipPiano, 128, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 81) ctx.drawImage(mapchipPiano, 160, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 82) ctx.drawImage(mapchipPiano, 0, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 83) ctx.drawImage(mapchipPiano, 32, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 84) ctx.drawImage(mapchipPiano, 64, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 85) ctx.drawImage(mapchipPiano, 96, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 86) ctx.drawImage(mapchipPiano, 128, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 87) ctx.drawImage(mapchipPiano, 160, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 88) ctx.drawImage(mapchipPiano, 0, 96, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 89) ctx.drawImage(mapchipPiano, 32, 96, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 90) ctx.drawImage(mapchipPiano, 64, 96, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 91) ctx.drawImage(mapchipPiano, 96, 96, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 92) ctx.drawImage(mapchipPiano, 128, 96, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 93) ctx.drawImage(mapchipPiano, 160, 96, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 98) ctx.drawImage(mapchipJut, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  // 入り口部分の絨毯
            if (map[y][x] === 99) ctx.drawImage(mapchip_flo, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //壁断面
            if (map[y][x] === 100) ctx.drawImage(mapchipKanban, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //看板
            if (map[y][x] === 101) ctx.drawImage(mapchipKanban, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 102) ctx.drawImage(mapchipKanban, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 103) ctx.drawImage(mapchipKanban, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 104) ctx.drawImage(mapchipKanban, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 105) ctx.drawImage(mapchipKanban, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 106) ctx.drawImage(mapchipflowerL, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //花 左
            if (map[y][x] === 107) ctx.drawImage(mapchipflowerR, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //花 右
            // if (map[y][x] === 108) ctx.drawImage(mapchipflowerR, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //から
            if (map[y][x] === 200) ctx.drawImage(mapchipA, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //A ディーラー
            if (map[y][x] === 201) ctx.drawImage(mapchipE, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //E ディーラー
            if (map[y][x] === 202) ctx.drawImage(mapchipB, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //B ディーラー
            if (map[y][x] === 210) ctx.drawImage(mapchipSlot, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //スロット 2*5
            if (map[y][x] === 211) ctx.drawImage(mapchipSlot, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 212) ctx.drawImage(mapchipSlot, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 213) ctx.drawImage(mapchipSlot, 96, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 214) ctx.drawImage(mapchipSlot, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 215) ctx.drawImage(mapchipSlot, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 216) ctx.drawImage(mapchipSlot, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 217) ctx.drawImage(mapchipSlot, 96, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 218) ctx.drawImage(mapchiptable, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //みにテーブル
            if (map[y][x] === 219) ctx.drawImage(mapchipSofa, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //ソファ
            if (map[y][x] === 220) ctx.drawImage(mapchipSofa, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 221) ctx.drawImage(mapchipSofa, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 222) ctx.drawImage(mapchipSofa, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 223) ctx.drawImage(mapchipSofa, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 224) ctx.drawImage(mapchipSofa, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 225) ctx.drawImage(mapchipSakeshelf, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //酒の棚
            if (map[y][x] === 226) ctx.drawImage(mapchipSakeshelf, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 227) ctx.drawImage(mapchipSakeshelf, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 228) ctx.drawImage(mapchipSakeshelf, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //
        }
    }
    //drawImage構文の解説
    //drawImage( image, sx, sy, sw, sh, dx, dy, dw, dh )
    //sx, syで、画像を読み込む部分の、左上の位置、
    //sw, shで、画像を読み込む部分の、幅と高さ、
    //dx, dyで、画像を表示する、左上の位置、
    //dw, dhで、画像を表示するときの大きさ

    //画像を表示
    ctx.drawImage(rico.img, rico.x, rico.y);

    addEventListener("keydown", keydownfunc, false);
    addEventListener("keyup", keyupfunc, false);

    let url_parts_0 = location.search.substring(1);
    let user_name = [];
    if (url_parts_0) {
        // 「&」が含まれている場合は「&」で分割
        let param = url_parts_0.split('&');
        user_name = param[0];
    }




    // 角田がいじった場所------------------------------------------------------------------------------
    //////////////////////////////////////////
    //会話イベント
    //何かキーが押された時に発火
    document.addEventListener("keydown", keyDownFunc);
    //扉の前イベント //主人公に上側にあるオブジェクトに対して何かアクションを起こしたい時にこのIF文を使う
    function keyDownFunc(event) {
        const key_code = event.keyCode;
        if (key_code === 13) {
            var x = rico.x / 32;  //今主人公がいる座標位置
            var y = rico.y / 32;
            y--;                  //主人公の上へ座標だけ切り替える
            if (map[y][x] === 55) {   //主人公の上にブラックジャックステージがあったら
                window.location.href = 'index.html?' + user_name + '&1';
                rico.move = 32;
                key.push = 'left';
            };
        }
        //----------------------------------------------------------------------------------------------







        if (key_code === 13) {
            var x = rico.x / 32;  //今主人公がいる座標位置
            var y = rico.y / 32;
            y++;                  //主人公の下へ座標だけ切り替える
            if (map[y][x] === 42) {   //主人公の下にルーレットがあったら
                window.location.href = 'roulette.html?' + user_name + '&2';
            } else { y--; };
        }
        if (key_code === 13) {
            var x = rico.x / 32;  //今主人公がいる座標位置
            var y = rico.y / 32;
            y++;                  //主人公の下へ座標だけ切り替える
            if (map[y][x] === 98) {   //主人公の下に入り口部分のパーツがあった場合
                map[19][17] = 99;  //主人公が出ようとしたら壁で塞がる 神隠し
                audioB.play();   //岩の音
                const time_out = function () {
                    alert("なんと.....出口が岩で塞がれてしまった！！");
                    //!

                };
                setTimeout(time_out, 2000);
                audioC.play();
                window.location.href = 'GAMEOVER.html?' + signUp_data.name;
                // const time_out = function 
                // };
                // setTimeout(time_out, 4000);
            } else { y--; };
        }
    };

    



    //////////////////////////////////////////
    //移動用・衝突判定のコード

    //方向キーが押されている場合は、主人公が移動する 
    if (rico.move === 0) {
        if (key.left === true) {
            var x = rico.x / 32;  //x
            var y = rico.y / 32;
            x--;
            if (map[y][x] === 0 || map[y][x] === 1 || map[y][x] === 2 || map[y][x] === 3 || map[y][x] === 4 || map[y][x] === 5 || map[y][x] === 6 || map[y][x] === 7 || map[y][x] === 8) {
                rico.move = 32;
                key.push = 'left';
            }
        }
        if (key.up === true) {
            var x = rico.x / 32;
            var y = rico.y / 32;
            if (y > 0) {
                y--;
                if (map[y][x] === 0 || map[y][x] === 1 || map[y][x] === 2 || map[y][x] === 3 || map[y][x] === 4 || map[y][x] === 5 || map[y][x] === 6 || map[y][x] === 7 || map[y][x] === 8) {
                    rico.move = 32;
                    key.push = 'up';
                }
            }
        }
        if (key.right === true) {
            var x = rico.x / 32;
            var y = rico.y / 32;
            x++;
            if (map[y][x] === 0 || map[y][x] === 1 || map[y][x] === 2 || map[y][x] === 3 || map[y][x] === 4 || map[y][x] === 5 || map[y][x] === 6 || map[y][x] === 7 || map[y][x] === 8) {
                rico.move = 32;
                key.push = 'right';
            }
        }
        if (key.down === true) {
            var x = rico.x / 32;
            var y = rico.y / 32;
            if (y < 18) {          //下方向の移動上限
                y++;
                if (map[y][x] === 0 || map[y][x] === 1 || map[y][x] === 2 || map[y][x] === 3 || map[y][x] === 4 || map[y][x] === 5 || map[y][x] === 6 || map[y][x] === 7 || map[y][x] === 8) {
                    rico.move = 32;
                    key.push = 'down';
                }
            }
        }
    }

    //rico.moveが0より大きい場合は、4pxずつ移動（いどう）を続ける
    if (rico.move > 0) {
        rico.move -= 4;
        if (key.push === 'left') rico.x -= 4;
        if (key.push === 'up') rico.y -= 4;
        if (key.push === 'right') rico.x += 4;
        if (key.push === 'down') rico.y += 4;
    }
    requestAnimationFrame(main);
}
//ページと依存している全てのデータが読み込まれたら、メインループ開始
addEventListener('load', main(), false);

//キーボードが押されたときに呼び出される関数
function keydownfunc(event) {
    var key_code = event.keyCode;
    if (key_code === 37) key.left = true;
    if (key_code === 38) key.up = true;
    if (key_code === 39) key.right = true;
    if (key_code === 40) key.down = true;
    event.preventDefault();    //方向キーでブラウザがスクロールしないようにする
}

//キーボードが放されたときに呼び出される関数
function keyupfunc(event) {
    var key_code = event.keyCode;
    if (key_code === 37) key.left = false;
    if (key_code === 38) key.up = false;
    if (key_code === 39) key.right = false;
    if (key_code === 40) key.down = false;
}

//音関連
const audioA = document.querySelector('#A');
const audioB = document.querySelector('#B');
const audioC = document.querySelector('#C');

//画面のどこかをクリックするとバックミュージックが流れ始める
//ほんとはsetTimeoutで自然と音楽を流したいがChromeのブラウザ設定で流れないことがあるので応急処置
document.addEventListener('click', function () {
    audioA.play();
})
//音楽が初回のクリック時に再生されない時のための予備発火ポイント
//スペースキーを押すとバックミュージックが流れ始める
document.addEventListener("keydown", keyDownFunc);
function keyDownFunc(event) {
    let key_code = event.keyCode;
    if (key_code === 32) {
        audioA.play();
    };
}

audioA.addEventListener("ended", function () {
    audioA.currentTime = 0;
    audioA.play();
}, false);


//バックグラウンドの装飾系
//背景の幾何学JS
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,//この数値を変更すると幾何学模様の数が増減できる
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#f2f2f3"//色
        },
        "shape": {
            "type": "polygon",//形状はpolygonを指定
            "stroke": {
                "width": 0,
            },
            "polygon": {
                "nb_sides": 6//多角形の角の数
            },
            "image": {
                "width": 190,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.664994832269074,
            "random": false,
            "anim": {
                "enable": true,
                "speed": 2.2722661797524872,
                "opacity_min": 0.08115236356258881,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00B4EF",
            "opacity": 0.6,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,//この数値を小さくするとゆっくりな動きになる
            "direction": "none",//方向指定なし
            "random": false,//動きはランダムにしない
            "straight": false,//動きをとどめない
            "out_mode": "out",//画面の外に出るように描写
            "bounce": false,//跳ね返りなし
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 961.4383117143238
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false,
                "mode": "repulse"
            },
            "onclick": {
                "enable": false
            },
            "resize": true
        }
    },
    "retina_detect": true
});