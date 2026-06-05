import React, { useState } from 'react';
import {
  sterilizationProtocols,
  bioWasteRecords,
  personalProtectiveEquipment,
  disinfectionAreas,
  incidents,
} from './data/healthDatasets';

export default function SupervisorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedArea, setSelectedArea] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Supervisor de Salud</h1>
        <p className="text-gray-600">Control integral de protocolos de bioseguridad clínica</p>
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
