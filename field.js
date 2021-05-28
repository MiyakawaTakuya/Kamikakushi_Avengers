//会話イベント
// document.addEventListener("DOMContentLoaded", function () {
//     var message = new MessageViewer({
//         "data": [{
//             "name": "生方 すみれ",
//             "message": "はじめまして！",
//         },
//         {
//             "message": "こんにちは！"
//         }]
//     });
// });


//canvasの設定
var canvas = document.getElementById('canvas');
canvas.width = 640;		//canvasの横幅（よこはば）
canvas.height = 1280;	//canvasの縦幅（たてはば）

//コンテキストを取得
var ctx = canvas.getContext('2d');

//主人公オブジェクトを作成
var rico = new Object();
rico.img = new Image();
rico.img.src = 'img test/chara.png';
rico.x = 32 * 8;   //主人公の初期位置 画像左上の座標をどこに持ってくるか
rico.y = 32 * 27;   //初期ボジション27で想定している
rico.move = 0;

//キーボードのオブジェクトを作成
var key = new Object();
key.up = false;
key.down = false;
key.right = false;
key.left = false;
key.push = '';

//MAP作成
//フロア 点景
var mapchip_flo = new Image();
mapchip_flo.src = 'img test/floor.png';  //床  横3*縦3
var mapchipWall = new Image();
mapchipWall.src = 'img test/wall.png';  //壁  横1*縦1
var mapchipPla = new Image();
mapchipPla.src = 'img test/plant.png';   //植物  横1*縦2
var mapchipNull = new Image();
mapchipNull.src = 'img test/transparent.png';  //透明ピース 横1*縦1
var mapchipDeskY = new Image();
mapchipDeskY.src = 'img test/deskyoko.png';    //デスク 横 横3*縦2
var mapchipDeskT = new Image();
mapchipDeskT.src = 'img test/desktate.png';    //デスク 縦 横3*縦1 一部はデスク横を使用すること
var mapchipCurtain = new Image();
mapchipCurtain.src = 'img test/curtain.png';    //オレンジカーテン 横3*縦1
var mapchipCurtainT = new Image();
mapchipCurtainT.src = 'img test/curtaintate.png';    //オレンジカーテン縦 横1*縦1
var mapchipDoor = new Image();
mapchipDoor.src = 'img test/door.png';    //ドア 横1*縦2
var mapchipDeskmono = new Image();
mapchipDeskmono.src = 'img test/deskmono.png';    //デスクもの横3*縦1
var mapchipShelf = new Image();
mapchipShelf.src = 'img test/shelf.png';    //棚ゴミ箱 横3*縦3
var mapchipDeskmono = new Image();
mapchipDeskmono.src = 'img test/deskmono.png';    // 横3*縦2



//サブキャラ配置
var mapchipA = new Image();
mapchipA.src = 'img test/A.png'; //謎の案内人
var mapchipB = new Image();
mapchipB.src = 'img test/B.png'; //津曲さん
var mapchipC = new Image();
mapchipC.src = 'img test/C.png'; //女性
var mapchipD = new Image();
mapchipD.src = 'img test/D.png'; //左向き女(さちおかさん)
var mapchipE = new Image();
mapchipE.src = 'img test/E.png'; //右向き男
var mapchipF = new Image();
mapchipF.src = 'img test/F.png'; //緑服の男
var mapchipG = new Image();
mapchipG.src = 'img test/G.png'; //ゴッティさん
var mapchipH = new Image();
mapchipH.src = 'img test/H.png'; //上薗さん
var mapchipT = new Image();
mapchipT.src = 'img test/T.png'; //小杉太郎さん
var mapchipDog = new Image();
mapchipDog.src = 'img test/dog.png'; //犬
var mapchipI = new Image();
mapchipI.src = 'img test/I.png'; //ウエハース？
var mapchipW = new Image();
mapchipW.src = 'img test/W.png'; //ワトソン


//スクロールに１５分くらいチャレンジしたけどわからん！！！
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



