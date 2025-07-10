"use client"

import { getAlquileres } from "@/lib/db/alquileres"
import { getInmuebles } from "@/lib/db/inmuebles"
import { getSolicitudesReserva } from "@/lib/db/solicitudes-reservas"
import { alquiler } from "@/types/alquiler"
import { estadoSolicitud } from "@/types/estado-solicitud"
import { inmueble } from "@/types/inmueble"
import { solicitud } from "@/types/solicitud"
import { user } from "@/types/user"
import { useState, useEffect } from "react"
import toast from 'react-hot-toast';

export default function Alquileres() {
    const [inmuebles, setInmuebles] = useState<inmueble[]>([])
    const [alquileres, setAlquileres] = useState<alquiler[]>([])
    const [inmuebleSeleccionado, setInmuebleSeleccionado] = useState<string>("")
    const [alquileresFiltrados, setAlquileresFiltrados] = useState<alquiler[]>([])
    const [loading, setLoading] = useState(true)
    const [usuario, setUsuario] = useState<user | null>(null); 

    useEffect(() => {
        const usuarioActual = localStorage.getItem("user");
        if (usuarioActual) {
            setUsuario(JSON.parse(usuarioActual));
        }else{
            window.location.replace("/")
            toast.error('No hay sesion iniciada actualmente')
        }
        const cargarDatos = async () => {
            try {
            const [inmueblesData, alquileres] = await Promise.all([
                getInmuebles(),
                getAlquileres()
            ]);
            setInmuebles(inmueblesData || []);
            setAlquileres(alquileres || []);
            console.log(inmueblesData)
            } catch (error) {
            console.error("Error cargando datos:", error);
            } finally {
            setLoading(false);
            }

        };

        cargarDatos();
    }, []);

    const handleCheckout = async (alquiler:alquiler|null|undefined) => {
      const response = await fetch (`/api/reservas/${alquiler?.id}/checkout`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fecha: new Date(),
          checkinid: alquiler?.checkinid,
          comentario: "",
          empleadoid: usuario?.id
        })
      })

      if (response.ok){
        toast.success('Check Out realizado con exito!')
      }else{
        toast.error('Se presento un error en la realizacion del checkout')
      }
    }
    console.log(inmuebleSeleccionado)

    useEffect(() => {
        if (inmuebleSeleccionado) {
            const filtradas = alquileres.filter((alquiler) => String(alquiler.inmuebleid) === inmuebleSeleccionado)
            setAlquileresFiltrados(filtradas)
        } else {
            setAlquileresFiltrados([]) 
        }
    }, [inmuebleSeleccionado, alquileres])

 
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-lg">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-center text-gray-900">Gestión de Solicitudes de Reserva</h1>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Seleccionar Inmueble:</label>
              <select
                value={inmuebleSeleccionado}
                onChange={(e) => setInmuebleSeleccionado(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Selecciona un inmueble para ver sus Alquileres</option>
                {inmuebles.map((inmueble) => (
                  <option key={inmueble.id} value={inmueble.id || ""}>
                    {inmueble.titulo}
                  </option>
                ))}
              </select>
            </div>

            {inmuebleSeleccionado && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Solicitudes para: {inmuebles.find((i) => i.id === inmuebleSeleccionado)?.titulo}
                </h3>

                {alquileresFiltrados.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No hay alquileres para este inmueble</div>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cliente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha Inicio
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha Fin
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Huéspedes
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Monto
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {alquileresFiltrados.map((alquiler) => (
                          <tr key={alquiler.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {alquiler.clienteid}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {alquiler.fechadesde ? new Date(alquiler.fechadesde).toLocaleDateString() : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {alquiler.fechahasta ? new Date(alquiler.fechahasta).toLocaleDateString() : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alquiler.cantidadhuespedes}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${alquiler.costo?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {!alquiler.checkoutid && (
                                <div className="flex gap-2">
                                  <button
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                                    onClick={async () => handleCheckout(alquiler)}
                                  >
                                    checkout
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
