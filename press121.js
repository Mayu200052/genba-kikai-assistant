/* Learning diagrams for press-machine types. Actual mechanisms and protection are model-specific. */
(()=>{
const anatomy=[
 ['motor','モータ／駆動源','機械式は回転を供給し、油圧式はポンプを駆動します。サーボ式ではサーボモータを制御します。','駆動方式と銘板、電源・回生・停止状態を型式資料で確認。'],
 ['drive','フライホイール・クラッチ／油圧ユニット','機械式ではフライホイールの蓄積エネルギーをクラッチ・ブレーキで伝達／停止します。油圧式ではポンプ、弁、シリンダが力を伝えます。サーボ式にはフライホイールを持たない構成があります。','クラッチ・ブレーキまたは油圧系統の方式、保護と点検要領を確認。'],
 ['mechanism','クランク／リンク／油圧シリンダ','回転を往復運動に変える機構、または油圧でスライドを動かす機構です。リンクはスライド速度特性を変える方式です。','下死点付近の荷重特性と許容運転範囲を仕様書で照合。'],
 ['slide','スライド・ガイド','スライドに上型を固定し、ガイドで上下運動を案内します。','ガイド摩耗、スライドとボルスタの平行、偏心荷重の許容。'],
 ['upper','上型','パンチ・成形面など。材料を加工する可動側の金型です。','固定、シャンクやクランプ、上型重量と干渉。'],
 ['material','材料・加工点','上下型の間に材料を置き、せん断・曲げ・絞りなどを行います。','板厚・強度、送り位置、排出、製品・端材の取り違え。'],
 ['lower','下型・ボルスタ','下型を載せて支持する固定側の台です。ボルスタの下にダイクッションがある機種もあります。','取付面、クランプ、ダイハイト、ボルスタ寸法・荷重。'],
 ['cushion','ダイクッション（装備時）','絞り加工でしわ押さえ力を与えるなど、材料流入を制御します。全機種の標準装備ではありません。','設定力、ストローク、型とクッションピンの対応を仕様で確認。']
];
const types=[
 {name:'クランク・偏心機械式',kind:'機械式',steps:['モータ／フライホイール','クラッチ・偏心軸','スライド'],short:'一定の機械運動を反復。打抜きや曲げなど、比較的高速な量産に用いられます。',detail:['フライホイールに回転エネルギーを蓄え、偏心軸・クランクがスライドを往復させます。','公称能力が出せる位置は機種ごとに指定されます。荷重が上死点寄りで必要な加工はトルク・仕事能力も確認します。','フライホイール、クラッチ・ブレーキ、給油、ガイド状態の点検が重要です。'],ref:'https://press-info.aida.co.jp/blog/technical/entry-146.html'},
 {name:'リンクモーション機械式',kind:'機械式の運動機構',steps:['回転駆動','リンク機構','スライド'],short:'リンク機構で加工域のスライド速度を変える方式。絞りや成形品質の調整に利用されます。',detail:['リンクは駆動源そのものではなく、回転をスライドへ伝える運動機構の一種です。','加工域での速度を抑えられる設計があります。一方で上昇・搬送可能な時間も含めてライン全体のサイクルを確認します。','偏心荷重、リンク部の遊びと潤滑、加工荷重の発生位置を確認します。'],ref:'https://press-info.aida.co.jp/en/blog/entry-297.html'},
 {name:'サーボ機械式',kind:'電動サーボ駆動',steps:['サーボモータ','伝達機構','スライド'],short:'速度・停止位置などのモーションを設定でき、成形と搬送のタイミングを調整できます。',detail:['サーボモータを使い、スライドの速度・加減速・停止を加工に合わせて制御します。伝達機構は型式で異なります。','自由なモーションでも、プレスの圧力・トルク・仕事能力およびモータの熱・回生条件を超えて運転できるわけではありません。','位置検出、モーション設定、負荷履歴、サーボ系異常を確認します。'],ref:'https://www.aida.co.jp/products/product78.html'},
 {name:'油圧式',kind:'液圧駆動',steps:['ポンプ・弁','油圧シリンダ','スライド'],short:'シリンダでスライドを動かし、ストロークや速度・保持を制御する方式。深絞りや試作用途にも使われます。',detail:['ポンプ・弁・シリンダの構成により加圧、停止、戻しを制御します。機械式とは荷重と位置の特性が異なります。','速度、保持時間、能力、熱負荷は型式と油圧回路に依存します。ダイクッションや複動構造を備える機種もあります。','漏れ、圧力、油温、フィルタ、弁・シリンダ、残圧を設備手順に沿って確認します。'],ref:'https://www.schulergroup.com/technologien/produkte/transferpressen_hydraulisch/index.html?sLang=en'}
];
const frames=[
 {name:'Cフレーム（ギャップフレーム）',label:'C形・前と側面の開口',short:'金型へのアクセスがしやすい。荷重時の口開きや偏心荷重の影響を、機種の剛性と許容値で確認します。',svg:'<path d="M235 18H65V145H235M65 145H235" stroke="#315c78" stroke-width="16" fill="none"/><rect x="120" y="62" width="85" height="17" fill="#81b7d6"/><rect x="110" y="112" width="105" height="13" fill="#d5e9f5"/>'},
 {name:'ストレートサイド',label:'左右支柱・閉じたフレーム',short:'左右の支柱で荷重を受ける構造。大きな金型、複数ポイントや偏心荷重を扱う機種があり、許容値は型式別です。',svg:'<path d="M60 20H240V145H60Z" stroke="#315c78" stroke-width="15" fill="none"/><rect x="105" y="62" width="90" height="17" fill="#81b7d6"/><rect x="100" y="112" width="100" height="13" fill="#d5e9f5"/>'}
];
function scheme(steps,title){return '<svg viewBox="0 0 330 150" role="img" aria-label="'+title+'の駆動の流れ">'+steps.map((s,i)=>'<rect x="15" y="'+(12+i*47)+'" width="300" height="36" rx="7" fill="'+(i===1?'#d9edfb':'#f0f5fa')+'" stroke="#77a8c9"/><text x="165" y="'+(36+i*47)+'" text-anchor="middle" fill="#173c57" font-size="16">'+s+'</text>'+(i<2?'<path d="M165 '+(49+i*47)+'v9m-6-6 6 6 6-6" fill="none" stroke="#176098" stroke-width="2"/>':'' )).join('')+'</svg>'}
function el(tag,cls,text){const x=document.createElement(tag);if(cls)x.className=cls;if(text)x.textContent=text;return x}
function add(type,parent){const card=el('article','pressType121');card.append(el('h3','',type.name));card.append(el('p','',type.kind+'｜'+type.short));const figure=el('div');figure.innerHTML=scheme(type.steps,type.name);card.append(figure);const det=el('details');det.append(el('summary','','構造・特性・点検の詳しい説明'));const ul=el('ul');type.detail.forEach(t=>ul.append(el('li','',t)));det.append(ul);card.append(det);const a=el('a','','メーカー資料 ↗');a.href=type.ref;a.target='_blank';a.rel='noopener noreferrer';card.append(a);parent.append(card)}
function create(){const section=el('section','card');section.id='pressGuide121';section.append(el('h2','','🛠️ プレス機械｜種類・構造・特性'));
 section.append(el('p','pressIntro121','機械式・油圧式・サーボ式は駆動方式、Cフレームとストレートサイドはフレーム形状、単動・複動は作動方式です。同じプレスを異なる観点から分類します。下の図をタップして部品の役割を確認できます。'));
 const fig=el('figure','pressDiagram121');fig.append(el('figcaption','','共通構成の概念図（上から下へ）。機械式を中心に示し、油圧式などとの違いを説明欄に併記。'));
 const stack=el('div','pressStack121');const info=el('div','pressInfo121','図の部品をタップすると、役割と確認点がここに表示されます。');info.setAttribute('aria-live','polite');
 anatomy.forEach(([id,name,desc,check],i)=>{if(i===3){const frame=el('div','pressFrame121');['slide','upper','material','lower'].forEach(fid=>{const x=anatomy.find(a=>a[0]===fid);const b=el('button','pressPart121 pressDie121',x[1]);b.type='button';b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>select(x,b));frame.append(b);if(fid==='upper')frame.append(el('div','pressGap121','加工点 ↓'))});stack.append(frame);return}if(i>3&&i<=6)return;stack.append(el('div','pressArrow121','↓'));const b=el('button','pressPart121',name);b.type='button';b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>select([id,name,desc,check],b));stack.append(b)});
 function select(x,b){stack.querySelectorAll('button').forEach(t=>t.setAttribute('aria-pressed',String(t===b)));info.replaceChildren(el('strong','',x[1]),el('p','','役割：'+x[2]),el('p','','確認点：'+x[3]))}
 fig.append(stack,info);section.append(fig);
 section.append(el('h3','','① 駆動方式と運動機構'));const grid=el('div','pressTypeGrid121');types.forEach(t=>add(t,grid));section.append(grid);
 section.append(el('h3','','② フレーム形状'));const fg=el('div','pressTypeGrid121');frames.forEach(f=>{const a=el('article','pressType121');a.append(el('h3','',f.name));const image=el('div');image.innerHTML='<svg viewBox="0 0 300 170" role="img" aria-label="'+f.label+'の模式図">'+f.svg+'</svg>';a.append(image,el('p','',f.short));fg.append(a)});section.append(fg);
 section.append(el('h3','','③ スライドの作動と加工の進め方'));
 const table=el('div','lineTable118');table.setAttribute('role','region');table.setAttribute('aria-label','プレス作動・加工方式の比較');table.tabIndex=0;table.innerHTML='<table><thead><tr><th scope="col">区分</th><th scope="col">構成・動き</th><th scope="col">主な確認点</th></tr></thead><tbody><tr><td>単動</td><td>主スライドが1系統。絞りはベッド側ダイクッションと組み合わせる場合あり。</td><td>クッションの有無と力・ストローク。</td></tr><tr><td>複動</td><td>しわ押さえ側と成形側など、独立した動きを組み合わせる構造。</td><td>各スライドの順序・相互干渉。</td></tr><tr><td>順送（プログレッシブ）</td><td>帯材を一ピッチずつ送り、複数工程を一つの金型内で進める。</td><td>送り・パイロット・端材排出。</td></tr><tr><td>トランスファ</td><td>工程間で個別のブランクや半製品を搬送する。</td><td>搬送とスライドの同期・干渉。</td></tr><tr><td>タンデム</td><td>複数台のプレスを並べて工程を分担する。</td><td>各機の能力、搬送、前後工程の同期。</td></tr></tbody></table>';section.append(table);
 section.append(el('h3','','④ 能力を読むときの要点'));
 const ability=el('div','pressNote121');ability.innerHTML='<b>機械式では「公称能力」だけで選ばない：</b>圧力能力（最大の許容加圧力）、トルク能力（下死点からの位置ごとの発生可能荷重）、仕事能力（1ストロークで使えるエネルギー）を加工荷重曲線と照合します。油圧式・サーボ式にも型式ごとの力・速度・ストローク・熱などの制限があります。<br><b>金型との照合：</b>ダイハイト、ストローク、ボルスタとスライド寸法、偏心荷重、ダイクッション、搬送干渉を図面・仕様書で確認。';section.append(ability);
 section.append(el('h3','','⑤ 点検で見る箇所'));
 const checks=el('ul');['スライド／ボルスタの平行、ガイドの摩耗、金型固定と上・下型の芯を確認。','クラッチ・ブレーキ／サーボ／油圧弁など、駆動方式に合った停止・保持系を確認。','送り装置・端材排出・ダイクッション・過負荷保護が工程と連動しているか確認。','安全装置はプレスと金型の組合せ、作業方法、メーカー資料に沿って点検。電源・油圧・重力による残留エネルギーは設備手順で隔離。'].forEach(t=>checks.append(el('li','',t)));section.append(checks);
 const refs=el('div','lineLinks118');refs.append(el('h3','','参照資料'));[['AIDA：プレス能力の3要素','https://press-info.aida.co.jp/blog/technical/entry-146.html'],['AIDA：Cフレームプレス','https://www.aida.co.jp/products/product1.html'],['AIDA：サーボプレス','https://www.aida.co.jp/products/product78.html'],['Schuler：油圧トランスファプレス','https://www.schulergroup.com/technologien/produkte/transferpressen_hydraulisch/index.html?sLang=en'],['Schuler：深絞りと複動プレス','https://www.schulergroup.com/technologien/produkte/grundlagen_blechumformung_tiefziehen_presse/index.html?sLang=en']].forEach(([name,url])=>{const a=el('a','',name+' ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';refs.append(a)});section.append(refs);
 document.getElementById('material60').before(section);
}
document.addEventListener('DOMContentLoaded',create);
})();
