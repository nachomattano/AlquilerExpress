import { getInmuebles, createInmueble } from '@/lib/db/inmuebles'
import type { NextApiRequest, NextApiResponse } from 'next'
import { estadoPago } from '@/types/estado-pago' 
import { inmueble } from '@/types/inmueble'
import { estadoInmueble } from '@/types/estado-inmueble'
import { createComentario, getComentarios } from '@/lib/db/comentario'
import { comentario } from '@/types/comentario'


export default async function handler(req:NextApiRequest,res:NextApiResponse){

    const {method, query: {id}, body: { comentario, comentarioid, autorid}} = req

    
    if (method == 'GET'){
        const resp = await getComentarios(id as string)  
        console.log(JSON.stringify(resp))  
       res.send(JSON.stringify(resp))
       return ''
    }
  
    if (method == 'POST'){
        const comment : comentario = { id:null, comentario, inmuebleid: id as string, comentarioid:null, autorid:autorid  }

        const error = await createComentario(comment)
        if (error){
            res.status(400)
            return
        }
        res.status(200)
        return ''
    }
}