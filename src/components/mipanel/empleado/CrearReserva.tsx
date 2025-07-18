import { getInmueble, getInmuebles } from "@/lib/db/inmuebles"
import { getUsuarioPorDNI } from "@/lib/db/usuarios/usuarios"
import { estadoSolicitud } from "@/types/estado-solicitud"
import { inmueble } from "@/types/inmueble"
import { user } from "@/types/user"
import { addDays, startOfDay } from "date-fns"
import { useEffect, useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import toast from "react-hot-toast"

export default function CrearReservaManual() {
    const [inmuebles, setInmuebles] = useState<inmueble[]>([])
    const [inmuebleSeleccionado, setInmuebleSeleccionado] = useState<string>()
    const [inmueble, setInmuebleAS] = useState<inmueble|null|undefined>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
        const cargarDatos = async () => {
          try {
            const inmueblesDataRaw = await getInmuebles()

            const inmueblesData = inmueblesDataRaw || []
            setInmuebles(inmueblesData);
          } catch (error) {
            console.error("Error cargando datos:", error);
          } finally {
            setLoading(false);
          }
        };

        cargarDatos();
    }, []);

    console.log(inmuebleSeleccionado)

    const [rangoFechas, setRangoFechas] = useState<DateRange | undefined>();
    
        const [disponibilidad, setDisponibilidad] = useState<DateRange[]>([]);
        const [acompanantes, setAcompanantes] = useState<string[]>([]);
        const hoy = startOfDay(new Date())
        const minFecha = addDays(hoy, 3)
        const [cantidadTotal, setCantidad] = useState<number> (1); 
        const [cantidadPermitida, setCantidadP] = useState<number> (1);
        const [cantidadRestante, setCantRestante] = useState<number> (1);  
        const [ cantidadMenores, setCantidadMenores ] = useState<number>(0)
        const [ cantidadMayores, setCantidadMayores ] = useState<number>(0)
        const [dni , setDni] = useState<string>("")
    
        const handleSelect = async (idInmueble:string) => {
            console.log("entre aca")
            const inmueble = await getInmueble(idInmueble)
            setInmuebleAS(inmueble)
            const fetchClientes = async () => {
                try {
                    const res = await fetch(`http://localhost:3000/api/inmueble/${inmueble?.id}/disponibilidad`, {
                        cache: "no-store",
                        headers: {
                            "Cache-Control": "no-cache"
                        }
                    });
                    const data = await res.json();
                    console.log("DATAAAAA", JSON.stringify(data))
                    const rangosNoDisponibles = Array.isArray(data.disponibilidad)
        ? data.disponibilidad.map((rango: { desde: string; hasta: string }) => ({
            from: new Date(rango.desde),
            to: new Date(rango.hasta)
          }))
        : data.disponibilidad
        ? [{
            from: new Date(data.disponibilidad.desde),
            to: new Date(data.disponibilidad.hasta)
          }]
        : [];
                    console.log(`Rango de fechas -> ${JSON.stringify(rangosNoDisponibles)}`)
                    const cantidad = inmueble?.cantidadhuespedes? inmueble.cantidadhuespedes:1
                    setCantidadP(cantidad) 
                    setCantRestante(cantidad-cantidadTotal)
                    console.log(cantidadRestante)
                    setDisponibilidad(rangosNoDisponibles);
                    
                } catch (error) {
                    console.error("Error al obtener disponibilidad:", error);
                }
            };
    
            fetchClientes();
        };
    
     
    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            let usuario = (await getUsuarioPorDNI(dni)).user
            if (!usuario){
                toast.error("DNI no existe en el sistema")
                return
            }
            if (!usuario?.id) {
                toast.error("No se pudo identificar al usuario actual.");
                return;
            }
            let cantHuespedes = inmueble?.cantidadhuespedes? inmueble.cantidadhuespedes:3
            console.log(cantHuespedes < cantidadTotal)
            if(cantHuespedes < cantidadTotal){
               toast.error("Maximo de huespedes superado")
               return; 
            }
    
            
            console.log
            const res = await fetch('/api/solicitudes', {
                method: 'PUT',
                body: JSON.stringify({
                    fechahasta: rangoFechas?.to,
                    fechadesde: rangoFechas?.from,
                    mail: usuario?.mail,
                    dni: usuario?.dni,
                    nombre: usuario?.nombre,
                    inmuebleid: inmueble?.id,
                    solicitante: usuario?.id, 
                    cantidad: cantidadTotal,
                    monto: (inmueble && inmueble.preciopordia? inmueble.preciopordia : 3) * (Math.floor(((rangoFechas && rangoFechas.to? rangoFechas.to.getTime(): 2) - (rangoFechas && rangoFechas?.from?  rangoFechas.from.getTime() : 1))/(1000 * 60 * 60 * 24)))
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (res.ok) {

                toast.success('Solicitud enviada!');
                setTimeout(() => {
  console.log('This will print after a 1-second delay');
}, 5000);
                window.location.reload();
            
            } else {
                toast.error(await res.text());
            }
        };
    

  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-lg">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-center text-gray-900">Crear Solicitud</h1>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Seleccionar Inmueble:</label>
              <select
                value={inmuebleSeleccionado}
                onChange={(e) =>{ setInmuebleSeleccionado(e.target.value); handleSelect(e.target.value)}}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Selecciona un inmueble para ver sus solicitudes</option>
                {inmuebles.map((inmueble) => (
                  <option key={inmueble.id} value={inmueble.id || ""}>
                    {inmueble.titulo}
                  </option>
                ))}
              </select>
            </div>

            {inmuebleSeleccionado && (
              <>
                      <div className="h-full bg-white shadow-lg rounded-xl">
                                              <h2 className="text-center mt-4 text-2xl font-bold mb-4">Llenar Formulario para Agendar la Solicitud</h2>
                                              <div className="p-6 pt-0">
                                              <form onSubmit={handleSubmit} className="space-y-4">
                                                 
                                                  
                                                 <div className="space-y-4">
              
                                  
                                                          <div className="space-y-2">
                                                              <label htmlFor="dni" className="flex font-medium text-gray-700">
                                                                  DNI del solicitante
                                                              </label>
                                                              <input
                                                                  id="dni"
                                                                  type="string"
                                                                  placeholder=""
                                                                  value={dni}
                                                                  onChange={(e) => setDni(e.target.value)}
                                                                  className="w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                              />
                                                             
                                                          </div>
                                                  </div>
                                                  

                                                  <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
                                                  {cantidadTotal > 0 && (
                                                  <div className="mb-4">
                                                      <h3 className="font-semibold text-lg text-green-700">Acompañantes agregados:</h3>
                                                      <ul className="list-disc list-inside text-gray-800 mt-2">
                                                    
                                                          <li key={1}>
                                                              Cantidad de acompañantes {cantidadMayores}
                                                          </li>
                                                      </ul>
                                                  </div>
                                                  )}
              
                                                  </div>
                                                  
                                                  
                                                  
                                                  <div className="space-y-4">
              
                                  
                                                          <div className="space-y-2">
                                                              <label htmlFor="cantidadMayores" className="flex font-medium text-gray-700">
                                                                  Cantidad De Acompañantes
                                                              </label>
                                                              <input
                                                                  id="cantidadMayores"
                                                                  type="number"
                                                                  min={0}
                                                                  disabled={cantidadRestante==0}
                                                                  placeholder=" "
                                                                  value={cantidadMayores}
                                                                  onChange={(e) => {let event; if (parseInt (e.target.value) < cantidadMayores ) event= -1; else event=+1; setCantidadMayores(parseInt(e.target.value)); setCantidad(cantidadTotal+event);  event == -1? setCantRestante(cantidadRestante+1) : setCantRestante(cantidadRestante-1);console.log(cantidadRestante)}}
                                                                  className="w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                              />
                                                             
                                                          </div>
                                                  </div>
              
                                                  <div className="mt-6">
                                                      <h3 className="text-md font-medium text-gray-700 mb-2">Seleccionar fechas de reserva</h3>
                                                      <DayPicker
                                                          mode="range"
                                                          selected={rangoFechas}
                                                          onSelect={setRangoFechas}
                                                          disabled={[
                                                              { before: minFecha}, 
                                                              ...disponibilidad 
                                                          ]}
                                                          className="rounded-md shadow"
                                                      />
              
                                                      {rangoFechas?.from && rangoFechas?.to && (<div>
                                                      <p className="mt-2 text-green-700 font-medium">
                                                      Fechas seleccionadas:{" "}
                                                      <span className="font-semibold">
                                                      {rangoFechas.from.toLocaleDateString()} – {rangoFechas.to.toLocaleDateString()}
                                                      </span>
                                                      
                                                      </p>
                                                      <p>Monto total a pagar: <span>{inmueble && inmueble.preciopordia? inmueble.preciopordia *  (Math.floor(((rangoFechas && rangoFechas.to? rangoFechas.to.getTime(): 2) - (rangoFechas && rangoFechas?.from?  rangoFechas.from.getTime() : 1))/(1000 * 60 * 60 * 24))): 3}$</span>  </p>
                                                      </div>)}
                                                  </div>
                                                  
                                                  <button
                                                  type="submit"
                                                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                                  Crear Solicitud
                                                  </button>
              
                                              </form>
                                              </div>
                                          </div>
                      </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}