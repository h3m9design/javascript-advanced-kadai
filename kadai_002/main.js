// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typedCount = document.getElementById('typedCount');


// 変数・定数を宣言するときはコードの上部に記述するのが一般的
// 複数のテキストを格納する配列
const textLists = [
'Hello World','This is my App','How are you?',
'Today is sunny','I love JavaScript!','Good morning',
'I am Japanese','Let it be','Samurai',
'Typing Game','Information Technology',
'I want to be a programmer','What day is today?',
'I want to build a web app','Nice to meet you',
'Chrome Firefox Edge Safari','machine learning',
'Brendan Eich','John Resig','React Vue Angular',
'Netscape Communications','undefined null NaN',
'Thank you very much','Google Apple Facebook Amazon',
'ECMAScript','console.log','for while if switch',
'var let const','Windows Mac Linux iOS Android',
'programming'  
];

// ランダムなテキストを表示
const createText = () => {

  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  // 配列のインデックスからランダムな数値を作る
  let random = Math.floor(Math.random() * textLists.length);
  // Math.ceilは小数点以下を切り上げるメソッド
  // Math.floorは小数点以下を切り捨てる

  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

// キー入力の判定
const keyPress = e => {

  // 誤タイプの場合
  if(e.key !== untyped.substring(0,1)) {
    wrap.classList.add('mistyped');

    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  // 正タイプの場合

  // スコアのインクリメント
  score++;
  // 1文字を抽出し、入力済の末尾に連結
  typed += untyped.substring(0,1);


  // 正確にタイプした文字数をカウント
  typedCount.textContent = typed.length;

  // 2文字目以降を新しいテキストにする
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {

  // テキストを格納する変数を作る
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text= `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
  } else if(score < 300) {
  text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
  } else if(score >= 300){
    text = `あなたのランクはSです。\nおめでとうございます！`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  // タイマーを止める
  clearInterval(id); 
  // タイムアップと表示
  wrap.textContent = 'タイムアップ！';

  setTimeout(() => {
    const result = confirm(rankCheck(score));

    if(result) {
      window.location.reload();
    }
  },10);
};

// カウントダウンタイマー
const timer = () => {

  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;
  const id = setInterval(() => {
    
    // カウントダウン
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを止める
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};



// ゲームスタート時の処理
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する
  createText();

  // スタートボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';

