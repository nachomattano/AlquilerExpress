import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'
import { createCliente, getClientes } from '@/lib/db/usuarios/clientes'
import { estadoUser } from '@/types/estado-cliente'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{ mail, nombre, estado, edad, dni, contraseña}} = req

    if (method == 'GET'){
        const resp = await getClientes()
       res.send(JSON.stringify(resp))
    }
    if (method == 'POST'){
        const user :user = {id:undefined,nombre,contraseña,dni,edad,mail,estado:estadoUser.activo}
        const resp = await createCliente(user)
        res.send(JSON.stringify(resp))
    }
    
}