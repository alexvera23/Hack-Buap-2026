import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SupervisorDashboard() {
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
  ]);

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
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
  const earnedPoints = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0);
  const compliancePercentage = Math.round((earnedPoints / totalPoints) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Supervisor</h1>
              <p className="text-gray-600">Control de tareas de inocuidad, alertas fitoclimáticas y cumplimiento normativo</p>
            </div>
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
              <Activity className="w-5 h-5" /> Cumplimiento: {compliancePercentage}%
            </div>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna Operativa (Izquierda y Centro) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Tareas Diarias */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Bitácora de Tareas de Inocuidad</h2>
                  <p className="text-sm text-gray-600 mt-1">Traducción de normas técnicas a hábitos sencillos en campo</p>
                </div>
                <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold text-sm">
                  <CheckCircle className="w-4 h-4" />
                  {tasks.filter(t => t.completed).length}/{tasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      task.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center mt-1 ${
                        task.completed ? 'bg-green-600 border-green-600' : 'border-gray-300'
                      }`}>
                        {task.completed && <CheckCircle className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded">
                            {task.category}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">{task.norm}</span>
                        </div>
                        <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.text}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-emerald-600 flex-shrink-0">+{task.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alertas Fitoclimáticas */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold text-gray-900">Alertas Fitoclimáticas Predictivas</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">Cruza tus geocercas con datos climatológicos del SIAP y sanitarios de SENASICA</p>

              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.level === 'danger'
                        ? 'border-red-500 bg-red-50'
                        : 'border-amber-500 bg-amber-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        alert.level === 'danger' ? 'text-red-600' : 'text-amber-600'
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{alert.title}</h3>
                        <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                        <div className="bg-white rounded p-3 mb-2 border border-gray-200">
                          <p className="text-sm text-gray-600"><strong>Acción recomendada:</strong> {alert.action}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{alert.source}</span>
                          <span className="text-xs text-gray-500">{alert.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna de Monitoreo (Derecha) */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Resumen de Cumplimiento</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Cumplimiento General</span>
                  <span className="text-2xl font-bold text-emerald-600">{compliancePercentage}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 transition-all"
                    style={{ width: `${compliancePercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{tasks.filter(t => t.completed).length}</p>
                  <p className="text-xs text-gray-600">Completadas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{tasks.filter(t => !t.completed).length}</p>
                  <p className="text-xs text-gray-600">Pendientes</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-600">{earnedPoints}</p>
                  <p className="text-xs text-gray-600">Puntos Ganados</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-400">{totalPoints}</p>
                  <p className="text-xs text-gray-600">Puntos Totales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
