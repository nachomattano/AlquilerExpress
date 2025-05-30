
'use client'

import { useEffect, useState } from "react";
import { user } from "@/types/user";
import VerClientes from "@/components/mipanel/administrador/VerClientes";

export default function VerCliente() {
  const [clientes, setClientes] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users/clientes");
        const data = await res.json();
        setClientes(data);
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
      <h1 className="text-4xl font-bold mt-10 mb-8 text-center">CLIENTES</h1>
      <div>
        {loading ? (
          <p className="text-center">Cargando clientes...</p>
        ) : (
          clientes.map((element) => (
            <div key={element.id}>
              <VerClientes cliente={element} />
            </div>
          ))
        )}
      </div>
    </>
  );
}