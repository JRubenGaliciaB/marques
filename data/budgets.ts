import type {Budget,Expense} from './types';
// Montos MXN. Series redondeadas transcritas de las diapositivas 9,10,13,14.
// 2020 no aparece en la presentación: null significa desconocido, nunca cero.
// Los porcentajes usan presupuesto asignado a dependencias; NO presupuesto municipal total.
export const budgets:Budget[] = [
 {year:2020,municipal:null,municipalShare:null,state:null,stateShare:null,status:'pending'},
 ...[2021,2022,2023,2024,2025,2026].map((year,i)=>({year,municipal:[5600000,6200000,6300000,15100000,14400000,7939110][i],municipalShare:[.38,.34,.26,.46,.44,.21][i],state:[28600000,42400000,50400000,51300000,53600000,56100000][i],stateShare:[.65,.87,.96,.91,.92,.93][i],status:'presentation' as const}))
];
export const expenses:Expense[]=[{name:'Servicios personales',amount:3763508,color:'#56436e'},{name:'Materiales y suministros',amount:731328,color:'#f5a0f4'},{name:'Servicios generales',amount:3444274,color:'#179fc2'},{name:'Subsidios y ayudas',amount:0,color:'#ddd'}];
export const budget2026=7939110;
