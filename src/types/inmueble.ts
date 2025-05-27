import { estadoInmueble } from "./estado-inmueble"



export type inmueble = {
    id: string|null|undefined,
    titulo: string|null|undefined,
    localidad:string|null|undefined,
    cantidadHuespedes:number|null|undefined,
    espacioCochera:number|null|undefined,
    dpto:string|null|undefined,
    direccion:string|null|undefined,
    ciudad: string|null|undefined,
    estado: estadoInmueble|null|undefined,
    tipo:string|null|undefined,
    descripcion:string|null|undefined
}