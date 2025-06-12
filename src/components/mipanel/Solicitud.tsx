import { updateStateReserva } from "@/lib/db/reservas"
import { getSolicitudReserva } from "@/lib/db/solicitudes-reservas"
import { getClienteId } from "@/lib/db/usuarios/clientes"
import { estadoSolicitud } from "@/types/estado-solicitud"
import { solicitud } from "@/types/solicitud"
import { user } from "@/types/user"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Solicitud({ solicitud }: { solicitud: solicitud }) {
    const [cliente, setCliente] = useState<user | null>(null);
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [estadoLocal, setEstadoLocal] = useState(solicitud.estado); // nuevo estado local

    useEffect(() => {
        const fetchCliente = async () => {
            const data = await getClienteId(solicitud?.solicitante);
            setCliente(data);
        };
        fetchCliente();
    }, [solicitud]);

    const handleAccept = async () => {
        const res = await fetch(`/api/solicitudes/${solicitud.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: estadoSolicitud.Aceptada }),
        });

        if (res.ok) {
            setEstadoLocal(estadoSolicitud.Aceptada);
            setMensaje(' Solicitud aceptada con éxito.');
        } else {
            alert(await res.text());
        }
    };

    const handleReject = async () => {
        const res = await fetch(`/api/solicitudes/${solicitud.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: estadoSolicitud.Rechazada }),
        });

        if (res.ok) {
            setEstadoLocal(estadoSolicitud.Rechazada);
            setMensaje(' Solicitud rechazada con éxito.');
        } else {
            alert(await res.text());
        }
    };

    const handleCancelar = async () => {
        const res = await fetch(`/api/solicitudes/${solicitud.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado: estadoSolicitud.Rechazada }),
        });

        if (res.ok) {
            setEstadoLocal(estadoSolicitud.Rechazada);
            setMensaje(' Solicitud cancelada con éxito.');
        } else {
            alert(await res.text());
        }
    };

    return (
        <div className="shadow-md rounded-lg p-4 text-base space-y-2">
            <div className="grid gap-1">
                <p><strong>Solicitante:</strong> {cliente?.mail}</p>
                <p><strong>Desde:</strong> {solicitud.fechadesde ? new Date(solicitud.fechadesde).toLocaleDateString() : "No disponible"}</p>
                <p><strong>Hasta:</strong> {solicitud.fechahasta ? new Date(solicitud.fechahasta).toLocaleDateString() : "No disponible"}</p>

                {estadoLocal === estadoSolicitud.Rechazada && (
                    <p className="text-red-600 font-semibold">Solicitud Rechazada</p>
                )}

                {estadoLocal === estadoSolicitud.Aceptada && (
                    <p className="text-green-600 font-semibold">Solicitud Aceptada</p>
                )}
            </div>

            {mensaje && (
                <p className="text-green-600 font-medium border border-green-400 rounded-md p-2 bg-green-50">
                    {mensaje}
                </p>
            )}

            {localStorage.getItem('userType') !== 'cliente' && (
                <div className="space-x-2">
                    {estadoLocal === estadoSolicitud.Pendiente && (
                        <>
                            <button
                                onClick={handleAccept}
                                className="bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-3 rounded-md"
                            >
                                Aceptar
                            </button>
                            <button
                                onClick={handleReject}
                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded-md"
                            >
                                Rechazar
                            </button>
                        </>
                    )}
                    <Link href={`/solicitudes/${solicitud.id}`}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md">
                            Ver Solicitud
                        </button>
                    </Link>
                </div>
            )}

            {localStorage.getItem('userType') === 'cliente' && estadoLocal !== estadoSolicitud.Rechazada && (
                <div>
                    <button
                        onClick={handleCancelar}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md"
                    >
                        Cancelar
                    </button>
                </div>
            )}

            {localStorage.getItem('userType') === 'cliente' && estadoLocal === estadoSolicitud.Aceptada && (
                <div>
                    <Link href={`/pago/${solicitud.id}`}>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-3 rounded-md">
                            Pagar
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}