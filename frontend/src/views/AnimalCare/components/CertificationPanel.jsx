import React from 'react'
import { Award, FileBadge2, Lock } from 'lucide-react'

export default function CertificationPanel({ data }) {
  const verifiedTransit = data.vectorRisk === 'Bajo' && data.vaccinationProgress >= 80;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-5 flex flex-col gap-4">
      <h2 className="text-base font-bold text-foreground">Incentivos de Trazabilidad</h2>

      {/* Medalla Digital */}
      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex gap-3 items-center">
        <Award className={`w-8 h-8 shrink-0 ${verifiedTransit ? 'text-warning' : 'text-gray-300'}`} />
        <div>
          <h4 className="text-xs font-bold text-foreground">Presea Hato Seguro</h4>
          <p className="text-[11px] text-gray-500">Desbloqueada automáticamente al mitigar riesgos biológicos.</p>
        </div>
      </div>

      {/* Tránsito */}
      <div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
          Guía de Tránsito Rápido
        </span>
        {verifiedTransit ? (
          <div className="p-3 bg-success text-white rounded-lg flex items-center gap-2 text-xs font-bold shadow-sm uppercase tracking-wider justify-center">
            <FileBadge2 className="w-4 h-4" /> Permiso Autorizado
          </div>
        ) : (
          <div className="p-3 bg-gray-100 text-gray-400 border border-gray-200 rounded-lg flex items-center gap-2 text-xs font-bold justify-center">
            <Lock className="w-4 h-4" /> Tránsito Retenido por Vectores
          </div>
        )}
      </div>
    </div>
  )
}