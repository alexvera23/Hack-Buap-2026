// Ejemplos de análisis y consultas sobre los datasets de Salud Humana

import {
  sterilizationProtocols,
  bioWasteRecords,
  personalProtectiveEquipment,
  disinfectionAreas,
  incidents,
  hygienicScoreHistory,
  clientMetrics,
  achievements,
} from './healthDatasets';

// ============================================================================
// 1. ANÁLISIS DE ESTERILIZACIÓN
// ============================================================================

export const sterilizationAnalytics = {
  // Eficiencia promedio de autoclaves completados
  getAverageEfficiency: () => {
    const completed = sterilizationProtocols.filter((p) => p.status === 'completed');
    const avgEfficiency = completed.reduce((sum, p) => sum + p.efficiency, 0) / completed.length;
    return Math.round(avgEfficiency);
  },

  // Obtener el autoclave con mejor eficiencia
  getBestPerformingAutoclave: () => {
    return sterilizationProtocols.reduce((best, protocol) =>
      protocol.efficiency > (best.efficiency || 0) ? protocol : best
    );
  },

  // Tiempo promedio de ciclo
  getAverageCycleTime: () => {
    const completed = sterilizationProtocols.filter((p) => p.status === 'completed');
    const avgTime = completed.reduce((sum, p) => sum + p.cycleTime, 0) / completed.length;
    return Math.round(avgTime);
  },

  // Autoclaves pendientes
  getPendingAutoclaves: () => {
    return sterilizationProtocols.filter((p) => p.status === 'pending');
  },

  // Agrupar por ubicación
  getByLocation: () => {
    return sterilizationProtocols.reduce((acc, protocol) => {
      acc[protocol.location] = acc[protocol.location] || [];
      acc[protocol.location].push(protocol);
      return acc;
    }, {});
  },

  // Tiempo promedio desde última esterilización (en horas)
  getAverageTimeSinceSterilization: () => {
    const now = Date.now();
    const avgTime = sterilizationProtocols.reduce((sum, p) => {
      const hoursSince = (now - p.lastSterilization) / (1000 * 60 * 60);
      return sum + hoursSince;
    }, 0) / sterilizationProtocols.length;
    return Math.round(avgTime * 10) / 10;
  },
};

// ============================================================================
// 2. ANÁLISIS DE RESIDUOS PELIGROSOS BIOLÓGICO-INFECCIOSOS (RPBI)
// ============================================================================

