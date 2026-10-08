# El Marqués Joven

Plataforma de data storytelling en español. React + Vite + TypeScript, Tailwind, Framer Motion, Recharts y React Leaflet. Adaptable a escritorio y móvil, navegación por capítulos con Intersection Observer y soporte de movimiento reducido.

## Iniciar

Node 22.18+ o 24 LTS. Instalar con `npm ci`, iniciar con `npm run dev`. `npm run build` verifica TypeScript y genera `dist`. `npm run preview` sirve esa compilación. `npm test` verifica la fórmula del simulador.

## GitHub y Vercel

Crear un repositorio vacío en GitHub y subir el contenido de esta carpeta, incluido package-lock.json. No subir node_modules ni dist. En Vercel importar el repositorio y elegir Vite: comando de instalación `npm ci`, compilación `npm run build`, salida `dist`. Se incluye vercel.json. No requiere variables de entorno, API keys ni backend. GitHub Actions verifica tipos, compilación y pruebas en cada push/PR. No se creó un repositorio remoto ni se publicó en una cuenta Vercel.

## Estructura

- `src/components/Scrollytelling.tsx`: capítulos, contadores y entrada animada.
- `Demographics.tsx`: ranking, variaciones y pirámide por año.
- `YouthMap.tsx`: GeoJSON local, capas independientes, selección y horizonte.
- `BudgetCharts.tsx`: monto MXN y proporción con ejes separados, comparativa estatal y gasto.
- `Calculator.tsx`: entradas numéricas, sliders, reinicio y escenarios.
- `data/types.ts`: contratos comunes.
- `data/demographics.ts`: municipios y pirámide editable.
- `data/budgets.ts`: series presupuestales y capítulos.
- `data/simulator.ts`: parámetros y función pura.
- `data/queretaro-geo.json`: 18 municipios, geometrías simplificadas.

## Completar datos

Se evita mezclar ejemplos con datos reportados. `status` admite presentation, example y pending. Los datos se guardan fuera de componentes. null significa pendiente, nunca cero.

1. Presupuestos: datos transcritos de las diapositivas 9,10,11,13,14. Montos en pesos nominales; históricos redondeados. 2020 queda null porque no figura. Completar con fuente primaria si se dispone.
2. Ranking 2025/variaciones: diapositiva 3. No se presenta un cambio de ranking 2020→2025 porque falta la columna 2020. Completar `rank2020` y adaptar la gráfica si se desea mostrar ascensos validados. Las variaciones ambiguas de San Juan del Río y Corregidora quedan null.
3. Pirámide: TODOS los valores son ejemplos sintéticos, señalados en pantalla. Sustituir `ageBands` con edades y sexo para 2020/2025.
4. Mapa: solo El Marqués contiene ≈27%, según PDF/prompt. Otros porcentajes quedan null y gris; no se fabrica una coropleta multivalor. Al agregar porcentajes, se colorean automáticamente en bandas <21%, 21–24%, 24–27% y ≥27%; ajustar leyenda y umbrales a la distribución validada. Se incluye GeoJSON real, no un esquema inventado. Límites originales INEGI vía https://github.com/MacWilliXD/INEGI-geojson/tree/main/Municipios-OLD, simplificados a 0.002 grados. Verificar actualización y condiciones de reutilización antes de uso oficial. Es una visualización, no cartografía de precisión.
5. Proyección 20–34: PDF indica barrera de 100 mil entre 2026–2027, sin valores anuales. `projections` queda null. La capa es un marcador del horizonte declarado, no una serie demográfica calculada. No mezclar con 15–29.
6. Los porcentajes presupuestales originales usan gasto asignado a dependencias, NO presupuesto total municipal. No calcular inversión per cápita sin series compatibles.

## Fórmula y discrepancia del PDF

PM = PT × (Pbase / 100) × (1 + Gtotal / 100) × (1 + Gjoven / 100).
PT debe ser el total del año BASE. Con 4,031,194,015.80, 0.4%, 5% y 7.45% se obtiene 18,192,375.47 (el PDF muestra 18,192,260.63: diferencia aritmética de 114.84 pesos). El escenario del 10% mantiene esos mismos PT/Pbase/Gjoven y sustituye solo Gtotal. La diapositiva final mezcla el título 10%, factor 05%, Gjoven 1.2 y otro PT; no se transcribe su resultado como cálculo válido. El porcentaje sobre PT base y sobre PT proyectado se etiquetan por separado. Los ejemplos son simulaciones, no presupuestos aprobados.

## Fuente visual y editorial

Presentación adjunta PresupuestojuventudesEM_2.pdf. Paleta crema #fff5ec, turquesa #179fc2, morado #56436e y rosa #f5a0f4, titulares negros grandes. Enlace oficial para cotejar tabulados: https://www.inegi.org.mx/programas/eic/2025/ . No se presenta el contenido del PDF como verificación independiente de INEGI.

## Verificación de esta entrega

Compilación de producción y TypeScript correctos; cuatro pruebas de fórmula correctas; 18 geometrías municipales válidas. No se completó QA visual de navegador: la instalación del navegador de pruebas falló en el entorno. Revisar en `npm run dev` escritorio/móvil antes de publicar.
