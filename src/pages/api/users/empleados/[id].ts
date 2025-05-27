import { getEmpleado } from '@/lib/db/usuarios/empleados'
import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id }} = req


    if (method !== 'GET'){
        const resp = await getEmpleado (id as string)
    res.send(JSON.stringify(resp))
    }else{
        return ''
    }
    
}