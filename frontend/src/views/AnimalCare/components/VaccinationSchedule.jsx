import React from 'react'
import { Calendar, Syringe, Sparkles } from 'lucide-react'

export default function VaccinationSchedule({ progress, lastSanitization, onUpdateProgress }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-5">
      <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-400" />
        Cronograma Interno de Inmunización y Sanidad
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tarjeta de Cobertura de Vacunación */}
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Cobertura de Vacunación</span>
            <Syringe className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black">{progress}%</span>
            <span className="text-xs text-gray-500">del hato protegido</span>
          </div>
          {/* Barra de progreso interactiva */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3 overflow-hidden">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress < 100 && (
            <button 
              onClick={() => onUpdateProgress(100)}
              className="mt-3 text-xs font-semibold text-primary hover:underline block"
            >
              Registrar lote de vacunas completado →
            </button>
          )}
        </div>

        {/* Tarjeta de Desinfección de Corrales */}
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Desinfección de Instalaciones</span>
              <Sparkles className="w-4 h-4 text-warning" />
            </div>
            <p className="text-xs text-gray-600 leading-normal">
              Último saneamiento químico estructural registrado en bitácora:
            </p>
          </div>
          <div className="mt-2 text-sm font-mono font-bold bg-white px-2 py-1 border border-gray-100 rounded inline-block self-start">
            {lastSanitization}
          </div>
        </div>
      </div>
    </div>
  )
}