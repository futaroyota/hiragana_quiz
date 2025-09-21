let currentQuiz = null;
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft;
let mistakes = [];

// ========== HIRAGANA QUESTIONS ========== //
const hiraganaQuestions = [
  // 1-10: simple 1 character
  { q: "あ", options: ["a","i","u","e"], answer: "a", time:15 },
  { q: "い", options: ["i","e","a","o"], answer: "i", time:15 },
  { q: "う", options: ["u","a","i","e"], answer: "u", time:15 },
  { q: "え", options: ["e","i","u","a"], answer: "e", time:15 },
  { q: "お", options: ["o","u","a","e"], answer: "o", time:15 },
  { q: "か", options: ["ka","ki","ku","ke"], answer: "ka", time:15 },
  { q: "き", options: ["ki","ka","ku","ke"], answer: "ki", time:15 },
  { q: "く", options: ["ku","ke","ka","ki"], answer: "ku", time:15 },
  { q: "け", options: ["ke","ku","ka","ki"], answer: "ke", time:15 },
  { q: "こ", options: ["ko","ku","ka","ke"], answer: "ko", time:15 },

  // 11-20: 2-character
  { q: "はな", options:["hana","hane","hanae","hono"], answer:"hana", time:20 },
  { q: "みず", options:["mizu","miso","mizuho","mizuya"], answer:"mizu", time:20 },
  { q: "やま", options:["yama","yamu","yame","yamo"], answer:"yama", time:20 },
  { q: "かわ", options:["kawa","kawae","kawao","kawo"], answer:"kawa", time:20 },
  { q: "さくら", options:["sakura","sakurae","sakuri","sakur"], answer:"sakura", time:25 },
  { q: "がっこう", options:["gakkou","gakou","gakkoi","gakkou"], answer:"gakkou", time:25 },
  { q: "ちゅうがっこう", options:["chuugakkou","chuugakou","chuugakkoi","chuugakou"], answer:"chuugakkou", time:30 },
  { q: "しゅくだい", options:["shukudai","shukudoi","shukudaii","shukudao"], answer:"shukudai", time:25 },
  { q: "にっき", options:["nikki","nichi","niki","nikio"], answer:"nikki", time:20 },
  { q: "りゅうがくせい", options:["ryuugakusei","ryuugakuse","ryuugakuseii","ryugakusei"], answer:"ryuugakusei", time:30 },

  // 21-30: 3-character, small tsu, ya/yu/yo
  { q: "きゃく", options:["kyaku","kaku","kyako","kayu"], answer:"kyaku", time:25 },
  { q: "しょくどう", options:["shokudou","shokudo","shokudoa","shokudouu"], answer:"shokudou", time:30 },
  { q: "ちゅうしゃじょう", options:["chuushajou","chuushajo","chuushajyo","chuushajouu"], answer:"chuushajou", time:35 },
  { q: "がっき", options:["gakki","gaki","gaki","gakkii"], answer:"gakki", time:25 },
  { q: "ひゃく", options:["hyaku","hiyaku","hiyaku","hyakoo"], answer:"hyaku", time:25 },
  { q: "きょうしつ", options:["kyoushitsu","kyoshitsu","kyoujitsu","kyoushitso"], answer:"kyoushitsu", time:30 },
  { q: "にゅうがく", options:["nyuugaku","nyuugaku","nyuugakuo","nyuugaku"], answer:"nyuugaku", time:30 },
  { q: "しゅうまつ", options:["shuumatsu","shumatsu","shuumatsu","shumaatu"], answer:"shuumatsu", time:30 },
  { q: "ちゃわん", options:["chawan","chawan","chawon","chawan"], answer:"chawan", time:25 },
  { q: "びょういん", options:["byouin","byoin","byooin","byouinn"], answer:"byouin", time:30 },

  // 31-50: longer, tricky words, mix small tsu, ya/yu/yo, tenten/maru
  { q: "がっこうせい", options:["gakkousei","gakkosei","gakkouse","gakusei"], answer:"gakkousei", time:40 },
  { q: "しょうがっこう", options:["shougakkou","shougakko","shougakou","shougakkoo"], answer:"shougakkou", time:40 },
  { q: "にほんごがっこう", options:["nihongogakkou","nihongogakou","nihongo","nihongoakko"], answer:"nihongogakkou", time:45 },
  { q: "ちゅうがっこうせい", options:["chuugakkousei","chuugakusei","chuugakou","chuugakosei"], answer:"chuugakkousei", time:45 },
  { q: "おんがくかい", options:["ongakukai","ongakukay","ongakukaii","ongakukae"], answer:"ongakukai", time:35 },
  { q: "びょういんまえ", options:["byouinmae","byoinmae","byouinma","byouinme"], answer:"byouinmae", time:35 },
  { q: "しんぶんきしゃ", options:["shinbunkisha","shinbunkiya","shinbunkisa","shinbunkisha"], answer:"shinbunkisha", time:40 },
  { q: "りゅうがくせいかつ", options:["ryuugakuseikatsu","ryuugakuseikatsu","ryuugakuseikatu","ryuugakuseikatsu"], answer:"ryuugakuseikatsu", time:50 },
  { q: "きょうしつのまえ", options:["kyoushitsunomae","kyoushitsuomae","kyoushitsunomae","kyoushitsuomae"], answer:"kyoushitsunomae", time:35 },
  { q: "ちゅうしゃじょうのまえ", options:["chuushajounomae","chuushajonoemae","chuushajounomae","chuushajonoemae"], answer:"chuushajounomae", time:50 },
  { q: "はなびたいかい", options:["hanabitakaai","hanabitaikai","hanabitakai","hanabitakaii"], answer:"hanabitakai", time:40 },
  { q: "おおきいがっこう", options:["ookiigakkou","ookigakkou","ookiigakou","ookigakou"], answer:"ookiigakkou", time:45 },
  { q: "せんせいのへや", options:["senseinoheya","senseinoheyaa","senseinoheiy","senseinoheya"], answer:"senseinoheya", time:35 },
  { q: "にゅうがくしき", options:["nyuugakushiki","nyuugakushikki","nyuugakushiki","nyuugakushiki"], answer:"nyuugakushiki", time:40 },
  { q: "きょうかしょ", options:["kyoukasho","kyoukasyo","kyoukasho","kyoukashoo"], answer:"kyoukasho", time:35 },
  { q: "ちゅうしゃじょうのちかく", options:["chuushajounochikaku","chuushajouchikaku","chuushajounochikako","chuushajouchikaku"], answer:"chuushajounochikaku", time:55 },
  { q: "にほんごのべんきょう", options:["nihongonobenkyou","nihongonobenkyou","nihongonobenkyoo","nihongonobenkyou"], answer:"nihongonobenkyou", time:50 },
  { q: "りゅうがくせいのともだち", options:["ryuugakuseinotomodachi","ryuugakuseinotomodaci","ryuugakuseinotomodachi","ryuugakuseinotomodaci"], answer:"ryuugakuseinotomodachi", time:60 },
  { q: "ちゅうがっこうのせんせい", options:["chuugakkounosensei","chuugakkounosense","chuugakkounosensei","chuugakkounosensei"], answer:"chuugakkounosensei", time:50 },
  { q: "びょういんのまえに", options:["byouinnomaeni","byouinnomae","byouinnomaeni","byouinnoemae"], answer:"byouinnomaeni", time:50 },
  { q: "はなびたいかいのひ", options:["hanabitakaihinohi","hanabitakaikainohi","hanabitakaihinohi","hanabitakaikainohi"], answer:"hanabitakaihinohi", time:55 },
  { q: "おおきいびょういん", options:["ookiibyouin","ookiibyouin","ookiibyooin","ookiibyouinn"], answer:"ookiibyouin", time:45 },
  { q: "せんせいのじむしょ", options:["senseinojimusho","senseinojimusho","senseinojimushoo","senseinojimusho"], answer:"senseinojimusho", time:45 },
  { q: "きょうしつのなか", options:["kyoushitsunonaka","kyoushitsunonaka","kyoushitsunonakaa","kyoushitsunonaka"], answer:"kyoushitsunonaka", time:35 },
  { q: "ちゅうしゃじょうのまんなか", options:["chuushajounomannaka","chuushajounomannaka","chuushajounomannaka","chuushajounomannaka"], answer:"chuushajounomannaka", time:60 },
  { q: "りゅうがくせいのまえ", options:["ryuugakuseinomae","ryuugakuseinomae","ryuugakuseinomae","ryuugakuseinomae"], answer:"ryuugakuseinomae", time:45 },
  { q: "にほんごのせんせい", options:["nihongonosensei","nihongonosensei","nihongonosensei","nihongonosensei"], answer:"nihongonosensei", time:40 },
  { q: "ちゅうがっこうのがっこう", options:["chuugakkounogakkou","chuugakkounogakkou","chuugakkounogakko","chuugakkounogakkou"], answer:"chuugakkounogakkou", time:55 },
  { q: "おおきいきょうかしょ", options:["ookiikyoukasho","ookiikyoukasho","ookiikyoukasyo","ookiikyoukasho"], answer:"ookiikyoukasho", time:50 },
  { q: "びょういんのちかく", options:["byouinnochikaku","byouinnochikaku","byouinnochikaku","byouinnochikaku"], answer:"byouinnochikaku", time:45 },
  { q: "はなびたいかいのまえ", options:["hanabitakaiomae","hanabitakaiomae","hanabitakaiomae","hanabitakaiomae"], answer:"hanabitakaiomae", time:55 },
  { q: "せんせいのしつもん", options:["senseinoshitumon","senseinoshitumon","senseinoshittumon","senseinoshitumon"], answer:"senseinoshitumon", time:40 },
  { q: "きょうしつのちゅうしん", options:["kyoushitsunochuushin","kyoushitsunochuushin","kyoushitsunochuushinn","kyoushitsunochuushin"], answer:"kyoushitsunochuushin", time:55 }
];

