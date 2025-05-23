import { getSolicitudReserva, updateStateReserva } from "@/lib/db/solicitudes-reservas"
import type { NextApiRequest, NextApiResponse } from 'next'
import { solicitud } from "@/types/solicitud"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id }, body: {estado}} = req

    if (method == 'GET'){
        const resp = await getSolicitudReserva(id as string)
       res.send(JSON.stringify(resp))
    }
  
    if (method == 'POST'){
        const resp = await updateStateReserva(estado, id as string)
    }
}