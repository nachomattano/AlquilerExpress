import { getCliente } from '@/lib/db/usuarios/clientes'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id }} = req

    if (method !== 'GET'){
        const resp = await getCliente (id as string)
    res.send(JSON.stringify(resp))
    }else{
        return ''
    }
    
}