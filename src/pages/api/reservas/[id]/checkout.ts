import { getInmuebles, createInmueble } from '@/lib/db/inmuebles'
import type { NextApiRequest, NextApiResponse } from 'next'
import { estadoPago } from '@/types/estado-pago' 
import { inmueble } from '@/types/inmueble'
import { estadoInmueble } from '@/types/estado-inmueble'
import { createCheckout, getCheckouts } from '@/lib/db/check-out'
import { checkout } from '@/types/check-out'


export default async function handler(req:NextApiRequest,res:NextApiResponse){

    const {method, query:{ id }, body: {
    comentario,
    empleadoid,
    fecha,
    checkinid,
    estado
    }} = req

    
    if (method == 'GET'){
        const resp = await getCheckouts()  
        console.log(JSON.stringify(resp))  
       res.send(JSON.stringify(resp))
       return ''
    }
  
    if (method == 'POST'){
        const checkout : checkout = { id:null, comentario,
            empleadoid,
            fecha,
            checkinid
        }

        const error = await createCheckout(checkout, estado)
        if (!error){
            res.status(200)
            return ''
        }
        res.status(400)
    }
}