// ========== KATAKANA QUESTIONS ========== //

const katakanaQuestions = [
    // 1-10: simple single characters
    { q: "ア", options:["あ","い","う","え"], answer:"あ", time:15 },
    { q: "イ", options:["い","え","お","あ"], answer:"い", time:15 },
    { q: "ウ", options:["う","あ","い","え"], answer:"う", time:15 },
    { q: "エ", options:["え","い","う","あ"], answer:"え", time:15 },
    { q: "オ", options:["お","う","あ","え"], answer:"お", time:15 },
    { q: "カ", options:["か","き","く","け"], answer:"か", time:15 },
    { q: "キ", options:["き","か","く","け"], answer:"き", time:15 },
    { q: "ク", options:["く","け","か","き"], answer:"く", time:15 },
    { q: "ケ", options:["け","く","か","き"], answer:"け", time:15 },
    { q: "コ", options:["こ","く","か","け"], answer:"こ", time:15 },
  
    // 11-20: short words
    { q: "ゲーム", options:["げーむ","げむ","ぎーむ","げーま"], answer:"げーむ", time:20 },
    { q: "テレビ", options:["てれび","てれびい","てれび","てれび"], answer:"てれび", time:20 },
    { q: "バス", options:["ばす","ぱす","ばっす","ばす"], answer:"ばす", time:15 },
    { q: "カメラ", options:["かめら","かめーら","かめら","かめら"], answer:"かめら", time:20 },
    { q: "ホテル", options:["ほてる","ほてーる","ほてる","ほてる"], answer:"ほてる", time:20 },
    { q: "スーパー", options:["すーぱー","すぱー","すーぱ","すーぱー"], answer:"すーぱー", time:25 },
    { q: "レストラン", options:["れすとらん","れすとらん","れすとら","れすとらん"], answer:"れすとらん", time:30 },
    { q: "チョコ", options:["ちょこ","ちょこ","ちょこ","ちょこ"], answer:"ちょこ", time:20 },
    { q: "コンピューター", options:["こんぴゅーたー","こんぴゅーた","こんぴゅたー","こんぴゅた"], answer:"こんぴゅーたー", time:40 },
    { q: "パーティー", options:["ぱーてぃー","ぱーてぃ","ぱーていー","ぱーてぃー"], answer:"ぱーてぃー", time:25 },
  
    // 21-30: medium length, small ャ, ュ, ョ, tenten/maru
    { q: "キャラクター", options:["きゃらくたー","きゃらくた","きゃらくたー","きゃらくた"], answer:"きゃらくたー", time:35 },
    { q: "シュート", options:["しゅーと","しゅと","しゅーと","しゅーと"], answer:"しゅーと", time:25 },
    { q: "ジョギング", options:["じょぎんぐ","じょぎんぐ","じょぎんぐ","じょぎんぐ"], answer:"じょぎんぐ", time:25 },
    { q: "バッテリー", options:["ばってりー","ばってり","ばてりー","ばってりー"], answer:"ばってりー", time:30 },
    { q: "ピアノ", options:["ぴあの","ぴあの","ぴあの","ぴあの"], answer:"ぴあの", time:20 },
    { q: "テレビゲーム", options:["てれびげーむ","てれびげむ","てれびげーむ","てれびげーむ"], answer:"てれびげーむ", time:35 },
    { q: "ミュージック", options:["みゅーじっく","みゅーじく","みゅーじっく","みゅーじっく"], answer:"みゅーじっく", time:35 },
    { q: "ノートパソコン", options:["のーとぱそこん","のーとぱそこん","のーとぱそこん","のーとぱそこん"], answer:"のーとぱそこん", time:35 },
    { q: "ハッピー", options:["はっぴー","はぴー","はっぴ","はっぴー"], answer:"はっぴー", time:25 },
    { q: "カップケーキ", options:["かっぷけーき","かっぷけき","かぷけーき","かっぷけーき"], answer:"かっぷけーき", time:35 },
  
    // 31-50: long/tricky words, multiple small characters
    { q: "コンビニエンスストア", options:["こんびにえんすすとあ","こんびにえんすとあ","こんびにえんすすとあ","こんびにえんすすとあ"], answer:"こんびにえんすすとあ", time:60 },
    { q: "インターネット", options:["いんたーねっと","いんたーねと","いんたーねっと","いんたーねっと"], answer:"いんたーねっと", time:45 },
    { q: "エアコンディショナー", options:["えあこんでぃしょなー","えあこんでぃしょな","えあこんでぃしょなー","えあこんでぃしょなー"], answer:"えあこんでぃしょなー", time:60 },
    { q: "スマートフォン", options:["すまーとふぉん","すまーとふぉん","すまーとふぉん","すまーとふぉん"], answer:"すまーとふぉん", time:50 },
    { q: "チョコレートケーキ", options:["ちょこれーとけーき","ちょこれーとけき","ちょこれーとけーき","ちょこれーとけーき"], answer:"ちょこれーとけーき", time:50 },
    { q: "スーパーコンピューター", options:["すーぱーこんぴゅーたー","すーぱーこんぴゅーた","すーぱーこんぴゅーたー","すーぱーこんぴゅーたー"], answer:"すーぱーこんぴゅーたー", time:60 },
    { q: "ハイキングコース", options:["はいきんぐこーす","はいきんぐこーす","はいきんぐこーす","はいきんぐこーす"], answer:"はいきんぐこーす", time:45 },
    { q: "リサイクルショップ", options:["りさいくるしょっぷ","りさいくるしょぷ","りさいくるしょっぷ","りさいくるしょっぷ"], answer:"りさいくるしょっぷ", time:50 },
    { q: "ペットショップ", options:["ぺっとしょっぷ","ぺっとしょぷ","ぺっとしょっぷ","ぺっとしょっぷ"], answer:"ぺっとしょっぷ", time:40 },
    { q: "ビデオカメラ", options:["びでおかめら","びでおかめら","びでおかめら","びでおかめら"], answer:"びでおかめら", time:35 },
  ];

