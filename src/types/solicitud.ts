import { estadoSolicitud } from "./estado-solicitud"

export type solicitud ={
    fechadesde:Date,
    fechahasta:Date,
    cantidad:number,
    solicitante:number,
    acompañantesid:number[],
    inmuebleid: number,
    estado: estadoSolicitud
}