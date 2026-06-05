# 🚀 Quick Start - Módulo Salud Humana

## Acceso Rápido

```
URL: http://localhost:5173/health
```

---

## 4 Vistas Principales

### 1️⃣ Dashboard Supervisor (Defecto)
Botón: **👨‍⚕️ Dashboard Supervisor**

**Qué ver:**
- 4 KPIs en tarjetas (Higiene, Autoclaves, Alertas EPP, Incidentes)
- 5 tabs: Overview, Esterilización, RPBI, EPP, Incidentes

**Datos estudiados:**
- Protocolos de esterilización (3 autoclaves)
- Registros RPBI (3 residuos)
- Inventario EPP (4 artículos)
- Áreas de desinfección (4 espacios)
- Incidentes (3 casos)

### 2️⃣ Vista Cliente/Paciente
Botón: **🏥 Vista Cliente/Paciente**

**Qué ver:**
- QR público de verificación
- Indicadores de higiene por área
- Puntuaciones 0-100%
- Información de confianza

**Ideal para:** Mostrar a pacientes desde celular

### 3️⃣ Sistema de Gamificación
Botón: **🏆 Sistema de Gamificación**

**Qué ver:**
- 4 medallas desbloqueables
- Puntos: 335 totales (2 desbloqueadas = 175 pts)
- 4 niveles de reputación
- Beneficios por nivel

**Impacto:** +Pacientes, -Multas, +Confianza

### 4️⃣ Indicadores de Salud
Botón: **📊 Indicadores de Salud**

**Qué ver:**
- Gráfico de 30 días (línea/barras/área)
- KPIs históricos
- Métricas de clientes
- Insights y recomendaciones

---

## 📊 8 Datasets Incluidos

| Dataset | Artículos | Campo Clave |
|---------|-----------|-------------|
| 🧬 Esterilización | 3 autoclaves | `efficiency` |
| 🗑️ RPBI | 3 residuos | `quantity` |
| 🛡️ EPP | 4 artículos | `currentStock` |
| 🧼 Desinfección | 4 áreas | `hygienScore` |
| ⚠️ Incidentes | 3 casos | `severity` |
| 📈 Histórico | 30 días | `score` |
| 👥 Clientes | 3 semanas | `confidenceScore` |
| 🏅 Gamificación | 4 medallas | `points` |

---

## 🔍 Análisis Rápidos

### En DevTools Console (F12):

```javascript
// 1. Promedio de higiene
disinfectionAnalytics.getAverageHygiene();  // → 91%

// 2. EPP crítico
eppAnalytics.getCriticalItems();  // → 1 item

// 3. Total de residuos
bioWasteAnalytics.getTotalWasteVolume();  // → 4.5 kg

// 4. Puntos gamificación
gamificationAnalytics.getEarnedPoints();  // → 175 pts

// 5. Reporte completo
generateExecutiveSummary();  // → Imprime en consola
```

---

## 🎨 Colores Rápido

```
✅ Verde (#10B981)   → Seguro/Óptimo
⚠️ Amarillo (#F59E0B) → Atención
🔴 Rojo (#EF4444)    → Crítico
ℹ️ Azul (#3B82F6)    → Información
```

---

## 💾 Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `Health.jsx` | Navegación principal |
| `healthDatasets.js` | Todos los datos |
| `analyticsHelpers.js` | 61 funciones análisis |
| `README.md` | Documentación completa |

---

## ⚡ Flujo Típico del Supervisor

```
1. Abre Dashboard
   ↓
2. Ve 4 KPIs → ¿Hay alertas críticas?
   ├─ Si → Ir a tab correspondiente
   └─ No → Revisar tendencias
   ↓
3. Inspecciona tabs según necesidad
   ├─ Esterilización
   ├─ RPBI
   ├─ EPP
   └─ Incidentes
   ↓
4. Ve Gamificación → Planificar mejoras
   ↓
5. Ve Indicadores → Analizar tendencias
```

---

## 🎯 3 Casos de Uso

### Caso A: Reorden Urgente
```
1. Dashboard → Tab EPP
2. Ver: Protectores faciales (45, mín: 100) CRÍTICO
3. Acción: Click → Generar orden de compra
```

### Caso B: Auditoría
```
1. Indicadores → Gráfico histórico
2. Ver: Tendencia mejora +10% en 30 días
3. Exportar: Reporte para reguladores
```

### Caso C: Gamificación
```
1. Gamificación → Medallas bloqueadas
2. Ver: 5/7 días para "Espacio 100% Seguro"
3. Plan: Intensificar limpieza 2 días más
```

---

## 📱 URL por Vista

