import { getAdministrador } from '@/lib/db/usuarios/administradores'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query: { id }} = req


    if (method !== 'GET'){
        const resp = await getAdministrador(id as string)
    res.send(JSON.stringify(resp))
    }else{
        return ''
    }
    
}