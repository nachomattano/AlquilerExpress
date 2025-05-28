
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{mail, contraseña}} = req

    if (method !== 'GET'){

        return ''
    }
    localStorage.clear();
    res.status(200).send('se cerro sesion exitosamente')

}