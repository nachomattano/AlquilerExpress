import { solicitud } from "@/types/solicitud";
import { createPago } from "./db/pago";
import { pago } from "@/types/pago";
import { estadoPago } from "@/types/estado-pago";
import { getSolicitudReserva, updatePagoId } from "./db/solicitudes-reservas";

export async function solicitudAccepted(solicitud:solicitud|null){
    let pago : pago = {
        id:null,
        numeroseguridad:null,
        numerotarjeta:null,
        fullname:null,
        clienteid:solicitud?solicitud.solicitante:'',
        solicitudid:solicitud?.id,
        estado: estadoPago.pendiente
    }
    
    let resp = await createPago(pago)
    console.log(JSON.stringify(resp))
    await updatePagoId(resp?.solicitudid, resp?.id)
}