import { estadoCliente } from '@/types/estado-cliente';
import { createClient } from '../server';

export async function getClientes (){
    const supabase = await createClient();
    const { data: inmueble } = await supabase.from("cliente").select();
    return JSON.stringify(inmueble)
}

export async function getCliente( id:number ) {
    const supabase = await createClient();
    const { data: inmueble } = (await supabase.from("cliente").select().eq( "id", id ).single());
    return JSON.stringify(inmueble)
}

export async function createCliente ( cliente: {
    nombre:string,
    contraseña:number,
    DNI:number,
    edad:string,
    mail:string,
    estado: estadoCliente
} ){
    const supabase = await createClient();
    await supabase.from("cliente").insert(cliente)
}

export async function modificarContraseña ( contraseña:string , id: number ){
    const supabase = await createClient()
    await supabase.from("cliente").update({ contraseña: contraseña }).eq("id", id)
}

export async function deleteCliente ( id: number ){
    const supabase = await createClient()
    await supabase.from("empleado").update({ estado: estadoCliente.inactivo }).eq("id", id)
}