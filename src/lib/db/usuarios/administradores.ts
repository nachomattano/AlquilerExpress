import { createClient } from '../server';

export async function getAdministradores (){
    const supabase = await createClient();
    const { data: inmueble } = await supabase.from("administrador").select();
    return JSON.stringify(inmueble)
}

export async function getAdministrador( id:number ) {
    const supabase = await createClient();
    const { data: inmueble } = (await supabase.from("administrador").select().eq( "id", id ).single());
    return JSON.stringify(inmueble)
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