import { getInmuebles, createInmueble } from '@/lib/db/inmuebles'
import type { NextApiRequest, NextApiResponse } from 'next'
import { estadoPago } from '@/types/estado-pago' 
import { inmueble } from '@/types/inmueble'
import { estadoInmueble } from '@/types/estado-inmueble'
import { getReserva } from '@/lib/db/reservas'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id }, body: {}} = req
    
    if (method == 'GET'){
        const resp = await getReserva(id as string)  
        console.log(JSON.stringify(resp))  
        res.status(200).send(JSON.stringify(resp))
        return 
    }
    res.status(500)
}