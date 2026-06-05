FROM node:20-alpine

WORKDIR /app

# Inicialmente copiará archivos base si existen, si no, mantendrá el entorno listo
COPY package*.json ./
RUN npm install --quiet || true

COPY . .

EXPOSE 3000

# Comando por defecto para desarrollo (ajustable según el lenguaje final)
CMD ["npm", "run", "dev"]