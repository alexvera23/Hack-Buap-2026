# 🏥 Guía Visual del Módulo de Salud Humana

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                   Health (Componente Principal)              │
├─────────────────────────────────────────────────────────────┤
│                      Barra de Navegación                      │
│  [Dashboard Supervisor] [Vista Cliente] [Gamificación] [KPIs] │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
         ┌──────▼──────┐  ┌───▼───────┐  ┌─▼────────────┐
         │ Supervisor  │  │  Client   │  │  Gamification│
         │ Dashboard   │  │   View    │  │  & Indicators│
         └─────────────┘  └───────────┘  └──────────────┘
                │                │              │
         ┌──────▼──────┐  ┌───▼───────┐  ┌─▼────────────┐
         │  5 Tabs:    │  │  Real-    │  │ Medals +     │
         │ • Overview  │  │  time QR  │  │ Reputation   │
         │ • Steril.   │  │  + Areas  │  │ + Analytics  │
         │ • RPBI      │  │ + Hygiene │  │              │
         │ • EPP       │  │  Scores   │  │              │
         │ • Incidents │  │           │  │              │
         └─────────────┘  └───────────┘  └──────────────┘
```

## Flujo de Datos

```
┌───────────────────────────────────────────────────────────┐
│            healthDatasets.js (8 Datasets)                 │
├───────────────────────────────────────────────────────────┤
│  • sterilizationProtocols (3 items)                       │
│  • bioWasteRecords (3 items)                              │
│  • personalProtectiveEquipment (4 items)                  │
│  • disinfectionAreas (4 items)                            │
│  • incidents (3 items)                                    │
│  • hygienicScoreHistory (30 days)                         │
│  • clientMetrics (3 weeks)                                │
│  • achievements (4 badges)                                │
└───────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│analyticsHelpers   │  React        │  Visual      │
│8 Analysis         │  Components   │  Components  │
│Modules            │               │              │
└──────────────┘  └──────────────┘  └──────────────┘
        │                 │                 │
        ├─────────────────┼─────────────────┤
        │                 │                 │
        ▼                 ▼                 ▼
    Console         Browser UI         Charts
    Reports          Dashboards         KPIs
```

## Dashboard del Supervisor - Flujo de Tabs

```
┌─────────────────────────────────────────┐
│    SUPERVISOR DASHBOARD (5 Tabs)         │
├─────────────────────────────────────────┤
│
├─ TAB 1: RESUMEN GENERAL
│  └─ Muestra: disinfectionAreas (puntuaciones)
│     Componentes: Cards de áreas con scores
│
├─ TAB 2: ESTERILIZACIÓN
│  └─ Datos: sterilizationProtocols
│     Campos: Temp, Presión, Tiempo, Eficiencia
│     Estados: Completado/Pendiente
│
├─ TAB 3: RPBI (Residuos)
│  └─ Datos: bioWasteRecords
│     Campos: Tipo, Cantidad, Contenedor, Riesgo
│     Estados: Pending/In Progress/Completed
│
├─ TAB 4: EPP
│  └─ Datos: personalProtectiveEquipment
│     Campos: Stock Actual vs Mínimo
│     Estados: Optimal/Low/Critical
│     Barra: % de cobertura
│
└─ TAB 5: INCIDENTES
   └─ Datos: incidents
      Campos: Tipo, Severidad, Descripción, Resolución
      Severidad: Medium/High/Critical
```

## Vista del Cliente - Componentes

```
┌──────────────────────────────────────────┐
│       VISTA CLIENTE (Paciente/Público)     │
├──────────────────────────────────────────┤
│
├─ HEADER
│  ├─ Nombre de clínica
│  ├─ Dirección
│  └─ [Botón] Mostrar QR Verificación
│
├─ INDICADORES (Para cada área)
│  ├─ Nombre del área
│  ├─ Responsable
│  ├─ Estado (✓ Seguro / ⚠️ Atención)
│  ├─ Última desinfección (hace X minutos)
│  ├─ Puntuación (0-100% con barra)
│  ├─ Agente desinfectante
│  ├─ Frecuencia de limpieza
│  └─ Indicador de confianza (si score ≥ 90%)
│
├─ INFORMACIÓN DE SEGURIDAD
│  └─ 4 puntos sobre medidas de bioseguridad
│
└─ FOOTER
   └─ Última actualización y data refresh time
