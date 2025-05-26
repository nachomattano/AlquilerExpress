import { estadoReserva } from "./estado-reservas"


export type reserva ={
    id: string|null|undefined,
    fechadesde:Date|null|undefined,
        fechahasta:Date|null|undefined,
        cantidad:number|null|undefined,
        solicitante:string|null|undefined,
        acompañantesid:string[]|null|undefined,
        pagoid:string|null|undefined,
        estado: estadoReserva |null|undefined
}