// src/components/Footer.jsx
import React from 'react'

export default function Footer({ modulo = "General" }) {
  return (
    <footer className="bg-[var(--color-dark)] text-white mt-12 py-8 border-t border-[var(--color-light)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center text-sm space-y-3">
          <p className="font-medium text-[var(--color-background)]/90">
            Hack BUAP 2026 — Soluciones en Bioseguridad Integrada
          </p>
          <p className="text-xs bg-[var(--color-dark)]/90 inline-block px-3 py-1 rounded-full border border-[var(--color-light)] text-[var(--color-background)]/80">
            Módulo Activo: <span className="text-[var(--color-primary)] font-semibold">{modulo}</span>
          </p>
          <p className="text-xs text-[var(--color-background)]/70 pt-1">
            Desarrollado con React, Tailwind CSS y datos de telemetría predictiva para análisis sanitario.
          </p>
        </div>
      </div>
    </footer>
  )
}