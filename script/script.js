let currentQuiz = null;
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft;
let mistakes = [];

// ========== HIRAGANA QUESTIONS ========== //
const hiraganaQuestions = [
  { q: "あ", options:["a","i","u","e"], answer:"a", time:15 },
  { q: "い", options:["i","e","a","o"], answer:"i", time:15 },
  { q: "う", options:["u","a","i","e"], answer:"u", time:15 },
  { q: "え", options:["e","i","u","a"], answer:"e", time:15 },
  { q: "お", options:["o","u","a","e"], answer:"o", time:15 },
  { q: "か", options:["ka","ki","ku","ke"], answer:"ka", time:15 },
  { q: "き", options:["ki","ka","ku","ke"], answer:"ki", time:15 },
  { q: "く", options:["ku","ke","ka","ki"], answer:"ku", time:15 },
  { q: "け", options:["ke","ku","ka","ki"], answer:"ke", time:15 },
  { q: "こ", options:["ko","ku","ka","ke"], answer:"ko", time:15 },
  { q: "が", options:["ga","ka","gi","ge"], answer:"ga", time:15 },
  { q: "ぎ", options:["gi","gi","ka","ge"], answer:"gi", time:15 },
  { q: "ぐ", options:["gu","ku","ga","ge"], answer:"gu", time:15 },
  { q: "げ", options:["ge","ke","ga","gi"], answer:"ge", time:15 },
  { q: "ご", options:["go","ko","ga","ge"], answer:"go", time:15 },
  { q: "さ", options:["sa","shi","su","se"], answer:"sa", time:15 },
  { q: "し", options:["shi","sa","su","se"], answer:"shi", time:15 },
  { q: "す", options:["su","sa","shi","se"], answer:"su", time:15 },
  { q: "せ", options:["se","sa","shi","su"], answer:"se", time:15 },
  { q: "そ", options:["so","sa","shi","su"], answer:"so", time:15 },
  { q: "ざ", options:["za","sa","shi","zu"], answer:"za", time:15 },
  { q: "じ", options:["ji","shi","zi","zu"], answer:"ji", time:15 },
  { q: "ず", options:["zu","su","ku","fu"], answer:"zu", time:15 },
  { q: "ぜ", options:["ze","se","ne","de"], answer:"ze", time:15 },
  { q: "ぞ", options:["zo","so","ro","o"], answer:"zo", time:15 },
  { q: "た", options:["ta","chi","tsu","te"], answer:"ta", time:15 },
  { q: "ち", options:["chi","ta","tsu","te"], answer:"chi", time:15 },
  { q: "つ", options:["tsu","ta","chi","te"], answer:"tsu", time:15 },
  { q: "て", options:["te","ta","chi","tsu"], answer:"te", time:15 },
  { q: "と", options:["to","ta","chi","tsu"], answer:"to", time:15 },
  { q: "だ", options:["da","ta","ji","zu"], answer:"da", time:15 },
  { q: "ぢ", options:["ji","di","chi","de"], answer:"ji", time:15 },
  { q: "づ", options:["zu","du","tsu","dzu"], answer:"zu", time:15 },
  { q: "で", options:["de","te","da","di"], answer:"de", time:15 },
  { q: "ど", options:["do","to","da","do"], answer:"do", time:15 },
  { q: "な", options:["na","ni","nu","ne"], answer:"na", time:15 },
  { q: "に", options:["ni","na","nu","ne"], answer:"ni", time:15 },
  { q: "ぬ", options:["nu","na","ni","ne"], answer:"nu", time:15 },
  { q: "ね", options:["ne","na","ni","nu"], answer:"ne", time:15 },
  { q: "の", options:["no","na","ni","nu"], answer:"no", time:15 },
  { q: "は", options:["ha","hi","fu","he"], answer:"ha", time:15 },
  { q: "ひ", options:["hi","ha","fu","he"], answer:"hi", time:15 },
  { q: "ふ", options:["fu","ha","hi","he"], answer:"fu", time:15 },
  { q: "へ", options:["he","ha","hi","fu"], answer:"he", time:15 },
  { q: "ほ", options:["ho","ha","hi","fu"], answer:"ho", time:15 },
  { q: "ば", options:["ba","ha","bi","be"], answer:"ba", time:15 },
  { q: "び", options:["bi","hi","ba","be"], answer:"bi", time:15 },
  { q: "ぶ", options:["bu","fu","ba","bi"], answer:"bu", time:15 },
  { q: "べ", options:["be","he","ba","bi"], answer:"be", time:15 },
  { q: "ぼ", options:["bo","ho","ba","be"], answer:"bo", time:15 },
  { q: "ぱ", options:["pa","ha","pi","pe"], answer:"pa", time:15 },
  { q: "ぴ", options:["pi","hi","pa","pe"], answer:"pi", time:15 },
  { q: "ぷ", options:["pu","fu","pa","pi"], answer:"pu", time:15 },
  { q: "ぺ", options:["pe","he","pa","pi"], answer:"pe", time:15 },
  { q: "ぽ", options:["po","ho","pa","pe"], answer:"po", time:15 },
  { q: "ま", options:["ma","mi","mu","me"], answer:"ma", time:15 },
  { q: "み", options:["mi","ma","mu","me"], answer:"mi", time:15 },
  { q: "む", options:["mu","ma","mi","me"], answer:"mu", time:15 },
  { q: "め", options:["me","ma","mi","mu"], answer:"me", time:15 },
  { q: "も", options:["mo","ma","mi","mu"], answer:"mo", time:15 },
  { q: "や", options:["ya","yu","yo","yi"], answer:"ya", time:15 },
  { q: "ゆ", options:["yu","ya","yo","yi"], answer:"yu", time:15 },
  { q: "よ", options:["yo","ya","yu","yi"], answer:"yo", time:15 },
  { q: "ら", options:["ra","ri","ru","re"], answer:"ra", time:15 },
  { q: "り", options:["ri","ra","ru","re"], answer:"ri", time:15 },
  { q: "る", options:["ru","ra","ri","re"], answer:"ru", time:15 },
  { q: "れ", options:["re","ra","ri","ru"], answer:"re", time:15 },
  { q: "ろ", options:["ro","ra","ri","ru"], answer:"ro", time:15 },
  { q: "わ", options:["wa","wo","wi","we"], answer:"wa", time:15 },
  { q: "を", options:["wo","wa","wi","we"], answer:"wo", time:15 },
  { q: "ん", options:["n","m","nn","na"], answer:"n", time:15 },

  // MEDIUM: 25 vocab with small tsu, small ya/yu/yo, dakuten/maru
  { q: "はっぱ", options:["happa","hapa","haapa","hapaa"], answer:"happa", time:20 },
  { q: "がっこう", options:["gakkou","gakou","gakkuo","gakko"], answer:"gakkou", time:25 },
  { q: "きょうし", options:["kyoushi","kyoshi","kyousi","kyushi"], answer:"kyoushi", time:25 },
  { q: "みゃく", options:["myaku","miyaku","myaaku","miyakuu"], answer:"myaku", time:20 },
  { q: "ちょきん", options:["chokin","choukin","chukin","choken"], answer:"chokin", time:20 },
  { q: "しゅくだい", options:["shukudai","shukudoi","shuukudai","shukudao"], answer:"shukudai", time:25 },
  { q: "びょういん", options:["byouin","byuin","byoin","byouinn"], answer:"byouin", time:25 },
  { q: "にっき", options:["nikki","niki","niikki","naki"], answer:"nikki", time:20 },
  { q: "りゅうがく", options:["ryuugaku","ryugaku","ryougaku","ryagaku"], answer:"ryuugaku", time:25 },
  { q: "ちょこれと", options:["chokoreto","chokkoreto","choukoreto","chokoretou"], answer:"chokoreto", time:25 },
  { q: "しょっき", options:["shokki","shoki","shukki","shakki"], answer:"shokki", time:25 },
  { q: "じゃがいも", options:["jagaimo","jyagaimo","jageimo","jugaimo"], answer:"jagaimo", time:25 },
  { q: "ぎゅうにゅう", options:["gyuunyuu","gyuunyu","gyunyuu","gyunyu"], answer:"gyuunyuu", time:25 },
  { q: "ぴあの", options:["piano","pieno","piuno","piino"], answer:"piano", time:20 },
  { q: "きゃく", options:["kyaku","kaku","kyoku","kyako"], answer:"kyaku", time:25 },
  { q: "ひゃく", options:["hyaku","hiyaku","hyakuu","hyakuu"], answer:"hyaku", time:25 },
  { q: "にゅうがく", options:["nyuugaku","nyugaku","nyuugakuu","nyugakuu"], answer:"nyuugaku", time:25 },
  { q: "しゅうまつ", options:["shuumatsu","shumatsuu","shumatsu","shumaatu"], answer:"shuumatsu", time:30 },
  { q: "ちゃわん", options:["chawan","chaawan","chawann","chiyawan"], answer:"chawan", time:25 },
  { q: "きょうかしょ", options:["kyoukasho","kyoukasyo","kyokasho","kyoukashou"], answer:"kyoukasho", time:30 },
  { q: "びょういんまえ", options:["byouinmae","byoinmae","byuuinmae","byouinmaa"], answer:"byouinmae", time:30 },
  { q: "がっき", options:["gakki","gaki","gaaki","gakkii"], answer:"gakki", time:25 },
  { q: "しんぶん", options:["shinbun","shinbuun","shinpun","shinfun"], answer:"shinbun", time:25 },
  { q: "にほんご", options:["nihongo","nihonko","nibongo","nipongo"], answer:"nihongo", time:25 },
  { q: "おんがく", options:["ongaku","ongakuu","onkaku","ongagu"], answer:"ongaku", time:25 },

  // HARD: 25 tricky vocab longer words
  { q: "ちゅうしゃじょう", options:["chuushajou","chuushajo","chuushajyo","chuushajiyou"], answer:"chuushajou", time:35 },
  { q: "りゅうがくせい", options:["ryuugakusei","ryugakusei","ryuukakusei","riyuugakusei"], answer:"ryuugakusei", time:40 },
  { q: "がっこうせい", options:["gakkousei","gakkosei","gaggousei","gakkouse"], answer:"gakkousei", time:40 },
  { q: "しょうがっこう", options:["shougakkou","shougakko","shoukakkou","shogakkou"], answer:"shougakkou", time:40 },
  { q: "ちゅうがっこう", options:["chuugakkou","chuugakou","chugakkou","chuukakkou"], answer:"chuugakkou", time:40 },
  { q: "きょうしつ", options:["kyoushitsu","kyositsu","kyoshitsu","kiyoushitsu"], answer:"kyoushitsu", time:35 },
  { q: "りょこう", options:["ryokou","ryoko","riyokou","ryoukou"], answer:"ryokou", time:35 },
  { q: "しゃしん", options:["shashin","syashin","shasin","shiyashin"], answer:"shashin", time:35 },
  { q: "しゅくだい", options:["shukudai","shukudoi","shukutai","shukudao"], answer:"shukudai", time:35 },
  { q: "きゅうこう", options:["kyuukou","kyukou","gyuukou","giyuukou"], answer:"kyuukou", time:35 },
  { q: "ちょうこく", options:["choukoku","chokoku","joukoku","chougoku"], answer:"choukoku", time:40 },
  { q: "にゅうがくしき", options:["nyuugakushiki","nyugakushiki","nyuukakushiki","nyuugagushiki"], answer:"nyuugakushiki", time:40 },
  { q: "きょうしゅう", options:["kyoushuu","kyoshuu","kyoushu","kyoushiyuu"], answer:"kyoushuu", time:35 },
  { q: "ちょうなん", options:["chounan","jonan","chiyounan","chonan"], answer:"chounan", time:35 },
  { q: "しゃかい", options:["shakai","syakai","shiyakai","shagai"], answer:"shakai", time:35 },
  { q: "しゅじんこう", options:["shujinkou","shujinko","shushinkou","shuujinkou"], answer:"shujinkou", time:40 },
  { q: "りょかん", options:["ryokan","ryoukan","riyokan","ryoken"], answer:"ryokan", time:35 },
  { q: "ぎゅうにゅう", options:["gyuunyuu","gyuunyu","giyuunyuu","gyunyuu"], answer:"gyuunyuu", time:35 },
  { q: "にっき", options:["nikki","niki","nitsuki","niiki"], answer:"nikki", time:35 },
  { q: "しょうせつ", options:["shousetsu","shosetsu","shousee","shiyousetsu"], answer:"shousetsu", time:35 },
  { q: "きょうと", options:["kyouto","kyoto","kiyouto","kyoutou"], answer:"kyouto", time:35 },
  { q: "しゃかいがく", options:["shakaigaku","syakaigaku","shakaikaku","shiyakaigaku"], answer:"shakaigaku", time:40 },
  { q: "ちょうど", options:["choudo","chodo","choudou","chiyoudo"], answer:"choudo", time:35 },
  { q: "にほんてき", options:["nihonteki","nihondeki","nibonteki","nihontekki"], answer:"nihonteki", time:35 },
  { q: "しゅじん", options:["shujin","shuujin","shushin","shiyujin"], answer:"shujin", time:35 }
];

