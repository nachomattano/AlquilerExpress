import Image from "next/image";
import Link from 'next/link';
export default function Inicio(){

    return (
        <div className="bg-blue-100 p-8 flex justify-center mb-8">
      <Link href="/inmuebles">
          <Image 
            src="/inicio.png"
            alt="Inicio"
            width={1150}
            height={500}
            className="rounded-xl"
          />
          <button className="absolute bottom-50 left-1/2 transform -translate-x-1/2 bg-black hover:bg-blue-300 text-white px-6 py-2 rounded-xl">
            <div className="text-xl font-bold animate-pulse">¡Alquilar ahora!</div>
          </button>
      </Link>
    </div>
    )

}