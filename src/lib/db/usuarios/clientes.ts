import { estadoCliente } from '@/types/estado-cliente';
import { createClient } from '../server';
import { user } from '@/types/user';

export async function getClientes (): Promise<any[]|null>{
    const supabase = await createClient();
    const { data: cliente } = await supabase.from("cliente").select();
    return cliente
}

export async function getCliente( mail:string ): Promise<user> {
    const supabase = await createClient();
    const { data: cliente } = (await supabase.from("cliente").select().eq( "mail", mail ).single());
    return cliente
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