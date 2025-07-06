
import { comentario } from '@/types/comentario';
import { createClient } from './server';

export async function getComentarios( id:string |null| undefined ):Promise<comentario[]|null|undefined>{
    const supabase = await createClient();
    const { data: comentario } = (await supabase.from("comentario").select().eq( "inmuebleid", id ));
    return comentario
}

export async function createComentario ( comentario:comentario){
    const supabase = await createClient();
    await supabase.from("comentario").insert(comentario)
}


export async function createComentarioRespuesta ( comentario: comentario ){
    const supabase = await createClient();
    await supabase.from("comentario").insert(comentario)
}

export async function deleteComentario ( id: number ){
    const supabase = await createClient()
    await supabase.from("comentario").delete().eq("id", id)
}
