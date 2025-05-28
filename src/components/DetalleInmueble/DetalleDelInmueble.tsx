'use client'

import { inmueble } from '@/types/inmueble';
import Link from 'next/link';


import { useSearchParams } from "next/navigation";
import { useState } from 'react';

export default function DetalleDelInmueble({inmueble}:{inmueble:string}){
    let inmuebles:inmueble = JSON.parse(inmueble)
    const [ isOpen, setIsOpen ] = useState(false)
    const [ isOp, setIsOp ] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    }
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [emailAcom, setEmailAcom] = useState("")
    const [dni, setDni] = useState("")
    return (<>
        
            

                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="bg-white rounded-xl shadow-md p-8 space-y-4 w-full ">
                        <div className="space-y-4">
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Título: {inmuebles?.titulo}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Ciudad: {inmuebles?.ciudad}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Localidad: {inmuebles?.localidad}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Cantidad de huéspedes: {inmuebles?.cantidadHuespedes}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Dirección: {inmuebles?.direccion}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Descripción: {inmuebles?.descripcion}</label>
                        </div>
                        <div className="pt-4 flex justify-center">
                            <Link href="/solicitarreserva">
                            <button className="bg-black hover:bg-gray-700 text-white w-48 py-2 rounded-xl">
                                Alquilar
                            </button>
                            </Link>
                        </div>

                    </div>
                </div>
        </>)
}   