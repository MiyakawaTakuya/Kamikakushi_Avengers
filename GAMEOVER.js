setTimeout(function () {
    typewriter({
        el: "#typewriter1", //要素
        string: "G A M E     O V E R",
        speed: 90 //速度
    });
}, 1000);

const typewriter = (param) => {
    let el = document.querySelector(param.el);
    let speed = param.speed;
    let string = param.string.split("");
    string.forEach((char, index) => {
        setTimeout(() => {
            el.textContent += char;
        }, speed * index);
    });
};

//効果音
//効果音の対象を定義
const audioA = document.querySelector('#A');
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

//バックグラウンドの装飾系 2Dマップ制作には関係ない
//背景の幾何学JS
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 140,//この数値を変更すると幾何学模様の数が増減できる
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#DC143C"//色
        },
        "shape": {
            "type": "polygon",//形状はpolygonを指定
            "stroke": {
                "width": 0,
            },
            "polygon": {
                "nb_sides": 4//多角形の角の数
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
            "color": "#DC143C",
            "opacity": 0.6,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 8,//この数値を小さくするとゆっくりな動きになる
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