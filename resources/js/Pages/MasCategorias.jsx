import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from "react";

const MasCategorias = ({ auth }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
  
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const [count, setCount] = useState(() => {
        const savedCount = localStorage.getItem('count');
        return savedCount ? parseInt(savedCount, 10) : 0;
      });
      
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

     const toggleDropdown = () => {
         setIsDropdownOpen(!isDropdownOpen);
     };

     const handleOutsideClick = (event) => {
         if (
             !event.target.closest("#dropdownButton") &&
             !event.target.closest("#dropdownMenu")
         ) {
             setIsDropdownOpen(false);
         }
     }; 
     React.useEffect(() => {
         window.addEventListener("click", handleOutsideClick);
         return () => window.removeEventListener("click", handleOutsideClick);
     }, []);
 

    return (
        <div class="">
            <Head title="Categorias"/>
            <div class="overflow-hidden bg-[#f5f4f4]">
                <div class="w-full lg:pl-40 lg:pr-40 md:pl-10 md:pr-10 p-2">
                    
                    <div class="flex justify-between items-center space-x-1">
                        <Link href="/dashboard">
                        <h1 class="text-black float-left md:w-60 w-32 hover:border-gray-600 border-2 items-center rounded-sm border-transparent cursor-pointer"><img src="img/logo3.png" class=""/></h1>
                        </Link>

                    <div class="w-7/12 relative">
                    <form action="/productos">
                        <input type="text" class="h-10 w-full rounded-lg" placeholder="Buscar Ruvic.com.mx" required/>
                        <button class="absolute inset-y-0 right-0 flex items-center pr-2 pl-2 hover:bg-slate-300 hover:text-cyan-500 m-1 rounded-md cursor-pointer">
                        <span class="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        </span>
                        </button>
                    </form>
                    </div>

                    <div class="flex md:space-x-2">

                    <div class="inline-block" ref={menuRef}>
                    <button onClick={toggleMenu} class="flex h-full hover:border-gray-600 border-2 sm:p-2 items-center rounded-sm border-transparent cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke-width="2" class="h-6 sm:h-8 mx-auto text-cyan-500" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <p class="hidden sm:flex">
                        {auth.user.name}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -5 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </p>
                    </button>
                    {isMenuOpen && (
                        <div className="mt-2 -ml-36 sm:ml-0 w-48 bg-white border rounded-md shadow-lg z-50 fixed grid ">
                            <Link href={route('profile.edit')} class="px-4 py-2 hover:bg-gray-100 my-1" onClick={() => setIsMenuOpen(false)}> Perfil</Link>
                            <Link href={route('logout')} method="post" class="px-4 py-2 hover:bg-gray-100 my-1" onClick={() => setIsMenuOpen(false)}> Cerrar sesión</Link>
                        </div>
                    )}

                    </div>

                    

                    <Link href="/carrito" class="relative inline-block hover:border-gray-600 border-2 sm:p-3 pt-2 items-center rounded-sm border-transparent cursor-pointer">
                    <span class="absolute sm:top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {count}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="sm:h-8 h-6 w-auto text-cyan-500" viewBox="0 0 16 16">
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                    </svg>
                    </Link>
                    

                    </div>
                    

                    </div>
                </div>
                <div class="flex justify-center space-x-10 mb-2">
                    <button id="dropdownButton" onClick={toggleDropdown} class="hover:bg-slate-800 p-2 rounded-sm hover:text-stone-200 flex focus:ring-cyan-500 focus:ring-2" href="#">
                    Categorías <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -5 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </button>

                    {isDropdownOpen && (
                        <div id="dropdownMenu" className="absolute mt-2 w-52 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                            <ul className="py-2">
                                <li><Link href="/productos" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Tecnología</Link></li>
                                <li><Link href="/productos" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Supermecado</Link></li>
                                <li><Link href="/productos" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Electrodomésticos</Link></li>
                                <li><Link href="/productos" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Hogar y Muebles</Link></li>
                                <li><Link href="/productos" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Deportes y Fitness</Link></li>
                                <li><Link href="/productos" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Herramientas</Link></li>
                                <li><Link href="/productos" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Construcción</Link></li>
                                <li><Link href="/productos" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Industrias y Oficinas</Link></li>
                                <li><Link href="/productos" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Accesorios para videojuegos</Link></li>
                                <li><Link href="/productos" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Bebés</Link></li>
                                <li><Link href="/productos" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Salud y Equipamiento Médico</Link></li>
                                <li><Link href="/masCategorias" className="block p-3 hover:text-stone-200 hover:bg-slate-500"> Ver más categorias</Link></li>
                            </ul>
                        </div>
                    )}

                    <Link class="hover:bg-slate-800 p-2 rounded-sm hover:text-stone-200 focus:ring-cyan-00 focus:ring-2" href="/ofertas">Ofertas</Link>
                    <Link class="hover:bg-slate-800 p-2 rounded-sm hover:text-stone-200 focus:ring-cyan-00 focus:ring-2" href="/historial">Historial</Link>
                    <Link class="hover:bg-slate-800 p-2 rounded-sm hover:text-stone-200 focus:ring-cyan-00 focus:ring-2" href="/ayuda">Ayuda</Link>
                </div>
            </div>

            <div class="gap-2 mt-10 mb-10 lg:mr-20 lg:ml-20 ml-10 mr-10">
                <div class="text-3xl text-slate-700">Categorías</div>
                <div class="bg-gray-100 mt-5 p-5 rounded-xl">
                    <p>
                        <h1 class="text-xl font-semibold">Agro</h1>
                        <div class="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 gap-2 text-slate-500 mt-2">
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Agricultura de Precisión</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Almacenaje</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Apicultura</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Energia Renovable</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Fertilizantes</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Herramientas de trabajo</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Infraestructura Rural</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Insumos Ganaderos</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Lubricantes y Fluidos</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Maquinaria Agrícola</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Maquinaria Forrajera</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Producción Animal</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Protección de Cultivos</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Repuestos Maquinaria Agrícola</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Riego</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Semillas</Link>
                            </div>
                        </div>
                    </p>
                    <p class="border-b-2 my-10"></p>
                    <p>
                        <h1 class="text-xl font-semibold">Alimentos y Bebidas</h1>
                        <div class="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 gap-2 text-slate-500 mt-2">
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Bebidas</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Comidas Preparadas</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Congelados</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Despensa</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Frescos</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Kéfir</Link>
                            </div>
                        </div>
                    </p>
                    <p class="border-b-2 my-10"></p>
                    <p>
                        <h1 class="text-xl font-semibold">Animales y Masctas</h1>
                        <div class="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 gap-2 text-slate-500 mt-2">
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Aves</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Conejos</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Correas para Mascotas</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Equinos</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Gatos</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Insectos</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Jaulas para Mascotas</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Peces</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Perros</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Reptiles y Anfibios</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Roedores</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Otros</Link>
                            </div>
                        </div>
                    </p>
                    <p class="border-b-2 my-10"></p>
                    <p>
                        <h1 class="text-xl font-semibold">Instrumentos Musicales</h1>
                        <div class="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 gap-2 text-slate-500 mt-2">
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Baterías y Percusión</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Equipos de DJ y Accesorios</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Estudio de Grabación</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Instrumentos de Cuerdas</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Instrumentos de Viento</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Metrónomos</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Micrófonos y Amplificadores</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Pariantes y Bafles</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Partituras y Letras</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Pedales y Accesorios</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Teclados y Pianos</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Otros</Link>
                            </div>
                        </div>
                    </p>
                    <p class="border-b-2 my-10"></p>
                    <p>
                        <h1 class="text-xl font-semibold">Joyas y Relojes</h1>
                        <div class="grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 gap-2 text-slate-500 mt-2">
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Exhibidores y Alhajeros</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Insumos para Joyería</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Joyería</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Piedra Preciosa y Semipreciosa</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Percings</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Plumas y Bolígrafos</Link>
                            </div>
                            <div class="grid">
                                <Link href="/productos" class="hover:text-cyan-500">Relojes</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Repuestos para Relojes</Link>
                                <Link href="/productos" class="hover:text-cyan-500">Otros</Link>
                            </div>
                        </div>
                    </p>
                </div>
            </div>

























            <footer class="bg-[#f5f4f4] p-2">
                <div class="items-center justify-center sm:flex text-xs text-slate-500">
                    Más formas de comprar:<u class="text-blue-400 underline cursor-pointer">Busca una tienda cercana</u> o <u class="text-blue-400 underline cursor-pointer">un distribuidor</u> cerca de ti. O llama al 001-800-692-7753
                </div><br/>
                <div class="space-x-10 sm:flex text-xs items-center justify-center">
                <p class="text-slate-700 hover:underline cursor-pointer sm:hidden justify-center flex">México</p>
                <p class="text-slate-500 justify-center flex">
                Copyright © 2025 Ruvic Inc. Todos los derechos reservados.
                </p><br/>
                <div class="flex space-x-2 text-slate-700">
                <p class="hover:underline cursor-pointer">Política de privacidad</p>
                <p class="text-xs">|</p>
                <p class="hover:underline cursor-pointer">Ventas y reembolsos</p>
                <p class="text-xs">|</p>
                <p class="hover:underline cursor-pointer">Aviso legal</p>
                <p class="text-xs">|</p>
                <p class="hover:underline cursor-pointer">Mapa del sitio</p>
                </div>
                <p class="text-slate-700 hover:underline cursor-pointer sm:flex hidden">México</p>
                </div>
            </footer>
        </div>
    );
};
export default MasCategorias;