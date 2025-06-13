
'use client'

import { useEffect, useState } from "react";
import { user } from "@/types/user";
import VerInmueble from "@/components/mipanel/VerInmuebles";
import { inmueble } from "@/types/inmueble";

export default function VerInmuebles() {
  const [inmuebles, setInmuebles] = useState<inmueble[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/inmueble");
        const data = await res.json();
        setInmuebles(data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchClientes();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mt-10 mb-8 text-center">Inmuebles</h1>
      <div>
        {loading ? (
          <p className="text-center">Cargando Inmuebles...</p>
        ) : (
          inmuebles.map((element) => (
            <div key={element.id}>
              <VerInmueble inmueble={element} />
            </div>
          ))
        )}
      </div>
    </>
  );
}