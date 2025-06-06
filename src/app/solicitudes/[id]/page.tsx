
import DetalleSolicitud from "@/components/DetalleSolicitud"
interface PageProps {
  params: { id: string };
}

export default async function detalleSolicitud ({ params }: PageProps){
    const {id} = await params
    const solicitudesRaw = await fetch (`http://localhost:3000/api/solicitudes/${id}`,{
        method:'GET'
    })

    const solicitud = await solicitudesRaw.json()

    return (<>
        <div>
                    
                    <DetalleSolicitud
                    solicitud={solicitud}      
                    />
        </div>
    </>)
}