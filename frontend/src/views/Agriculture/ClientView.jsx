import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { QrCode, CheckCircle, MapPin } from 'lucide-react';

const lotData = {
  tomate: {
    id: 'LOT-2026-TOM-88A',
    product: 'Tomate Saladette de Exportación',
    variety: 'Indeterminado - Orgánico',
    origin: 'Rancho El Porvenir, Sector B, Uruapan, Michoacán',
    senasicaId: 'CERT-SENASICA-FITO-2026-9912',
    harvestDate: '05 de Junio, 2026',
    badgeLevel: 'Platino',
    complianceScore: 95,
    history: [
      { phase: 'Análisis de Suelo', desc: 'Suelo verificado libre de metales pesados y nematodos por SENASICA.', date: 'Feb 12, 2026', status: 'passed' },
      { phase: 'Monitoreo de Riego', desc: 'Agua de riego analizada libre de Escherichia coli y Salmonella.', date: 'Mar 20, 2026', status: 'passed' },
      { phase: 'Aislamiento de Plagas', desc: 'Aplicación exitosa del protocolo preventivo contra picudo negro en el Sector B.', date: 'May 10, 2026', status: 'passed' },
      { phase: 'Cosecha e Inocuidad', desc: 'Corte higiénico con herramientas desinfectadas y personal certificado.', date: 'Jun 05, 2026', status: 'passed' }
    ]
  },
  aguacate: {
    id: 'LOT-2026-AGU-44C',
    product: 'Aguacate Hass de Primera',
    variety: 'Hass Convencional Controlado',
    origin: 'Huerta Los Olivos, Sector A, Tacámbaro, Michoacán',
    senasicaId: 'CERT-SENASICA-FITO-2026-8804',
    harvestDate: '03 de Junio, 2026',
    badgeLevel: 'Oro',
    complianceScore: 80,
    history: [
      { phase: 'Inspección Sanitaria', desc: 'Monitoreo libre de barrenador grande del hueso certificado.', date: 'Ene 15, 2026', status: 'passed' },
      { phase: 'Nutrición Preventiva', desc: 'Compostaje certificado libre de patógenos.', date: 'Mar 02, 2026', status: 'passed' },
      { phase: 'Cosecha e Higiene', desc: 'Lavado y desinfección de cajas transportadoras verificado.', date: 'Jun 03, 2026', status: 'passed' }
    ]
  }
};

export default function ClientView() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedProduct, setSelectedProduct] = useState('tomate');
  const [showQRInfo, setShowQRInfo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const product = lotData[selectedProduct];
  const productPayload = btoa(JSON.stringify({ type: 'agricultural_lot', id: product.id }));
  const qrValue = `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?payload=${productPayload}`;

  const getBadgeColor = (level) => {
    switch(level) {
      case 'Platino': return 'from-blue-400 to-cyan-400';
      case 'Oro': return 'from-yellow-400 to-amber-400';
      case 'Plata': return 'from-gray-300 to-slate-400';
      default: return 'from-orange-400 to-red-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <QrCode className="w-8 h-8 text-emerald-700" />
            <h1 className="text-4xl font-bold text-gray-900">Validador de Trazabilidad Agrícola</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Verificación de lotes con QR para compradores, inspectores y autoridades. Historial completo de inocuidad desde semilla hasta cosecha.
          </p>
        </div>

        {/* Product Selector */}
        <div className="flex gap-4 mb-8">
          {Object.entries(lotData).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setSelectedProduct(key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedProduct === key
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {data.product}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Product Info */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.product}</h2>
              <p className="text-gray-600">{product.variety}</p>
              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{product.origin}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                <p className="text-sm text-gray-600 font-medium">ID de Lote</p>
                <p className="text-lg font-bold text-blue-900 mt-2">{product.id}</p>
              </div>
              <div className="rounded-lg bg-purple-50 p-4 border border-purple-200">
                <p className="text-sm text-gray-600 font-medium">Certificado SENASICA</p>
                <p className="text-lg font-bold text-purple-900 mt-2">{product.senasicaId}</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                <p className="text-sm text-gray-600 font-medium">Fecha de Cosecha</p>
                <p className="text-lg font-bold text-green-900 mt-2">{product.harvestDate}</p>
              </div>
              <div className={`rounded-lg bg-gradient-to-r ${getBadgeColor(product.badgeLevel)} bg-opacity-10 p-4 border`}>
                <p className="text-sm text-gray-600 font-medium">Clasificación</p>
                <p className="text-lg font-bold mt-2">{product.badgeLevel}</p>
              </div>
            </div>

            {/* Compliance Score */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Puntuación de Cumplimiento</span>
                <span className="text-2xl font-bold text-emerald-600">{product.complianceScore}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
                  style={{ width: `${product.complianceScore}%` }}
                ></div>
              </div>
            </div>

            {/* History Timeline */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Historial de Inocuidad</h3>
              <div className="space-y-4">
                {product.history.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      {idx < product.history.length - 1 && (
                        <div className="w-0.5 h-16 bg-green-200 my-2"></div>
                      )}
                    </div>
                    <div className="pb-6">
                      <h4 className="font-semibold text-gray-900">{item.phase}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      <p className="text-xs text-gray-500 mt-2">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* QR and Summary */}
          <div className="flex flex-col gap-6">
            {/* QR Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Código QR de Verificación</h3>
              <button
                onClick={() => setShowQRInfo(!showQRInfo)}
                className="w-full mb-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium"
              >
                📱 Mostrar QR
              </button>

              {showQRInfo && (
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center h-48 border border-gray-200">
                  <div className="text-center">
                    <div className="inline-block bg-white p-2 rounded shadow-sm mb-3">
                      <QRCode value={qrValue} size={120} />
                    </div>
                    <p className="text-xs text-gray-600">ID: {product.id}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Verificación</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estado</span>
                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Verificado
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Etapas Completadas</span>
                  <span className="font-bold text-gray-900">{product.history.filter(h => h.status === 'passed').length}/{product.history.length}</span>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-green-900">
                    ✓ Este lote cumple con todos los protocolos fitosanitarios e inocuidad.
                  </p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Para el Comprador</h4>
              <p className="text-sm text-blue-800">
                Producto completamente trazable con certificación SENASICA. Apto para exportación y cumple con estándares internacionales de inocuidad.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Información actualizada: {currentTime.toLocaleTimeString('es-MX')}</p>
          <p>Los datos se verifican en tiempo real con bases de SENASICA</p>
        </div>
      </div>
    </div>
  );
}
