import { getClienteDNI, getClienteMail } from "./clientes";
import { getAdministradorDNI, getAdministradorMail } from "./administradores";
import { getEmpleadoDNI, getEmpleadoMail } from "./empleados";
import { typeUser, user } from "@/types/user";

export async function getUsuarioPorMail( mail:string ): Promise<{user: user| undefined,userType:typeUser|undefined}> {
    let cuenta : {user: user | undefined, userType:typeUser | undefined} = {
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
        }
    }
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