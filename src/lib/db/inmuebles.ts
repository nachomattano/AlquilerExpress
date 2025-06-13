import { createClient } from './server';
import { estadoInmueble } from '../../types/estado-inmueble';
import { inmueble } from '@/types/inmueble';

export async function getInmuebles(): Promise<inmueble[]|null|undefined>{
    const supabase = await createClient();
    const { data: inmueble } = await supabase.from("inmueble").select();
    return inmueble
}

export async function getInmueble( id:string ) : Promise<inmueble|null|undefined>{
    const supabase = await createClient();
    console.log('ENTRE ACAAAAAAAA')
    const { data: inmueble } = (await supabase.from("inmueble").select().eq( "id", id ).single());
    console.log(JSON.stringify(inmueble))
    return inmueble
}

export async function createInmueble ( inmueble: inmueble ){
    const supabase = await createClient();
    const { id, ...inmuebleSinId } = inmueble
    const query=await supabase.from("inmueble").insert(inmuebleSinId)
    console.log(JSON.stringify(query))
}

export async function updateStateInmueble ( state: estadoInmueble, id: string ){
    const supabase = await createClient()
    await supabase.from("inmueble").update({ estado: state }).eq("id", id)
}

export async function modifyInmueble (inmueble:inmueble){
    const supabase = await createClient()
    const { id, ...sinId } = inmueble
    const resp = await supabase
        .from("inmueble")
        .update(sinId)
        .eq("id", id);

    console.log(resp)
}
export async function getEstadoInmueble (id:number){
    const supabase = await createClient()
    await supabase.from("inmueble").select("estado").eq("id", id)
}

export async function setEstadoInmueble (id:number){

}

export async function existeNombre (nombre:string|null|undefined): Promise<inmueble|null|undefined>{
    const supabase = await createClient()
    const {data:inmueble} = await supabase.from("inmueble").select().eq("titulo", nombre).maybeSingle()
    return inmueble
}