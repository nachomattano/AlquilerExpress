import type { NextApiRequest, NextApiResponse } from 'next'
import { getUsuarioPorMail, modificarContraseña } from "@/lib/db/usuarios/usuarios"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{mail, contraseña}} = req

    if (method !== 'POST'){
        return ''
    }
    const creds = await getUsuarioPorMail(mail)
    if (!creds.user){
        res.status(404).send(`Cliente con mail ${mail} no existe en el sistema`)
        return
    }
    const query = await modificarContraseña(contraseña,creds.user.id,mail)
    if (!query.user){
        res.status(402).send(`contraseña incorrecta para cuenta con mail ${mail}`)
    }
    res.status(200).send('se cambio la contraseña exitosamente!')
}