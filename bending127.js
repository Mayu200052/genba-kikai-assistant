(()=>{'use strict';
const finite=(...x)=>x.every(Number.isFinite);
function bend90(d,r,a,b,basis='center'){
 if(!finite(d,r,a,b)||d<=0||r<=d/2||a<=0||b<=0)throw Error('外径・寸法は正数、芯Rは外径の半分より大きい値を入力してください。');
 if(!['center','outside','inside'].includes(basis))throw Error('寸法基準を選んでください。');
 const A=a+(basis==='outside'?-d/2:basis==='inside'?d/2:0),T=r,arc=Math.PI*r/2;
 if(A<=r||b<=r)throw Error('芯寸法A・Bは芯Rより大きくしてください。曲げ前後に直管部が必要です。');
 return {A,B:b,T,arc,start:A-r,end:A-r+arc,tail:b-r,gain:2*r-arc,length:A+b-2*r+arc};
}
function offset(h,r,deg){
 if(!finite(h,r,deg)||h<=0||r<=0||deg<=0||deg>=90)throw Error('段差・芯Rは正数、角度は0°より大きく90°未満で入力してください。');
 const rad=deg*Math.PI/180,t=r*Math.tan(rad/2),vertices=h/Math.sin(rad),straight=vertices-2*t;
 if(straight<=0)throw Error('この段差・角度・芯Rでは曲げ間の直管部が確保できません。');
 return {t,vertices,straight,run:h/Math.tan(rad),totalRun:h/Math.tan(rad)+2*t,arc:r*rad,startSpacing:r*rad+straight,length:2*r*rad+straight};
}
window.GenbaBending127={bend90,offset};
const diagram=(label,body)=>`<svg viewBox="0 0 620 330" role="img" aria-label="${label}"><g font-family="sans-serif" font-size="18" fill="#17364b">${body}</g></svg>`;
const ninety=diagram('90度配管の芯寸法AとB、交点V、接点T1とT2、芯Rの関係',`
<path d="M50 250H350V50" fill="none" stroke="#6d8190" stroke-dasharray="6 5" stroke-width="2"/>
<path d="M50 250H260A90 90 0 0 0 350 160V50" fill="none" stroke="#97bfd9" stroke-width="18"/>
<path d="M50 250H260A90 90 0 0 0 350 160V50" fill="none" stroke="#205d86" stroke-width="3"/>
<path d="M50 292H350M50 283V300M350 283V300M405 50V250M396 50H414M396 250H414M260 160V250" stroke="#17364b" fill="none" stroke-width="2"/>
<circle cx="350" cy="250" r="5" fill="#c45d23"/><circle cx="260" cy="250" r="5"/><circle cx="350" cy="160" r="5"/>
<text x="130" y="320">芯寸法 A（端→V）</text><text x="425" y="130">芯寸法 B</text><text x="425" y="155">（V→端）</text><text x="355" y="275">V：仮想交点</text><text x="225" y="280">T1</text><text x="365" y="182">T2</text><text x="211" y="199">芯R</text><text x="45" y="220">基準端</text><text x="55" y="45">T1・T2＝直線と円弧の接点</text><text x="55" y="73">A−R：基準端から曲げ始め</text>`);
const marks=diagram('まっすぐな管へのけがき印：幾何学的な曲げ始めと完成寸法の印を区別',`
<path d="M45 140H565" stroke="#98bed7" stroke-width="24"/>
<path d="M45 113V170M245 110V173M355 110V173" stroke="#1e5b83" stroke-width="3"/>
<path d="M45 220H245M45 211V229M245 211V229M45 265H355M45 256V274M355 256V274" stroke="#17364b" fill="none" stroke-width="2"/>
<text x="30" y="98">基準端</text><text x="195" y="65">接点基準の印</text><text x="205" y="92">A−R</text><text x="365" y="65">完成芯寸法の印</text><text x="395" y="92">A</text><text x="108" y="211">曲げ始め</text><text x="110" y="298">専用目盛に合わせる印は機種で異なる</text>`);
const off=diagram('同じ角度で逆方向に2回曲げるオフセット。芯段差Hと交点間V',`
<path d="M45 250H160L400 80H565" fill="none" stroke="#879baa" stroke-dasharray="6 5" stroke-width="2"/>
<path d="M45 250H135Q160 250 183 234L377 96Q400 80 425 80H565" fill="none" stroke="#79a8c9" stroke-width="14"/>
<path d="M580 80V250M570 80H590M570 250H590M170 286H400M170 278V294M400 278V294" stroke="#17364b" stroke-width="2"/>
<text x="545" y="175">H</text><text x="240" y="175">直管 S</text><text x="175" y="317">交点間の前進量 X</text><text x="68" y="208">＋θ</text><text x="430" y="125">−θ</text><text x="40" y="30">点線の角＝仮想交点（実際の管は円弧）</text><text x="40" y="58">2つの曲げは同じ芯R・同じ角度</text>`);
document.addEventListener('DOMContentLoaded',()=>{
const s=document.createElement('section');s.id='bending127';s.className='card bending127';
s.innerHTML=`<h2>🔧 配管曲げ加工｜寸法取り・ベンダーへの合わせ方</h2>
<p>図面の寸法基準を決め、芯寸法へ換算 → 曲げ半径を確認 → けがき → 機種の合わせマークへ配置 → 曲げ後に測定、の順で進めます。寸法・長さの単位はmmです。</p>
<p class="bendNotice127">対象は、使用するベンダーが対応する金属管の冷間曲げです。A呼称だけで工具を選ばず、実外径・材質・肉厚・金型の適合を確認してください。高圧管を曲げられるかどうかは、この寸法計算だけでは判定できません。</p>
<details open><summary>① 図面のどこを測るか</summary>${ninety}
<ul><li><b>芯寸法：</b>管の中心線同士が交わる仮想交点Vまで。丸く曲がった管の表面にはVはありません。直管部に定規を当て、中心線を延長して考えます。</li><li><b>外側・内側寸法：</b>90°の相手側直管の遠い外面までなら芯寸法＝測定寸法−外径/2。近い内面までなら芯寸法＝測定寸法＋外径/2。斜めの曲げや別の測定方向にはそのまま使えません。</li><li><b>芯R：</b>管の中心線の曲げ半径。内側Rなら芯R＝内側R＋外径/2、外側Rなら芯R＝外側R−外径/2。金型に書かれたRの定義を取扱説明書で確認します。</li><li><b>継手付き：</b>配管端・継手端面・シール面のどこが図面基準かを確認。差込み長さや必要な直管長は継手ごとに違います。下の計算は管端から管端で、差込み補正・切断余長は含みません。</li></ul></details>
<h3>② 90°曲げ：寸法を入力してけがき位置を確認</h3>
<p>模式図のA・Bを入力します。Aのみ「外側まで／内側まで」から換算できます。Bは必ず芯寸法を入力してください。</p>
<div class="bendGrid127">
<label>管の実外径 D<input id="bendD127" type="number" step="any" inputmode="decimal" value="10"></label>
<label>金型の芯R<input id="bendR127" type="number" step="any" inputmode="decimal" value="30"></label>
<label>Aの寸法基準<select id="bendBasis127"><option value="center">管端→相手側直管の芯</option><option value="outside">管端→相手側直管の遠い外面</option><option value="inside">管端→相手側直管の近い内面</option></select></label>
<label>Aの寸法<input id="bendA127" type="number" step="any" inputmode="decimal" value="200"></label>
<label>Bの芯寸法（V→管端）<input id="bendB127" type="number" step="any" inputmode="decimal" value="150"></label>
<label>工具へ移す方法<select id="bendMethod127"><option value="none">未選択：幾何学寸法のみ</option><option value="ridgidL">RIDGID 600：基準が左／L</option><option value="ridgidR">RIDGID 600：基準が右／R</option><option value="swagelok">Swagelok 手動：基準端がラッチ左／90°</option><option value="tangent">説明書で確認済：曲げ始めの接点合わせ</option></select></label></div>
<button type="button" id="bendCalc127">90°曲げを計算</button><div id="bendResult127" class="bendResult127" aria-live="polite"></div>
${marks}<p>上の図の印は意味の違いを示した模式図です。<b>A−RとAを混同しない</b>でください。計算される「差引き量G」は切断長の計算用で、専用目盛に合わせる印から自動的に引く値ではありません。</p>
<details open><summary>③ ベンダーへ寸法を落とし込む具体例</summary>
<p><b>例：外径10、芯R30、A＝200、B＝150、90°。</b>曲げ始めT1は端から170、円弧長は47.12、理論切断長は337.12です。これは芯線上の幾何学値で、実加工の伸び・金型差・切断仕上げ代は別に扱います。</p>
<table><thead><tr><th>工具・方法</th><th>印と合わせ先（90°の例）</th></tr></thead><tbody>
<tr><td>RIDGID 600シリーズ</td><td>完成芯寸法200の位置に印。基準となる端が印の左にある配置はL、右はRへ合わせる。角度は可動部0線と型の90°で読む。</td></tr>
<tr><td>Swagelok 手動チューブベンダー</td><td>基準端がラッチの左になる配置で、完成芯寸法200の印をロールサポートの90°用マークへ。初期の0同士を確認し、曲げ角は可動0と銘板側目盛で読む。</td></tr>
<tr><td>接点合わせを指定する工具</td><td>説明書に「曲げ開始接点を合わせる」と明記された場合だけ、170の印をその接点基準へ。矢印・0・L・Rの意味は機種ごとに確認。</td></tr>
<tr><td>油圧押し曲げ／電動・NCベンダー</td><td>手動機のL・Rを流用しない。支持間隔・金型・クランプ直管長・送り原点・角度補正は専用手順による。下記の幾何学値は検討資料で、機械への直接入力値ではない。</td></tr></tbody></table>
<p>45°や逆向きセットでは印の定義・合わせ方が変わる機種があります。90°の表を流用しないでください。メーカー資料の該当型式・図の向きと実機を照合してから使います。</p></details>
<h3>④ オフセット：同一平面で逆向きに2回曲げる</h3>${off}
<p>障害物を避け、最後を元の管と平行に戻す形です。Hは芯同士の段差、θは1回分の曲げ角です。外側同士のすき間ではありません。</p>
<div class="bendGrid127"><label>芯段差 H<input id="offH127" type="number" step="any" inputmode="decimal" value="100"></label><label>2か所共通の芯R<input id="offR127" type="number" step="any" inputmode="decimal" value="30"></label><label>1回分の曲げ角 θ（°）<input id="offAngle127" type="number" step="any" inputmode="decimal" value="45"></label></div>
<button type="button" id="offCalc127">オフセットの幾何学寸法を計算</button><div id="offResult127" class="bendResult127" aria-live="polite"></div>
<details><summary>計算式と寸法の使い分け</summary><p>交点間距離V＝H/sinθ、接線長T＝R×tan(θ/2)、曲げ間の直管S＝V−2T。1か所の円弧長＝R×θ×π/180。Rを持つ2つの円弧と直管をつないだ芯線から算出します。</p><p>Vは仮想交点間の距離です。展開した直管上の曲げ開始接点間距離は「円弧長＋S」。両者を同じ値として、けがきや機械送りへ入力しないでください。工具専用の印はメーカーのオフセット手順で設定します。計算上Sが正でも工具のつかみ長さが足りない場合があります。</p><p>表示する展開長は第1曲げ始め〜第2曲げ終わりの区間だけです。前後の直管、継手差込み、切断余長を別途加えます。</p></details>
<details open><summary>⑤ 実作業の進め方・複数曲げ</summary><ol>
<li>図面に基準端、流れ方向、芯線、曲げ角・芯Rを記入。A・B呼称ではなく実外径と肉厚を確認します。</li>
<li>工具の適合管種・外径・肉厚を確認。継手の差込み部と工具がつかむ直管部を確保します。取り外し済み・無圧の材料で作業し、可動部へ指を入れません。</li>
<li>基準端から印を測り、管の周囲に見える線を付けます。曲げ方向は別の縦線や矢印で記録し、次の曲げで左右・表裏を取り違えないようにします。</li>
<li>工具の指定マークへ合わせ、保持状態を確認して徐々に曲げます。スプリングバックは材質・肉厚などで変わるので、余材で「負荷中の角度」と「外した後の角度」を測って補正量を決めます。一律の補正角は設定しません。</li>
<li>外してから角度、芯寸法、平面内の向き、潰れ・しわ・割れ・傷を確認。修正曲げを繰り返さず、不良品の扱いは設備・管材仕様に従います。</li>
<li>2回目以降は、どの交点・接点から測るかを図面に残します。立体配管は「送り・管の回転・曲げ角」を分けて記録。回転の時計方向は見る端を固定して記入します。機械座標への自動変換は本機能の対象外です。</li></ol>
<p><b>作業記録例：</b>管種／外径×肉厚／工具型式／金型芯R／基準端／曲げ順／合わせマーク／負荷中角度／取り外し後角度／仕上がり芯寸法。次回も同じ条件か確認します。</p></details>
<details><summary>寸法が合わないとき</summary><ul><li>脚がR分ずれる：芯交点と曲げ開始接点の混同を確認。</li><li>半径分ではなく外径の半分ずれる：芯・外面・内面の基準を確認。</li><li>2曲げ目からずれる：差引き量の二重補正、交点間と展開長の混同を確認。</li><li>ねじれる：基準縦線・管の回転方向・同一平面の保持を確認。</li><li>角度が戻る：外した後の測定値でスプリングバックを確認。</li><li>潰れ・しわ：適合肉厚、曲げR、金型と支持条件を確認。寸法が合っていても合格とは限りません。</li></ul></details>
<details><summary>出典・計算の範囲</summary><p>図は本アプリ独自の模式図です。長さ計算は円弧の芯線による理論値で、加工後寸法の保証ではありません。工具固有の操作は次の一次資料を参照。確認日：2026-10-06。</p><ul><li><a href="https://www.swagelok.com/downloads/webcatalogs/en/ms-13-43.pdf" target="_blank" rel="noopener">Swagelok Hand Tube Bender Manual（寸法取り・操作・曲げ戻り）</a></li><li><a href="https://cdn2.ridgid.com/resources/media?key=b63a46dd-d70a-4bd9-9058-f79ce74e0db8&languageCode=en&type=document" target="_blank" rel="noopener">RIDGID 600 Hand Tube Bender Instruction Sheet（L/Rマーク）</a></li><li><a href="https://edmontonsolutions.swagelok.com/blog/tube-bending-distance-between-bends-edv" target="_blank" rel="noopener">Swagelok：曲げ間の直管長と保持</a></li></ul><p>計算と図解は端末内で動作します。出典資料を開く場合のみ通信します。</p></details>`;
(document.getElementById('material60')||document.body.lastElementChild).before(s);
const $=id=>s.querySelector('#'+id),n=id=>{const v=$(id).value.trim();return v===''?NaN:Number(v)},f=v=>v.toFixed(2);
function calc90(){const out=$('bendResult127');try{const x=bend90(n('bendD127'),n('bendR127'),n('bendA127'),n('bendB127'),$('bendBasis127').value),m=$('bendMethod127').value;
 const target=m==='none'?'工具への合わせ位置は未選択です。型式と説明書を確認してください。':m==='tangent'?`接点合わせを確認した工具：端から${f(x.start)} mmの印を、指定の曲げ開始接点へ。`:`端から${f(x.A)} mmの印を、${m==='ridgidL'?'RIDGID 600のL':m==='ridgidR'?'RIDGID 600のR':'Swagelok手動機の90°用'}マークへ合わせます（上記の向き限定）。`;
 out.textContent=`換算後の芯寸法 A＝${f(x.A)} / B＝${f(x.B)} mm\n曲げ始めT1：基準端から ${f(x.start)} mm\n円弧長：${f(x.arc)} mm\n展開材上の曲げ終わりT2：基準端から ${f(x.end)} mm\n曲げ後の直管長：${f(x.tail)} mm\n差引き量G＝2R−円弧長：${f(x.gain)} mm\n理論切断長 A＋B−G：${f(x.length)} mm（余長・加工補正なし）\n\n${target}\n必要なつかみ長さ・継手直管長は別途確認してください。`;
 }catch(e){out.textContent=e.message}}
function calcOff(){const out=$('offResult127');try{const x=offset(n('offH127'),n('offR127'),n('offAngle127'));out.textContent=`仮想交点間 V：${f(x.vertices)} mm\n各接線長 T：${f(x.t)} mm\n曲げ間の直管 S：${f(x.straight)} mm\n交点間の前進量 X：${f(x.run)} mm\n第1曲げ始め→第2曲げ終わりの前進量：${f(x.totalRun)} mm\n1曲げの円弧長：${f(x.arc)} mm\n展開材上の曲げ開始接点間：${f(x.startSpacing)} mm\n2曲げ区間の展開長：${f(x.length)} mm（前後直管を含まない）\n\n幾何学値です。専用マークの間隔・機械送り量に直接流用しないでください。`;}catch(e){out.textContent=e.message}}
$('bendCalc127').addEventListener('click',calc90);$('offCalc127').addEventListener('click',calcOff);
for(const id of ['bendD127','bendR127','bendBasis127','bendA127','bendB127','bendMethod127'])$(id).addEventListener('input',()=>{$('bendResult127').textContent='入力を変更しました。「90°曲げを計算」を押してください。'});
for(const id of ['offH127','offR127','offAngle127'])$(id).addEventListener('input',()=>{$('offResult127').textContent='入力を変更しました。「オフセットの幾何学寸法を計算」を押してください。'});
calc90();calcOff();
});})();
