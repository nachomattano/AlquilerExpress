import DetalleDelInmueble from "@/components/detalleinmueble/DetalleDelInmueble";


export default function detalleinmueble (){
    const prop = [
    {
        nom: "Casa Moderna",
        ciu: "Cordoba",
        loc: "Cordoba",
        cantHuespedes: "4",
        imagen: "https://static1.sosiva451.com/80491551/9c479d4a-7ff9-411a-a7b3-73b78f3c5b1e_u_small.jpg",
        descrip: "Esta es una casa amplia en un barrio soñado, en la que puedes disfrutar de una familia grande y de unas hermosas vistas."
    },
    
    ]; 

    return (
        <div>
            {prop.map((pro) => (
            <DetalleDelInmueble
                nom={pro.nom}
                ciu={pro.ciu}
                loc={pro.loc}
                cantHuespedes={pro.cantHuespedes}
                imagen={pro.imagen}   
                descrip={pro.descrip}         
            />
            ))}
        </div>

    );

}