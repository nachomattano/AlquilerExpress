import DetalleDelInmueble from "@/components/DetalleInmueble/DetalleDelInmueble";

interface PageProps {
  params: { id: string };
}

export default async function detalleinmueble ({ params }: PageProps){
    const {id} = await params
    const inmueblesRaw = await fetch (`http://localhost:3000/api/inmueble/${id}`,{
        method:'GET'
    })

    const inmueble = await inmueblesRaw.json()
    return (
        <div>
            
            <DetalleDelInmueble 
            inmueble={inmueble}     
            />
        </div>

    );

}