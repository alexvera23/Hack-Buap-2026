import React from 'react';
import { useLocation } from 'react-router-dom';
import { certificates, qrConfig } from './data/healthDatasets';

function parsePayload(search) {
  try {
    const params = new URLSearchParams(search);
    const payload = params.get('payload');
    if (payload) {
      const decoded = atob(payload);
      return JSON.parse(decoded);
    }
    const id = params.get('id');
    if (id) return { type: 'certificate', id };
  } catch (e) {
    // ignore
  }
  return null;
}

export default function Verify() {
  const { search } = useLocation();
  const data = parsePayload(search);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-xl bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">Verificación</h2>
          <p className="text-gray-600">QR inválido o faltan parámetros.</p>
        </div>
      </div>
    );
  }

  if (data.type === 'certificate') {
    const cert = certificates.find((c) => c.id === data.id);
    if (!cert) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-xl bg-white p-6 rounded shadow text-center">
            <h2 className="text-xl font-semibold mb-2">Certificado no encontrado</h2>
            <p className="text-gray-600">El certificado buscado no existe o fue emitido localmente.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-2">Certificado de Bioseguridad</h2>
          <p className="text-sm text-gray-600 mb-4">ID: {cert.id}</p>
          <div className="text-sm text-gray-800 mb-2">Clínica: {cert.clinicName}</div>
          <div className="text-sm text-gray-800 mb-2">Score: {cert.score}%</div>
          <div className="text-sm text-gray-800 mb-4">Emitido: {new Date(cert.date).toLocaleString('es-MX')}</div>
          <div className="text-sm text-gray-600">Válido hasta: {new Date(cert.validUntil).toLocaleDateString('es-MX')}</div>
        </div>
      </div>
    );
  }

  if (data.type === 'clinic') {
    const clinic = qrConfig.publicQR;
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="max-w-md bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-2">Verificación de Clínica</h2>
          <p className="text-sm text-gray-600 mb-4">{clinic.clinicName}</p>
          <p className="text-sm text-gray-800 mb-2">Dirección: {clinic.address}</p>
          <p className="text-sm text-gray-800">Generado: {new Date(clinic.generatedDate).toLocaleString('es-MX')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl bg-white p-6 rounded shadow text-center">
        <h2 className="text-xl font-semibold mb-2">Verificación</h2>
        <p className="text-gray-600">Tipo de payload desconocido.</p>
      </div>
    </div>
  );
}
