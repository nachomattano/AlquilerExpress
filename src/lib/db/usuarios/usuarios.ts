import { getClienteMail } from "./clientes";
import { getAdministrador } from "./administradores";
import { getEmpleado } from "./empleados";
import { typeUser, user } from "@/types/user";

export async function getUsuarioPorMail( mail:string ): Promise<{user: user| undefined,userType:typeUser|undefined}> {
    let cuenta : {user: user | undefined, userType:typeUser | undefined} = {
    user: undefined,
    userType: undefined
}
    cuenta.user = await getClienteMail(mail)
    cuenta.userType = typeUser.cliente
    if (!cuenta.user){
        cuenta.user = await getEmpleado(mail)
        cuenta.userType = typeUser.empleado
        if (!cuenta.user){
            cuenta.user = await getAdministrador(mail)
            cuenta.userType = typeUser.administrador
        }
    }
    return cuenta
}