```
/health               → Dashboard Supervisor (defecto)
/health#client        → Cliente/Paciente (con toggle UI)
/health#gamification  → Gamificación (con toggle UI)
/health#indicators    → Indicadores (con toggle UI)
```

---

## 🛠️ Modificar Datos

### Cambiar un valor en dataset

**Archivo**: `src/views/Health/data/healthDatasets.js`

Ejemplo - Cambiar stock de guantes:
```javascript
// Línea ~110
{
  id: 201,
  type: 'Guantes de nitrilo',
  size: 'M',
  currentStock: 850,  // ← CAMBIAR AQUÍ
  minStock: 200,
  // ... resto
}
```

Luego: `npm run dev` (hot reload automático)

---

## 📊 Ejemplos de Análisis

### Q1: ¿Cuánto EPP crítico hay?
```javascript
eppAnalytics.getCriticalItems().length;  // Respuesta: 1
```

### Q2: ¿Área más limpia?
```javascript
disinfectionAnalytics.getCleanestArea().name;  // → Toma de Muestras
```

### Q3: ¿Tiempo promedio limpieza?
```javascript
disinfectionAnalytics.getAverageTimeSinceDisinfection();  // → 241 min
```

### Q4: ¿Reputación actual?
```javascript
gamificationAnalytics.getOverallProgress();  // → 50%
```

---

## 🚨 Alertas Críticas

| Alerta | Ubicación | Acción |
|--------|-----------|--------|
| EPP Crítico | Dashboard KPI + Tab EPP | Reorden inmediato |
| Incidentes activos | Dashboard KPI + Tab Incidentes | Investigar |
| Área sucia | Dashboard Overview | Sanear inmediato |
| RPBI pendiente | Tab RPBI | Programar disposición |

---

## 📈 Métricas Clave a Monitorear

```
📊 Puntuación Higiene:    91% (objetivo ≥ 90%)
🧬 Eficiencia Autoclaves: 96% (objetivo ≥ 95%)
🛡️ Cobertura EPP:        170% (óptimo ≥ 100%)
⚠️ Incidentes activos:    2 (objetivo = 0)
🏅 Reputación:            50% (meta: 75%)
```

---

## 🎓 Aprendizaje Recomendado

### Paso 1: Explorar UI
- Navega por las 4 vistas
- Lee los datos en las tarjetas

### Paso 2: Entender Datos
- Abre `healthDatasets.js`
- Lee la estructura de cada dataset

### Paso 3: Análisis
- Abre DevTools Console (F12)
- Ejecuta funciones de `analyticsHelpers.js`

### Paso 4: Casos Prácticos
- Estudia `usageExamples.js`
- Ejecuta los 7 ejemplos

### Paso 5: Documentación
- Lee `README.md` completo
- Consulta `VISUAL_GUIDE.md`

---

## 💡 Tips de Uso

**💡 Tip 1:** Los colores te dan info instantánea
```
Verde = OK | Amarillo = Revisar | Rojo = Urgente
```

**💡 Tip 2:** QR es para clientes, muéstralo
```
Botón "Mostrar QR" en ClientView
→ Los pacientes ven higiene en tiempo real
```

**💡 Tip 3:** Medallas impulsan mejoras
```
"Espacio 100% Seguro" (7 días) = +100 pts
→ Visible en Gamificación
```

**💡 Tip 4:** Gráficos muestran tendencias
```
Indicadores → Últimos 30 días
→ Puedes ver si está mejorando o empeorando
```

**💡 Tip 5:** Datos son editables
```
healthDatasets.js → Modifica valores
→ Hot reload automático, sin restart
```

---

## ❓ FAQ Rápido

**P: ¿Dónde agregar más datos?**
R: `src/views/Health/data/healthDatasets.js` - Duplica un objeto y cambia los valores

**P: ¿Cómo conectar con API?**
R: Ve a `README.md` → "Integración con Backend" - Hay endpoints sugeridos

**P: ¿Las medallas son hardcodeadas?**
R: Sí, ahora. Para hacerlas dinámicas, necesitas backend + estado global

**P: ¿Puedo exportar reportes?**
R: No aún. Próxima fase: agregar `jsPDF` o `ExcelJS`

**P: ¿El QR funciona realmente?**
R: Es visual/mock. En producción: usar librería `qrcode.react`

---

## 🔗 Enlaces Internos

```
README.md          → Documentación completa (empezar aquí)
SETUP.md           → Instalación y troubleshooting
VISUAL_GUIDE.md    → Arquitectura y diagramas
IMPLEMENTATION_SUMMARY.md → Resumen de qué se hizo
```

---

**¡Listo para empezar!** 
Abre http://localhost:5173/health y explora 🚀
