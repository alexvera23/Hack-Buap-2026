# Módulo de Salud Humana - Bioseguridad Clínica y Comercial

## 📋 Descripción General

Sistema integral de bioseguridad para clínicas y laboratorios que implementa:

1. **Dashboard del Supervisor**: Control estricto de protocolos
2. **Vista del Cliente/Paciente**: Indicadores de higiene en tiempo real
3. **Sistema de Gamificación**: Medallas y reputación
4. **Indicadores de Salud**: Análisis histórico y tendencias

---

## 🎯 Características Principales

### 1. Dashboard del Supervisor (👨‍⚕️)

**Funcionalidades:**
- Monitoreo en tiempo real de autoclaves y esterilización
- Registro de Residuos Peligrosos Biológico-Infecciosos (RPBI)
- Inventario de Equipos de Protección Personal (EPP)
- Estado de áreas de desinfección
- Registro de incidentes y no-conformidades

**Tabs disponibles:**
- **Resumen General**: Vista consolidada de todas las áreas
- **Esterilización**: Monitoreo de autoclaves y ciclos
- **RPBI**: Registro y seguimiento de residuos
- **EPP**: Inventario y alertas de stock bajo
- **Incidentes**: Seguimiento de problemas y resoluciones

---

### 2. Vista Cliente/Paciente (🏥)

**Funcionalidades:**
- Indicadores de higiene en tiempo real
- Código QR para verificación
- Histórico de desinfecciones por área
- Puntuaciones de higiene por espacio
- Información sobre medidas de seguridad

**Elementos:**
- Score de higiene por área (0-100%)
- Tiempo desde última desinfección
- Agente desinfectante utilizado
- Frecuencia de limpieza

---

### 3. Sistema de Gamificación (🏆)

**Medallas Disponibles:**

| Medalla | Descripción | Puntos | Requisito |
|---------|-------------|--------|-----------|
| Espacio 100% Seguro | Puntuación perfecta 7 días | 100 | 7 días consecutivos |
| Maestro de Esterilización | 50 ciclos sin incidentes | 75 | 50 ciclos |
| Guerrero del Desecho | 100 registros de RPBI sin errores | 50 | 100 registros |
| Guardián del EPP | Stock óptimo 30 días | 60 | 30 días |

**Niveles de Reputación:**
- **Bronce** (0-25%): Certificado de participación
- **Plata** (26-50%): Distintivo de Higiene Básica
- **Oro** (51-75%): Distintivo "Espacio Seguro"
- **Platino** (76-100%): Medalla "Espacio 100% Seguro" + Certificación especial

---

### 4. Indicadores de Salud (📊)

**Análisis incluidos:**
- Evolución histórica de puntuaciones
- Gráficos de tendencias (línea, barras, área)
- Impacto en métricas de clientes
- KPIs consolidados

---

## 📊 Datasets Disponibles

### 1. `sterilizationProtocols`

```javascript
{
  id: 1,
  name: 'Autoclave A1',
  location: 'Área de Quirófano',
  lastSterilization: Date,
  nextScheduled: Date,
  status: 'completed' | 'pending',
  temperature: 121,
  pressure: 15,
  cycleTime: 45,
  efficiency: 98
}
```

**Uso:** Monitoreo de equipos de esterilización, histórico de ciclos, parámetros técnicos.

---

### 2. `bioWasteRecords`

```javascript
{
  id: 101,
  type: 'Agujas y bisturís contaminados',
  quantity: 2.5, // kg
  collectionTime: Date,
  container: 'Contenedor Rojo A',
  disposalStatus: 'pending' | 'completed' | 'in_progress',
  disposalSchedule: Date,
  supervisor: 'Dr. García López',
  riskLevel: 'high' | 'medium'
}
```

**Uso:** Registro de RPBI, trazabilidad de residuos, cumplimiento regulatorio.

---

### 3. `personalProtectiveEquipment`

