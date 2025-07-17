'use client'

import { inmueble } from '@/types/inmueble';
import Link from 'next/link';
import { comentario } from '@/types/comentario';
import { getComentarios, createComentario, createComentarioRespuesta, deleteComentario } from '@/lib/db/comentario';
import toast from "react-hot-toast";
import { useState, useEffect } from 'react';
import PanelUsuario from '@/app/panelcliente/page';
import { user } from '@/types/user';

export default function DetalleDelInmueble({ inmueble }: { inmueble: inmueble }) {
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [comentarios, setComentarios] = useState<comentario[]>([]);

  const [userType, setUserType] = useState<string | null>(null);
    const [usuario, setUsuario] = useState<user | null>(null); 

  const [comentarioAResponder, setComentarioAResponder] = useState<comentario | null>(null);
  const [respuesta, setRespuesta] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tipo = localStorage.getItem('userType')?.trim().toLowerCase() ?? null;
      const usuarioActual = localStorage.getItem("user");
      if (usuarioActual) {
          setUsuario(JSON.parse(usuarioActual));
      }
      setUserType(tipo);
    }
  }, []);

  useEffect(() => {
    const fetchComentarios = async () => {
      const data = await getComentarios(inmueble?.id);
      if (data) setComentarios(data);
    };
    fetchComentarios();
  }, [inmueble?.id]);

  const handleEnviarComentario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    const comentarioObj: comentario = {
      id: null,
      comentario: nuevoComentario,
      inmuebleid: inmueble?.id ?? '',
      autorid: usuario?.mail ?? null,
      comentarioid: null,
    };

    try {
      await createComentario(comentarioObj);
      setNuevoComentario('');
      const data = await getComentarios(inmueble?.id);
      if (data) setComentarios(data);
    } catch (err) {
      console.error('❌ Error al comentar:', err);
      toast.error("No se pudo enviar el comentario");
    }
  };

  const handleEnviarRespuesta = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(comentarioAResponder))
    if (!comentarioAResponder) return;

    const respuestaObj: comentario = {
      id: null,
      comentario: respuesta,
      inmuebleid: comentarioAResponder.inmuebleid,
      comentarioid: comentarioAResponder.id,
      autorid: usuario?.mail,
    };

    try {
      await createComentario(respuestaObj);
      toast.success("Respuesta enviada");
      setRespuesta('');
      setComentarioAResponder(null);
      const data = await getComentarios(inmueble?.id);
      if (data) setComentarios(data);
    } catch (err) {
      console.error("❌ Error al responder:", err);
      toast.error("No se pudo enviar la respuesta");
    }
  };

  const handleEliminarComentario = async (comentarioId: string | null | undefined) => {
    if (!comentarioId) return;
    const confirmar = window.confirm("¿Seguro que querés eliminar este comentario y todas sus respuestas?");
    if (!confirmar) return;

    try {
      // 1) eliminar en cascada las respuestas de este comentario
      const respuestas = comentarios.filter(c => c.comentarioid === comentarioId);
      for (const r of respuestas) {
        if (r.id) {
          await deleteComentario(parseInt(r.id));
        }
      }
      // 2) eliminar el comentario padre
      await deleteComentario(parseInt(comentarioId));
      toast.success("Comentario y respuestas eliminados");
      const data = await getComentarios(inmueble?.id);
      if (data) setComentarios(data);
    } catch (err) {
      console.error("❌ Error al eliminar comentario:", err);
      toast.error("No se pudo eliminar el comentario");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-6xl space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
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

          <div className="space-y-4 mb-6">
            {comentarios.length > 0 ? (
              comentarios
                .filter(c => !c.comentarioid)
                .map((c) => {
                  const isOwner =
                    userType === "cliente" &&
                    c.autorid?.trim().toLowerCase() === usuario?.mail;

                  return (
                    <div key={c.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                      <p className="text-sm text-gray-700">
                        <strong>Usuario:</strong> {c.autorid ?? 'Usuario desconocido'}
                      </p>
                      <p className="text-gray-800 mt-2">{c.comentario}</p>

                      {/* Cliente sólo puede eliminar su propio comentario raíz */}
                      {isOwner && (
                        <button
                          onClick={() => handleEliminarComentario(c.id)}
                          className="text-sm text-red-600 hover:underline mt-1 ml-1"
                        >
                          Eliminar
                        </button>
                      )}

                      {/* Admin/empleado puede eliminar cualquiera */}
                      {(userType === "administrador" || userType === "empleado") && (
                        <button
                          onClick={() => handleEliminarComentario(c.id)}
                          className="text-sm text-red-600 hover:underline mt-1 ml-1"
                        >
                          Eliminar
                        </button>
                      )}

                      {/* Empleados/admin responden */}
                      {(userType === "empleado" || userType === "administrador") && (
                        <button
                          onClick={() => setComentarioAResponder(c)}
                          className="text-sm text-white-700 hover:underline mt-2"
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

                      {/* Respuestas */}
                      {comentarios.some(r => r.comentarioid === c.id) && (
                        <div className="ml-4 mt-3 pl-4 border-l-2 border-orange-400">
                          {comentarios
                            .filter(r => r.comentarioid === c.id)
                            .map((r) => (
                              <div key={r.id}>
                                <p className="text-sm text-gray-600">
                                  <strong>Respuesta:</strong> {r.comentario}
                                </p>
                                {/* Solo admin/empleado puede eliminar respuestas */}
                                {(userType === "administrador" || userType === "empleado") && (
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
                  );
                })
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
