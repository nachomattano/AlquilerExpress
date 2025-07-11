'use client'

import { useState } from "react"

interface LoginFormProps {
  onSwitchToRegister?: () => void
  onLoginSubmit?: (email: string, password: string) => void
}

export default function LogIn({ onSwitchToRegister, onLoginSubmit } : LoginFormProps = {}) {
    const [ email, setEmail ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Logica de inicio de sesion
        
        onLoginSubmit?.(email, password)
        setIsLoading(false)
    }

    return (
        <div className="mx-auto max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
                <p className="text-sm text-gray-600">Ingresa tu correo electrónico y contraseña para acceder a tu cuenta</p>
            </div>
            <div className="p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                    </button>
                    <div className="mt-4 text-center text-sm text-gray-600">
                        ¿No estás registrado?{" "}
                        <a onClick={onSwitchToRegister} className="text-blue-600 hover:text-blue-500 hover:cursor-pointer underline">
                            Registrate
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}