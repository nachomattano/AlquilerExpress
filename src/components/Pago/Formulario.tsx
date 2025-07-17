"use client";
import { getPago } from '@/lib/db/pago';
import { getSolicitudReserva } from '@/lib/db/solicitudes-reservas';
import { getUsuarioPorMail } from '@/lib/db/usuarios/usuarios';
import { pago } from '@/types/pago';
import { solicitud } from '@/types/solicitud';
import { user } from '@/types/user';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Acompanante {
  email: string;
  validado?: boolean;
  titular?: boolean; // ✅ Nuevo campo para marcar al titular
}

export default function Formulario({ id }: { id?: string | null | undefined }) {
  const [acompanantes, setAcompanantes] = useState<Acompanante[]>([]);
  const [mostrarAcompanantes, setMostrarAcompanantes] = useState(false);
  const [solicitud, setSolicitud] = useState<solicitud | null>();
  const [pago, setPago] = useState<pago | null>();

  const [ restantes, setRestantes ] = useState<number>(0)

  // ✅ Cargar email del titular desde localStorage
 

  const redirigir = async () => {
    window.location.replace(`/pago/${id}/pagar`)
  }

  const handleAddAcompanante = async() => {
    const totalPersonas = solicitud?.cantidad ?? 1;
    console.log(`totalPersonas ${totalPersonas}`)
    const maxAcompanantes = totalPersonas -1; // ✅ Solo los acompañantes REALES


    if (maxAcompanantes <= 0) return;

    const faltantes = maxAcompanantes;
    if (faltantes > 0) {
      const nuevos = Array.from({ length: faltantes }, () => ({
        email: "",
        validado: false
      }));
      setMostrarAcompanantes(true);
      setAcompanantes([...acompanantes, ...nuevos]);
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const solicitudesData = await getSolicitudReserva(id);
        const pagosData = await getPago(solicitudesData?.pagoid?.toString());
        setPago(pagosData);
        setSolicitud(solicitudesData);
        setRestantes(solicitudesData?.cantidad? solicitudesData.cantidad-1:0)
        console.log("[DEBUG] Solicitud cargada:", solicitudesData);
        console.log("[DEBUG] Pago cargado:", pagosData);
        console.log(restantes)
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    cargarDatos();
  }, [id]);

  const handleEmailChange = (index: number, value: string) => {
    const nuevos = [...acompanantes];
    nuevos[index].email = value;
    nuevos[index].validado = false;
    setAcompanantes(nuevos);
  };

  const handleValidarOEliminar = async (index: number) => {
    const acomp = acompanantes[index];


    if (acomp.validado) {
      const nuevos = acompanantes.filter((_, i) => i !== index);
      setAcompanantes(nuevos);
      setRestantes(restantes+1)
      toast.success(`Acompañante eliminado`);
      return;
    }

    const usuario = await getUsuarioPorMail(acomp.email);
    if (!usuario.user) {
      toast.error(`El email ${acomp.email} no está registrado en el sistema`);
      const nuevos = [...acompanantes];
      nuevos[index].email = "";
      setAcompanantes(nuevos);
    } else {
      toast.success(`Acompañante ${acomp.email} válido`);
      setRestantes(restantes-1)
      const nuevos = [...acompanantes];
      nuevos[index].validado = true;
      setAcompanantes(nuevos);
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
            disabled={restantes == 0}
            className={`text-sm ${
              acompanantes.length >= (solicitud.cantidad - 1)
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:underline"
            }`}
          >
            Agregar acompañantes ({acompanantes.filter(a => !a.titular).length}/{solicitud.cantidad - 1})
          </button>
        )}

        {mostrarAcompanantes && (
          <div className="space-y-4">
            {acompanantes.map((acomp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <input
                  type="email"
                  placeholder={acomp.titular ? "Titular (no editable)" : "Email del acompañante"}
                  value={acomp.email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  disabled={acomp.validado || acomp.titular}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm ${
                    acomp.validado || acomp.titular
                      ? "bg-gray-100 text-gray-500"
                      : "border-gray-300"
                  }`}
                />
                {true && (
                  <button
                    type="button"
                    onClick={() => handleValidarOEliminar(index)}
                    disabled={!acomp.email}
                    className={`px-4 py-2 rounded-md text-white ${
                      acomp.validado
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {acomp.validado ? "Eliminar" : "Validar +"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <button
         className="text-blue-600 hover:underline"
         disabled={restantes!=0}
          onClick={redirigir}
        >
          Confirmar Acompañantes
        </button>
      </div>
    </div>
  );
}