import { user } from '@/types/user';
import { createClient } from '../server';
import { estadoUser } from '@/types/estado-cliente';

export async function getEmpleados ():Promise<user[]|null>{
    const supabase = await createClient();
    const { data: empleado } = await supabase.from("empleado").select();
    return empleado
}

export async function getEmpleado( mail:string ): Promise<user> {
    const supabase = await createClient();
    const { data: empleado } = (await supabase.from("empleado").select().eq( "mail", mail ).single());
    return empleado
}

export async function createEmpleado ( empleado: user ){
    const supabase = await createClient();
    await supabase.from("empleado").insert(empleado)
}

export async function modificarContraseña ( contraseña: string, id: number ){
    const supabase = await createClient()
    await supabase.from("empleado").update({ contraseña: contraseña }).eq("id", id)
}

export async function deleteEmpleado ( id: number ){
    const supabase = await createClient()
    await supabase.from("empleado").update({ estado: estadoUser.inactivo }).eq("id", id)
}