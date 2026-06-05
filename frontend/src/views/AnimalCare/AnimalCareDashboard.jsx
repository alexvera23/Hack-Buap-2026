import React, { useState } from 'react'
import VectorAlerts from './components/VectorAlerts'
import VaccinationSchedule from './components/VaccinationSchedule'
import HealthSemaphore from './components/HealthSemaphore'
import CertificationPanel from './components/CertificationPanel'
import { Shield, Activity, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AnimalCareDashboard() {
  const navigate = useNavigate()
  
  // Estado local para simular telemetría o datos de base de datos unificada
  const [farmData, setFarmData] = useState({
    vectorRisk: 'Alto', // Alto, Medio, Bajo
    vaccinationProgress: 75,
    lastSanitization: '2026-06-04',
    activeOutbreaks: false
  })

  const handleMitigateVectors = () => {
    setFarmData(prev => ({
      ...prev,
      vectorRisk: 'Bajo',
      vaccinationProgress: prev.vaccinationProgress >= 100 ? 100 : prev.vaccinationProgress + 5
    }))
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 transition-colors duration-200">
      
      {/* Barra de Navegación / Encabezado superior */}
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex items-start gap-3">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors mt-1"
            title="Volver al Selector de Sector"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-warning/10 rounded text-warning">
                <Shield className="w-6 h-6" />
              </span>
              <h1 className="text-2xl font-bold tracking-tight">Bioseguridad Zoosanitaria</h1>
            </div>
            <p className="text-gray-500 text-sm mt-0.5">Control epidemiológico, vectores y trazabilidad pecuaria</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full font-semibold text-sm self-start sm:self-center">
          <Activity className="w-4 h-4" /> Unidades Verificadas: Activas
        </div>
      </header>

      {/* Grid del Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Operativa (Izquierda y Centro) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <VectorAlerts 
            risk={farmData.vectorRisk} 
            onAction={handleMitigateVectors} 
          />
          <VaccinationSchedule 
            progress={farmData.vaccinationProgress}
            lastSanitization={farmData.lastSanitization}
            onUpdateProgress={(val) => setFarmData(prev => ({ ...prev, vaccinationProgress: val }))}
          />
        </div>

        {/* Columna de Certificación y Cara al Público (Derecha) */}
        <div className="flex flex-col gap-6">
          <HealthSemaphore data={farmData} />
          <CertificationPanel data={farmData} />
        </div>

      </div>
    </div>
  )
}