import {test} from 'node:test';import assert from 'node:assert/strict';import {targetBudget,defaults} from '../data/simulator.ts';
test('la fórmula usa porcentajes, no enteros, y aplica crecimiento una sola vez',()=>{assert.equal(targetBudget({total:1000,basePercent:1,budgetGrowth:10,youthGrowth:20}),13.2)});
test('calcula los parámetros de la diapositiva 20 sin copiar su error aritmético',()=>{assert.ok(Math.abs(targetBudget(defaults)-18192375.4739)<.01)});
test('sin crecimientos preserva el porcentaje base',()=>{assert.equal(targetBudget({total:1000,basePercent:.4,budgetGrowth:0,youthGrowth:0}),4)});
test('rechaza entrada no válida',()=>{assert.throws(()=>targetBudget({...defaults,total:NaN}),RangeError);assert.throws(()=>targetBudget({...defaults,basePercent:-1}),RangeError)});
