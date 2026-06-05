# 🏥 Instrucciones de Instalación y Ejecución

## Ruta de Navegación en la App

El módulo de Salud Humana está disponible en la ruta `/health` de tu aplicación.

Para acceder desde la navegación principal, asegúrate de que en `src/routes/AppRouter.jsx` esté importado:

```jsx
import Health from '../views/Health/Health.jsx';

// En tu router:
<Route path="/health" element={<Health />} />
```

---

## 📦 Estructura de Carpetas Creada

```
frontend/src/views/Health/
├── Health.jsx                              # Componente principal
├── SupervisorDashboard.jsx                 # Dashboard del supervisor
├── ClientView.jsx                          # Vista del cliente/paciente
├── GamificationSystem.jsx                  # Sistema de gamificación
├── HealthIndicators.jsx                    # Indicadores y gráficos
├── README.md                               # Documentación completa
├── data/
│   └── healthDatasets.js                   # Todos los datasets
├── utils/
│   └── analyticsHelpers.js                 # Funciones de análisis
└── examples/
    └── usageExamples.js                    # Ejemplos prácticos
```

---

## 🚀 Cómo Ejecutar

### 1. Asegúrate que las dependencias estén instaladas

```bash
cd frontend
npm install
```

### 2. Inicia el servidor de desarrollo

```bash
npm run dev
```

### 3. Accede a la aplicación

```
http://localhost:5173/health
```

---

## 📱 Vistas Disponibles

### 1. Dashboard Supervisor (👨‍⚕️)
**URL**: `/health` (por defecto)

Controla:
- ✓ Protocolos de esterilización
- ✓ Registros de RPBI
- ✓ Inventario de EPP
- ✓ Estado de áreas
- ✓ Incidentes

**Tabs**: Resumen General, Esterilización, RPBI, EPP, Incidentes

### 2. Vista Cliente/Paciente (🏥)
Haz clic en el botón "Vista Cliente/Paciente" en la barra de navegación

Ver:
- ✓ Indicadores de higiene en tiempo real
- ✓ Código QR de verificación
- ✓ Estado de cada área
- ✓ Información de seguridad

### 3. Sistema de Gamificación (🏆)
Haz clic en el botón "Sistema de Gamificación"

Obtén:
- ✓ Medallas y logros
- ✓ Puntos acumulados
- ✓ Nivel de reputación
- ✓ Beneficios desbloqueados

### 4. Indicadores de Salud (📊)
Haz clic en el botón "Indicadores de Salud"

Analiza:
- ✓ Gráficos históricos
- ✓ Tendencias
- ✓ Impacto en clientes
- ✓ KPIs consolidados

---

## 🔍 Cómo Usar los Datasets

### Acceder a los datos en componentes React

```jsx
import { 
  sterilizationProtocols,
  bioWasteRecords,
  personalProtectiveEquipment,
  disinfectionAreas,
  incidents,
  hygienicScoreHistory,
  clientMetrics,
  achievements
} from '../data/healthDatasets.js';

// En tu componente:
const MyComponent = () => {
  return (
    <div>
      {sterilizationProtocols.map(protocol => (
        <div key={protocol.id}>{protocol.name}</div>
      ))}
    </div>
  );
};
```

### Usar las funciones de análisis

```jsx
import {
  sterilizationAnalytics,
  bioWasteAnalytics,
  eppAnalytics,
  disinfectionAnalytics,
  // ... más
} from '../utils/analyticsHelpers.js';

// Calcular promedios:
const avgHygiene = disinfectionAnalytics.getAverageHygiene();
const avgEfficiency = sterilizationAnalytics.getAverageEfficiency();

// Obtener alertas:
const criticalEPP = eppAnalytics.getCriticalItems();
const activeIncidents = incidentAnalytics.getActiveIncidents();
```

### Ejecutar ejemplos en consola

```js
// En la consola del navegador (DevTools):
import { generateExecutiveSummary } from './examples/usageExamples.js';

generateExecutiveSummary();
```

---

## 🎨 Colores Utilizados

### Paleta Base (HeroUI)

```javascript
// Verde - Seguro / Óptimo
PRIMARY: #10B981

// Amarillo - Atención / Advertencia
WARNING: #F59E0B

// Rojo - Crítico / Alto Riesgo
DANGER: #EF4444

// Gris - Texto principal
FOREGROUND: #111827

// Blanco - Fondo
BACKGROUND: #FFFFFF
```

### Colores Adicionales Usados

```javascript
BLUE: #3B82F6      // Información / En progreso
DARK_GREEN: #059669 // Éxito / Excelente
GRAY_100: #F3F4F6  // Fondos alternos
GRAY_200: #E5E7EB  // Bordes
GRAY_900: #111827  // Texto oscuro
```

---

## 📊 Datasets Disponibles para Estudios

### 1. Esterilización (`sterilizationProtocols`)
- 3 autoclaves con diferentes estados
- Parámetros técnicos (temperatura, presión, eficiencia)
- Histórico de últimas esterilizaciones

