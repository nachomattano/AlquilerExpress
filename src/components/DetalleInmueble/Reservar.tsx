"use client";
import { getUsuarioPorMail } from '@/lib/db/usuarios/usuarios';
import { useEffect, useState } from 'react';
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { user } from '@/types/user'; // Asegurate de tener este import

export default function Reservar ({id}:{id:string}){

    const [rangoFechas, setRangoFechas] = useState<DateRange | undefined>();
    const [isOp, setIsOp] = useState(false);

    const [nombreAcom, setNombreAcom] = useState("");
    const [isSinCuenta, setIsSinCuenta] = useState(false);

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [emailAcom, setEmailAcom] = useState("")
    const [dni, setDni] = useState("")
    const [cantidadacompañantes, setCantidadAcompañantes] = useState("")
    const [disponibilidad, setDisponibilidad] = useState<DateRange[]>([]);
    const [acompanantes, setAcompanantes] = useState<string[]>([]);

    const [usuario, setUsuario] = useState<user | null>(null); 

    useEffect(() => {
        const usuarioActual = localStorage.getItem("user");
        if (usuarioActual) {
            setUsuario(JSON.parse(usuarioActual));
        }

        const fetchClientes = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/inmueble/${id}/disponibilidad`);
                const data = await res.json();
                const rangosNoDisponibles = data.disponibilidad?.map((rango: { desde: string; hasta: string }) => ({
                    from: new Date(rango.desde),
                    to: new Date(rango.hasta)
                })) ?? [];
                setDisponibilidad(rangosNoDisponibles);
            } catch (error) {
                console.error("Error al obtener disponibilidad:", error);
            }
        };

        fetchClientes();
    }, []);

    const agregarAcompanante = async () => {
        if (!emailAcom.trim()) return;

        const acomp = await getUsuarioPorMail(emailAcom);

        if (!acomp.user) {
            alert("El email ingresado no está registrado en el sistema");
            return;
        }

        setAcompanantes((prev) => [...prev, emailAcom]);
        setEmailAcom("");
        setIsOp(false);
    };

    const agregarAcompananteSinCuenta = () => {
        if (!nombreAcom.trim()) return;

        setAcompanantes((prev) => [...prev, nombreAcom]);
        setNombreAcom("");
        setIsSinCuenta(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!usuario?.id) {
            alert("No se pudo identificar al usuario actual.");
            return;
        }

        const acompañantesId = await Promise.all(
            acompanantes.map(async (acomp) => {
                const acompañante = await getUsuarioPorMail(acomp);
                return acompañante.user?.id ?? '1';
            })
        );

        const res = await fetch('/api/solicitudes', {
            method: 'POST',
            body: JSON.stringify({
                fechahasta: rangoFechas?.to,
                fechadesde: rangoFechas?.from,
                mail: email,
                dni,
                acompañantesid: acompañantesId,
                nombre: fullName,
                inmuebleid: id,
                solicitante: usuario.id, 
                cantidad: parseInt(cantidadacompañantes || "0") + 1
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            window.location.replace('/');
            alert('Solicitud enviada!');
        } else {
            alert(await res.text());
        }
    };


return <>
        <div className="h-full bg-white shadow-lg rounded-xl">
                                <h2 className="text-center mt-4 text-2xl font-bold mb-4">Llenar formulario para solicitar reserva</h2>
                                <div className="p-6 pt-0">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                    <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                                    Nombre Completo
                                    </label>
                                    <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Juan Pérez"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                                    </div>

                                    <div className="space-y-2">
                                    <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                                    Email
                                    </label>
                                    <input
                                    id="fullName"
                                    type="text"
                                    placeholder="...@gmail.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                                    </div>

                                
                                    <div className="space-y-2">
                                    <label htmlFor="dni" className="text-sm font-medium text-gray-700">
                                     DNI
                                    </label>
                                    <input
                                        id="dni"
                                        type="text"
                                        placeholder="12345678"
                                        required
                                        value={dni}
                                        onChange={(e) => setDni(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                                    </div>
                                    
                                    <div className="space-y-2">
                                    <label htmlFor="cantidadacompañantes" className="text-sm font-medium text-gray-700">
                                     Cantidad de Acompañantes
                                    </label>
                                    <input
                                        id="cantidadacompañantes"
                                        type="number"
                                        placeholder=""
                                        required
                                        value={cantidadacompañantes}
                                        onChange={(e) => setCantidadAcompañantes(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                                    </div>

                                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
                                    {acompanantes.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-lg text-green-700">Acompañantes agregados:</h3>
                                        <ul className="list-disc list-inside text-gray-800 mt-2">
                                        {acompanantes.map((acomp, index) => (
                                            <li key={index}>
                                            {acomp.includes("@") ? `✔️ ${acomp} (con cuenta)` : `👤 ${acomp} (sin cuenta)`}
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                    )}

                                    </div>
                                    
                                    
                                    
                                    <div  className="space-y-4">
                                        <button   type="button" onClick={() => setIsOp(!isOp)} className='w-50 bg-black hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
                                        Agregar acompañante con cuenta 
                                        </button>
                                        {isOp && (
                                            <div className="space-y-2">
                                            <label htmlFor="fullName" className=" flex font-medium text-gray-700">
                                            Email Acompañante
                                            </label>
                                            <input
                                            id="fullName"
                                            type="text"
                                            placeholder="...@gmail.com"
                                            required
                                            value={emailAcom}
                                            onChange={(e) => setEmailAcom(e.target.value)}
                                            className="w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                                            
                                            <button
                                            onClick={agregarAcompanante} // no necesita type="button" porque ya lo tiene implícito
                                            type="button"
                                            className="ml-4 w-50 bg-black hover:bg-orange-500 text-white py-2 px-2 rounded-md"
                                            >
                                            Confirmar acompañante
                                            </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsSinCuenta(!isSinCuenta)}
                                            className='w-50 bg-black hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                                        >
                                            Agregar acompañante sin cuenta
                                        </button>

                                        {isSinCuenta && (
                                            <div className="space-y-2">
                                                <label htmlFor="nombreAcom" className="flex font-medium text-gray-700">
                                                    Nombre del Acompañante
                                                </label>
                                                <input
                                                    id="nombreAcom"
                                                    type="text"
                                                    placeholder="Ej: María Gómez"
                                                    required
                                                    value={nombreAcom}
                                                    onChange={(e) => setNombreAcom(e.target.value)}
                                                    className="w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />

                                                <button
                                                    onClick={agregarAcompananteSinCuenta}
                                                    type="button"
                                                    className="ml-4 w-50 bg-black hover:bg-orange-500 text-white py-2 px-2 rounded-md"
                                                >
                                                    Confirmar acompañante
                                                </button>
                                            </div>
                                        )}
                                    </div>


                                    <div className="mt-6">
                                        <h3 className="text-md font-medium text-gray-700 mb-2">Seleccionar fechas de reserva</h3>
                                        <DayPicker
                                            mode="range"
                                            selected={rangoFechas}
                                            onSelect={setRangoFechas}
                                            disabled={[
                                                { before: new Date() }, 
                                                ...disponibilidad 
                                            ]}
                                            className="rounded-md shadow"
                                        />

                                        {rangoFechas?.from && rangoFechas?.to && (
                                        <p className="mt-2 text-green-700 font-medium">
                                        Fechas seleccionadas:{" "}
                                        <span className="font-semibold">
                                        {rangoFechas.from.toLocaleDateString()} – {rangoFechas.to.toLocaleDateString()}
                                        </span>
                                        </p>
                                        )}
                                    </div>
                                    
                                    <button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    Enviar solicitud
                                    </button>

                                </form>
                                </div>
                            </div>
        </>
}