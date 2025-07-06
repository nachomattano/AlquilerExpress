
import { createClient } from './server';
import { estadoInmueble } from '../../types/estado-inmueble';
import { checkin } from '@/types/check-in';
import { getReserva } from './reservas';
import { createAlquiler } from './alquileres';

export async function getCheckins(): Promise<checkin[]|null|undefined> {
    const supabase = await createClient();
    const { data: checkin } = (await supabase.from("checkin").select());
    return checkin
}


export async function getCheckinPorInmueble( id:string|null|undefined ) : Promise<checkin[]|null|undefined>{
    const supabase = await createClient();
    const { data: checkin } = (await supabase.from("checkin").select().eq( "inmuebleid", id ));
    return checkin
}

export async function getCheckin( id:string|null|undefined ) : Promise<checkin|null|undefined>{
    const supabase = await createClient();
    const { data: checkin } = (await supabase.from("checkin").select().eq( "id", id ).single());
    return checkin
}

export async function getCheckinReserva( id:string|null|undefined ) : Promise<checkin|null|undefined>{
    const supabase = await createClient();
    const { data: checkin } = (await supabase.from("checkin").select().eq( "reservaid", id ).single());
    return checkin
}

export async function createCheckin ( checkin:checkin ){
    const supabase = await createClient();
    const { id, ...sinid } = checkin
    const {error} = await supabase.from("checkin").insert(sinid)
    let checkInCreated = await getCheckinReserva(sinid.reservaid)
    const reserva = await getReserva(checkInCreated?.id)
    const alquiler = { id:'', fechadesde:new Date(), fechahasta: null, clienteid:reserva?.solicitante, checkinid:checkInCreated?.id, checkoutid: null, costo: reserva?.costo, cantidadhuespedes: reserva?.cantidad, inmuebleid: reserva?.inmuebleid  }
    await createAlquiler(alquiler)
    await supabase.from("inmueble").update({ estado: estadoInmueble.alquilado }).eq("id", reserva?.inmuebleid)
    return error
}

