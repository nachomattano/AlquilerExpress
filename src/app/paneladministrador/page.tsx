'use client'

import Solicitudes from "@/components/mipanel/Solicitudes"
import AgregarEmpleado from "@/components/mipanel/administrador/AgregarEmpleado"

import AgregarInmueble from "@/components/mipanel/administrador/AgregarInmueble"
import VerInmueble from "@/components/mipanel/VerInmuebles"
import VerReservas from "@/components/mipanel/empleado/VerReservas"
import { ChartColumnBig, House, HousePlus, User, UserPlus } from "lucide-react"
import { useState } from "react"
import VerEmpleados from "../verempleados/page"
import VerCliente from "../verclientes/page"
import VerInmuebles from "../verInmuebles/page"
import Alquileres from "@/components/mipanel/Alquileres"
import Estadisticas from "@/components/mipanel/administrador/Estadisticas"

const adminItems = [

    {
        id: "agregarEmpleado",
        title: "Agregar Empleado",
        icon: UserPlus,
        component: AgregarEmpleado
    },
    {
      id: "agregarInmueble",
      title: "Agregar Inmueble",
      icon: HousePlus,
      component: AgregarInmueble
    },
    {
      id: "verInmuebles",
      title: "Ver Inmuebles",
      icon: HousePlus,
      component: VerInmuebles
    },
    {
        id: "verEmpleados",
        title: "Ver Empleados",
        icon: User,
        component: VerEmpleados
    },
    {
        id: "verclientes",
        title: "Ver Clientes",
        icon: User,
        component: VerCliente
    },
    {
      id: "Solicitudes",
      title: "Ver Solicitudes",
      icon: HousePlus,
      component: Solicitudes

    },
    {
      id: "Alquileres",
      title: "Ver Alquileres",
      icon: HousePlus,
      component: Alquileres
    },
    {
      id: "Estadisticas",
      title: "Ver Estadisticas",
      icon: HousePlus,
      component: Estadisticas
    },
     {
      id: "Ver Reserva",
      title: "Ver Reservas",
      icon: HousePlus,
      component: VerReservas
    }
]

export default function PanelAdmin() {
  const [activeItem, setActiveItem] = useState("inicio")

  const activeMenuItem = adminItems.find((item) => item.id === activeItem)
  const ActiveComponent = activeMenuItem?.component || AgregarEmpleado

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {adminItems.map((item) => {
              const Icon = item.icon
              const isActive = activeItem === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id)
                  }}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-white" : "text-gray-600"}`} />
                  {item.title}
                </button>
              )
            })}
          </div>
        </nav>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <ActiveComponent />
          </div>
        </main>
      </div>
    </div>
  )
} 
