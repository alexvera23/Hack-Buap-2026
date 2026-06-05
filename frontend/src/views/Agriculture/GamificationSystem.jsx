import React, { useState } from 'react';
import { Award, Star, Zap, Trophy } from 'lucide-react';

const achievements = [
  {
    id: 'cosecha-segura-platino',
    name: 'Cosecha Segura - Platino',
    description: 'Trazabilidad total e inocuidad impecable en campo (≥90% cumplimiento)',
    icon: 'trophy',
    badgeColor: 'bg-blue-100 text-blue-700',
    points: 200,
    unlocked: true,
    progress: 95,
    total: 90,
  },
  {
    id: 'cosecha-segura-oro',
    name: 'Cosecha Segura - Oro',
    description: 'Excelente prevención sanitaria y cumplimiento fito-nutricional (75-89%)',
    icon: 'star',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    points: 150,
    unlocked: true,
    progress: 80,
    total: 75,
  },
  {
    id: 'monitoreo-maestro',
    name: 'Maestro del Monitoreo',
    description: 'Completar 20 inspecciones de trampas fitosanitarias sin incidencias',
    icon: 'zap',
    badgeColor: 'bg-purple-100 text-purple-700',
    points: 175,
    unlocked: false,
    progress: 12,
    total: 20,
  },
  {
    id: 'cero-alertas',
    name: 'Productor Sin Alertas',
    description: 'Mantener 30 días consecutivos sin alertas fitoclimáticas críticas',
    icon: 'award',
    badgeColor: 'bg-green-100 text-green-700',
    points: 225,
    unlocked: false,
    progress: 15,
    total: 30,
  },
  {
    id: 'exportacion-certificada',
    name: 'Exportación Certificada',
    description: 'Lograr certificación SENASICA para 5 lotes consecutivos',
    icon: 'star',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    points: 250,
    unlocked: true,
    progress: 5,
    total: 5,
  },
];

const leaderboard = [
  { rank: 1, farm: 'Rancho El Porvenir', points: 950, badge: '⭐ Platino', crops: 'Tomate, Chile' },
  { rank: 2, farm: 'Huerta Los Olivos', points: 820, badge: '🥇 Oro', crops: 'Aguacate, Mango' },
  { rank: 3, farm: 'Finca Agrícola Central', points: 745, badge: '🥈 Plata', crops: 'Papaya, Piña' },
  { rank: 4, farm: 'Huerta del Valle', points: 620, badge: '🥉 Bronce', crops: 'Limón, Tomate' },
];

export default function GamificationSystem() {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalPoints = achievements.reduce((sum, a) => sum + (a.unlocked ? a.points : 0), 0);

  const getIconComponent = (iconType) => {
    switch (iconType) {
      case 'trophy':
        return <Trophy className="w-6 h-6" />;
      case 'star':
        return <Star className="w-6 h-6" />;
      case 'zap':
        return <Zap className="w-6 h-6" />;
      case 'award':
        return <Award className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Sistema de Gamificación</h1>
              <p className="text-gray-600">Medallas, puntos y mejora de reputación de tu producción agrícola</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Puntos Totales</p>
              <p className="text-3xl font-bold text-emerald-700">{totalPoints}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-emerald-500">
            <p className="text-sm text-gray-600 mb-2">Medallas Desbloqueadas</p>
            <p className="text-4xl font-bold text-emerald-700">{unlockedCount}</p>
            <p className="text-xs text-gray-500 mt-2">de {achievements.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600 mb-2">Clasificación Regional</p>
            <p className="text-4xl font-bold text-blue-700">#1</p>
            <p className="text-xs text-gray-500 mt-2">Michoacán</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <p className="text-sm text-gray-600 mb-2">Estado de Reputación</p>
            <p className="text-2xl font-bold text-purple-700">⭐ Excelente</p>
            <p className="text-xs text-gray-500 mt-2">Productor confiable</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Achievements Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Logros y Medallas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  onClick={() => setSelectedAchievement(achievement)}
                  className={`rounded-lg p-6 cursor-pointer transition-all border-2 ${
                    achievement.unlocked
                      ? 'bg-white border-emerald-300 shadow-md hover:shadow-lg'
                      : 'bg-gray-50 border-gray-200 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-lg ${achievement.badgeColor}`}>
                      {getIconComponent(achievement.icon)}
                    </div>
                    {achievement.unlocked && <span className="text-xl">✓</span>}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{achievement.name}</h3>
                  <p className="text-xs text-gray-600 mb-3">{achievement.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          achievement.unlocked ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min((achievement.progress / achievement.total) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {achievement.progress}/{achievement.total}
                    </span>
                    <span className="text-sm font-bold text-emerald-700">+{achievement.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-600" /> Tabla de Posiciones
            </h2>

            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    entry.rank === 1
                      ? 'bg-amber-50 border-amber-300 shadow-md'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                          entry.rank === 1
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-300 text-gray-700'
                        }`}
                      >
                        {entry.rank}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">{entry.farm}</p>
                        <p className="text-xs text-gray-600">{entry.crops}</p>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-700">{entry.points} pts</span>
                  </div>
                  <p className="text-xs text-gray-600">{entry.badge}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-900">
                <strong>Tu Posición:</strong> Gracias por mantener los más altos estándares de inocuidad y trazabilidad en tu región.
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Detail Modal */}
        {selectedAchievement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
              <div className={`inline-block p-4 rounded-lg ${selectedAchievement.badgeColor} mb-4`}>
                {getIconComponent(selectedAchievement.icon)}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedAchievement.name}</h3>
              <p className="text-gray-600 mb-4">{selectedAchievement.description}</p>

              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Progreso</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all"
                      style={{ width: `${Math.min((selectedAchievement.progress / selectedAchievement.total) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {selectedAchievement.progress} de {selectedAchievement.total}
                  </p>
                </div>

                <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                  <span className="font-semibold text-gray-900">Puntos de Reputación</span>
                  <span className="text-xl font-bold text-emerald-700">+{selectedAchievement.points}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedAchievement(null)}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
