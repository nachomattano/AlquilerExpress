
import { createClient } from './server';
import { estadoInmueble } from '../../types/estado-inmueble';
import { checkout } from '@/types/check-out';
import { getCheckin } from './check-in';
import { getReserva } from './reservas';

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

export async function createCheckout ( checkout: checkout, estado: estadoInmueble ){
    const supabase = await createClient();
    const {error} = await supabase.from("checkout").insert(checkout)
    const checkin = await getCheckin(checkout.checkinid)
    const reserva = await getReserva(checkin?.id)
    await supabase.from("inmueble").update({ estado: estado }).eq("id", reserva?.inmuebleid)
    return error
}

