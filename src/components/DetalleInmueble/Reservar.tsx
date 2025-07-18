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

    const [disponibilidad, setDisponibilidad] = useState<DateRange[]>([]);
    const [acompanantes, setAcompanantes] = useState<string[]>([]);
    const [ inmueble, setInmueble ] = useState<inmueble|null|undefined>()
    const [usuario, setUsuario] = useState<user | null>(null); 
    const hoy = startOfDay(new Date())
    const minFecha = addDays(hoy, 3)
    const [cantidadTotal, setCantidad] = useState<number> (1); 
    const [cantidadPermitida, setCantidadP] = useState<number> (1);
    const [cantidadRestante, setCantRestante] = useState<number> (1);  
    const [ cantidadMenores, setCantidadMenores ] = useState<number>(0)
    const [ cantidadMayores, setCantidadMayores ] = useState<number>(0)


    useEffect(() => {
        const usuarioActual = localStorage.getItem("user");
        if (usuarioActual) {
            setUsuario(JSON.parse(usuarioActual));
        }else{
            window.location.replace("/")
            toast.error('No hay sesion iniciada actualmente')
        }

        const fetchClientes = async () => {
            try {
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
                setCantRestante(cantidad-cantidadTotal)
                console.log(cantidadRestante)
                setInmueble(inmu)
                setDisponibilidad(rangosNoDisponibles);
            } catch (error) {
                console.error("Error al obtener disponibilidad:", error);
            }
        };

        fetchClientes();
    }, []);

 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!usuario?.id) {
            toast.error("No se pudo identificar al usuario actual.");
            return;
        }
        let cantHuespedes = inmueble?.cantidadhuespedes? inmueble.cantidadhuespedes:3
        console.log(cantHuespedes < cantidadTotal)
        if(cantHuespedes < cantidadTotal){
           toast.error("Maximo de huespedes superado")
           return; 
        }

        
        console.log
        const res = await fetch('/api/solicitudes', {
            method: 'POST',
            body: JSON.stringify({
                fechahasta: rangoFechas?.to,
                fechadesde: rangoFechas?.from,
                mail: usuario?.mail,
                dni: usuario?.dni,
                nombre: usuario?.nombre,
                inmuebleid: id,
                solicitante: usuario?.id, 
                cantidad: cantidadTotal,
                monto: (inmueble && inmueble.preciopordia? inmueble.preciopordia : 3) * (Math.floor(((rangoFechas && rangoFechas.to? rangoFechas.to.getTime(): 2) - (rangoFechas && rangoFechas?.from?  rangoFechas.from.getTime() : 1))/(1000 * 60 * 60 * 24)))
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
                                   
                                    
        
                                    
                                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
                                    {cantidadTotal > 0 && (
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-lg text-green-700">Acompañantes agregados:</h3>
                                        <ul className="list-disc list-inside text-gray-800 mt-2">
                                      
                                            <li key={1}>
                                                Cantidad de acompañantes {cantidadMayores}
                                            </li>

                                        </ul>
                                    </div>
                                    )}

                                    </div>
                                    
                                    
                                    
                                    <div className="space-y-4">

                    
                                            <div className="space-y-2">
                                                <label htmlFor="cantidadMayores" className="flex font-medium text-gray-700">
                                                    Cantidad De Acompañantes
                                                </label>
                                                <input
                                                    id="cantidadMayores"
                                                    type="number"
                                                    min={0}
                                                    disabled={cantidadRestante==0}
                                                    placeholder=""
                                                    value={cantidadMayores}
                                                    onChange={(e) => {let event; if (parseInt (e.target.value) < cantidadMayores ) event= -1; else event=+1; setCantidadMayores(parseInt(e.target.value)); setCantidad(cantidadTotal+event);  event == -1? setCantRestante(cantidadRestante+1) : setCantRestante(cantidadRestante-1);console.log(cantidadRestante)}}
                                                    className="w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                               
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
                                        <p>Monto por dia: <span>{inmueble && inmueble.preciopordia? inmueble.preciopordia *  (Math.floor(((rangoFechas && rangoFechas.to? rangoFechas.to.getTime(): 2) - (rangoFechas && rangoFechas?.from?  rangoFechas.from.getTime() : 1))/(1000 * 60 * 60 * 24))): 3}$</span>  </p>
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