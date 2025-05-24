import { getPago, updateStatePago } from '@/lib/db/pago'
import type { NextApiRequest, NextApiResponse } from 'next'
import { estadoPago } from '@/types/estado-pago' 


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id }, body: {estado}} = req

    if (method == 'GET'){
        const resp = await getPago(id as string)
       res.send(JSON.stringify(resp))
    }
  
    if (method == 'POST'){
        if (estado === estadoPago.exitoso){
            await (await getSolicitudReserva(id as string))
        }
        const resp = await updateStateReserva(estado, id as string)
    }
}