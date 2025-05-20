import { getUsuarioPorMail } from "./db/usuarios/usuarios";

export async function inicarSesion ( contraseña:string, mail:string ): Promise<{correct: boolean, admin: boolean|undefined}>{
    const user = await getUsuarioPorMail(mail);

    return {correct: (user.user?.contrasenia == contraseña), admin:user.administrador}
}