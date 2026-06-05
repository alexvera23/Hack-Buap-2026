import React, { useState } from 'react';
import { achievements, hygienicScoreHistory, clientMetrics } from './data/healthDatasets';

export default function GamificationSystem() {
  const [selectedTab, setSelectedTab] = useState('badges');

  const calculateTotalPoints = () => {
    return achievements.reduce((total, achievement) => {
      return total + (achievement.unlocked ? achievement.points : 0);
    }, 0);
  };

  const getBadgeGradient = (color) => {
    const gradients = {
      gold: 'from-yellow-400 to-yellow-600',
      blue: 'from-blue-400 to-blue-600',
      green: 'from-green-400 to-green-600',
      silver: 'from-gray-400 to-gray-600',
    };
    return gradients[color] || 'from-gray-400 to-gray-600';
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalPoints = calculateTotalPoints();
  const reputationScore = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🏆 Sistema de Gamificación</h1>
        <p className="text-gray-600">Obtén medallas y mejora la reputación de tu establecimiento</p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Puntos Totales</p>
              <p className="text-4xl font-bold text-purple-600 mt-2">{totalPoints}</p>
            </div>
            <div className="text-5xl">⭐</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Medallas Desbloqueadas</p>
              <p className="text-4xl font-bold text-indigo-600 mt-2">
                {unlockedCount}/{achievements.length}
              </p>
            </div>
            <div className="text-5xl">🏅</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Reputación</p>
              <p className="text-4xl font-bold text-green-600 mt-2">{reputationScore}%</p>
            </div>
            <div className="text-5xl">📈</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg mb-6">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'badges', label: 'Medallas', icon: '🏅' },
            { id: 'progress', label: 'Progreso', icon: '📊' },
            { id: 'rewards', label: 'Beneficios', icon: '🎁' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 px-6 py-4 font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                selectedTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          {/* Badges Tab */}
          {selectedTab === 'badges' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Medallas Disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`rounded-lg p-6 border-2 transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br ' +
                          getBadgeGradient(achievement.badgeColor) +
                          ' border-yellow-400 shadow-lg'
                        : 'bg-gray-50 border-gray-300 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{achievement.icon}</div>
                      {achievement.unlocked && (
                        <div className="text-2xl">✨</div>
                      )}
                    </div>

                    <h4
                      className={`text-xl font-bold mb-2 ${
                        achievement.unlocked ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {achievement.name}
                    </h4>

                    <p
                      className={`text-sm mb-4 ${
                        achievement.unlocked ? 'text-white/90' : 'text-gray-600'
                      }`}
                    >
                      {achievement.description}
                    </p>

                    <div
                      className={`flex items-center justify-between pt-4 border-t ${
                        achievement.unlocked ? 'border-white/30' : 'border-gray-300'
                      }`}
                    >
                      <div
                        className={`font-bold ${
                          achievement.unlocked ? 'text-white' : 'text-gray-600'
                        }`}
                      >
                        +{achievement.points} pts
                      </div>

                      {achievement.unlocked ? (
                        <div className="text-white font-semibold flex items-center gap-1">
                          ✓ Desbloqueado
                          <span className="text-xs">
                            ({achievement.unlockedDate?.toLocaleDateString('es-MX')})
                          </span>
                        </div>
                      ) : (
                        <div className="text-gray-600 font-semibold">
                          {achievement.progress}/{achievement.progress === undefined ? '?' : 7}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {selectedTab === 'progress' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Progreso de Medallas</h3>
              <div className="space-y-6">
                {achievements.map((achievement) => {
                  if (achievement.unlocked) return null;

                  const progress = achievement.progress || 0;
                  const total = achievement.progress === 5 ? 7 : 30;
                  const percentage = (progress / total) * 100;

                  return (
                    <div key={achievement.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{achievement.icon}</span>
                          <div>
                            <h4 className="font-bold text-gray-900">{achievement.name}</h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            {progress}/{total}
                          </p>
                          <p className="text-sm text-gray-600">{Math.round(percentage)}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {selectedTab === 'rewards' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Beneficios por Reputación</h3>
              <div className="space-y-4">
                {[
                  {
                    level: 'Bronce',
                    threshold: '0-25%',
                    benefits: [
                      'Certificado de participación',
                      'Acceso a reportes básicos',
                    ],
                    icon: '🥉',
                  },
                  {
                    level: 'Plata',
                    threshold: '26-50%',
                    benefits: [
                      'Todo lo de Bronce',
                      'Distintivo de Higiene Básica',
                      'Acceso a webinars de capacitación',
                    ],
                    icon: '🥈',
                  },
                  {
                    level: 'Oro',
                    threshold: '51-75%',
                    benefits: [
                      'Todo lo de Plata',
                      'Distintivo "Espacio Seguro"',
                      'Prioridad en auditorías regulatorias',
                      'Descuento en auditorías externas',
                    ],
                    icon: '🥇',
                  },
                  {
                    level: 'Platino',
                    threshold: '76-100%',
                    benefits: [
                      'Todo lo de Oro',
                      'Medalla "Espacio 100% Seguro"',
                      'Certificación especial reconocida',
                      'Difusión en plataforma de clínicas seguras',
                      'Exención de inspecciones rutinarias',
                    ],
                    icon: '💎',
                  },
                ].map((reward, idx) => {
                  const currentLevel =
                    reputationScore >= 76
                      ? 'Platino'
                      : reputationScore >= 51
                        ? 'Oro'
                        : reputationScore >= 26
                          ? 'Plata'
                          : 'Bronce';

                  const isActive = reward.level === currentLevel;

                  return (
                    <div
                      key={idx}
                      className={`border rounded-lg p-6 transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-400 shadow-lg'
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{reward.icon}</span>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">
                              Nivel {reward.level}
                            </h4>
                            <p className="text-sm text-gray-600">{reward.threshold}</p>
                          </div>
                        </div>
                        {isActive && (
                          <div className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold">
                            Actual
                          </div>
                        )}
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-gray-900 mb-2">Beneficios:</p>
                        <ul className="space-y-1">
                          {reward.benefits.map((benefit, bidx) => (
                            <li key={bidx} className="flex items-start gap-2 text-gray-700">
                              <span className="text-green-600 font-bold mt-0.5">✓</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reputation Impact */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">💰 Impacto en tu Negocio</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm opacity-90">Incremento de Pacientes</p>
            <p className="text-3xl font-bold">+{Math.round((reputationScore / 100) * 35)}%</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Reducción de Multas</p>
            <p className="text-3xl font-bold">-{Math.round((reputationScore / 100) * 60)}%</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Confianza de Clientes</p>
            <p className="text-3xl font-bold">+{reputationScore}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
