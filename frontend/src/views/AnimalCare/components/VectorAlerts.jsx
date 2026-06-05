import React from 'react'
import { AlertTriangle, ShieldCheck, FlameKindling } from 'lucide-react'

export default function VectorAlerts({ risk, onAction }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-5">
      <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
        <FlameKindling className="w-5 h-5 text-gray-400" />
        Alertas Predictivas y Control de Fauna Nociva
      </h2>

      {risk === 'Alto' ? (
        <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-3">
            <AlertTriangle className="text-danger w-9 h-9 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-danger text-sm sm:text-base">Zona de Alta Presencia: Vector Boophilus</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Cruces de datos geográficos advierten proliferación de ectoparásitos en tu cuadrante debido a la humedad actual.
              </p>
            </div>
          </div>
          <button
            onClick={onAction}
            className="w-full sm:w-auto px-4 py-2 bg-danger text-white text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-sm shrink-0 uppercase tracking-wide"
          >
            Reforzar Baño Inmediato
          </button>
        </div>
      ) : (
        <div className="bg-success/10 border border-success/20 rounded-xl p-4 flex gap-3 items-center">
          <ShieldCheck className="text-success w-6 h-6 shrink-0" />
          <div>
            <h3 className="font-bold text-success text-sm">Cerco Sanitario Protegido</h3>
            <p className="text-gray-600 text-xs mt-0.5">No se detectan alertas activas por vectores en tu región ganadera.</p>
          </div>
        </div>
      )}
    </div>
  )
}