import { getInmueble, getInmuebles } from '@/lib/db/inmuebles' 
import { getReservas, getReservasPorInmueble } from '@/lib/db/reservas'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query: { id }} = req


    if (method == 'GET'){
        const resp = await getInmueble(id as string)

        console.log(JSON.stringify(resp))
        const rawReservas = await getReservasPorInmueble(id as string);
        const reservas = Array.isArray(rawReservas) ? rawReservas : [rawReservas];

        const disponibilidadInmueble = {
        id: id,
        disponibilidad: reservas.length > 1
            ? reservas.map(reserva => ({
                desde: reserva?.fechadesde,
                hasta: reserva?.fechahasta
            }))
            : {
                desde: reservas[0]?.fechadesde ?? null,
                hasta: reservas[0]?.fechahasta ?? null
            }
        };
        if (!resp){
            res.status(404).send('no se encontro el inmueble sugerido')
        }
        res.status(200).json(disponibilidadInmueble)
    }else{
        return ''
    }
    
}