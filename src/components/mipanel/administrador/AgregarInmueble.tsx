'use client'

import { useState } from "react"

export default function AgregarInmueble() {
    const [titulo, setTitulo] = useState("")
    const [ciudad, setCiudad] = useState("")
    const [localidad, setLocalidad] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [dpto, setDpto] = useState("")
    const [espacioCochera, setEspacioCochera] = useState("")
    const [cantidadHuespedes, setCantHuespedes] = useState("")
    const [direccion, setDireccion] = useState("")
    const [tipo, setTipo] = useState("")

    const [imagen, setImagen] = useState("")

    const [semanaAnterior, setSemanaAnterior] = useState("")
    const [diasAnteriores, setdiasAnteriores] = useState("")
    const [mismoDia, setMismoDia] = useState("")
    const [fechaMaxima, setFechaMaxima] = useState("")


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/inmueble', {
            method: 'POST',
            body: JSON.stringify({cantidadhuespedes:cantidadHuespedes,titulo, espaciocochera:espacioCochera, dpto , direccion, localidad, ciudad, tipo, descripcion, semanaanterior:semanaAnterior, diasanteriores:diasAnteriores, mismodia:mismoDia, fechamaxima: fechaMaxima, imagen}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            alert ('Empleado Creado con Exito!')// o a donde quieras ir
        } else {
            alert(await res.text());
        }
    }
    
    return (
        <div className="bg-white rounded-lg">
            <div className="p-6 space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">Agregar Inmueble</h1>
                <p>Ingresar los datos solicitados del inmueble.</p>
            </div>
            <div className="p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="titulo" className="text-sm font-medium text-gray-700">
                        Titulo del Inmueble
                        </label>
                        <input
                        id="titulo"
                        type="text"
                        placeholder=""
                        required
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="ciudad" className="text-sm font-medium text-gray-700">
                            Ciudad 
                        </label>
                        <input
                        id="ciudad"
                        type="text"
                        placeholder=""
                        required
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="localidad" className="text-sm font-medium text-gray-700">
                                Localidad
                            </label>
                            <input
                                id="localidad"
                                type="text"
                                placeholder=""
                                required
                                value={localidad}
                                onChange={(e) => setLocalidad(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="semanaAnterior" className="text-sm font-medium text-gray-700">
                            Porcentaje de devolucion Semana Anterior
                            </label>
                            <input
                            id="semanaAnterior"
                            type="number"
                            max="100"
                            placeholder=""
                            required
                            value={semanaAnterior}
                            onChange={(e) => setSemanaAnterior(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>  

                        <div className="space-y-2">
                            <label htmlFor="diasAnteriores" className="text-sm font-medium text-gray-700">
                            Porcentaje de devolucion Dias Anteriores 
                            </label>
                            <input
                            id="diasAnteriores"
                            type="number"
                            max="100"
                            required
                            value={diasAnteriores}
                            onChange={(e) => setdiasAnteriores(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>  

                        <div className="space-y-2">
                            <label htmlFor="mismoDia" className="text-sm font-medium text-gray-700">
                            Porcentaje de devolucion Mismo Dia de Reserva
                            </label>
                            <input
                            id="mismoDia"
                            type="number"
                            max="100"
                            required
                            value={mismoDia}
                            onChange={(e) => setMismoDia(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>  

                        <div className="space-y-2">
                            <label htmlFor="" className="text-sm font-medium text-gray-700">
                            Periodo Maximo a Solicitar una Reserva Inmueble (ejemplo "1 mes")
                            </label>
                            <input
                            id="titulo"
                            type="number"
                            min={1}
                            placeholder=""
                            required
                            value={fechaMaxima}
                            onChange={(e) => setFechaMaxima(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>  

                        <div className="space-y-2">
                            <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
                                Descripcion
                            </label>
                            <input
                                id="descripcion"
                                type="text"
                                placeholder=""
                                required
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="dpto" className="text-sm font-medium text-gray-700">
                                Numero de Departamento (en caso de ser departamento)
                            </label>
                            <input
                                id="dpto"
                                type="text"
                                placeholder=""
                                value={dpto}
                                onChange={(e) => setDpto(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="cantidadHuespedes" className="text-sm font-medium text-gray-700">
                                Cantidad de Huespedes
                            </label>
                            <input
                                id="cantidadHuespedes"
                                type="number"
                                placeholder=""
                                value={cantidadHuespedes}
                                onChange={(e) => setCantHuespedes(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                            <label htmlFor="espacioCochera" className="text-sm font-medium text-gray-700">
                                Espacio en la cochera (en caso de tener)
                            </label>
                            <input
                                id="espacioCochera"
                                type="number"
                                placeholder=""
                                value={espacioCochera}
                                onChange={(e) => setEspacioCochera(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                    <div className="space-y-2">
                            <label htmlFor="direccion" className="text-sm font-medium text-gray-700">
                                Direccion
                            </label>
                            <input
                                id="direccion"
                                type="text"
                                placeholder=""
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                    </div>

                    <div className="space-y-2">
                            <label htmlFor="tipo" className="text-sm font-medium text-gray-700">
                                Tipo de Inmueble
                            </label>
                            <input
                                id="tipo"
                                type="text"
                                placeholder=""
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                    <div className="space-y-2">
                            <label htmlFor="imagen" className="text-sm font-medium text-gray-700">
                                Imagen
                            </label>
                            <input
                                id="imagen"
                                type="text"
                                placeholder="https://..."
                                value={imagen}
                                onChange={(e) => setImagen(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Crear Inmueble
                    </button>
                </form>
            </div>
        </div>
    )
}