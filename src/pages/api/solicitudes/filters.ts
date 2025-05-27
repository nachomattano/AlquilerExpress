import { getSolicitudesReservaFilters } from "@/lib/db/solicitudes-reservas"
import type { NextApiRequest, NextApiResponse } from 'next'
import { solicitud } from "@/types/solicitud"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id }, body: {estado}} = req

    if (method !== 'POST'){
        res.status(400).send('only POST in filters')
    }
    const { desde, hasta, clienteIds } = req.body;

    const desdeDate = desde ? new Date(desde) : undefined;
    const hastaDate = hasta ? new Date(hasta) : undefined;

    const clientes = Array.isArray(clienteIds)
      ? clienteIds.map((id: any) => parseInt(id))
      : undefined;

    const resp = await getSolicitudesReservaFilters(desdeDate, hastaDate, clientes);
    return res.status(200).json(resp);
}