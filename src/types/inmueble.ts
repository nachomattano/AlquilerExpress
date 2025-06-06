import { estadoInmueble } from "./estado-inmueble"



export type inmueble = {
    id: string|null|undefined,
    titulo: string|null|undefined,
    localidad:string|null|undefined,
    cantidadhuespedes:number|null|undefined,
    espaciocochera:number|null|undefined,
    dpto:string|null|undefined,
    direccion:string|null|undefined,
    ciudad: string|null|undefined,
    estado: estadoInmueble|null|undefined,
    tipo:string|null|undefined,

    imagen?: string|null|undefined,

    descripcion:string|null|undefined,
    semanaanterior:string|null|undefined, 
    diasanteriores:string|null|undefined, 
    mismodia:string|null|undefined, 
    fechamaxima:string|null|undefined,

}