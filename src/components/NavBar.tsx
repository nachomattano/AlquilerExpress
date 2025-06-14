'use client'

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
    const [ isOpen, setIsOpen ] = useState(false)
    return (
        <nav>
            <div className="max-w-500 text-white bg-orange-300 px-4  py-3 flex justify-between items-center">
                <div className="ml-6">
                    <Image
                    src="/logo.png"
                    alt="Alquiler Express"
                    width={80}
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
                <div className= "text-xl mr-250">Alquiler Express</div>
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
            
            
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex  w-full  shadow-sm px-4 py-2 bg-orange-300 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <img src="https://cdn-icons-png.flaticon.com/128/15218/15218567.png" className="w-10 h-10" />
                </button>

                {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56  rounded-md shadow-lg ">
                    <div className="py-1 bg-black">
                        <button className="py-3 text-sm bg-black hover:bg-gray-300 w-full text-left">
                            Mi perfil
                        </button>
                        <button className="py-3 text-sm bg-black hover:bg-gray-300 w-full text-left">
                            Mis solicitudes
                        </button>
                        <button className="py-3 text-sm bg-black hover:bg-gray-300 w-full text-left">
                            Historial
                        </button>
                    </div>
                </div>
            )}
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