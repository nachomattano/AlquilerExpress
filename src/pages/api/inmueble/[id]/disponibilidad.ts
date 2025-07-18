import { getInmueble, getInmuebles } from '@/lib/db/inmuebles' 
import { getReservas, getReservasPorInmueble } from '@/lib/db/reservas'
import { getSolicitudesReservaFilters, getSolicitudesReservaPorInmueble } from '@/lib/db/solicitudes-reservas'
import { estadoSolicitud } from '@/types/estado-solicitud'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query: { id }} = req


    if (method == 'GET'){
        const resp = await getInmueble(id as string)

        console.log(JSON.stringify(resp))
        const rawReservas = await getReservasPorInmueble(id as string);
        const reservas = Array.isArray(rawReservas) ? rawReservas : [rawReservas];
        const solicitudesRaw = await getSolicitudesReservaPorInmueble(id as string)
        const filtradas = solicitudesRaw?.filter(soli => soli.estado == estadoSolicitud.Aceptada)
        const solis = Array.isArray(filtradas) ? filtradas : [filtradas]

        const disponibilidadReservas = reservas.map(reserva => ({
  desde: reserva?.fechadesde ?? null,
  hasta: reserva?.fechahasta ?? null
}));

// Mapear fechas de solicitudes
const disponibilidadSolicitudes = solis.map(soli => ({
  desde: soli?.fechadesde ?? null,
  hasta: soli?.fechahasta ?? null
}));

// Combinar ambas
let disponibilidadInmueble = {
  id: id,
  disponibilidad: [...disponibilidadReservas, ...disponibilidadSolicitudes]
};
console.log(`SOLICITUDESSSSSSSSSSSSSS -> ${JSON.stringify(disponibilidadInmueble)}`)
       
    res.status(200).json(disponibilidadInmueble)
    }else{
        return ''
    }
    
}