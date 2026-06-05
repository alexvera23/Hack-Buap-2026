import React, { useState } from 'react';
import { guidelines as defaultGuidelines } from './data/healthDatasets';

export default function Guidelines() {
  const [items, setItems] = useState(() =>
    defaultGuidelines.flatMap((g) => g.steps.map((s) => ({ ...s, section: g.title })))
  );

  const toggleDone = (id) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Guías Paso a Paso</h1>
        <p className="text-gray-600 mb-6">Instrucciones simples para cumplir la norma y mejorar la higiene.</p>

        <div className="space-y-4">
          {items.map((step) => (
            <div key={step.id} className="bg-white rounded-lg p-4 shadow-sm flex items-start justify-between">
              <div>
                <div className="text-xs text-gray-500">{step.section}</div>
                <div className={`mt-1 text-sm ${step.done ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                  {step.text}
                </div>
              </div>
              <div>
                <button
                  onClick={() => toggleDone(step.id)}
                  className={`px-3 py-1 rounded ${step.done ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  {step.done ? 'Hecho' : 'Marcar'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Consejo: imprime estas guías y pégalos en el área de trabajo para facilitar su cumplimiento.</p>
        </div>
      </div>
    </div>
  );
}
