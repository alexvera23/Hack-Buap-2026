// EJEMPLOS DE USO - Módulo de Salud Humana

import {
  sterilizationAnalytics,
  bioWasteAnalytics,
  eppAnalytics,
  disinfectionAnalytics,
  incidentAnalytics,
  historyAnalytics,
  clientAnalytics,
  gamificationAnalytics,
  generateConsolidatedReport,
} from './analyticsHelpers';

// ============================================================================
// EJEMPLO 1: GENERAR REPORTE DIARIO PARA EL SUPERVISOR
// ============================================================================

export const generateDailySupervisorReport = () => {
  console.log('=== REPORTE DIARIO DEL SUPERVISOR ===');
  console.log(new Date().toLocaleDateString('es-MX'));
  console.log('');

  // Estado General
  console.log('📊 ESTADO GENERAL');
  console.log(`- Puntuación promedio de higiene: ${disinfectionAnalytics.getAverageHygiene()}%`);
  console.log(`- Incidentes activos: ${incidentAnalytics.getActiveIncidents().length}`);
  console.log(
    `- Ítems de EPP en estado crítico: ${eppAnalytics.getCriticalItems().length}`
  );
  console.log(
    `- Residuos pendientes de disposición: ${bioWasteAnalytics.getPendingDisposal().length}`
  );
  console.log('');

  // Alertas prioritarias
  console.log('🚨 ALERTAS PRIORITARIAS');
  const criticalItems = eppAnalytics.getCriticalItems();
  if (criticalItems.length > 0) {
    console.log('EPP Crítico:');
    criticalItems.forEach((item) => {
      console.log(
        `  - ${item.type} (Talla ${item.size}): ${item.currentStock}/${item.minStock} unidades`
      );
    });
  }

  const warningAreas = disinfectionAnalytics.getWarningAreas();
  if (warningAreas.length > 0) {
    console.log('Áreas con advertencia:');
    warningAreas.forEach((area) => {
      console.log(`  - ${area.name}: ${area.hygienScore}%`);
    });
  }

  console.log('');

  // Tareas Recomendadas
  console.log('✅ TAREAS RECOMENDADAS');
  if (bioWasteAnalytics.getPendingDisposal().length > 0) {
    console.log(
      `- Programar disposición de RPBI (${bioWasteAnalytics.getTotalWasteVolume().toFixed(1)} kg pendientes)`
    );
  }
  if (eppAnalytics.getCriticalItems().length > 0) {
    console.log('- Realizar reorden urgente de EPP');
  }
  if (incidentAnalytics.getActiveIncidents().length > 0) {
    console.log('- Atender incidentes activos');
  }

  console.log('');
};

// ============================================================================
// EJEMPLO 2: MONITOREAR STOCK DE EPP
// ============================================================================

export const monitorEPPInventory = () => {
  console.log('=== MONITOREO DE INVENTARIO DE EPP ===');
  console.log('');

  console.log('📦 RESUMEN');
  console.log(`- Stock Total: ${eppAnalytics.getTotalStock()} unidades`);
  console.log(`- Cobertura vs Mínimo: ${eppAnalytics.getCoveragePercentage()}%`);
  console.log(`- Ítems en estado crítico: ${eppAnalytics.getCriticalItems().length}`);
  console.log(`- Ítems en estado bajo: ${eppAnalytics.getLowItems().length}`);
  console.log(`- Ítems óptimos: ${eppAnalytics.getOptimalItems().length}`);
  console.log('');

  // Proyecciones a 30 días
  console.log('📈 PROYECCIONES (30 DÍAS)');
  const projected = eppAnalytics.getProjectedStock30Days();
  projected.forEach((item) => {
    const status = item.willBelow ? '⚠️' : '✓';
    console.log(
      `${status} ${item.type}: ${item.current} → ${item.projected} unidades`
    );
  });
  console.log('');

  // Ítems próximos a expirar
  const expiring = eppAnalytics.getExpiringSoon();
  if (expiring.length > 0) {
    console.log('⏰ PRÓXIMOS A EXPIRAR (90 días):');
    expiring.forEach((item) => {
      console.log(
        `- ${item.type}: Expira ${item.expiryDate.toLocaleDateString('es-MX')}`
      );
    });
  }
  console.log('');
};