// ========== KATAKANA QUESTIONS ========== //

const katakanaQuestions = [
  // EASY: Basic ア～ン + dakuten/handakuten
  { q: "ア", options:["あ","い","う","え"], answer:"あ", time:15 },
  { q: "イ", options:["い","え","あ","お"], answer:"い", time:15 },
  { q: "ウ", options:["う","あ","い","え"], answer:"う", time:15 },
  { q: "エ", options:["え","い","う","あ"], answer:"え", time:15 },
  { q: "オ", options:["お","う","あ","え"], answer:"お", time:15 },
  { q: "カ", options:["か","き","く","け"], answer:"か", time:15 },
  { q: "キ", options:["き","か","く","け"], answer:"き", time:15 },
  { q: "ク", options:["く","け","か","き"], answer:"く", time:15 },
  { q: "ケ", options:["け","く","か","き"], answer:"け", time:15 },
  { q: "コ", options:["こ","く","か","け"], answer:"こ", time:15 },
  { q: "ガ", options:["が","か","ぎ","け"], answer:"が", time:15 },
  { q: "ギ", options:["ぎ","き","が","け"], answer:"ぎ", time:15 },
  { q: "グ", options:["ぐ","く","が","げ"], answer:"ぐ", time:15 },
  { q: "ゲ", options:["げ","け","が","ぎ"], answer:"げ", time:15 },
  { q: "ゴ", options:["ご","こ","が","げ"], answer:"ご", time:15 },
  { q: "サ", options:["さ","し","す","せ"], answer:"さ", time:15 },
  { q: "シ", options:["し","さ","す","せ"], answer:"し", time:15 },
  { q: "ス", options:["す","さ","し","せ"], answer:"す", time:15 },
  { q: "セ", options:["せ","さ","し","す"], answer:"せ", time:15 },
  { q: "ソ", options:["そ","さ","し","す"], answer:"そ", time:15 },
  { q: "ザ", options:["ざ","さ","し","ず"], answer:"ざ", time:15 },
  { q: "ジ", options:["じ","し","じ","ず"], answer:"じ", time:15 },
  { q: "ズ", options:["ず","す","ぶ","ぐ"], answer:"ず", time:15 },
  { q: "ゼ", options:["ぜ","せ","ざ","ら"], answer:"ぜ", time:15 },
  { q: "ゾ", options:["ぞ","そ","ん"], answer:"ぞ", time:15 },
  { q: "タ", options:["た","ち","つ","て"], answer:"た", time:15 },
  { q: "チ", options:["ち","た","つ","て"], answer:"ち", time:15 },
  { q: "ツ", options:["つ","た","ち","て"], answer:"つ", time:15 },
  { q: "テ", options:["て","た","ち","つ"], answer:"て", time:15 },
  { q: "ト", options:["と","た","ち","つ"], answer:"と", time:15 },
  { q: "ダ", options:["だ","た","じ","ず"], answer:"だ", time:15 },
  { q: "ヂ", options:["じ","ぢ","ち","で"], answer:"じ", time:15 },
  { q: "ヅ", options:["ず","づ","つ","す"], answer:"ず", time:15 },
  { q: "デ", options:["で","て","だ","ぢ"], answer:"で", time:15 },
  { q: "ド", options:["ど","と","だ","で"], answer:"ど", time:15 },
  { q: "ナ", options:["な","に","ぬ","ね"], answer:"な", time:15 },
  { q: "ニ", options:["に","な","ぬ","ね"], answer:"に", time:15 },
  { q: "ヌ", options:["ぬ","な","に","ね"], answer:"ぬ", time:15 },
  { q: "ネ", options:["ね","な","に","ぬ"], answer:"ね", time:15 },
  { q: "ノ", options:["の","な","に","ぬ"], answer:"の", time:15 },
  { q: "ハ", options:["は","ひ","ふ","へ"], answer:"は", time:15 },
  { q: "ヒ", options:["ひ","は","ふ","へ"], answer:"ひ", time:15 },
  { q: "フ", options:["ふ","は","ひ","へ"], answer:"ふ", time:15 },
  { q: "ヘ", options:["へ","は","ひ","ふ"], answer:"へ", time:15 },
  { q: "ホ", options:["ほ","は","ひ","ふ"], answer:"ほ", time:15 },
  { q: "バ", options:["ば","は","び","べ"], answer:"ば", time:15 },
  { q: "ビ", options:["び","ひ","ば","べ"], answer:"び", time:15 },
  { q: "ブ", options:["ぶ","ふ","ば","び"], answer:"ぶ", time:15 },
  { q: "ベ", options:["べ","へ","ば","び"], answer:"べ", time:15 },
  { q: "ボ", options:["ぼ","ほ","ば","べ"], answer:"ぼ", time:15 },
  { q: "パ", options:["ぱ","は","ぴ","ぺ"], answer:"ぱ", time:15 },
  { q: "ピ", options:["ぴ","ひ","ぱ","ぺ"], answer:"ぴ", time:15 },
  { q: "プ", options:["ぷ","ふ","ぱ","ぴ"], answer:"ぷ", time:15 },
  { q: "ペ", options:["ぺ","へ","ぱ","ぴ"], answer:"ぺ", time:15 },
  { q: "ポ", options:["ぽ","ほ","ぱ","ぺ"], answer:"ぽ", time:15 },
  { q: "マ", options:["ま","み","む","め"], answer:"ま", time:15 },
  { q: "ミ", options:["み","ま","む","め"], answer:"み", time:15 },
  { q: "ム", options:["む","ま","み","め"], answer:"む", time:15 },
  { q: "メ", options:["め","ま","み","む"], answer:"め", time:15 },
  { q: "モ", options:["も","ま","み","む"], answer:"も", time:15 },
  { q: "ヤ", options:["や","ゆ","よ","い"], answer:"や", time:15 },
  { q: "ユ", options:["ゆ","や","よ","い"], answer:"ゆ", time:15 },
  { q: "ヨ", options:["よ","や","ゆ","い"], answer:"よ", time:15 },
  { q: "ラ", options:["ら","り","る","れ"], answer:"ら", time:15 },
  { q: "リ", options:["り","ら","る","れ"], answer:"り", time:15 },
  { q: "ル", options:["る","ら","り","れ"], answer:"る", time:15 },
  { q: "レ", options:["れ","ら","り","る"], answer:"れ", time:15 },
  { q: "ロ", options:["ろ","ら","り","る"], answer:"ろ", time:15 },
  { q: "ワ", options:["わ","を","うぃ","うぇ"], answer:"わ", time:15 },
  { q: "ヲ", options:["を","わ","うぃ","うぇ"], answer:"を", time:15 },
  { q: "ン", options:["ん","な","む","に"], answer:"ん", time:15 },

  // MEDIUM & HARD: 25 new vocab, Katakana, answers in Hiragana
  { q: "コンピューター", options:["こんぴゅーたー","こんぴゅたー","こんぴゅーた","こんぴゅた"], answer:"こんぴゅーたー", time:30 },
  { q: "テレビ", options:["てれび","てれひ","でれび","てれべ"], answer:"てれび", time:25 },
  { q: "アイスクリーム", options:["あいすくりーむ","あいずくりーむ","あいすくりむ","あいすぐりーむ"], answer:"あいすくりーむ", time:30 },
  { q: "チョコレート", options:["ちょこれーと","ちょこれと","ちよこれーと","ちょごれーと"], answer:"ちょこれーと", time:25 },
  { q: "バス", options:["ばす","ばず","はす","はず"], answer:"ばす", time:20 },
  { q: "タクシー", options:["たくしー","たぐしー","だくしー","たくじー"], answer:"たくしー", time:25 },
  { q: "レストラン", options:["れすとらん","れずとらん","れすとれん","れすどらん"], answer:"れすとらん", time:25 },
  { q: "ゲーム", options:["げーむ","けーむ","げむ","げーめ"], answer:"げーむ", time:20 },
  { q: "スマートフォン", options:["すまーとふぉん","ずまーとふぉん","すまーとふぁん","すまーどふぉん"], answer:"すまーとふぉん", time:30 },
  { q: "ホテル", options:["ほてる","ほでる","ほてろ","ぼてる"], answer:"ほてる", time:25 },
  { q: "コンビニ", options:["こんびに","こんひに","ごんびに","こんぴに"], answer:"こんびに", time:25 },
  { q: "カメラ", options:["かめら","かぬら","がめら","からら"], answer:"かめら", time:25 },
  { q: "パン", options:["ぱん","はん","ばん","ぺん"], answer:"ぱん", time:20 },
  { q: "コーヒー", options:["こーひー","ごーひー","こーびー","こひ"], answer:"こーひー", time:25 },
  { q: "タオル", options:["たおる","たある","たおろ","だおる"], answer:"たおる", time:25 },
  { q: "ジュース", options:["じゅーす","じゅす","じゅーず","しゅゅーす"], answer:"じゅーす", time:25 },
  { q: "サッカー", options:["さっかー","さつかー","ざっかー","さっがー"], answer:"さっかー", time:25 },
  { q: "スキー", options:["すきー","すき","ずぎー","すぎー"], answer:"すきー", time:20 },
  { q: "ミルク", options:["みるく","みろく","みるぐ","みるげ"], answer:"みるく", time:25 },
  { q: "カレー", options:["かれー","かれ","がれー","かるー"], answer:"かれー", time:25 },
  { q: "ビール", options:["びーる","びーろ","ひーる","びーれ"], answer:"びーる", time:25 },
  { q: "サラダ", options:["さらだ","ざらだ","さらた","さっだ"], answer:"さらだ", time:25 },
  { q: "チーズ", options:["ちーず","ちーす","ちず","ぢーず"], answer:"ちーず", time:25 },
  { q: "バナナ", options:["ばなな","はなな","ばんなな","ばな"], answer:"ばなな", time:25 },
  { q: "アイス", options:["あいす","あいず","あいっす","あいすー"], answer:"あいす", time:25 },

  //HARD
  { q: "キャッチャー", options:["きゃっちゃー","きゃちゃー","きゃっちやー","きゃっちや"], answer:"きゃっちゃー", time:35 },
  { q: "シューティング", options:["しゅーてぃんぐ","しゅーちんぐ","しゅーていんぐ","しゅてぃんぐ"], answer:"しゅーてぃんぐ", time:40 },
  { q: "ミュージカル", options:["みゅーじかる","みゅじかる","みゅーしかる","みゅーじがる"], answer:"みゅーじかる", time:35 },
  { q: "ピッキング", options:["ぴっきんぐ","ぴきんぐ","ぴっぎんぐ","ひっきんぐ"], answer:"ぴっきんぐ", time:30 },
  { q: "リュックサック", options:["りゅっくさっく","りゅくさっく","りゅっくさく","りゅっぐさっく"], answer:"りゅっくさっく", time:35 },
  { q: "チョコレート", options:["ちょこれーと","ちょこれと","ちょごれーと","ちょこれーど"], answer:"ちょこれーと", time:30 },
  { q: "ハンバーガー", options:["はんばーがー","はんばがー","はんばーが","ばんばーがー"], answer:"はんばーがー", time:30 },
  { q: "トッポギ", options:["とっぽぎ","とぽぎ","とっぺぎ","とっぽき"], answer:"とっぽぎ", time:25 },
  { q: "ゲームセンター", options:["げーむせんたー","げーむせんた","げーむぜんたー","けーむせんたー"], answer:"げーむせんたー", time:35 },
  { q: "カラオケ", options:["からおけ","からおげ","がらおけ","からおおけ"], answer:"からおけ", time:25 },
  { q: "パンケーキ", options:["ぱんけーき","ぱんけき","ぱんげーき","ぱんけーぎ"], answer:"ぱんけーき", time:30 },
  { q: "リサイクル", options:["りさいくる","りざいくる","りさいぐる","りさいくろ"], answer:"りさいくる", time:30 },
  { q: "キャラクター", options:["きゃらくたー","きやらくたー","きゃらぐたー","きゃらくだー"], answer:"きゃらくたー", time:35 },
  { q: "ジュース", options:["じゅーす","じゅす","じゅーず","しゅゅーす"], answer:"じゅーす", time:25 },
  { q: "ハッピーバースデー", options:["はっぴーばーすでー","はっぴーばーすで","はっぴーばーすてー","はっぴーばーずでー"], answer:"はっぴーばーすでー", time:40 },
  { q: "コンサート", options:["こんさーと","こんざーと","こんさっと","こんさーど"], answer:"こんさーと", time:30 },
  { q: "ショッピング", options:["しょっぴんぐ","しょぴんぐ","しよっぴんぐ","じょっぴんぐ"], answer:"しょっぴんぐ", time:35 },
  { q: "ピアノ", options:["ぴあの","ひあの","ぴあな","ぴああの"], answer:"ぴあの", time:25 },
  { q: "チャンス", options:["ちゃんす","ちやんす","ちゃんず","ぢゃんす"], answer:"ちゃんす", time:25 },
  { q: "ゲームボーイ", options:["げーむぼーい","げーむぼい","げむぼーい","げーむほーい"], answer:"げーむぼーい", time:35 },
  { q: "スーパーマーケット", options:["すーぱーまーけっと","すーぱーまーけと","すーぱーまーけつと","すーぱーまーげっと"], answer:"すーぱーまーけっと", time:40 },
  { q: "キャンパス", options:["きゃんぱす","きやんぱす","きゃんはす","きゃんぱず"], answer:"きゃんぱす", time:30 },
  { q: "ラジオ", options:["らじお","らしお","らじあ","らじおー"], answer:"らじお", time:25 },
  { q: "ビデオ", options:["びでお","ひでお","びてお","びであ"], answer:"びでお", time:25 },
  { q: "タクシー", options:["たくしー","たくし","たぐしー","たくじー"], answer:"たくしー", time:30 }
  ];

