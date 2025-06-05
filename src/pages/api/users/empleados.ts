
import { createEmpleado, getEmpleados } from '@/lib/db/usuarios/empleados'
import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'
import { estadoUser } from '@/types/estado-cliente'
import { getUsuarioPorMail } from '@/lib/db/usuarios/usuarios'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{mail, nombre, edad, dni, contraseña}} = req

    if (method == 'GET'){
        const resp = await getEmpleados()
       res.send(JSON.stringify(resp))
    }
    if (method == 'POST'){
        const checkMail = await getUsuarioPorMail(mail)
        if (!checkMail){
            const user :user = {id:undefined,nombre,contraseña,dni,edad,mail,estado:estadoUser.activo}
            const resp = await createEmpleado(user)
            res.status(200).send(JSON.stringify(resp))
            return 
        }
        res.status(400)
    }
    
}