'uss strict';

{



  // ログアウトボタン追加////おそらくfirebase行き(ゲーム内のボタン左上)
  // $('[id=rogout]').on('click', function () {
  // alert('ログアウトしまーす');
  // localStorage.setItem('hand_money', `${my_handmoney}`);

  // });
  $('#rogin').on('click', function () {
    // alert('ログインしまーす');
  });

  $('#gameStart').on('click', function () {
    $('#info').addClass('displaynone');
    $('#mask').addClass('displaynone');
    $(this).addClass('displaynone');
    $('.rogout_outside').addClass('displaynone');
    $('#rogin').addClass('displaynone');
    countUp();
  });

  //////////////////////// 選んだ数字のデータ(ユーザー毎に管理)///おそらくfirebase行き
  let selectNum = [];
  // to1オプ
  let optionNum1 = [];
  let optionNum2 = [];
  let optionNum3 = [];
  // ST12オプ
  let optionST12_left = [];
  let optionST12_center = [];
  let optionST12_right = [];
  //hulfNUmオプ
  let optionHalfNum_left = [];
  let optionHalfNum_right = [];
  //even or odd
  let option1or2_even = [];
  let option1or2_odd = [];
  // red or blacl
  let color_red = [];
  let color_black = [];

  // 過去のデータ
  let pastDate = [];
  let deleteDate = 0;


  const my_value = location.search.substring(1);///name

  localStorage.setItem('url_name', `${my_value}`);
  let USER = localStorage.getItem("url_name");
  console.log(USER);

  let MONEY = localStorage.getItem("hand_money");
  let my_handmoney = MONEY;
  console.log(MONEY);

  const rogout = document.getElementById('rogout');
  rogout.addEventListener('click', () => {
    localStorage.setItem('hand_money', `${my_handmoney}`);
  });

  ////////////////////////////お金のデータ（ユーザー毎に管理）////おそらくfirebase行き
  // let my_handmoney = 10000;
  $('#chash').text(my_handmoney);

  ///////////////////////////借金ボタン(これ使うと無限にお金増やせるから今度消す)
  let lone = 0;
  const lonetext = document.getElementById('lonetext');
  lonetext.textContent = lone;
  const danger = document.getElementById('danger');
  danger.addEventListener('click', () => {
    lone -= 10000;
    lonetext.textContent = lone;
    my_handmoney += 10000;
    $('#chash').text(String(my_handmoney));
  });

  // 借金返済ボタン
  const peyoff = document.getElementById('pey_off');
  peyoff.addEventListener('click', () => {
    my_handmoney += lone;
    lone = 0;
    $('#chash').text(String(my_handmoney));
    lonetext.textContent = lone;
  });

  // １ゲームの記録データ
  let memory = 0;
  let memory2 = 0;
  memory += my_handmoney;

  //チップ金額
  let chip00 = [];
  let chip33;
  //to1オプ
  let new_arr_left = [];
  let new_arr_middle = [];
  let new_arr_right = [];
  //ST12オプ
  let new_arr_up;
  let new_arr_center;
  let new_arr_bottom;
  //hulfNUmオプ
  let new_hulf_left;
  let new_hulf_right;
  //even or odd
  let new_even;
  let new_odd;
  // red or blacl
  let new_black;
  let new_red;

  // 選んだチップ
  let cselectedChip;
  let allin = 0;

  // ランダムな数字を選ぶ動作
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // sleep機能
  function sleep(waitMsec) {
    var startMsec = new Date();
    // 指定ミリ秒間だけループさせる
    while (new Date() - startMsec < waitMsec);
  }
  // 色変更
  function colorSwitch(mmm) {
    switch (chip33) {
      case "100":
        $(mmm).addClass('white');
        break;
      case "500":
        $(mmm).addClass('purple');
        break;
      case "1000":
        $(mmm).addClass('skyblue');
        break;
      case "2500":
        $(mmm).addClass('green');
        break;
      case "5000":
        $(mmm).addClass('redpurple');
        break;
      default:
        $(mmm).addClass('danger');
        allin++;
        if (allin == 2) {
          $('#mask').removeClass('displaynone');
          $('#mask').addClass('z3');
        }
        break;
    }
  }
  // あたり通知
  function queue(op) {
    $(document).ready(function () {
      //queue()で処理を溜めてdequeue()で実行。3秒経ったらfadeOut()
      $("#colect").fadeIn(1000).queue(function () {
        $('#colecttext').text(op);
        setTimeout(function () {
          $("#colect").dequeue();
          $('#colecttext').text("");
        }, 2000);
      });
      $("#colect").fadeOut();
    });
  }

  /////////////////////
  // タイマー
  const timer = document.getElementById('timer');
  let startTime;
  let timeoutId;
  // 時間の設定
  function countUp() {
    const d = new Date(Date.now() - startTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    timer.textContent = `${m}:${s}`;
    timeoutId = setTimeout(() => {
      countUp();
    }, 1000);
  }
  startTime = Date.now();

  $('#start').removeClass("smoke");

  // chipsのクリックアクション
  $('[id^=chips]').click(function () {
    allin = 0;
    $('#ruret_table').removeClass('dance');
    if (this.value == "all") {
      cselectedChip = my_handmoney;
      chip33 = my_handmoney;
      $('#ruret_table').addClass('dance');
    } else {
      cselectedChip = this.value;
      chip33 = this.value;
    }

    $('[id^=chips]').removeClass("smoke");
    $(this).addClass('smoke');
    console.log(this.value);

    const bbb = this.value;
    const ぴくら = [100, 500, 1000, 2500, 5000, "all"];

    function tt(g, ccccc) {
      if (bbb == ぴくら[g]) {
        $('#img_place').attr('src', ccccc);
      }
    }

    tt(0, "https://github.com/abe-masafumi/kadai-js/blob/master/docs/img/%E3%83%81%E3%83%83%E3%83%97.png?raw=true");
    tt(1, "https://github.com/abe-masafumi/kadai-js/blob/master/docs/img/%E3%83%81%E3%83%83%E3%83%975.png?raw=true");
    tt(2, "https://github.com/abe-masafumi/kadai-js/blob/master/docs/img/%E3%83%81%E3%83%83%E3%83%9710.png?raw=true");
    tt(3, "https://github.com/abe-masafumi/kadai-js/blob/master/docs/img/%E3%83%81%E3%83%83%E3%83%9725.png?raw=true");
    tt(4, "https://github.com/abe-masafumi/kadai-js/blob/master/docs/img/%E3%83%81%E3%83%83%E3%83%9750.png?raw=true");

    if (this.value == "all") {
      $('#img_place').attr('src', "./img/オールイン.png");/////後で変更
      allin++;
    }
    $('#play_table').removeClass("smoke");
  });
  ///////////////////////////////
  // thのクリック動作 
  $('[id^=tableNum_]').on('click', function () {
    $('#spin_img').addClass('spin');
    $('#randomNum').removeClass('pnum');

    deleteDate = 0;
    const arry = ["100", "500", "1000", "2500", "5000", my_handmoney];
    let uuuu = this.value;
    let iii = this;
    function kitakore(obj_key) {
      if (arry.includes(obj_key)) {
        selectNum.push(uuuu);
        chip00.push(obj_key);

        if (obj_key == my_handmoney) {
          allin++;
          selectNum.push(uuuu);
          chip00.push(my_handmoney);////////////////////////////
        }
      }
    }

    // 常時お金の計算
    my_handmoney -= cselectedChip;
    $('#chash').text(String(my_handmoney));
    kitakore(cselectedChip);
    colorSwitch(iii);
  });

  ///////////////////////////////
  // potionline1のクリック動作
  $('[id^=optionline]').on('click', function () {
    $('#spin_img').addClass('spin');
    $('#randomNum').removeClass('pnum');

    let ccc = this.value;
    let iii = this;
    colorSwitch(iii);

    switch (ccc) {
      case "up":
        optionNum1.push(3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36);
        new_arr_up = [].concat(chip33);
        break;
      case "center":
        optionNum2.push(2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35);
        new_arr_center = [].concat(chip33);
        break;
      case "bottom":
        optionNum3.push(1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34);
        new_arr_bottom = [].concat(chip33);
        break;
    }
    // お金の計算
    my_handmoney -= cselectedChip;
    $('#chash').text(String(my_handmoney));
  });
  ///////////////////////////////
  $('[id^=optionST12_]').on('click', function () {
    $('#spin_img').addClass('spin');
    $('#randomNum').removeClass('pnum');

    let ppp = this.value;
    let iii = this;
    colorSwitch(iii);

    switch (ppp) {
      case "1st12":
        optionST12_left.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
        new_arr_left = [].concat(chip33);
        console.log(optionNum1);
        break;
      case "2st12":
        optionST12_center.push(13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24);
        new_arr_middle = [].concat(chip33);
        console.log(optionST12_center);
        break;
      case "3rd12":
        optionST12_right.push(25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36);
        new_arr_right = [].concat(chip33);
        console.log(optionST12_right);
        break;
    }

    my_handmoney -= cselectedChip;
    $('#chash').text(String(my_handmoney));
  });
  // 1~18 19~36
  $('[id^=optionHalfNum_').on('click', function () {
    $('#randomNum').removeClass('pnum');
    $('#spin_img').addClass('spin');

    let iii = this;
    colorSwitch(iii);

    if (this.value == "left") {
      optionHalfNum_left.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18);
      new_hulf_left = [].concat(chip33);
      console.log(optionHalfNum_left);
    } else {
      optionHalfNum_right.push(19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36);
      new_hulf_right = [].concat(chip33);
      console.log(optionHalfNum_right);
    }

    my_handmoney -= cselectedChip;
    $('#chash').text(String(my_handmoney));
  });
  /////////////
  // 偶数と奇数
  $('[id^=option1or2_').on('click', function () {
    $('#randomNum').removeClass('pnum');
    $('#spin_img').addClass('spin');

    let iii = this;
    colorSwitch(iii);

    if (this.value == "EVEN") {
      option1or2_even = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
      new_even = [].concat(chip33);
      console.log(option1or2_even);
    } else {
      option1or2_odd = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
      new_odd = [].concat(chip33);
      console.log(option1or2_odd);
    }

    my_handmoney -= cselectedChip;
    $('#chash').text(String(my_handmoney));
  });
  ///red or black
  $('[id^=optionColor_').on('click', function () {
    $('#randomNum').removeClass('pnum');
    $('#spin_img').addClass('spin');

    let iii = this;
    colorSwitch(iii);

    if (this.value == "RED") {
      color_red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
      new_red = [].concat(chip33);
      console.log(color_red);
    } else {
      color_black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
      new_black = [].concat(chip33);
      console.log(color_black);
    }

    my_handmoney -= cselectedChip;
    $('#chash').text(String(my_handmoney));
  });
  ///////////////////////////////
  // スタート
  $('#start').on('click', function () {
    $('#spin_img').removeClass('spin');
    $('#randomNum').addClass('pnum');
    $('#mask').addClass('displaynone');




    // ランダムで出てくる数字を設定↓　↓ここを変更したら動作確認が簡単/////////////////////////
    const randomNum = getRandomInt(0, 36);
    $('#randomNum').text(randomNum);
    // 過去データ処理
    pastDate.splice(0, 1, randomNum);
    // 選んだデータが一致しているか
    if (selectNum.includes(String(randomNum))) {
      queue("あたり「ストレート」");
      ///////////////////////////////
      // 配列の特定のobjのキーを取得
      const result1 = Object.keys(selectNum).reduce((r, key) => {
        return selectNum[key] == randomNum ? key : r
      }, null);
      //数字　当選　計算処理
      my_handmoney += (chip00[result1] * 36);
      $('#chash').text(my_handmoney);
      ////////////////////////////////
    }

    // 右オプション　当選　計算処理
    if (optionNum1.includes(randomNum)) {
      my_handmoney += new_arr_up * 3;
      queue("あたり「2TO1」");
      $('#chash').text(my_handmoney);
    }
    if (optionNum2.includes(randomNum)) {
      my_handmoney += new_arr_center * 3;
      queue("あたり「2TO1」");
      $('#chash').text(my_handmoney);
    }
    if (optionNum3.includes(randomNum)) {
      my_handmoney += new_arr_bottom * 3;
      queue("あたり「2TO1」");
      $('#chash').text(my_handmoney);
    }
    if (optionST12_left.includes(randomNum)) {
      my_handmoney += new_arr_left * 3;
      queue("あたり「1ST12」");
      $('#chash').text(my_handmoney);
    }
    if (optionST12_center.includes(randomNum)) {
      my_handmoney += new_arr_middle * 3;
      queue("あたり「2ND12」");
      $('#chash').text(my_handmoney);
    }
    if (optionST12_right.includes(randomNum)) {
      my_handmoney += new_arr_right * 3;
      queue("あたり「3RD12」");
      $('#chash').text(my_handmoney);
    }

    if (optionHalfNum_left.includes(randomNum)) {
      my_handmoney += new_hulf_left * 2;
      queue("あたり「1~18」");
      $('#chash').text(my_handmoney);
    }
    if (optionHalfNum_right.includes(randomNum)) {
      my_handmoney += new_hulf_right * 2;
      queue("あたり「19~36」");
      $('#chash').text(my_handmoney);
    }
    // 偶数と奇数
    if (option1or2_even.includes(randomNum)) {
      my_handmoney += new_even * 2;
      queue("あたり「EVEN」");
      $('#chash').text(my_handmoney);
    }
    if (option1or2_odd.includes(randomNum)) {
      my_handmoney += new_odd * 2;
      queue("あたり「ODD」");
      $('#chash').text(my_handmoney);
      ///red or black
    }
    if (color_red.includes(randomNum)) {
      my_handmoney += new_red * 2;
      queue("あたり「RED」");
      $('#chash').text(my_handmoney);
    }
    if (color_black.includes(randomNum)) {
      my_handmoney += new_black * 2;
      queue("あたり「BLACK」");
      $('#chash').text(my_handmoney);
    }
    // リセット処理
    color_red = [];
    color_black = [];

    option1or2_even = [];
    option1or2_odd = [];

    optionHalfNum_left = [];
    optionHalfNum_right = [];

    optionST12_left = [];
    optionST12_center = [];
    optionST12_right = [];

    optionNum1 = [];
    optionNum2 = [];
    optionNum3 = [];
    selectNum = [];
    chip00 = [];

    $('[id^=tableNum_]').removeClass('white purple skyblue green redpurple danger');
    $('[id^=optionline]').removeClass('white purple skyblue green redpurple danger');
    $('[id^=optionST12_]').removeClass('white purple skyblue green redpurple danger');
    $('[id^=optionHalfNum_').removeClass('white purple skyblue green redpurple danger');
    $('[id^=option1or2_').removeClass('white purple skyblue green redpurple danger');
    $('[id^=optionColor_').removeClass('white purple skyblue green redpurple danger');
    $('#chips1').click();
    ////////
    // 過去データの表示
    const ul = document.getElementById('pastDate')
    const li = document.createElement('li');
    li.textContent = pastDate;
    ul.appendChild(li);
    deleteDate += 1;
    // 過去データの削除
    if (deleteDate == 35) {
      while (ul.lastChild) {
        ul.removeChild(ul.lastChild);
      }
    }

    memory2 = my_handmoney - memory;
    console.log(parseInt(memory2));
    const win = document.getElementById('win');
    win.textContent = memory2;
    memory = 0;
    memory += my_handmoney;

    // １ゲームでお金が減った時の処理もプレイヤーによって違うからどうなるんだろ//////////////////
    const lose = ["お金が減った", "負けた", "イカサマか？", "次は当てる！", "涙。",]

    if (memory2 < 0) {
      queue(lose[getRandomInt(0, lose.length - 1)]);
    }

    // ゲームオーバー通知もプレイヤーによって違うけどゲームオーバー時は強制ログアウト？？
    if (my_handmoney <= 0) {
      // alert('Game Over');
      $('#gameovermask').removeClass('displaynone');
      $('#gameOver').removeClass('displaynone');
      clearTimeout(timeoutId);   ////stoptimer
    }
  });
}