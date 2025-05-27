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
        
            
            <div className="p-1 mx-5 mt-15 bg-white rounded-xl shadow-md space-y-4">
                <img src={imagen} className="h-150 object-cover rounded-lg "></img>    
                <div className='px-9 gap-2 p-4'>
                <label className="shadow-md bg-orange-100 px-4 py-2 rounded-md text-base ">Ciudad:{ciu}</label>
                <label className="shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Localidad:{loc}</label>
                <label className="shadow-md bg-orange-100 px-4 py-2 rounded-md text-base ">Cantidad de huéspedes:{cantHuespedes}</label>
                <label className="absolute top-50 px-70 text-4xl">{nom}</label>
                <label className="absolute  px-70 top-70 text-2xl">Descripcion:{descrip}</label>
                </div>
                <Link href= "/alquilar"> 
                    <div className="absolute  px-210 top-120">
                      <button className=" bg-black hover:bg-gray-300 text-white w-150 rounded-xl w-1/2 h-13 mx-5">Alquilar</button>
                    </div>
                </Link>
            </div>
        </>
}   