// ============================================================================
// EJEMPLO 3: ANALIZAR CUMPLIMIENTO DE PROTOCOLOS
// ============================================================================

export const analyzeComplianceStatus = () => {
  console.log('=== ANÁLISIS DE CUMPLIMIENTO ===');
  console.log('');

  // Desinfección
  console.log('🧼 DESINFECCIÓN');
  console.log(`- Puntuación promedio: ${disinfectionAnalytics.getAverageHygiene()}%`);
  console.log(
    `- Tiempo promedio desde última desinfección: ${disinfectionAnalytics.getAverageTimeSinceDisinfection()} minutos`
  );
  const cleanest = disinfectionAnalytics.getCleanestArea();
  console.log(`- Área más limpia: ${cleanest.name} (${cleanest.hygienScore}%)`);
  const dirtiest = disinfectionAnalytics.getDirtestArea();
  console.log(`- Área menos limpia: ${dirtiest.name} (${dirtiest.hygienScore}%)`);
  console.log('');

  // Esterilización
  console.log('🧬 ESTERILIZACIÓN');
  console.log(
    `- Eficiencia promedio: ${sterilizationAnalytics.getAverageEfficiency()}%`
  );
  console.log(`- Tiempo promedio de ciclo: ${sterilizationAnalytics.getAverageCycleTime()} minutos`);
  console.log(
    `- Autoclaves pendientes: ${sterilizationAnalytics.getPendingAutoclaves().length}`
  );
  console.log('');

  // Incidentes
  console.log('⚠️ INCIDENTES');
  console.log(`- Total de incidentes: ${incidentAnalytics.getTotalIncidents()}`);
  console.log(`- Tasa de resolución: ${incidentAnalytics.getResolutionRate()}%`);
  console.log(`- Incidentes críticos: ${incidentAnalytics.getCriticalIncidents().length}`);
  console.log('');
};

// ============================================================================
// EJEMPLO 4: REPORTE DE RESIDUOS BIOLÓGICO-INFECCIOSOS
// ============================================================================

export const generateBioWasteReport = () => {
  console.log('=== REPORTE DE RPBI ===');
  console.log('');

  console.log('📊 RESUMEN GENERAL');
  console.log(`- Volumen total: ${bioWasteAnalytics.getTotalWasteVolume().toFixed(1)} kg`);
  console.log(`- Registros: ${bioWasteAnalytics.getPendingDisposal().length} pendientes`);
  console.log(
    `- Promedio de días a disposición: ${bioWasteAnalytics.getAverageDaysToDisposal()} días`
  );
  console.log('');

  // Volumen por tipo
  console.log('🗑️ VOLUMEN POR TIPO');
  const byType = bioWasteAnalytics.getWasteByType();
  Object.entries(byType).forEach(([type, volume]) => {
    console.log(`- ${type}: ${volume.toFixed(1)} kg`);
  });
  console.log('');

  // Por nivel de riesgo
  console.log('⚠️ POR NIVEL DE RIESGO');
  const byRisk = bioWasteAnalytics.getByRiskLevel();
  Object.entries(byRisk).forEach(([risk, records]) => {
    const total = records.reduce((sum, r) => sum + r.quantity, 0);
    console.log(`- Riesgo ${risk.toUpperCase()}: ${records.length} registros (${total.toFixed(1)} kg)`);
  });
  console.log('');

  // Top supervisor
  const topSupervisor = bioWasteAnalytics.getTopSupervisor();
  console.log(`👤 Supervisor con más registros: ${topSupervisor[0]} (${topSupervisor[1]} registros)`);
  console.log('');
};

// ============================================================================
// EJEMPLO 5: ANALIZAR IMPACTO EN CLIENTES
// ============================================================================

