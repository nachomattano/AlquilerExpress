import { getInmuebles, createInmueble } from '@/lib/db/inmuebles'
import type { NextApiRequest, NextApiResponse } from 'next'
import { estadoPago } from '@/types/estado-pago' 
import { inmueble } from '@/types/inmueble'
import { estadoInmueble } from '@/types/estado-inmueble'
import { createCheckout, getCheckouts } from '@/lib/db/check-out'
import { checkout } from '@/types/check-out'


export default async function handler(req:NextApiRequest,res:NextApiResponse){

    const {method, query:{ id }, body: {
    comentarios,
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
        const checkout : checkout = { id:null, comentarios,
            empleadoid,
            fecha,
            checkinid
        }

        const error = await createCheckout(checkout, estado)
        if (!error){
            res.status(200).send(200)
            return ''
        }
        console.log(`error en el checkout ${JSON.stringify(error)}`)
        res.status(400).send(400)
    }
}