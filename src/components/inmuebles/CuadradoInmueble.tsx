import Link from 'next/link';

type CuadradoAlquilerProps = {
  nom: string;
  ciu: string;
  imagen: string;
  className?: string;
};

export default function CuadradoInmueble({
  nom,
  ciu,
  imagen,
}: CuadradoAlquilerProps) {
    return <>
                <div className="shadow-md rounded-lg h-110 w-90 text-lg ">
                  <img src={imagen} className="h-70 rounded-lg"></img>
                  <div className="mt-6">
                    <label className="px-6">Nombre:{nom} </label>
                    <label className="px-6">Ciudad:{ciu}</label>
                  </div>
                  <Link href= "/detalleinmueble"> 
                    <div className="flex mt-3">
                      <button className=" bg-black hover:bg-gray-300 text-white w-200 rounded-xl w-1/6 h-13 mx-5">Reservar </button>
                    </div>
                  </Link>
                </div>  
    </> 
}