import { updateStatePago, getPago, createPago } from '@/lib/db/pago'
import { pagoExitoso } from '@/lib/pagos';
import { estadoPago } from '@/types/estado-pago'
import { pago } from '@/types/pago'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const method = req.method;
const { id } = req.query;
const { fullname, numerotarjeta, numeroseguridad, clienteid, solicitudid} = req.body;


    if (method == 'GET'){
        const resp = await getPago(id as string)
        res.send(JSON.stringify(resp))
        return 
    }
    if (method == 'POST'){
        console.log("Entro al POST");
        console.log("Body recibido:", req.body);
        const tarjetaValida = fullname === "Gaspar Sanchez" && numerotarjeta === "4447" && numeroseguridad === "677";
        const fondosInsuficientes = fullname === "Gonzalo Bazan" && numerotarjeta === "4448" && numeroseguridad === "833";

        if (tarjetaValida) {
            const pago: pago = { id: null, numerotarjeta, numeroseguridad, fullname, clienteid, solicitudid, estado: estadoPago.exitoso};
            await createPago(pago);
            res.status(200).json({ message: 'El pago fue realizado con éxito' });
  
        } else if (fondosInsuficientes) {
            res.status(400).json({ message: 'No se pudo realizar el pago por fondos insuficientes' });
            }  
            else {
            res.status(400).json({ message: 'Tarjeta inválida' });
        }
        
    }
    }
    