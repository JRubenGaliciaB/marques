import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { geoMercator } from 'd3-geo';
import { pointOnFeature } from '@turf/point-on-feature';
import { FEDERAL_DISTRICTS_GEOJSON as geo } from './data/geoData';
import { MODO_DEMO, CRECIMIENTO_MUNICIPAL, CRECIMIENTO_SECCIONES, NOMBRES_MUNICIPIOS } from './data/crecimiento';
import './style.css';
const features=geo.features.filter((f:any)=>Number(f.properties.ENTIDAD)===22 && ['Polygon','MultiPolygon'].includes(f.geometry?.type));
if(!features.length) throw new Error('No hay polígonos de ENTIDAD 22');
// Mercator local. Coordenadas longitudinales y latitudinales, sin dibujar el estado a mano.
const projection=geoMercator().center([-99.8,20.8]).scale(1).translate([0,0]);
let minX=Infinity,maxX=-Infinity,minZ=Infinity,maxZ=-Infinity;
for(const f of features){const polys=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;for(const poly of polys)for(const ring of poly)for(const c of ring){const [x,z]=projection(c)!;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minZ=Math.min(minZ,z);maxZ=Math.max(maxZ,z);}}
const scale=100/Math.max(maxX-minX,maxZ-minZ),cx=(minX+maxX)/2,cz=(minZ+maxZ)/2;
const project=(c:number[])=>{const p=projection(c)!;return [(p[0]-cx)*scale,(p[1]-cz)*scale];};
function value(f:any):number|null{
 const m=Number(f.properties.MUNICIPIO),s=Number(f.properties.SECCION),key=`${m}:${s}`;
 // Ficticio y determinista; no pretende representar población real.
 if(MODO_DEMO){const hash=((m*73856093)^(s*19349663))>>>0;return m%5===0?-2-(hash%40)/10:Math.round((2+(hash%800)/20)*10)/10;}
 const raw=Object.hasOwn(CRECIMIENTO_SECCIONES,key)?CRECIMIENTO_SECCIONES[key]:CRECIMIENTO_MUNICIPAL[m];
 if(raw===null||raw===undefined)return null;
 if(typeof raw!=='number'||!Number.isFinite(raw))throw new Error(`Porcentaje inválido en ${key}`);
 return raw;
}
const rows=features.map((f:any)=>({f,v:value(f)}));
const max=Math.max(0,...rows.map((r:any)=>r.v??0));
const palette=['#1476d4','#1fc2c9','#edd64b','#ed842c','#db292c'].map(c=>new THREE.Color(c));
function color(v:number|null){if(v===null)return new THREE.Color('#a9b3b8');const t=Math.max(0,Math.min(1,v/(max||1)))*4,i=Math.min(3,Math.floor(t));return palette[i].clone().lerp(palette[i+1],t-i);}
const host=document.querySelector<HTMLElement>('#map')!;
const scene=new THREE.Scene();scene.background=new THREE.Color('#f6f5f1');
const camera=new THREE.PerspectiveCamera(38,1,.1,1000);
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));host.prepend(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.maxPolarAngle=Math.PI/2-.05;controls.minDistance=25;controls.maxDistance=350;
function reset(){camera.position.set(35,100,125);controls.target.set(0,0,0);controls.update();}reset();
scene.add(new THREE.HemisphereLight(0xffffff,0x6e7780,2.4));const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(-40,100,50);scene.add(light);
const base=new THREE.Group();scene.add(base);const edges:number[]=[];
for(const f of features){const polys=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
 for(const poly of polys){const shape=new THREE.Shape();poly.forEach((ring:number[][],index:number)=>{const path=index===0?shape:new THREE.Path();ring.forEach((c,i)=>{const [x,z]=project(c);i===0?path.moveTo(x,-z):path.lineTo(x,-z);});if(index>0)shape.holes.push(path);for(let i=1;i<ring.length;i++){const a=project(ring[i-1]),b=project(ring[i]);edges.push(a[0],.035,a[1],b[0],.035,b[1]);}});
 const geometry=new THREE.ShapeGeometry(shape);geometry.rotateX(-Math.PI/2);base.add(new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color:'#e7e9e3',roughness:1,side:THREE.DoubleSide})));}}
