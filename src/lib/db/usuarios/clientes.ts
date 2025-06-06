import { estadoUser } from '@/types/estado-cliente';
import { createClient } from '../server';
import { user } from '@/types/user';

export async function getClientes (): Promise<user[]|null>{
    const supabase = await createClient();
    const { data: cliente } = await supabase.from("cliente").select();
    return cliente
}

export async function getClienteMail( mail:string|null|undefined ): Promise<user> {
    const supabase = await createClient();
    const { data: cliente } = (await supabase.from("cliente").select().eq( "mail", mail ).single());
    return cliente
}

export async function getClienteId( id:string|null|undefined ): Promise<user> {
    const supabase = await createClient();
    const { data: cliente } = (await supabase.from("cliente").select().eq( "id", id ).single());
    return cliente
}

export async function createCliente ( cliente: user ){
    const supabase = await createClient();
     const { id, ...clienteSinId } = cliente;
    const resp= await supabase.from("cliente").insert(clienteSinId)
    console.log(JSON.stringify(resp))
}

export async function modificarContraseña ( contraseña:string , id: number ){
    const supabase = await createClient()
    await supabase.from("cliente").update({ contraseña: contraseña }).eq("id", id)
}

export async function deleteCliente ( id: string ){
    const supabase = await createClient()
    await supabase.from("empleado").update({ estado: estadoUser.inactivo }).eq("id", id)
}

export async function setClienteActivo ( id: string ){
    const supabase = await createClient()
    await supabase.from("empleado").update({ estado: estadoUser.activo }).eq("id", id)
}