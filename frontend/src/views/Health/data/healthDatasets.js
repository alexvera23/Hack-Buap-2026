// Datasets para el módulo de Salud Humana - Bioseguridad Clínica y Comercial

// Datos de ejemplo para protocolos de esterilización
export const sterilizationProtocols = [
  {
    id: 1,
    name: 'Autoclave A1',
    location: 'Área de Quirófano',
    lastSterilization: new Date(Date.now() - 2 * 60 * 60 * 1000), // hace 2 horas
    nextScheduled: new Date(Date.now() + 6 * 60 * 60 * 1000),
    status: 'completed',
    temperature: 121,
    pressure: 15,
    cycleTime: 45,
    efficiency: 98,
  },
  {
    id: 2,
    name: 'Autoclave A2',
    location: 'Laboratorio Clínico',
    lastSterilization: new Date(Date.now() - 5 * 60 * 60 * 1000), // hace 5 horas
    nextScheduled: new Date(Date.now() + 3 * 60 * 60 * 1000),
    status: 'pending',
    temperature: 0,
    pressure: 0,
    cycleTime: 0,
    efficiency: 0,
  },
  {
    id: 3,
    name: 'Esterilizador UV',
    location: 'Área de Instrumentos',
    lastSterilization: new Date(Date.now() - 1 * 60 * 60 * 1000), // hace 1 hora
    nextScheduled: new Date(Date.now() + 11 * 60 * 60 * 1000),
    status: 'completed',
    temperature: 25,
    pressure: 1,
    cycleTime: 30,
    efficiency: 95,
  },
];

// Datos de registros de Residuos Peligrosos Biológico-Infecciosos (RPBI)
export const bioWasteRecords = [
  {
    id: 101,
    type: 'Agujas y bisturís contaminados',
    quantity: 2.5, // kg
    collectionTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
    container: 'Contenedor Rojo A',
    disposalStatus: 'pending',
    disposalSchedule: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    supervisor: 'Dr. García López',
    riskLevel: 'high',
  },
  {
    id: 102,
    type: 'Muestras de laboratorio infectadas',
    quantity: 0.8,
    collectionTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    container: 'Contenedor Amarillo B',
    disposalStatus: 'completed',
    disposalDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    supervisor: 'Lic. María Rodríguez',
    riskLevel: 'high',
  },
  {
    id: 103,
    type: 'Toallas y materiales de curación usados',
    quantity: 1.2,
    collectionTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
    container: 'Contenedor Blanco C',
    disposalStatus: 'in_progress',
    disposalSchedule: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    supervisor: 'Enfermera Carlos Morales',
    riskLevel: 'medium',
  },
];

// Datos de Equipos de Protección Personal (EPP)
export const personalProtectiveEquipment = [
  {
    id: 201,
    type: 'Guantes de nitrilo',
    size: 'M',
    currentStock: 850,
    minStock: 200,
    location: 'Almacén Central',
    expiryDate: new Date('2026-12-31'),
    lastRestock: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'optimal',
  },
  {
    id: 202,
    type: 'Mascarillas N95',
    size: 'unitalla',
    currentStock: 120,
    minStock: 250,
    location: 'Almacén Central',
    expiryDate: new Date('2026-10-15'),
    lastRestock: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    status: 'low',
  },
  {
    id: 203,
    type: 'Batas quirúrgicas',
    size: 'L',
    currentStock: 340,
    minStock: 150,
    location: 'Almacén Central',
    expiryDate: new Date('2027-06-30'),
    lastRestock: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    status: 'optimal',
  },
  {
    id: 204,
    type: 'Protectores faciales',
    size: 'unitalla',
    currentStock: 45,
    minStock: 100,
    location: 'Almacén Central',
    expiryDate: new Date('2026-08-20'),
    lastRestock: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    status: 'critical',
  },
];