// ========== KANJI QUESTIONS ========== //
const kanjiQuestions = [
  { q: "日", options:["sun","moon","fire","water"], answer:"sun", time:20 },
  { q: "月", options:["moon","sun","fire","water"], answer:"moon", time:20 },
  { q: "火", options:["fire","water","tree","earth"], answer:"fire", time:20 },
  { q: "水", options:["water","fire","earth","gold"], answer:"water", time:20 },
  { q: "木", options:["tree","fire","water","earth"], answer:"tree", time:20 },
  { q: "金", options:["gold","tree","fire","earth"], answer:"gold", time:20 },
  { q: "土", options:["earth","gold","fire","water"], answer:"earth", time:20 },
  { q: "山", options:["mountain","river","field","tree"], answer:"mountain", time:25 },
  { q: "川", options:["river","mountain","field","tree"], answer:"river", time:25 },
  { q: "田", options:["rice field","river","mountain","tree"], answer:"rice field", time:25 },
  { q: "人", options:["person","child","man","woman"], answer:"person", time:20 },
  { q: "口", options:["mouth","eye","ear","hand"], answer:"mouth", time:20 },
  { q: "目", options:["eye","mouth","ear","hand"], answer:"eye", time:20 },
  { q: "耳", options:["ear","eye","mouth","hand"], answer:"ear", time:20 },
  { q: "手", options:["hand","foot","eye","mouth"], answer:"hand", time:20 },
  { q: "足", options:["foot","hand","eye","mouth"], answer:"foot", time:20 },
  { q: "見", options:["see","go","come","eat"], answer:"see", time:25 },
  { q: "行", options:["go","come","see","eat"], answer:"go", time:25 },
  { q: "来", options:["come","go","see","eat"], answer:"come", time:25 },
  { q: "食", options:["eat","drink","see","go"], answer:"eat", time:25 },
  { q: "飲", options:["drink","eat","see","go"], answer:"drink", time:25 },
  { q: "学", options:["study","school","learn","read"], answer:"study", time:25 },
  { q: "校", options:["school","study","learn","read"], answer:"school", time:25 },
  { q: "生", options:["life","birth","study","school"], answer:"life", time:25 },
  { q: "先", options:["before","after","next","previous"], answer:"before", time:25 },
  { q: "名", options:["name","person","place","thing"], answer:"name", time:25 },
  { q: "女", options:["woman","man","child","person"], answer:"woman", time:25 },
  { q: "男", options:["man","woman","child","person"], answer:"man", time:25 },
  { q: "子", options:["child","man","woman","person"], answer:"child", time:25 },
  { q: "小", options:["small","big","middle","long"], answer:"small", time:20 },
  { q: "中", options:["middle","small","big","short"], answer:"middle", time:20 },
  { q: "大", options:["big","small","middle","long"], answer:"big", time:20 },
  { q: "上", options:["up","down","left","right"], answer:"up", time:20 },
  { q: "下", options:["down","up","left","right"], answer:"down", time:20 },
  { q: "左", options:["left","right","up","down"], answer:"left", time:20 },
  { q: "右", options:["right","left","up","down"], answer:"right", time:20 },
  { q: "入", options:["enter","exit","up","down"], answer:"enter", time:20 },
  { q: "出", options:["exit","enter","up","down"], answer:"exit", time:20 },
  { q: "本", options:["book","origin","tree","person"], answer:"book", time:25 },
  { q: "円", options:["yen","circle","money","coin"], answer:"yen", time:25 },
  { q: "車", options:["car","train","bus","bicycle"], answer:"car", time:25 },
  { q: "門", options:["gate","door","window","road"], answer:"gate", time:25 },
  { q: "雨", options:["rain","snow","wind","cloud"], answer:"rain", time:25 },
  { q: "天", options:["sky","earth","sun","moon"], answer:"sky", time:25 },
  { q: "今", options:["now","later","before","next"], answer:"now", time:25 },
  { q: "気", options:["air","water","fire","earth"], answer:"air", time:25 },
  { q: "午", options:["noon","morning","evening","night"], answer:"noon", time:25 },
  { q: "書", options:["write","read","study","speak"], answer:"write", time:25 },
  { q: "時", options:["time","hour","minute","second"], answer:"time", time:25 },
  { q: "分", options:["minute","hour","second","day"], answer:"minute", time:25 },
  { q: "半", options:["half","whole","quarter","part"], answer:"half", time:25 }
  ];

  // ========== UTILITY FUNCTIONS ========== //
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

    // Shuffle options before displaying
    const shuffledOptions = shuffle([...q.options]);

    shuffledOptions.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.className = 'option-btn';
      btn.onclick = () => checkAnswer(opt);
      optionsEl.appendChild(btn);
    });

    // Update progress bar
    progressEl.value = (currentIndex / currentQuiz.length) * 100;

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

// Sakura Petals Animation
const body = document.body;

function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('sakura-petal');
    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.animationDuration = 5 + Math.random() * 5 + 's';
    petal.style.opacity = 0.7 + Math.random() * 0.3;
    body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 10000);
}

setInterval(createPetal, 300);

// ========== MUSIC ========== //
const music = document.getElementById('bg-music');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const volumeControl = document.getElementById('volume-control');
const togglePlayer = document.getElementById('toggle-player');
const musicPlayer = document.getElementById('music-player');

playBtn.addEventListener('click', () => {
    music.play();
});

pauseBtn.addEventListener('click', () => {
    music.pause();
});

volumeControl.addEventListener('input', (e) => {
    music.volume = e.target.value;
});

togglePlayer.addEventListener('click', () => {
    musicPlayer.classList.toggle('expanded');
});

// ========== EVENT LISTENERS ========== 
document.querySelector('#hiragana-btn').addEventListener('click',()=>startQuiz('hiragana'));
document.querySelector('#katakana-btn').addEventListener('click',()=>startQuiz('katakana'));
document.querySelector('#kanji-btn').addEventListener('click',()=>startQuiz('kanji'));
