'use client'

import { inmueble } from "@/types/inmueble"
import Link from "next/link"
import toast from "react-hot-toast"
import { useState } from "react"
import { estadoInmueble } from "@/types/estado-inmueble"

export default function VerInmueble({ inmueble }: { inmueble: inmueble }) {
  const [estadoActual, setEstadoActual] = useState<estadoInmueble | null>(
  inmueble.estado ?? null
)

  const toggleEstado = async () => {
    const nuevoEstado = estadoActual === estadoInmueble.disponible
      ? estadoInmueble.noDisponible
      : estadoInmueble.disponible

    try {
      const resp = await fetch(`http://localhost:3000/api/inmueble/${inmueble.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: inmueble.id, estado: nuevoEstado })
      })

      if (resp.ok) {
        setEstadoActual(nuevoEstado)
        toast.success("Se cambió el estado con éxito")
      } else {
        toast.error(await resp.text())
      }
    } catch (error) {
      toast.error("Error al cambiar el estado")
    }
  }

  return (
    <div className="shadow-md rounded-lg h-20 flex items-center justify-between m-8 px-8">
      <label className="text-black text-xl">Nombre: {inmueble.titulo}</label>
      <label className="text-black text-xl">Dirección: {inmueble.direccion}</label>
      <label className="text-black text-xl">Estado: {estadoActual}</label>
      <label className="text-black text-xl">Precio: {inmueble.preciopordia}</label>
      <label className="text-black text-xl">Cantidad de huéspedes: {inmueble.cantidadhuespedes}</label>
      <label className="text-black text-xl">Localidad: {inmueble.localidad}</label>

      <button 
        onClick={toggleEstado}
        className={`px-4 py-2 rounded-md text-white font-bold transition ${
          estadoActual === estadoInmueble.disponible
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {estadoActual === estadoInmueble.disponible
          ? "Marcar como No Disponible"
          : "Marcar como Disponible"}
      </button>

      {localStorage.getItem('userType') === "administrador" && (
        <div>
          <Link href={`/AgregarInmueble/${inmueble.id}`}>
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Modificar</button>
          </Link>
        </div>
      )}
    </div>
  )
}