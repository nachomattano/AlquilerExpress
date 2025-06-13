'use Client'

import { inmueble } from "@/types/inmueble"
import Link from "next/link"
import toast from "react-hot-toast"

export default function VerInmueble({ inmueble }: { inmueble: inmueble }) {

  const handleChangeState = async (estado:any) => {
      const resp = await fetch (`http://localhost:3000/api/inmueble/${inmueble.id}`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ id: inmueble.id, estado })
    })
    if (resp.ok){
      toast.success("Se cambio el estado con exito")
    }else{
      toast.error(await resp.text())
    }
  }


  return (
    <div className="shadow-md rounded-lg h-20 flex items-center justify-between m-8 px-8">
      <label className="text-black text-xl">Nombre: {inmueble.titulo}</label>
      <label className="text-black text-xl">DNI: {inmueble.direccion}</label>
      <label className="text-black text-xl">Estado: {inmueble.estado}</label>
      <label className="text-black text-xl">Edad: {inmueble.preciopordia}</label>
      <label className="text-black text-xl">Email: {inmueble.cantidadhuespedes}</label>
      <label className="text-black text-xl">Id: {inmueble.localidad}</label>
      <select 
        className='select select-sm w-1/3 max-w-xs focus:outline-none mx-2' 
        onChange={(e) => handleChangeState(e.target.value)}
        defaultValue={inmueble.estado as string}
      >
        <option value='disponible'>Disponible</option>
        <option value="noDisponible">NoDisponible</option>
        <option value='enMantenimiento'>EnManenimiento</option>
        <option value="reservado">Reservado</option>
        <option value="alquilado">Alquilado</option>
      </select> 
      {localStorage.getItem('userType') == "administrador" && (<div>
        <Link href={`/AgregarInmueble/${inmueble.id}`}><button>Modificar</button></Link>
      </div>)}
    </div>
  )
}