import type { Municipality, AgeBand, Projection } from './types';

// Datos oficiales con porcentaje juvenil (15–29 años)
const rows: [string, string, number | null, number][] = [
  ['011', 'El Marqués', 95462, 27.00],
  ['005', 'Colón', 7501, 26.59],
  ['007', 'Ezequiel Montes', 7755, 25.52],
  ['018', 'Tolimán', 1077, 25.41],
  ['012', 'Pedro Escobedo', 3282, 25.35],
  ['004', 'Cadereyta de Montes', 321, 24.86],
  ['014', 'Querétaro', 42000, 24.86],
  ['013', 'Peñamiller', 1001, 24.81],
  ['016', 'San Juan del Río', 26157, 24.55],
  ['001', 'Amealco de Bonfil', 6150, 24.47],
  ['006', 'Corregidora', 29795, 23.70],
  ['008', 'Huimilpan', 2688, 23.68],
  ['002', 'Pinal de Amoles', -3867, 23.67],
  ['015', 'San Joaquín', 419, 23.61],
  ['009', 'Jalpan de Serra', 417, 23.40],
  ['017', 'Tequisquiapan', 12231, 23.37],
  ['010', 'Landa de Matamoros', -447, 22.08],
  ['003', 'Arroyo Seco', -462, 22.06]
];

// Ranking de población total 2025, independiente del porcentaje juvenil.
const populationRank2025: Record<string, number> = {
  '014': 1,  // Querétaro
  '011': 2,  // El Marqués
  '016': 3,  // San Juan del Río
  '006': 4,  // Corregidora
  '017': 5,  // Tequisquiapan
  '012': 6,  // Pedro Escobedo
  '005': 7,  // Colón
  '001': 8,  // Amealco de Bonfil
  '004': 9,  // Cadereyta de Montes
  '007': 10, // Ezequiel Montes
  '008': 11, // Huimilpan
  '018': 12, // Tolimán
  '009': 13, // Jalpan de Serra
  '002': 14, // Pinal de Amoles
  '013': 15, // Peñamiller
  '010': 16, // Landa de Matamoros
  '003': 17, // Arroyo Seco
  '015': 18, // San Joaquín
};

export const municipalities: Municipality[] = rows.map(
  ([id, name, change, youthPercent]) => ({
    id: '22' + id,
    name,
    change,
    youthPercent,
    rank2025: populationRank2025[id],
    rank2020: null,
    status: 'presentation',
  })
);

// Grupos de edad 2025
const ageBands2025: AgeBand[] = [
  { age: '00–04', women: 8296, men: 9574 },
  { age: '05–09', women: 11334, men: 11644 },
  { age: '10–14', women: 12239, men: 12923 },
  { age: '15–19', women: 12064, men: 13453 },
  { age: '20–24', women: 15117, men: 15845 },
  { age: '25–29', women: 15797, men: 16065 },
  { age: '30–34', women: 17966, men: 17089 },
  { age: '35–39', women: 15442, men: 15703 },
  { age: '40–44', women: 13906, men: 13442 },
  { age: '45–49', women: 10547, men: 10111 },
  { age: '50–54', women: 8800, men: 9597 },
  { age: '55–59', women: 6494, men: 5698 },
  { age: '60–64', women: 4965, men: 4481 },
  { age: '65–69', women: 4071, men: 3277 },
  { age: '70–74', women: 2813, men: 2315 },
  { age: '75+', women: 3229, men: 2833 }
].map(item => ({
  ...item,
  year: 2025,
  status: 'Queretaro' as const
}));

// Grupos de edad 2020
const ageBands2020: AgeBand[] = [
  { age: '00–04', women: 9717, men: 9890 },
  { age: '05–09', women: 10251, men: 10812 },
  { age: '10–14', women: 9612, men: 9803 },
  { age: '15–19', women: 9243, men: 9272 },
  { age: '20–24', women: 10404, men: 10744 },
  { age: '25–29', women: 12058, men: 11804 },
  { age: '30–34', women: 11760, men: 11559 },
  { age: '35–39', women: 10738, men: 10450 },
  { age: '40–44', women: 8670, men: 8649 },
  { age: '45–49', women: 6704, men: 6823 },
  { age: '50–54', women: 5015, men: 4828 },
  { age: '55–59', women: 3763, men: 3550 },
  { age: '60–64', women: 2870, men: 2683 },
  { age: '65–69', women: 2073, men: 1777 },
  { age: '70–74', women: 1305, men: 1204 },
  { age: '75+', women: 1840, men: 1474 }
].map(item => ({
  ...item,
  year: 2020,
  status: 'Querétaro' as const
}));

// Exportación unificada de ambos años
export const ageBands: AgeBand[] = [...ageBands2020, ...ageBands2025];

// Proyecciones
export const projections: Projection[] = [
  { year: 2026, youth: null, status: 'pending' },
  { year: 2027, youth: null, status: 'pending' }
];

export const demographicClaims = {
  growth: 41,
  newResidents: 95462,
  youthPercent: 27,
  threshold: 100000,
  source: 'Presentación adjunta; pendiente cotejo con tabulados oficiales'
};