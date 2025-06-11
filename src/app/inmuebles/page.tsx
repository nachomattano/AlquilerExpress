'use client'

import { useEffect, useState } from "react"
import { DayPicker, DateRange } from "react-day-picker"
import 'react-day-picker/dist/style.css'
import CuadradoInmueble from "@/components/inmuebles/CuadradoInmueble"
import { inmueble } from "@/types/inmueble"

type Disponibilidad = {
  id: string
  disponibilidad: { desde: string; hasta: string }[]
}

export default function Alquiler() {
  const [inmuebles, setInmuebles] = useState<inmueble[]>([])
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad[]>([])
  const [filtrados, setFiltrados] = useState<inmueble[]>([])
  const [range, setRange] = useState<DateRange | undefined>()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInmuebles = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/inmueble");
        const data = await res.json();
        setInmuebles(data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      } finally {
        setLoading(false);
      }
    };
 
    console.log(inmuebles)
    fetchInmuebles();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDisp = await fetch("/api/disponibilidad")
        const disponibilidadJson = await resDisp.json()
        setDisponibilidad(JSON.parse(disponibilidadJson))
      } catch (err) {
        console.error("Error al obtener datos:", err)
      }
    }
    console.log(disponibilidad)

    fetchData()
  }, [])

  const aplicarFiltro = () => {
    if (!range?.from || !range?.to) return

    const desde = new Date(range.from)
    const hasta = new Date(range.to)

    const disponibles = inmuebles.filter(inmueble => {
      const reservasInmueble = disponibilidad.find(d => d.id === inmueble.id)
      if (!reservasInmueble) return true

      const tieneConflicto = reservasInmueble.disponibilidad?.some(res => {
        const desdeRes = new Date(res.desde)
        const hastaRes = new Date(res.hasta)
        return !(hasta < desdeRes || desde > hastaRes)
      })

      return !tieneConflicto
    })

    setFiltrados(disponibles)
  }

  if (loading) return <div className="flex justify-center mx-auto mt-10">Cargando inmuebles...</div>

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mt-10 mb-8 text-center">Inmuebles en Alquiler</h1>

      <div className="flex flex-col items-center gap-4 mb-6">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
        />
        <button
          onClick={aplicarFiltro}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filtrar por Fechas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inmuebles.map((element: inmueble) => (
          <div key={element.id}>
            <CuadradoInmueble inmueble={element} />
          </div>
        ))}
      </div>
    </div>
  )
}
