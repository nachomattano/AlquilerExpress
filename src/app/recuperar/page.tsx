'use client'

import LogIn from "@/components/auth/LogIn"
import SignUp from "@/components/auth/SignUp"
import TwoFactor from "@/components/auth/TwoFactor"
import { typeUser } from "@/types/user"
import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function Recuperar() {
    const [ currentView, setCurrentView ] = useState<"login" | "register" | "2fa">("login")
    const [ newPassword, setNewPassword ] = useState<string>("")
    const [ confirm, setConfirm ] = useState<string>("")
    const [ mail, setMail ] = useState<string>("")
    const router = useRouter()

    const handleNewPassword = async () => {
        if (newPassword == confirm){
            const res = await fetch('/api/users/recuperar', {
            method: 'POST',
            body: JSON.stringify({ password:newPassword, mail}),
            headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok){
                alert('se cambio la contraseña con exito!')
            }
        }


    }


    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="space-y-2">
                        <label htmlFor="mail" className="text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            id="mail"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            required
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>
                <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Nueva Contraseña
                        </label>
                        <input
                            id="newPassword"
                            type="string"
                            placeholder="correo@ejemplo.com"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmpassword" className="text-sm font-medium text-gray-700">
                            Confirmar Nueva Contraseña
                        </label>
                        <input
                            id="confirmPassword"
                            type="string"
                            placeholder=""
                            required
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={handleNewPassword}
                    >
                    </button>
            </div>
        </div>
    )
}