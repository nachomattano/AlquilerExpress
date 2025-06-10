import { getInmueble, updateStateInmueble } from '@/lib/db/inmuebles' 
import { estadoInmueble } from '@/types/estado-inmueble'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query: { id,cantidadhuespedes,titulo, espaciocochera, dpto , direccion, estado, localidad, ciudad, tipo, descripcion, semanaanterior, diasanteriores, mismodia, duracionminima, preciopordia, imagen }} = req


    if (method == 'GET'){
        const resp = await getInmueble(id as string)
        console.log(JSON.stringify(resp))
        if (!resp){
            res.status(404).send('no se encontro el inmueble sugerido')
        }
        res.status(200).json(resp)
        return
    }
    if (method == 'POST'){
        const inmueble = await getInmueble(id as string)
        if (estadoInmueble.reservado == inmueble?.estado && estado == estadoInmueble.enMantenimiento){
            res.status(400).send('el inmueble esta reservado actualmente.')
            return
        }
        if (estadoInmueble.alquilado == inmueble?.estado && estado == estadoInmueble.enMantenimiento){
            res.status(400).send('el inmueble esta alquilado actualmente.')
            return
        }
        const resp = await updateStateInmueble(estado as estadoInmueble, id as string)
        res.status(200).send('se cambio el estado con exito.')
    }

    if (method == 'PUT'){

    }
    
}