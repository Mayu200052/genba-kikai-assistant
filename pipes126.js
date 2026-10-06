(()=>{'use strict';
// Nominal dimensions transcribed from manufacturer tables; IDs are calculated.
const base=[
[8,'1/4',13.8,2.3,null,null,3, null],
[10,'3/8',17.3,2.3,2.3,2.8,3.2,null],
[15,'1/2',21.7,2.8,2.8,3.2,3.7,4.7],
[20,'3/4',27.2,2.8,2.9,3.4,3.9,5.5],
[25,'1',34,3.2,3.4,3.9,4.5,6.4],
[32,'1 1/4',42.7,3.5,3.6,4.5,4.9,6.4],
[40,'1 1/2',48.6,3.5,3.7,4.5,5.1,7.1],
[50,'2',60.5,3.8,3.9,4.9,5.5,8.7],
[65,'2 1/2',76.3,4.2,5.2,6,7,9.5],
[80,'3',89.1,4.2,5.5,6.6,7.6,11.1],
[90,'3 1/2',101.6,4.2,5.7,7,8.1,null],
[100,'4',114.3,4.5,6,7.1,8.6,13.5],
[125,'5',139.8,4.5,6.6,8.1,9.5,null],
[150,'6',165.2,5,7.1,9.3,11,null],
[175,'7',190.7,5.3,null,null,null,null],
[200,'8',216.3,5.8,8.2,10.3,12.7,null],
[225,'9',241.8,6.2,null,null,null,null],
[250,'10',267.4,6.6,9.3,12.7,15.1,null],
[300,'12',318.5,6.9,10.3,14.3,17.4,null],
[350,'14',355.6,7.9,11.1,15.1,19,null],
[400,'16',406.4,7.9,12.7,16.7,21.4,null],
[450,'18',457.2,7.9,14.3,19,23.8,null],
[500,'20',508,7.9,15.1,20.6,26.2,null],
[550,'22',558.8,null,15.9,null,null,null]];
const tube=[['TU0212',2,1.2],['TU0425',4,2.5],['TU0604',6,4],['TU0805',8,5],['TU1065',10,6.5],['TU1208',12,8],['TU1610',16,10]];
const kinds={sgp:'一般・低圧用 SGP',stpg:'圧力配管 STPG',sts:'高圧配管 STS370',air:'空圧チューブ SMC TU'};
const rows=(kind,sch)=>kind==='air'?tube.map(([model,od,id])=>({model,od,id,t:(od-id)/2})):base.flatMap(r=>{const col=kind==='sgp'?3:({'40':4,'60':5,'80':6,'160':7}[sch]);if(col===undefined||r[col]==null||kind==='sts'&&![8,10,15,20,25,32,40,50,65,80,100].includes(r[0])||kind==='stpg'&&(sch==='160'||r[0]===8))return [];return [{a:r[0],b:r[1],od:r[2],t:r[col],id:Number((r[2]-2*r[col]).toFixed(3))}]});
const norm=s=>String(s).normalize('NFKC').toLowerCase().replace(/[φΦϕ⌀]/g,'').trim();
const match=(r,q)=>{q=norm(q);if(!q)return true;if(/^\d+a$/.test(q))return r.a===Number(q.slice(0,-1));if(q.endsWith('b'))return norm(r.b||'')===q.slice(0,-1).trim();return [r.model,r.a,r.b,r.a?`${r.a}A`:'',r.b?`${r.b}B`:'',r.od].filter(x=>x!==undefined).some(x=>norm(x).includes(q))};
window.GenbaPipes126={rows,match};
document.addEventListener('DOMContentLoaded',()=>{
const s=document.createElement('section');s.id='pipes126';s.className='card pipes126';
s.innerHTML=`<h2>🔩 配管サイズ早見表｜A・B呼称／外径・内径</h2><p>A・Bは呼び径です。例えば25A＝1Bですが、外径は34.0 mmです。呼び径をそのまま実際の内径・外径として使わないでください。</p>
<div class="pipeControls126"><label>配管の種類<select id="pipeKind126">${Object.entries(kinds).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></label><label id="pipeSchLabel126">肉厚区分<select id="pipeSch126"></select></label><label>呼称・外径・型式で検索<input id="pipeQuery126" type="search" placeholder="例：25A、1/2B、21.7、TU0604"></label><button type="button" id="pipeClear126">検索をクリア</button></div>
<p id="pipeInfo126"></p><p><b>単位：mm。内径は公称外径 − 2 × 公称肉厚の計算値</b>です。製造公差、めっき・ライニング、摩耗を含む実測内径ではありません。空圧TUは資料の内径を表示し、肉厚を計算しています。</p>
<svg viewBox="0 0 420 210" role="img" aria-label="管断面：外径D、内径d、肉厚t。内径は外径から肉厚の2倍を引く" style="width:100%;max-width:520px;background:#f1f7fb"><circle cx="115" cy="105" r="80" fill="#b5d1e3" stroke="#24628b" stroke-width="3"/><circle cx="115" cy="105" r="52" fill="white" stroke="#24628b" stroke-width="3"/><path d="M35 25H195 M35 18V32 M195 18V32 M63 105H167 M63 98V112 M167 98V112 M167 145H195" stroke="#182e41" stroke-width="2"/><g font-size="17" fill="#182e41"><text x="80" y="18">外径 D</text><text x="83" y="97">内径 d</text><text x="207" y="151">肉厚 t</text><text x="225" y="65">d = D − 2t</text><text x="225" y="96">断面の模式図</text></g></svg>
<p id="pipeCount126" role="status" aria-live="polite"></p><div class="pipeTable126" tabindex="0" role="region" aria-label="配管寸法表・横にスクロールできます"><table><caption id="pipeCaption126"></caption><thead><tr><th>A呼称</th><th>B呼称／型式</th><th>外径</th><th>肉厚</th><th>内径</th></tr></thead><tbody id="pipeBody126"></tbody></table></div><p id="pipeEmpty126" hidden>該当する寸法がありません。検索をクリアするか、配管の種類を切り替えてください。</p>
<details><summary>使い方・配管選定時の確認</summary><p>① 種類を選択 → ② スケジュールを選択 → ③ 呼称か外径で検索。B呼称は「1/2B」「1 1/4B」の形式で検索できます。同じ呼称・スケジュールでも、異なる規格や材質を同じ物として扱わないでください。</p><p>スケジュール番号は肉厚区分であり、許容圧力そのものではありません。この表は寸法確認用です。使用圧力・温度・流体・材質・腐食代・継手・接続方法を含め、設備仕様とメーカーの選定資料で確認してください。高圧ホース、ステンレス管、塩ビ管、銅管はこの表の対象外です。</p><p>空圧チューブの外径6 mmと6A、継手のねじ呼び1/4は別の寸法です。チューブ外径とねじ側の規格をそれぞれ確認してください。他社品やナイロン品は同じ外径でも内径が異なる場合があります。</p></details>
<details><summary>収録範囲・寸法の出典</summary><p>SGP：8～500A。STPG：10～550AのSch40・60・80の資料掲載寸法。STS370：8～100AのSch80、15～100AのSch160（90Aを除く）。掲載のない組合せは推定せず表示しません。全規格・全製造範囲を網羅する表ではありません。</p><ul><li><a target="_blank" rel="noopener" href="https://www.nipponsteel.com/product/construction/pdf/E001_4-02.pdf">日本製鉄：設備用材／配管用鋼管（SGP・STPG寸法）</a></li><li><a target="_blank" rel="noopener" href="https://www.hyd.daikin.co.jp/-/media/Project/Daikin/hyd_daikin_co_jp/common/products00/cataloge/jp/HK253F_T-015-pdf.pdf">ダイキン：油圧配管 技術資料 T-15（STS370・8A SGP寸法）</a></li><li><a target="_blank" rel="noopener" href="https://ca01.smcworld.com/catalog/BEST-5-6-en/6-p0410-0454tube_en/spdfdata/6-p0410-0454tube_en_4sp.htm">SMC：TUポリウレタンチューブ寸法</a></li></ul><p>資料確認：2026-10-06。メーカー公開資料の掲載寸法を収録。規格の最新版・購入品の仕様は発注時に確認してください。表はアプリ内に保存され、出典リンクの閲覧時のみ通信します。</p></details>`;
(document.getElementById('material60')||document.body.lastElementChild).before(s);
const $=id=>s.querySelector('#'+id),kind=$('pipeKind126'),sch=$('pipeSch126'),q=$('pipeQuery126');
const info={sgp:'SGP：JIS G 3452の一般配管用炭素鋼鋼管。低圧系の寸法参照用。',stpg:'STPG：JIS G 3454の圧力配管用炭素鋼鋼管。肉厚区分を選んで比較できます。',sts:'STS370：JIS G 3455の高圧配管用炭素鋼鋼管。資料で確認できたSch80・160を収録。',air:'SMC TU：ポリウレタン製・メートルサイズの代表7型式。A・B呼称は適用しません。'};
function render(){const all=rows(kind.value,sch.value),out=all.filter(r=>match(r,q.value));$('pipeInfo126').textContent=info[kind.value];$('pipeCount126').textContent=`${out.length}件表示／${all.length}件`;$('pipeCaption126').textContent=kinds[kind.value]+(sch.disabled?'':' / Sch'+sch.value);$('pipeBody126').replaceChildren();for(const r of out){const tr=document.createElement('tr');for(const val of [r.a?`${r.a}A`:'—',r.model||`${r.b}B`,r.od.toFixed(2),r.t.toFixed(2),r.id.toFixed(2)]){const td=document.createElement('td');td.textContent=val;tr.append(td)}$('pipeBody126').append(tr)}$('pipeEmpty126').hidden=out.length>0;}
function change(){const values=kind.value==='stpg'?['40','60','80']:kind.value==='sts'?['80','160']:[];sch.replaceChildren();for(const v of values){const o=document.createElement('option');o.value=v;o.textContent='Sch'+v;sch.append(o)}sch.disabled=!values.length;$('pipeSchLabel126').hidden=!values.length;render()}
kind.addEventListener('change',change);sch.addEventListener('change',render);q.addEventListener('input',render);$('pipeClear126').addEventListener('click',()=>{q.value='';render()});change();
});})();
