import { getInmuebles, createInmueble } from '@/lib/db/inmuebles'
import type { NextApiRequest, NextApiResponse } from 'next'
import { estadoPago } from '@/types/estado-pago' 
import { inmueble } from '@/types/inmueble'
import { estadoInmueble } from '@/types/estado-inmueble'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id }, body: { cantidadhuespedes,titulo, espaciocochera, dpto , direccion, estado, localidad, ciudad, tipo, descripcion}} = req
    
    if (method == 'GET'){
        const resp = await getInmuebles()  
        console.log(JSON.stringify(resp))  
       res.send(JSON.stringify(resp))
       return ''
    }
  
    if (method == 'POST'){
        const inmueble : inmueble = { id:null, titulo, espaciocochera, cantidadhuespedes, estado:estadoInmueble.disponible, dpto,direccion,localidad, ciudad, tipo, descripcion }
        await createInmueble(inmueble)
        res.send('OK')
        return ''
    }
}