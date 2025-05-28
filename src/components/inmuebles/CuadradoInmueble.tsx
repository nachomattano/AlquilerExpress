import { inmueble } from '@/types/inmueble';
import Link from 'next/link';

type CuadradoAlquilerProps = {
  nombre: string|null|undefined;
  ciu: string|null|undefined;
  localidad : string|null|undefined;
  className?: string|null|undefined;
};

export default function CuadradoInmueble({inmueble}:{inmueble:inmueble}) {
    return <>
                <div className="shadow-md rounded-lg h-110 w-90 text-lg ">
                  <div className="grid mt-6">
                    <label className="px-6">Nombre:{inmueble.titulo} </label>
                    <label className="px-6">Ciudad:{inmueble.ciudad}</label>
                    <label className="px-6">Localidad:{inmueble.localidad}</label>
                  </div>
                 <Link href={`/detalleinmueble/${inmueble.id}`}>
                    <div className="flex mt-3">
                      <button className=" bg-black hover:bg-gray-300 text-white w-200 rounded-xl w-1/6 h-13 mx-5">Reservar </button>
                    </div>
                  </Link>
                </div>  
    </> 
}