import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'
import { createCliente, getClientes } from '@/lib/db/usuarios/clientes'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{ mail, nombre, estado, edad, DNI, contraseña}} = req

    if (method == 'GET'){
        const resp = await getClientes()
       res.send(JSON.stringify(resp))
    }
    if (method == 'POST'){
        const user :user = {nombre,contraseña,DNI,edad,mail,estado}
        const resp = await createCliente(user)
        res.send(JSON.stringify(resp))
    }
    
}