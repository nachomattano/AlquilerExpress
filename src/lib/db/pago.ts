
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

export async function createPago ( pago: pago ){
    const supabase = await createClient();
    await supabase.from("pago").insert(pago)
}

export async function updateStatePago ( state: estadoPago, id: string ){
    const supabase = await createClient()
    await supabase.from("pago").update({ estado: state }).eq("id", id)
}


export async function getStatePago (id:string){
    const supabase = await createClient()
    await supabase.from("pago").select("estado").eq("id", id)
}