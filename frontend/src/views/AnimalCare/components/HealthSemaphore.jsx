import React from 'react'
import { QrCode, CheckCircle, ShieldAlert } from 'lucide-react'

export default function HealthSemaphore({ data }) {
  const isOptimal = data.vectorRisk === 'Bajo' && data.vaccinationProgress >= 80;

  return (
    <div className="bg-[var(--color-background)] rounded-3xl shadow-sm border border-[var(--color-light)] p-6 flex flex-col gap-5">
      <div>
        <h2 className="text-base font-bold text-[var(--color-foreground)]">Semáforo Zoosanitario de Transparencia</h2>
        <p className="text-[var(--color-foreground)]/60 text-xs mt-1">Validación pública para inspectores y puntos de venta</p>
      </div>

      <div className={`p-4 rounded-3xl border flex items-center justify-between transition-colors ${
        isOptimal ? 'bg-[var(--color-success)]/10 border-[var(--color-success)]/20' : 'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/20'
      }`}>
        <div className="flex items-center gap-3">
          <span className={`w-3.5 h-3.5 rounded-full ${
            isOptimal ? 'bg-[var(--color-success)] animate-pulse' : 'bg-[var(--color-warning)] animate-pulse'
          }`} />
          <span className="font-bold text-xs uppercase tracking-wider text-[var(--color-foreground)]">
            {isOptimal ? 'Estatus Seguro' : 'Estatus Condicionado'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--color-foreground)]/70 bg-[var(--color-light)] px-2 py-0.5 rounded">
          LOTE: MX-P2
        </span>
      </div>

      <div className="bg-[var(--color-light)] border border-dashed border-[var(--color-light)] rounded-3xl p-5 flex flex-col items-center text-center justify-center">
        <QrCode className="w-24 h-24 text-[var(--color-foreground)] mb-3" />
        <p className="text-[11px] text-[var(--color-foreground)]/70 max-w-[220px] leading-relaxed">
          Escanea el identificador de la unidad de producción para validar la trazabilidad higiénica libre de brotes activos.
        </p>
      </div>
    </div>
  )
}