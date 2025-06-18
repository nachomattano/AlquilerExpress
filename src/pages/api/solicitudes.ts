import { createSolicitud, getSolicitudesReserva } from "@/lib/db/solicitudes-reservas"
import type { NextApiRequest, NextApiResponse } from 'next'
import { solicitud } from "@/types/solicitud"
import { estadoSolicitud } from "@/types/estado-solicitud"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{ fechadesde, fechahasta, cantidad, solicitante, acompañantesid, inmuebleid, monto}} = req

    if (method == 'GET'){
        const resp = await getSolicitudesReserva()
       res.send(JSON.stringify(resp))
       return ''
    }
    if (method == 'POST'){
        const solicitud :solicitud = {id:null,fechadesde, fechahasta, cantidad, solicitante, acompañantesid:null, inmuebleid, estado:estadoSolicitud.Pendiente, pagoid:undefined, monto}
        const resp = await createSolicitud(solicitud)
        res.send(JSON.stringify(resp))
    }
    
}