export const analyzeClientImpact = () => {
  console.log('=== ANÁLISIS DE IMPACTO EN CLIENTES ===');
  console.log('');

  console.log('📈 MÉTRICAS CLAVE');
  console.log(`- Total de visitas: ${clientAnalytics.getTotalVisits()}`);
  console.log(`- Confianza promedio: ${clientAnalytics.getAverageConfidence()}%`);
  console.log(`- Reincidencia promedio: ${clientAnalytics.getAverageRepeatVisits()}%`);
  console.log(`- Quejas totales: ${clientAnalytics.getTotalComplaints()}`);
  console.log(`- Tasa de quejas: ${clientAnalytics.getComplaintRate()}%`);
  console.log('');

  // Semana mejor
  const bestWeek = clientAnalytics.getWeekWithBestConfidence();
  console.log(`🏆 Mejor semana: ${bestWeek.week} (Confianza: ${bestWeek.confidenceScore}%)`);
  console.log('');

  // Correlación con higiene
  const hygiene = historyAnalytics.getAverageScore();
  const confidence = clientAnalytics.getAverageConfidence();
  const correlation = ((confidence - 50) / (hygiene - 50)).toFixed(2);
  console.log(`📊 Correlación Higiene → Confianza: ${correlation}x`);
  console.log('');

  // ROI Estimado
  const hygieneTrend = historyAnalytics.getTrend();
  if (hygieneTrend.direction === 'improving') {
    const estimatedNewPatients = Math.round((hygieneTrend.change / 10) * 20);
    console.log(`💰 ESTIMACIÓN DE IMPACTO`);
    console.log(
      `- Mejora de higiene: +${hygieneTrend.change}%`
    );
    console.log(`- Potencial nuevos pacientes/mes: ~${estimatedNewPatients}`);
  }
  console.log('');
};

// ============================================================================
// EJEMPLO 6: REPORTE DE GAMIFICACIÓN Y REPUTACIÓN
// ============================================================================

export const generateGamificationReport = () => {
  console.log('=== REPORTE DE GAMIFICACIÓN ===');
  console.log('');

  console.log('🏆 PROGRESO');
  console.log(
    `- Puntos obtenidos: ${gamificationAnalytics.getEarnedPoints()}/${gamificationAnalytics.getTotalAvailablePoints()}`
  );
  console.log(
    `- Medallas desbloqueadas: ${gamificationAnalytics.getUnlockedBadges().length}/${gamificationAnalytics.getTotalAvailablePoints() / 75} (aprox.)`
  );
  console.log(`- Progreso general: ${gamificationAnalytics.getOverallProgress()}%`);
  console.log('');

  // Medallas desbloqueadas
  const unlocked = gamificationAnalytics.getUnlockedBadges();
  if (unlocked.length > 0) {
    console.log('✨ MEDALLAS DESBLOQUEADAS');
    unlocked.forEach((badge) => {
      console.log(`- ${badge.icon} ${badge.name} (+${badge.points} pts)`);
    });
    console.log('');
  }

  // Próxima medalla
  const next = gamificationAnalytics.getNextAchievement();
  if (next) {
    console.log('🎯 PRÓXIMA MEDALLA');
    console.log(`- ${next.icon} ${next.name}`);
    console.log(`- Progreso: ${next.progress || 0}/${next.progress === 5 ? 7 : 30}`);
    console.log('');
  }

  // Beneficios por nivel de reputación
  const reputation = gamificationAnalytics.getOverallProgress();
  let level = 'Bronce';
  let benefits = ['Certificado de participación'];
  if (reputation > 75) {
    level = 'Platino';
    benefits = [
      'Medalla "Espacio 100% Seguro"',
      'Certificación especial reconocida',
      'Exención de inspecciones rutinarias',
    ];
  } else if (reputation > 50) {
    level = 'Oro';
    benefits = [
      'Distintivo "Espacio Seguro"',
      'Prioridad en auditorías',
    ];
  } else if (reputation > 25) {
    level = 'Plata';
    benefits = ['Distintivo de Higiene Básica'];
  }

  console.log(`⭐ NIVEL DE REPUTACIÓN: ${level}`);
  console.log('Beneficios:');
  benefits.forEach((b) => {
    console.log(`  ✓ ${b}`);
  });
  console.log('');
};

// ============================================================================
// EJEMPLO 7: GENERAR REPORTE EJECUTIVO COMPLETO
// ============================================================================

