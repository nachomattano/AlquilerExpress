import { getInmueble, getInmuebles } from '@/lib/db/inmuebles' 
import { getReservas, getReservasPorInmueble } from '@/lib/db/reservas'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query: { id,fechadesde, fechahasta }} = req


    if (method == 'POST'){
        const resp = await getInmuebles()

        console.log(JSON.stringify(resp))
        const todos = (resp)? await Promise.all(
        resp.map(async (inmueble) => {
        const reservas = await getReservasPorInmueble(inmueble.id as string);
            return {
                id: inmueble.id,
                disponibilidad: reservas?.map(res => ({
                desde: res.fechadesde,
                hasta: res.fechahasta
                }))
            };
        })
        ): null
        if (!resp){
            res.status(404).send('no se encontro el inmueble sugerido')
        }
        res.status(200).json(JSON.stringify(todos))
    }else{
        return ''
    }
    
}