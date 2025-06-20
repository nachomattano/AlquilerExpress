import { getSolicitudReserva, updateStateReserva } from "@/lib/db/solicitudes-reservas"
import type { NextApiRequest, NextApiResponse } from 'next'
import { estadoSolicitud } from "@/types/estado-solicitud"
import { solicitudAccepted } from "@/lib/solicitudes"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id }, body: {estado}} = req

    if (method == 'GET'){
        const resp = await getSolicitudReserva(id as string)
       res.send(JSON.stringify(resp))
    }
  
    if (method == 'POST'){
        if (estado === estadoSolicitud.Aceptada){
            await solicitudAccepted(await getSolicitudReserva(id as string))
        }
        const resp = await updateStateReserva(estado, id as string)
    }
}