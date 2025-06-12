import { estadoSolicitud } from "./estado-solicitud"

export type solicitud ={
    id:string|null|undefined,
    fechadesde:Date|null|undefined,
    fechahasta:Date|null|undefined,
    cantidad:number|null|undefined,
    solicitante:string|null|undefined,
    acompañantesid:string[]|null|undefined,
    inmuebleid: number|null|undefined,
    estado: estadoSolicitud|null|undefined,
    pagoid: string|null|undefined
}