export const bioWasteAnalytics = {
  // Volumen total de residuos
  getTotalWasteVolume: () => {
    return bioWasteRecords.reduce((sum, record) => sum + record.quantity, 0);
  },

  // Volumen por tipo de residuo
  getWasteByType: () => {
    return bioWasteRecords.reduce((acc, record) => {
      acc[record.type] = (acc[record.type] || 0) + record.quantity;
      return acc;
    }, {});
  },

  // Residuos pendientes de disposición
  getPendingDisposal: () => {
    return bioWasteRecords.filter((r) => r.disposalStatus !== 'completed');
  },

  // Promedio de días en espera de disposición
  getAverageDaysToDisposal: () => {
    const pending = bioWasteRecords.filter((r) => r.disposalStatus === 'pending');
    if (pending.length === 0) return 0;

    const avgDays = pending.reduce((sum, r) => {
      const days = (r.disposalSchedule - r.collectionTime) / (1000 * 60 * 60 * 24);
      return sum + days;
    }, 0) / pending.length;

    return Math.round(avgDays * 10) / 10;
  },

  // Residuos por nivel de riesgo
  getByRiskLevel: () => {
    return bioWasteRecords.reduce((acc, record) => {
      acc[record.riskLevel] = acc[record.riskLevel] || [];
      acc[record.riskLevel].push(record);
      return acc;
    }, {});
  },

  // Supervisor con más registros
  getTopSupervisor: () => {
    const supervisors = bioWasteRecords.reduce((acc, record) => {
      acc[record.supervisor] = (acc[record.supervisor] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(supervisors).sort(([, a], [, b]) => b - a)[0];
  },

  // Contenedor con más volumen
  getFullestContainer: () => {
    const containers = bioWasteRecords.reduce((acc, record) => {
      acc[record.container] = (acc[record.container] || 0) + record.quantity;
      return acc;
    }, {});

    const fullest = Object.entries(containers).sort(([, a], [, b]) => b - a)[0];
    return { container: fullest[0], volume: fullest[1] };
  },
};

// ============================================================================
// 3. ANÁLISIS DE EQUIPOS DE PROTECCIÓN PERSONAL (EPP)
// ============================================================================

export const eppAnalytics = {
  // Stock total de EPP
  getTotalStock: () => {
    return personalProtectiveEquipment.reduce((sum, item) => sum + item.currentStock, 0);
  },

  // EPP en estado crítico
  getCriticalItems: () => {
    return personalProtectiveEquipment.filter((item) => item.status === 'critical');
  },

  // EPP en estado bajo
  getLowItems: () => {
    return personalProtectiveEquipment.filter((item) => item.status === 'low');
  },

  // Ítems óptimos
  getOptimalItems: () => {
    return personalProtectiveEquipment.filter((item) => item.status === 'optimal');
  },

  // Porcentaje de cobertura vs mínimo requerido
  getCoveragePercentage: () => {
    const totalCurrent = personalProtectiveEquipment.reduce((sum, i) => sum + i.currentStock, 0);
    const totalMinimum = personalProtectiveEquipment.reduce((sum, i) => sum + i.minStock, 0);

    return Math.round((totalCurrent / totalMinimum) * 100);
  },

  // Ítems próximos a expirar (menos de 90 días)
  getExpiringSoon: () => {
    const ninetyDaysFromNow = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    return personalProtectiveEquipment.filter((item) => item.expiryDate < ninetyDaysFromNow);
  },

  // Tiempo promedio desde último reabastecimiento
  getAverageDaysSinceRestock: () => {
    const avgDays = personalProtectiveEquipment.reduce((sum, item) => {
      const days = (Date.now() - item.lastRestock) / (1000 * 60 * 60 * 24);
      return sum + days;
    }, 0) / personalProtectiveEquipment.length;

    return Math.round(avgDays);
  },

  // Estimar próximos 30 días si uso es consistente
  getProjectedStock30Days: () => {
    return personalProtectiveEquipment.map((item) => {
      const dailyUsage = (item.currentStock - item.minStock) / 30; // Estimación simple
      const projected30Days = item.currentStock - dailyUsage * 30;

      return {
        type: item.type,
        current: item.currentStock,
        projected: Math.round(projected30Days),
        willBelow: projected30Days < item.minStock,
      };
    });
  },
};

// ============================================================================
// 4. ANÁLISIS DE ÁREAS DE DESINFECCIÓN
// ============================================================================

export const disinfectionAnalytics = {
  // Puntuación promedio de higiene
  getAverageHygiene: () => {
    const avg = disinfectionAreas.reduce((sum, area) => sum + area.hygienScore, 0) /
      disinfectionAreas.length;
    return Math.round(avg);
  },

  // Área con mejor puntaje
  getCleanestArea: () => {
    return disinfectionAreas.reduce((best, area) =>
      area.hygienScore > best.hygienScore ? area : best
    );
  },

  // Área con peor puntaje
  getDirtestArea: () => {
    return disinfectionAreas.reduce((worst, area) =>
      area.hygienScore < worst.hygienScore ? area : worst
    );
  },

  // Áreas con estado de advertencia
  getWarningAreas: () => {
    return disinfectionAreas.filter((area) => area.status === 'warning');
  },

  // Áreas limpias
  getCleanAreas: () => {
    return disinfectionAreas.filter((area) => area.status === 'clean');
  },

  // Tiempo promedio desde última desinfección (en minutos)
  getAverageTimeSinceDisinfection: () => {
    const now = Date.now();
    const avgMinutes = disinfectionAreas.reduce((sum, area) => {
      const minutes = (now - area.lastDisinfection) / (1000 * 60);
      return sum + minutes;
    }, 0) / disinfectionAreas.length;

    return Math.round(avgMinutes);
  },

  // Área que necesita desinfección más urgentemente
  getMostUrgentArea: () => {
    const now = Date.now();
    let mostUrgent = disinfectionAreas[0];
    let maxAge = 0;

    disinfectionAreas.forEach((area) => {
      const ageInMinutes = (now - area.lastDisinfection) / (1000 * 60);
      if (ageInMinutes > maxAge) {
        maxAge = ageInMinutes;
        mostUrgent = area;
      }
    });

    return mostUrgent;
  },

  // Agenetes desinfectantes usados
  getAgentsUsed: () => {
    return disinfectionAreas.reduce((acc, area) => {
      if (!acc.includes(area.agent)) {
        acc.push(area.agent);
      }
      return acc;
    }, []);
  },

  // Supervisores por área
  getSupervisorsByArea: () => {
    return disinfectionAreas.reduce((acc, area) => {
      acc[area.name] = area.supervisor;
      return acc;
    }, {});
  },
};

// ============================================================================
// 5. ANÁLISIS DE INCIDENTES
// ============================================================================

export const incidentAnalytics = {
  // Total de incidentes
  getTotalIncidents: () => {
    return incidents.length;
  },

  // Incidentes activos
  getActiveIncidents: () => {
    return incidents.filter((i) => i.status !== 'resolved');
  },

  // Incidentes resueltos
  getResolvedIncidents: () => {
    return incidents.filter((i) => i.status === 'resolved');
  },

  // Tasa de resolución
  getResolutionRate: () => {
    const resolved = incidents.filter((i) => i.status === 'resolved').length;
    return Math.round((resolved / incidents.length) * 100);
  },

  // Incidentes por severidad
  getBySeverity: () => {
    return incidents.reduce((acc, incident) => {
      acc[incident.severity] = acc[incident.severity] || [];
      acc[incident.severity].push(incident);
      return acc;
    }, {});
  },

  // Incidentes por tipo
  getByType: () => {
    return incidents.reduce((acc, incident) => {
      acc[incident.type] = acc[incident.type] || [];
      acc[incident.type].push(incident);
      return acc;
    }, {});
  },

  // Incidentes críticos
  getCriticalIncidents: () => {
    return incidents.filter((i) => i.severity === 'critical');
  },

  // Área con más incidentes
  getAreaWithMostIncidents: () => {
    const areaCount = incidents.reduce((acc, incident) => {
      acc[incident.area] = (acc[incident.area] || 0) + 1;
      return acc;
    }, {});

    const mostIncidents = Object.entries(areaCount).sort(([, a], [, b]) => b - a)[0];
    return { area: mostIncidents[0], count: mostIncidents[1] };
  },
};

// ============================================================================
// 6. ANÁLISIS DE PUNTUACIÓN HISTÓRICA DE HIGIENE
// ============================================================================

export const historyAnalytics = {
  // Puntuación promedio histórica
  getAverageScore: () => {
    const avg = hygienicScoreHistory.reduce((sum, h) => sum + h.score, 0) /
      hygienicScoreHistory.length;
    return Math.round(avg);
  },

  // Puntuación máxima
  getMaxScore: () => {
    return Math.max(...hygienicScoreHistory.map((h) => h.score));
  },

  // Puntuación mínima
  getMinScore: () => {
    return Math.min(...hygienicScoreHistory.map((h) => h.score));
  },

  // Tendencia (mejorando/empeorando)
  getTrend: () => {
    const recent = hygienicScoreHistory.slice(-7);
    const oldest = recent[0].score;
    const newest = recent[recent.length - 1].score;

    const trend = newest - oldest;
    return {
      direction: trend > 0 ? 'improving' : trend < 0 ? 'declining' : 'stable',
      change: Math.abs(trend),
    };
  },

  // Días con puntuación excelente (>=90%)
  getDaysWithExcellentScore: () => {
    return hygienicScoreHistory.filter((h) => h.score >= 90).length;
  },

  // Velocidad de mejora (puntos por día)
  getImprovementRate: () => {
    if (hygienicScoreHistory.length < 2) return 0;

    const first = hygienicScoreHistory[0].score;
    const last = hygienicScoreHistory[hygienicScoreHistory.length - 1].score;
    const days = hygienicScoreHistory.length - 1;

    return Math.round((last - first) / days * 100) / 100;
  },
};

// ============================================================================
// 7. ANÁLISIS DE MÉTRICAS DE CLIENTES
// ============================================================================

export const clientAnalytics = {
  // Total de visitas
  getTotalVisits: () => {
    return clientMetrics.reduce((sum, m) => sum + m.totalVisits, 0);
  },

  // Confianza promedio
  getAverageConfidence: () => {
    const avg = clientMetrics.reduce((sum, m) => sum + m.confidenceScore, 0) /
      clientMetrics.length;
    return Math.round(avg);
  },

  // Reincidencia promedio
  getAverageRepeatVisits: () => {
    const avg = clientMetrics.reduce((sum, m) => sum + m.repeatVisits, 0) /
      clientMetrics.length;
    return Math.round(avg);
  },

  // Total de quejas
  getTotalComplaints: () => {
    return clientMetrics.reduce((sum, m) => sum + m.complaints, 0);
  },

  // Semana con mejor confianza
  getWeekWithBestConfidence: () => {
    return clientMetrics.reduce((best, metric) =>
      metric.confidenceScore > best.confidenceScore ? metric : best
    );
  },

  // Tasa de quejas por visita
  getComplaintRate: () => {
    const totalVisits = this.getTotalVisits();
    const totalComplaints = this.getTotalComplaints();
    return Math.round((totalComplaints / totalVisits) * 10000) / 100; // en %
  },
};

// ============================================================================
// 8. ANÁLISIS DE GAMIFICACIÓN
// ============================================================================

export const gamificationAnalytics = {
  // Total de puntos disponibles
  getTotalAvailablePoints: () => {
    return achievements.reduce((sum, a) => sum + a.points, 0);
  },

  // Puntos obtenidos
  getEarnedPoints: () => {
    return achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  },

  // Medallas desbloqueadas
  getUnlockedBadges: () => {
    return achievements.filter((a) => a.unlocked);
  },

  // Medallas bloqueadas
  getLockedBadges: () => {
    return achievements.filter((a) => !a.unlocked);
  },

  // Porcentaje de progreso general
  getOverallProgress: () => {
    const earned = this.getEarnedPoints();
    const total = this.getTotalAvailablePoints();
    return Math.round((earned / total) * 100);
  },

  // Próxima medalla a desbloquear
  getNextAchievement: () => {
    const locked = achievements.filter((a) => !a.unlocked).sort((a, b) => {
      const progressA = a.progress || 0;
      const progressB = b.progress || 0;
      return progressB - progressA;
    });

    return locked[0] || null;
  },
};

// ============================================================================
// 9. REPORTES CONSOLIDADOS
// ============================================================================

export const generateConsolidatedReport = () => {
  return {
    timestamp: new Date(),
    overview: {
      overallHygiene: disinfectionAnalytics.getAverageHygiene(),
      activeIncidents: incidentAnalytics.getActiveIncidents().length,
      criticalEPPItems: eppAnalytics.getCriticalItems().length,
      totalWasteVolume: bioWasteAnalytics.getTotalWasteVolume(),
    },
    sterilization: {
      averageEfficiency: sterilizationAnalytics.getAverageEfficiency(),
      pendingAutoclaves: sterilizationAnalytics.getPendingAutoclaves().length,
    },
    waste: {
      totalVolume: bioWasteAnalytics.getTotalWasteVolume(),
      pendingDisposal: bioWasteAnalytics.getPendingDisposal().length,
    },
    epp: {
      totalStock: eppAnalytics.getTotalStock(),
      coveragePercentage: eppAnalytics.getCoveragePercentage(),
      expiringSoon: eppAnalytics.getExpiringSoon().length,
    },
    disinfection: {
      averageHygiene: disinfectionAnalytics.getAverageHygiene(),
      warningAreas: disinfectionAnalytics.getWarningAreas().length,
    },
    incidents: {
      total: incidentAnalytics.getTotalIncidents(),
      active: incidentAnalytics.getActiveIncidents().length,
      resolutionRate: incidentAnalytics.getResolutionRate(),
    },
    clients: {
      totalVisits: clientAnalytics.getTotalVisits(),
      averageConfidence: clientAnalytics.getAverageConfidence(),
      totalComplaints: clientAnalytics.getTotalComplaints(),
    },
    gamification: {
      earnedPoints: gamificationAnalytics.getEarnedPoints(),
      unlockedBadges: gamificationAnalytics.getUnlockedBadges().length,
      overallProgress: gamificationAnalytics.getOverallProgress(),
    },
  };
};

export default {
  sterilizationAnalytics,
  bioWasteAnalytics,
  eppAnalytics,
  disinfectionAnalytics,
  incidentAnalytics,
  historyAnalytics,
  clientAnalytics,
  gamificationAnalytics,
  generateConsolidatedReport,
};
