import { getPago, updateStatePago } from '@/lib/db/pago'
import { pagoExitoso } from '@/lib/pagos'
import type { NextApiRequest, NextApiResponse } from 'next'
import { estadoPago } from '@/types/estado-pago' 


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id }, body: {estado}} = req
    const pago = await getPago(id as string)
    if (method == 'GET'){
        
       res.send(JSON.stringify(pago))
    }
  
    if (method == 'POST'){
        if (estado === estadoPago.exitoso){
            await pagoExitoso(pago)
        }
        const resp = await updateStatePago(estado, id as string)
        res.send(JSON.stringify(resp))
    }
}