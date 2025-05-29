import Reservar from "@/components/DetalleInmueble/Reservar";

interface PageProps {
  params: { id: string };
}

export default async function solicitudDeReserva ({ params }: PageProps){
  const {id} =  await params


  return (<>
      <Reservar id={id}/>
  </>)

}