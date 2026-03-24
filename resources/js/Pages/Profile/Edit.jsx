import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import React, { useState, useEffect, useRef } from "react";

export default function Edit({ mustVerifyEmail, status, auth }) {

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
    
    const init=2;

    const [count, setCount] = useState(() => {
        const savedCount = localStorage.getItem('count');
        return savedCount ? parseInt(savedCount, 10) : 0; // Si no existe, inicializa en 0
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
            <Head title="Perfil" />
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
                <div class="justify-center flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="size-32"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    <p class="text-4xl">Bienvenido,  {auth.user.name}</p>
                    <p class="text-slate-700 sm:text-xl mt-3">Administra tu información y las opciones de privacidad y seguridad a fin de que Ruvic sea más relevante para ti.</p>
                    <p class="sm:text-xl text-blue-400 hover:underline cursor-pointer">Más información</p>
                </div>


                <div class="bg-gray-100 mt-5 p-8 rounded-xl justify-center items-center flex">
                <Link href="/compras" class=" flex items-center rounded-md p-2 border-dashed border-2 md:border-4 hover:bg-white hover:border-black px-6 cursor-pointer text-2xl md:text-3xl">
                Ir a mis compras <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 flex">
  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>

                </Link>
                </div>


                <div class="bg-gray-100 mt-5 p-5 rounded-lg">
                <div class="text-3xl text-slate-800 ml-10 mb-5">Billetera</div>

                <div class="grid md:grid-cols-2 grid-cols-1 gap-5 lg:px-32">
                <article class="bg-white p-5 m-2 h-auto rounded-xl flex flex-wrap">
                    <img class="h-20 mr-5" src="data:image/png;base64,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"/>
                    <div class="">
                        <h1 class="text-xl font-semibold">Mastercard</h1>
                        <p>Targeta de débio con terminación ****314</p>
                        <Link href="#" class="hover:underline cursor-pointer text-blue-500">Editar</Link>
                    </div>
                </article>

                <article class="bg-white p-5 m-2 h-auto rounded-xl flex flex-wrap">
                    <img class="h-20 mr-5" src="data:image/png;base64,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"/>
                    <div class="">
                        <h1 class="text-xl font-semibold">Mastercard</h1>
                        <p>Targeta de crédito con terminación ****935</p>
                        <Link class="hover:underline cursor-pointer text-blue-500">Editar</Link>
                    </div>
                </article>

                <Link href="#" class="bg-gray-100 m-2 h-auto rounded-xl hover:bg-white border-dashed border-black border-2 items-center flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="m-3 size-8 text-black"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </Link>
                </div>
                </div>

                <div class="bg-gray-100 mt-5 p-5 rounded-xl">
                <div class="text-3xl text-slate-800 ml-10 mb-5">Mis Direcciones</div>

                <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 lg:px-32">
                <article class="bg-white p-5 m-2 h-auto rounded-xl flex flex-wrap">
                    <div class="">
                        <h1 class="text-xl font-semibold mb-3">{auth.user.name}</h1>
                        <p>Calle</p>
                        <p>Colonia</p>
                        <p>Ciudad</p>
                        <p>Telf.</p>
                        <Link href="#" class="hover:underline cursor-pointer text-blue-500">Agregas instrucciones de entrega</Link><br/><br/><br/>
                        <Link href="#" class="hover:underline cursor-pointer text-blue-500">Editar</Link> | <Link href="#" class="hover:underline cursor-pointer text-blue-500">Eliminar</Link>
                    </div>
                </article>

                <Link href="#" class="bg-gray-100 m-2 h-auto rounded-xl hover:bg-white border-dashed border-black border-2 items-center flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="m-3 size-8 text-black"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </Link>
                </div>
                </div>


                <div class="bg-gray-100 mt-5 p-5 grid md:grid-cols-2 grid-cols-1 gap-5 rounded-xl">
                    <div class="lg:ml-10">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                    <div class="lg:ml-10">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    <div class="lg:ml-10">
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                </div>
            </div>





            <footer class="bg-[#f5f4f4] p-2">
                <div class="items-center justify-center sm:flex text-xs text-slate-500">
                    Más formas de comprar: <u class="text-blue-400 underline cursor-pointer">&nbsp;Busca una tienda cercana&nbsp;</u> o <u class="text-blue-400 underline cursor-pointer">&nbsp;un distribuidor&nbsp;</u> cerca de ti. O llama al 001-800-692-7753
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
}
