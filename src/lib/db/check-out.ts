
import { createClient } from './server';
import { estadoInmueble } from '../../types/estado-inmueble';

export async function getCheckout( id:number ) {
    const supabase = await createClient();
    const { data: checkout } = (await supabase.from("checkout").select().eq( "id", id ).single());
    return JSON.stringify(checkout)
}

export async function createCheckout ( checkout: {
    comentarios:string,
    empleadoid:number,
    fecha:Date
}, id:number ){
    const supabase = await createClient();
    await supabase.from("checkout").insert(checkout)
    await supabase.from("inmueble").update({ estado: estadoInmueble.disponible }).eq("id", id)
}

