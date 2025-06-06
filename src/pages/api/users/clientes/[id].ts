import { deleteCliente, getClienteId, setClienteActivo } from '@/lib/db/usuarios/clientes'
import { estadoUser } from '@/types/estado-cliente'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query:{ id, estado }} = req

    if (method == 'GET'){
        const resp = await getClienteId (id as string)
    res.send(JSON.stringify(resp))
    }else{
            if (estadoUser.activo == estado as string){
                const resp = await setClienteActivo(id as string)
            }else{
                const resp = await deleteCliente(id as string)
            }
    }
    
}