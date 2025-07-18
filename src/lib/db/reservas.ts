
import { reserva } from '@/types/reserva';
import { createClient } from './server';
import { estadoReserva } from '@/types/estado-reservas';

export async function getReservas ():Promise<reserva[]|null|undefined>{
    const supabase = await createClient();
    const { data: reserva } = await supabase.from("reserva").select();
    return reserva
}

export async function getReservasPorInmueble (id:string):Promise<reserva[]|null|undefined>{
    const supabase = await createClient();
    const { data: reserva } = (await supabase.from("reserva").select().eq( "inmuebleid", id ).single());
    return reserva
}

export async function getReserva( id:string|null|undefined ):Promise<reserva|null|undefined> {
    const supabase = await createClient();
    const { data: reserva } = (await supabase.from("reserva").select().eq( "id", id ).single());
    return reserva
}

export async function createReserva ( reserva: reserva ){
    const supabase = await createClient();
    const { id, ...sinId } = reserva
    const { error } = await supabase.from("reserva").insert(sinId)
    console.log("ERROR", error)
    return error
}

export async function updateStateReserva ( state: estadoReserva, id: string|null|undefined ){
    const supabase = await createClient()
    await supabase.from("reserva").update({ estado: state }).eq("id", id)
}