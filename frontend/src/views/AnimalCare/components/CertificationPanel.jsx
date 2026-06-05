import React from 'react'
import { Award, FileBadge2, Lock } from 'lucide-react'

export default function CertificationPanel({ data }) {
  const verifiedTransit = data.vectorRisk === 'Bajo' && data.vaccinationProgress >= 80;

  return (
    <div className="bg-[var(--color-background)] rounded-3xl shadow-sm border border-[var(--color-light)] p-6 flex flex-col gap-5">
      <h2 className="text-base font-bold text-[var(--color-foreground)]">Incentivos de Trazabilidad</h2>

      <div className="p-4 bg-[var(--color-light)] rounded-3xl border border-[var(--color-light)] flex gap-3 items-center">
        <Award className={`w-8 h-8 shrink-0 ${verifiedTransit ? 'text-[var(--color-warning)]' : 'text-[var(--color-foreground)]/40'}`} />
        <div>
          <h4 className="text-xs font-bold text-[var(--color-foreground)]">Presea Hato Seguro</h4>
          <p className="text-[11px] text-[var(--color-foreground)]/70">Desbloqueada automáticamente al mitigar riesgos biológicos.</p>
        </div>
      </div>

      <div>
        <span className="text-[10px] font-bold text-[var(--color-foreground)]/60 uppercase tracking-wider block mb-3">
          Guía de Tránsito Rápido
        </span>
        {verifiedTransit ? (
          <div className="p-3 bg-[var(--color-success)] text-[var(--color-success-foreground)] rounded-2xl flex items-center gap-2 text-xs font-bold shadow-sm uppercase tracking-wider justify-center">
            <FileBadge2 className="w-4 h-4" /> Permiso Autorizado
          </div>
        ) : (
          <div className="p-3 bg-[var(--color-light)] text-[var(--color-foreground)]/70 border border-[var(--color-light)] rounded-2xl flex items-center gap-2 text-xs font-bold justify-center">
            <Lock className="w-4 h-4" /> Tránsito Retenido por Vectores
          </div>
        )}
      </div>
    </div>
  )
}