import { createSolicitud, getSolicitudesReserva } from "@/lib/db/solicitudes-reservas"
import type { NextApiRequest, NextApiResponse } from 'next'
import { solicitud } from "@/types/solicitud"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{ fechadesde, fechahasta, cantidad, solicitante, acompañantesid, inmuebleid, estado}} = req

    if (method == 'GET'){
        const resp = await getSolicitudesReserva()
       res.send(JSON.stringify(resp))
    }
    if (method == 'POST'){
        const solicitud :solicitud = {fechadesde, fechahasta, cantidad, solicitante, acompañantesid, inmuebleid, estado}
        const resp = await createSolicitud(solicitud)
        res.send(JSON.stringify(resp))
    }
    
}