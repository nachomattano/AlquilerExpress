
import { createCliente } from "./db/usuarios/clientes";
import { createEmpleado } from "./db/usuarios/empleados";
import { createAdministrador } from "./db/usuarios/administradores";
import { typeUser, user } from "@/types/user";
import { estadoUser } from "@/types/estado-cliente";



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
