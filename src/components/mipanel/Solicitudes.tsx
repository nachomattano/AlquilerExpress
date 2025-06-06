'use Client'
import { updateStateReserva } from "@/lib/db/reservas"
import { getSolicitudesReserva, getSolicitudReserva } from "@/lib/db/solicitudes-reservas"
import { estadoSolicitud } from "@/types/estado-solicitud"
import { solicitud } from "@/types/solicitud"
import { user } from "@/types/user"
import { useEffect, useState } from "react"
import Solicitud from "./Solicitud"

export default function Solicitudes (){
     const [solicitudes, setSolicitudes] = useState<solicitud[] | null>(null);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            const data = await getSolicitudesReserva();
            setSolicitudes(data);
        };
        fetchSolicitudes();
    }, []);

    return (
        <div className="shadow-md rounded-lg h-110 w-90 text-lg">
            <div className="grid mt-6">
                {solicitudes?.map((element: solicitud) => {
                    if (typeof window !== 'undefined' && localStorage.getItem('userType') === 'cliente') {
                        return <Solicitud key={element.id} solicitud={element} />;
                    }
                    if (element.estado !== 'Rechazada') {
                        return <Solicitud key={element.id} solicitud={element} />;
                    }
                    return null;
                })}
            </div>
        </div>
    );
}