import { typeUser } from "@/types/user";
import { getUsuarioPorMail } from "./db/usuarios/usuarios";

export async function inicarSesion ( contraseña:string, mail:string ): Promise<{correct: boolean, userType: typeUser|undefined}>{
    const user = await getUsuarioPorMail(mail);

    return {correct: (user.user?.contraseña == contraseña), userType:user.userType}
}