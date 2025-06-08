import { inicarSesion } from "@/lib/iniciar-sesion"
import { typeUser } from "@/types/user"
import type { NextApiRequest, NextApiResponse } from 'next'
import { sendVerificationEmail } from "@/lib/email"
import { fa2 } from "@/types/code"
import { createCode, getCode } from "@/lib/db/2fa"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{code, id}} = req

    if (method !== 'POST'){
        return ''
    }
    
    const validCode = await getCode(id as string, code as string)

    if (!validCode){
        console.log('entre aca')
        res.status(402).send(`codigo no coincide con el codigo real`)
        return
    }
    const expired = validCode.expiresat ? new Date(validCode.expiresat) : Math.floor(Date.now() / 1000)
    const now = new Date()
    if (now  > expired){
        console.log('estoy aca')
        res.status(402).send(`codigo expirado`)
        return 
    }

    res.status(200).send('correct!')
}