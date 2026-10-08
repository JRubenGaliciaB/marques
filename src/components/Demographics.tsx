import {useState} from 'react';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,Legend,Cell} from 'recharts';
import {municipalities,ageBands} from '../../data/demographics';
export default function Demographics(){const[metric,setMetric]=useState<'rank'|'change'>('rank');const[year,setYear]=useState(2025);
    const rows =
  metric === 'rank'
    ? [...municipalities]
        .sort((a, b) => a.rank2025 - b.rank2025)
        .slice(0, 8)
    : municipalities
        .filter(m => m.change !== null)
        .sort((a, b) => (b.change ?? 0) - (a.change ?? 0))
        .slice(0, 8);
    return <><div className="split"><div className="editorial"><span className="big-number">02<span>º</span></span><h3>Una ciudad que cambia de escala.</h3><p>El Marqués se situa como el segundo municipio más poblado del Estado en 2025, con 95,462 nuevos habitantes respecto a 2020.</p></div><div className="panel"><div className="panel-top"><h3>Los municipios que mas crecen 2020-2025</h3><div className="segmented"><button aria-pressed={metric==='rank'} onClick={()=>setMetric('rank')}>Ranking 2025</button><button aria-pressed={metric==='change'} onClick={()=>setMetric('change')}>Cambio 2020–25</button></div></div>{metric==='rank'?<div className="ranking">{rows.map(m=><div key={m.id} className={m.id==='22011'?'highlight':''}><span className="rank">{m.rank2025.toString().padStart(2,'0')}</span><strong>{m.name}</strong><span className="rank-line"/><span>{m.change===null?'Por capturar':'+'+m.change.toLocaleString('es-MX')} <small>hab.</small></span></div>)}</div>:<><div className="chart"><ResponsiveContainer><BarChart data={rows.filter(m=>m.change!==null)} layout="vertical" margin={{left:25,right:25}}><XAxis type="number" tickFormatter={v=>`${v/1000} mil`}/><YAxis
  type="category"
  dataKey="name"
  width={110}
  reversed
  tick={{ fontSize: 12 }}
/><Tooltip formatter={v=>[Number(v).toLocaleString('es-MX'),'Nuevos habitantes']}/><Bar dataKey="change" radius={[0,4,4,0]}>{rows.filter(m=>m.change!==null).map(m=><Cell key={m.id} fill={m.id==='22011'?'#179fc2':'#56436e'}/>)}</Bar></BarChart></ResponsiveContainer></div></>}</div></div><div className="panel pyramid"><div className="panel-top"><div><p className="eyebrow">La estructura por edad</p><h3>¿Cómo se compone la población de El Marqués?</h3></div><label>Año <select value={year} onChange={e=>setYear(+e.target.value)}><option>2020</option><option>2025</option></select></label></div><div className="chart"><ResponsiveContainer><BarChart data={ageBands.filter(d=>d.year===year).map(d=>({...d,men:-d.men}))} layout="vertical" stackOffset="sign" margin={{left:0,right:15}}><CartesianGrid strokeDasharray="3 3" horizontal={false}/><XAxis type="number" tickFormatter={v=>`${Math.abs(v)/1000} mil`}/><YAxis type="category" dataKey="age" width={55}/><Tooltip formatter={(v,name)=>[Math.abs(Number(v)).toLocaleString('es-MX'),name]}/><Legend/><Bar name="Hombres" dataKey="men" stackId="age" fill="#179fc2"/><Bar name="Mujeres" dataKey="women" stackId="age" fill="#56436e"/></BarChart></ResponsiveContainer></div></div></>}
