
import { createClient } from './server';
import { estadoInmueble } from '../../types/estado-inmueble';
import { estadoSolicitud } from '@/types/estado-solicitud';

export async function getSolicitudesReserva (){
    const supabase = await createClient();
    const { data: solicitudreserva } = await supabase.from("solicitudreserva").select();
    return JSON.stringify(solicitudreserva)
}

export async function getSolicitudReserva( id:number ) {
    const supabase = await createClient();
    const { data: solicitudreserva } = (await supabase.from("solicitudreserva").select().eq( "id", id ).single());
    return JSON.stringify(solicitudreserva)
}

export async function createSolicitud ( solicitud: {
    fechadesde:Date,
    fechahasta:Date,
    cantidad:number,
    solicitante:number,
    acompañantesid:number[],
    inmuebleid: number,
    estado: estadoSolicitud.Pendiente
} ){
    const supabase = await createClient();
    await supabase.from("solicitudreserva").insert(solicitud)
}

export async function updateStateReserva ( state: estadoInmueble, id: number ){
    const supabase = await createClient()
    await supabase.from("inmueble").update({ estado: state }).eq("id", id)
}