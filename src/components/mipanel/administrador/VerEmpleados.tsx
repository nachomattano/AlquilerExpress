'use client'

import { user } from '@/types/user'

export default function VerEmpleado({ empleado }: { empleado: user }) {
  return (
    <div className="shadow-md rounded-lg h-20 flex items-center justify-between m-8 px-8">
      <label className="text-black text-xl">Nombre: {empleado.nombre}</label>
      <label className="text-black text-xl">DNI: {empleado.dni}</label>
      <label className="text-black text-xl">Estado: {empleado.estado}</label>
      <label className="text-black text-xl">Edad: {empleado.edad}</label>
      <label className="text-black text-xl">Email: {empleado.mail}</label>
      <label className="text-black text-xl">Id: {empleado.id}</label>
    </div> 
  )
}