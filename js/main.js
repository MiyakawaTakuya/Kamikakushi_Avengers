'use strict';


{
  /////////////////////////////////////////////////////////// 手持ち金
  // let my_handmoney = 10000;
  let enemy_handmoney = 10000;


  // ランダムで生成された１０個の数字の保持
  let deliver_card = [];
  // カードをめくった枚数の保持
  let deliver_left_count = 0;
  let deliver_right_count = 0;
  // 自分のカードの和の保持
  let addition_left_count = 0;
  let addition_right_count = 0;

  // standを押した時の真偽地
  let stand_left_boolean = false;
  let stand_right_boolean = false;

  // 1ゲームの賭け金
  const bet_money = 2500;

  // 1ゲームの利益一時保管
  let gains_left;
  let gains_right;

  // １ゲームの利益表示用
  let gain_left;
  let gain_right;

  const stand_left = document.getElementById('stand_left');
  const stand_right = document.getElementById('stand_right');
  const hit_left = document.getElementById('hit_left');
  const hit_right = document.getElementById('hit_right');

  const card_left_1 = document.getElementById('card_left_1');
  const card_left_2 = document.getElementById('card_left_2');
  const card_left_3 = document.getElementById('card_left_3');
  const card_left_4 = document.getElementById('card_left_4');
  const card_left_5 = document.getElementById('card_left_5');
  const card_right_1 = document.getElementById('card_right_1');
  const card_right_2 = document.getElementById('card_right_2');
  const card_right_3 = document.getElementById('card_right_3');
  const card_right_4 = document.getElementById('card_right_4');
  const card_right_5 = document.getElementById('card_right_5');

  const won_left = document.getElementById('won_left');
  const won_right = document.getElementById('won_right');

  

  // var myTurn = function(callback) {
  //   console.log('オレのターン!');
  //   callback();
  // };
  // myTurn(trapCard);

  // const checkin = function() {
  //   if (addition_right_count >= 16) {
  //     stand_right.clink();
  //   }
  // };

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

  function checking_left() {
    if (addition_left_count > 21) {
      // alert('ぶた');
      

      btn_left_add_smoke();
      stand_boolean_check();

    } else if (addition_left_count == 21) {
      btn_left_add_smoke();
      stand_left_boolean = true;
      // alert('Brack Jack');
      stand_boolean_check();

    }
  }
  function checking_right() {
    if (addition_right_count > 21) {
      // alert('ぶた');
      stand_right_boolean = true;
      btn_right_add_smoke();
      stand_boolean_check();

    } else if (addition_right_count == 21) {
      btn_right_add_smoke();
      stand_right_boolean = true;
      // alert('Brack Jack');
      stand_boolean_check();

    }
  }
  const choise_left = document.getElementById('choise_left');
  const choise_right = document.getElementById('choise_right');
  const one_left = document.getElementById('one_left');
  one_left.addEventListener('click', () => {
    addition_left_count += 1;
    addition_left.textContent = addition_left_count;
    checking_left();


    ///////
    choise_left.classList.add('none');
    check_total();

  });
  const eleven_left = document.getElementById('eleven_left');
  eleven_left.addEventListener('click', () => {
    addition_left_count += 11;
    addition_left.textContent = addition_left_count;
    checking_left();
    choise_left.classList.add('none');
    check_total();

  });
  const one_right = document.getElementById('one_right');
  one_right.addEventListener('click', () => {
    addition_right_count += 1;
    addition_right.textContent = addition_right_count;
    checking_right();
    choise_right.classList.add('none');
  });
  const eleven_right = document.getElementById('eleven_right');
  eleven_right.addEventListener('click', () => {
    addition_right_count += 11;
    addition_right.textContent = addition_right_count;
    checking_right();
    choise_right.classList.add('none');
  });



  const handmoney_left = document.getElementById('handmoney_left');
  handmoney_left.textContent = my_handmoney;

  const handmoney_right = document.getElementById('handmoney_right');
  handmoney_right.textContent = enemy_handmoney;

  const addition_right = document.getElementById('addition_right');
  const addition_left = document.getElementById('addition_left');


  btn_left_add_smoke();
  btn_right_add_smoke();

  function openbtn2_left() {
    choise_left.classList.remove('none');

  }
  function openbtn2_right() {
    choise_right.classList.remove('none');

  }

  class Card {
    constructor() {
      this.tranp = [];
      for (let i = 1; i <= 13; i++) {
        for (let y = 0; y < 4; y++) {
          this.tranp.push(i);
        }
      }
      console.log(this.tranp);
      this.create_card_10();
    }
    // 重複なしの数字を１０個生成
    create_card_10() {
      for (let i = 0; i < 10; i++) {
        const created_8 = this.tranp.splice(Math.floor(Math.random() * this.tranp.length), 1)[0];
        // console.log(created_8);
        deliver_card.push(created_8);
      }
      console.log(deliver_card);
    }
    // 最初に配られるカードの処理＋和の表示
    first_delivery_card() {
      // 左


        card_left_1.textContent = deliver_card[0];
        card_left_2.textContent = deliver_card[2];
        card_left_1.classList.remove('none');
        card_left_2.classList.remove('none');
        addition_left.classList.remove('none');
        if (deliver_card[0] >= 10) {
          addition_left_count += 10;
        } else if (deliver_card[0] == 1) {
          openbtn2_left();
        } else {
          addition_left_count += deliver_card[0];
        }
        if (deliver_card[2] >= 10) {
          addition_left_count += 10;
        } else if (deliver_card[2] == 1) {
          openbtn2_left();
        } else {
          addition_left_count += deliver_card[2];
        }
        addition_left.textContent = addition_left_count;

   



        // 右

        card_right_1.textContent = deliver_card[1];
        card_right_2.textContent = deliver_card[3];
        card_right_1.classList.remove('none');
        card_right_2.classList.remove('none');
        addition_right.classList.remove('none');

        if (deliver_card[1] >= 10) {
          addition_right_count += 10;
        } else if (deliver_card[1] == 1) {
          openbtn2_right();
        } else {
          addition_right_count += deliver_card[1];
        }
        if (deliver_card[3] >= 10) {
          addition_right_count += 10;
        } else if (deliver_card[3] == 1) {
          openbtn2_right();
        } else {
          addition_right_count += deliver_card[3];
        }
        // addition_right_count += deliver_card[1] + deliver_card[3];
        addition_right.textContent = addition_right_count;
      }

  
    };

  ///////////////


  class Battle {
    constructor() {
      this.blackjack = 21;
      console.log(addition_left_count);
      console.log(addition_right_count);

      this.left;
      this.right;
      this.test = [];
      this.check();
      this.kekka();
      // setTimeout(function () {
        // this.reset();
      // }, 1000);
    
    }
    check() {
      // let left_check;
      // let right_check;

      if (addition_left_count > 21) {
        this.left = 20;
        this.test.push(this.left);
      } else if (this.blackjack - addition_left_count == 0) {
        this.left = 0;
        this.test.push(this.left);
      } else {
        this.left = this.blackjack - addition_left_count;
        this.test.push(this.left);
        console.log(this.left);
      }

      if (addition_right_count > 21) {
        this.right = 20;
        this.test.push(this.right);
      } else if (this.blackjack - addition_right_count == 0) {
        this.right = 0;
        this.test.push(this.right);
      } else {
        this.right = this.blackjack - addition_right_count;
        this.test.push(this.right);
        console.log(this.right);
      }
    }
    kekka() {
      const winer = Math.min(...this.test);

      // findIndexメソッド
      const winners_key = this.test.findIndex(function (value, key) {
        return value === winer;
      }); // 勝者のkey
      console.log(winners_key);
      console.log(this.test);

      if (this.test[0] == this.test[1]) {

        // setTimeout(function () {
          alert('drow');
        // }, 1000);
        

        my_handmoney += bet_money;
        handmoney_left.textContent = my_handmoney;
        enemy_handmoney += bet_money;
        handmoney_left.textContent = enemy_handmoney;
      } else if (winners_key == 0) {
        my_handmoney += bet_money * 2;
        handmoney_left.textContent = my_handmoney;

      } else if (winners_key == 1) {
        enemy_handmoney += bet_money * 2;
        handmoney_right.textContent = enemy_handmoney;
      }
    }
    reset() {
      // ランダムで生成された１０個の数字の保持
      deliver_card = [];
      // カードをめくった枚数の保持
      deliver_left_count = 0;
      deliver_right_count = 0;
      // 自分のカードの和の保持
      addition_left_count = 0;
      addition_right_count = 0;
      // standを押した時の真偽地
      stand_left_boolean = false;
      stand_right_boolean = false;
      // add_none();
      card_left_1.classList.add('none');
      card_left_2.classList.add('none');
      card_left_3.classList.add('none');
      card_left_4.classList.add('none');
      card_left_5.classList.add('none');
      card_right_1.classList.add('none');
      card_right_2.classList.add('none');
      card_right_3.classList.add('none');
      card_right_4.classList.add('none');
      card_right_5.classList.add('none');

 

      addition_left.classList.add('none');
      addition_right.classList.add('none');

      gain_left = my_handmoney - gains_left;
      gain_right = enemy_handmoney - gains_right
      console.log(gain_right);
      console.log(gain_left);
      won_left.textContent = gain_left
      won_right.textContent = gain_right
      choise_left.classList.add('none');
      choise_right.classList.add('none');

      addition_left.textContent = "";
      addition_right.textContent = "";
      card_right_3.classList.add('none');

    }

  }

  function first_bet() {
    my_handmoney -= bet_money;
    enemy_handmoney -= bet_money;
    handmoney_left.textContent = my_handmoney;
    handmoney_right.textContent = enemy_handmoney;
  }

  function btn_left_add_smoke() {
    stand_left.classList.add('smoke');
    hit_left.classList.add('smoke');
  }
  function btn_left_remove_smoke() {
    stand_left.classList.remove('smoke');
    hit_left.classList.remove('smoke');
  }

  function btn_right_add_smoke() {
    stand_right.classList.add('smoke');
    hit_right.classList.add('smoke');
  }
  function btn_right_remove_smoke() {
    stand_right.classList.remove('smoke');
    hit_right.classList.remove('smoke');
  }
  function stand_boolean_check() {
    if (stand_left_boolean == true && stand_right_boolean == true) {
      // setTimeout(function () {
        alert('お互いのカードが決まりました。バトルを開始します');
        const battle = new Battle();
        battle.reset();
      // }, 1000);

    }
  }

  stand_left.addEventListener('click', () => {
    stand_left_boolean = true;
    // alert('stand_left');
    btn_left_add_smoke();
    stand_boolean_check();
    check_total();
  });
 function stand_right_click() {
   stand_right_boolean = true;
   // alert('stand_right');
   btn_right_add_smoke();
   stand_boolean_check();

 }


  function yattaroka(num) {
    card_left_3.textContent = deliver_card[num];
    card_left_3.classList.remove('none');
    if (deliver_card[num] >= 10) {
      addition_left_count += 10;
    } else if (deliver_card[num] == 1) {
      openbtn2_left();
    } else {
      addition_left_count += deliver_card[num];
    }
    addition_left.textContent = addition_left_count;
    deliver_left_count++;
  }
  function check_total() {
    // setTimeout(function () {
      if (stand_right_boolean == false) {

        if (addition_right_count < 17) {
         hit_right_click();
         if (addition_right_count >= 17) {
          stand_right_click();
         }
        } else {
         stand_right_click();
        }
      }
      //  }, 1000);
  }


  // 左側のhitを押した時の挙動
  hit_left.addEventListener('click', () => {
    if (deliver_left_count == 0) {
      yattaroka(4);
    } else if (deliver_left_count == 1) {
      yattaroka(6);
    } else if (deliver_left_count == 2) {
      yattaroka(8);
    } else {
      // alert('左の限界');
      stand_left_boolean = true;
    }
    stand_boolean_check();
    checking_left();
    check_total();
  });
  function yattemasu(num) {
    // card_right_3.textContent = deliver_card[num];
    // card_right_3.classList.remove('none');
    console.log(deliver_right_count);
    if (deliver_card[num] >= 10) {
      addition_right_count += 10;
    } else if (deliver_card[num] == 1) {
      openbtn2_right();
    } else {
      addition_right_count += deliver_card[num];
    }
    addition_right.textContent = addition_right_count;
    deliver_right_count++;
  }
  // 右側のhitを押した時の挙動
  // hit_right.addEventListener('click', () => {
    // なんかgetelementしなくてもいけた

function hit_right_click() {
  if (deliver_right_count == 0) {
    card_right_3.textContent = deliver_card[5];
    card_right_3.classList.remove('none');
    yattemasu(5);
    
  } else if (deliver_right_count == 1) {
    card_right_4.textContent = deliver_card[7];
    card_right_4.classList.remove('none');
    yattemasu(7);
  } else if (deliver_right_count == 2) {
    card_right_5.textContent = deliver_card[9];
    card_right_5.classList.remove('none');
    yattemasu(9);
  } else {
    // alert('右の限界');
    stand_right_boolean = true;
    stand_boolean_check();
  }

  if (addition_right_count > 21) {
    // alert('ぶた');
    stand_right_boolean = true;
    btn_right_add_smoke();
    stand_boolean_check();

  } else if (addition_right_count == 21) {
    btn_right_add_smoke();
    stand_right_boolean = true;
    // alert('Brack Jack');
    stand_boolean_check();
  }
}



  const btn = document.getElementById('btn');//仮のボタン（後で消去）
  btn.addEventListener('click', () => {
    gains_left = my_handmoney;
    gains_right = enemy_handmoney;
    const card = new Card();
    // チップの表示処理を入れる
    btn_left_remove_smoke();
    btn_right_remove_smoke();
    first_bet();
    card.first_delivery_card();
  });

}