```

## Sistema de Gamificación - Estructura

```
┌──────────────────────────────────────────────┐
│      SISTEMA DE GAMIFICACIÓN                  │
├──────────────────────────────────────────────┤
│
├─ KPIs PRINCIPALES (3 tarjetas)
│  ├─ Puntos Totales: 335 ⭐
│  ├─ Medallas Desbloqueadas: 2/4 🏅
│  └─ Reputación: 50% 📈
│
├─ TABS DE NAVEGACIÓN
│  ├─ 🏅 MEDALLAS
│  │  ├─ Desbloqueadas (cards brillantes)
│  │  │  ├─ 🧬 Maestro de Esterilización
│  │  │  └─ ♻️ Guerrero del Desecho
│  │  └─ Bloqueadas (cards grises)
│  │     ├─ 🏅 Espacio 100% Seguro
│  │     └─ 🛡️ Guardián del EPP
│  │
│  ├─ 📊 PROGRESO
│  │  └─ Barra de progreso para medallas bloqueadas
│  │
│  └─ 🎁 BENEFICIOS (4 niveles)
│     ├─ 🥉 Bronce (0-25%)
│     ├─ 🥈 Plata (26-50%)
│     ├─ 🥇 Oro (51-75%)
│     └─ 💎 Platino (76-100%)
│
└─ IMPACTO EN NEGOCIO
   ├─ Incremento de Pacientes
   ├─ Reducción de Multas
   └─ Confianza de Clientes
```

## Indicadores de Salud - Gráficos

```
┌─────────────────────────────────────┐
│    INDICADORES DE SALUD (Analytics)  │
├─────────────────────────────────────┤
│
├─ KPI CARDS (4 tarjetas)
│  ├─ Puntuación Promedio
│  ├─ Máxima
│  ├─ Mínima
│  └─ Tendencia (mini-chart)
│
├─ GRÁFICO PRINCIPAL (30 días)
│  ├─ Tipos: Línea / Barras / Área
│  ├─ Eje Y: 0-100% (Score)
│  ├─ Eje X: Fechas (últimos 30 días)
│  └─ Colores por score:
│     ├─ Verde: ≥90%
│     ├─ Azul: 75-89%
│     └─ Amarillo: <75%
│
├─ MÉTRICAS DE CLIENTES (3 semanas)
│  ├─ Visitas totales
│  ├─ Confianza (%)
│  ├─ Reincidencia (%)
│  └─ Quejas
│
└─ INSIGHTS
   ├─ Positivo (azul)
   └─ Recomendación (amarillo)
