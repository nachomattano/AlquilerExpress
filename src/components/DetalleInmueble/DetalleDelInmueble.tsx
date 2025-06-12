'use client'

import { inmueble } from '@/types/inmueble';
import Link from 'next/link';


import { useSearchParams } from "next/navigation";
import { useState } from 'react';

export default function DetalleDelInmueble({inmueble}:{inmueble:inmueble}){
 
    
    return (<>
        
            

                <div className="flex justify-center items-center min-h-screen bg-gray-50">
                    <div className="bg-white rounded-xl shadow-md p-8 space-y-4 w-full ">
                        <img
                            src={inmueble?.imagen ?? ""}
                            alt="Imagen del inmueble"
                            className="w-100 h-100 rounded-t-lg"
                        />
                        <div className="space-y-4">
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Título: {inmueble?.titulo}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Ciudad: {inmueble?.ciudad}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Localidad: {inmueble?.localidad}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Cantidad de huéspedes: {inmueble?.cantidadhuespedes}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Dirección: {inmueble?.direccion}</label>
                            <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Descripción: {inmueble?.descripcion}</label>
                        </div>
                        <div className="pt-4 flex justify-center">
                            <Link href={`/solicitarreserva/${inmueble?.id}`}>
                            <button className="bg-black hover:bg-gray-700 text-white w-48 py-2 rounded-xl">
                                Alquilar
                            </button>
                            </Link>
                        </div>

                    </div>
                </div>
        </>)
}   