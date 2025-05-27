type CuadradoAlquilerProps = {
  nom: string;
  ciu: string;
  localidad: string;
  tipo: string;
  imagen: string;
  className?: string;
};

export default function CuadradoInmueble({
  nom,
  ciu,
  localidad,
  tipo,
  imagen,
  className = "",
}: CuadradoAlquilerProps) {
    return <>
        <div  className="flex bg-blue-100 rounded-lg h-35 text-lg ">
            <img src={imagen} className="w-1/6 h=1/8 rounded-lg"></img>
            <div className="grid">
                <label className="px-2 ">Nombre:{nom} </label>
                <label className="px-2 ">Ciudad:{ciu}</label>
                <label className="px-2 ">Localidad:{localidad}</label>
                <label className="px-2 ">Tipo:{tipo}</label>
            </div>
            <div className="flex justify-end w-200 pt-10">
                <button className=" bg-black text-white rounded-xl w-1/6 h-13 mx-5">Reservar </button>
                <button className=" bg-black text-white rounded-xl w-1/6 h-13">Ver Mas </button>
            </div>
        </div>    
    </> 
}