```

## Mapeo de Colores

```
┌────────────────┬──────────┬──────────────────────┐
│ ESTADO         │ COLOR    │ SIGNIFICADO          │
├────────────────┼──────────┼──────────────────────┤
│ Seguro/Óptimo  │ #10B981  │ Todo OK, acción no   │
│ (Verde)        │ (Verde)  │ necesaria            │
├────────────────┼──────────┼──────────────────────┤
│ Atención/Bajo  │ #F59E0B  │ Revisar, pueden      │
│ (Amarillo)     │(Amarillo)│ ser problemas        │
├────────────────┼──────────┼──────────────────────┤
│ Crítico/Alto   │ #EF4444  │ Acción urgente       │
│ Riesgo (Rojo)  │ (Rojo)   │ requerida            │
├────────────────┼──────────┼──────────────────────┤
│ Excelente      │ #059669  │ Superó expectativas  │
│ (Verde oscuro) │          │                      │
├────────────────┼──────────┼──────────────────────┤
│ Info/En prog   │ #3B82F6  │ En proceso, neutral  │
│ (Azul)         │ (Azul)   │                      │
└────────────────┴──────────┴──────────────────────┘
```

## Ejemplos de Visualización

### Ejemplo 1: Card de Área de Desinfección

```
┌─────────────────────────────────────┐
│ Área de Toma de Muestras            │
├─────────────────────────────────────┤
│                                     │
│ Última desinfección: Hace 2 minutos │
│                                     │
│ ┌───────────────────────────────┐   │
│ │ Puntuación de Higiene: 98%    │   │
│ │ ████████████████████████░░░░░ │   │
│ │ Excelente                     │   │
│ └───────────────────────────────┘   │
│                                     │
│ Agente: Hipoclorito de sodio 0.5% │
│ Frecuencia: Cada 4 horas           │
│                                     │
│ ✓ Esta área cumple con los más      │
│   altos estándares de higiene       │
└─────────────────────────────────────┘
```

### Ejemplo 2: Card de EPP

```
┌─────────────────────────────────────┐
│ Guantes de nitrilo (Talla M)        │
├─────────────────────────────────────┤
│                        [ÓPTIMO]     │
│                                     │
│ Stock Actual: 850 unidades          │
│ Stock Mínimo: 200 unidades          │
│                                     │
│ ████████████████████░░░░░░░░░░░░░░ │
│ 68% de capacidad                    │
│                                     │
└─────────────────────────────────────┘
```

### Ejemplo 3: Card de Medalla

```
┌─────────────────────────────────────┐
│ 🧬 Maestro de Esterilización       │
├─────────────────────────────────────┤
│                        [✨ UNLOCKED] │
│                                     │
│ Completar 50 ciclos sin incidentes  │
│                                     │
│ +75 puntos                          │
│ Desbloqueado el 25-May-2026         │
│                                     │
└─────────────────────────────────────┘
```

## Flujo de Usuario - Supervisor

```
1. Accede a /health
   ↓
2. Ve Dashboard Supervisor por defecto
   ├─ 4 KPI cards (resumen rápido)
   └─ Lee alertas críticas
   ↓
3. Navega por los 5 tabs
   ├─ Overview → Estado de áreas
   ├─ Esterilización → Parámetros técnicos
   ├─ RPBI → Residuos pendientes
   ├─ EPP → Stock disponible
   └─ Incidentes → Problemas a resolver
   ↓
4. Toma decisiones basado en datos
   └─ Reorden EPP, Sanitizar áreas, etc.
```

## Flujo de Usuario - Cliente/Paciente

```
1. Escanea QR público con su teléfono
   ↓
2. Ve página de Cliente/Paciente
   ├─ Nombre y ubicación de clínica
   └─ Botón "Mostrar QR Verificación"
   ↓
3. Observa indicadores de higiene
   ├─ Área de Toma de Muestras: 98% ✓
   ├─ Quirófano: 96% ✓
   ├─ Comedor: 94% ✓
   └─ Laboratorio: 78% ⚠️
   ↓
4. Toma decisión de confiar/visitar
   └─ Alto score = Más confianza = Más pacientes
```

## Casos de Análisis

### Caso 1: Mejorar Reputación

```
Punto actual: 50%
Meta: 75% (Oro)

Plan:
1. Desbloquear "Espacio 100% Seguro" (7 días) → +100 pts
2. Mantener stock EPP optimal (30 días) → +60 pts
3. Total potencial: +160 pts

Resultado esperado:
- Reputación: 50% → 75%
- Beneficios Oro: Distintivo "Espacio Seguro", Prioridad en auditorías
- Impacto: +más pacientes, -multas regulatorias
```

### Caso 2: Resolver Incidente Crítico

```
Problema: EPP en estado crítico
├─ Mascarillas N95: 120 (mín: 250)
├─ Protectores faciales: 45 (mín: 100)

Acción:
1. Alert supervisor (Dashboard)
2. Iniciar reorden urgente
3. Registrar en sistema
4. Verificar llegada
5. Actualizar stock

Tiempo estimado: 2 días
```

## Integración Frontend-Backend (Futura)

```
Frontend (React)                Backend (Node.js)
┌──────────────────┐            ┌──────────────────┐
│ ClientView       │◄──GET───►│ /api/health/      │
│ SupervisorDash   │           │    areas          │
│ GamificationSys  │◄──POST──►│ /api/health/      │
│ HealthIndicators │           │    incidents      │
└──────────────────┘            └──────────────────┘
        │
        └─ Store en Context/Redux/Zustand
           (Estado global)
```

---

**Diagrama creado para Hack BUAP 2026 - Módulo Salud Humana**
