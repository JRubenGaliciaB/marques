export type DataStatus = 'presentation' | 'example' | 'pending';
export interface Municipality { id:string; name:string; rank2020:number|null; rank2025:number; change:number|null; youthPercent:number|null; status:DataStatus }
export interface AgeBand { age:string; men:number; women:number; year:number; status:DataStatus }
export interface Budget { year:number; municipal:number|null; municipalShare:number|null; state:number|null; stateShare:number|null; status:DataStatus }
export interface Expense { name:string; amount:number; color:string }
export interface Projection { year:number; youth:number|null; status:DataStatus }
export interface Simulation { total:number; basePercent:number; budgetGrowth:number; youthGrowth:number }
