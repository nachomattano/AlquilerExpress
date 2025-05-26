import Link from 'next/link';
type Detalle = {
    nom: string; 
    ciu: string; 
    loc: string; 
    cantHuespedes: string; 
    imagen: string;
    descrip: string;  
    className?: string;
}; 

export default function DetalleDelInmueble({
    nom, 
    ciu, 
    loc, 
    cantHuespedes, 
    imagen,
    descrip, 
}: Detalle){
    return <>
            <label className="absolute top-30 px-8 text-4xl">{nom}</label>
            <div className="p-1 mx-5 mt-15 bg-white rounded-xl shadow-md space-y-4">
                <img src={imagen} className="h-150 object-cover rounded-lg"></img>
                    <label className="px-6 text-2xl">Ciudad:{ciu}</label>
                    <label className="px-6 text-2xl">Localidad:{loc}</label>
                    <label className="px-6 text-2xl">Cantidad de huéspedes:{cantHuespedes}</label>
                    <label className="px-6 grid">Descripcion:{descrip}</label>
                <Link href= "/alquilar"> 
                    <div className="">
                      <button className=" bg-black hover:bg-gray-300 text-white w-200 rounded-xl w-1/6 h-13 mx-5">Alquilar</button>
                    </div>
                  </Link>
            </div>
            
        </>
}   