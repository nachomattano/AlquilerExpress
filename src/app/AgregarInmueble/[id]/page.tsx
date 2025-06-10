import AgregarInmueble from "@/components/mipanel/administrador/AgregarInmueble"

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
    const { id } = await params
    
  return (<AgregarInmueble id={id} />)
}