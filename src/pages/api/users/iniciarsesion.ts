import { inicarSesion } from "@/lib/iniciar-sesion"
import { typeUser } from "@/types/user"
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendVerificationEmail } from "@/lib/email"
import { fa2 } from "@/types/code"
import { createCode } from "@/lib/db/2fa"

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
            const code = Math.floor(1000 + Math.random() * 9000).toString(); // Código de 4 dígitos
            const expirationTime = new Date(Date.now() + 2 * 60000).toISOString()
            const fa: fa2 = { id:undefined, code, expiresat:expirationTime, userid: creds.user.id  }
            await createCode ( fa )
            await sendVerificationEmail(mail, code)
        }
        res.status(200).send(JSON.stringify({correct:creds.correct,user:creds.user, userType:creds.userType}))
        return 
    }
    res.status(402).send(`contraseña incorrecta para cuenta con mail ${mail}`)
}