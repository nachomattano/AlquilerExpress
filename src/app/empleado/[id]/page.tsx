import DetalleEmpleado from "@/components/verEmpleado";

interface PageProps {
  params: { id: string };
}

export default async function detalleEmpleado ({ params }: PageProps){
    const {id} = await params
    const inmueblesRaw = await fetch (`http://localhost:3000/api/users/empleados/${id}`,{
        method:'GET'
    })

    const inmueble = await inmueblesRaw.json()
    return (
        <div>
            
            <DetalleEmpleado 
            empleado={inmueble.resp}     
            />
        </div>

    );

}