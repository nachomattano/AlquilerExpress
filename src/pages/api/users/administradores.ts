import { createAdministrador, getAdministradores } from '@/lib/db/usuarios/administradores'
import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'
import { estadoUser } from '@/types/estado-cliente'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{ mail, nombre, edad, dni, contraseña }} = req

    const user :user = {id:undefined,nombre,contraseña,dni,edad,mail,estado:estadoUser.activo}

    if (method == 'POST'){
        const resp = await createAdministrador (user)
    res.send(JSON.stringify(resp))
    }
    if (method == 'GET'){
        const resp = await getAdministradores()
        res.send(JSON.stringify(resp))
    }
    
}