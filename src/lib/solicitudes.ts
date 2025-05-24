import { solicitud } from "@/types/solicitud";
import { createPago } from "./db/pago";
import { pago } from "@/types/pago";
import { estadoPago } from "@/types/estado-pago";

export async function solicitudAccepted(solicitud:solicitud|null){
    let pago : pago = {
        id:null,
        numeroseguridad:null,
        numerotarjeta:null,
        clienteid:solicitud?solicitud.solicitante:0,
        estado: estadoPago.pendiente
    }
    
    await createPago(pago)
}