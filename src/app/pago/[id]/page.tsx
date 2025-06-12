import Pagar from "@/components/Pago/Pagar"

interface PageProps {
  params: { id: string };
}

export default async function pago ({ params }: PageProps){
    const {id} = await params
    return (<>
            <div>
                <Pagar id={id}/>    
            
            </div>    
            
        </>
    )
}