```javascript
{
  id: 201,
  type: 'Guantes de nitrilo',
  size: 'M',
  currentStock: 850,
  minStock: 200,
  location: 'Almacén Central',
  expiryDate: Date,
  lastRestock: Date,
  status: 'optimal' | 'low' | 'critical'
}
```

**Uso:** Inventario de EPP, alertas de stock bajo, reorden automático.

---

### 4. `disinfectionAreas`

```javascript
{
  id: 301,
  name: 'Área de Toma de Muestras',
  lastDisinfection: Date,
  frequency: '4 horas',
  agent: 'Hipoclorito de sodio 0.5%',
  supervisor: 'Técnico López',
  status: 'clean' | 'warning',
  hygienScore: 98
}
```

**Uso:** Monitoreo de áreas, histórico de desinfecciones, cumplimiento de protocolos.

---

### 5. `incidents`

```javascript
{
  id: 401,
  date: Date,
  type: 'EPP insuficiente',
  severity: 'medium' | 'high' | 'critical',
  description: 'Stock de mascarillas N95 por debajo del mínimo',
  resolution: 'Reorden urgente solicitado',
  status: 'in_progress' | 'resolved',
  area: 'Almacén Central'
}
```

**Uso:** Seguimiento de problemas, análisis de root cause, lecciones aprendidas.

---

### 6. `hygienicScoreHistory`

```javascript
[
  {
    date: Date,
    score: 85
  }
  // 30 días de datos históricos
]
```

**Uso:** Gráficos de tendencias, análisis de mejora continua, benchmarking.

---

### 7. `clientMetrics`

```javascript
{
  id: 501,
  week: 'Semana 1',
  totalVisits: 245,
  confidenceScore: 82, // % de confianza en higiene
  repeatVisits: 78, // % de reincidencia
  complaints: 3
}
```

**Uso:** Impacto en satisfacción de clientes, análisis de ROI, reportes de impacto.

---

### 8. `achievements`

```javascript
{
  id: 'safe-space-100',
  name: 'Espacio 100% Seguro',
  description: 'Mantener puntuación de higiene perfecta durante 7 días',
  icon: '🏅',
  badgeColor: 'gold',
  points: 100,
  unlocked: false,
  progress: 5 // días actuales de 7
}
```

**Uso:** Sistema de medallas, gamificación, incentivos.

---

## 🎨 Paleta de Colores (HeroUI)

```javascript
light: {
  colors: {
    background: "#FFFFFF",
    foreground: "#111827",
    primary: {
      DEFAULT: "#10B981",      // Verde - Seguro/Óptimo
      foreground: "#FFFFFF",
    },
    warning: {
      DEFAULT: "#F59E0B",       // Amarillo - Atención
      foreground: "#111827",
    },
    danger: {
      DEFAULT: "#EF4444",       // Rojo - Crítico/Alto Riesgo
      foreground: "#FFFFFF",
    },
    success: {
      DEFAULT: "#059669",       // Verde oscuro - Éxito
      foreground: "#FFFFFF",
    },
  },
}
```

### Mappeo de colores por estado:

