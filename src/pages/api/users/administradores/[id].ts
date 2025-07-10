import { getAdministrador, modifyAdmin } from '@/lib/db/usuarios/administradores'
import { estadoUser } from '@/types/estado-cliente'
import { user } from '@/types/user'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query: { id }, body:{mail, nombre, edad, dni, contraseña}} = req


    if (method !== 'GET'){
        const resp = await getAdministrador(id as string)
    res.send(JSON.stringify(resp))
    }else{
        let user : user = {
                        id:id?.toString(), mail, nombre, edad, dni, contraseña, estado: estadoUser.activo
                    } 
        const error = await modifyAdmin(user)
    }
    
}