**Archivo**: `data/healthDatasets.js` línea 8-50

### 2. Residuos Biológicos (`bioWasteRecords`)
- 3 registros de RPBI con diferentes tipos y riesgos
- Estados de disposición (pending, completed, in_progress)
- Supervisores responsables

**Archivo**: `data/healthDatasets.js` línea 52-101

### 3. EPP (`personalProtectiveEquipment`)
- 4 tipos de equipos de protección
- Inventarios actuales y mínimos
- Estados: optimal, low, critical

**Archivo**: `data/healthDatasets.js` línea 103-146

### 4. Desinfección (`disinfectionAreas`)
- 4 áreas de la clínica
- Puntuaciones de higiene
- Agentes desinfectantes usados

**Archivo**: `data/healthDatasets.js` línea 148-191

### 5. Incidentes (`incidents`)
- 3 casos de no-conformidad
- Severidades: medium, high, critical
- Estados de resolución

**Archivo**: `data/healthDatasets.js` línea 193-227

### 6. Histórico (`hygienicScoreHistory`)
- 30 días de puntuaciones
- Rango: 85% a 95%
- Útil para gráficos de tendencia

**Archivo**: `data/healthDatasets.js` línea 229-241

### 7. Clientes (`clientMetrics`)
- 3 semanas de datos
- Métricas: visitas, confianza, reincidencia, quejas

**Archivo**: `data/healthDatasets.js` línea 243-268

### 8. Gamificación (`achievements`)
- 4 medallas disponibles
- Estados: locked, in progress, unlocked

**Archivo**: `data/healthDatasets.js` línea 270-304

---

## 🔧 Cómo Modificar los Datos

### Para cambiar la fecha/hora actual en los datasets:

```javascript
// En healthDatasets.js, busca Date.now() y reemplaza con:
const now = new Date('2026-06-05T14:30:00'); // Tu fecha

// Luego usa 'now' en lugar de Date.now()
lastSterilization: new Date(now.getTime() - 2 * 60 * 60 * 1000),
```

### Para agregar más datos:

```javascript
// Duplica un objeto en el array:
export const sterilizationProtocols = [
  { ...protocolExistente, id: 4, name: 'Nuevo Autoclave' },
];
```

---

## 📚 Cómo Estudiar los Datos

### 1. Abre DevTools (F12) → Console

### 2. Importa y ejecuta análisis:

```javascript
// Ejemplo: Calcular promedio de higiene
const areas = [
  { score: 98 }, { score: 96 }, { score: 94 }, { score: 78 }
];
const avg = areas.reduce((sum, a) => sum + a.score, 0) / areas.length;
console.log(`Promedio: ${avg.toFixed(0)}%`);
```

### 3. Consultas comunes:

```javascript
// ¿Cuántos incidentes hay?
incidents.length;

// ¿Cuál es el EPP más crítico?
personalProtectiveEquipment.find(e => e.status === 'critical');

// ¿Cuántos kg de residuo hay en total?
bioWasteRecords.reduce((s, r) => s + r.quantity, 0);

// ¿Medallas desbloqueadas?
achievements.filter(a => a.unlocked).length;
```

---

## 🐛 Solución de Problemas

### El módulo no se carga

```
❌ Error: Cannot find module './Health'
✅ Solución: Verifica que el path en AppRouter.jsx sea correcto:
   import Health from '../views/Health/Health.jsx';
```

### Los colores no se ven correctamente

```
❌ Error: Colores grises/no funcionan
✅ Solución: Asegúrate que Tailwind esté instalado:
   npm install -D tailwindcss
   npm run dev
```

### Los datos no actualizan

```
❌ Error: Datos "congelados"
✅ Solución: Los datasets son estáticos. Para datos dinámicos:
   - Conecta con un backend
   - Usa React Context o Redux para estado global
```

---

## 🌐 Próximos Pasos (Backend)

Para conectar con un servidor, crea endpoints:

```bash
# Instalación de backend
npm install express axios

# Endpoints sugeridos
GET  /api/health/status         - Estado general
GET  /api/health/sterilization  - Protocolos
POST /api/health/sterilization  - Registrar ciclo
GET  /api/health/waste          - RPBI
POST /api/health/waste          - Registrar residuo
GET  /api/health/epp            - Inventario
GET  /api/health/analytics      - Reportes
```

---

## 📞 Contacto y Soporte

- **Proyecto**: Hack BUAP 2026 - Salud Humana
- **Módulo**: Bioseguridad Clínica y Comercial
- **Ubicación**: `/frontend/src/views/Health/`

---

## ✅ Checklist de Verificación

- [ ] Carpeta Health existe
- [ ] Health.jsx importa todos los componentes
- [ ] datasets.js tiene todos los datos
- [ ] analyticsHelpers.js funciona en DevTools
- [ ] Componentes renderean sin errores
- [ ] Colores de HeroUI están correctos
- [ ] Navegación entre vistas funciona
- [ ] Datos se muestran dinámicamente

---

**¡Lista para estudiar y desarrollar!** 🚀
