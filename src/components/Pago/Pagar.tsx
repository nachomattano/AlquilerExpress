"use client";

import { useState } from 'react';
import { Eye, EyeOff, Library } from 'lucide-react'; // Si usás Lucide o algún ícono SVG
import { estadoPago } from '@/types/estado-pago';
import { pago } from '@/types/pago';


export default function Pagar() {
  const [fullname, setFullName] = useState("");
  const [numerotarjeta, setNum] = useState("");
  const [numeroseguridad, setCod] = useState("");
  const [verCodigo, setVerCodigo] = useState(false); // 👁️ Estado para mostrar u ocultar


  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
       
        const res = await fetch(`/api/pagos`, {
            method: 'POST',
            body: JSON.stringify({fullname,numerotarjeta, numeroseguridad}),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (res.ok){
          alert(`${data.message}`);
        } else {
          alert(`${data.message}`);
  }
        
    }

  return (
    <>
      <div className="h-full bg-white shadow-md rounded-xl max-w-md mx-auto mt-10">
        <h2 className="text-center mt-4 text-2xl font-bold mb-4">Completar datos de tarjeta</h2>
        <div className="p-20 pt-15">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Juan Pérez"
                required
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="numeroTarjeta" className="text-sm font-medium text-gray-700">
                Número de tarjeta
              </label>
              <input
                id="numeroTarjeta"
                type="text"
                placeholder="1234565789"
                required
                value={numerotarjeta}
                onChange={(e) => setNum(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="codigo" className="text-sm font-medium text-gray-700">
                Código
              </label>
              <div className="relative">
                <input
                    id="codigo"
                    type={verCodigo ? "text" : "password"}
                    placeholder="..."
                    required
                    value={numeroseguridad}
                    onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,3}$/.test(value)) {
                        setCod(value);
                    }
                    }}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setVerCodigo(!verCodigo)}
                  className="absolute top-1/2 bg-white right-2 transform -translate-y-1/2 text-gray-600"
                >
                  {verCodigo ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button 
            
              type="submit"
              className='w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                Pagar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}