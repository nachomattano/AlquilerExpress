import { getInmuebles, createInmueble } from '@/lib/db/inmuebles'
import type { NextApiRequest, NextApiResponse } from 'next'
import { estadoPago } from '@/types/estado-pago' 
import { inmueble } from '@/types/inmueble'
import { estadoInmueble } from '@/types/estado-inmueble'
import { reserva } from '@/types/reserva'
import { createReserva, getReservas } from '@/lib/db/reservas'


export default async function handler(req:NextApiRequest,res:NextApiResponse){

    const {method, body: { fechadesde,
            fechahasta,
            cantidad,
            solicitante,
            acompañantesid,
            pagoid,
            estado,
            inmuebleid,
            costo
        }} = req

    
    if (method == 'GET'){
        const resp = await getReservas()  
        console.log(JSON.stringify(resp))  
       res.send(JSON.stringify(resp))
       return 
    }
  
    if (method == 'POST'){
        const reserva : reserva = { id:null,fechadesde,
            fechahasta,
            cantidad,
            solicitante,
            acompañantesid,
            pagoid,
            estado,
            inmuebleid,
            costo }

        const error = await createReserva(reserva)
        if (!error){
            res.status(200)
            return 
        }
        res.status(400)
        
    }
}