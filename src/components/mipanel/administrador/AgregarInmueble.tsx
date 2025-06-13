'use client'

import { existeNombre } from "@/lib/db/inmuebles"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AgregarInmueble({id}:{id?: string | undefined}) {
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
    const [periodominimo, setFechaMaxima] = useState("")
    const [preciopordia, setPrecio] = useState("")
    const isEditing = Boolean(id)
useEffect(() => {
    if (!isEditing) return;
    console.log(id)
    const fetchInmueble = async () => {
        const res = await fetch(`/api/inmueble/${id}`);
        const data = await res.json();
        
        setTitulo(data.titulo);
        setCiudad(data.ciudad);
        setLocalidad(data.localidad);
        setDescripcion(data.descripcion);
        setDpto(data.dpto);
        setEspacioCochera(data.espaciocochera);
        setCantHuespedes(data.cantidadhuespedes);
        setDireccion(data.direccion);
        setTipo(data.tipo);
        setImagen(data.imagen);
        setSemanaAnterior(data.semanaanterior);
        setdiasAnteriores(data.diasanteriores);
        setMismoDia(data.mismodia);
        setFechaMaxima(data.duracionminima);
        setPrecio(data.preciopordia);
        console.log("TITULOOOOO", data.titulo)
    };

    fetchInmueble();
}, [id]);
 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(isEditing){
        console.log("estoy editando")
        const res = await fetch(`/api/inmueble/${id}`, {
            method: 'PUT',
            body: JSON.stringify({cantidadhuespedes:cantidadHuespedes,titulo, espaciocochera:espacioCochera, dpto , direccion, localidad, ciudad, tipo, descripcion, semanaanterior:0, diasanteriores:0, mismodia:0, duracionminima: periodominimo, preciopordia, imagen}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            alert ('Inmueble Creado con Exito!')// o a donde quieras ir
        } else {
            alert(await res.text());
        }
        }else{
            const existeInmueble = await existeNombre(titulo)
            console.log(JSON.stringify(existeInmueble))
            if (!existeInmueble){
                const res = await fetch('/api/inmueble', {
                method: 'POST',
                body: JSON.stringify({cantidadhuespedes:cantidadHuespedes,titulo, espaciocochera:espacioCochera, dpto , direccion, localidad, ciudad, tipo, descripcion, semanaanterior:0, diasanteriores:0, mismodia:0, duracionminima: periodominimo, preciopordia, imagen}),
                headers: { 'Content-Type': 'application/json' }
                });

                if (res.ok) {
                    toast.success ('Inmueble Creado con Exito!')// o a donde quieras ir
                } else {
                    toast.error(await res.text());
                }
            }else{
                toast.error("El nombre ingresado para el inmueble ya se encuentra registrado en el sistema")
            }
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
                        value={titulo ?? ''}
                        disabled={isEditing}
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
                        value={ciudad ?? ''}
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
                                value={localidad ?? ''}
                                onChange={(e) => setLocalidad(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="preciopordia" className="text-sm font-medium text-gray-700">
                            Precio Por Dia
                            </label>
                            <input
                            id="preciopordia"
                            type="number"
                            min={1}
                            placeholder=""
                            required
                            value={preciopordia ?? ''}
                            onChange={(e) => setPrecio(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>  

                        <div className="space-y-2">
                            <label htmlFor="" className="text-sm font-medium text-gray-700">
                            Duracion minima de una Reserva (en dias)
                            </label>
                            <input
                            id="titulo"
                            type="number"
                            min={2}
                            placeholder=""
                            required
                            value={periodominimo ?? ''}
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
                                value={descripcion ?? ''}
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
                                value={dpto ?? ''}
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
                                min={1}
                                value={cantidadHuespedes ?? ''}
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
                                min={0}
                                value={espacioCochera ?? ''}
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
                                value={direccion ?? ''}
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
                                value={tipo ?? ''}
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
                                value={imagen ?? ''}
                                onChange={(e) => setImagen(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                    {isEditing && "Modificar Inmueble"}    {!isEditing && "Crear Inmueble"}
                    </button>
                </form>
            </div>
        </div>
    )
}