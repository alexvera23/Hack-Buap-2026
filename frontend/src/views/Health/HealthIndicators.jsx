import React, { useState, useEffect } from 'react';
import { hygienicScoreHistory, clientMetrics } from './data/healthDatasets';

export default function HealthIndicators() {
  const [chartType, setChartType] = useState('line');

  // Simular datos de gráfico
  const generateChartData = () => {
    return hygienicScoreHistory.map((item) => ({
      date: item.date.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }),
      score: item.score,
    }));
  };

  const chartData = generateChartData();
  const maxScore = Math.max(...chartData.map((d) => d.score));
  const minScore = Math.min(...chartData.map((d) => d.score));
  const avgScore = Math.round(chartData.reduce((sum, d) => sum + d.score, 0) / chartData.length);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Indicadores de Salud</h1>
          <p className="text-gray-600">Análisis histórico y tendencias de bioseguridad</p>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Puntuación Promedio</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{avgScore}%</p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: `${avgScore}%`,
                  backgroundColor:
                    avgScore >= 90
                      ? '#10B981'
                      : avgScore >= 75
                        ? '#3B82F6'
                        : '#F59E0B',
                }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Puntuación Máxima</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{maxScore}%</p>
            <p className="text-xs text-gray-500 mt-2">Mejor registro</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Puntuación Mínima</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">{minScore}%</p>
            <p className="text-xs text-gray-500 mt-2">Peor registro</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Tendencia</p>
            <div className="flex items-end gap-1 mt-2 h-12">
              {chartData.slice(-7).map((d, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t rounded-t"
                  style={{
                    height: `${(d.score / 100) * 100}%`,
                    backgroundColor:
                      d.score >= 90
                        ? '#10B981'
                        : d.score >= 75
                          ? '#3B82F6'
                          : '#F59E0B',
                  }}
                  title={`${d.date}: ${d.score}%`}
                ></div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Últimos 7 días</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Evolución de Puntuación de Higiene</h2>
            <div className="flex gap-2">
              {['line', 'bar', 'area'].map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                    chartType === type
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type === 'line' ? '📈' : type === 'bar' ? '📊' : '📉'}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Area */}
          <div className="relative h-80 mb-6 flex items-end gap-1 p-4 border border-gray-200 rounded-lg bg-gray-50">
            {chartData.map((data, idx) => {
              const height = (data.score / 100) * 100;
              const isLine = chartType === 'line' || chartType === 'area';

              return (
                <div key={idx} className="flex-1 flex flex-col items-center relative group">
                  {/* Dot for line chart */}
                  {isLine && (
                    <div
                      className="absolute w-2 h-2 bg-green-600 rounded-full"
                      style={{
                        bottom: `${height}%`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    ></div>
                  )}

                  {/* Bar or Area */}
                  <div
                    className={`w-full ${chartType === 'line' ? '' : 'flex-1'} flex flex-col justify-end items-center group`}
                    style={{
                      height: chartType === 'line' ? '100%' : 'auto',
                    }}
                  >
                    {chartType !== 'line' && (
                      <div
                        className={`w-full rounded-t transition-all hover:opacity-80 ${
                          chartType === 'area' ? 'opacity-70' : ''
                        }`}
                        style={{
                          height: `${height}%`,
                          backgroundColor:
                            data.score >= 90
                              ? '#10B981'
                              : data.score >= 75
                                ? '#3B82F6'
                                : '#F59E0B',
                        }}
                      ></div>
                    )}
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-0 transform translate-y-full mt-2 text-xs text-gray-600 font-medium">
                    {data.date}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                    {data.score}%
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-sm text-gray-600">Excelente (≥90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm text-gray-600">Bueno (75-89%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-600 rounded"></div>
              <span className="text-sm text-gray-600">Aceptable (&lt;75%)</span>
            </div>
          </div>
        </div>

        {/* Client Impact Metrics */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Impacto en Pacientes/Clientes</h2>
          <div className="space-y-6">
            {clientMetrics.map((metric) => (
              <div key={metric.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{metric.week}</h3>
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">
                      <span className="font-bold text-gray-900">{metric.totalVisits}</span> visitas
                    </span>
                    <span className="text-gray-600">
                      <span className="font-bold text-gray-900">{metric.complaints}</span> quejas
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Confianza de Pacientes</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-400 to-green-600"
                          style={{ width: `${metric.confidenceScore}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-900">{metric.confidenceScore}%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Reincidencia</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                          style={{ width: `${metric.repeatVisits}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-900">{metric.repeatVisits}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3">📌 Insight Positivo</h3>
            <p className="text-sm text-blue-800">
              Tu puntuación de higiene ha mejorado en un <strong>10%</strong> en las últimas 2 semanas.
              La confianza de los pacientes también ha aumentado, resultando en más reincidencias.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h3 className="font-bold text-yellow-900 mb-3">⚠️ Recomendación</h3>
            <p className="text-sm text-yellow-800">
              Se recomienda mantener el ritmo de desinfección y considerar capacitación adicional al
              personal para alcanzar la medalla "Espacio 100% Seguro".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
