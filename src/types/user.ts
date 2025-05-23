export type user ={
    nombre:string,
    contraseña:string,
    DNI:number,
    edad:string,
    mail:string,
    estado:any
}

export enum typeUser {
    empleado, cliente, administrador
}