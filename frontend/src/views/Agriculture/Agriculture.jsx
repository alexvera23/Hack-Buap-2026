import React, { useState } from 'react'

export default function Agriculture() {
  const [activeTab, setActiveTab] = useState('producer') // 'producer' or 'buyer'

  // Lista de tareas diarias del campo que traducen normas técnicas a acciones sencillas
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Desinfectar herramientas de poda y calzado de operarios antes de ingresar al Lote B (NOM-008-FITO)',
      completed: true,
      points: 20,
      category: 'Inocuidad',
      norm: 'NOM-008-FITO'
    },
    {
      id: 2,
      text: 'Revisar trampas delta y feromonas en Sector B para monitorear el Picudo Negro (Petición SENASICA)',
      completed: false,
      points: 25,
      category: 'Monitoreo',
      norm: 'Alerta Fitosanitaria'
    },
    {
      id: 3,
      text: 'Aplicar el protocolo de aislamiento biológico y químico orgánico en el Sector B hoy (Alerta de Plagas)',
      completed: false,
      points: 30,
      category: 'Aislamiento',
      norm: 'Control de Riesgos'
    },
    {
      id: 4,
      text: 'Registrar humedad e higiene en el contenedor de carga número 4 antes del despacho (SIAP)',
      completed: false,
      points: 15,
      category: 'Trazabilidad',
      norm: 'Buenas Prácticas (BPA)'
    },
    {
      id: 5,
      text: 'Monitorear lavado de manos y uso de cofias del equipo de empaque (NOM-251-SSA1)',
      completed: true,
      points: 10,
      category: 'Cultura',
      norm: 'Inocuidad Básica'
    }
  ])

  // Alertas predictivas cruzando datos abiertos del SENASICA y el SIAP
  const [alerts, setAlerts] = useState([
    {
      id: 'alert-1',
      title: 'Alerta: Temporada alta de picudo negro o roya en tu zona',
      level: 'danger',
      source: 'SENASICA - Cruce Fito-Climatológico',
      message: 'Las condiciones de humedad relativa (>85%) y temperaturas cálidas registradas por el SIAP en tu municipio esta semana favorecen la eclosión rápida de larvas de picudo negro.',
      action: 'Aplica el protocolo de aislamiento en el sector B hoy mismo instalando trampas húmedas y reduciendo riegos nocturnos.',
      date: 'Hace 30 minutos'
    },
    {
      id: 'alert-2',
      title: 'Alerta Preventiva de Roya Fitosanitaria',
      level: 'warning',
      source: 'SIAP - Red de Alerta Temprana',
      message: 'Reporte de focos activos de roya en parcelas colindantes a menos de 7 km de tu geocerca agrícola.',
      action: 'Inspeccionar el reverso de las hojas en los lotes del sur y activar barrera biológica.',
      date: 'Hace 1 día'
    }
  ])

  const [activeAlert, setActiveAlert] = useState(alerts[0])

  // Estados del simulador de escaneo QR
  const [qrState, setQrState] = useState('idle') // 'idle', 'scanning', 'scanned'
  const [selectedProduct, setSelectedProduct] = useState('tomate') // 'tomate' or 'aguacate'

  // Datos simulados de trazabilidad fitosanitaria de los lotes
  const lotData = {
    tomate: {
      id: 'LOT-2026-TOM-88A',
      product: 'Tomate Saladette de Exportación',
      variety: 'Indeterminado - Orgánico',
      origin: 'Rancho El Porvenir, Sector B, Uruapan, Michoacán',
      senasicaId: 'CERT-SENASICA-FITO-2026-9912',
      harvestDate: '05 de Junio, 2026',
      badgeLevel: 'Platino',
      badgeColor: 'from-emerald-500 via-teal-500 to-cyan-500',
      complianceScore: 95,
      history: [
        { phase: 'Análisis de Suelo', desc: 'Suelo verificado libre de metales pesados y nematodos por SENASICA.', date: 'Feb 12, 2026', status: 'passed' },
        { phase: 'Monitoreo de Riego', desc: 'Agua de riego analizada libre de Escherichia coli y Salmonella.', date: 'Mar 20, 2026', status: 'passed' },
        { phase: 'Aislamiento de Plagas', desc: 'Aplicación exitosa del protocolo preventivo contra picudo negro en el Sector B.', date: 'May 10, 2026', status: 'passed' },
        { phase: 'Cosecha e Inocuidad', desc: 'Corte higiénico con herramientas desinfectadas y personal certificado.', date: 'Jun 05, 2026', status: 'passed' }
      ]
    },
    aguacate: {
      id: 'LOT-2026-AGU-44C',
      product: 'Aguacate Hass de Primera',
      variety: 'Hass Convencional Controlado',
      origin: 'Huerta Los Olivos, Sector A, Tacámbaro, Michoacán',
      senasicaId: 'CERT-SENASICA-FITO-2026-8804',
      harvestDate: '03 de Junio, 2026',
      badgeLevel: 'Oro',
      badgeColor: 'from-amber-400 to-emerald-500',
      complianceScore: 80,
      history: [
        { phase: 'Inspección Sanitaria', desc: 'Monitoreo libre de barrenador grande del hueso certificado.', date: 'Ene 15, 2026', status: 'passed' },
        { phase: 'Nutrición Preventiva', desc: 'Compostaje certificado libre de patógenos.', date: 'Mar 02, 2026', status: 'passed' },
        { phase: 'Cosecha e Higiene', desc: 'Lavado y desinfección de cajas transportadoras verificado.', date: 'Jun 03, 2026', status: 'passed' }
      ]
    }
  }

  // Marcar/Desmarcar tareas
  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  // Cálculos dinámicos
  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0)
  const earnedPoints = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0)
  const compliancePercentage = Math.round((earnedPoints / totalPoints) * 100)

  // Información del Badge digital dinámico
  const getBadgeInfo = (percentage) => {
    if (percentage >= 90) {
      return {
        name: 'Cosecha Segura - Platino',
        desc: 'Trazabilidad total e inocuidad impecable en campo. Califica para tarifas premium de exportación.',
        color: 'from-emerald-500 via-teal-500 to-cyan-500',
        textColor: 'text-cyan-400',
        bgPill: 'bg-cyan-950 text-cyan-200 border-cyan-800'
      }
    }
    if (percentage >= 75) {
      return {
        name: 'Cosecha Segura - Oro',
        desc: 'Excelente prevención sanitaria y cumplimiento fito-nutricional. Listo para distribución nacional.',
        color: 'from-amber-400 to-emerald-500',
        textColor: 'text-emerald-400',
        bgPill: 'bg-emerald-950 text-emerald-200 border-emerald-800'
      }
    }
    if (percentage >= 50) {
      return {
        name: 'Cosecha Segura - Plata',
        desc: 'Medidas básicas de inocuidad completas. Activa las tareas pendientes para calificar a mejores precios.',
        color: 'from-slate-400 to-emerald-500',
        textColor: 'text-slate-300',
        bgPill: 'bg-slate-900 text-slate-200 border-slate-700'
      }
    }
    return {
      name: 'Riesgo Crítico - Bronce',
      desc: 'Nivel bajo de cumplimiento higiénico y fitosanitario. Peligro de rechazo de lote o mermas.',
      color: 'from-red-500 to-amber-500',
      textColor: 'text-rose-400',
      bgPill: 'bg-rose-950 text-rose-200 border-rose-900'
    }
  }

  const badgeInfo = getBadgeInfo(compliancePercentage)

  // Iniciar simulador de escáner QR
  const handleStartScan = () => {
    setQrState('scanning')
    setTimeout(() => {
      setQrState('scanned')
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-6xl px-2 py-4">
      {/* Estilos locales para las micro-animaciones premium */}
      <style>{`
        @keyframes scanLine {
          0%, 100% { top: 0%; }
          50% { top: 100%; }
        }
        .animate-scan-line {
          animation: scanLine 2s linear infinite;
        }
        .shadow-glow {
          box-shadow: 0 0 25px rgba(16, 185, 129, 0.25);
        }
        .shadow-glow-danger {
          box-shadow: 0 0 25px rgba(239, 68, 68, 0.3);
        }
      `}</style>

      {/* Hero Header */}
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl"></div>

        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Módulo Agro
              </span>
              <span className="rounded-full bg-emerald-400 px-2.5 py-0.5 text-xs font-bold text-emerald-950 animate-pulse">
                SIAP & SENASICA Conectado
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Bioseguridad Fitonutricional
            </h1>
            <p className="mt-2 max-w-2xl text-emerald-100 text-sm md:text-base">
              Democratizando la inocuidad. Traducimos regulaciones fitosanitarias complejas a tareas prácticas en el campo y validamos el histórico de salud para tus compradores mediante códigos QR.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Selector Switcher */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-full bg-slate-100 p-1.5 border border-slate-200">
          <button
            onClick={() => setActiveTab('producer')}
            className={`flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
              activeTab === 'producer'
                ? 'bg-white text-emerald-700 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Panel del Productor / Supervisor
          </button>
          <button
            onClick={() => setActiveTab('buyer')}
            className={`flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${
              activeTab === 'buyer'
                ? 'bg-white text-emerald-700 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            Validador de Trazabilidad (QR)
          </button>
        </div>
      </div>

      {/* Tabs Content */}
      {activeTab === 'producer' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Checklist y Alertas */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Tareas Diarias */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Bitácora de Tareas de Inocuidad</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Traducción de normas técnicas complejas a hábitos sencillos</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  {tasks.filter(t => t.completed).length} / {tasks.length} Completadas
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`group flex items-start gap-4 rounded-2xl border p-4 cursor-pointer transition-all duration-200 ${
                      task.completed
                        ? 'border-emerald-100 bg-emerald-50/30'
                        : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all duration-200 group-hover:scale-110 border-slate-300 bg-white text-emerald-600">
                      {task.completed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : null}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                          task.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {task.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {task.norm}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${
                        task.completed ? 'text-slate-500 line-through' : 'text-slate-800 font-medium'
                      }`}>
                        {task.text}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-xs font-bold ${task.completed ? 'text-emerald-600' : 'text-slate-400'}`}>
                        +{task.points} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel de Alertas Predictivas */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Alertas Fitoclimáticas Predictivas</h2>
                  <p className="text-xs text-slate-500">Cruza tus geocercas con datos climatológicos del SIAP y sanitarios de SENASICA</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Lista de alertas */}
                <div className="flex flex-col gap-2.5 md:col-span-1 border-r border-slate-100 pr-0 md:pr-4">
                  {alerts.map((alert) => (
                    <button
                      key={alert.id}
                      onClick={() => setActiveAlert(alert)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                        activeAlert.id === alert.id
                          ? 'border-emerald-600 bg-emerald-50/20 text-emerald-800'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`h-2.5 w-2.5 rounded-full ${alert.level === 'danger' ? 'bg-red-500' : 'bg-amber-400'}`}></span>
                        <span className="text-[10px] text-slate-400 font-normal">{alert.date}</span>
                      </div>
                      <p className="line-clamp-2 leading-tight">{alert.title}</p>
                    </button>
                  ))}
                </div>

                {/* Detalle de la alerta activa */}
                <div className="md:col-span-2 bg-slate-50 rounded-2xl p-5 border border-slate-150 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className={`rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        activeAlert.level === 'danger'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {activeAlert.level === 'danger' ? 'Riesgo Crítico' : 'Riesgo Moderado'}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500 font-mono">
                        {activeAlert.source}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-base mb-2">
                      {activeAlert.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {activeAlert.message}
                    </p>
                  </div>

                  <div className="border-t border-slate-200/80 pt-4">
                    <div className="flex items-start gap-2.5 bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm">
                      <div className="text-emerald-600 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">Acción Recomendada Fitosanitaria</p>
                        <p className="text-xs text-slate-700 mt-0.5 font-medium leading-relaxed">{activeAlert.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA: Puntos de Incentivo y Badge Digital */}
          <div className="flex flex-col gap-8">
            
            {/* Medalla Digital / Incentivo */}
            <div className={`rounded-3xl bg-slate-950 p-6 text-white shadow-xl relative overflow-hidden transition-all duration-300 ${
              activeAlert.level === 'danger' && !tasks.find(t => t.id === 3).completed ? 'border-2 border-rose-500/50 shadow-glow-danger' : 'border border-slate-800'
            }`}>
              {/* Círculos de fondo estilizados */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl"></div>
              <div className="absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-emerald-500/10 blur-2xl"></div>

              <h3 className="text-lg font-bold tracking-tight mb-1 text-slate-100">
                Incentivo por Cumplimiento
              </h3>
              <p className="text-xs text-slate-400 mb-5 leading-normal">
                Reduce tus mermas, obtén preseas de trazabilidad y vende a mayor precio con el respaldo de cumplimiento sanitario.
              </p>

              {/* Visualización del Badge */}
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative flex items-center justify-center">
                  {/* Círculo externo de progreso brillante */}
                  <div className={`absolute h-40 w-40 rounded-full bg-gradient-to-tr ${badgeInfo.color} opacity-20 blur-xl animate-pulse-soft`}></div>
                  <div className={`h-36 w-36 rounded-full bg-gradient-to-tr ${badgeInfo.color} p-1.5 shadow-lg`}>
                    <div className="h-full w-full rounded-full bg-slate-900 flex flex-col items-center justify-center p-3 text-center">
                      <span className="text-[9px] font-bold text-emerald-400 tracking-widest uppercase">Certificado</span>
                      <span className="text-4xl font-extrabold text-white mt-1 mb-0.5">{compliancePercentage}%</span>
                      <span className="text-[10px] font-bold text-slate-400">Score de Inocuidad</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <span className={`inline-block rounded-full border px-3.5 py-1 text-xs font-extrabold ${badgeInfo.bgPill}`}>
                    {badgeInfo.name}
                  </span>
                  <p className="text-xs text-slate-300 px-4 mt-3 leading-relaxed">
                    {badgeInfo.desc}
                  </p>
                </div>
              </div>

              {/* Progreso del Lote */}
              <div className="mt-4 border-t border-slate-800 pt-5">
                <div className="flex justify-between text-xs text-slate-400 font-medium mb-1.5">
                  <span>Requisitos de Exportación</span>
                  <span>Min: 90% para Platino</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${badgeInfo.color} transition-all duration-500`}
                    style={{ width: `${compliancePercentage}%` }}
                  ></div>
                </div>

                {compliancePercentage < 90 ? (
                  <p className="text-[10px] text-amber-400/95 font-medium mt-3 leading-normal">
                    💡 <strong>Consejo:</strong> Completa las tareas pendientes para ganar +{totalPoints - earnedPoints} pts, subir a nivel Platino y liberar tu certificado de comercialización premium.
                  </p>
                ) : (
                  <p className="text-[10px] text-emerald-400 font-semibold mt-3 flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    ¡Lote calificado para Sello de Cosecha Segura Platino!
                  </p>
                )}
              </div>
            </div>

            {/* Generar QR para el lote */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-1.5">Generar Código QR Fitosanitario</h3>
                <p className="text-xs text-slate-500 leading-normal mb-4">
                  Exporta este lote con su trazabilidad verídica e inocuidad garantizada para que los distribuidores puedan escanear el histórico.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('buyer')
                  handleStartScan()
                }}
                disabled={compliancePercentage < 50}
                className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3 text-xs font-bold transition-all duration-300 shadow-sm ${
                  compliancePercentage < 50
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                Exportar y Previsualizar Trazabilidad QR
              </button>
              {compliancePercentage < 50 && (
                <p className="text-[10px] text-red-500 font-semibold text-center mt-2">
                  * Requiere score mínimo de 50% de cumplimiento.
                </p>
              )}
            </div>

          </div>

        </div>
      ) : (
        /* VISTA DEL COMPRADOR: Escaneo QR interactivo */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: Escáner interactivo */}
          <div className="lg:col-span-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Simulador de Trazabilidad</h2>
              <p className="text-xs text-slate-500 mt-0.5">Escanea el QR en el empaque para validar su estatus sanitario</p>
            </div>

            {/* Selector de Producto */}
            <div className="flex gap-2 rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                onClick={() => {
                  setSelectedProduct('tomate')
                  setQrState('idle')
                }}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition ${
                  selectedProduct === 'tomate' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Caja Tomate Lote 88A
              </button>
              <button
                onClick={() => {
                  setSelectedProduct('aguacate')
                  setQrState('idle')
                }}
                className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition ${
                  selectedProduct === 'aguacate' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Caja Aguacate Lote 44C
              </button>
            </div>

            {/* Visor de Escaneo */}
            <div className="relative border-4 border-slate-200 rounded-2xl aspect-square bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
              
              {/* Esquinas del visor de cámara */}
              <div className="absolute top-4 left-4 h-6 w-6 border-t-4 border-l-4 border-emerald-500"></div>
              <div className="absolute top-4 right-4 h-6 w-6 border-t-4 border-r-4 border-emerald-500"></div>
              <div className="absolute bottom-4 left-4 h-6 w-6 border-b-4 border-l-4 border-emerald-500"></div>
              <div className="absolute bottom-4 right-4 h-6 w-6 border-b-4 border-r-4 border-emerald-500"></div>

              {qrState === 'idle' && (
                <div className="text-center p-6 flex flex-col items-center">
                  <div className="rounded-full bg-slate-900 border border-slate-800 p-4 text-slate-400 mb-3.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-white text-xs font-semibold px-4 leading-normal mb-1">
                    Cámara lista para escaneo
                  </p>
                  <p className="text-slate-500 text-[10px] leading-relaxed mb-4">
                    QR simulado en la etiqueta del empaque
                  </p>
                  <button
                    onClick={handleStartScan}
                    className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-5 transition duration-300 shadow-sm active:scale-95"
                  >
                    Escanear Código QR
                  </button>
                </div>
              )}

              {qrState === 'scanning' && (
                <div className="text-center flex flex-col items-center justify-center h-full w-full relative">
                  {/* Línea láser roja de escaneo */}
                  <div className="absolute left-0 right-0 h-1 bg-red-500 shadow-lg shadow-red-500/50 animate-scan-line"></div>
                  
                  {/* Código QR estático difuminado */}
                  <div className="opacity-40 filter blur-[1px] p-6 bg-white rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  </div>
                  
                  <p className="text-emerald-400 font-bold text-xs tracking-wider animate-pulse mt-4">
                    PROCESANDO TRAZABILIDAD...
                  </p>
                </div>
              )}

              {qrState === 'scanned' && (
                <div className="text-center p-6 flex flex-col items-center">
                  <div className="rounded-full bg-emerald-950 border border-emerald-800 p-4 text-emerald-400 mb-3 shadow-glow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-white text-sm font-bold">¡Lote Validado!</p>
                  <p className="text-slate-400 text-[10px] mt-1 mb-5">
                    Histórico y certificación fito-nutricional obtenidos.
                  </p>
                  <button
                    onClick={() => setQrState('idle')}
                    className="text-slate-400 hover:text-white font-bold text-[11px] hover:underline"
                  >
                    Volver a escanear
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* COLUMNA DERECHA: Reporte de trazabilidad verificado */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {qrState !== 'scanned' ? (
              <div className="h-full rounded-3xl border border-slate-200 border-dashed bg-slate-50 flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                <div className="rounded-full bg-slate-200/80 p-3.5 text-slate-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-700 text-sm mb-1.5">Verificación de Lote Vacía</h3>
                <p className="text-xs text-slate-500 leading-normal max-w-sm">
                  Usa el simulador de escáner QR de la izquierda y haz clic en "Escanear Código QR" para cargar los certificados y auditoría fitosanitaria.
                </p>
              </div>
            ) : (
              /* Reporte fitosanitario cargado */
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-6">
                
                {/* Header del lote */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-5">
                  <div>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-emerald-800">
                      Certificación Oficial SENASICA
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1">{lotData[selectedProduct].product}</h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {lotData[selectedProduct].id}</p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${lotData[selectedProduct].badgeColor} px-3 py-1.5 text-xs font-extrabold text-white shadow-sm`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708.522L4.083 8.75h11.834L14.44 3.977a.75.75 0 00-.707-.522H6.267zm10.74 6.795a1.25 1.25 0 01-1.074.75H4.067a1.25 1.25 0 01-1.074-.75l-.47-1.25h14.954l-.47 1.25zM2.927 12.5l.385 1.026A1.5 1.5 0 004.72 14.5h10.56a1.5 1.5 0 001.408-.974l.385-1.026H2.927z" clipRule="evenodd" />
                      </svg>
                      {lotData[selectedProduct].badgeLevel}
                    </span>
                  </div>
                </div>

                {/* Grid de metadata del lote */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs">
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">Origen Fitosanitario</p>
                    <p className="text-slate-800 font-bold mt-0.5">{lotData[selectedProduct].origin}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">Fecha de Cosecha</p>
                    <p className="text-slate-800 font-bold mt-0.5">{lotData[selectedProduct].harvestDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">Registro de Certificado</p>
                    <p className="text-slate-800 font-mono font-bold mt-0.5 text-[11px]">{lotData[selectedProduct].senasicaId}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">Score de Cumplimiento Técnico</p>
                    <p className="text-emerald-700 font-bold mt-0.5 flex items-center gap-1 text-sm">
                      {lotData[selectedProduct].complianceScore}% Favorable
                    </p>
                  </div>
                </div>

                {/* Timeline de Cumplimiento de Inocuidad */}
                <div>
                  <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Línea del Histórico de Inocuidad</h4>
                  
                  <div className="relative border-l-2 border-slate-100 pl-6 ml-3 flex flex-col gap-5">
                    {lotData[selectedProduct].history.map((step, idx) => (
                      <div key={idx} className="relative">
                        
                        {/* Nodo del timeline */}
                        <span className="absolute -left-9 top-0.5 flex h-6.5 w-6.5 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-600 text-emerald-600 shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>

                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="text-xs font-bold text-slate-800">{step.phase}</h5>
                            <span className="text-[10px] text-slate-400 font-semibold">{step.date}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cierre / Enlace de Validación */}
                <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-[10px] font-semibold text-slate-500">Historial verificado en blockchain fitosanitario</span>
                  </div>
                  <a
                    href="#verify"
                    onClick={(e) => {
                      e.preventDefault()
                      alert(`Verificando firma criptográfica de SENASICA para ${lotData[selectedProduct].id}`)
                    }}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1"
                  >
                    Verificar Firma Digital SENASICA
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

              </div>
            )}
          </div>

        </div>
      )}
    </div>
  )
}
