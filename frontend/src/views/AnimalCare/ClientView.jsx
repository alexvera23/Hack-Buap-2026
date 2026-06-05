import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { ShieldAlert, TrendingUp } from 'lucide-react';
import HealthSemaphore from './components/HealthSemaphore';
import CertificationPanel from './components/CertificationPanel';

export default function ClientView() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showQRInfo, setShowQRInfo] = useState(false);
  const [farmData, setFarmData] = useState({
    vectorRisk: 'Bajo',
    vaccinationProgress: 85,
    lastSanitization: '2026-06-05',
    activeOutbreaks: false,
    farmName: 'Granja La Esperanza',
    farmId: 'GLE-2026-001',
    location: 'Puebla, México',
  });

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const farmPayload = btoa(JSON.stringify({ type: 'farm', id: farmData.farmId }));
  const qrValue = `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?payload=${farmPayload}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-8 h-8 text-amber-700" />
            <h1 className="text-4xl font-bold text-gray-900">Certificación Zoosanitaria</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Información pública de bioseguridad y trazabilidad para inspectores, puntos de venta y autoridades sanitarias.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Info Card */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{farmData.farmName}</h2>
              <p className="text-gray-600">{farmData.location}</p>
              <p className="text-sm text-gray-500 mt-2">ID: {farmData.farmId}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                <p className="text-sm text-gray-600 font-medium">Riesgo de Vectores</p>
                <p className="text-2xl font-bold text-green-700 mt-2">{farmData.vectorRisk}</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                <p className="text-sm text-gray-600 font-medium">Vacunación</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold text-blue-700">{farmData.vaccinationProgress}%</span>
                  <TrendingUp className="w-5 h-5 text-blue-700" />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendaciones para el Inspector</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Unidad de producción libre de vectores activos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Programa de vacunación al día</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Registros de desinfección documentados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Medidas de bioseguridad implementadas</span>
                </li>
              </ul>
            </div>
          </div>

          {/* QR and Status Cards */}
          <div className="flex flex-col gap-6">
            {/* QR Card */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Código QR de Verificación</h3>
              <button
                onClick={() => setShowQRInfo(!showQRInfo)}
                className="w-full mb-4 inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-medium"
              >
                📱 Mostrar QR
              </button>

              {showQRInfo && (
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center h-48 border border-gray-200">
                  <div className="text-center">
                    <div className="inline-block bg-white p-2 rounded shadow-sm mb-3">
                      <QRCode value={qrValue} size={120} />
                    </div>
                    <p className="text-xs text-gray-600">ID: {farmData.farmId}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Semaphore and Certification */}
            <HealthSemaphore data={farmData} />
            <CertificationPanel data={farmData} />
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">¿Por qué confiar en nuestro sistema?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-amber-100 text-amber-700">
                  <ShieldAlert className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Trazabilidad Completa</h4>
                <p className="text-sm text-gray-600">Seguimiento integral desde la unidad productiva hasta el punto de venta.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 text-green-700">
                  <ShieldAlert className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Control de Vectores</h4>
                <p className="text-sm text-gray-600">Monitoreo predictivo de fauna nociva y alertas georreferenciadas.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-700">
                  <ShieldAlert className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Vacunación Programada</h4>
                <p className="text-sm text-gray-600">Calendarios de inmunización certificados y documentados.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100 text-purple-700">
                  <ShieldAlert className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Certificación Verificable</h4>
                <p className="text-sm text-gray-600">Medallas y permisos validables en línea por autoridades.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Información actualizada: {currentTime.toLocaleTimeString('es-MX')}</p>
          <p>Los datos se actualizan automáticamente cada minuto</p>
        </div>
      </div>
    </div>
  );
}
