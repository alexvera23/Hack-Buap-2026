import React from 'react'
import { QrCode, CheckCircle, ShieldAlert } from 'lucide-react'

export default function HealthSemaphore({ data }) {
  const isOptimal = data.vectorRisk === 'Bajo' && data.vaccinationProgress >= 80;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-5 flex flex-col gap-4">
      <div>
        <h2 className="text-base font-bold text-foreground">Semáforo Zoosanitario de Transparencia</h2>
        <p className="text-gray-400 text-xs">Validación pública para inspectores y puntos de venta</p>
      </div>

      {/* Indicador Visual de Estatus */}
      <div className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
        isOptimal ? 'bg-success/5 border-success/20' : 'bg-warning/5 border-warning/20'
      }`}>
        <div className="flex items-center gap-3">
          <span className={`w-3.5 h-3.5 rounded-full ${
            isOptimal ? 'bg-success animate-pulse' : 'bg-warning animate-pulse'
          }`} />
          <span className="font-bold text-xs uppercase tracking-wider">
            {isOptimal ? 'Estatus Seguro' : 'Estatus Condicionado'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
          LOTE: MX-P2
        </span>
      </div>

      {/* Caja de QR */}
      <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center text-center justify-center">
        <QrCode className="w-24 h-24 text-gray-800 mb-2" />
        <p className="text-[11px] text-gray-500 max-w-[200px] leading-relaxed">
          Escanea el identificador de la unidad de producción para validar la trazabilidad higiénica libre de brotes activos.
        </p>
      </div>
    </div>
  )
}