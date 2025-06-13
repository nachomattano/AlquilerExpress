import { getClienteDNI, getClienteMail, modificarContraseñaCliente } from "./clientes";
import { getAdministradorDNI, getAdministradorMail, modificarContraseñaAdministrador } from "./administradores";
import { getEmpleadoDNI, getEmpleadoMail, modificarContraseñaEmpleado } from "./empleados";
import { typeUser, user } from "@/types/user";

export async function getUsuarioPorMail( mail:string ): Promise<{user: user| undefined|null,userType:typeUser|undefined}> {
    let cuenta : {user: user | undefined|null, userType:typeUser | undefined} = {
    user: undefined,
    userType: undefined
}
console.log("mail", mail)
    cuenta.user = await getClienteMail(mail)
    cuenta.userType = typeUser.cliente
    console.log(cuenta.user)
    if (cuenta.user == null){
        console.log("entre aca")
        cuenta.user = await getEmpleadoMail(mail)
        cuenta.userType = typeUser.empleado
        if (!cuenta.user){
            cuenta.user = await getAdministradorMail(mail)
            cuenta.userType = typeUser.administrador
        }
    }
    console.log(cuenta.user)
    return cuenta
}


export async function getUsuarioPorDNI( DNI:string ): Promise<{user: user| undefined,userType:typeUser|undefined}> {
    let cuenta : {user: user | undefined, userType:typeUser | undefined} = {
    user: undefined,
    userType: undefined
}
    cuenta.user = await getClienteDNI(DNI)
    cuenta.userType = typeUser.cliente
    if (!cuenta.user){
        cuenta.user = await getEmpleadoDNI(DNI)
        cuenta.userType = typeUser.empleado
        if (!cuenta.user){
            cuenta.user = await getAdministradorDNI(DNI)
            cuenta.userType = typeUser.administrador
        }
    }
    return cuenta
}


export async function modificarContraseña ( contraseña: string , id: string|null|undefined, mail: string ){
        let cuenta : {user: user | undefined|null, userType:typeUser | undefined} = {
    user: undefined,
    userType: undefined
}
    cuenta.user = await getClienteMail(mail)
    cuenta.userType = typeUser.cliente
    if (!cuenta.user){
        cuenta.user = await getEmpleadoMail(mail)
        cuenta.userType = typeUser.empleado
        if (!cuenta.user){
            cuenta.user = await getAdministradorMail(mail)
            cuenta.userType = typeUser.administrador
            await modificarContraseñaAdministrador(contraseña,id)
        }else{
            await modificarContraseñaEmpleado(contraseña,id)
        }
    }else{
        await modificarContraseñaCliente(contraseña,id)
    }
    return cuenta
}