/* Original learning illustrations: not a substitute for the drawing's specified standard. */
(()=>{'use strict';
const E=(t,c,s)=>{const e=document.createElement(t);if(c)e.className=c;if(s)e.textContent=s;return e};
const svg=(label,b)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 260" role="img" aria-label="${label}"><g fill="none" stroke="#245578" stroke-width="2">${b}</g></svg>`;
const text=(x,y,t)=>`<text x="${x}" y="${y}" fill="#183c55" stroke="none" font-size="15" font-family="sans-serif" text-anchor="middle">${t}</text>`;
const lines=[
 ['外形線','太い実線','見える輪郭・稜線を表します。断面図では切断された部分の輪郭も外形線で示します。','',4],
 ['寸法線・寸法補助線','細い実線','寸法線は数値の対象範囲、寸法補助線はその端を示します。形状の輪郭とは区別します。','',1],
 ['かくれ線','破線','視点から見えない穴・段差など。断面図では不要になる線を省略する場合があります。','9 5',2],
 ['中心線','細い一点鎖線','軸・円の中心や対称位置を示します。材料の境界ではありません。','20 5 2 5',1.5],
 ['想像線','細い二点鎖線','可動部の別位置、隣接部品、加工前後の形などの補助表現に使います。','20 5 2 5 2 5',1.5],
 ['切断線','切断位置・見る向きを指示','A–Aなどの文字と矢印を追って断面図と対応させます。線の途中や端の太さは指定規格に従います。','20 5 2 5',3],
 ['破断線','波線・ジグザグなど','長い部品の省略や、部分断面の境界を示します。省略された図の長さを測って寸法にしません。','wave',1.5],
 ['ハッチング','細い平行線','切断された材料部分を示します。穴の空間とは区別し、隣接部品は向きや間隔を変えて読み分けます。','hatch',1]
];
const symbols=[
 ['⌀ / φ','直径','⌀20 → 円・円筒の直径20。投影図で長方形に見えても、直径指示から円筒と判断できます。'],
 ['R','半径','R5 → 円弧の半径5。直径とは2倍の違いがあります。'],
 ['SR / S⌀','球面の半径・直径','SR10は球の半径10、S⌀20は球の直径20。普通の円弧Rと区別します。'],
 ['□','正方形','□20 → 正方形断面の一辺20。四角形一般や面積20ではありません。'],
 ['C','45°面取り','C2は45°面取りの寸法2の例。45°以外は角度と寸法などを確認します。'],
 ['M','メートルねじ','M10×1.5は呼び径10・ピッチ1.5の例。おねじ／めねじ、等級、ねじ深さと下穴深さを別々に確認。'],
 ['4–⌀10','個数と穴径','直径10の穴が4個という例。貫通・止まり、位置、穴深さは別の指示を読みます。'],
 ['PCD / P.C.D.','ピッチ円直径','穴などの中心を配置する円の直径。等配の有無と角度基準も確認します。'],
 ['⌴ / ⌵ / ↧','座ぐり・皿穴・深さ','字体は表示環境で異なります。座ぐりは段付きの穴、皿穴は円すい状の座。径・深さ・角度の指定を併読します。'],
 ['± / 上下の許容差','寸法公差','30±0.02なら29.98～30.02。30に対して上+0.03・下0なら30.00～30.03。'],
 ['H7 / h6','はめあいの公差クラス','H7は穴、h6は軸の例。大文字／小文字に注意。数値の許容差は呼び寸法範囲と規格で変わります。'],
 ['(30)','参考寸法','丸括弧は参考寸法の例。独立した加工・検査要求と同じ扱いにせず、元の指示を確認します。'],
 ['枠で囲んだ寸法','理論的に正確な寸法','幾何公差などと組み合わせて位置・形を定義します。枠があるから製作誤差ゼロという意味ではありません。'],
 ['Ra / Rz','表面性状のパラメータ','RaとRzは評価の仕方が違います。数値だけでなく単位、フィルタ・評価条件、適用規格の版を確認。旧記号との単純換算はしません。']
];
function figure(parent,body,label){const f=E('figure','drawingFigure123');f.innerHTML=svg(label,body);parent.append(f)}
function topic(parent,title,paras){const d=E('details','drawingTopic123');d.append(E('summary','',title));paras.forEach(t=>d.append(E('p','',t)));parent.append(d);return d}
function table(parent,heads,rows){const wrap=E('div','drawingTable123');wrap.tabIndex=0;const t=E('table'),thead=E('thead'),tr=E('tr');heads.forEach(h=>{const th=E('th','',h);th.scope='col';tr.append(th)});thead.append(tr);t.append(thead);const tb=E('tbody');rows.forEach(row=>{const r=E('tr');row.forEach(x=>r.append(E('td','',x)));tb.append(r)});t.append(tb);wrap.append(t);parent.append(wrap)}
document.addEventListener('DOMContentLoaded',()=>{
 const s=E('section','card drawing123');s.id='mechanicalDrawing123';s.append(E('h2','','📐 機械図面｜読み方・線・記号'),E('p','','部品図から立体形状と製作・検査条件を読み取るための入門です。組立では「相手部品・基準面・締結・すきま」まで追います。以下は学習用の代表例で、実図面の適用規格・版、注記、社内ルールを優先します。'));
 const intro=topic(s,'① 最初に読む順番・図面の種類',['1．図番・品名・改訂番号を確認し、組立図と部品図の最新版をそろえる。','2．単位、尺度、投影法、材質、熱処理・表面処理、一般公差と注記を確認する。','3．正面・平面・側面・断面を照合し、穴・段差・ねじ・対称性を立体としてつかむ。','4．基準からの寸法、個別公差、はめあい、幾何公差、表面性状を拾う。','5．加工・組立の順序と検査する面・測定方法を対応させる。不明な指示は推測で製作せず確認する。']);intro.open=true;
 table(intro,['図面','読む目的'],[['部品図','単品の形状・寸法・材質・仕上げ条件'],['組立図','部品番号と部品表、接触面、締結・位置関係'],['据付図','基準芯・高さ・アンカー位置・保守スペース'],['詳細図・断面図','小さな部分や内部形状を拡大・切断して確認']]);
 const projection=topic(s,'② 三面図・第三角法と第一角法',['第三角法では平面図を正面図の上、右側面図を右に配置します。第一角法では平面図が下、右側面図が左になります。図面の投影法表示で判断します。','次の例は幅80・高さ40・奥行30の直方体です。同じ部品を異なる方向から見ています。正面と平面で幅、正面と側面で高さを対応させます。']);
 figure(projection,'<rect x="60" y="35" width="160" height="60"/>'+text(140,24,'平面図：幅×奥行')+'<rect x="60" y="150" width="160" height="80"/><rect x="290" y="150" width="60" height="80"/>'+text(140,140,'正面図：幅×高さ')+text(320,140,'右側面図')+text(320,251,'奥行×高さ')+'<path d="M60 100V145M220 100V145M225 150H285M225 230H285" stroke-dasharray="3 4" stroke-width="1"/>','第三角法の直方体三面図');
 const lineTopic=topic(s,'③ 線の種類と意味',['線種と太さを組み合わせて意味を読みます。色はこの教材で見やすくするためのもので、実図面の標準色を意味しません。']);
 lines.forEach(([n,k,d,dash,w])=>{const a=E('article','drawingLine123');a.append(E('h3','',n+'｜'+k),E('p','',d));let b=dash==='wave'?'<path d="M30 125q20-30 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0"/>':dash==='hatch'?Array.from({length:12},(_,i)=>`<path d="M${35+i*27} 150l40-50" stroke-width="1"/>`).join(''):`<path d="M30 125H390" stroke-width="${w}" stroke-dasharray="${dash}"/>`;if(n==='切断線')b+='<path d="M45 80v45m-6-12 6 12 6-12M375 80v45m-6-12 6 12 6-12"/>'+text(45,65,'A')+text(375,65,'A');const f=E('div','lineSample123');f.innerHTML=svg(n,b).replace('viewBox="0 0 420 260"','viewBox="0 40 420 140"');a.append(f);lineTopic.append(a)});
 const cut=topic(s,'④ 断面図・詳細図・省略図',['切断位置A–Aと矢印の向きを探し、対応する断面図を見る。切断した材料にハッチングがあり、穴・空洞には通常入りません。','全断面は全体、半断面は対称物の片側、部分断面は一部分の内部を示します。軸やボルト、リブなどは切断方向によって断面表現を省く慣用表現があるため、ハッチングの有無だけで材質・空洞を断定しません。','詳細図の尺度は全体図と異なる場合があります。破断・省略があっても寸法値は実物の大きさを示します。']);
 figure(cut,'<defs><pattern id="hatchDrawing123" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10L10 0" stroke-width="1"/></pattern></defs><rect x="65" y="55" width="290" height="60" fill="url(#hatchDrawing123)"/><rect x="65" y="155" width="290" height="60" fill="url(#hatchDrawing123)"/><path d="M45 135H375" stroke-dasharray="20 5 2 5" stroke-width="1"/>'+text(210,35,'中空円筒を軸方向に切った例')+text(210,143,'穴（空間）')+text(210,247,'斜線部＝切断された材料'),'中空円筒の縦断面');
 const sym=topic(s,'⑤ 寸法・加工記号の検索一覧',['単位は図面の指定を確認します。尺度1:2の図でも、記載寸法80は実物の80を表します。画面上や印刷物を定規で測って寸法値にしないでください。']);
 const lab=E('label','','記号・名称・説明を検索'),input=E('input');input.type='search';input.placeholder='例：直径、ねじ、面取り、Ra';lab.append(input);const count=E('p');count.setAttribute('aria-live','polite');sym.append(lab,count);table(sym,['記号・表記例','意味','読み方'],symbols);const rows=sym.querySelectorAll('tbody tr');input.addEventListener('input',()=>{const q=input.value.normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean);let n=0;rows.forEach(r=>{r.hidden=!q.every(x=>r.textContent.normalize('NFKC').toLowerCase().includes(x));if(!r.hidden)n++});count.textContent=n+'件表示'});
 const tol=topic(s,'⑥ 寸法公差・幾何公差・表面性状',['寸法公差は大きさの許容範囲。幾何公差は形状・姿勢・位置・振れの要求で、寸法が範囲内でも幾何公差を満たすとは限りません。','公差枠は特性記号、許容値、必要なデータムを読みます。データムAは基準の識別で、許容差の等級ではありません。参照順序にも意味があります。','平面度は面そのものの形、平行度・直角度は基準に対する姿勢、位置度は指定位置に対する公差域、振れは基準軸のまわりで回したときの変動を扱います。','表面性状は寸法・形状とは別の要求です。Raなどの数値だけで加工法を断定せず、除去加工の要否、筋目方向、評価条件、適用規格を確認します。']);
 figure(tol,'<rect x="60" y="70" width="65" height="50"/><rect x="125" y="70" width="130" height="50"/><rect x="255" y="70" width="70" height="50"/>'+text(92,101,'∥')+text(190,101,'0.02')+text(290,101,'A')+text(92,153,'平行度')+text(190,180,'公差値')+text(290,153,'基準A')+text(210,224,'例：面の平行度。対象面の指示と併読'),'幾何公差枠の読み方');
 const work=topic(s,'⑦ 組立現場での読み合わせ',['シャフトと軸受：軸径と穴径のはめあい、肩の当たり面、隅Rと面取り、止め輪溝、軸方向の固定／逃げを確認。','フランジとカップリング：基準軸、インロー径、PCD、穴数・角度、面振れ／円周振れの指示を照合。穴径が合うだけでは取付方向まで決まりません。','ベースと据付：基準面、レベル、平行・直角、アンカー位置、シム調整代を追う。現場測定値をどの基準に対して記録したか明記する。','組立前：図番・改訂、数量、材質、処理、重要公差と接触面、干渉を確認。組立後：図面の検査条件に沿って測定し、測定位置・値・使用計器を記録。']);
 s.append(E('h3','','関連する既存項目'));
 [['geo103','幾何公差一覧'],['fits103','はめあい一覧'],['fit96','はめあい計算'],['threadPro56','ねじ'],['weld96','溶接記号'],['record85','作業記録']].forEach(([id,name])=>{const b=E('button','',name);b.type='button';b.addEventListener('click',()=>window.openView97(id));s.append(b)});
 s.append(E('h3','','参考資料'));
 [['ミスミ：製図の線','https://jp.misumi-ec.com/tech-info/categories/technical_data/td01/g0048.html'],['ミスミ：製図の記号','https://jp-2dx.meviy.misumi-ec.com/guide/ja/customer_manual/2dx_drafting/3641/'],['中村留：機械図面の読み方','https://www.nakamura-tome.co.jp/2026/04/02/article_00068/']].forEach(([n,url])=>{const a=E('a','',n+' ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';s.append(a)});
 document.getElementById('material60').before(s);
});
})();
