"use client";
import { getUsuarioPorMail } from '@/lib/db/usuarios/usuarios';
import { useEffect, useState } from 'react';
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { user } from '@/types/user'; // Asegurate de tener este import
import { inmueble } from '@/types/inmueble';
import { getInmueble } from '@/lib/db/inmuebles';
import { addDays, startOfDay } from "date-fns"
import toast from 'react-hot-toast';

export default  function Reservar ({id}:{id:string}){

    const [rangoFechas, setRangoFechas] = useState<DateRange | undefined>();
    const [isOp, setIsOp] = useState(false);

    const [nombreAcom, setNombreAcom] = useState("");
    const [dniAcom, setDniAcom] = useState("");
    const [isSinCuenta, setIsSinCuenta] = useState(false);

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [emailAcom, setEmailAcom] = useState("")
    const [dni, setDni] = useState("")
    const [cantidadacompañantes, setCantidadAcompañantes] = useState("")
    const [disponibilidad, setDisponibilidad] = useState<DateRange[]>([]);
    const [acompanantes, setAcompanantes] = useState<string[]>([]);
    const [ inmueble, setInmueble ] = useState<inmueble|null|undefined>()
    const [usuario, setUsuario] = useState<user | null>(null); 
    const hoy = startOfDay(new Date())
    const minFecha = addDays(hoy, 3)
    const [cantidadTotal, setCantidad] = useState<number> (1); 
    const [cantidadPermitida, setCantidadP] = useState<number> (1); 


    useEffect(() => {
        const usuarioActual = localStorage.getItem("user");
        if (usuarioActual) {
            setUsuario(JSON.parse(usuarioActual));
        }
        console.log('aquiii')

        const fetchClientes = async () => {
            try {
                console.log("No asdasd")
                const res = await fetch(`http://localhost:3000/api/inmueble/${id}/disponibilidad`, {
                    cache: "no-store",
                    headers: {
                        "Cache-Control": "no-cache"
                    }
                });
                const data = await res.json();
                console.log("DATAAAAA", JSON.stringify(data))
                const rangosNoDisponibles = Array.isArray(data.disponibilidad)
    ? data.disponibilidad.map((rango: { desde: string; hasta: string }) => ({
        from: new Date(rango.desde),
        to: new Date(rango.hasta)
      }))
    : data.disponibilidad
    ? [{
        from: new Date(data.disponibilidad.desde),
        to: new Date(data.disponibilidad.hasta)
      }]
    : [];
                const inmu = await getInmueble(id as string)
                const cantidad = inmu?.cantidadhuespedes? inmu.cantidadhuespedes:1
                setCantidadP(cantidad) 
                setInmueble(inmu)
                setDisponibilidad(rangosNoDisponibles);
            } catch (error) {
                console.error("Error al obtener disponibilidad:", error);
            }
        };

        fetchClientes();
    }, []);

    const agregarAcompanante = async () => {
        if (!emailAcom.trim()) return;

        const acomp = await getUsuarioPorMail(emailAcom);

        if (!acomp.user) {
            toast.error("El email ingresado no está registrado en el sistema");
            return;
        }

        setAcompanantes((prev) => [...prev, emailAcom]);
        setCantidad(cantidadTotal +1)
        setEmailAcom("");
        setIsOp(false);
    };

    const agregarAcompananteSinCuenta = () => {
        if (!nombreAcom.trim()) return;

        setAcompanantes((prev) => [...prev, nombreAcom]);
        setCantidad(cantidadTotal +1)
        setNombreAcom("");
        setIsSinCuenta(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!usuario?.id) {
            toast.error("No se pudo identificar al usuario actual.");
            return;
        }
        if(inmueble? inmueble.cantidadhuespedes : 1 <= parseInt(cantidadacompañantes || "0") + 1){
           toast.error("")
           return; 
        }

        const acompañantesId = await Promise.all(
            acompanantes.map(async (acomp) => {
                const acompañante = await getUsuarioPorMail(acomp);
                return acompañante.user?.id ?? '1';
            })
        );

        const res = await fetch('/api/solicitudes', {
            method: 'POST',
            body: JSON.stringify({
                fechahasta: rangoFechas?.to,
                fechadesde: rangoFechas?.from,
                mail: email,
                dni,
                acompañantesid: acompañantesId,
                nombre: fullName,
                inmuebleid: id,
                solicitante: usuario.id, 
                cantidad: parseInt(cantidadacompañantes || "0") + 1,
                monto: inmueble? inmueble.preciopordia : 3 * Math.floor(((rangoFechas && rangoFechas.to? rangoFechas.to.getTime(): 2) - (rangoFechas && rangoFechas?.from?  rangoFechas.from.getTime() : 1))/(1000 * 60 * 60 * 24))
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            window.location.replace('/');
            toast.success('Solicitud enviada!');
        } else {
            toast.error(await res.text());
        }
    };


return <>
        <div className="h-full bg-white shadow-lg rounded-xl">
                                <h2 className="text-center mt-4 text-2xl font-bold mb-4">Llenar formulario para solicitar reserva</h2>
                                <div className="p-6 pt-0">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                    <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                                    Nombre Completo
                                    </label>
                                    <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Juan Pérez"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                                    </div>

                                    <div className="space-y-2">
                                    <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                                    Email
                                    </label>
                                    <input
                                    id="fullName"
                                    type="text"
                                    placeholder="...@gmail.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                                    </div>

                                
                                    <div className="space-y-2">
                                    <label htmlFor="dni" className="text-sm font-medium text-gray-700">
                                     DNI
                                    </label>
                                    <input
                                        id="dni"
                                        type="text"
                                        placeholder="12345678"
                                        required
                                        value={dni}
                                        onChange={(e) => setDni(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                                    </div>
                                    
        
                                    
                                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
                                    {acompanantes.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-lg text-green-700">Acompañantes agregados:</h3>
                                        <ul className="list-disc list-inside text-gray-800 mt-2">
                                        {acompanantes.map((acomp, index) => (
                                            <li key={index}>
                                            {acomp.includes("@") ? `✔️ ${acomp} (con cuenta)` : `👤 ${acomp} (sin cuenta)`}
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                    )}

                                    </div>
                                    
                                    
                                    
                                    <div  className="space-y-4">
                                            <div className="space-y-2">
                                            <label htmlFor="fullName" className=" flex font-medium text-gray-700">
                                            Email Acompañante
                                            </label>
                                            <input
                                            id="fullName"
                                            type="text"
                                            placeholder="...@gmail.com"
                                            required
                                            value={emailAcom}
                                            onChange={(e) => setEmailAcom(e.target.value)}
                                            className="w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                                            
                                            <button
                                            onClick={agregarAcompanante} // no necesita type="button" porque ya lo tiene implícito
                                            type="button"
                                            disabled= {cantidadPermitida < cantidadTotal+1}
                                            className="ml-4 w-50 bg-black hover:bg-orange-500 text-white py-2 px-2 rounded-md"
                                            >
                                            Confirmar acompañante
                                            </button>
                                            </div>
                                    </div>

                                    <div className="space-y-4">

                    
                                            <div className="space-y-2">
                                                <label htmlFor="nombreAcom" className="flex font-medium text-gray-700">
                                                    Nombre del Acompañante
                                                </label>
                                                <input
                                                    id="nombreAcom"
                                                    type="text"
                                                    placeholder="Ej: María Gómez"
                                                    required
                                                    value={nombreAcom}
                                                    onChange={(e) => setNombreAcom(e.target.value)}
                                                    className="w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <label htmlFor="dniAcom" className="flex font-medium text-gray-700">
                                                    Dni del acompañante
                                                </label>
                                                <input
                                                    id="dniAcom"
                                                    type="number"
                                                    placeholder="Ej: 444444"
                                                    required
                                                    value={dniAcom}
                                                    onChange={(e) => setDniAcom(e.target.value)}
                                                    className="w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />

                                                <button
                                                    onClick={agregarAcompananteSinCuenta}
                                                    type="button"
                                                    disabled= {cantidadPermitida < cantidadTotal+1}
                                                    className="ml-4 w-50 bg-black hover:bg-orange-500 text-white py-2 px-2 rounded-md"
                                                >
                                                    Confirmar acompañante
                                                </button>
                                            </div>
                                    </div>


                                    <div className="mt-6">
                                        <h3 className="text-md font-medium text-gray-700 mb-2">Seleccionar fechas de reserva</h3>
                                        <DayPicker
                                            mode="range"
                                            selected={rangoFechas}
                                            onSelect={setRangoFechas}
                                            disabled={[
                                                { before: minFecha}, 
                                                ...disponibilidad 
                                            ]}
                                            className="rounded-md shadow"
                                        />

                                        {rangoFechas?.from && rangoFechas?.to && (<div>
                                        <p className="mt-2 text-green-700 font-medium">
                                        Fechas seleccionadas:{" "}
                                        <span className="font-semibold">
                                        {rangoFechas.from.toLocaleDateString()} – {rangoFechas.to.toLocaleDateString()}
                                        </span>
                                        
                                        </p>
                                        <p>Monto final de la Reserva: <span>{inmueble? inmueble.preciopordia : 3 * Math.floor((rangoFechas.to.getTime() - rangoFechas.from.getTime())/(1000 * 60 * 60 * 24))}</span>  </p>
                                        </div>)}
                                    </div>
                                    
                                    <button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    Enviar solicitud
                                    </button>

                                </form>
                                </div>
                            </div>
        </>
}