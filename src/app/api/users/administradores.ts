import { createAdministrador } from '@/lib/db/usuarios/administradores'
import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{ mail, nombre, estado, edad, DNI, contraseña }} = req

    const user :user = {nombre,contraseña,DNI,edad,mail,estado}

    if (method == 'POST'){
        const resp = await createAdministrador (user)
    res.send(JSON.stringify(resp))
    }else{
        return ''
    }
    
}