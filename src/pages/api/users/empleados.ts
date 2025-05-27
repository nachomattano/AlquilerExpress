import { changeState } from '@/lib/usuarios'
import { createEmpleado, getEmpleados } from '@/lib/db/usuarios/empleados'
import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{mail, nombre, estado, edad, DNI, contraseña}} = req

    if (method == 'GET'){
        const resp = await getEmpleados()
       res.send(JSON.stringify(resp))
    }
    if (method == 'POST'){
        const user :user = {id:undefined,nombre,contraseña,DNI,edad,mail,estado}
        const resp = await createEmpleado(user)
        res.send(JSON.stringify(resp))
    }
    
}