const lineGeo=new THREE.BufferGeometry();lineGeo.setAttribute('position',new THREE.Float32BufferAttribute(edges,3));base.add(new THREE.LineSegments(lineGeo,new THREE.LineBasicMaterial({color:'#b7c4c7',transparent:true,opacity:.5})));
const cone=new THREE.ConeGeometry(.20,1,7);cone.translate(0,.5,0);
const disc=new THREE.CircleGeometry(.24,12);disc.rotateX(-Math.PI/2);
const marks:THREE.Mesh[]=[];const spikes:THREE.Mesh[]=[];
for(const {f,v} of rows){const c=pointOnFeature(f).geometry.coordinates,[x,z]=project(c);const positive=v!==null&&v>0;const mesh=new THREE.Mesh(positive?cone:disc,new THREE.MeshStandardMaterial({color:color(v),roughness:.72,side:THREE.DoubleSide}));mesh.position.set(x,.06,z);if(positive){mesh.scale.y=v!/max*24;mesh.userData.height=mesh.scale.y;spikes.push(mesh);}mesh.userData.feature=f;mesh.userData.value=v;scene.add(mesh);marks.push(mesh);}
document.querySelector('#mode')!.textContent=MODO_DEMO?'DEMOSTRACIÓN · porcentajes ficticios':'DATOS CAPTURADOS · distribución estimada';
document.querySelector('#maximum')!.textContent=`${max.toFixed(1)}%`;
document.querySelector('#count')!.textContent=`${rows.length} secciones · ${spikes.length} picos · ${rows.filter(r=>r.v===null).length} sin dato (gris)`;
document.querySelector('#height')!.addEventListener('input',(e)=>{const k=Number((e.target as HTMLInputElement).value);spikes.forEach(m=>m.scale.y=m.userData.height*k);});
document.querySelector('#reset')!.addEventListener('click',reset);
document.querySelector('#export')!.addEventListener('click',()=>{renderer.render(scene,camera);const a=document.createElement('a');a.download=MODO_DEMO?'Querétaro-DEMO.png':'Querétaro-crecimiento.png';const output=document.createElement('canvas');output.width=renderer.domElement.width;output.height=renderer.domElement.height;const ctx=output.getContext('2d')!;ctx.drawImage(renderer.domElement,0,0);const size=Math.max(14,output.width/70);ctx.font=`${size}px Arial`;ctx.fillStyle='#263b43';ctx.fillText('Querétaro · crecimiento porcentual por sección',20,30);ctx.fillText(MODO_DEMO?'DEMOSTRACIÓN: porcentajes ficticios':'Distribución por sección estimada manualmente',20,30+size*1.6);ctx.fillText(`Azul: ≤ 0% (sin pico) · Rojo: ${max.toFixed(1)}% · Gris: sin dato`,20,output.height-20);a.href=output.toDataURL('image/png');a.click();});
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),tip=document.querySelector<HTMLElement>('#tip')!;
function pick(e:PointerEvent){const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(marks)[0];tip.hidden=!hit;if(hit){const {feature:f,value:v}=hit.object.userData;const m=f.properties.MUNICIPIO;tip.textContent=`${NOMBRES_MUNICIPIOS[m]||'Municipio código '+m}\nSección ${f.properties.SECCION}\n${v===null?'Sin dato':v.toFixed(2)+'% de crecimiento'}${MODO_DEMO?'\nDEMO: dato ficticio':''}`;tip.style.left=Math.max(0,Math.min(e.clientX-r.left+14,r.width-260))+'px';tip.style.top=Math.max(100,Math.min(e.clientY-r.top+14,r.height-120))+'px';}}
renderer.domElement.addEventListener('pointermove',pick);renderer.domElement.addEventListener('pointerup',pick);renderer.domElement.addEventListener('pointerleave',()=>tip.hidden=true);
new ResizeObserver(()=>{const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);}).observe(host);
renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera);});
