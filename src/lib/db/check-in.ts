
import { createClient } from './server';
import { estadoInmueble } from '../../types/estado-inmueble';

export async function getCheckin( id:number ) {
    const supabase = await createClient();
    const { data: checkin } = (await supabase.from("checkin").select().eq( "id", id ).single());
    return JSON.stringify(checkin)
}

export async function createCheckin ( checkin: {
    empleadoid:number,
    fecha:Date
}, id:number ){
    const supabase = await createClient();
    await supabase.from("checkin").insert(checkin)
    await supabase.from("inmueble").update({ estado: estadoInmueble.alquilado }).eq("id", id)
}

