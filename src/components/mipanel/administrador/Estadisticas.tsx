'use client'

import toast from "react-hot-toast"
import { useState, useEffect } from "react"

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts'
import { inmueble } from "@/types/inmueble";
import { alquiler } from "@/types/alquiler";
import { reserva } from "@/types/reserva";
import { solicitud } from "@/types/solicitud";
import { getReservas } from "@/lib/db/reservas";
import { getSolicitudesReserva } from "@/lib/db/solicitudes-reservas";
import { getInmuebles } from "@/lib/db/inmuebles";
import { getAlquileres } from "@/lib/db/alquileres";
import { user } from "@/types/user";
import { getClientes } from "@/lib/db/usuarios/clientes";

type chartData = {
  tipo: string;
  ganancia: number;
};

const tipos = ["casa", "departamento", "cochera", "oficina"]
const estadisticas = ["Ganancia Por Tipo de Inmueble", "Inmuebles con mas solicitudes", "Ganancias en el Último Año", "Ganancias por Cliente"]

export default function Estadisticas(){
    const [ estadisticaSeleccionada, setEstadisticaSeleccionada ] = useState <string>("")
    const [ data, setData ] = useState <chartData[]>()
    const [ inmuebles, setInmuebles ] = useState<inmueble[]|null|undefined>([])
    const [ alquileres, setAlquileres ] = useState<alquiler[]|null|undefined>([])
    const [ reservas, setReservas ] = useState<reserva[]|null|undefined>([])
    const [ solicitudes, setSolicitudes ] = useState<solicitud[]|null|undefined>([])
    const [ clientes, setClientes ] = useState<user[]|null|undefined>([])
    const [ togle, setToggle ] = useState<boolean>(false)

    useEffect(()=>{
        const cargarDatos = async () => {
                    try {
                    const [inmueblesData, solicitudesData, reservasData, alquileresData, clientesData] = await Promise.all([
                        getInmuebles(),
                        getSolicitudesReserva(),
                        getReservas(),
                        getAlquileres(),
                        getClientes()
                    ]);
                    setInmuebles(inmueblesData || []);
                    setSolicitudes(solicitudesData || []);
                    setAlquileres(alquileresData)
                    setReservas(reservasData)
                    setClientes(clientesData)
                    } catch (error) {
                    console.error("Error cargando datos:", error);
                    } finally {
                    }
        
                };
        cargarDatos()
    },[])

    const handleEstadistica = async () => {
        console.log(estadisticaSeleccionada)
        console.log(estadisticaSeleccionada == "Ganancia Por Tipo de Inmueble")
        let data:chartData[]
        if (estadisticaSeleccionada == "Ganancia Por Tipo de Inmueble"){
            data = tipos.map((tipo) => ({ tipo, ganancia: 0 }));

            alquileres?.forEach((alquiler) => {
                const inmueble = inmuebles?.find(i => i.id === alquiler.inmuebleid);
                if (inmueble) {
                    const tipo = inmueble.tipo?.toLowerCase(); // asegúrate que "tipo" está bien escrito
                    const index = data.findIndex(d => d.tipo === tipo);
                    if (index !== -1) {
                        data[index].ganancia += alquiler.costo || 0;
                    }
                }
            });
            setData(data)
            console.log(`Data final -> ${data}`)
        }
        if (estadisticaSeleccionada == "Ganancias en el Último Año"){
            const hoy = new Date();
            const inicio = new Date(hoy.getFullYear(), hoy.getMonth() - 11, 1); // hace 12 meses

            // Inicializar con 0 cada mes
            const gananciasPorMes: { [mes: string]: number } = {};
            for (let i = 0; i < 12; i++) {
                const fecha = new Date(inicio.getFullYear(), inicio.getMonth() + i, 1);
                const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`; // "2025-07"
                gananciasPorMes[clave] = 0;
            }

            alquileres?.forEach((alquiler) => {
                const fecha = new Date(alquiler.fechadesde??"");
                const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
                if (clave in gananciasPorMes) {
                    gananciasPorMes[clave] += alquiler.costo || 10000;
                }
            });

            reservas?.forEach((reserva) => {
                const fecha = new Date(reserva.fechadesde??"");
                const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
                if (clave in gananciasPorMes) {
                    gananciasPorMes[clave] += reserva.costo || 10000;
                }
            });

            // Convertir a chartData[]
            data = Object.entries(gananciasPorMes).map(([mes, ganancia]) => ({
                tipo: mes, // podés formatearlo mejor si querés "Jul 2025"
                ganancia
            }));
            setData(data)
        }
        if (estadisticaSeleccionada == "Inmuebles con mas solicitudes"){
            const conteoSolicitudes: { [inmuebleid: string]: number } = {};

            solicitudes?.forEach((solicitud) => {
                const id = solicitud.inmuebleid?? 0;
                conteoSolicitudes[id] = (conteoSolicitudes[id] || 0) + 1;
            });
            data = Object.entries(conteoSolicitudes).map(([id, cantidad]) => {
                console.log(id)
                const inmueble = inmuebles?.find(i => i.id == id);
                return {
                    tipo: inmueble?.titulo || "inmueble",
                    ganancia: cantidad // en este caso representa cantidad
                };
            });
            setData(data)
        }
        if ( estadisticaSeleccionada == "Ganancias por Cliente"){
            const gananciasPorCliente: { [clienteId: string]: number } = {};

            alquileres?.forEach((alquiler) => {
                const id = alquiler.clienteid??0;
                if (!gananciasPorCliente[id]) gananciasPorCliente[id] = 0;
                gananciasPorCliente[id] += alquiler.costo || 10000;
            });

            reservas?.forEach((reserva) => {
                const id = reserva.solicitante??0;
                if (!gananciasPorCliente[id]) gananciasPorCliente[id] = 0;
                gananciasPorCliente[id] += reserva.costo || 10000;
            });

            data = Object.entries(gananciasPorCliente).map(([clienteId, ganancia]) => {
                console.log(clienteId)
                const cliente = clientes?.find(c => c.id == clienteId);
                const nombre = cliente ? `${cliente.nombre}` : `Cliente ${clienteId}`;
                return {
                    tipo: nombre,
                    ganancia
                };
            });
            setData(data)
        }
        setToggle(!togle)
    }

    return (<>
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white rounded-lg shadow-md border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-center text-gray-900">Estadisticas</h1>

                        <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Seleccionar Estadistica:</label>
                        <select
                            value={estadisticaSeleccionada}
                            onChange={(e) => setEstadisticaSeleccionada(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Selecciona una estadistica</option>
                            {estadisticas.map((estadistica) => (
                            <option key={estadistica} value={estadistica || ""}>
                                {estadistica}
                            </option>
                            ))}
                        </select>
                        </div>
                        <button onClick={handleEstadistica}>
                            Aplicar Estadistica
                        </button>


                        {(estadisticaSeleccionada !== "" && togle) && (
                            <div className="w-full h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="tipo" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="ganancia" fill="#8884d8" />
                                </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
        
        
                    </div>
                </div>
            </div>
        </div>
    </>)
}