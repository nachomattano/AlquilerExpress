import { createClient } from './server';

export async function getDisponibilidad( id:number ) {
    const supabase = await createClient();
    const { data: disponibilidad } = (await supabase.from("disponibilidad").select().eq( "id", id ).gt("fechahasta", new Date().toISOString()));
    return JSON.stringify(disponibilidad)
}

export async function createDisponibilidad ( disponibilidad: {
    fechadesde:Date,
    fechahasta:Date,
    inmuebleid:number
} ){
    const supabase = await createClient();
    await supabase.from("disponibilidad").insert(disponibilidad)
}
