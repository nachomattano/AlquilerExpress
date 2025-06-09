import { user } from "@/types/user"

export default function DetalleEmpleado({empleado}:{empleado:user}){
    console.log(empleado)
    //let solicitudes:solicitud = JSON.parse(solicitud)
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white rounded-xl shadow-md p-8 space-y-4 w-full ">
                <div className="space-y-4">
                    <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">DNI: {empleado?.dni}</label>
                    <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Nombre: {empleado?.nombre}</label>
                    <label className="block shadow-md bg-orange-100 px-4 py-2 rounded-md text-base">Mail: {empleado?.mail}</label>
                </div>
            </div>
        </div>
    )
}   