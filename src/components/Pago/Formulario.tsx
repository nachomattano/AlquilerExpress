"use client";
import { getPago } from '@/lib/db/pago';
import { getSolicitudReserva } from '@/lib/db/solicitudes-reservas';
import { getUsuarioPorMail } from '@/lib/db/usuarios/usuarios';
import { pago } from '@/types/pago';
import { solicitud } from '@/types/solicitud';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Acompanante {
  email: string;
}

export default function Formulario({ id }: { id?: string | null | undefined }) {
  const [acompanantes, setAcompanantes] = useState<Acompanante[]>([]);
  const [mostrarAcompanantes, setMostrarAcompanantes] = useState(false);
  const [solicitud, setSolicitud] = useState<solicitud | null>();
  const [pago, setPago] = useState<pago | null>();

  const handleAddAcompanante = () => {
    const maxAcompanantes = solicitud?.cantidad ?? 0;
    if (acompanantes.length < maxAcompanantes - 1) {
      setMostrarAcompanantes(true);
      setAcompanantes([...acompanantes, { email: "" }]);
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const solicitudesData = await getSolicitudReserva(id);
        const pagosData = await getPago(solicitudesData?.pagoid?.toString());
        setPago(pagosData);
        setSolicitud(solicitudesData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleEmailChange = (index: number, value: string) => {
    const nuevos = [...acompanantes];
    nuevos[index].email = value;
    setAcompanantes(nuevos);
  };

  const handleAgregarAcompanante = async (index: number) => {
    const email = acompanantes[index].email;
    const usuario = await getUsuarioPorMail(email);
    if (!usuario.user) {
      toast.error(`El email ${email} no está registrado en el sistema`);
      const nuevos = [...acompanantes];
      nuevos[index].email = "";
      setAcompanantes(nuevos);
    } else {
      toast.success(`Acompañante ${email} válido`);
    }
  };

  return (
    <div className="h-full bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Agregar acompañantes</h2>

      <div className="space-y-4">
        {typeof solicitud?.cantidad === "number" && solicitud.cantidad > 1 && (
          <button
            type="button"
            onClick={handleAddAcompanante}
            disabled={acompanantes.length >= (solicitud.cantidad - 1)}
            className={`text-sm ${
              acompanantes.length >= (solicitud.cantidad - 1)
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:underline"
            }`}
          >
            Agregar acompañante ({acompanantes.length}/{solicitud.cantidad - 1})
          </button>
        )}

        {mostrarAcompanantes && (
          <div className="space-y-4">
            {acompanantes.map((acomp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <input
                  type="email"
                  placeholder="Email del acompañante"
                  value={acomp.email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => handleAgregarAcompanante(index)}
                  disabled={!acomp.email}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Validar +
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}