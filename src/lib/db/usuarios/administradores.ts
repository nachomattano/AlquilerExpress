import { user } from '@/types/user';
import { createClient } from '../server';

export async function getAdministradores ():Promise<user[]|null>{
    const supabase = await createClient();
    const { data: administrador } = await supabase.from("administrador").select();
    return administrador
}

export async function getAdministrador( mail:string ): Promise<user> {
    const supabase = await createClient();
    const { data: administrador } = (await supabase.from("administrador").select().eq( "mail", mail ).single());
    console.log(JSON.stringify(await supabase.from("administrador").select().eq( "mail", mail ).single()))
    return administrador
}

export async function createAdministrador ( administrador: user ){
    const supabase = await createClient();
     const { id, ...adminSinId } = administrador;
    const resp = await supabase.from("administrador").insert(adminSinId)
    
}

export async function modificarContraseña ( contraseña:string, id: number ){
    const supabase = await createClient()
    await supabase.from("administrador").update({ contraseña: contraseña }).eq("id", id)
}