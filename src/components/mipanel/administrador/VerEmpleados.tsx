'use client'

import { user } from '@/types/user'
import { useState } from 'react'
import Link from 'next/link';

export default function VerEmpleado({ empleado }: { empleado: user }) {
  const [estado, setEstado] = useState('')

  const handleChangeState = async (e:any) => {
    console.log(e)
    await fetch (`http://localhost:3000/api/users/empleados/${empleado.id}`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ id: empleado.id, estado: e })
    })
  }


  return (
    <div className="shadow-md rounded-lg h-20 flex items-center justify-between m-8 px-8">
      <label className="text-black text-xl">Nombre: {empleado.nombre}</label>
      <label className="text-black text-xl">DNI: {empleado.dni}</label>
      <label className="text-black text-xl">Estado: {empleado.estado}</label>
      <label className="text-black text-xl">Edad: {empleado.edad}</label>
      <label className="text-black text-xl">Email: {empleado.mail}</label>
      <label className="text-black text-xl">Id: {empleado.id}</label>

      <select 
        className='select select-sm w-1/3 max-w-xs focus:outline-none mx-2' 
        onChange={(e) => handleChangeState(e.target.value)}
      >
        <option value='activo'>Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>
      <Link href={`/empleado/${empleado?.id}`}>
                            <button className="bg-black hover:bg-gray-700 text-white w-48 py-2 rounded-xl">
                                Ver Empleado
            </button>
      </Link>
    </div> 
  )
}