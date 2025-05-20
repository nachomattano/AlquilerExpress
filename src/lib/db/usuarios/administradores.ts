import { user } from '@/types/user';
import { createClient } from '../server';

export async function getAdministradores ():Promise<any[]|null>{
    const supabase = await createClient();
    const { data: administrador } = await supabase.from("administrador").select();
    return administrador
}

export async function getAdministrador( mail:string ): Promise<user> {
    const supabase = await createClient();
    const { data: administrador } = (await supabase.from("administrador").select().eq( "mail", mail ).single());
    return administrador
}

export async function createAdministrador ( administrador: {
    nombre:string,
    contrasenia:number,
    DNI:number,
    edad:string,
    mail:string,
    
} ){
    const supabase = await createClient();
    await supabase.from("administrador").insert(administrador)
}

export async function modificarContraseña ( contraseña:string, id: number ){
    const supabase = await createClient()
    await supabase.from("administrador").update({ contraseña: contraseña }).eq("id", id)
}