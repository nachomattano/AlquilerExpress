
import { createClient } from './server';
import { alquiler } from '@/types/alquiler';

export async function getAlquileres (): Promise<alquiler[]|null|undefined>{
    const supabase = await createClient();
    const { data: alquiler } = await supabase.from("alquiler").select();
    return alquiler
}

export async function getAlquileresParaInmueble( id:string ):Promise<alquiler[]|null|undefined> {
    const supabase = await createClient();
    const { data: alquiler } = (await supabase.from("alquiler").select().eq( "inmuebleid", id ));
    return alquiler
}

export async function getAlquilerPorCheckin( id:string|null|undefined ):Promise<alquiler|null|undefined> {
    const supabase = await createClient();
    const { data: alquiler } = (await supabase.from("alquiler").select().eq( "checkinid", id ).single());
    return alquiler
}

export async function getAlquiler( id:string ):Promise<alquiler|null|undefined> {
    const supabase = await createClient();
    const { data: alquiler } = (await supabase.from("alquiler").select().eq( "id", id ).single());
    return alquiler
}

export async function createAlquiler ( alquiler: alquiler ){
    const supabase = await createClient();
    const { id, ...sinId } = alquiler
    const { error } =  await supabase.from("alquiler").insert(sinId)
    console.log(`error creando alquiler -> ${ JSON.stringify(error) }`)
}