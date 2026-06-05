import React, { useState } from 'react';
import { Users, ShieldAlert, Award, BarChart3 } from 'lucide-react';
import SupervisorDashboard from './SupervisorDashboard';
import ClientView from './ClientView';
import GamificationSystem from './GamificationSystem';
import AnimalCareIndicators from './AnimalCareIndicators';

export default function AnimalCare() {
  const [activeView, setActiveView] = useState('supervisor');

  const views = {
    supervisor: {
      name: 'Dashboard Supervisor',
      icon: Users,
      description: 'Control de vectores, vacunación y alertas zoosanitarias',
      component: SupervisorDashboard,
    },
    client: {
      name: 'Vista Cliente/Inspector',
      icon: ShieldAlert,
      description: 'Semáforo zoosanitario y trazabilidad en tiempo real (QR)',
      component: ClientView,
    },
    gamification: {
      name: 'Sistema de Gamificación',
      icon: Award,
      description: 'Medallas y mejora de reputación de la unidad productiva',
      component: GamificationSystem,
    },
    indicators: {
      name: 'Indicadores Zoosanitarios',
      icon: BarChart3,
      description: 'Análisis histórico y tendencias de bioseguridad animal',
      component: AnimalCareIndicators,
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
              <ShieldAlert className="w-6 h-6 text-amber-600" />
              <h1 className="text-3xl font-bold text-gray-900">Módulo de Cuidado Animal</h1>
            </div>
            <div className="text-sm text-gray-600">Bioseguridad Zoosanitaria y Trazabilidad Pecuaria</div>
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
                      ? 'bg-amber-600 text-white shadow-md'
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
              Hack BUAP 2026 - Soluciones en Salud Animal | Módulo: Bioseguridad Zoosanitaria y Trazabilidad Pecuaria
            </p>
            <p className="mt-2">
              Desarrollado con React, Tailwind CSS y datos de ejemplo realistas para análisis y desarrollo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
