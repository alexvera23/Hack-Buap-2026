import React from 'react'
import { AlertTriangle, ShieldCheck, FlameKindling } from 'lucide-react'

export default function VectorAlerts({ risk, onAction }) {
  return (
    <div className="bg-[var(--color-background)] rounded-3xl shadow-sm border border-[var(--color-light)] p-6">
      <h2 className="text-base font-bold text-[var(--color-foreground)] mb-5 flex items-center gap-2">
        <FlameKindling className="w-5 h-5 text-[var(--color-primary)]" />
        Alertas Predictivas y Control de Fauna Nociva
      </h2>

      {risk === 'Alto' ? (
        <div className="bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 rounded-3xl p-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4">
            <AlertTriangle className="text-[var(--color-danger)] w-10 h-10 shrink-0" />
            <div>
              <h3 className="font-bold text-[var(--color-danger)] text-sm sm:text-base">Zona de Alta Presencia: Vector Boophilus</h3>
              <p className="text-[var(--color-foreground)]/70 text-xs sm:text-sm mt-2 leading-relaxed">
                Cruces de datos geográficos advierten proliferación de ectoparásitos en tu cuadrante debido a la humedad actual.
              </p>
            </div>
          </div>
          <button
            onClick={onAction}
            className="w-full sm:w-auto px-5 py-3 bg-[var(--color-danger)] text-[var(--color-danger-foreground)] text-xs font-bold rounded-2xl hover:opacity-95 transition-all shadow-sm uppercase tracking-wide"
          >
            Reforzar Baño Inmediato
          </button>
        </div>
      ) : (
        <div className="bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-3xl p-5 flex gap-3 items-center">
          <ShieldCheck className="text-[var(--color-success)] w-6 h-6 shrink-0" />
          <div>
            <h3 className="font-bold text-[var(--color-success)] text-sm">Cerco Sanitario Protegido</h3>
            <p className="text-[var(--color-foreground)]/70 text-xs mt-1">No se detectan alertas activas por vectores en tu región ganadera.</p>
          </div>
        </div>
      )}
    </div>
  )
}