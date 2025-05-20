import { createClient } from '../server';
import { estadoEmpleado } from '@/types/estado-empleados';

export async function getEmpleados (){
    const supabase = await createClient();
    const { data: empleado } = await supabase.from("empleado").select();
    return JSON.stringify(empleado)
}

export async function getEmpleado( id:number ) {
    const supabase = await createClient();
    const { data: empleado } = (await supabase.from("empleado").select().eq( "id", id ).single());
    return JSON.stringify(empleado)
}

export async function createEmpleado ( empleado: {
    nombre:string,
    mail:number,
    DNI:number,
    constraseña:string,
    estado: estadoEmpleado
} ){
    const supabase = await createClient();
    await supabase.from("empleado").insert(empleado)
}

export async function modificarContraseña ( contraseña: string, id: number ){
    const supabase = await createClient()
    await supabase.from("empleado").update({ contraseña: contraseña }).eq("id", id)
}

export async function deleteEmpleado ( id: number ){
    const supabase = await createClient()
    await supabase.from("empleado").update({ estado: estadoEmpleado.inactivo }).eq("id", id)
}