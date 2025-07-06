import { pago } from "@/types/pago";
import { createReserva } from "./db/reservas";
import { reserva } from "@/types/reserva";
import { estadoReserva } from "@/types/estado-reservas";
import { getSolicitudReserva } from "./db/solicitudes-reservas";
import { solicitud } from "@/types/solicitud";


export async function pagoExitoso (pago:pago|null|undefined){
    let solicitud: solicitud|null = await getSolicitudReserva(pago?.solicitudid)

    let reserva:reserva ={
        id: undefined,
        fechadesde:solicitud?.fechadesde,
        fechahasta:solicitud?.fechahasta,
        cantidad:solicitud?.cantidad,
        solicitante:solicitud?.solicitante,
        acompañantesid:solicitud?.acompañantesid,
        pagoid:pago?.id,
        costo: solicitud?.monto,
        estado: estadoReserva.Vigente,
        inmuebleid: solicitud?.inmuebleid
    }

    
    return await createReserva(reserva)

}