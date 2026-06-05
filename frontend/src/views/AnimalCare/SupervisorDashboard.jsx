import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import VectorAlerts from './components/VectorAlerts';
import VaccinationSchedule from './components/VaccinationSchedule';
import HealthSemaphore from './components/HealthSemaphore';

export default function SupervisorDashboard() {
  const [farmData, setFarmData] = useState({
    vectorRisk: 'Alto',
    vaccinationProgress: 75,
    lastSanitization: '2026-06-04',
    activeOutbreaks: false,
  });

  const handleMitigateVectors = () => {
    setFarmData((prev) => ({
      ...prev,
      vectorRisk: 'Bajo',
      vaccinationProgress: prev.vaccinationProgress >= 100 ? 100 : prev.vaccinationProgress + 5,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Supervisor</h1>
              <p className="text-gray-600">Control operativo de alertas, vacunación y estado zoosanitario</p>
            </div>
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
              <Activity className="w-5 h-5" /> Unidades Verificadas: Activas
            </div>
          </div>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna Operativa (Izquierda y Centro) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <VectorAlerts risk={farmData.vectorRisk} onAction={handleMitigateVectors} />
            <VaccinationSchedule
              progress={farmData.vaccinationProgress}
              lastSanitization={farmData.lastSanitization}
              onUpdateProgress={(val) => setFarmData((prev) => ({ ...prev, vaccinationProgress: val }))}
            />
          </div>

          {/* Columna de Monitoreo (Derecha) */}
          <div className="flex flex-col gap-6">
            <HealthSemaphore data={farmData} />
          </div>
        </div>
      </div>
    </div>
  );
}
