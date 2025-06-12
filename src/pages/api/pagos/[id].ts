import { updateStatePago, getPago, updatePago } from '@/lib/db/pago'
import { pagoExitoso } from '@/lib/pagos'
import { estadoPago } from '@/types/estado-pago'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {method, query: { id }, body: { estado, numeroseguridad, numerotarjeta, fullname }} = req


    if (method == 'GET'){
        const resp = await getPago(id as string)
        res.send(JSON.stringify(resp))
        return 
    }
    if (method == 'POST'){
        const tarjetaValida = fullname === "Gaspar Sanchez" && numerotarjeta === "4447" && numeroseguridad === "677";
        const fondosInsuficientes = fullname === "Gonzalo Bazan" && numerotarjeta === "4448" && numeroseguridad === "833";
        
        if (tarjetaValida) {
            const update = await updatePago (id as string, numerotarjeta as string ,numeroseguridad as string,fullname as string)
            const resp = await updateStatePago (estadoPago[estado as keyof typeof estadoPago],id as string)
            const pago = await getPago(id as string)
            const pagoexitoso = await pagoExitoso(pago)
            res.status(200).json({ message: 'El pago fue realizado con éxito' });
            return
        } else if (fondosInsuficientes) {
            res.status(400).json({ message: 'No se pudo realizar el pago por fondos insuficientes' });
            return
            } else {
                res.status(400).json({ message: 'Tarjeta inválida' });
                return
            }
    }
}