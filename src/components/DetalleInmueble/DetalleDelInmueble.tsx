'use client'

import { inmueble } from '@/types/inmueble';
import Link from 'next/link';
import { comentario } from '@/types/comentario';
import { getComentarios, createComentario, createComentarioRespuesta, deleteComentario } from '@/lib/db/comentario';
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { user } from '@/types/user';

export default function DetalleDelInmueble({ inmueble }: { inmueble: inmueble }) {

    const [nuevoComentario, setNuevoComentario] = useState('');
    const [comentarios, setComentarios] = useState<comentario[]>([]);

    const [userType, setUserType] = useState<string | null>(null);
    const [user, setUser] = useState<user | null>(null);

    const [comentarioAContraResponder, setComentarioAContraResponder] = useState<comentario | null>(null);
const [contraRespuesta, setContraRespuesta] = useState('');

    const [comentarioAResponder, setComentarioAResponder] = useState<comentario | null>(null);
    const [respuesta, setRespuesta] = useState('');

        useEffect(() => {
        if (typeof window !== 'undefined') {
            const tipo = localStorage.getItem('userType');
            const mail = localStorage.getItem('user');

            setUserType(tipo);
            console.log("Mail recuperado:", mail);
            setUser(user);
        }
        }, []);


    useEffect(() => {
        const fetchComentarios = async () => {
            console.log('Cargando comentarios para inmueble:', inmueble?.id);
            const data = await getComentarios(inmueble?.id);
            console.log('Comentarios recibidos:', data);
            if (data) setComentarios(data);
        };
        fetchComentarios();
    }, [inmueble?.id]);


const handleEnviarComentario = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nuevoComentario.trim()) return;

    console.log("Email que se va a guardar como autorid:", localStorage.getItem('userEmail'));

    const comentarioObj: comentario = {
        id: null,
        comentario: nuevoComentario,
        inmuebleid: inmueble?.id ?? '',
        autorid: user?.mail ?? null,
        comentarioid: null,
        
    };


    try {
        
        console.log("Enviando comentario a Supabase:", comentarioObj);
        await createComentario(comentarioObj);  // llamada al back
        setNuevoComentario('');
        
        // Volver a cargar comentarios
        const data = await getComentarios(inmueble?.id);
        if (data) setComentarios(data);
    } catch (error) {
        console.error('Error al comentar:', error);
    }
    console.log('Comentario enviado:', comentarioObj);
};

const handleEnviarRespuesta = async (e: React.FormEvent) => {
  e.preventDefault();

  const email = user?.mail;
  if (!email || !comentarioAResponder) {
    toast.error("Falta información para enviar la respuesta.");
    return;
  }

  const respuestaObj: comentario = {
    id: null,
    comentario: respuesta,
    inmuebleid: comentarioAResponder.inmuebleid,
    comentarioid: comentarioAResponder.id,
    autorid: email,
  };

  try {
    await createComentarioRespuesta(respuestaObj);
    toast.success("Respuesta enviada");
    setRespuesta('');
    setComentarioAResponder(null);

    const data = await getComentarios(inmueble?.id);
    if (data) setComentarios(data);
  } catch (error) {
    console.error("Error al responder:", error);
    toast.error("No se pudo enviar la respuesta.");
  }
};

const handleEnviarContraRespuesta = async (e: React.FormEvent) => {
  e.preventDefault();

  const email = localStorage.getItem("userEmail");
  if (!email || !comentarioAContraResponder) {
    toast.error("Falta información para enviar la contra-respuesta.");
    return;
  }

  const respuestaObj: comentario = {
    id: null,
    comentario: contraRespuesta,
    inmuebleid: comentarioAContraResponder.inmuebleid,
    comentarioid: comentarioAContraResponder.id,
    autorid: email,
  };

  try {
    await createComentarioRespuesta(respuestaObj);
    toast.success("Contra-respuesta enviada");
    setContraRespuesta('');
    setComentarioAContraResponder(null);

    const data = await getComentarios(inmueble?.id);
    if (data) setComentarios(data);
  } catch (error) {
    console.error("Error al contra-responder:", error);
    toast.error("No se pudo enviar la contra-respuesta.");
  }
};

