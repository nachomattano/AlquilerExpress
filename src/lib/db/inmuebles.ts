
import { createClient } from './server';
import { estadoInmueble } from '../../../.next/types/estados';

export async function getInmuebles (){
    const supabase = await createClient();
    const { data: inmueble } = await supabase.from("inmueble").select();
    return JSON.stringify(inmueble)
}

export async function getInmueble( id:number ) {
    const supabase = await createClient();
    const { data: inmueble } = (await supabase.from("inmueble").select().eq( "id", id ).single());
    return JSON.stringify(inmueble)
}

export async function createInmueble ( inmueble: {
    localidad:string,
    cantidadHuespedes:number,
    espacioCochera:number,
    dpto:string,
    direccion:string,
    estado: estadoInmueble
} ){
    const supabase = await createClient();
    await supabase.from("inmueble").insert(inmueble)
}

export async function updateStateInmueble ( state: estadoInmueble, id: number ){
    const supabase = await createClient()
    await supabase.from("inmueble").update({ estado: state }).eq("id", id)
}


export async function getEstadoInmueble (){

}

export async function setEstadoInmueble (){

}