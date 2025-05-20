
import { createClient } from './server';
import { estadoInmueble } from '../../types/estado-inmueble';

export async function getPagos (){
    const supabase = await createClient();
    const { data: inmueble } = await supabase.from("pago").select();
    return JSON.stringify(inmueble)
}

export async function getPago( id:number ) {
    const supabase = await createClient();
    const { data: pago } = (await supabase.from("pago").select().eq( "id", id ).single());
    return JSON.stringify(pago)
}

export async function createPago ( pago: {
    numerotarjeta:number,
    numeroseguridad:number,
    clienteid:number
} ){
    const supabase = await createClient();
    await supabase.from("pago").insert(pago)
}

export async function updateStatePago ( state: estadoPago, id: number ){
    const supabase = await createClient()
    await supabase.from("pago").update({ estado: state }).eq("id", id)
}


export async function getStatePago (id:number){
    const supabase = await createClient()
    await supabase.from("pago").select("estado").eq("id", id)
}