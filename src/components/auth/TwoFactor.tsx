'use client'

import { useState } from "react"

interface TwoFactorProps {
    onVerify?: (code: string) => void
    onBack?: () => void
    userEmail?: string
}

export default function TwoFactor({ onVerify, onBack, userEmail }: TwoFactorProps = {}) {
    const [ code, setCode ] = useState<string>("");
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (code.length !== 4) return
    }

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 4)
        setCode(value)
    }

    return (
        <div className="mx-auto max-w-sm rounded-md border border-gray-200 shadow-sm">
            <div className="p-6 space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">Verificación 2FA</h1>
                <p>Se ha enviado un código de 4 dígitos a {userEmail}</p>
            </div>
            <div className="p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="code" className="text-sm font-medium text-gray-700">
                            Código de verificación
                        </label>
                        <input
                            id="code"
                            type="text"
                            placeholder="0000"
                            required
                            value={code}
                            onChange={handleCodeChange}
                            maxLength={4}
                            className="w-full px-3 py-2 text-center text-2xl font-mono tracking-widest border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                        <p className="text-xs text-gray-500">Ingresa el código de 4 dígitos</p>
                    </div>

                    <button
                        type="submit"
                        disabled={code.length !== 4 || isLoading}
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2"
                    >
                        {isLoading ? "Verificando..." : "Verificar Código"}
                    </button>

                    <button
                        type="button"
                        onClick={onBack}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Volver al Login
                    </button>
                </form>
            </div>  
        </div>
    )
}