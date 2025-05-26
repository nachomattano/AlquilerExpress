'use client'

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
    const [ isOpen, setIsOpen ] = useState(false)

    return (
        <nav>
            <div className="container max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image
                    src="/logo.png"
                    alt="Alquiler Express"
                    width={120}
                    height={50}
                    />
                </div>
        
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="focus:outline-none"
                    >
                        <Menu/>
                    </button>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/">Inicio</Link>
                    <Link href="/propiedades">Propiedades</Link>
                    <Link href="/mipanel">Mi Panel</Link>
                    <Link href="/auth">
                        <button>
                            Iniciar sesión
                        </button>
                    </Link>
                </div>
            </div>
    
            {isOpen && (
            <div className="md:hidden flex flex-col items-center pt-4 pb-4 space-y-2">
                <Link href="/" className="block">
                    Inicio
                </Link>
                <Link href="/propiedades" className="block">
                    Propiedades
                </Link>
                <Link href="/auth">
                    <button>
                        Iniciar sesión
                    </button>
                </Link>
            </div>
            )}
        </nav>
    )
}