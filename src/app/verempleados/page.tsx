'use client'

import { useEffect, useState } from "react";
import { user } from "@/types/user";
import VerEmpleado from "@/components/mipanel/administrador/VerEmpleados";

export default function VerEmpleados() {
  const [empleados, setEmpleados] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users/empleados");
        const data = await res.json();
        setEmpleados(data);
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleados();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mt-10 mb-8 text-center">EMPLEADOS</h1>
      <div>
        {loading ? (
          <p className="text-center">Cargando empleados...</p>
        ) : (
          empleados.map((element) => (
            <div key={element.id}>
              <VerEmpleado empleado={element} />
            </div>
          ))
        )}
      </div>
    </>
  );
}