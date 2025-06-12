
import { createClient } from './server';
import { estadoSolicitud } from '@/types/estado-solicitud';
import { solicitud } from '@/types/solicitud';

export async function getSolicitudesReserva (): Promise<solicitud[]|null>{
    const supabase = await createClient();
    const { data: solicitudreserva } = await supabase.from("solicitudreserva").select();
    return solicitudreserva
}

export async function getSolicitudReserva( id:string|null|undefined ): Promise<solicitud|null>{
    const supabase = await createClient();
    const { data: solicitudreserva } = (await supabase.from("solicitudreserva").select().eq( "id", id ).single());
    return solicitudreserva
}

export async function createSolicitud ( solicitud: solicitud ){
    const supabase = await createClient();
    const { id, ...soliSinId } = solicitud
    const query = await supabase.from("solicitudreserva").insert(soliSinId)
    console.log(JSON.stringify(query))
    return query
}

export async function updateStateSolicitud ( state: estadoSolicitud, id: string|null|undefined ){
    const supabase = await createClient()
    await supabase.from("solicitudreserva").update({ estado: state }).eq("id", id)
}

export async function updatePagoId (id:string|null|undefined, pagoid: string|null|undefined){
  const supabase = await createClient()
  await supabase.from("solicitudreserva").update({ pagoid:pagoid }).eq("id", id)
}

export async function getSolicitudesReservaFilters(
  desde?: Date|null|undefined,
  hasta?: Date|null|undefined,
  clienteIds?: number[]|null|undefined
): Promise<solicitud[] | null> {
  const supabase = await createClient();

  let query = supabase.from("solicitudreserva").select("*");

  if (desde) {
    query = query.gte("fechadesde", desde.toISOString());
  }
  if (hasta) {
    query = query.lte("fechahasta", hasta.toISOString());
  }

  if (clienteIds && clienteIds.length > 0) {
    query = query.in("solicitante", clienteIds);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener solicitudes filtradas:", error.message);
    return null;
  }

  return data;
}