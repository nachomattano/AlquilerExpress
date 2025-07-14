import { getInmuebles, createInmueble } from '@/lib/db/inmuebles'
import type { NextApiRequest, NextApiResponse } from 'next'
import { estadoPago } from '@/types/estado-pago' 
import { inmueble } from '@/types/inmueble'
import { estadoInmueble } from '@/types/estado-inmueble'
import { createCheckin, getCheckin, getCheckins } from '@/lib/db/check-in'
import { checkin } from '@/types/check-in'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id }, body: { fecha, empleadoid, reservaid }} = req

    
    if (method == 'GET'){
        const resp = await getCheckins()  
        console.log(JSON.stringify(resp))  
       res.send(JSON.stringify(resp))
       return 
    }
  
    if (method == 'POST'){
        const checkin : checkin = { id:null, reservaid: id as string, fecha, empleadoid }

        const error = await createCheckin(checkin)
        if (!error){
            res.status(200).send("Correcto")
            return 
        }
        res.status(400).send("Error")
    }
}