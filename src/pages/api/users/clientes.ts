import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'
import { createCliente, getClientes } from '@/lib/db/usuarios/clientes'
import { estadoUser } from '@/types/estado-cliente'
import { getUsuarioPorDNI, getUsuarioPorMail } from '@/lib/db/usuarios/usuarios'


export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{ mail, nombre, edad, dni, contraseña}} = req

    if (method == 'GET'){
        const resp = await getClientes()
       res.send(JSON.stringify(resp))
    }
    if (method == 'POST'){
        const checkMail = await getUsuarioPorMail(mail)
        if (!checkMail.user){
            const checkDNI = await getUsuarioPorDNI(dni)
            if (!checkDNI.user){
                const user :user = {id:undefined,nombre,contraseña,dni,edad,mail,estado:estadoUser.activo}
                const resp = await createCliente(user)
                res.status(200).send(JSON.stringify(resp))
                return
            }else{
                res.status(400).send("DNI existente en el sistema")
                return
            }
             
        }else{
            res.status(400).send("Mail existente en el sistema")
            return
        }
    }
    
}