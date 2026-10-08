import {lazy,Suspense} from 'react';import {ArrowDown,ChartNoAxesCombined} from 'lucide-react';import {StoryNav,StorySection,Counter} from './components/Scrollytelling';import Demographics from './components/Demographics';import BudgetCharts from './components/BudgetCharts';import Calculator from './components/Calculator';const YouthMap=lazy(()=>import('./components/YouthMap'));
export default function App(){return <><a href="#poblacion" className="skip">Saltar al contenido</a><header><a className="brand" href="#introduccion"><ChartNoAxesCombined/><span>EL MARQUÉS <b>JOVEN</b></span></a><span className="header-meta">POBLACIÓN + PRESUPUESTO <span>2020—2026</span></span><a className="header-cta" href="#simulador">Simular 2027</a></header><main><section id="introduccion" className="hero"><div className="hero-top"><p className="eyebrow">El Marqués, Querétaro · Su desarollo en datos</p><span className="edition">01 / 05</span></div><div className="hero-grid"><div><h1>La juventud crece.<br/>¿Su presupuesto<br/><span>también?</span></h1><p className="hero-description">El Marqués es el municipio con mayor porcentaje de jovenes de todo el Estado. Explora su presupuesto y simula los escenarios para 2027.</p><a className="start" href="#poblacion">Explorar la historia <ArrowDown size={18}/></a></div><div className="hero-data"><p className="eyebrow">Dos trayectorias que debemos mirar juntas</p><div className="trajectory"><div><span>POBLACIÓN TOTAL · 2020–25</span><strong>+<Counter value={41} suffix="%"/></strong><div className="trajectory-bar population"/><small>Crecimiento reportado en la presentación</small></div><div><span>PRESUPUESTO Instituto Municipal de la Juventud · 2025–26</span><strong>−44.9%</strong><div className="trajectory-bar budget"/><small>De $14.4 M a $7.94 M · pesos corrientes</small></div></div><p className="hero-footnote">Periodos y magnitudes distintos; se muestran para abrir la pregunta, no como una relación causal.</p></div></div><div className="kpis"><div><span>01 · NUEVOS HABITANTES</span><strong>+<Counter value={95462}/></strong><small>Entre 2020 y 2025 · EIC 2025 INEGI</small></div><div><span>02 · POBLACIÓN JOVEN</span><strong>≈<Counter value={27} suffix="%"/></strong><small>15–29 años · EIC 2025 INEGI</small></div><div><span>03 · PRESUPUESTO Instituto Municipal de la Juventud 2026</span><strong>$7.94 <em>M</em></strong><small>$7,939,110 pesos asignados</small></div></div></section><StoryNav/><div className="story-body">
<StorySection
  id="poblacion"
  kicker="01 / La nueva realidad urbana"
  title="¿Cómo ha cambiado la población en Querétaro?"
>
  <div style={{ marginBottom: '40px' }}>
    <iframe
      src="/mapa-crecimiento/index.html"
      title="Mapa interactivo del crecimiento poblacional de Querétaro"
      loading="lazy"
      style={{
        width: '100%',
        height: '850px',
        border: '1px solid #ded5df',
        borderRadius: '8px',
        display: 'block',
        background: '#f6f5f1',
      }}
    />
  </div>

  <Demographics />
</StorySection>    
<StorySection id="territorio" kicker="02 / Un territorio joven" title="¿Dónde se concentra la juventud?"><p className="section-intro">La edad importa. La concentración de jóvenes de 15–29 años y la proyección de 20–34 años responden a preguntas diferentes.</p><Suspense fallback={<div className="panel">Cargando mapa municipal…</div>}><YouthMap/></Suspense></StorySection><div className="bridge"><p className="eyebrow">De la realidad demográfica a la lógica presupuestal</p><p>Una ciudad que crece necesita<br/><strong>un presupuesto que responda.</strong></p></div><StorySection id="presupuesto" kicker="03 / La inversión pública" title="¿Se invierte lo suficiente en las juventudes?"><BudgetCharts/></StorySection><StorySection id="simulador" kicker="04 / Del diagnóstico a la propuesta" title="¿Qué presupuesto podemos construir para 2027?"><p className="section-intro">Prueba un piso progresivo que crezca con la capacidad financiera del municipio y con su población joven.</p><Calculator/></StorySection></div></main><footer><div className="footer-title">El futuro también<br/>se <span>presupuesta.</span></div><div><p>El Marqués Joven · Exploración presupuestal</p><p className="note">«Conocer e incidir en el presupuesto para Juventudes»</p><a href="https://www.inegi.org.mx/programas/eic/2025/" target="_blank" rel="noreferrer">Consultar Encuesta Intercensal 2025 · INEGI</a></div></footer></>}
