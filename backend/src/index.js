// backend/src/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta de prueba de bioseguridad
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', sector: 'global', message: 'API de Bioseguridad lista' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});