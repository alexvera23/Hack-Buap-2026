import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { disinfectionAreas, qrConfig } from './data/healthDatasets';

const evaluationOptions = [
  { value: 'pass', label: 'Cumple', delta: 3 },
  { value: 'partial', label: 'Parcial', delta: 0 },
  { value: 'fail', label: 'No cumple', delta: -7 },
];

const areaCriteria = [
  { key: 'ppe', label: 'Uso correcto de EPP' },
  { key: 'disinfection', label: 'Desinfección según protocolo' },
  { key: 'documentation', label: 'Registros de limpieza al día' },
];

export default function ClientView() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showQRInfo, setShowQRInfo] = useState(false);
  const [evaluations, setEvaluations] = useState(() => {
    return disinfectionAreas.reduce((acc, area) => {
      acc[area.id] = areaCriteria.reduce((criteria, item) => {
        criteria[item.key] = 'pass';
        return criteria;
      }, {});
      return acc;
    }, {});
  });

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getStatusDisplay = (status) => {
    return {
      clean: { text: '✓ Seguro', color: '#10B981', bg: '#DCFCE7' },
      warning: { text: '⚠️ Atención', color: '#F59E0B', bg: '#FEF3C7' },
    }[status] || { text: 'Desconocido', color: '#111827', bg: '#F3F4F6' };
  };

  const getHygienStatusBar = (score) => {
    if (score >= 90) return { text: 'Excelente', color: '#10B981' };
    if (score >= 80) return { text: 'Bueno', color: '#3B82F6' };
    if (score >= 70) return { text: 'Aceptable', color: '#F59E0B' };
    return { text: 'Requiere Atención', color: '#EF4444' };
  };

  const getScoreAdjustment = (areaId) => {
    const selected = evaluations[areaId] || {};
    return Object.values(selected).reduce((sum, value) => {
      const option = evaluationOptions.find((item) => item.value === value);
      return sum + (option?.delta || 0);
    }, 0);
  };

  const getAdjustedScore = (area) => {
    const adjustment = getScoreAdjustment(area.id);
    const adjusted = Math.min(100, Math.max(0, area.hygienScore + adjustment));
    return adjusted;
  };

  const handleEvaluationChange = (areaId, criterionKey, value) => {
    setEvaluations((prev) => ({
      ...prev,
      [areaId]: {
        ...prev[areaId],
        [criterionKey]: value,
      },
    }));
  };

  const clinic = qrConfig.publicQR;
  // produce a verification URL so scanned QR opens the verify page
  const clinicPayload = btoa(JSON.stringify({ type: 'clinic', id: clinic.id }));
  const qrValue = `${typeof window !== 'undefined' ? window.location.origin : ''}/verify?payload=${clinicPayload}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Header con datos de clínica */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{clinic.clinicName}</h1>
          <p className="text-gray-600 mb-2">{clinic.address}</p>
          <button
            onClick={() => setShowQRInfo(!showQRInfo)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            📱 Mostrar QR de Verificación
          </button>
        </div>

        {/* QR Info Modal */}
        {showQRInfo && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-4 border-2 border-green-600">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Código QR - Verificación de Higiene</h3>
            <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center mb-4 h-48">
              <div className="text-center">
                <div className="inline-block bg-white p-2 rounded shadow-sm">
                  <QRCode value={qrValue} size={150} />
                </div>
                <p className="text-gray-600 text-sm mt-3">QR Interactivo</p>
                <p className="text-xs text-gray-500 mt-2">ID: {clinic.id}</p>
                <p className="text-xs text-gray-500">Válido hasta: {new Date(clinic.validUntil).toLocaleDateString('es-MX')}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Escanea este código para ver los indicadores de higiene en tiempo real de esta clínica.
            </p>
            <button
              onClick={() => setShowQRInfo(false)}
              className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Indicadores de Higiene en Tiempo Real</h2>
          <p className="text-gray-600 mb-4">
            Consulta el estado actual de desinfección de las diferentes áreas de atención
          </p>
        </div>

        {/* Areas Cards */}
        <div className="space-y-4">
          {disinfectionAreas.map((area) => {
            const timeAgo = Math.round((Date.now() - area.lastDisinfection) / (60 * 1000));
            const statusDisplay = getStatusDisplay(area.status);
            const adjustedScore = getAdjustedScore(area);
            const hygienStatus = getHygienStatusBar(adjustedScore);

            return (
              <div
                key={area.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5"
              >
                {/* Area Name and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{area.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Responsable: {area.supervisor}</p>
                  </div>
                  <div
                    className="px-4 py-2 rounded-full font-semibold text-sm"
                    style={{
                      color: statusDisplay.color,
                      backgroundColor: statusDisplay.bg,
                      border: `2px solid ${statusDisplay.color}`,
                    }}
                  >
                    {statusDisplay.text}
                  </div>
                </div>

                {/* Last Disinfection */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600">Última desinfección</p>
                  <p className="text-lg font-semibold text-gray-900">Hace {timeAgo} minutos</p>
                </div>

                {/* Hygiene Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600">Puntuación de Higiene</p>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: hygienStatus.color }}
                      >
                        {getAdjustedScore(area)}%
                      </span>
                      <span
                        className="text-sm px-2 py-1 rounded font-semibold"
                        style={{
                          backgroundColor: hygienStatus.color + '20',
                          color: hygienStatus.color,
                        }}
                      >
                        {hygienStatus.text}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${getAdjustedScore(area)}%`,
                        backgroundColor: hygienStatus.color,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Evaluation Selectors */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900">Evaluación de características</h4>
                  {areaCriteria.map((criterion) => (
                    <div key={criterion.key} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div>
                        <p className="text-xs text-gray-600">{criterion.label}</p>
                      </div>
                      <select
                        value={evaluations[area.id]?.[criterion.key] ?? 'pass'}
                        onChange={(event) => handleEvaluationChange(area.id, criterion.key, event.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-500 focus:outline-none"
                      >
                        {evaluationOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                {/* Disinfection Details */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">Agente Desinfectante</p>
                    <p className="text-sm font-semibold text-gray-900">{area.agent}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Frecuencia de Limpieza</p>
                    <p className="text-sm font-semibold text-gray-900">{area.frequency}</p>
                  </div>
                </div>

                {/* Trust Indicator */}
                {area.status === 'clean' && area.hygienScore >= 90 && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 font-medium">
                      ✓ Esta área cumple con los más altos estándares de higiene
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="font-semibold text-gray-900 mb-3">¿Por qué confiar en nosotros?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Desinfección regular con agentes certificados</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Personal capacitado en protocolos de bioseguridad</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Monitoreo en tiempo real de áreas críticas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Equipos de protección siempre disponibles</span>
            </li>
          </ul>
        </div>

        {/* Last Updated */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Información actualizada: {currentTime.toLocaleTimeString('es-MX')}</p>
          <p>Los datos se actualizan automáticamente cada minuto</p>
        </div>
      </div>
    </div>
  );
}