export const generateExecutiveSummary = () => {
  const report = generateConsolidatedReport();

  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║     REPORTE EJECUTIVO - SALUD HUMANA / BIOSEGURIDAD     ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');

  console.log(`📅 Generado: ${report.timestamp.toLocaleString('es-MX')}`);
  console.log('');

  console.log('📊 KPIs PRINCIPALES');
  console.log('┌─────────────────────────────────────┐');
  console.log(`│ Higiene General        : ${report.overview.overallHygiene}%     │`);
  console.log(`│ Incidentes Activos     : ${report.incidents.active}       │`);
  console.log(`│ EPP Crítico            : ${report.epp.coveragePercentage}%     │`);
  console.log(`│ Cobertura EPP          : ${report.epp.coveragePercentage}%     │`);
  console.log('└─────────────────────────────────────┘');
  console.log('');

  console.log('🎯 ESTERILIZACIÓN');
  console.log(`  • Eficiencia promedio: ${report.sterilization.averageEfficiency}%`);
  console.log(`  • Autoclaves pendientes: ${report.sterilization.pendingAutoclaves}`);
  console.log('');

  console.log('🗑️ RESIDUOS (RPBI)');
  console.log(`  • Volumen total: ${report.waste.totalVolume.toFixed(1)} kg`);
  console.log(`  • Pendientes de disposición: ${report.waste.pendingDisposal}`);
  console.log('');

  console.log('🛡️ PROTECCIÓN PERSONAL');
  console.log(`  • Stock total: ${eppAnalytics.getTotalStock()} unidades`);
  console.log(`  • Ítems expirando: ${report.epp.expiringSoon}`);
  console.log('');

  console.log('🚨 INCIDENTES');
  console.log(`  • Total: ${report.incidents.total}`);
  console.log(`  • Activos: ${report.incidents.active}`);
  console.log(`  • Tasa de resolución: ${report.incidents.resolutionRate}%`);
  console.log('');

  console.log('👥 CLIENTES/PACIENTES');
  console.log(`  • Visitas totales: ${report.clients.totalVisits}`);
  console.log(`  • Confianza promedio: ${report.clients.averageConfidence}%`);
  console.log(`  • Quejas: ${report.clients.totalComplaints}`);
  console.log('');

  console.log('🏆 GAMIFICACIÓN');
  console.log(
    `  • Puntos acumulados: ${report.gamification.earnedPoints} pts`
  );
  console.log(`  • Medallas desbloqueadas: ${report.gamification.unlockedBadges}`);
  console.log(`  • Progreso general: ${report.gamification.overallProgress}%`);
  console.log('');

  // Recomendaciones
  const recommendations = [];
  if (report.overview.criticalEPPItems > 0) {
    recommendations.push('🔴 Realizar reorden urgente de EPP crítico');
  }
  if (report.incidents.active > 2) {
    recommendations.push('🔴 Revisar y resolver incidentes activos');
  }
  if (report.overview.overallHygiene < 80) {
    recommendations.push('🟡 Intensificar protocolos de desinfección');
  }
  if (report.gamification.overallProgress < 50) {
    recommendations.push('🟡 Enfocarse en medallas próximas a desbloquear');
  }

  if (recommendations.length > 0) {
    console.log('💡 RECOMENDACIONES');
    recommendations.forEach((rec) => {
      console.log(`  ${rec}`);
    });
  }

  console.log('');
  console.log(
    'Fin del reporte | Hack BUAP 2026 - Módulo de Salud Humana'
  );
};

// ============================================================================
// USO DE EJEMPLOS
// ============================================================================

// Para usar estos ejemplos, simplemente llama las funciones:
/*
generateDailySupervisorReport();
monitorEPPInventory();
analyzeComplianceStatus();
generateBioWasteReport();
analyzeClientImpact();
generateGamificationReport();
generateExecutiveSummary();
*/

export default {
  generateDailySupervisorReport,
  monitorEPPInventory,
  analyzeComplianceStatus,
  generateBioWasteReport,
  analyzeClientImpact,
  generateGamificationReport,
  generateExecutiveSummary,
};