var map = [
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],  //壁見えがかり
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],  //壁見えがかり ホワイトボード
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 24, 2, 1],  //壁見えがかり ホワイトボード
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 25, 2, 1],  //壁見えがかり 扉 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 1],  //50謎の人
    [1, 0, 0, 0, 0, 0, 55, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //55G
    [1, 0, 0, 57, 0, 0, 36, 7, 8, 0, 0, 6, 7, 8, 0, 1],   //57小杉太郎先生
    [1, 0, 0, 0, 0, 0, 9, 10, 11, 0, 0, 9, 10, 11, 0, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 51, 0, 1],  //60ワトソン  51津曲さん
    [1, 0, 0, 0, 0, 0, 6, 7, 8, 0, 0, 6, 7, 37, 0, 1],
    [1, 0, 0, 0, 0, 0, 9, 10, 11, 0, 0, 9, 10, 38, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 56, 58, 0, 0, 0, 0, 0, 52, 0, 1],  //56上園さん 58犬   52C
    [1, 0, 0, 0, 0, 0, 36, 7, 8, 0, 0, 6, 7, 8, 0, 1],
    [1, 0, 0, 0, 0, 0, 9, 10, 11, 0, 0, 9, 10, 11, 0, 1],
    [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1],
    [1, 20, 20, 20, 20, 20, 20, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 30, 0, 0, 36, 8, 59, 0, 0, 0, 0, 1, 1, 1, 1, 1],  //59ウエハース
    [1, 30, 0, 0, 12, 13, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 30, 0, 0, 9, 11, 53, 0, 0, 0, 0, 1, 1, 1, 1, 1],  //53さちおかさん
    [1, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 20, 20, 20, 20, 20, 20, 0, 0, 0, 0, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 0, 54, 23, 0, 0, 0, 0, 1, 5, 5, 5, 5],  //54F
    [1, 0, 0, 6, 7, 8, 23, 0, 0, 0, 0, 1, 5, 5, 5, 5],
    [1, 0, 0, 9, 10, 11, 23, 0, 0, 0, 0, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 0, 0, 23, 0, 0, 0, 35, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 0, 0, 23, 0, 0, 0, 3, 1, 5, 5, 5, 5],
    [1, 20, 20, 20, 20, 20, 20, 0, 0, 0, 4, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 6, 8, 0, 0, 0, 0, 33, 1, 5, 5, 5, 5],
    [1, 29, 0, 0, 12, 13, 0, 0, 0, 0, 33, 1, 5, 5, 5, 5],
    [1, 30, 0, 0, 9, 11, 0, 0, 0, 0, 33, 1, 5, 5, 5, 5],
    [1, 30, 0, 0, 6, 8, 0, 0, 0, 0, 33, 1, 5, 5, 5, 5],
    [1, 30, 0, 0, 12, 13, 0, 0, 0, 0, 34, 1, 5, 5, 5, 5],
    [1, 30, 0, 0, 9, 11, 0, 0, 0, 0, 32, 1, 5, 5, 5, 5],
    [1, 31, 0, 0, 0, 0, 0, 0, 0, 0, 33, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 5, 5, 5],

];


