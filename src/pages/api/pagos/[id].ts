import { updateStatePago, getPago } from '@/lib/db/pago'
import { estadoPago } from '@/types/estado-pago'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query: { id, estado }} = req


    if (method == 'GET'){
        const resp = await getPago(id as string)
        res.send(JSON.stringify(resp))
        return 
    }
    if (method == 'POST'){
        const resp = await updateStatePago (estadoPago[estado as keyof typeof estadoPago],id as string)
        return 
    }
    
}