// ========== KANJI QUESTIONS ========== //
const kanjiQuestions = [
    { q: "山", options:["やま","かわ","ひ","もと"], answer:"やま", time:15 },
    { q: "川", options:["かわ","やま","ひ","もと"], answer:"かわ", time:15 },
    { q: "日", options:["ひ","つき","みず","もり"], answer:"ひ", time:15 },
    { q: "月", options:["つき","ひ","かわ","もり"], answer:"つき", time:15 },
    { q: "木", options:["き","もり","やま","ひ"], answer:"き", time:15 },
    { q: "水", options:["みず","ひ","もり","つき"], answer:"みず", time:15 },
    { q: "火", options:["ひ","か","みず","き"], answer:"ひ", time:15 },
    { q: "金", options:["きん","かね","ひ","みず"], answer:"きん", time:15 },
    { q: "土", options:["つち","ど","ひ","き"], answer:"つち", time:15 },
    { q: "本", options:["ほん","もと","やま","き"], answer:"ほん", time:15 },
  
    { q: "人", options:["ひと","にん","じん","みず"], answer:"ひと", time:20 },
    { q: "子", options:["こ","し","す","そ"], answer:"こ", time:20 },
    { q: "女", options:["おんな","じょ","にょ","め"], answer:"おんな", time:20 },
    { q: "男", options:["おとこ","だん","なん","ぼう"], answer:"おとこ", time:20 },
    { q: "先", options:["せん","さき","せ","そ"], answer:"せん", time:20 },
    { q: "生", options:["せい","しょう","いき","う"], answer:"せい", time:20 },
    { q: "名", options:["な","めい","みょう","ね"], answer:"な", time:20 },
    { q: "学", options:["がく","まなぶ","がっ","が"], answer:"がく", time:20 },
    { q: "校", options:["こう","がっ","こう","きょう"], answer:"こう", time:20 },
    { q: "年", options:["とし","ねん","ね","なん"], answer:"とし", time:20 },
  
    { q: "時", options:["じ","とき","ち","さ"], answer:"じ", time:25 },
    { q: "間", options:["あいだ","かん","ま","けん"], answer:"あいだ", time:25 },
    { q: "休", options:["やす","きゅう","きゅ","や"], answer:"やす", time:25 },
    { q: "友", options:["とも","ゆう","ともだち","ゆ"], answer:"とも", time:25 },
    { q: "先", options:["せん","さき","せ","さ"], answer:"せん", time:25 },
    { q: "見", options:["み","けん","け","し"], answer:"み", time:25 },
    { q: "行", options:["い","こう","ぎょう","ゆ"], answer:"い", time:25 },
    { q: "食", options:["しょく","た","たべ","く"], answer:"しょく", time:25 },
    { q: "飲", options:["の","いん","のむ","い"], answer:"の", time:25 },
    { q: "車", options:["くるま","しゃ","じゃ","か"], answer:"くるま", time:25 },
  
    { q: "電", options:["でん","い","えん","と"], answer:"でん", time:30 },
    { q: "話", options:["はな","わ","はなし","ば"], answer:"はな", time:30 },
    { q: "読", options:["よ","どく","よむ","よみ"], answer:"よ", time:30 },
    { q: "書", options:["しょ","か","かく","し"], answer:"しょ", time:30 },
    { q: "語", options:["ご","かた","かたる","ご"], answer:"ご", time:30 },
    { q: "店", options:["みせ","てん","たな","さ"], answer:"みせ", time:30 },
    { q: "町", options:["まち","ちょう","ま","ち"], answer:"まち", time:30 },
    { q: "国", options:["くに","こく","ごく","く"], answer:"くに", time:30 },
    { q: "天", options:["てん","あま","あ","て"], answer:"てん", time:30 },
    { q: "気", options:["き","け","けい","き"], answer:"き", time:30 },
  
    { q: "話", options:["はなし","わ","はな","ば"], answer:"はなし", time:35 },
    { q: "午", options:["ご","うま","ごう","ご"], answer:"ご", time:35 },
    { q: "後", options:["あと","ご","こう","うし"], answer:"あと", time:35 },
    { q: "左", options:["ひだり","さ","しゃ","さ"], answer:"ひだり", time:35 },
    { q: "右", options:["みぎ","う","ゆう","み"], answer:"みぎ", time:35 },
    { q: "外", options:["そと","がい","ほか","と"], answer:"そと", time:35 },
    { q: "中", options:["なか","ちゅう","じゅう","ちゅ"], answer:"なか", time:35 },
    { q: "小", options:["ちいさい","しょう","こ","さ"], answer:"ちいさい", time:35 },
    { q: "大", options:["おおきい","だい","たい","お"], answer:"おおきい", time:35 },
    { q: "長", options:["ながい","ちょう","ちょ","なが"], answer:"ながい", time:35 },
  
    { q: "先", options:["さき","せん","せ","さ"], answer:"さき", time:40 },
    { q: "週", options:["しゅう","す","しゅ","し"], answer:"しゅう", time:40 },
    { q: "曜", options:["よう","ようび","や","よ"], answer:"よう", time:40 },
    { q: "時", options:["とき","じ","じかん","と"], answer:"とき", time:40 },
    { q: "間", options:["あいだ","かん","ま","けん"], answer:"あいだ", time:40 },
    { q: "今", options:["いま","こん","きん","けん"], answer:"いま", time:40 },
    { q: "何", options:["なに","か","なん","な"], answer:"なに", time:40 },
    { q: "私", options:["わたし","し","わたくし","わ"], answer:"わたし", time:40 },
    { q: "友", options:["とも","ゆう","ともだち","ゆ"], answer:"とも", time:40 },
    { q: "先", options:["せん","さき","せ","さ"], answer:"せん", time:40 }
  ];

  // ========== UTILITY FUNCTIONS ==========
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function startQuiz(type) {
    // Reset
    currentIndex = 0;
    score = 0;
    mistakes = [];
  
    // Choose quiz type
    if(type === 'hiragana') currentQuiz = shuffle([...hiraganaQuestions]);
    else if(type === 'katakana') currentQuiz = shuffle([...katakanaQuestions]);
    else if(type === 'kanji') currentQuiz = shuffle([...kanjiQuestions]);
  
    document.querySelector('#menu').style.display = 'none';
    document.querySelector('#quiz-container').style.display = 'block';
    showQuestion();
  }
  
  function showQuestion() {
    const q = currentQuiz[currentIndex];
    const questionEl = document.querySelector('#question');
    const optionsEl = document.querySelector('#options');
    const progressEl = document.querySelector('#progress');
  
    questionEl.textContent = q.q;
    optionsEl.innerHTML = '';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.className = 'option-btn';
      btn.onclick = () => checkAnswer(opt);
      optionsEl.appendChild(btn);
    });
  
    // Update progress bar
    progressEl.value = ((currentIndex)/currentQuiz.length)*100;
  
    // Start timer
    startTimer(q.time);
  }
  
  function startTimer(seconds) {
    clearInterval(timer);
    timeLeft = seconds;
    document.querySelector('#timer').textContent = `Time: ${timeLeft}s`;
    timer = setInterval(() => {
      timeLeft--;
      document.querySelector('#timer').textContent = `Time: ${timeLeft}s`;
      if(timeLeft <= 0) {
        clearInterval(timer);
        recordMistake('');
        nextQuestion();
      }
    }, 1000);
  }
  
  function checkAnswer(selected) {
    clearInterval(timer);
    const q = currentQuiz[currentIndex];
    if(selected === q.answer) score++;
    else recordMistake(selected);
    nextQuestion();
  }
  
  function recordMistake(selected) {
    const q = currentQuiz[currentIndex];
    mistakes.push({
      question: q.q,
      correct: q.answer,
      selected: selected
    });
  }
  
  function nextQuestion() {
    currentIndex++;
    if(currentIndex < currentQuiz.length) showQuestion();
    else showResults();
  }
  
  function showResults() {
    document.querySelector('#quiz-container').style.display = 'none';
    const resultEl = document.querySelector('#results-container');
    resultEl.style.display = 'block';
    document.querySelector('#score').textContent = `Your Score: ${score} / ${currentQuiz.length}`;
  
    const mistakesEl = document.querySelector('#mistakes');
    mistakesEl.innerHTML = '';
    mistakes.forEach(m => {
      const div = document.createElement('div');
      div.className = 'mistake-card';
      div.innerHTML = `<strong>Question:</strong> ${m.question}<br>
                       <strong>Your Answer:</strong> ${m.selected || 'None'}<br>
                       <strong>Correct:</strong> ${m.correct}`;
      mistakesEl.appendChild(div);
    });
  
    // Trigger confetti
    launchConfetti();
  }
  
  function launchConfetti() {
    // Simple confetti animation
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
  
    for(let i=0; i<100; i++){
      const conf = document.createElement('div');
      conf.className = 'confetti';
      conf.style.left = Math.random()*100 + 'vw';
      conf.style.background = `hsl(${Math.random()*360}, 100%, 50%)`;
      conf.style.animationDuration = (Math.random()*3+2)+'s';
      confettiContainer.appendChild(conf);
    }
  
    setTimeout(()=>confettiContainer.remove(), 4000);
  }
  
  // ========== EVENT LISTENERS ==========
  document.querySelector('#hiragana-btn').addEventListener('click',()=>startQuiz('hiragana'));
  document.querySelector('#katakana-btn').addEventListener('click',()=>startQuiz('katakana'));
  document.querySelector('#kanji-btn').addEventListener('click',()=>startQuiz('kanji'));
