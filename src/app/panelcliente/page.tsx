'use client'
import Solicitudes from "@/components/mipanel/Solicitudes"
import InicioUsuario from "@/components/mipanel/usuario/InicioUsuario"
import { ChartColumnBig, House } from "lucide-react"
import { useState } from "react"

const usuarioItems = [
    {
        id: "inicio",
        title: "Inicio",
        icon: ChartColumnBig,
        component: InicioUsuario
    },
    {
      id: "Solicitudes",
      title: "Ver Solicitudes",
      icon: House,
      component: Solicitudes
    }
]

export default function PanelUsuario() {
  const [activeItem, setActiveItem] = useState("inicio")

  const activeMenuItem = usuarioItems.find((item) => item.id === activeItem)
  const ActiveComponent = activeMenuItem?.component || InicioUsuario

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
            {usuarioItems.map((item) => {
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