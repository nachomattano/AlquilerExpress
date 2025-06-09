import type { NextApiRequest, NextApiResponse } from 'next'
import { getUsuarioPorMail, modificarContraseña } from "@/lib/db/usuarios/usuarios"
import { sendRecuperarEmail } from '@/lib/email'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{mail}} = req

    if (method !== 'POST'){
        return ''
    }
    
    await sendRecuperarEmail(mail, 'Ingresa a este link:  http://localhost:3000/recuperar   Para cambiar tu contraseña!')
    res.status(200).send('se cambio la contraseña exitosamente!')
}