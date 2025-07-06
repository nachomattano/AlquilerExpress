
import { getAlquiler } from '@/lib/db/alquileres'
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(req:NextApiRequest,res:NextApiResponse){

    const {method, query:{ id }, body: {}} = req

    
    if (method == 'GET'){
        const resp = await getAlquiler(id as string)  
        console.log(JSON.stringify(resp))  
        res.status(200).send(JSON.stringify(resp))
        return 
    }
    res.status(500)
}