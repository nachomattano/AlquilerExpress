import { getInmueble } from '@/lib/db/inmuebles' 
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query: { id }} = req


    if (method == 'GET'){
        const resp = await getInmueble(id as string)
        console.log(JSON.stringify(resp))
        res.status(200).json(JSON.stringify(resp))
    }else{
        return ''
    }
    
}