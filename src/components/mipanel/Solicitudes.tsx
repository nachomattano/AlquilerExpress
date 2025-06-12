
'use client'
import { getSolicitudesReserva } from "@/lib/db/solicitudes-reservas"
import { estadoSolicitud } from "@/types/estado-solicitud"
import { solicitud } from "@/types/solicitud"
import { useEffect, useState } from "react"
import Solicitud from "./Solicitud"

export default function Solicitudes() {
    const [solicitudes, setSolicitudes] = useState<solicitud[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [userType, setUserType] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userString = localStorage.getItem('user');
            const type = localStorage.getItem('userType');
            if (userString) {
                const user = JSON.parse(userString);
                setUserId(user.id);
            }
            setUserType(type);
        }
    }, []);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            const data = await getSolicitudesReserva();

            if (userType === 'cliente' && userId) {
                const propias = (data || []).filter((s: solicitud) => s.solicitante === userId);
                setSolicitudes(propias);
            } else {
                const activas = (data || []).filter((s: solicitud) => s.estado !== estadoSolicitud.Rechazada);
                setSolicitudes(activas);
            }
        };

        if (userType !== null) {
            fetchSolicitudes();
        }
    }, [userType, userId]);

    return (
        <div className="shadow-md rounded-lg h-110 w-90 text-lg">
            <div className="grid mt-6">
                {solicitudes.length > 0 ? (
                    solicitudes.map((element: solicitud) => (
                        <Solicitud key={element.id} solicitud={element} />
                    ))
                ) : (
                    <p className="text-center text-gray-600">No hay ninguna solicitud de reserva.</p>
                )}
            </div>
        </div>
    );
}