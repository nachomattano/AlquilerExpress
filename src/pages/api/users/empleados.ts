import { changeState } from '@/lib/usuarios'
import { createEmpleado, getEmpleados } from '@/lib/db/usuarios/empleados'
import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'
import { estadoUser } from '@/types/estado-cliente'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{mail, nombre, edad, dni, contraseña}} = req

    if (method == 'GET'){
        const resp = await getEmpleados()
       res.send(JSON.stringify(resp))
    }
    if (method == 'POST'){
        const user :user = {id:undefined,nombre,contraseña,dni,edad,mail,estado:estadoUser.activo}
        const resp = await createEmpleado(user)
        res.send(JSON.stringify(resp))
    }
    
}