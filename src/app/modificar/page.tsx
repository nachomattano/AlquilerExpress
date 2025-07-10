'use client'
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { typeUser, user } from "@/types/user"


export default function Modify() {
    const [fullName, setFullName] = useState("")
    const [dni, setDni] = useState("")
    const [age, setAge] = useState("")
    const [password, setPassword] = useState("")
    const [usuario, setUsuario] = useState<user | null>(null); 
    const [rol, setRol] = useState<typeUser | null>(null)
    
    useEffect(() => {
        const usuarioActual = localStorage.getItem("user");
        if (usuarioActual) {
            setUsuario(JSON.parse(usuarioActual));
        }
        const storedRol = localStorage.getItem('userType') as typeUser | null
        setRol(storedRol)
    }, [])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const rolApi = rol == "administrador"? "administradores" : rol == "empleado"? "empleados" : "clientes" 
        const res = await fetch(`/api/users/${rolApi}/${usuario?.id}`, {
            method: 'PUT',
            body: JSON.stringify({ mail:usuario?.mail, contraseña:password, dni, edad:age, nombre:fullName }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (res.ok) {
            toast.success('Usuario creado con exito')
            window.location.replace("")
        } else {
            toast.error(await res.text());
        }
    }

    return (
        <div className="mx-auto max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">Modificar Cuenta</h1>
                <p className="text-sm text-gray-600">Completa los campos para modificar tu perfil.</p>
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
                        value={usuario?.nombre??fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                                value={usuario?.dni??dni}
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
                                value={usuario?.edad??age}
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
                        value={usuario?.contraseña??password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Modificar Cuenta
                    </button>
                    
                </div>
                </form>
            </div>
        </div>
    )
}