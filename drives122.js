/* v122: original learning schematics; never installation or safety circuit drawings. */
(()=>{'use strict';
const motorRef='https://www.orientalmotor.co.jp/ja/products';
const hydraulicRef='https://www.yuken.co.jp/catalog_cad/00195/00195_01';
const airRef='https://www.smcworld.com/products/video/ja-jp/sy_work.html';
const cylinderRef='https://www.ckd.co.jp/kiki/jp/product/model_list?n=MSD';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const E=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e};
const txt=(x,y,s)=>`<text x="${x}" y="${y}" text-anchor="middle">${esc(s)}</text>`;
const rect=(x,y,w,h,fill='#e6f2fa')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="#315c78"/>`;
const path=d=>`<path d="${d}" fill="none" stroke="#276d99" stroke-width="3"/>`;
const svg=(body,label)=>`<svg viewBox="0 0 400 220" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg"><g font-family="sans-serif" font-size="14" fill="#173c57">${body}</g></svg>`;
function motorDiagram(kind){
 if(kind==='gear')return svg(rect(15,65,105,75)+txt(67,108,'モータ')+rect(130,65,50,75,'#f0cc98')+txt(155,164,'ブレーキ')+rect(190,40,155,120)+`<circle cx="225" cy="88" r="20" fill="#bedff5" stroke="#315c78"/><circle cx="282" cy="105" r="39" fill="#9dc7de" stroke="#315c78"/>`+path('M120 102H205M282 105H385')+txt(270,184,'減速歯車 → 出力軸'),'モータ・保持ブレーキ・減速機の構成例');

 if(kind==='servo')return svg(rect(10,40,112,50)+txt(66,70,'指令・ドライバ')+rect(150,40,105,50)+txt(202,70,'モータ')+rect(282,40,108,50)+txt(336,70,'機械・負荷')+path('M122 65H150M255 65H282M336 90V160H66V90')+txt(200,185,'位置・速度の検出値を戻す（帰還）'),'サーボ制御の閉ループ');
 const rotor=kind==='induction'?'かご形導体':kind==='dc'?'巻線・整流子':kind==='step'?'歯付き回転子':'永久磁石';
 let body=rect(80,40,230,135)+`<circle cx="195" cy="106" r="46" fill="#9dc7de" stroke="#315c78"/>`+rect(290,99,75,14,'#b6c1c9')+txt(195,115,rotor)+txt(195,30,'固定子・巻線')+txt(336,145,'軸');
 if(kind==='dc')body+=rect(237,83,16,47,'#f0bd80')+txt(195,207,'ブラシが整流子へ接触し通電');
 else if(kind==='step')body+=path('M135 60l12 10m-12 70 12-10M255 60l-12 10m12 70-12-10')+txt(195,207,'励磁順序で一定角度ずつ進む');
 else body+=path('M155 55Q195 20 235 55m-12-2 12 2-3-12')+txt(195,207,kind==='induction'?'回転磁界 → 誘導電流 → トルク':'回転磁界と磁極が同期');
 return svg(body,'モータ断面の概念図：'+rotor);
}
const motors=[
 ['三相誘導モータ','induction','AC 交流 三相 インダクション かご形','固定子の三相巻線が回転磁界を作り、回転子に誘導電流が流れてトルクを生みます。','ポンプ・ファン・コンベヤなどの連続駆動に広く使われます。負荷時は回転磁界より少し遅く回る「すべり」があります。','同期速度は120×周波数÷極数［min⁻¹］。4極・50Hzなら1500、60Hzなら1800で、実回転数はこれより低くなります。インバータ運転時は絶縁、低速冷却、許容周波数も確認。'],
 ['単相誘導モータ','induction','AC 単相 コンデンサ','単相電源で主巻線と補助巻線などを使い、始動・回転に必要な磁界を作ります。','小形送風機や一般機械に使われます。コンデンサ始動・運転など構成は型式で異なります。','三相用インバータをそのまま使えるとは限りません。コンデンサ容量、回転方向の変更方法、定格時間はメーカー指定に従います。'],
 ['同期・永久磁石モータ','pm','AC PM 同期 IPM SPM','回転子の永久磁石などが固定子の回転磁界に同期して回転します。','高効率化に利用されます。磁石埋込形IPM、表面磁石形SPMなどがあります。','駆動装置との組合せや始動方法を確認します。永久磁石式は外力で回されると発電するため、電源遮断だけで端子の無電圧を判断しません。'],
 ['ブラシ付きDCモータ','dc','DC 直流 ブラシ 整流子','ブラシと整流子が回転子巻線の電流方向を切り換え、連続回転を作ります。','電圧による速度制御が比較的容易。永久磁石式・巻線界磁式などがあり、同じDCでも特性は異なります。','ブラシ・整流子の摩耗、火花、粉じんを点検。永久磁石式の代表例では極性反転で逆転しますが、巻線界磁式を含め一律に配線を反転しないでください。'],
 ['ブラシレスDCモータ','pm','DC BLDC ブラシレス ドライバ','永久磁石回転子を、電子回路による巻線の切換えで回転させます。機械式のブラシ・整流子を持ちません。','専用ドライバと組み合わせて速度を制御。AC入力のドライバでも内部で整流して駆動する製品があります。','ドライバ入力がACかDCかと、モータ巻線の駆動方式は別の分類です。モータ・センサ・ドライバの対応型式を確認します。'],
 ['サーボモータ・サーボシステム','servo','AC DC サーボ エンコーダ 位置決め','位置・速度などの検出値を指令と比較して補正する制御システムです。ACサーボやDCサーボがあります。','位置決め・同期・加減速制御に適します。「サーボ」は誘導・永久磁石などの構造分類と同じ軸ではありません。','負荷慣性、最大・連続トルク、回生、ゲイン、エンコーダと原点を確認。保持ブレーキは通常の減速停止用ブレーキとは限りません。'],
 ['ステッピングモータ','step','パルス ステップ ハイブリッド 位置決め','巻線の励磁を順に切り換え、パルスに対応する角度ずつ回転させます。','低速での位置決めに使われ、開ループ方式と検出器付き方式があります。マイクロステップは励磁電流を細かく制御します。','過負荷や急加速で脱調する場合があります。停止時保持力は励磁条件に依存し、停電時の落下防止を意味しません。'],
 ['ギヤード・ブレーキ付きモータ','gear','減速機 ギヤ ギア 保持ブレーキ','モータに減速機や保持ブレーキを組み合わせた構成で、独立したAC/DC分類ではありません。','減速機は速度を下げて出力トルクを増やしますが損失があり、出力軸の許容トルクが上限です。','減速比、バックラッシ、軸荷重、潤滑と取付姿勢を確認。ブレーキの保持力・解放電源・非常停止時の使用可否は型式別です。']
];
function frame(id,title,intro,ref){const s=E('section','card drive122');s.id=id;s.append(E('h2','',title),E('p','',intro));const a=E('a','','メーカー資料 ↗');a.href=ref;a.target='_blank';a.rel='noopener noreferrer';s.append(a);document.getElementById('material60').before(s);return s}
function figure(html,parent){const f=E('figure','driveFig122');f.innerHTML=html;parent.append(f);return f}
function searchable(s){const label=E('label','','この項目を検索（名称・別名・説明）');const input=E('input');input.type='search';input.placeholder='例：DC、パイロット、両ロッド';label.append(input);const status=E('p');status.setAttribute('aria-live','polite');const list=E('div','driveGrid122');s.append(label,status,list);input.addEventListener('input',()=>{const q=input.value.normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean);let n=0;list.querySelectorAll('article').forEach(a=>{a.hidden=!q.every(w=>a.textContent.normalize('NFKC').toLowerCase().includes(w));if(!a.hidden)n++});status.textContent=n+'件表示'});return list}
function card(parent,title,desc,terms){const a=E('article','driveCard122');a.append(E('h3','',title),E('p','',desc));if(terms)a.append(E('p','driveTerms122','検索語：'+terms));parent.append(a);return a}
function details(a,items){const d=E('details');d.append(E('summary','','構造・特性・確認点を詳しく読む'));items.forEach(t=>d.append(E('p','',t)));a.append(d)}
function motorsPage(){const s=frame('motors122','⚡ 電気モーター｜AC・DCと種類','電源・回転原理・制御方式・付属機構を分けて比較します。図は構造の学習用模式図です。',motorRef);
 figure(svg(path('M25 65H185M25 15V110M220 65H385M220 15V110')+path('M25 65Q45-15 65 65T105 65T145 65T185 65M225 30H385')+txt(105,142,'AC：極性が周期的に変化')+txt(302,170,'DC：基本は一方向')+txt(200,207,'横軸：時間／縦軸：電圧（代表波形）'),'交流と直流の代表波形'),s);
 s.append(E('p','','ACは電圧・電流の向きが周期的に変わり、DCは基本的に一方向です。実際のDC電源にはリップルがあり、ドライバ出力はPWM波形の場合があります。AC/DCという電源名だけでは速度制御や回転方向を決められません。'));
 const list=searchable(s);motors.forEach(([name,k,terms,desc,use,check])=>{const a=card(list,name,desc,terms);figure(motorDiagram(k),a);details(a,[use,check])});
}
const centers={closed:['全ポート遮断',[]],tandem:['P–T連通／A・B遮断',[['P','T']]],float:['A・B–T連通／P遮断',[['A','T'],['B','T']]],open:['P・T・A・B連通',[['P','A'],['A','B'],['B','T']]],exhaust:['A–R、B–S排気／P遮断',[['A','R'],['B','S']]],pressure:['P–A・B供給／R・S遮断',[['P','A'],['P','B']]]};
function valveSvg(pairs,air,label){const pts=air?{P:[200,170],A:[100,40],B:[300,40],R:[70,170],S:[330,170]}:{P:[110,170],T:[290,170],A:[100,40],B:[300,40]};let b=rect(45,60,310,90);pairs.forEach(([u,v])=>{const [x,y]=pts[u],[xx,yy]=pts[v];b+=path(`M${x} ${y}L${xx} ${yy}`)});Object.entries(pts).forEach(([k,[x,y]])=>{b+=`<circle cx="${x}" cy="${y}" r="7" fill="white" stroke="#173c57"/>`+txt(x,y<100?y-15:y+27,k);if(!pairs.some(p=>p.includes(k)))b+=path(`M${x-9} ${y<100?y+17:y-17}h18`)});return svg(b,label+'：連通のみを示す模式図（矢印は省略）')}
function states(a,air,variant){let all;
 if(variant==='2/2')all=[['閉（NCの非通電例）',[]],['開',[['P','A']]]];
 else if(variant==='3/2')all=[['非通電例：A排気',[['A','R']]],['通電例：A供給',[['P','A']]]];
 else {all=[['切換1：P–A',[['P','A'],['B',air?'S':'T']]],['切換2：P–B',[['P','B'],['A',air?'R':'T']]]];if(centers[variant])all.splice(1,0,centers[variant]);}
 const buttons=E('div','driveStates122'),fig=E('figure','driveFig122'),caption=E('p');caption.setAttribute('aria-live','polite');
 all.forEach(([name,pairs],i)=>{const b=E('button','',name);b.type='button';b.setAttribute('aria-pressed',String(i===0));b.addEventListener('click',()=>{buttons.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));draw(i)});buttons.append(b)});
 function draw(i){let [name,pairs]=all[i];if(variant==='2/2'||variant==='3/2'){const pts={P:[95,170],A:[200,40],R:[305,170]};let b=rect(55,65,290,80);pairs.forEach(([u,v])=>b+=path(`M${pts[u][0]} ${pts[u][1]}L${pts[v][0]} ${pts[v][1]}`));Object.entries(pts).filter(([k])=>variant!=='2/2'||k!=='R').forEach(([k,[x,y]])=>{b+=txt(x,y<100?y-15:y+25,k)+`<circle cx="${x}" cy="${y}" r="6" fill="white" stroke="#173c57"/>`;if(!pairs.some(p=>p.includes(k)))b+=path(`M${x-10} ${y<100?y+16:y-16}h20`)});fig.innerHTML=svg(b,name)}else fig.innerHTML=valveSvg(pairs,air,name);caption.textContent=name+'。青線＝連通、端の横棒＝遮断。実機の接続位置・記号配置とは異なる学習図です。'}
 draw(0);a.append(buttons,fig,caption);
}
function valvesPage(air){const s=frame(air?'airValves122':'hydValves122',air?'💨 空圧電磁弁｜種類と切換え':'💧 油圧電磁弁｜種類と切換え',air?'空気の供給と排気を切り換えます。ポート数と切換位置数は別の数字です。':'油の供給とタンクへの戻りを切り換えます。4/3は4ポート・3位置を表します。',air?airRef:hydraulicRef);
 s.append(E('p','','P＝供給、A・B＝アクチュエータ側。'+(air?'R・S＝排気。ポート番号・文字の対応は製品の記号で確認します。':'T＝タンク戻り。パイロット供給X・ドレンYを別に持つ製品もあります。')));
 const structural=E('details');structural.append(E('summary','','共通構造：電磁力とスプール'));figure(svg(rect(15,70,70,65,'#f0cc98')+txt(50,110,'コイル')+rect(95,55,230,95)+rect(110,88,200,22,'#aac4d4')+path('M325 100l10-15 10 30 10-30 10 30')+txt(205,185,'軸状のスプールが動き流路を切換え')+txt(200,30,'直動スプール弁の断面概念'),'コイル・スプール・ばねの構造'),structural);s.append(structural);
 const list=searchable(s);const items=air?[
 ['2ポート2位置（2/2）','2/2','供給の開閉用。NCは非通電閉、NOは非通電開という分類です。','2ポート弁だけでは下流の残圧を排気できません。使用流体・圧力差・真空対応を確認。'],
 ['3ポート2位置（3/2）','3/2','P・A・Rを切り換え、単動シリンダやパイロット信号に使用します。図はNCの例。','非通電でAを排気する構成でも、負荷が安全な方向へ動く保証にはなりません。'],
 ['5ポート2位置（5/2）','two','供給1口、出力2口、排気2口で複動シリンダを往復させます。','シングルソレノイドばね戻り、ダブルソレノイドなどがあります。停電時の位置は構造と圧力条件に依存します。'],
 ['5ポート3位置：クローズド','closed','中立で全ポートを遮断する形式。','空気の圧縮性と内部漏れがあるため、中間位置の精密停止や落下防止を弁だけに任せません。'],
 ['5ポート3位置：エキゾースト','exhaust','中立で出力A・Bを排気し、供給Pを遮断します。','排気すると外力や重力でシリンダが動くことがあります。残圧排出経路と背圧を確認。'],
 ['5ポート3位置：プレッシャ','pressure','中立でA・Bへ供給圧を与え、排気を遮断します。','片ロッドシリンダは左右の受圧面積が違うので、同圧でも力はつり合いません。']
 ]:[
 ['4ポート2位置（4/2）','two','P–A/B–TとP–B/A–Tを切り換えます。','ばね戻り・両ソレノイドなどの保持方式を型式で確認。ポンプ流量と圧力損失、戻り圧の許容が選定条件です。'],
 ['4ポート3位置：クローズド','closed','中立でP・T・A・Bを遮断します。','定容量ポンプでは別途アンロードや圧力制御が必要です。スプール漏れがあるため負荷保持の安全装置ではありません。'],
 ['4ポート3位置：タンデム','tandem','中立でP–Tを開き、A・Bを遮断します。','ポンプをタンクへ逃がす構成に使います。戻り抵抗、発熱、切換過渡と負荷保持回路を確認。'],
 ['4ポート3位置：フロート','float','中立でA・B–Tを開き、Pを遮断します。','アクチュエータは外力で動ける状態になります。垂直負荷には別の保持対策が必要です。'],
 ['4ポート3位置：オープン','open','中立でP・T・A・Bを連通する代表例です。','各ポートの背圧・流量で挙動が変わります。中立記号はメーカー形式ごとに照合します。']
 ];items.forEach(([n,k,d,c])=>{const a=card(list,n,d,k);states(a,air,k);details(a,[c,'図は流路の比較用です。切換1/2は特定のコイル名に対応付けていません。配管・通電は実機図面で確認します。'])});
 [ ['直動式','コイルの電磁力で主弁を直接動かす方式。パイロット圧を使わない構成でも、許容差圧・流量・取付条件は製品によります。'],['パイロット式','小さな電磁弁でパイロット圧を切り換え、主弁を動かす方式。内部／外部パイロット、最低作動圧、排気・ドレン条件を確認します。'],['シングル／ダブルソレノイド','コイル数と中立位置数は別です。ばね戻りは復帰力を持ち、両ソレノイド2位置は切換位置を保持する製品があります。同時通電の可否は取扱説明書に従います。'],['比例制御弁','指令電流などに応じて流量・圧力・開度を連続的に調整する弁。単純なON/OFF弁とはドライバが異なります。ヒステリシスやフィードバックの有無を確認します。'] ].forEach(([n,d])=>{const a=card(list,n,d,n);figure(svg(rect(15,70,110,55)+txt(70,104,n==='パイロット式'?'小形電磁弁':'電気指令')+path('M125 98H165')+rect(165,70,100,55)+txt(215,104,n==='パイロット式'?'主弁駆動':'駆動部')+path('M265 98H295')+rect(295,70,90,55)+txt(340,104,'主流路')+txt(200,180,'駆動方式の関係図'),'駆動方式'),a)});
}
const cylinders=[
 ['単動・ばね戻り','single','一方へ圧力を加え、反対方向はばねで戻す構造です。押出し形・引込み形があります。','単純な押出し・復帰用途。図は加圧で伸びる例。ばね力により有効推力が減り、排気背圧や摩擦も影響します。'],
 ['複動・片ロッド','double','ピストンの両側に交互に圧力をかけて伸縮します。','ロッド側の受圧面積が小さく、同じ差圧では引き力が小さくなります。同流量なら戻りが速くなる理想関係ですが、空圧は圧縮性や流量制御の影響を受けます。'],
 ['複動・両ロッド','both','ピストンの両側からロッドが出る構造です。','左右ロッド径が同じなら受圧面積が等しく、同条件で推力・速度をそろえやすい構造。両側のロッド可動域を確保します。'],
 ['薄形・コンパクト','compact','短い本体にピストンを収め、省スペースで押す・クランプする用途に使います。','短い軸受支持長のため、横荷重やモーメントを本体だけで受けられるとは限りません。必要に応じ外部ガイドを使います。'],
 ['ガイド付き','guided','シリンダと平行な案内軸・軸受で出力プレートを支持します。','回り止めや横荷重への対応に利用。許容モーメント、荷重点、速度・停止衝撃はガイドの仕様で確認します。'],
 ['ロッドレス','rodless','長い突出ロッドを使わず、内部ピストンの動きを外側のスライダへ伝えます。','機械結合式（スリット・シール）と磁石結合式があります。長ストローク搬送に適し、磁石結合式は結合保持力、機械式はシールと案内荷重を確認します。'],
 ['タンデム','tandem','同軸に複数のピストンを並べ、圧力による力を合成します。','径を増やさず推力を増やす用途。必要流量・空気消費と全長は増えます。多位置シリンダとは目的・配管が異なります。'],
 ['テレスコピック','telescopic','複数の筒を入れ子にして、収納長に対し長い伸長量を得ます。','油圧の昇降・傾動などに用いられ、単動・複動があります。段ごとに面積が違い、推力・速度や伸縮順序は構造・負荷に依存します。']
];
function cylinderSvg(k,extended){const p=extended?235:135;let b='';
 if(k==='rodless'){b=rect(35,80,330,55)+rect(extended?245:70,58,65,22,'#f0cc98')+rect(extended?257:82,85,35,45,'#91b9d0')+path(`M${extended?275:100} 80v-16`)+txt(200,175,'外部スライダ ⇄ 内部ピストン');}
 else if(k==='telescopic'){b=rect(35,65,120,90)+rect(90,80,extended?170:90,60)+rect(120,96,extended?220:90,28,'#91b9d0')+txt(200,185,'入れ子の段が伸縮（模式）');}
 else {b=rect(45,60,250,95)+rect(50,65,p-50,85,extended?'#bedff5':'#eef4f7')+rect(p,65,290-p,85,extended?'#eef4f7':'#bedff5')+rect(p,70,16,75,'#628fa9')+rect(p+16,99,365-p-16,17,'#c1cbd1');if(k==='both')b+=rect(10,99,p-10,17,'#c1cbd1');if(k==='single')b+=path(`M${p+20} 90l12-10 12 20 12-20 12 20`);else b+=path('M280 155v22');b+=path('M65 155v22')+txt(65,199,'A')+(k==='single'?txt(265,199,'ばね復帰の例'):txt(280,199,'B'))+txt(200,35,k==='compact'?'薄い本体（比率省略）':'筒・ピストン・ロッド');if(k==='guided')b+=path('M55 47H367V170H55');if(k==='tandem')b+=rect(75,70,16,75,'#628fa9')+txt(200,216,'複数ピストンを共通軸で結合');}
 return svg(b,'シリンダ構造の模式図：'+(extended?'伸び側':'戻り側'));
}
function cylindersPage(){const s=frame('cylinders122','🔧 油圧・空圧シリンダー｜構造と特性','油圧は油、空圧は圧縮空気を使って直線運動を作ります。油圧は高い力と剛性、空圧は軽快な繰返し動作などに利用されますが、許容圧力や能力は型式ごとに異なります。',cylinderRef);const list=searchable(s);cylinders.forEach(([n,k,d,c])=>{const a=card(list,n,d,k);const fig=figure(cylinderSvg(k,false),a);const b=E('button','','図を伸び側に切換え');b.type='button';let ext=false;b.addEventListener('click',()=>{ext=!ext;fig.innerHTML=cylinderSvg(k,ext);b.textContent=ext?'図を戻り側に切換え':'図を伸び側に切換え'});a.append(b);details(a,[c,'図は構造・位置の比較用で、正確な寸法や実機の配管図ではありません。電源OFF時の動作はシリンダだけでなく弁・圧力・外力で決まります。'])});s.append(E('h3','','力・速度の読み方'),E('p','','理想推力は F＝圧力差×受圧面積。片ロッドの伸び側面積はπD²/4、戻り側はπ(D²−d²)/4です。D＝内径、d＝ロッド径。実際は反対側圧力、摩擦、ばね、荷重と加速を含めます。MPa×mm²＝N。数値は許容荷重そのものではありません。'),E('p','','クッションは終端の衝撃を緩和し、オートスイッチは磁石などを検出します。どちらも単独で安全な停止・保持を保証するものではありません。ロッドの座屈、横荷重、速度、終端エネルギー、シール材・流体適合を仕様書で確認します。'));
}
document.addEventListener('DOMContentLoaded',()=>{motorsPage();valvesPage(false);valvesPage(true);cylindersPage()});
})();
