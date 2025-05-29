'use client'

import { inmueble } from '@/types/inmueble';
import { solicitud } from '@/types/solicitud';
import Link from 'next/link';


export default function DetalleSolicitud({solicitud}:{solicitud:solicitud}){
    console.log(solicitud)
    //let solicitudes:solicitud = JSON.parse(solicitud)
    
    return (<>
        
            

                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="bg-white rounded-xl shadow-md p-8 space-y-4 w-full ">
                        <div className="space-y-4">
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Cliente: {solicitud?.solicitante}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Fecha Inicio: {new Date (solicitud.fechadesde? solicitud.fechadesde: new Date()).toLocaleDateString()}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Fecha Fin: {new Date (solicitud.fechahasta? solicitud.fechahasta: new Date()).toLocaleDateString()}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Cantidad de Huespedes: {solicitud?.cantidad}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Acompañantes: {solicitud?.acompañantesid}</label>
                        </div>
                        <div className="pt-4 flex justify-center">
                            <button className="bg-black hover:bg-gray-700 text-white w-48 py-2 rounded-xl">
                                Aceptar
                            </button>
                            <button className="bg-black hover:bg-gray-700 text-white w-48 py-2 rounded-xl">
                                Rechazar
                            </button>
                        </div>

                    </div>
                </div>
        </>)
}   