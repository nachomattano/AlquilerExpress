import { inicarSesion } from "@/lib/iniciar-sesion"
import { typeUser } from "@/types/user"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{mail, contraseña}} = req

    if (method !== 'GET'){
        return ''
    }
    const creds = await inicarSesion(contraseña,mail)

    if (creds.correct){
        if (creds.userType === typeUser.administrador){
            //SEND EMAIL
        }
        res.status(200).send('credenciales correctas')
    }
    res.status(400).send('credenciales incorrectas')
}