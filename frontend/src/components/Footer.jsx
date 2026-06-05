// src/components/Footer.jsx
import React from 'react'

export default function Footer({ modulo = "General" }) {
  return (
    <footer className="bg-dark text-white mt-auto py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center text-gray-400 text-sm space-y-2">
          <p className="font-medium">
            Hack BUAP 2026 — Soluciones en Bioseguridad Integrada
          </p>
          <p className="text-xs bg-gray-850 inline-block px-3 py-1 rounded border border-gray-800 text-gray-300">
            Módulo Activo: <span className="text-primary font-semibold">{modulo}</span>
          </p>
          <p className="text-xs text-gray-500 pt-2">
            Desarrollado con React, Tailwind CSS v4 y datos de telemetría predictiva para análisis sanitario.
          </p>
        </div>
      </div>
    </footer>
  )
}