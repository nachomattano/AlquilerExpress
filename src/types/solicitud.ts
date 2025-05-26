import { estadoSolicitud } from "./estado-solicitud"

export type solicitud ={
    id:number|null,
    fechadesde:Date|null,
    fechahasta:Date|null,
    cantidad:number|null,
    solicitante:string|null,
    acompañantesid:string[]|null,
    inmuebleid: number|null,
    estado: estadoSolicitud|null
}