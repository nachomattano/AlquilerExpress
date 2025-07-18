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
  titular?: boolean;
  esMenor?: boolean;
}

export default function Formulario({ id }: { id?: string | null | undefined }) {
  const [acompanantes, setAcompanantes] = useState<Acompanante[]>([]);
  const [mostrarAcompanantes, setMostrarAcompanantes] = useState(true);
  const [solicitud, setSolicitud] = useState<solicitud | null>();
  const [pago, setPago] = useState<pago | null>();
const [usuario, setUsuario] = useState<user | null>(null); 
  const [ restantes, setRestantes ] = useState<number>(0)
 

  const redirigir = async () => {

        let usuarioActual = localStorage.getItem("user");
        let user
        if (usuarioActual) {
            user = JSON.parse(usuarioActual)
        }
        let userMail = user.mail
    var aux
    let falla 
    var duplicado 
    for (let i = 0; i<acompanantes.length;i++){
      falla = acompanantes[i].email
      if (falla == "menor@gmail.com"){
        aux = true
      }else{
      let acom = await getUsuarioPorMail(acompanantes[i].email)
      if (acompanantes.filter(a => a.email == acompanantes[i].email).length >=2){
        duplicado = acompanantes[i].email
        break
      }
      if (!acom.user || userMail == acompanantes[i].email){
        aux=false
        break
      }else{
        aux=true
      }
    }
    }
    let valido = aux
    if (duplicado){
      toast.error(`Mail duplicado ${duplicado}`)
      return
    }
    if(!valido){
      toast.error(userMail == falla? `Mail duplicado ${falla}`: `Email ${falla} no exitente en el sistema`)
      return
    }
    window.location.replace(`/pago/${id}/pagar`)
  }

  const handleAddAcompanante = async() => {
    const totalPersonas = solicitud?.cantidad ?? 1;
    console.log(`totalPersonas ${totalPersonas}`)
    const maxAcompanantes = totalPersonas -1;


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

        const nuevos = Array.from({ length:  solicitudesData?.cantidad? solicitudesData.cantidad-1:0}, () => ({
        email: "",
        validado: false
      }));
      setMostrarAcompanantes(true);
      setAcompanantes([...acompanantes, ...nuevos]);

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

  const handleToggleMenor = (index: number) => {
    const nuevos = [...acompanantes];
    const actual = nuevos[index];

    if (actual.esMenor) {
      actual.esMenor = false;
      actual.email = "";
    } else {
      actual.esMenor = true;
      actual.email = "menor@gmail.com";
      actual.validado = false;
    }

    setAcompanantes(nuevos);
  };

  return (
    <div className="h-full bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Agregar acompañantes</h2>

      <div className="space-y-4">
        

        {mostrarAcompanantes && (
          <div className="space-y-4">
            {acompanantes.map((acomp, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <input
                  type="email"
                  placeholder={acomp.titular ? "Titular (no editable)" : "Email del acompañante"}
                  value={acomp.esMenor? "": acomp.email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  disabled={acomp.validado || acomp.titular || acomp.esMenor}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm ${
                    acomp.validado || acomp.titular || acomp.esMenor
                      ? "bg-gray-100 text-gray-500"
                      : "border-gray-300"
                  }`}
                />

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={acomp.esMenor || false}
                    onChange={() => handleToggleMenor(index)}
                    disabled={acomp.validado}
                  />
                  Es menor
                </label>

              </div>
            ))}
          </div>
        )}
        <button
         className="text-blue-600 hover:underline"
          onClick={redirigir}
        >
          Confirmar Acompañantes
        </button>
      </div>
    </div>
  );
}