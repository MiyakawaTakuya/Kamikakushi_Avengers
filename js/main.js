'use strict';

{
  // ------firebase-----------
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCZcCJftI5V0L6yzCxq0w02r1ho_N3Ng4w",
    authDomain: "kyoudoukaihatu-938af.firebaseapp.com",
    projectId: "kyoudoukaihatu-938af",
    storageBucket: "kyoudoukaihatu-938af.appspot.com",
    messagingSenderId: "447448270986",
    appId: "1:447448270986:web:0cea984d45ae37216c8573",
    measurementId: "G-YGLQ85HKS8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const Number = firebase.firestore().collection('nomber');
  const User = firebase.firestore().collection('user');
  firebase.analytics();
  //----------end-------------

  const my_value = location.search.substring(1);///name

  // ------firebase---usercount--------  
  // if (vattlestart.length <= 2) {

  User.add({ username: my_value });
  let dataArry_test = {};
  User.onSnapshot(function (querySnapshot) {

    const vattlestart = [];
    const dataArray = [];
    querySnapshot.docs.forEach(function (doc) {
      const data = {
        name: doc.id,
        data: doc.data(),
      }
      dataArray.push(data);
      console.log(dataArray.length);
    });
    setTimeout(function () {
      console.log("2秒後に実行！");
      if (dataArray.length >= 2) {
        // vattlestart = [];
        console.log(dataArray);
        vattlestart.push(dataArray[0]);
        vattlestart.push(dataArray[1]);
        console.log(vattlestart);

      }
      dataArry_test = vattlestart;
      console.log(dataArry_test);
      // console.log(dataArry_test[0].data.username);
    }, 100);
  });

  // } 
  // setTimeout(function () {
  //   console.log("2秒後に実行！");
  // }, 100);


  // ----------end-------------



  // 〜〜〜〜〜〜変数まとめ〜〜〜〜〜〜
  ///////////////////////////////////// 手持ち金（ユーザーの所持金にしたい）
  //hoset

  localStorage.setItem('url_name', `${my_value}`);
  let USER = localStorage.getItem("url_name");
  console.log(USER);

  // if (dataArray[0] == USER) {

  // }



  let MONEY = localStorage.getItem("hand_money");
  let my_handmoney = MONEY;
  console.log(MONEY);


  const rogout = document.getElementById('rogout');
  rogout.addEventListener('click', () => {
    localStorage.setItem('hand_money', `${my_handmoney}`);
  });









  //user
  let enemy_handmoney = 10000;


  // ランダムで生成された１０個の数字の保持///　　　　firebase行き
  let deliver_card = [];
  //firebase帰ってきたやつ
  let newCard10 = [];
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
  let gain_left
  let gain_right

  // 〜〜〜〜〜〜ID取得まとめ〜〜〜〜〜〜
  // スタンドボタンの取得


  const stand_right = document.getElementById('stand_right');
  // ヒットボタンの取得 
  const hit_left = document.getElementById('hit_left');
  const hit_right = document.getElementById('hit_right');
  // 左トランプの取得
  const card_left_1 = document.getElementById('card_left_1');
  const card_left_2 = document.getElementById('card_left_2');
  const card_left_3 = document.getElementById('card_left_3');
  const card_left_4 = document.getElementById('card_left_4');
  const card_left_5 = document.getElementById('card_left_5');
  // 右トランプの取得
  const card_right_1 = document.getElementById('card_right_1');
  const card_right_2 = document.getElementById('card_right_2');
  const card_right_3 = document.getElementById('card_right_3');
  const card_right_4 = document.getElementById('card_right_4');
  const card_right_5 = document.getElementById('card_right_5');
  // １ゲームの利益の表示
  const won_left = document.getElementById('won_left');
  const won_right = document.getElementById('won_right');
  // 1or11のボタン取得
  const choise_left = document.getElementById('choise_left');
  const choise_right = document.getElementById('choise_right');
  // 左の1or11のボタン取得
  const one_left = document.getElementById('one_left');
  const eleven_left = document.getElementById('eleven_left');
  // 右の1or11のボタン取得
  const one_right = document.getElementById('one_right');
  const eleven_right = document.getElementById('eleven_right');
  // 所持金の表示
  const handmoney_left = document.getElementById('handmoney_left');
  const handmoney_right = document.getElementById('handmoney_right');
  // 引いたカードの数字の和ところの取得
  const addition_right = document.getElementById('addition_right');
  const addition_left = document.getElementById('addition_left');


  // 〜〜〜〜〜〜関数まとめ〜〜〜〜〜〜
  // (左)引いたカードの数値が１０以上だったら１０にして追加＋１だったら選択
  function control_deliver_left(num) {
    if (newCard10[num] >= 10) {
      addition_left_count += 10;
    } else if (newCard10[num] == 1) {
      choise_left.classList.remove('none');
    } else {
      addition_left_count += newCard10[num];
    }
  }

  // (右)引いたカードの数値が１０以上だったら１０にして追加＋１だったら選択
  function control_deliver_right(num) {
    if (newCard10[num] >= 10) {
      addition_right_count += 10;
    } else if (newCard10[num] == 1) {
      choise_right.classList.remove('none');
    } else {
      addition_right_count += newCard10[num];
    }
  }

  // 左　２１超えたかのチェック
  function checking_left() {
    if (addition_left_count > 21) {
      // alert('ぶた');
      stand_left_boolean = true;
      btn_left_add_smoke();
      stand_boolean_check();
    } else if (addition_left_count == 21) {
      btn_left_add_smoke();
      stand_left_boolean = true;
      // alert('Brack Jack');
      stand_boolean_check();
    }
  }

  // 右　２１超えたかのチェック
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

  // ゲームスタート時のお金の計算と表示
  function first_bet() {
    my_handmoney -= bet_money;
    enemy_handmoney -= bet_money;
    handmoney_left.textContent = my_handmoney;
    handmoney_right.textContent = enemy_handmoney;
  }
  // 不本意な操作の防止
  function btn_left_add_smoke() {
    stand_left.classList.add('smoke');
    hit_left.classList.add('smoke');
  }
  // (左)ボタンの表示
  function btn_left_remove_smoke() {
    stand_left.classList.remove('smoke');
    hit_left.classList.remove('smoke');
  }
  // 不本意な操作の防止
  function btn_right_add_smoke() {
    stand_right.classList.add('smoke');
    hit_right.classList.add('smoke');
  }
  // (右)ボタンの表示
  function btn_right_remove_smoke() {
    stand_right.classList.remove('smoke');
    hit_right.classList.remove('smoke');
  }
  // ２人のプレイヤーがカードの選択が終わったらバトル処理にうつす
  function stand_boolean_check() {
    if (stand_left_boolean == true && stand_right_boolean == true) {
      alert('お互いのカードが決まりました。バトルを開始します');
      const battle = new Battle();
      battle.reset();
    }
  }

  // 左側のhitを押した時の挙動（数値を足し算したり１が出たら選択を表示したり）
  function hit_create_left(num) {
    if (newCard10[num] >= 10) {
      addition_left_count += 10;
    } else if (newCard10[num] == 1) {
      choise_left.classList.remove('none');
    } else {
      addition_left_count += newCard10[num];
    }
    addition_left.textContent = addition_left_count;
    deliver_left_count++;
  }
  // 右側のhitを押した時の挙動（数値を足し算したり１が出たら選択を表示したり）
  function hit_create_right(num) {
    if (newCard10[num] >= 10) {
      addition_right_count += 10;
    } else if (newCard10[num] == 1) {
      choise_right.classList.remove('none');
    } else {
      addition_right_count += newCard10[num];
    }
    addition_right.textContent = addition_right_count;
    deliver_right_count++;
  }

  // 〜〜〜〜〜〜ボタンのクリック動作まとめ〜〜〜〜〜〜
  // 左の1or11のボタン処理
  one_left.addEventListener('click', () => {
    addition_left_count += 1;
    addition_left.textContent = addition_left_count;
    checking_left();
    choise_left.classList.add('none');
  });

  eleven_left.addEventListener('click', () => {
    addition_left_count += 11;
    addition_left.textContent = addition_left_count;
    checking_left();
    choise_left.classList.add('none');
  });

  // 右の1or11のボタン処理
  one_right.addEventListener('click', () => {
    addition_right_count += 1;
    addition_right.textContent = addition_right_count;
    checking_right();
    choise_right.classList.add('none');
  });

  eleven_right.addEventListener('click', () => {
    addition_right_count += 11;
    addition_right.textContent = addition_right_count;
    checking_right();
    choise_right.classList.add('none');
  });

  // （左）スタンドボタンを押した時の処理
  stand_left.addEventListener('click', () => {
    stand_left_boolean = true;
    // alert('stand_left');
    btn_left_add_smoke();
    stand_boolean_check();
  });
  // （右）スタンドボタンを押した時の処理
  stand_right.addEventListener('click', () => {
    stand_right_boolean = true;
    // alert('stand_right');
    btn_right_add_smoke();
    stand_boolean_check();
  });

  // 左側のhitを押した時の挙動//////////////(ユーザー毎に分ける)
  // 追加

  // function user_for_eaach_deliver_card(num1,num2,num3) {
  //     if (deliver_left_count == 0) {
  //       card_left_3.textContent = deliver_card[num1];
  //       card_left_3.classList.remove('none');
  //       hit_create_left(num1);
  //     } else if (deliver_left_count == 1) {
  //       card_left_4.textContent = deliver_card[num2];
  //       card_left_4.classList.remove('none');
  //       hit_create_left(num2);
  //     } else if (deliver_left_count == 2) {
  //       card_left_5.textContent = deliver_card[num3];
  //       card_left_5.classList.remove('none');
  //       hit_create_left(num3);
  //     } else {
  //       // alert('左の限界');
  //       stand_left_boolean = true;
  //       stand_boolean_check();
  //     }
  //     checking_left();
  // }

  // hit_left.addEventListener('click', () => {
  //   if ("今開いている人が" == arry[0]) {
  //     user_for_eaach_deliver_card(4,6,8);
  //   } else if ("今開いている人が" == arry[1]) {
  //     user_for_eaach_deliver_card(5,7,9);
  //   }
  // });
  // ↑は↓の実装
  // 左側のhitを押した時の挙動
  hit_left.addEventListener('click', () => {
    if (dataArry_test[0].data.username == USER) {
      if (deliver_left_count == 0) {
        card_left_3.textContent = newCard10[4];
        card_left_3.classList.remove('none');
        hit_create_left(4);
      } else if (deliver_left_count == 1) {
        card_left_4.textContent = newCard10[6];
        card_left_4.classList.remove('none');
        hit_create_left(6);
      } else if (deliver_left_count == 2) {
        card_left_5.textContent = newCard10[8];
        card_left_5.classList.remove('none');
        hit_create_left(8);
      } else {
        // alert('左の限界');
        stand_left_boolean = true;
        stand_boolean_check();
      }
      checking_left();

    } else if (dataArry_test[1].data.username == USER) {
      if (deliver_left_count == 0) {
        card_left_3.textContent = newCard10[5];
        card_left_3.classList.remove('none');
        hit_create_left(5);
      } else if (deliver_left_count == 1) {
        card_left_4.textContent = newCard10[7];
        card_left_4.classList.remove('none');
        hit_create_left(7);
      } else if (deliver_left_count == 2) {
        card_left_5.textContent = newCard10[9];
        card_left_5.classList.remove('none');
        hit_create_left(9);
      } else {
        // alert('右の限界');
        stand_left_boolean = true;
        stand_boolean_check();
      }
      checking_left();
    }

    // if (dataArry_test[1].data.username == USER) {
    //   if (deliver_right_count == 0) {
    //     card_right_3.textContent = newCard10[5];
    //     card_right_3.classList.remove('none');
    //     hit_create_right(5);
    //   } else if (deliver_right_count == 1) {
    //     card_right_4.textContent = newCard10[7];
    //     card_right_4.classList.remove('none');
    //     hit_create_right(7);
    //   } else if (deliver_right_count == 2) {
    //     card_right_5.textContent = newCard10[9];
    //     card_right_5.classList.remove('none');
    //     hit_create_right(9);
    //   } else {
    //     // alert('左の限界');
    //     stand_right_boolean = true;
    //     stand_boolean_check();
    //   }
    //   checking_right();

    // } else if (dataArry_test[0].data.username == USER) {
    //   if (deliver_right_count == 0) {
    //     card_right_3.textContent = newCard10[4];
    //     card_right_3.classList.remove('none');
    //     hit_create_right(4);
    //   } else if (deliver_right_count == 1) {
    //     card_right_4.textContent = newCard10[6];
    //     card_right_4.classList.remove('none');
    //     hit_create_right(6);
    //   } else if (deliver_right_count == 2) {
    //     card_right_5.textContent = newCard10[8];
    //     card_right_5.classList.remove('none');
    //     hit_create_right(8);
    //   } else {
    //     // alert('右の限界');
    //     stand_right_boolean = true;
    //     stand_boolean_check();
    //   }
    //   checking_right();
    // }
  });

  // 右側のhitを押した時の挙動////////////////(ユーザー毎に分ける)
  // hit_right.addEventListener('click', () => {
  //   if (deliver_right_count == 0) {
  //     card_right_3.textContent = newCard10[5];
  //     card_right_3.classList.remove('none');
  //     hit_create_right(5);
  //   } else if (deliver_right_count == 1) {
  //     card_right_4.textContent = newCard10[7];
  //     card_right_4.classList.remove('none');
  //     hit_create_right(7);
  //   } else if (deliver_right_count == 2) {
  //     card_right_5.textContent = newCard10[9];
  //     card_right_5.classList.remove('none');
  //     hit_create_right(9);
  //   } else {
  //     // alert('右の限界');
  //     stand_right_boolean = true;
  //     stand_boolean_check();
  //   }
  //   checking_right();
  // });

  // ゲーム始動の鍵（全てはここから）

  const btn = document.getElementById('btn');//仮のボタン（後で消去）
  btn.addEventListener('click', () => {
    if (dataArry_test[0].data.username == USER) {
      gains_left = my_handmoney;
      gains_right = enemy_handmoney;
      const card = new Card();
      // チップの表示処理を入れる
      btn_left_remove_smoke();
      btn_right_remove_smoke();
      first_bet();
      card.first_delivery_card();
    }
  });


  // 所持金の表示
  handmoney_left.textContent = my_handmoney;
  handmoney_right.textContent = enemy_handmoney;

  // 不本意なボタン操作を防ぐ
  btn_left_add_smoke();
  btn_right_add_smoke();


  // 〜〜〜〜〜〜クラスまとめ〜〜〜〜〜〜
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
        deliver_card.push(created_8);
      }
      // console.log(deliver_card);
      Number.add({ deliverCard: deliver_card });
      Number.onSnapshot(function (querySnapshot) {
        // onSnapshotでcloud firestoreのデータ変更時に実行される!
        // querySnapshot.docsにcloud firestoreのデータが配列形式で入る
        const dataArray = []; // 必要なデータだけが入った新しい配列を作成 
        querySnapshot.docs.forEach(function (doc) {
          const data = {
            name: doc.id,
            data: doc.data(),
          }
          dataArray.push(data);
          // console.log(data);
        });
        console.log(dataArray[0].data.deliverCard);

        newCard10 = dataArray[0].data.deliverCard;

        console.log(newCard10[0]);
        

      });
    }


    // 最初に配られるカードの処理＋和の表示/////////(ユーザー毎に分ける)
    first_delivery_card() {
      setTimeout(function () {
        console.log("2秒後に実行！");

        // 左
        if (dataArry_test[0].data.username == USER) {
          card_left_1.textContent = newCard10[0];
          card_left_2.textContent = newCard10[2];
          card_left_1.classList.remove('none');
          card_left_2.classList.remove('none');
          addition_left.classList.remove('none');
          control_deliver_left(0);
          control_deliver_left(2);
          addition_left.textContent = addition_left_count;
        } else if (dataArry_test[1].data.username == USER) {
          card_left_1.textContent = newCard10[1];
          card_left_2.textContent = newCard10[3];
          card_left_1.classList.remove('none');
          card_left_2.classList.remove('none');
          addition_left.classList.remove('none');
          control_deliver_left(1);
          control_deliver_left(3);
          addition_left.textContent = addition_left_count;
        }

        if (dataArry_test[0].data.username == USER) {
          card_right_1.textContent = newCard10[1];
          card_right_2.textContent = newCard10[3];
          card_right_1.classList.remove('none');
          card_right_2.classList.remove('none');
          addition_right.classList.remove('none');
          control_deliver_right(1);
          control_deliver_right(3);
          addition_right.textContent = addition_right_count;
        } else if (dataArry_test[1].data.username == USER) {
          card_right_1.textContent = newCard10[0];
          card_right_2.textContent = newCard10[2];
          card_right_1.classList.remove('none');
          card_right_2.classList.remove('none');
          addition_right.classList.remove('none');
          control_deliver_right(0);
          control_deliver_right(2);
          addition_right.textContent = addition_right_count;

        }
      }, 500);
     

      // 右
      // card_right_1.textContent = newCard10[1];
      // card_right_2.textContent = newCard10[3];
      // card_right_1.classList.remove('none');
      // card_right_2.classList.remove('none');
      // addition_right.classList.remove('none');
      // control_deliver_right(1);
      // control_deliver_right(3);
      // addition_right.textContent = addition_right_count;
    }

  }
  ///////////////
  class Battle {
    constructor() {
      this.blackjack = 21;
      this.left;
      this.right;
      this.test = [];
      this.check();
      this.kekka();
      this.reset();
    }

    // トランプの点数の集計
    check() {
      // 左
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
      // 右
      if (addition_right_count > 21) {
        this.right = 20;
        this.test.push(this.right);
      } else if (this.blackjack - addition_right_count == 0) {
        this.right = 0;
        this.test.push(this.right);
      } else {
        this.right = this.blackjack - addition_right_count;
        this.test.push(this.right);
      }
    }
    // 結果の処理
    kekka() {
      // 勝者の判別
      const winer = Math.min(...this.test);
      // findIndexメソッド
      const winners_key = this.test.findIndex(function (value, key) {
        return value === winer;
      }); // 勝者のkey
      console.log(this.test);

      // 配当の分配
      if (this.test[0] == this.test[1]) {
        alert('drow');
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

    // 次のゲームが始められる状態にする
    reset() {
      deliver_card = [];
      newCard10 = [];
      // Number.collection('unmber').delete();
      deliver_left_count = 0;
      deliver_right_count = 0;
      addition_left_count = 0;
      addition_right_count = 0;
      stand_left_boolean = false;
      stand_right_boolean = false;

      let resetarry = [
        card_left_1, card_left_2, card_left_3, card_left_4, card_left_5,
        card_right_1, card_right_2, card_right_3, card_right_4, card_right_5,
        addition_left, addition_right, choise_left, choise_right
      ];
      resetarry.forEach(el => {
        el.classList.add('none');
      });

      addition_left.textContent = "";
      addition_right.textContent = "";
      gain_left = my_handmoney - gains_left;
      gain_right = enemy_handmoney - gains_right
      won_left.textContent = gain_left
      won_right.textContent = gain_right
    }
  }
}