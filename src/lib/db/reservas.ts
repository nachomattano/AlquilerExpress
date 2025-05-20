
import { createClient } from './server';
import { estadoReserva } from '@/types/estado-reservas';

export async function getReservas (){
    const supabase = await createClient();
    const { data: reserva } = await supabase.from("reserva").select();
    return JSON.stringify(reserva)
}

export async function getReserva( id:number ) {
    const supabase = await createClient();
    const { data: reserva } = (await supabase.from("reserva").select().eq( "id", id ).single());
    return JSON.stringify(reserva)
}

export async function createReserva ( reserva: {
    fechadesde:Date,
    fechahasta:Date,
    cantidad:number,
    solicitante:number,
    pagoid:number,
    estado: estadoReserva.Vigente
} ){
    const supabase = await createClient();
    await supabase.from("reserva").insert(reserva)
}

export async function updateStateReserva ( state: estadoReserva, id: number ){
    const supabase = await createClient()
    await supabase.from("reserva").update({ estado: state }).eq("id", id)
}