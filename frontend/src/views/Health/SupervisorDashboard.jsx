import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import {
  sterilizationProtocols,
  bioWasteRecords,
  personalProtectiveEquipment,
  disinfectionAreas,
  incidents,
  certificates,
  qrConfig,
} from './data/healthDatasets';

export default function SupervisorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedArea, setSelectedArea] = useState(null);
  const [certModal, setCertModal] = useState(false);
  const [createdCert, setCreatedCert] = useState(null);
  const qrRef = useRef(null);

  const calculateOverallHygiene = () => {
    const areas = disinfectionAreas;
    const average = areas.reduce((sum, area) => sum + area.hygienScore, 0) / areas.length;
    return Math.round(average);
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: '#10B981', // Verde success
      pending: '#F59E0B', // Amarillo warning
      'in-progress': '#3B82F6', // Azul
      'in_progress': '#3B82F6',
      clean: '#10B981',
      warning: '#F59E0B',
      critical: '#EF4444', // Rojo danger
      high: '#EF4444',
      medium: '#F59E0B',
      low: '#3B82F6',
      optimal: '#10B981',
    };
    return colors[status] || '#111827';
  };

  const overallScore = calculateOverallHygiene();
  const lowEPPItems = personalProtectiveEquipment.filter((item) => item.status !== 'optimal');
  const activeIncidents = incidents.filter((inc) => inc.status !== 'resolved');

  const issueCertificate = () => {
    const id = `cert-${Date.now()}`;
    const cert = {
      id,
      date: new Date(),
      issuer: 'Supervisor Dashboard',
      clinicName: qrConfig.publicQR.clinicName || 'Clínica',
      score: overallScore,
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    };
    certificates.unshift(cert);
    setCreatedCert(cert);
    setCertModal(true);
    // prepare a verification URL encoded as payload
    const payload = btoa(JSON.stringify({ type: 'certificate', id: cert.id }));
    const verifyUrl = `${window.location.origin}/verify?payload=${payload}`;
    setTimeout(() => {
      // replace QR value shown in modal by updating createdCert (add verifyUrl)
      setCreatedCert((c) => ({ ...c, verifyUrl }));
    }, 0);
  };

  const printCertificate = (cert) => {
    try {
      const qrSvg = qrRef.current ? qrRef.current.innerHTML : '';
      const win = window.open('', '_blank', 'width=700,height=900');
      if (!win) return alert('Permite ventanas emergentes para imprimir.');
      const html = `
        <!doctype html>
        <html>
        <head>
          <meta charset="utf-8" />
          <title>Certificado - ${cert.id}</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; padding: 24px; color:#0f172a; background:#f8fafc }
            .card { border-radius:10px; max-width:800px; margin:0 auto; overflow:hidden; box-shadow:0 6px 18px rgba(2,6,23,0.08) }
            .banner { background:linear-gradient(90deg,#ecfccb,#bbf7d0); padding:20px 24px; display:flex; justify-content:space-between; align-items:center }
            .title { font-size:22px; font-weight:800; color:#065f46 }
            .issuer { font-size:13px; color:#065f46; opacity:0.9 }
            .body { background:#fff; padding:24px; display:flex; gap:18px }
            .left { flex:1 }
            .right { width:180px; text-align:center }
            .clinic { font-size:18px; font-weight:700; color:#0f172a }
            .meta { font-size:14px; color:#374151; margin-top:8px }
            .score { font-size:36px; color:#16a34a; font-weight:800 }
            .small { font-size:12px; color:#6b7280 }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="banner">
              <div>
                <div class="title">Certificado de Bioseguridad</div>
                <div class="issuer">Emitido por: ${cert.issuer}</div>
              </div>
              <div style="text-align:right">
                <div class="small">ID: ${cert.id}</div>
                <div class="small">Válido hasta: ${new Date(cert.validUntil).toLocaleDateString('es-MX')}</div>
              </div>
            </div>
            <div class="body">
              <div class="left">
                <div class="clinic">${cert.clinicName}</div>
                <div class="meta">Certificado que acredita el cumplimiento de buenas prácticas de bioseguridad en la operación clínica.</div>
                <div style="margin-top:16px">
                  <div class="meta"><strong>Emitido:</strong> ${new Date(cert.date).toLocaleString('es-MX')}</div>
                  <div class="meta"><strong>Score:</strong> <span class="score">${cert.score}%</span></div>
                </div>
              </div>
              <div class="right">
                <div class="small">Escanea para verificar</div>
                <div style="margin-top:8px">${qrSvg}</div>
              </div>
            </div>
            <div style="padding:12px 24px; text-align:center; background:#fff">
              <div class="small">Verifique la validez en el sistema escaneando el código QR o visitando la interfaz de verificación.</div>
            </div>
          </div>
          <script>
            setTimeout(() => { window.print(); setTimeout(()=>window.close(),500); }, 250);
          </script>
        </body>
        </html>
      `;
      win.document.open();
      win.document.write(html);
      win.document.close();
    } catch (e) {
      console.error('print error', e);
      alert('Error al generar impresión');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Supervisor de Salud</h1>
        <p className="text-gray-600">Control integral de protocolos de bioseguridad clínica</p>
        <div className="mt-4">
          <button
            onClick={issueCertificate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            🏷️ Emitir Certificado Rápido
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Puntuación Higiene</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{overallScore}%</p>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: getStatusColor('optimal') }}
            >
              ✓
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Autoclaves Activos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {sterilizationProtocols.filter((s) => s.status === 'completed').length}/3
              </p>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: '#10B981' }}
            >
              🧬
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Alertas EPP</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{lowEPPItems.length}</p>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: lowEPPItems.length > 0 ? '#F59E0B' : '#10B981' }}
            >
              ⚠️
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Incidentes Activos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{activeIncidents.length}</p>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: activeIncidents.length > 0 ? '#EF4444' : '#10B981' }}
            >
              🚨
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'overview', label: 'Resumen General' },
            { id: 'sterilization', label: 'Esterilización' },
            { id: 'waste', label: 'RPBI' },
            { id: 'epp', label: 'EPP' },
            { id: 'incidents', label: 'Incidentes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Certificate modal */}
          {certModal && createdCert && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-green-700">Certificado de Bioseguridad</h3>
                    <p className="text-sm text-gray-500">Emitido por: {createdCert.issuer}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">ID</div>
                    <div className="font-mono font-semibold">{createdCert.id}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="md:col-span-2">
                    <div className="bg-gradient-to-r from-white to-green-50 rounded p-4 border border-green-100">
                      <h4 className="text-lg font-semibold text-gray-900">{createdCert.clinicName}</h4>
                      <p className="text-sm text-gray-600 mt-1">Certificado de cumplimiento de buenas prácticas de bioseguridad.</p>
                      <div className="mt-3 flex items-center gap-4">
                        <div className="flex items-baseline gap-2">
                          <div className="text-3xl font-bold text-green-600">{createdCert.score}%</div>
                          <div className="text-sm text-gray-500">Puntuación</div>
                        </div>
                        <div className="text-sm text-gray-500">Válido hasta: <span className="font-semibold text-gray-700">{new Date(createdCert.validUntil).toLocaleDateString('es-MX')}</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div ref={qrRef} className="bg-white p-2 rounded shadow">
                      <QRCode value={createdCert.verifyUrl || JSON.stringify({ type: 'certificate', id: createdCert.id })} size={160} />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Escanea para verificar</div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => printCertificate(createdCert)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Imprimir
                  </button>
                  <button
                    onClick={() => setCertModal(false)}
                    className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Áreas</h3>
              <div className="space-y-3">
                {disinfectionAreas.map((area) => (
                  <div
                    key={area.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedArea(area)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{area.name}</h4>
                        <p className="text-sm text-gray-600">
                          Última desinfección:{' '}
                          {Math.round((Date.now() - area.lastDisinfection) / (60 * 1000))} minutos atrás
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-2xl font-bold"
                          style={{ color: getStatusColor(area.status) }}
                        >
                          {area.hygienScore}%
                        </div>
                        <div
                          className="w-12 h-2 rounded-full mt-2"
                          style={{ backgroundColor: getStatusColor(area.status) }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sterilization Tab */}
          {activeTab === 'sterilization' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Protocolos de Esterilización</h3>
              <div className="space-y-3">
                {sterilizationProtocols.map((protocol) => (
                  <div key={protocol.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{protocol.name}</h4>
                        <p className="text-sm text-gray-600">{protocol.location}</p>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                        style={{ backgroundColor: getStatusColor(protocol.status) }}
                      >
                        {protocol.status === 'completed' ? 'Completado' : 'Pendiente'}
                      </div>
                    </div>
                    {protocol.status === 'completed' && (
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">Temperatura</p>
                          <p className="font-semibold text-gray-900">{protocol.temperature}°C</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Presión</p>
                          <p className="font-semibold text-gray-900">{protocol.pressure} psi</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Tiempo</p>
                          <p className="font-semibold text-gray-900">{protocol.cycleTime} min</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Eficiencia</p>
                          <p className="font-semibold text-gray-900">{protocol.efficiency}%</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Waste Tab */}
          {activeTab === 'waste' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Registros de RPBI</h3>
              <div className="space-y-3">
                {bioWasteRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{record.type}</h4>
                        <p className="text-sm text-gray-600">{record.container}</p>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                        style={{ backgroundColor: getStatusColor(record.riskLevel) }}
                      >
                        {record.riskLevel === 'high' ? 'Alto Riesgo' : 'Medio Riesgo'}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Cantidad</p>
                        <p className="font-semibold text-gray-900">{record.quantity} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Recolección</p>
                        <p className="font-semibold text-gray-900">
                          {Math.round((Date.now() - record.collectionTime) / (60 * 1000))} min atrás
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Supervisor</p>
                        <p className="font-semibold text-gray-900">{record.supervisor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EPP Tab */}
          {activeTab === 'epp' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Equipos de Protección Personal
              </h3>
              <div className="space-y-3">
                {personalProtectiveEquipment.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.type}</h4>
                        <p className="text-sm text-gray-600">Talla: {item.size}</p>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                        style={{ backgroundColor: getStatusColor(item.status) }}
                      >
                        {item.status === 'optimal'
                          ? 'Óptimo'
                          : item.status === 'low'
                            ? 'Bajo'
                            : 'Crítico'}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                      <div>
                        <p className="text-gray-600">Stock Actual</p>
                        <p className="font-semibold text-gray-900">{item.currentStock} unidades</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Stock Mínimo</p>
                        <p className="font-semibold text-gray-900">{item.minStock} unidades</p>
                      </div>
                    </div>
                    <div
                      className="w-full h-2 rounded-full"
                      style={{
                        backgroundColor: '#E5E7EB',
                      }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min((item.currentStock / (item.minStock * 2)) * 100, 100)}%`,
                          backgroundColor:
                            item.currentStock >= item.minStock * 1.5
                              ? '#10B981'
                              : item.currentStock >= item.minStock
                                ? '#F59E0B'
                                : '#EF4444',
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Incidents Tab */}
          {activeTab === 'incidents' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Incidentes y No-Conformidades</h3>
              <div className="space-y-3">
                {incidents.map((incident) => (
                  <div key={incident.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{incident.type}</h4>
                        <p className="text-sm text-gray-600">{incident.area}</p>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-white text-xs font-semibold"
                        style={{ backgroundColor: getStatusColor(incident.severity) }}
                      >
                        {incident.severity === 'critical'
                          ? 'Crítico'
                          : incident.severity === 'high'
                            ? 'Alto'
                            : 'Medio'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{incident.description}</p>
                    <div className="text-sm">
                      <p className="text-gray-600">
                        Resolución: <span className="font-semibold text-gray-900">{incident.resolution}</span>
                      </p>
                      <p className="text-gray-600 mt-1">
                        Estado:{' '}
                        <span
                          className="font-semibold"
                          style={{ color: getStatusColor(incident.status) }}
                        >
                          {incident.status === 'resolved' ? 'Resuelto' : 'En Progreso'}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
