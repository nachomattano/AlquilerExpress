
import { createClient } from './server';
import { estadoInmueble } from '../../types/estado-inmueble';
import { checkout } from '@/types/check-out';
import { getCheckin } from './check-in';
import { getReserva } from './reservas';
import { getAlquilerPorCheckin } from './alquileres';

export async function getCheckoutPorInmueble( id:number ):Promise<checkout[]|null|undefined> {
    const supabase = await createClient();
    const { data: checkout } = (await supabase.from("checkout").select().eq( "inmuebleid", id ).single());
    return checkout
}

export async function getCheckouts(  ):Promise<checkout[]|null|undefined> {
    const supabase = await createClient();
    const { data: checkout } = (await supabase.from("checkout").select());
    return checkout
}

export async function getCheckout( id:number ):Promise<checkout|null|undefined> {
    const supabase = await createClient();
    const { data: checkout } = (await supabase.from("checkout").select().eq( "id", id ).single());
    return checkout
}

export async function getCheckinReserva( id:string|null|undefined ) : Promise<checkout|null|undefined>{
    const supabase = await createClient();
    const { data: checkin } = (await supabase.from("checkout").select().eq( "checkinid", id ).single());
    console.log(`esto me devolvio -> ${checkin}`)
    return checkin
}

export async function createCheckout ( checkout: checkout, estado: estadoInmueble ){
    const supabase = await createClient();
    const {id, ...sinid} = checkout
    const {error} = await supabase.from("checkout").insert(sinid)
    const checkoutCreated = await getCheckinReserva(checkout.checkinid)
    const checkin = await getCheckin(checkout.checkinid)
    const reserva = await getReserva(checkin?.id)
    const alquiler = await getAlquilerPorCheckin(checkout?.checkinid)
    console.log(JSON.stringify(checkoutCreated))
    await supabase.from("inmueble").update({ estado: estado }).eq("id", reserva?.inmuebleid)
    await supabase.from("alquiler").update({ checkoutid: 1 }).eq("id", alquiler?.id)
    return error
}

