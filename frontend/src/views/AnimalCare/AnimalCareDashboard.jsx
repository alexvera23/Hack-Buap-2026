import React, { useState } from 'react'
import VectorAlerts from './components/VectorAlerts'
import VaccinationSchedule from './components/VaccinationSchedule'
import HealthSemaphore from './components/HealthSemaphore'
import CertificationPanel from './components/CertificationPanel'
import { Shield, Activity, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'

export default function AnimalCareDashboard() {
  const navigate = useNavigate()

  const [farmData, setFarmData] = useState({
    vectorRisk: 'Alto',
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
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b border-[var(--color-light)]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-2xl text-[var(--color-primary)] hover:bg-[var(--color-light)] transition-colors"
              title="Volver al Selector de Sector"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <span className="inline-flex items-center justify-center p-2 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Shield className="w-5 h-5" />
                </span>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Bioseguridad Zoosanitaria</h1>
                  <p className="text-sm text-[var(--color-foreground)]/70 mt-1">Control epidemiológico, vectores y trazabilidad pecuaria</p>
                </div>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-success)]/10 px-4 py-2 text-[var(--color-success)] font-semibold text-sm shadow-sm">
            <Activity className="w-4 h-4" />
            Unidades Verificadas: Activas
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="grid gap-6">
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

          <div className="grid gap-6">
            <HealthSemaphore data={farmData} />
            <CertificationPanel data={farmData} />
          </div>
        </div>

        <Footer modulo="Bioseguridad Zoosanitaria (Cuidado Animal)" />
      </main>
    </div>
  )
}