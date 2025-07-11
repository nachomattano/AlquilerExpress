import Formulario from "@/components/Pago/Formulario";
import Pagar from "@/components/Pago/Pagar"

interface PageProps {
  params: { id: string };
}

export default async function pago ({ params }: PageProps){
    const {id} = await params
    console.log(id);
    return (<>
            <div>
                <Formulario id= {id}/> 
                <Pagar id={id}/>   
                
            
            </div>    
            
        </>
    )
}