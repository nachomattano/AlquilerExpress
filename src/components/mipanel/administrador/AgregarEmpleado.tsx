'use client'

import { useState } from "react"
import toast from "react-hot-toast"
export default function AgregarEmpleado() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [dni, setDni] = useState("")
    const [age, setAge] = useState("")
    const [password, setPassword] = useState("")
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        console.log("entre a crear")
        const res = await fetch('/api/users/empleados', {
            method: 'POST',
            body: JSON.stringify({ mail:email, contraseña:password, dni, edad:age, nombre:fullName }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            toast.success('Empleado Creado con Exito!')
        } else {
            toast.error(await res.text());
        }
        setIsLoading(false)
    }
    
    return (
        <div className="bg-white rounded-lg">
            <div className="p-6 space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">Agregar Empleado</h1>
                <p>Ingresa nombre completo, email, DNI, edad y contraseña para registrar un empleado.</p>
            </div>
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                        id="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="age" className="text-sm font-medium text-gray-700">
                                Edad
                            </label>
                            <input
                                id="age"
                                type="number"
                                placeholder="25"
                                min="18"
                                max="100"
                                required
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                        id="password"
                        type="password"
                        placeholder="Mínimo 4 caracteres"
                        required
                        minLength={4}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Crear Cuenta de Empleado
                    </button>
                </form>
            </div>
        </div>
    )
}