import type {Simulation} from './types';
// PT es el presupuesto del año base; el factor Gtotal se aplica una sola vez.
export const defaults:Simulation={total:4031194015.8,basePercent:.4,budgetGrowth:5,youthGrowth:7.45};
export function targetBudget(s:Simulation):number {
 if(Object.values(s).some(v=>!Number.isFinite(v)||v<0)) throw new RangeError('Los parámetros deben ser números no negativos');
 return s.total*(s.basePercent/100)*(1+s.budgetGrowth/100)*(1+s.youthGrowth/100);
}
export const money=(n:number)=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(n);