| Estado | Color | Significado |
|--------|-------|-------------|
| Óptimo/Limpio | Verde (#10B981) | Todo bien |
| Bajo/Atención | Amarillo (#F59E0B) | Requiere atención |
| Crítico/Alto Riesgo | Rojo (#EF4444) | Acción inmediata |
| Excelente | Verde oscuro (#059669) | Muy bien |

---

## 📈 Cómo Estudiar los Datasets

### 1. Análisis de Esterilización

**Preguntas a responder:**
- ¿Cuál es el promedio de eficiencia en esterilización?
- ¿Cuántos ciclos se realizan diariamente?
- ¿Cuál es el tiempo promedio de ciclo?

```javascript
// Ejemplo: Calcular eficiencia promedio
const avgEfficiency = sterilizationProtocols
  .filter(p => p.status === 'completed')
  .reduce((sum, p) => sum + p.efficiency, 0) / completedProtocols.length;
```

### 2. Análisis de RPBI

**Preguntas a responder:**
- ¿Cuál es el volumen total de residuos por tipo?
- ¿Cuánto tiempo promedio pasa entre recolección y disposición?
- ¿Cuál es el nivel de riesgo promedio?

```javascript
// Ejemplo: Total de residuos por tipo
const wasteByType = bioWasteRecords.reduce((acc, record) => {
  acc[record.type] = (acc[record.type] || 0) + record.quantity;
  return acc;
}, {});
```

### 3. Análisis de EPP

**Preguntas a responder:**
- ¿Cuál es la tasa de utilización de EPP?
- ¿Cuántos artículos están en estado crítico?
- ¿Cuál es el costo promedio de reposición?

```javascript
// Ejemplo: Artículos en estado crítico
const criticalEPP = personalProtectiveEquipment
  .filter(item => item.status === 'critical');
```

### 4. Análisis de Higiene

**Preguntas a responder:**
- ¿Cuál es el score promedio de higiene?
- ¿Qué área tiene el mejor/peor score?
- ¿Cuál es la tendencia en los últimos 30 días?

```javascript
// Ejemplo: Área con mejor score
const bestArea = disinfectionAreas.reduce((best, area) =>
  area.hygienScore > best.hygienScore ? area : best
);
```

### 5. Análisis de Impacto en Clientes

**Preguntas a responder:**
- ¿Hay correlación entre score de higiene y confianza de pacientes?
- ¿Cómo afecta la gamificación a la reincidencia?
- ¿Cuál es el ROI de las medidas de bioseguridad?

```javascript
// Ejemplo: Correlación entre higiene y confianza
const correlation = calculatePearson(
  hygienicScoreHistory,
  clientMetrics
);
```

---

## 🚀 Casos de Uso

### Caso 1: Auditoría Regulatoria
- Generar reportes de RPBI
- Verificar cumplimiento de protocolos
- Documentar incidentes y resoluciones

### Caso 2: Mejora Continua
- Identificar áreas con bajo score
- Analizar tendencias históricas
- Establecer metas de mejora

### Caso 3: Marketing y Reputación
- Mostrar medallas al cliente
- Publicar score de higiene en tiempo real
- Usar gamificación para diferenciación

### Caso 4: Gestión de Riesgos
- Alertas automáticas de stock bajo
- Seguimiento de incidentes
- Análisis de probabilidad de no-conformidades

---

## 💾 Estructura de Carpetas

```
src/views/Health/
├── Health.jsx                    # Componente principal
├── SupervisorDashboard.jsx      # Dashboard del supervisor
├── ClientView.jsx               # Vista del cliente/paciente
├── GamificationSystem.jsx       # Sistema de medallas
├── HealthIndicators.jsx         # Gráficos e indicadores
└── data/
    └── healthDatasets.js        # Todos los datasets
```

---

## 🔌 Integración con Backend

### Endpoints sugeridos:

```
GET  /api/health/sterilization        - Obtener protocolos
POST /api/health/sterilization        - Registrar ciclo
GET  /api/health/waste                - Obtener RPBI
POST /api/health/waste                - Registrar residuo
GET  /api/health/epp                  - Obtener inventario
PUT  /api/health/epp/:id              - Actualizar stock
GET  /api/health/areas                - Obtener áreas
PUT  /api/health/areas/:id            - Actualizar área
GET  /api/health/incidents            - Obtener incidentes
POST /api/health/incidents            - Reportar incidente
GET  /api/health/achievements         - Obtener medallas
POST /api/health/achievements/:id/unlock - Desbloquear medalla
```

---

## 📚 Recursos Recomendados

- OMS - Directrices sobre Bioseguridad
- Norma ISO 11135 - Esterilización
- Regulaciones locales de RPBI
- OSHA Guidelines - PPE Standards

---

## 🎓 Próximos Pasos

1. ✅ Implementar componentes React
2. ⏳ Conectar con backend
3. ⏳ Implementar autenticación
4. ⏳ Agregar reportes exportables
5. ⏳ Integrar SMS/Email alerts
6. ⏳ Implementar notificaciones push

---

**Desarrollado para Hack BUAP 2026 - Soluciones en Salud Humana**
