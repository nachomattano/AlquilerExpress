import { createUser } from '@/lib/usuarios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{tipoUser, mail, nombre, estado, edad, DNI, contraseña}} = req

    const user :user = {nombre,contraseña,DNI,edad,mail,estado}

    if (method !== 'POST'){
        return ''
    }
    const resp = await createUser (user,tipoUser)
    res.send(JSON.stringify(resp))
}