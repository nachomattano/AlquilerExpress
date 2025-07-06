import { getInmuebles, createInmueble } from '@/lib/db/inmuebles'
import type { NextApiRequest, NextApiResponse } from 'next'
import { estadoPago } from '@/types/estado-pago' 
import { inmueble } from '@/types/inmueble'
import { estadoInmueble } from '@/types/estado-inmueble'
import { alquiler } from '@/types/alquiler'
import { getAlquileres } from '@/lib/db/alquileres'


export default async function handler(req:NextApiRequest,res:NextApiResponse){

    const {method, body: { }} = req

    
    if (method == 'GET'){
        const resp = await getAlquileres()  
        console.log(JSON.stringify(resp))  
       res.status(200).send(JSON.stringify(resp))
       return 
    }
  
   
}