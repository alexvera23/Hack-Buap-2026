import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, AlertTriangle } from 'lucide-react';
import { hygienicScoreHistory, clientMetrics } from './data/healthDatasets';

export default function HealthIndicators() {
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

  const chartWidth = 720;
  const chartHeight = 220;
  const leftPadding = 50;
  const bottomPadding = 30;
  const innerWidth = chartWidth - leftPadding - 20;
  const innerHeight = chartHeight - bottomPadding - 20;

  const chartPoints = chartData.map((data, idx) => {
    const x = leftPadding + (innerWidth / (chartData.length - 1)) * idx;
    const y = 20 + innerHeight - ((data.score - minScore) / (maxScore - minScore || 1)) * innerHeight;
    return `${x},${y}`;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-7 h-7 text-green-700" />
            <h1 className="text-4xl font-bold text-gray-900">Indicadores de Salud</h1>
          </div>
          <p className="text-gray-600">Análisis histórico y tendencias de bioseguridad</p>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Puntuación Promedio</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{avgScore}%</p>
              </div>
              <div className="text-green-700 bg-green-100 rounded-full p-2">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Puntuación Máxima</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{maxScore}%</p>
              </div>
              <div className="text-green-700 bg-green-100 rounded-full p-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Mejor registro</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Puntuación Mínima</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{minScore}%</p>
              </div>
              <div className="text-orange-700 bg-orange-100 rounded-full p-2">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Peor registro</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Tendencia</p>
                <p className="text-sm text-gray-500 mt-1">Basado en los últimos registros de higiene</p>
              </div>
              <div className="text-blue-700 bg-blue-100 rounded-full p-2">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 h-24 bg-gray-100 rounded-lg overflow-hidden flex items-end gap-1">
              {chartData.slice(-7).map((d, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-t-lg"
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
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Evolución de Puntuación de Higiene</h2>
              <p className="text-sm text-gray-500">Gráfica estática con el seguimiento de la higiene en el tiempo.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-2 text-sm text-gray-700">
              <TrendingUp className="w-4 h-4" /> Evolución
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
            <div className="overflow-x-auto">
              <svg viewBox="0 0 720 260" className="w-full h-80">
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity="0.08" />
                  </linearGradient>
                </defs>
                <line x1={leftPadding} y1={20} x2={leftPadding} y2={chartHeight - bottomPadding} stroke="#cbd5e1" strokeWidth={1} />
                <line x1={leftPadding} y1={chartHeight - bottomPadding} x2={chartWidth - 20} y2={chartHeight - bottomPadding} stroke="#cbd5e1" strokeWidth={1} />
                <polyline fill="url(#lineGradient)" stroke="#16a34a" strokeWidth={4} points={chartPoints} opacity={0.8} />
                {chartData.map((data, idx) => {
                  const x = leftPadding + (innerWidth / (chartData.length - 1)) * idx;
                  const y = 20 + innerHeight - ((data.score - minScore) / (maxScore - minScore || 1)) * innerHeight;
                  return (
                    <g key={idx}>
                      <circle cx={x} cy={y} r={4} fill="#16a34a" />
                      <text x={x} y={y - 10} textAnchor="middle" fontSize={12} fill="#334155">
                        {data.score}%
                      </text>
                    </g>
                  );
                })}
                {chartData.map((data, idx) => {
                  const x = leftPadding + (innerWidth / (chartData.length - 1)) * idx;
                  return (
                    <text key={idx} x={x} y={250} textAnchor="middle" fontSize={12} fill="#64748b">
                      {data.date}
                    </text>
                  );
                })}
              </svg>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="rounded-lg bg-white p-4 border border-gray-200">
                <p className="font-semibold text-gray-900">Puntuación Promedio</p>
                <p>{avgScore}%</p>
              </div>
              <div className="rounded-lg bg-white p-4 border border-gray-200">
                <p className="font-semibold text-gray-900">Máximo</p>
                <p>{maxScore}%</p>
              </div>
              <div className="rounded-lg bg-white p-4 border border-gray-200">
                <p className="font-semibold text-gray-900">Mínimo</p>
                <p>{minScore}%</p>
              </div>
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
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Insight Positivo
            </h3>
            <p className="text-sm text-blue-800">
              Tu puntuación de higiene ha mejorado en un <strong>10%</strong> en las últimas 2 semanas.
              La confianza de los pacientes también ha aumentado, resultando en más reincidencias.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <h3 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> Recomendación
            </h3>
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
