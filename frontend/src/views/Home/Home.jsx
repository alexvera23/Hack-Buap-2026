import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ShieldAlert, HeartPulse, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Estilos locales para animaciones */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

      {/* Decoración de fondo difuminada (Glassmorphism sutil) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[120px]"></div>
        <div className="absolute top-[30%] -right-[15%] w-[50%] h-[50%] rounded-full bg-green-500/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-amber-500/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center my-auto">
        
        {/* Cabecera / Hero */}
        <div className="text-center mb-16 max-w-3xl fade-in-up opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Iniciativa One Health</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            Bioseguridad y <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">
              Salud Integral
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Plataforma centralizada de trazabilidad e inocuidad. Protegemos la cadena de valor unificando protocolos del campo, el cuidado pecuario y la salud humana.
          </p>
        </div>

        {/* Grid de Módulos (Tarjetas) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
          
          {/* Tarjeta 1: Agricultura */}
          <Link to="/agriculture" className="group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden fade-in-up opacity-0 delay-100">
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-300"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Agricultura</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                Bioseguridad fitonutricional. Monitorea plagas, gestiona alertas predictivas de SENASICA y genera reportes de trazabilidad en el campo.
              </p>
              <div className="inline-flex items-center text-sm font-bold text-emerald-600">
                Acceder al Módulo <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Tarjeta 2: Animal Care */}
          <Link to="/animal-care" className="group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden fade-in-up opacity-0 delay-200">
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-6 h-6 text-amber-600" />
            </div>
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-300"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 text-amber-600 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Cuidado Animal</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                Bioseguridad zoosanitaria. Control de vectores, registro de vacunación, semáforos sanitarios y gamificación productiva.
              </p>
              <div className="inline-flex items-center text-sm font-bold text-amber-600">
                Acceder al Módulo <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Tarjeta 3: Health */}
          <Link to="/health" className="group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden fade-in-up opacity-0 delay-300">
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-6 h-6 text-green-600" />
            </div>
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/20 transition-all duration-300"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 text-green-600 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                <HeartPulse className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Salud Humana</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                Bioseguridad clínica y comercial. Protocolos de esterilización, indicadores de higiene en tiempo real y seguridad para pacientes.
              </p>
              <div className="inline-flex items-center text-sm font-bold text-green-600">
                Acceder al Módulo <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

        </div>
      </div>
      
      {/* Footer minimalista */}
      <div className="relative z-10 mt-16 text-center pb-6">
        <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
          Hack BUAP 2026 • Soluciones Inteligentes
        </p>
      </div>

    </div>
  );
}
