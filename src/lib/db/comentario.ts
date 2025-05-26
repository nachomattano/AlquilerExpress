
import { createClient } from './server';

export async function getComentarios( id:number ) {
    const supabase = await createClient();
    const { data: comentario } = (await supabase.from("comentario").select().eq( "id", id ));
    return JSON.stringify(comentario)
}

export async function createComentario ( comentario: {
    comentario:string,
    inmuebleId:number
} ){
    const supabase = await createClient();
    await supabase.from("comentario").insert(comentario)
}


export async function createComentarioRespuesta ( comentario: {
    comentario:string,
    inmuebleid:number,
    comentarioid:number
} ){
    const supabase = await createClient();
    await supabase.from("comentario").insert(comentario)
}

export async function deleteComentario ( id: number ){
    const supabase = await createClient()
    await supabase.from("comentario").delete().eq("id", id)
}
