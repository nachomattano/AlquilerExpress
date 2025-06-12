import { estadoPago } from "./estado-pago"

export type pago={
    id:string|null|undefined
    numerotarjeta:number|null|undefined,
    numeroseguridad:number|null|undefined,
    fullname: string|null|undefined,
    estado:estadoPago|null|undefined,
    clienteid:string|null|undefined,
    solicitudid:string|null|undefined
}