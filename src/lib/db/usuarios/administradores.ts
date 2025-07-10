import { user } from '@/types/user';
import { createClient } from '../server';

export async function getAdministradores ():Promise<user[]|null>{
    const supabase = await createClient();
    const { data: administrador } = await supabase.from("administrador").select();
    return administrador
}

export async function getAdministradorDNI( DNI:string ): Promise<user> {
    const supabase = await createClient();
    const { data: administrador } = (await supabase.from("administrador").select().eq( "dni", DNI ).single());
    console.log(JSON.stringify(await supabase.from("administrador").select().eq( "dni", DNI ).single()))
    return administrador
}

export async function getAdministrador( id:string ): Promise<user> {
    const supabase = await createClient();
    const { data: administrador } = (await supabase.from("administrador").select().eq( "id", id ).single());
    console.log(JSON.stringify(await supabase.from("administrador").select().eq( "id", id ).single()))
    return administrador
}

export async function getAdministradorMail( mail:string ): Promise<user> {
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

export async function modificarContraseñaAdministrador ( contraseña:string, id: string|null|undefined ){
    const supabase = await createClient()
    await supabase.from("administrador").update({ contraseña: contraseña }).eq("id", id)
}

export async function modifyAdmin (user:user){
    const supabase = await createClient()
    const { id, ...sinId } = user
    const resp = await supabase
        .from("administrador")
        .update(sinId)
        .eq("id", id);

    console.log(resp)
}