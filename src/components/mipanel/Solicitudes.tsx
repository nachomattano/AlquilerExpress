"use client"

import { getInmuebles } from "@/lib/db/inmuebles"
import { getSolicitudesReserva } from "@/lib/db/solicitudes-reservas"
import { estadoSolicitud } from "@/types/estado-solicitud"
import { inmueble } from "@/types/inmueble"
import { solicitud } from "@/types/solicitud"
import { useState, useEffect } from "react"

export default function SolicitudesReserva() {
    const [inmuebles, setInmuebles] = useState<inmueble[]>([])
    const [solicitudes, setSolicitudes] = useState<solicitud[]>([])
    const [inmuebleSeleccionado, setInmuebleSeleccionado] = useState<string>("")
    const [solicitudesFiltradas, setSolicitudesFiltradas] = useState<solicitud[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const cargarDatos = async () => {
            try {
            const [inmueblesData, solicitudesData] = await Promise.all([
                getInmuebles(),
                getSolicitudesReserva()
            ]);
            setInmuebles(inmueblesData || []);
            setSolicitudes(solicitudesData || []);
            console.log(solicitudesData)
            console.log(inmueblesData)
            } catch (error) {
            console.error("Error cargando datos:", error);
            } finally {
            setLoading(false);
            }
        };

        cargarDatos();
    }, []);

    console.log(inmuebleSeleccionado)

    useEffect(() => {
        if (inmuebleSeleccionado) {
            const filtradas = solicitudes.filter((solicitud) => String(solicitud.inmuebleid) === inmuebleSeleccionado)
            setSolicitudesFiltradas(filtradas)
        } else {
            setSolicitudesFiltradas([]) 
        }
    }, [inmuebleSeleccionado, solicitudes])

  const getEstadoBadge = (estado: estadoSolicitud | null | undefined) => {
    switch (estado) {
      case "Pendiente":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            Pendiente
          </span>
        )
      case "Aceptada":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            Aprobada
          </span>
        )
      case "Rechazada":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            Rechazada
          </span>
        )
    case "EsperaPago":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            Espera Pago
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
            Sin estado
          </span>
        )
    }
  }

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
                <option value="">Selecciona un inmueble para ver sus solicitudes</option>
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

                {solicitudesFiltradas.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No hay solicitudes para este inmueble</div>
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
                        {solicitudesFiltradas.map((solicitud) => (
                          <tr key={solicitud.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {solicitud.solicitante}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {solicitud.fechadesde ? new Date(solicitud.fechadesde).toLocaleDateString() : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {solicitud.fechahasta ? new Date(solicitud.fechahasta).toLocaleDateString() : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{solicitud.cantidad}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${solicitud.monto?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{getEstadoBadge(solicitud.estado)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {solicitud.estado === "Pendiente" && (
                                <div className="flex gap-2">
                                  <button
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                                  >
                                    Aceptar
                                  </button>
                                  <button
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                                  >
                                    Rechazar
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
