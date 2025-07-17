"use client"

import { getInmuebles } from "@/lib/db/inmuebles"
import { getReservas } from "@/lib/db/reservas"
import { estadoReserva } from "@/types/estado-reservas"
import { inmueble } from "@/types/inmueble"
import { reserva } from "@/types/reserva"
import { typeUser, user } from "@/types/user"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"

export default function VerReservas() {
    const [inmuebles, setInmuebles] = useState<inmueble[]>([])
    const [reservas, setReservas] = useState<reserva[]>([])
    const [inmuebleSeleccionado, setInmuebleSeleccionado] = useState<string>("")
    const [reservasFiltradas, setReservasFiltradas] = useState<reserva[]>([])
    const [loading, setLoading] = useState(true)
    const [ rol, setRol ] = useState<typeUser | null >(null)
    const [ cliente, setCliente ] = useState<user | null>(null);

    useEffect(() => {
      const storedRol = localStorage.getItem('userType') as typeUser | null
      setRol(storedRol)

      const usuarioActual = localStorage.getItem('user')
      if (usuarioActual) {
        setCliente(JSON.parse(usuarioActual))
      } else {
        window.location.replace("/")
        toast.error('No hay sesion iniciada actualmente')
      }
        const cargarDatos = async () => {
          try {
            const [inmueblesDataRaw, reservasDataRaw] = await Promise.all([
              getInmuebles(),
              getReservas()
            ]);

            const inmueblesData = inmueblesDataRaw || [];
            const reservasData = reservasDataRaw || [];

            setReservas(reservasData || []);
            console.log(reservasData)

            if (storedRol == 'cliente' && usuarioActual) {
              const user = JSON.parse(usuarioActual)
              const reservasCliente = reservasData.filter(
                (r) => r.solicitante === user.id
              )

              const idsInmueblesReservados = [...new Set(reservasCliente.map(r => r.inmuebleid))]
              const inmueblesFiltrados = inmueblesData.filter(
                (i) => idsInmueblesReservados.includes(i.id)
              )
              setInmuebles(inmueblesFiltrados)
            } else {
              setInmuebles(inmueblesData)
            }

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
          let filtradas = reservas
            .filter((reserva) => String(reserva.inmuebleid) === inmuebleSeleccionado)
            .sort((a, b) => {
              const fechaA = new Date(a.fechadesde || "").getTime()
              const fechaB = new Date(b.fechadesde || "").getTime()
              return fechaA - fechaB
            })
          if (rol == 'cliente') {
            filtradas = reservas.filter((r) => String(r.inmuebleid) === inmuebleSeleccionado && r.solicitante == cliente?.id)
          }
          setReservasFiltradas(filtradas)
        }
    }, [inmuebleSeleccionado, reservas])

  const getEstadoBadge = (estado: estadoReserva | null | undefined) => {
    switch (estado) {
      case "Efectuada":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            Efectuada
          </span>
        )
      case "Vigente":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            Vigente
          </span>
        )
      case "Cancelada":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            Cancelada
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

  const checkIn = async (fecha: Date | null | undefined, idReserva: String | null | undefined) => {
    if (!fecha || !idReserva) return

    const empleadoStr = localStorage.getItem("user")
    if (!empleadoStr) {
      console.error("Empleado no logueado.")
      return
    }

    const empleado = JSON.parse(empleadoStr)
    console.log(`esta ensalada de mierda -> ${JSON.stringify(empleadoStr)} \n ${idReserva}`)
    try {
      const res = await fetch(`/api/reservas/${idReserva}/checkin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha: fecha,
          empleadoid: empleado.id
        }),
      })

      if (res.ok) {
        toast.success("Check-in realizado correctamente.");
        console.log("Check-in realizado correctamente.")
      } else {
        toast.error("Error en el check-in")
        console.error("Error en el check-in")
      }
    } catch (error) {
      console.error("Error en la solicitud:", error)
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
            <h1 className="text-2xl font-bold text-center text-gray-900">Gestión de Reservas</h1>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Seleccionar Inmueble:</label>
              <select
                value={inmuebleSeleccionado}
                onChange={(e) => setInmuebleSeleccionado(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Selecciona un inmueble para ver sus reservas</option>
                {inmuebles.map((inmueble) => (
                  <option key={inmueble.id} value={inmueble.id || ""}>
                    {inmueble.titulo}
                  </option>
                ))}
              </select>
            </div>

            {inmuebleSeleccionado && (
              <div className="space-y-4">
                {reservasFiltradas.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No hay reservas para este inmueble</div>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha Inicio
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha Fin
                          </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Precio
                            </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cantidad de Huéspedes
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Solicitante
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          {rol !== 'cliente' &&
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Acciones
                            </th>
                          }
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reservasFiltradas.map((reserva) => (
                          <tr key={reserva.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {reserva.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {reserva.fechadesde ? new Date(reserva.fechadesde).toLocaleDateString() : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {reserva.fechahasta ? new Date(reserva.fechahasta).toLocaleDateString() : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              ${reserva.costo?.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {reserva.cantidad}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {reserva.solicitante}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{getEstadoBadge(reserva.estado)}</td>
                            {rol !== 'cliente' && (
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                {reserva.estado === "Vigente" && (
                                  <div className="flex gap-2">
                                    <button
                                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                                      onClick={() => checkIn(reserva.fechadesde, reserva.id)}
                                    >
                                      Check In
                                    </button>
                                  </div>
                                )}
                              </td>
                            )}
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
