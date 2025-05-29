import { createSolicitud, getSolicitudesReserva } from "@/lib/db/solicitudes-reservas"
import type { NextApiRequest, NextApiResponse } from 'next'
import { solicitud } from "@/types/solicitud"
import { estadoSolicitud } from "@/types/estado-solicitud"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{ fechadesde, fechahasta, cantidad, solicitante, acompañantesid, inmuebleid}} = req

    if (method == 'GET'){
        const resp = await getSolicitudesReserva()
       res.send(JSON.stringify(resp))
    }
    if (method == 'POST'){
        const solicitud :solicitud = {id:null,fechadesde, fechahasta, cantidad, solicitante, acompañantesid, inmuebleid, estado:estadoSolicitud.Pendiente}
        const resp = await createSolicitud(solicitud)
        res.send(JSON.stringify(resp))
    }
    
}