import { estadoUser } from "./estado-cliente"

export type user ={
    id:string|null|undefined,
    nombre:string|null,
    contraseña:string|null,
    dni:number|null,
    edad:string|null,
    mail:string|null,
    estado:estadoUser|null
}

export enum typeUser {
    empleado = "empleado", cliente = "cliente", administrador = "administrador"
}