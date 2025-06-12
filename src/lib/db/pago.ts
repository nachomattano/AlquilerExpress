
import { pago } from '@/types/pago';
import { createClient } from './server';
import { estadoPago } from '@/types/estado-pago';

export async function getPagos (): Promise<pago[]|null>{
    const supabase = await createClient();
    const { data: pago } = await supabase.from("pago").select();
    return pago
}

export async function getPago( id:string ): Promise<pago|null> {
    const supabase = await createClient();
    const { data: pago } = (await supabase.from("pago").select().eq( "id", id ).single());
    return pago
}

export async function getPagoSolicitudId (id:string): Promise<pago|null>{
    const supabase = await createClient();
    const { data: pago } = (await supabase.from("pago").select().eq( "solicitudid", id ).single());
    return pago
}

export async function createPago ( pago: pago ): Promise<pago|null>{
    const supabase = await createClient();
    const { id, ...pagosinid } = pago
    await supabase.from("pago").insert(pagosinid)
    const solicitudid = await getPagoSolicitudId (pagosinid.solicitudid as string)
    return solicitudid
}

export async function updateStatePago ( state: estadoPago, id: string ){
    const supabase = await createClient()
    await supabase.from("pago").update({ estado: state }).eq("id", id)
}


export async function getStatePago (id:string){
    const supabase = await createClient()
    await supabase.from("pago").select("estado").eq("id", id)
}

export async function updatePago ( id:string|null|undefined,
    numerotarjeta:string|null|undefined,
    numeroseguridad:string|null|undefined,
    fullname: string|null|undefined,){
    const supabase = await createClient()
    const resp = await supabase
        .from("pago")
        .update({numerotarjeta: numerotarjeta, numeroseguridad:numeroseguridad, fullname:fullname})
        .eq("id", id);
    console.log(JSON.stringify(resp))
}