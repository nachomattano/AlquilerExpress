import { getUsuarioPorMail } from "./db/usuarios/usuarios";
import { createCliente } from "./db/usuarios/clientes";
import { createEmpleado } from "./db/usuarios/empleados";
import { createAdministrador } from "./db/usuarios/administradores";
import { typeUser, user } from "@/types/user";
import { estadoUser } from "@/types/estado-cliente";

export async function inicarSesion ( contraseña:string, mail:string ): Promise<{correct: boolean, admin: boolean|undefined}>{
    const user = await getUsuarioPorMail(mail);

    return {correct: (user.user?.contraseña == contraseña), admin:user.administrador}
}



export async function createUser ( user: user, type: typeUser){
    if (!user.contraseña){
        user.contraseña = 'aaa111'
    }

    if (type === typeUser.cliente){
        createCliente(user)
        return ''
    }
    if (type === typeUser.empleado){
        createEmpleado(user)
        return ''
    }
    createAdministrador (user)
}

export async function changeState ( state: estadoUser ){

}
