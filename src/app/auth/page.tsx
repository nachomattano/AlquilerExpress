'use client'

import LogIn from "@/components/auth/LogIn"
import SignUp from "@/components/auth/SignUp"
import TwoFactor from "@/components/auth/TwoFactor"
import { useState } from "react"

export default function Auth() {
    const [ currentView, setCurrentView ] = useState<"login" | "register" | "2fa">("login")
    const [ userEmail, setUserEmail ] = useState<string>("")

    const handleLoginSubmit = (email:string, password: string) => {
        const isAdmin = email.includes("@admin.com")

        if (isAdmin) {
            setUserEmail(email)
            setCurrentView("2fa")
        } else {
            // Logica de inicio de sesión normal
        }
    }

    const handle2FAVerify = (code: string) => {
        // Logica de verificacion de codigo e inicio de sesion de admin
    }

    const handleBackToLogin = () => {
        setCurrentView("login")
        setUserEmail("")
    }

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {currentView == "login" && (
                    <LogIn onSwitchToRegister={() => setCurrentView("register")} onLoginSubmit={handleLoginSubmit} />
                )}
                {currentView == "register" && (
                    <SignUp onSwitchToLogin={() => setCurrentView("login")}/>
                )}
                {currentView == "2fa" && (
                    <TwoFactor onVerify={handle2FAVerify} onBack={handleBackToLogin} userEmail={userEmail} />
                )}
            </div>
        </div>
    )
}