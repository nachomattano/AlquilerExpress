'use client'

import LogIn from "@/components/auth/LogIn"
import SignUp from "@/components/auth/SignUp"
import TwoFactor from "@/components/auth/TwoFactor"
import { typeUser } from "@/types/user"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import toast from "react-hot-toast"
import Recuperar from "@/components/auth/Recuperar"

export default function Auth() {
    const [ currentView, setCurrentView ] = useState<"login" | "register" | "2fa" | "recuperar">("login")
    const [ userEmail, setUserEmail ] = useState<string>("")

    const handleLoginSubmit = async (email:string, password: string) => {
        const userType = localStorage.getItem('userType') as typeUser | null
        const isAdmin = userType === typeUser.administrador
        if (isAdmin) {
            setUserEmail(email)
            setCurrentView("2fa")
        } else {
            // Logica de inicio de sesión normal
            toast.success("Bienvenidx!")
            window.location.replace('/')
            
        }
    }

    const handle2FAVerify = (code: string) => {
        // Logica de verificacion de codigo e inicio de sesion de admin}
        toast.success("Bienvenidx!")
        window.location.replace('/')

    }

    const handleBackToLogin = () => {
        setCurrentView("login")
        setUserEmail("")
    }


    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {currentView == "login" && (
                    <LogIn onSwitchToRegister={() => setCurrentView("register")} onSwitchToRecuperar={() => setCurrentView("recuperar")} onLoginSubmit={handleLoginSubmit} />
                )}
                {currentView == "register" && (
                    <SignUp onSwitchToLogin={() => setCurrentView("login")} onBack={handleBackToLogin}/>
                )}
                {currentView == "2fa" && (
                    <TwoFactor onVerify={handle2FAVerify} onBack={handleBackToLogin} userEmail={userEmail} />
                )}
                {currentView == "recuperar" && (
                    <Recuperar />
                )}
            </div>
        </div>
    )
}