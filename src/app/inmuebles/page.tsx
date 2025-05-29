import CuadradoInmueble from "@/components/inmuebles/CuadradoInmueble";
import { inmueble } from "@/types/inmueble";

export default async function Alquiler() {
  const inmueblesRaw = await fetch("http://localhost:3000/api/inmueble", {
    method:'GET'
  })
  const inmuebles = await inmueblesRaw.json()
  return (
    <div>
      <h1 className="text-4xl font-bold mt-10 mb-8 text-center">Inmuebles en Alquiler</h1>
        <div className="flex grid grid-cols-3 gap-15 p-35 pt-10 mb-8">
          {inmuebles.map((element: inmueble)=> {
            return(<div>
            
            <CuadradoInmueble
            inmueble={element}

          /></div>)})}
        </div>
    </div>
  );
}