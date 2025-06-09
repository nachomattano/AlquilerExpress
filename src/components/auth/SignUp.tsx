'use client'

import { useState } from "react"
interface SignUpFormProps {
    onSwitchToLogin?: () => void
    onBack?: () => void
}

export default function SignUp({ onSwitchToLogin, onBack }: SignUpFormProps = {}) {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [dni, setDni] = useState("")
    const [age, setAge] = useState("")
    const [password, setPassword] = useState("")
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const res = await fetch('/api/users/clientes', {
            method: 'POST',
            body: JSON.stringify({ mail:email, contraseña:password, dni, edad:age, nombre:fullName }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            alert('Usuario creado con exito')
            onBack?.()
        } else {
            alert(await res.text());
        }
        setIsLoading(false)
    }

    return (
        <div className="mx-auto max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">Crear Cuenta</h1>
                <p className="text-sm text-gray-600">Completa todos los campos para registrarte.</p>
            </div>
            <div className="p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
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
                        Crear Cuenta
                    </button>
                    
                </div>
                <div className="mt-4 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta?{" "}
                    <a onClick={onSwitchToLogin} className="text-blue-600 hover:text-blue-500 hover:cursor-pointer underline">
                        Inicia Sesión
                    </a>
                </div>
                </form>
            </div>
        </div>
    )
}