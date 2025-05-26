import { estadoUser } from "./estado-cliente"

export type user ={
    id:string|null,
    nombre:string|null,
    contraseña:string|null,
    DNI:number|null,
    edad:string|null,
    mail:string|null,
    estado:estadoUser|null
}

export enum typeUser {
    empleado, cliente, administrador
}