// Datos de áreas de desinfección
export const disinfectionAreas = [
  {
    id: 301,
    name: 'Área de Toma de Muestras',
    lastDisinfection: new Date(Date.now() - 2 * 60 * 60 * 1000), // hace 2 horas
    frequency: '4 horas',
    agent: 'Hipoclorito de sodio 0.5%',
    supervisor: 'Técnico López',
    status: 'clean',
    hygienScore: 98,
  },
  {
    id: 302,
    name: 'Quirófano 1',
    lastDisinfection: new Date(Date.now() - 4 * 60 * 60 * 1000), // hace 4 horas
    frequency: '6 horas',
    agent: 'Desinfectante quaternario',
    supervisor: 'Técnico Martínez',
    status: 'clean',
    hygienScore: 96,
  },
  {
    id: 303,
    name: 'Área de Comedor Comunitario',
    lastDisinfection: new Date(Date.now() - 1 * 60 * 60 * 1000), // hace 1 hora
    frequency: '3 horas',
    agent: 'Cloro 0.3%',
    supervisor: 'Cocinero Chef Ana',
    status: 'clean',
    hygienScore: 94,
  },
  {
    id: 304,
    name: 'Laboratorio',
    lastDisinfection: new Date(Date.now() - 6 * 60 * 60 * 1000), // hace 6 horas
    frequency: '8 horas',
    agent: 'Alcohol 70%',
    supervisor: 'Técnico Ruiz',
    status: 'warning',
    hygienScore: 78,
  },
];

// Datos de incidentes y no-conformidades
export const incidents = [
  {
    id: 401,
    date: new Date(Date.now() - 12 * 60 * 60 * 1000),
    type: 'EPP insuficiente',
    severity: 'medium',
    description: 'Stock de mascarillas N95 por debajo del mínimo',
    resolution: 'Reorden urgente solicitado',
    status: 'in_progress',
    area: 'Almacén Central',
  },
  {
    id: 402,
    date: new Date(Date.now() - 48 * 60 * 60 * 1000),
    type: 'Retraso en desinfección',
    severity: 'high',
    description: 'Quirófano no desinfectado a tiempo',
    resolution: 'Sanción administrativa y entrenamiento',
    status: 'resolved',
    area: 'Quirófano 1',
  },
  {
    id: 403,
    date: new Date(Date.now() - 72 * 60 * 60 * 1000),
    type: 'Protocolo violado',
    severity: 'critical',
    description: 'Personal sin EPP adecuado en área de riesgo',
    resolution: 'Capacitación obligatoria realizada',
    status: 'resolved',
    area: 'Laboratorio',
  },
];

// Datos históricos para gráficos
export const hygienicScoreHistory = [
  { date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), score: 85 },
  { date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), score: 87 },
  { date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), score: 89 },
  { date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), score: 88 },
  { date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), score: 91 },
  { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), score: 93 },
  { date: new Date(Date.now()), score: 95 },
];

// Datos de pacientes/clientes y satisfacción
export const clientMetrics = [
  {
    id: 501,
    week: 'Semana 1',
    totalVisits: 245,
    confidenceScore: 82, // porcentaje de pacientes que confían en las medidas de higiene
    repeatVisits: 78, // %
    complaints: 3,
  },
  {
    id: 502,
    week: 'Semana 2',
    totalVisits: 268,
    confidenceScore: 85,
    repeatVisits: 81,
    complaints: 1,
  },
  {
    id: 503,
    week: 'Semana 3',
    totalVisits: 312,
    confidenceScore: 90,
    repeatVisits: 86,
    complaints: 0,
  },
];

// Medallas y logros de gamificación
export const achievements = [
  {
    id: 'safe-space-100',
    name: 'Espacio 100% Seguro',
    description: 'Mantener puntuación de higiene perfecta durante 7 días consecutivos',
    icon: '🏅',
    badgeColor: 'gold',
    points: 100,
    unlocked: false,
    progress: 5, // días actuales de 7
  },
  {
    id: 'sterilization-master',
    name: 'Maestro de Esterilización',
    description: 'Completar 50 ciclos de esterilización sin incidentes',
    icon: '🧬',
    badgeColor: 'blue',
    points: 75,
    unlocked: true,
    unlockedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'waste-warrior',
    name: 'Guerrero del Desecho',
    description: 'Registrar 100 entradas de RPBI sin errores',
    icon: '♻️',
    badgeColor: 'green',
    points: 50,
    unlocked: true,
    unlockedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'epp-guardian',
    name: 'Guardián del EPP',
    description: 'Mantener inventario de EPP por encima del mínimo 30 días seguidos',
    icon: '🛡️',
    badgeColor: 'silver',
    points: 60,
    unlocked: false,
    progress: 12, // días de 30
  },
];

// Configuración de QR para clientes
export const qrConfig = {
  publicQR: {
    id: 'qr-clinic-001',
    clinicName: 'Clínica La Salud',
    address: 'Calle Principal 123, Ciudad',
    generatedDate: new Date(),
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  },
};
