import { inicarSesion } from "@/lib/iniciar-sesion"
import { typeUser } from "@/types/user"
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendVerificationEmail } from "@/lib/email"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{mail, contraseña}} = req

    if (method !== 'POST'){
        return ''
    }
    const creds = await inicarSesion(contraseña,mail)
    if (!creds.user){
        res.status(404).send(`Cliente con mail ${mail} no existe en el sistema`)
        return
    }
    if (creds.correct){
        if (creds.userType === typeUser.administrador){
            await sendVerificationEmail(mail, '1111')
        }
        res.status(200).send(JSON.stringify({correct:creds.correct,user:creds.user, userType:creds.userType}))
        return 
    }
    res.status(402).send(`contraseña incorrecta para cuenta con mail ${mail}`)
}