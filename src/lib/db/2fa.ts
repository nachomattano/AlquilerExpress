
import { fa2 } from '@/types/code';
import { createClient } from './server';

export async function getCode (id:string|null|undefined, code:string|null|undefined):Promise<fa2|null|undefined>{
    const supabase = await createClient();
    
  const { data:facodes, error } = await supabase
    .from('2fa')
    .select()
    .eq('userid', id)
    .eq('code', code)
    .order('expiresat', { ascending: false }) // Por si hay más de uno
    .limit(1);
    console.log(JSON.stringify(facodes))
    const defFa = facodes ? facodes[0] : undefined;
    return defFa
}

export async function createCode ( fa: fa2 ){
    const supabase = await createClient();
    const { id, ...adminSinId } = fa;
    const resp = await supabase.from("2fa").insert(adminSinId)
    console.log(`respueta insert -> ${JSON.stringify(resp)}`)
}