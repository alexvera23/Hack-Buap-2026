import React from 'react'
import { Calendar, Syringe, Sparkles } from 'lucide-react'

export default function VaccinationSchedule({ progress, lastSanitization, onUpdateProgress }) {
  return (
    <div className="bg-[var(--color-background)] rounded-3xl shadow-sm border border-[var(--color-light)] p-6">
      <h2 className="text-base font-bold text-[var(--color-foreground)] mb-5 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
        Cronograma Interno de Inmunización y Sanidad
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-5 bg-[var(--color-light)] border border-[var(--color-light)] rounded-3xl">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-foreground)]/60">Cobertura de Vacunación</span>
            <Syringe className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[var(--color-foreground)]">{progress}%</span>
            <span className="text-xs text-[var(--color-foreground)]/70">del hato protegido</span>
          </div>
          <div className="w-full bg-[var(--color-light)] rounded-full h-1.5 mt-4 overflow-hidden">
            <div
              className="bg-[var(--color-primary)] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress < 100 && (
            <button
              onClick={() => onUpdateProgress(100)}
              className="mt-4 text-xs font-semibold text-[var(--color-primary)] hover:underline block"
            >
              Registrar lote de vacunas completado →
            </button>
          )}
        </div>

        <div className="p-5 bg-[var(--color-light)] border border-[var(--color-light)] rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-foreground)]/60">Desinfección de Instalaciones</span>
              <Sparkles className="w-4 h-4 text-[var(--color-warning)]" />
            </div>
            <p className="text-xs text-[var(--color-foreground)]/70 leading-relaxed">
              Último saneamiento químico estructural registrado en bitácora:
            </p>
          </div>
          <div className="mt-4 text-sm font-mono font-semibold bg-[var(--color-background)] px-3 py-2 border border-[var(--color-light)] rounded-2xl inline-block">
            {lastSanitization}
          </div>
        </div>
      </div>
    </div>
  )
}