'use client'

import { useEffect, useState } from "react"
import { DayPicker, DateRange } from "react-day-picker"
import { addDays, startOfDay } from "date-fns"
import 'react-day-picker/dist/style.css'
import CuadradoInmueble from "@/components/inmuebles/CuadradoInmueble"
import { inmueble } from "@/types/inmueble"

type Disponibilidad = {
  id: string
  disponibilidad: { desde: string; hasta: string }[]
}

const tipos = ["Todos", "Casa", "Departamento", "Cochera"]


export default function Alquiler() {
  const [inmuebles, setInmuebles] = useState<inmueble[]>([])
  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad[]>([])
  const [filtrados, setFiltrados] = useState<inmueble[]>([])
  const [range, setRange] = useState<DateRange | undefined>()
  const [tipo, setTipo] = useState("Todos")
  const [loading, setLoading] = useState(true)
    const hoy = startOfDay(new Date())
  const minFecha = addDays(hoy, 3)


  useEffect(() => {
    const fetchInmuebles = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/inmueble")
        const data = await res.json()
        console.log(data)
        setInmuebles(data)
        setFiltrados(data)
      } catch (error) {
        console.error("Error al obtener inmuebles:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchInmuebles()
  }, [])

  useEffect(() => {
    const fetchDisponibilidad = async () => {
      try {
        const resDisp = await fetch("/api/disponibilidad")
        const disponibilidadJson = await resDisp.json()
        setDisponibilidad(JSON.parse(disponibilidadJson))
      } catch (err) {
        console.error("Error al obtener disponibilidad:", err)
      }
    }
    fetchDisponibilidad()
  }, [])

  const aplicarFiltro = () => {
    let filtradosTemp = [...inmuebles]

    if (tipo !== "Todos") {
      filtradosTemp = filtradosTemp.filter(inmueble => inmueble.tipo === tipo)
    }

    if (range?.from && range?.to) {
      const desde = new Date(range.from)
      const hasta = new Date(range.to)

      filtradosTemp = filtradosTemp.filter(inmueble => {
        const reservasInmueble = disponibilidad.find(d => d.id === inmueble.id)
        if (!reservasInmueble) return true

        const tieneConflicto = reservasInmueble.disponibilidad?.some(res => {
          const desdeRes = new Date(res.desde)
          const hastaRes = new Date(res.hasta)
          return !(hasta < desdeRes || desde > hastaRes)
        })

        return !tieneConflicto
      })
    }

    setFiltrados(filtradosTemp)
  }

  if (loading) {
    return (
      <div className="flex justify-center mx-auto mt-10 text-lg text-gray-600">
        Cargando inmuebles...
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mt-10 mb-8 text-center text-gray-800">
        Inmuebles en Alquiler
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Tipo de Inmueble</label>
          <select
            value={tipo}
            onChange={e => setTipo(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-60"
          >
            {tipos.map((t, idx) => (
              <option key={idx} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Selector de fechas */}
    <div className="md:col-span-2 lg:col-span-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Rango de Fechas
      </label>
      <div className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          disabled={{ before: minFecha }}
        />
      </div>
    </div>

        <button
          onClick={aplicarFiltro}
          className="bg-blue-600 text-white px-6 py-3 mt-4 lg:mt-0 rounded hover:bg-blue-700 transition"
        >
          Aplicar Filtros
        </button>
      </div>

      {filtrados.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No se encontraron inmuebles con los filtros aplicados.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((element: inmueble) => (
            <div key={element.id}>
              <CuadradoInmueble inmueble={element} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