const handleEliminarComentario = async (comentarioId: string | null | undefined) => {
  if (!comentarioId) return;

  const confirmar = window.confirm("¿Estás seguro de que querés eliminar este comentario?");
  if (!confirmar) return;

  try {
    await deleteComentario(parseInt(comentarioId));
    toast.success("Comentario eliminado");

    const data = await getComentarios(inmueble?.id);
    if (data) setComentarios(data);
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    toast.error("No se pudo eliminar el comentario.");
  }
};


    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
            <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-6xl space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Imagen a la izquierda */}
                    <div className="flex-1">
                        <img
                            src={inmueble?.imagen ?? ""}
                            alt="Imagen del inmueble"
                            className="w-full h-auto rounded-lg shadow"
                        />
                    </div>


                    <div className="flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2 text-base text-gray-700">
                            <h2 className="text-2xl font-bold text-gray-800">Detalles del Inmueble</h2>
                            <p><strong>Título:</strong> {inmueble?.titulo}</p>
                            <p><strong>Ciudad:</strong> {inmueble?.ciudad}</p>
                            <p><strong>Localidad:</strong> {inmueble?.localidad}</p>
                            <p><strong>Dirección:</strong> {inmueble?.direccion}</p>
                            <p><strong>Huéspedes:</strong> {inmueble?.cantidadhuespedes}</p>
                            <p><strong>Descripción:</strong> {inmueble?.descripcion}</p>
                        </div>

                        {userType === 'cliente' && (
                            <div className="mt-auto self-end">
                                <Link href={`/solicitarreserva/${inmueble?.id}`}>
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition duration-200">
                                        Reservar
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                </div>


                {/* Sección de comentarios */}
                <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">Comentarios del Inmueble</h3>

                    {/* Comentarios existentes */}
                    <div className="space-y-4 mb-6">
                    {comentarios.length > 0 ? (
                        comentarios
                        .filter(c => !c.comentarioid) // solo comentarios raíz
                        .map((c) => (
                            <div key={c.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                            <p className="text-sm text-gray-700">
                                <strong>Usuario:</strong> {c.autorid ?? 'Usuario desconocido'}
                            </p>
                            <p className="text-gray-800 mt-2">{c.comentario}</p>

                            
                            {((userType === "cliente" && c.autorid === user?.mail) ||
                                userType === "administrador" || userType === "empleado") && (
                                <button
                                onClick={() => handleEliminarComentario(c.id)}
                                className="text-sm text-red-600 hover:underline mt-1 ml-1"
                                >
                                Eliminar
                                </button>
                            )}

                            {(userType === "empleado" || userType === "administrador") && (
                                <button
                                onClick={() => setComentarioAResponder(c)}
                                className="text-sm text-blue-600 hover:underline mt-2"
                                >
                                Responder
                                </button>
                            )}

                            {comentarioAResponder?.id === c.id && (
                                <form onSubmit={handleEnviarRespuesta} className="mt-2 space-y-2">
                                <textarea
                                    value={respuesta}
                                    onChange={(e) => setRespuesta(e.target.value)}
                                    placeholder="Escribí tu respuesta..."
                                    className="w-full border rounded-md p-2 text-sm"
                                    rows={2}
                                />
                                <div className="flex gap-2">
                                    <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                    >
                                    Enviar
                                    </button>
                                    <button
                                    type="button"
                                    className="text-gray-500 hover:underline"
                                    onClick={() => {
                                        setComentarioAResponder(null);
                                        setRespuesta('');
                                    }}
                                    >
                                    Cancelar
                                    </button>
                                </div>
                                </form>
                            )}

                            {/* Mostrar botón "Responder" para cliente si cumple condiciones */}
                            {userType === "cliente" &&
                                c.autorid === user?.mail &&
                                comentarios.some(r => r.comentarioid === c.id &&
                                (r.autorid?.includes("@admin") || r.autorid?.includes("@empleado"))) &&
                                !comentarios.some(r => r.comentarioid === c.id && r.autorid === user?.mail) && (
                                <button
                                    onClick={() => setComentarioAContraResponder(c)}
                                    className="text-sm text-green-600 hover:underline mt-2"
                                >
                                    Responder a respuesta
                                </button>
                                )}

                            {comentarioAContraResponder?.id === c.id && (
                                <form onSubmit={handleEnviarContraRespuesta} className="mt-2 space-y-2">
                                <textarea
                                    value={contraRespuesta}
                                    onChange={(e) => setContraRespuesta(e.target.value)}
                                    placeholder="Tu respuesta al comentario del empleado/admin"
                                    className="w-full border rounded-md p-2 text-sm"
                                    rows={2}
                                />
                                <div className="flex gap-2">
                                    <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                    >
                                    Enviar respuesta
                                    </button>
                                    <button
                                    type="button"
                                    className="text-gray-500 hover:underline"
                                    onClick={() => {
                                        setComentarioAContraResponder(null);
                                        setContraRespuesta('');
                                    }}
                                    >
                                    Cancelar
                                    </button>
                                </div>
                                </form>
                            )}

                            {/* Mostrar respuestas */}
                            {comentarios.some(r => r.comentarioid === c.id) && (
                                <div className="ml-4 mt-3 pl-4 border-l-2 border-orange-400">
                                {comentarios
                                    .filter(r => r.comentarioid === c.id)
                                    .map((r) => (
                                    <div key={r.id}>
                                        <p className="text-sm text-gray-600">
                                        <strong>Respuesta:</strong> {r.comentario}
                                        </p>

                                       
                                        {((userType === "cliente" && r.autorid === user?.mail) ||
                                        userType === "administrador" || userType === "empleado") && (
                                        <button
                                            onClick={() => handleEliminarComentario(r.id)}
                                            className="text-xs text-red-500 hover:underline mt-1"
                                        >
                                            Eliminar
                                        </button>
                                        )}
                                    </div>
                                    ))}
                                </div>
                            )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No hay comentarios aún.</p>
                    )}
                    </div>


                {userType === 'cliente' && (
                <form className="space-y-4" onSubmit={handleEnviarComentario}>
                    <textarea
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        placeholder="Escribí tu comentario..."
                        className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                        rows={4}
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
                    >
                        Comentar
                    </button>
                </form>
                )}
            </div>

            </div>
        </div>
    );
}