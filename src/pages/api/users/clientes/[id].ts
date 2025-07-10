import { deleteCliente, getClienteId, modifyClient, setClienteActivo } from '@/lib/db/usuarios/clientes'
import { estadoUser } from '@/types/estado-cliente'
import { user } from '@/types/user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id, estado }, body:{mail, nombre, edad, dni, contraseña}} = req

    if (method == 'GET'){
        const resp = await getClienteId (id as string)
    res.send(JSON.stringify(resp))
    }else{
        if (method == "POST"){
            if (estadoUser.activo == estado as string){
                const resp = await setClienteActivo(id as string)
            }else{
                const resp = await deleteCliente(id as string)
            }
        }
        if (method == "PUT"){
            let user : user = {
                id:id?.toString(), mail, nombre, edad, dni, contraseña, estado: estadoUser.activo
            } 
            const error = await modifyClient(user)
        }
    }
    
}