//メインループ
function main() {
    // 塗りつぶす色を指定
    ctx.fillStyle = "rgba( 0, 0, 0 ,0)";
    // 塗りつぶす
    ctx.fillRect(0, 0, 640, 960);
    //マップチップを表示する
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            if (map[y][x] === 0) ctx.drawImage(mapchip_flo, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //床 コンクリ
            if (map[y][x] === 1) ctx.drawImage(mapchip_flo, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //壁断面
            if (map[y][x] === 2) ctx.drawImage(mapchipWall, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //壁見えがかり
            if (map[y][x] === 3) ctx.drawImage(mapchipPla, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //植栽上半分
            if (map[y][x] === 4) ctx.drawImage(mapchipPla, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //植栽下半分
            if (map[y][x] === 5) ctx.drawImage(mapchipNull, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //空白(透明ピース)
            if (map[y][x] === 6) ctx.drawImage(mapchipDeskY, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //デスク横 左上
            if (map[y][x] === 7) ctx.drawImage(mapchipDeskY, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //デスク横 上中
            if (map[y][x] === 8) ctx.drawImage(mapchipDeskY, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //デスク横 右上
            if (map[y][x] === 9) ctx.drawImage(mapchipDeskY, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //デスク横 左下
            if (map[y][x] === 10) ctx.drawImage(mapchipDeskY, 32, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //デスク横 下中
            if (map[y][x] === 11) ctx.drawImage(mapchipDeskY, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //デスク横 右下
            if (map[y][x] === 12) ctx.drawImage(mapchipDeskT, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //デスク縦 左中
            if (map[y][x] === 13) ctx.drawImage(mapchipDeskT, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //デスク縦 右中
            if (map[y][x] === 14) ctx.drawImage(mapchip, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 15) ctx.drawImage(mapchip, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 16) ctx.drawImage(mapchip, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 17) ctx.drawImage(mapchip, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //
            if (map[y][x] === 20) ctx.drawImage(mapchipCurtain, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン 左
            if (map[y][x] === 21) ctx.drawImage(mapchipCurtain, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン 真ん中
            if (map[y][x] === 22) ctx.drawImage(mapchipCurtain, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン 右
            if (map[y][x] === 23) ctx.drawImage(mapchipCurtainT, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //カーテン 縦
            if (map[y][x] === 24) ctx.drawImage(mapchipDoor, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //ドア 上
            if (map[y][x] === 25) ctx.drawImage(mapchipDoor, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //ドア 下
            if (map[y][x] === 26) ctx.drawImage(mapchipDeskmono, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //デスク横 左上にもの
            if (map[y][x] === 27) ctx.drawImage(mapchipDeskmono, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //デスク横 右上にPC
            if (map[y][x] === 28) ctx.drawImage(mapchipDeskmono, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //デスク横 右下にPC
            if (map[y][x] === 29) ctx.drawImage(mapchipShelf, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //棚上端 左寄せ
            if (map[y][x] === 30) ctx.drawImage(mapchipShelf, 0, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //棚中 左寄せ
            if (map[y][x] === 31) ctx.drawImage(mapchipShelf, 0, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //棚下端 左寄せ
            if (map[y][x] === 32) ctx.drawImage(mapchipShelf, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //棚上端 右よせ
            if (map[y][x] === 33) ctx.drawImage(mapchipShelf, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //棚中 右よせ
            if (map[y][x] === 34) ctx.drawImage(mapchipShelf, 64, 64, 32, 32, 32 * x, 32 * y, 32, 32);  //棚下端 右よせ
            if (map[y][x] === 35) ctx.drawImage(mapchipShelf, 32, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //ゴミ箱
            if (map[y][x] === 36) ctx.drawImage(mapchipDeskmono, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //デスクもの左上
            if (map[y][x] === 37) ctx.drawImage(mapchipDeskmono, 64, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //デスクもの右上
            if (map[y][x] === 38) ctx.drawImage(mapchipDeskmono, 64, 32, 32, 32, 32 * x, 32 * y, 32, 32);  //デスクもの右上
            if (map[y][x] === 50) ctx.drawImage(mapchipA, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //サブキャラ 扉 謎の人
            if (map[y][x] === 51) ctx.drawImage(mapchipB, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //サブキャラ 津曲
            if (map[y][x] === 52) ctx.drawImage(mapchipC, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //サブキャラ 
            if (map[y][x] === 53) ctx.drawImage(mapchipD, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //サブキャラ 
            if (map[y][x] === 54) ctx.drawImage(mapchipF, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //サブキャラ 
            if (map[y][x] === 55) ctx.drawImage(mapchipG, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //サブキャラ 
            if (map[y][x] === 56) ctx.drawImage(mapchipH, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //サブキャラ 
            if (map[y][x] === 57) ctx.drawImage(mapchipT, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //サブキャラ 
            if (map[y][x] === 58) ctx.drawImage(mapchipDog, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //サブキャラ 
            if (map[y][x] === 59) ctx.drawImage(mapchipI, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //サブキャラ 
            if (map[y][x] === 60) ctx.drawImage(mapchipW, 0, 0, 32, 32, 32 * x, 32 * y, 32, 32);  //サブキャラ ワトソン 
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
    let user_name = location.search.substring(1);

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
            y--;                  //主人公の上へ座標の変数だけ切り替える
            if (map[y][x] === 25) {   //主人公の上に扉があったら
                // console.log("古畑任三郎でした");
                window.location.href = 'field2.html?' + user_name;
            };
        }
        if (key_code === 13) {
            var x = rico.x / 32;  //今主人公がいる座標位置
            var y = rico.y / 32;
            y--;                  //主人公の上へ座標の変数だけ切り替える
            if (map[y][x] === 57) {  //主人公の上にタロさんがいたら
                // rico.move = 32;
                alert(今週の天気を教えるよ);
            
            } else { y++; };
        };
    }



    //////////////////////////////////////////
    //移動用・衝突判定のコード
    //方向キーが押されている場合は、主人公が移動する 
    if (rico.move === 0) {
        if (key.left === true) {
            var x = rico.x / 32;  //今主人公がいる座標位置
            var y = rico.y / 32;
            x--;                  //主人公が移動しようとしている先の座標に変数だけ切り替える
            if (map[y][x] === 0) {   //移動しようとしている箇所が"0"(床)だったら, 移動処理を行う 複数やる場合は&使えば良い？
                rico.move = 32;
                key.push = 'left';
            }
        }
        if (key.up === true) {
            var x = rico.x / 32;
            var y = rico.y / 32;
            if (y > 0) {
                y--;
                if (map[y][x] === 0) {
                    rico.move = 32;
                    key.push = 'up';
                }
            }
        }
        if (key.right === true) {
            var x = rico.x / 32;
            var y = rico.y / 32;
            x++;
            if (map[y][x] === 0) {
                rico.move = 32;
                key.push = 'right';
            }
        }
        if (key.down === true) {
            var x = rico.x / 32;
            var y = rico.y / 32;
            if (y < 59) {          //下方向の移動上限
                y++;
                if (map[y][x] === 0) {
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

//////////////////////////////////////////
//バックグラウンドの装飾系 2Dマップ制作には関係ない
//背景の幾何学JS
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 50,//この数値を変更すると幾何学模様の数が増減できる
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#FFFFFF", //G'sカラー
        },
        "shape": {
            "type": "polygon",//形状はpolygonを指定
            "stroke": {
                "width": 0,
            },
            "polygon": {
                "nb_sides": 3//多角形の角の数
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
                "speed": 30,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#FFFFFF", //G'sカラー
            "opacity": 0.6,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 5,//この数値を小さくするとゆっくりな動きになる
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