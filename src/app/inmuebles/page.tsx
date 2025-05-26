import CuadradoInmueble from "@/components/inmuebles/CuadradoInmueble";

export default function Alquiler() {
  const propiedades = [
    {
      nom: "Casa moderna",
      ciu: "Córdoba",
      imagen: "https://static1.sosiva451.com/80491551/9c479d4a-7ff9-411a-a7b3-73b78f3c5b1e_u_small.jpg",
    },
    {
      nom: "Depto amplio",
      ciu: "Rosario",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7JUrwaE06KgMFHng43x-1lbhgVQlXrIRbA&s",
    },
    {
      nom: "Depto amplio",
      ciu: "Rosario",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7JUrwaE06KgMFHng43x-1lbhgVQlXrIRbA&s",
    },
    {
      nom: "Depto amplio",
      ciu: "Rosario",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7JUrwaE06KgMFHng43x-1lbhgVQlXrIRbA&s",
    },
    {
      nom: "Depto amplio",
      ciu: "Rosario",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7JUrwaE06KgMFHng43x-1lbhgVQlXrIRbA&s",
    },
    {
      nom: "Depto amplio",
      ciu: "Rosario",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7JUrwaE06KgMFHng43x-1lbhgVQlXrIRbA&s",
    },
    {
      nom: "Depto amplio",
      ciu: "Rosario",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7JUrwaE06KgMFHng43x-1lbhgVQlXrIRbA&s",
    },
    {
      nom: "Depto amplio",
      ciu: "Rosario",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7JUrwaE06KgMFHng43x-1lbhgVQlXrIRbA&s",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mt-10 mb-8 text-center">Inmuebles en Alquiler</h1>
        <div className="grid grid-cols-6 gap-15 p-35 pt-10 mb-8">
          {propiedades.map((prop) => (
            <CuadradoInmueble
              nom={prop.nom}
              ciu={prop.ciu}
              imagen={prop.imagen}
          />
          ))}
        </div>
    </div>
  );
}