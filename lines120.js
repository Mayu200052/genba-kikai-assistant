/* Equipment diagrams are teaching schematics; order and optional machines vary by plant. */
(function(){
const sources={
 pickling:'https://www.primetals.com/en/portfolio/solutions/processing/pickling-lines/',
 annealing:'https://www.primetals.com/en/portfolio/solutions/processing/continuous-annealing-lines/',
 galvanizing:'https://www.primetals.com/en/news/erdemir-orders-continuous-galvanizing-line-from-primetals-technologies/',
 color:'https://tenova.com/technologies/colour-coating-line',
 tinning:'https://tenova.com/technologies/electro-tinning-tin-free-steel'
};
// name, short role, equipment explanation, observation point, icon
const lines=[
 ['picklingLine120','🧪 酸洗ライン｜熱延材のスケール除去','熱延コイルを酸洗し、冷延や表面処理の母材を作る代表構成。連続式とプッシュプル式では溶接・ルーパの有無が異なります。',sources.pickling,[
 ['アンコイラ・入側ピンチ','熱延コイルを巻き出す','コイルを保持し、先端を通板路へ導く。ピンチロールが板をつかんで送りを補助する。','先端姿勢、中心位置、巻き戻り防止。','coil'],
 ['切断・溶接（連続式）','コイルをつなぐ','前コイル尾端と次コイル先端を整え、溶接して連続した帯鋼にする。プッシュプル式では省く構成がある。','継ぎ目形状と通過条件。','shear'],
 ['入側ルーパ（連続式）','材料を一時蓄積','コイル交換中も酸洗槽を一定速度で走らせるため、帯鋼の長さを蓄える。','ループ残量、張力、蛇行。','loop'],
 ['スケールブレーカ','酸化皮膜を割る','張力と曲げで熱延スケールに割れを入れ、後段の酸洗を助ける。','ロール押込み、帯鋼形状、表面。','roll'],
 ['酸洗槽','酸化皮膜を溶かす','酸液中を通してスケールを除去する。槽方式、酸種、濃度、温度は設備仕様による。','槽温・濃度・速度、酸洗不足や過酸洗。','tank'],
 ['水洗・乾燥','酸液を除く','酸洗後の帯鋼を洗浄して液を持ち出さず、乾燥させる。','残液、乾燥状態、排水設備。','tank'],
 ['サイドトリマ・給油','端部と防錆を整える','必要に応じて耳を切り、防錆油を付ける。製品仕様で省略や位置変更がある。','耳幅、端部バリ、油量。','shear'],
 ['出側シャー・リコイラ','製品コイルにする','帯鋼を切り分けて巻き取り、結束・搬出する。','巻き姿、端面、表面傷。','coil']]],
 ['annealingLine120','♨️ 連続焼鈍ライン｜冷延材の材質調整','冷間圧延で硬くなった帯鋼を連続加熱・冷却し、要求される機械的性質を得る代表構成。',sources.annealing,[
 ['アンコイラ・溶接','帯鋼を連続供給','コイルを巻き出し、先尾端を接続して連続通板する。','継ぎ目、張力、中心。','coil'],
 ['入側ルーパ','交換時間を吸収','入口停止中も炉内の通板速度を保つための蓄積装置。','残量、蛇行、張力。','loop'],
 ['脱脂・洗浄','圧延油を除く','加熱前に油や付着物を洗い、炉内汚れと表面欠陥を抑える。','洗浄液、乾燥、残油。','tank'],
 ['加熱・均熱炉','組織を調整','多ゾーン炉で所定温度へ上げ、保持する。鋼種ごとに熱履歴が異なる。','板温、炉内雰囲気、張力。','furnace'],
 ['冷却・過時効','冷却履歴を制御','目標特性に合わせて冷却し、必要に応じ過時効処理を行う。','冷却の均一性、板形状。','furnace'],
 ['調質圧延・テンションレベラ','形状を整える','軽い圧延や張力下の曲げで形状・表面・材質特性を調整する構成例。','伸び率、平坦度、ロール痕。','roll'],
 ['検査・出側シャー・巻取','品質を確認し巻く','表面・寸法を検査し、製品単位に切って巻き取る。','傷位置、検査判定、巻き姿。','coil']]],
 ['galvanizingLine120','🪙 連続溶融亜鉛めっきライン｜耐食性付与','冷延帯鋼などに亜鉛系の被膜を付ける代表構成。合金化工程や後処理は製品別です。',sources.galvanizing,[
 ['二基アンコイラ・溶接','コイルを連続化','交互に巻き出し、先尾端を溶接して通板をつなぐ。','継ぎ目と板幅切替。','coil'],
 ['入側ルーパ・洗浄','連続運転と脱脂','蓄積長で交換を吸収し、表面の油・汚れを除く。','残量、洗浄状態。','loop'],
 ['焼鈍炉・スナウト','加熱し浴へ送る','材質を調整し、雰囲気を管理しながら溶融めっき浴へ導く。','炉温、板温、雰囲気。','furnace'],
 ['亜鉛ポット・シンクロール','溶融亜鉛を付着','帯鋼を浴中に通し、浸漬して両面に被膜を付ける。','浴温、浴面、ロール状態。','tank'],
 ['エアナイフ・冷却','付着量を調整','両面へ気体を吹き付けて被膜量を調整し、冷却する。','左右の付着量、エッジ厚み。','fan'],
 ['合金化炉（GAの場合）','被膜を合金化','GA材ではめっき後に加熱して鉄・亜鉛の合金層を形成する。GIでは通常通らない。','製品仕様と温度条件。','furnace'],
 ['調質圧延・レベラ・後処理','表面と形状を整える','必要に応じて軽圧延・矯正・化成処理などを行う。','表面傷、平坦度、処理量。','roll'],
 ['検査・給油・リコイラ','品質判定と巻取','表面検査後、必要な油を付けて巻き取る。','めっき傷、巻き姿、識別。','coil']]],
 ['colorLine120','🎨 カラー塗装ライン｜塗装鋼板','めっき鋼板などのコイルに前処理・塗装・焼付けを行う代表構成。片面・両面や塗膜系で設備が変わります。',sources.color,[
 ['アンコイラ・溶接・ルーパ','連続して供給','コイル交換時も塗装部の速度を保つため、先尾端をつなぎ長さを蓄える。','継ぎ目、張力、残量。','coil'],
 ['脱脂・洗浄・前処理','塗装下地を作る','油や汚れを除き、塗膜の密着に必要な化学前処理を施す。','洗浄状態、処理液。','tank'],
 ['プライマーコータ','下塗りを塗る','ロールコータなどで下塗り塗料を所定の膜厚に塗布する。','膜厚、幅方向のむら。','roll'],
 ['一次焼付炉・冷却','下塗りを硬化','温度と時間を管理して下塗りを焼き付け、次工程へ冷却する。','板温、塗膜状態。','furnace'],
 ['上塗りコータ','仕上げ塗装','表面の色・意匠・耐候性に関わる塗料を塗布する。裏面塗装も構成による。','色、膜厚、塗りむら。','roll'],
 ['二次焼付炉・冷却','上塗りを硬化','塗装を焼き付け、巻取りに適した温度に冷やす。','温度履歴、外観。','furnace'],
 ['検査・保護・巻取','外観を確認','色や欠陥を検査し、必要な保護を行って製品コイルに巻く。','色差、擦り傷、巻き締まり。','coil']]],
 ['tinningLine120','🥫 電気すずめっきライン｜ぶりき','薄鋼板へ電解ですずを付ける代表構成。TFS（電解クロム処理鋼板）は別のめっき工程を用います。',sources.tinning,[
 ['アンコイラ・溶接・ルーパ','連続供給','先尾端をつなぎ、コイル交換時も処理槽を連続通板する。','継ぎ目、張力。','coil'],
 ['浸漬／スプレー洗浄','表面油を除去','脱脂液などで冷延板表面を洗浄する。','残油、洗浄液。','tank'],
 ['電解洗浄・酸洗','めっき前処理','電解洗浄と酸洗で汚れや表面酸化物を除く。','電流、液状態、表面。','tank'],
 ['すず電解めっき槽','両面にすずを付ける','電解によって被膜を形成する。面別付着量は仕様で異なる。','電流密度、付着量、端部。','tank'],
 ['水洗・リフロー','洗浄し表面を整える','めっき後に洗浄し、必要に応じ加熱してすず被膜を再溶融させる。','外観、温度履歴。','furnace'],
 ['化成処理・給油','表面を仕上げる','仕様に合わせて表面処理と薄い油膜を施す。','処理量、油量。','fan'],
 ['検査・シャー・巻取','製品を確認','表面と付着量を検査し、製品単位に巻き取る。','傷、巻き姿、識別。','coil']]]
];
const existing={
 rollingLine118:[
 ['スラブを加熱し、粗圧延へ供給する。','炉温と搬送の同期。'],['エッジャで幅を、粗圧延機で板厚を大きく減らす。','幅・蛇行・ロール状態。'],['複数の圧延スタンドで目標板厚と形状に仕上げる。','荷重、板厚、板形状。'],['ランアウトテーブル上で冷却し、巻取温度を整える。','冷却分布と板温。'],['走行する帯鋼を巻取り、次工程の熱延コイルにする。','巻き姿と尾端。'],['熱延材の酸化皮膜を酸で除き、冷延用の表面にする。','酸洗むら、洗浄・乾燥。'],['常温の圧延で薄くし、寸法精度を上げる。','板厚、形状、圧延油。'],['洗浄で油を除去し、焼鈍で圧延後の材質を整える。','残油、温度履歴。'],['軽圧延で形状と表面を調整し、品質を検査する。','伸び率、表面傷。'],['完成した冷延材を巻き取るか、めっきなど次工程へ送る。','巻き姿、製品識別。']],
 slitLine118:[['母コイルを保持・センタリングし、巻き出す。','巻き戻りと中心。'],['ピンチで通板を助け、矯正機で曲がりを調整する。','ロール圧と板面。'],['先端不良部を切り、通板しやすい形にする。','切断面と残材。'],['ガイドで中心を保ち、上下回転刃で幅方向に連続切断する。','刃隙、ラップ、バリ。'],['両端の細い端材を製品条から分けて回収する。','端材の巻込み。'],['分割条の長さ差をループで吸収する構成例。','ピット残量と条の接触。'],['セパレータで条を分け、テンション装置で巻き張力を整える。','条間傷と張力差。'],['狭幅条を巻き取り、結束後に払い出す。','端面と巻き締まり。']],
 shearLine118:[['母材を巻き出して入口へ送る。','中心と巻き戻り。'],['先端を導入し、傷んだ部分を除く。','通板姿勢。'],['曲げ・矯正でコイルセットや波形を調整する。','上反り・下反り・耳波。'],['ループで速度差を吸収し、ガイドで蛇行を抑える。','張力と幅中心。'],['フィードロールと測長系で切断位置を決める。','滑りとエンコーダ値。'],['板を幅いっぱいに横切りして定尺にする。','刃隙、長さ、直角度、バリ。'],['切板を搬送・検査して積み重ねる。','板面傷と積みずれ。']],
 blankingLine118:[['母コイルを保持し、巻き出す。','中心と板の表裏。'],['先端を通板して不良部を切除する。','先端姿勢。'],['必要な場合に洗浄・給油して表面と成形条件を整える。','油量と板面。'],['レベラーで板形状を整え、ループで送り速度差を吸収する。','平坦度とループ残量。'],['フィーダがプレス金型へ所定ピッチで材料を送る。','送り精度と同期。'],['金型で所定輪郭を打ち抜き、端材を分ける。','能力、外形、バリ、残材。'],['製品ブランクを搬送し、検査後に積む。','板面傷、枚数、混入。']]
};
function glyph(type){const core={coil:'<circle cx="34" cy="25" r="16"/><circle cx="34" cy="25" r="7"/>',roll:'<circle cx="25" cy="17" r="7"/><circle cx="43" cy="32" r="7"/>',shear:'<path d="M19 12L49 37M19 37L49 12"/><circle cx="32" cy="25" r="3"/>',loop:'<path d="M16 27q10-23 20 0t20 0"/>',furnace:'<rect x="17" y="12" width="37" height="29" rx="3"/><path d="M26 34q-5-7 1-12 0 6 5 7 0-9 7-12 0 8 5 13"/>',tank:'<path d="M15 17v25h43V17M17 29q10-5 20 0t19 0"/>',fan:'<path d="M36 25l-6-15q-13 1-7 13l13 2 12-15q12 4 3 16l-15-1-4 15q-14 4-10-10z"/>'};return '<svg class="lineIcon120" viewBox="0 0 72 50" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">'+(core[type]||core.roll)+'</g><path d="M4 45h64" stroke="currentColor" stroke-width="2"/></svg>'}
function makeSection([id,title,intro,source,steps]){let sec=document.createElement('section');sec.id=id;sec.className='card';let h=document.createElement('h2');h.textContent=title;let p=document.createElement('p');p.textContent=intro;let label=document.createElement('p');label.className='lineLegend118';label.textContent='入口 → 出口の模式図。設備をタップすると役割・確認点を表示します。実機では設備の有無・順序・処理条件が異なります。';let ol=document.createElement('ol');ol.className='lineFlow118 interactive120';ol.setAttribute('aria-label','入口から出口への設備構成');steps.forEach(([name,role,desc,check,icon])=>{let li=document.createElement('li');li.dataset.description=desc;li.dataset.check=check;li.dataset.icon=icon;let b=document.createElement('b');b.textContent=name;let small=document.createElement('small');small.textContent=role;li.append(b,small);ol.append(li)});let links=document.createElement('p');links.className='lineLinks118';let a=document.createElement('a');a.href=source;a.target='_blank';a.rel='noopener noreferrer';a.textContent='設備メーカーの参考資料 ↗';links.append(a);sec.append(h,p,label,ol,links);return sec}
function hydrate(section){let groups=[...section.querySelectorAll('ol.lineFlow118')];groups.forEach((ol,g)=>{ol.classList.add('interactive120');let lis=[...ol.children].filter(x=>x.tagName==='LI');lis.forEach((li,i)=>{let name=li.querySelector('b')?.textContent||li.textContent;let role=li.querySelector('small')?.textContent||'';let pair=existing[section.id]?.[g===0?i:i+5]||[];let desc=li.dataset.description||pair[0]||role;let check=li.dataset.check||pair[1]||'設備図と現物の仕様を照合。';let icon=li.dataset.icon||(/コイル|巻取|リコイラ/.test(name)?'coil':/シャー|切断|トリマ|スリッタ|抜き/.test(name)?'shear':/炉|加熱|焼鈍|冷却/.test(name)?'furnace':/酸洗|洗浄|めっき/.test(name)?'tank':'roll');let btn=document.createElement('button');btn.type='button';btn.className='lineStep120';btn.setAttribute('aria-expanded','false');btn.innerHTML=glyph(icon);let words=document.createElement('span');let strong=document.createElement('strong');strong.textContent=name;let sub=document.createElement('small');sub.textContent=role;words.append(strong,sub);btn.append(words);let detail=document.createElement('div');detail.className='lineDetail120';detail.hidden=true;let dh=document.createElement('h4');dh.textContent=name;let dp=document.createElement('p');dp.textContent='役割：'+desc;let cp=document.createElement('p');cp.textContent='確認の視点：'+check;detail.append(dh,dp,cp);btn.addEventListener('click',()=>{let isOpen=!detail.hidden;ol.querySelectorAll('.lineDetail120').forEach(d=>d.hidden=true);ol.querySelectorAll('.lineStep120').forEach(b=>b.setAttribute('aria-expanded','false'));detail.hidden=isOpen;btn.setAttribute('aria-expanded',String(!isOpen));if(!isOpen)detail.scrollIntoView({block:'nearest',behavior:'smooth'})});li.replaceChildren(btn,detail)})})}
document.addEventListener('DOMContentLoaded',()=>{let anchor=document.getElementById('material60');for(const line of lines)anchor.before(makeSection(line));['rollingLine118','slitLine118','shearLine118','blankingLine118',...lines.map(x=>x[0])].forEach(id=>hydrate(document.getElementById(id)))});
})();
