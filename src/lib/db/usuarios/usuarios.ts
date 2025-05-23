import { getCliente } from "./clientes";
import { getAdministrador } from "./administradores";
import { getEmpleado } from "./empleados";
import { user } from "@/types/user";

export async function getUsuarioPorMail( mail:string ): Promise<{user: user| undefined,administrador:boolean|undefined}> {
    let cuenta : {user: user | undefined, administrador:boolean | undefined} = {
    user: undefined,
    administrador: false
}
    cuenta.user = await getCliente(mail)
    if (!cuenta.user){
        cuenta.user = await getEmpleado(mail)
        if (!cuenta.user){
            cuenta.user = await getAdministrador(mail)
            cuenta.administrador = true
        }
    }
    return cuenta
}
