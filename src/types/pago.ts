import { estadoPago } from "./estado-pago"

export type pago={
    numerotarjeta:number|null|undefined,
    numeroseguridad:number|null|undefined,
    fullname: string|null|undefined,
    estado:estadoPago|null|undefined
    
}