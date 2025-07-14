import { useState } from "react"
import toast from "react-hot-toast"

export default function CrearReservaManual() {
    const [fechadesde, setFechadesde] = useState('')
    const [fechahasta, setFechahasta] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [solicitante, setSolicitante] = useState('')
    const [acompañantesid, setAcompañantesId] = useState('')
    const [pagoid, setPagoid] = useState('')
    const [estado, setEstado] = useState('Vigente')
    const [inmuebleid, setInmuebleid] = useState('')
    const [costo, setCosto] = useState('')

    console.log(estado)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            fechadesde: new Date(fechadesde),
            fechahasta: new Date(fechahasta),
            cantidad: parseInt(cantidad),
            solicitante,
            acompañantesid: acompañantesid ? acompañantesid.split(',') : [],
            pagoid: pagoid || null,
            estado,
            inmuebleid,
            costo: parseFloat(costo),
        }

        const res = await fetch('/api/reservas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(data),
        })
        console.log(JSON.stringify(res))
        if (res.ok) {
            toast.success("Reserva creada correctamente")
        } else {
            toast.error("Error al crear la reserva")
        }
    }

    return (
        <div className="bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Crear Reserva</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Fecha desde</label>
                <input type="date" value={fechadesde} onChange={(e) => setFechadesde(e.target.value)} required
                className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Fecha hasta</label>
                <input type="date" value={fechahasta} onChange={(e) => setFechahasta(e.target.value)} required
                className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Cantidad de personas</label>
                <input type="number" min={1} value={cantidad} onChange={(e) => setCantidad(e.target.value)} required
                className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Solicitante (email o id)</label>
                <input type="text" value={solicitante} onChange={(e) => setSolicitante(e.target.value)} required
                className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">ID Acompañantes (opcional, separados por coma)</label>
                <input type="text" value={acompañantesid} onChange={(e) => setAcompañantesId(e.target.value)}
                className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Pago ID (opcional)</label>
                <input type="text" value={pagoid} onChange={(e) => setPagoid(e.target.value)}
                className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Estado</label>
                <select value={estado} onChange={(e) => setEstado(e.target.value)}
                className="w-full px-3 py-2 border rounded-md">
                    <option value="Vigente">Vigente</option>
                    <option value="Efectuada">Efectuada</option>
                    <option value="Cancelada">Cancelada</option>
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">ID Inmueble</label>
                <input type="text" value={inmuebleid} onChange={(e) => setInmuebleid(e.target.value)} required
                className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Costo total</label>
                <input type="number" min={0} value={costo} onChange={(e) => setCosto(e.target.value)} required
                className="w-full px-3 py-2 border rounded-md" />
            </div>
            </div>

            <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
            Crear Reserva
            </button>
        </form>
        </div>
    )
}
