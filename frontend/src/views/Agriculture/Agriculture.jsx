import React, { useState } from 'react';
import { Users, QrCode, Award, BarChart3 } from 'lucide-react';
import SupervisorDashboard from './SupervisorDashboard';
import ClientView from './ClientView';
import GamificationSystem from './GamificationSystem';
import AgricultureIndicators from './AgricultureIndicators';

export default function Agriculture() {
  const [activeView, setActiveView] = useState('supervisor');

  const views = {
    supervisor: {
      name: 'Dashboard Supervisor',
      icon: Users,
      description: 'Control de tareas de inocuidad, alertas fitoclimáticas y cumplimiento',
      component: SupervisorDashboard,
    },
    client: {
      name: 'Validador de Trazabilidad',
      icon: QrCode,
      description: 'Verificación de lotes con QR para compradores e inspectores',
      component: ClientView,
    },
    gamification: {
      name: 'Sistema de Gamificación',
      icon: Award,
      description: 'Medallas de bioseguridad y mejora de reputación del productor',
      component: GamificationSystem,
    },
    indicators: {
      name: 'Indicadores Agrícolas',
      icon: BarChart3,
      description: 'Análisis histórico y tendencias de inocuidad fitosanitaria',
      component: AgricultureIndicators,
    },
  };

  const CurrentComponent = views[activeView].component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Módulo de Agricultura</h1>
            </div>
            <div className="text-sm text-gray-600">Bioseguridad Fitonutricional e Inocuidad</div>
          </div>

          {/* View Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.entries(views).map(([key, view]) => {
              const Icon = view.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveView(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeView === key
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{view.name}</span>
                </button>
              );
            })}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-2">{views[activeView].description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-6">
        <CurrentComponent />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
            <p>
              Hack BUAP 2026 - Soluciones en Agricultura | Módulo: Bioseguridad Fitonutricional e Inocuidad
            </p>
            <p className="mt-2">
              Conectado con SIAP y SENASICA. Desarrollado con React, Tailwind CSS y datos de ejemplo realistas para análisis y desarrollo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
