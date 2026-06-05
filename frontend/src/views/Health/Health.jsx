import React, { useState } from 'react';
import SupervisorDashboard from './SupervisorDashboard';
import ClientView from './ClientView';
import GamificationSystem from './GamificationSystem';
import HealthIndicators from './HealthIndicators';

export default function Health() {
  const [activeView, setActiveView] = useState('supervisor');

  const views = {
    supervisor: {
      name: 'Dashboard Supervisor',
      icon: '👨‍⚕️',
      description: 'Control de protocolos de esterilización, EPP y RPBI',
      component: SupervisorDashboard,
    },
    client: {
      name: 'Vista Cliente/Paciente',
      icon: '🏥',
      description: 'Indicadores de higiene en tiempo real (QR)',
      component: ClientView,
    },
    gamification: {
      name: 'Sistema de Gamificación',
      icon: '🏆',
      description: 'Medallas y mejora de reputación del establecimiento',
      component: GamificationSystem,
    },
    indicators: {
      name: 'Indicadores de Salud',
      icon: '📊',
      description: 'Análisis histórico y tendencias de bioseguridad',
      component: HealthIndicators,
    },
  };

  const CurrentComponent = views[activeView].component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">🏥 Módulo de Salud Humana</h1>
            <div className="text-sm text-gray-600">Bioseguridad Clínica y Comercial</div>
          </div>

          {/* View Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.entries(views).map(([key, view]) => (
              <button
                key={key}
                onClick={() => setActiveView(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeView === key
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{view.icon}</span>
                <span>{view.name}</span>
              </button>
            ))}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3">Sobre este Módulo</h3>
              <p className="text-gray-400 text-sm">
                Sistema integral de bioseguridad clínica para controlar protocolos de esterilización,
                EPP y residuos biológico-infecciosos.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Características</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>✓ Dashboard en tiempo real</li>
                <li>✓ Gamificación y medallas</li>
                <li>✓ QR público para clientes</li>
                <li>✓ Análisis histórico</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Datasets Incluidos</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>📋 Protocolos de esterilización</li>
                <li>🗑️ Registros de RPBI</li>
                <li>🛡️ Inventario de EPP</li>
                <li>📊 Métricas de clientes</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
            <p>
              Hack BUAP 2026 - Soluciones en Salud Humana | Módulo: Bioseguridad Clínica y Comercial
            </p>
            <p className="mt-2">
              Desarrollado con React, Tailwind CSS y datos de ejemplo realistas para análisis y
              desarrollo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
