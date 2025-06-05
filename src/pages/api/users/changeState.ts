import { changeState } from '@/lib/usuarios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { user } from '@/types/user'

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, body:{estado}} = req

    if (method !== 'POST'){
        return 
    }
    const resp = await changeState(estado)
    res.send(JSON.stringify(resp))
}