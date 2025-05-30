'use client'


import { user } from '@/types/user'

export default function VerClientes({ cliente }: { cliente: user }) {
  return (
    <div className="shadow-md rounded-lg h-20 flex items-center justify-between m-8 px-8">
      <label className="text-black text-xl">Nombre: {cliente.nombre}</label>
      <label className="text-black text-xl">DNI: {cliente.dni}</label>
      <label className="text-black text-xl">Estado: {cliente.estado}</label>
      <label className="text-black text-xl">Edad: {cliente.edad}</label>
      <label className="text-black text-xl">Email: {cliente.mail}</label>
      <label className="text-black text-xl">Id: {cliente.id}</label>
    </div>
  )
}