
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{mail, contraseña}} = req

    if (method !== 'POST'){
        return ''
    }
    localStorage.clear();
    res.send('se cerro sesion exitosamente')

}