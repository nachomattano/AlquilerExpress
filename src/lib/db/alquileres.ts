
import { createClient } from './server';
import { estadoInmueble } from '../../types/estado-inmueble';

export async function getAlquileres (){
    const supabase = await createClient();
    const { data: alquiler } = await supabase.from("alquiler").select();
    return JSON.stringify(alquiler)
}

export async function getAlquileresParaInmueble( id:number ) {
    const supabase = await createClient();
    const { data: alquiler } = (await supabase.from("alquiler").select().eq( "inmuebleid", id ));
    return JSON.stringify(alquiler)
}

export async function createAlquiler ( alquiler: {
    fechadesde:Date,
    fechahasta:Date,
    cantidadHuespedes:number,
    clientid:number[],
    checkinid:string,
    checkoutid:string,
    inmuebleid:number,
    costo: number
} ){
    const supabase = await createClient();
    await supabase.from("alquiler").insert(alquiler)
}
