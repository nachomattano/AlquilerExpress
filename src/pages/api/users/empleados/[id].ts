import { deleteEmpleado, getEmpleadoPorId, modifyEmpleado, setEmpleadoActivo } from '@/lib/db/usuarios/empleados'
import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'
import { changeState } from '@/lib/usuarios'
import { estadoUser } from '@/types/estado-cliente'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id, estado }, body:{mail, nombre, edad, dni, contraseña}} = req


    if (method == 'GET'){
        const resp = await getEmpleadoPorId (id as string)
        res.send(JSON.stringify({resp}))
    }else{
        if (method == "POST"){
        if (estadoUser.activo == estado as string){
            const resp = await setEmpleadoActivo(id as string)
            res.status(200).send('se cambio el estado con exito')
        }else{
            const resp = await deleteEmpleado(id as string)
            res.status(200).send('se cambio el estado con exito')
        }
        }
        if (method == "PUT"){
            let user : user = {
                id:id?.toString(), mail, nombre, edad, dni, contraseña, estado: estadoUser.activo
            } 
            const error = await modifyEmpleado(user)
        }
    }
    
}