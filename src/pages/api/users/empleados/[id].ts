import { deleteEmpleado, getEmpleado, setEmpleadoActivo } from '@/lib/db/usuarios/empleados'
import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'
import { changeState } from '@/lib/usuarios'
import { estadoUser } from '@/types/estado-cliente'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id, estado }} = req


    if (method == 'GET'){
        const resp = await getEmpleado (id as string)
        res.send(JSON.stringify({resp}))
    }else{
        if (estadoUser.activo == estado as string){
            const resp = await setEmpleadoActivo(id as string)
            res.status(200).send('se cambio el estado con exito')
        }else{
            const resp = await deleteEmpleado(id as string)
            res.status(200).send('se cambio el estado con exito')
        }
    }
    
}