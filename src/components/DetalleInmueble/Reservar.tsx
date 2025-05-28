"use client";
import { useState } from 'react';
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";


export default function Reservar (){

    const [rangoFechas, setRangoFechas] = useState<DateRange | undefined>();

    const [ isOp, setIsOp ] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    }

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [emailAcom, setEmailAcom] = useState("")
    const [dni, setDni] = useState("")

    const [acompanantes, setAcompanantes] = useState<string[]>([]);

    const agregarAcompanante = () => {
    if (!emailAcom.trim()) return;
    setAcompanantes((prev) => [...prev, emailAcom]);
    setEmailAcom("");
    setIsOp(false);
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
                                    
                                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
                                        {acompanantes.length > 0 && (
                                        <div className="mb-4">
                                            <h3 className="font-semibold text-lg text-green-700">Acompañantes agregados:</h3>
                                            <ul className="list-disc list-inside text-gray-800 mt-2">
                                            {acompanantes.map((email, index) => (
                                            <li key={index}>{email}</li>
                                        ))}
                                            </ul>
                                        </div>
                                        )}
                                    </div>
                                    
                                    
                                    
                                    <div onSubmit={handleSubmit} className="space-y-4">
                                        <button onClick={() => setIsOp(!isOp)} className='w-50 bg-black hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'>
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
                                            onClick={agregarAcompanante}
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