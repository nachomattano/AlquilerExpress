import { getInmueble, getInmuebles } from '@/lib/db/inmuebles' 
import { getReservas, getReservasPorInmueble } from '@/lib/db/reservas'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query: { id }} = req


    if (method == 'GET'){
        const resp = await getInmueble(id as string)

        console.log(JSON.stringify(resp))
        const reservas = await getReservasPorInmueble(id as string);

        const disponibilidadInmueble = {
        id: id,
        disponibilidad: reservas?.map(reserva => ({
            desde: reserva.fechadesde,
            hasta: reserva.fechahasta
        }))
        };
        if (!resp){
            res.status(404).send('no se encontro el inmueble sugerido')
        }
        res.status(200).json(disponibilidadInmueble)
    }else{
        return ''
    }
    
}