import { estadoPago } from "./estado-pago"

export type pago={
    id:string|null,
    numerotarjeta:number|null,
    numeroseguridad:number|null,
    clienteid:string|null,
    solicitudid:string|null,
    estado:estadoPago|null
}