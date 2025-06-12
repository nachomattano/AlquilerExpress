'useClient'
import { updateStateReserva } from "@/lib/db/reservas"
import { getSolicitudReserva } from "@/lib/db/solicitudes-reservas"
import { getClienteId } from "@/lib/db/usuarios/clientes"
import { estadoSolicitud } from "@/types/estado-solicitud"
import { solicitud } from "@/types/solicitud"
import { user } from "@/types/user"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function Solicitud({solicitud}:{solicitud:solicitud}){
    const [cliente, setCliente] = useState<user | null>(null);

    useEffect(() => {
        const fetchCliente = async () => {
            const data = await getClienteId(solicitud?.solicitante);
            setCliente(data);
        };
        fetchCliente();
    }, [solicitud]);
    const handleAccept = async() => {
        const res= await fetch(`/api/solicitudes/${solicitud.id}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({estado:estadoSolicitud.Aceptada})
        })
        if (res.ok) {
            alert ('Cancelacion de Solicitud Exitosa!')// o a donde quieras ir
        } else {
            alert(await res.text());
        }

    }

    const handleReject = async() => {
        const res=await fetch(`/api/solicitudes/${solicitud.id}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({estado:estadoSolicitud.Rechazada})
        })
        if (res.ok) {
            alert ('Cancelacion de Solicitud Exitosa!')// o a donde quieras ir
        } else {
            alert(await res.text());
        }

    }

    const handleCancelar = async() => {
        const res= await fetch(`/api/solicitudes/${solicitud.id}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({estado:estadoSolicitud.Rechazada})
        })
        if (res.ok) {
            alert ('Cancelacion de Solicitud Exitosa!')// o a donde quieras ir
        } else {
            alert(await res.text());
        }

    }
    return (<>
        <div className="shadow-md rounded-lg h-110 w-90 text-lg">
            <div className="grid mt-6">
                <label>{cliente?.mail}</label>
                <label>{new Date (solicitud.fechadesde? solicitud.fechadesde: new Date()).toLocaleDateString()}</label>
                <label>{new Date (solicitud.fechahasta? solicitud.fechahasta: new Date()).toLocaleDateString()}</label>
                {(solicitud.estado == 'Rechazada') && <div>
                    <label className="text-red-600">Solicitud Rechazada</label>
                    </div>
                }
                {!(localStorage.getItem('userType') == 'cliente')&&<div>
                    <button onClick={handleAccept}>Aceptar</button>
                    <button onClick={handleReject}>Rechazar</button>
                    <Link href={`/solicitudes/${solicitud.id}`}><button> Ver Solicitud </button></Link>
                </div>}

                {((localStorage.getItem('userType') == 'cliente')&&(solicitud.estado != estadoSolicitud.Rechazada))&&<div>
                    <button onClick={handleCancelar}>Cancelar</button>
                </div>}
                {(localStorage.getItem('userType') == 'cliente' && solicitud.estado == estadoSolicitud.Aceptada)&&<div>
                    <Link href={`/pago/${solicitud.id}`}><button>Pagar</button></Link>
                </div>}
                
            </div>
        </div>
    </>)
}