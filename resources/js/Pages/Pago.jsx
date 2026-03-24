import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from "react";
import Confetti from 'react-confetti';
// import { useRouter } from 'next/router';

const Pago = ({ auth, product }) => {

    const [id, setId] = useState(product.id);
    const [name, setName] = useState(product.name);
    const [slug, setSlug] = useState(product.slug);
    const [sku, setSku] = useState(product.sku);
    const [category, setCategory] = useState(product.category);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    
    const splitPrice = (price) => {
        const priceFormatted = price.toFixed(2);  // Aseguramos dos decimales
        return priceFormatted.split('.');  // Retorna [entero, decimal]
    };

    // Extraemos la parte entera y decimal
    const [integerPart, decimalPart] = splitPrice(price);


    const [showConfetti, setShowConfetti] = useState(false);
    const [opacity, setOpacity] = useState(1);

    const handleClick = () => {
        setShowConfetti(true);
        setOpacity(1); 

        
        setTimeout(() => {
            setOpacity(0); 
        }, 3000);

        setTimeout(() => {
            setShowConfetti(false);
        }, 5000);
    };

    
    
    const [selected, setSelected] = useState(null);
    const [error, setError] = useState(false);
  
    const toggleCheckbox = (index) => {
      setSelected(index);
      setError(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (selected === null) {
        setError(true);
      } else {
        window.location.href = `/recibo/${id}`;
      }
    };



    const [paymentOption, setPaymentOption] = useState(null);

    const togglePaymentOptions = (event) => {
        setPaymentOption(event.target.value);
    };
    
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
            <Head title="Pago"/>
            <div class="overflow-hidden bg-[#f5f4f4]">
                <div class="w-full lg:pl-40 lg:pr-40 md:pl-10 md:pr-10 p-2">
                    
                    <div class="flex justify-between items-center space-x-1">
                        <Link href="/dashboard">
                        <h1 class="text-black float-left md:w-60 w-32 hover:border-gray-600 border-2 items-center rounded-sm border-transparent cursor-pointer"><img src="/img/logo3.png" class=""/></h1>
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

<form onSubmit={handleSubmit}>
            <div class="lg:mx-40 mx-4 my-10 justify-center lg:flex bg-gray-100 rounded-lg p-5">
            <div class="lg:w-2/3 items-center m-2 bg-white rounded-lg">
                <div class="border-b-2 mx-2 pb-5">
                    <div class="text-3xl text-slate-700 ml-10 my-6">Elige la forma de entrega</div>
                    
                    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    {[1, 2].map((_, index) => (
                        <article
                        key={index}
                        className={`bg-white p-2 m-2 h-auto rounded-xl flex flex-wrap border-2 cursor-pointer ${
                          selected === index ? "border-blue-500" : "border-gray-300"
                        }`}
                        onClick={() => toggleCheckbox(index)}
                      >
                          <div className="flex space-x-2">
                          <label>
              <input
                className="rounded-lg"
                type="checkbox"
                checked={selected === index} // Solo activa el checkbox si el índice coincide
                onChange={() => toggleCheckbox(index)} // Cambia el estado al hacer clic
              />
            </label>
                            <h1 className="font-semibold mb-3">{auth.user.name}</h1>
                          </div>
                          <div className="text-sm">
                            <p>Calle {index + 1}</p>
                            <p>Colonia {index + 1}</p>
                            <p>Ciudad {index + 1}</p>
                            <p>Telf. {index + 1}</p>
                            <br />
                            <Link href="#" className="hover:underline cursor-pointer text-blue-500" onClick={(e) => e.stopPropagation()}>Editar</Link>{" "}|{" "}
                            <Link href="#" onClick={(e) => e.stopPropagation()} className="hover:underline cursor-pointer text-blue-500">Agregar instrucciones de entrega </Link>
                          </div>
                        </article>
                    ))}
                    

                    <Link href="#" class="bg-gray-100 m-2 h-auto rounded-xl hover:bg-white border-dashed border-black border-2 items-center flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="m-3 size-8 text-black"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    </Link>
                    </div>
                </div>

                <div class="border-b-2 mx-2 pb-5">
                    <div class="text-3xl text-slate-700 ml-10 my-6">Elige cómo pagar</div>
                    
                    

                    {/* Métodos de pago */}
                    <div className="mb-4 px-5">
                        {/* Opción de Tarjeta */}
                        <label className="flex items-center mb-2 cursor-pointer">
                            <input required type="radio" name="metodo_pago" className="cursor-pointer form-radio h-4 w-4 text-gray-800" value="tarjeta" checked={paymentOption === "tarjeta"} onChange={togglePaymentOptions}/>
                            <span className="ml-2 text-gray-800 items-center justify-center flex"><img class="h-4 pr-1" src="https://cdn.pixabay.com/photo/2021/12/06/13/48/visa-6850402_960_720.png"/>Tarjeta de crédito/débito</span>
                        </label>

                        {paymentOption === "tarjeta" && (
                            <div className="p-4 border rounded-lg bg-gray-50">
                                <p className="text-slate-700 mb-2"> Se aceptan tarjetas regulares, digitales y aquellas que ofrecen planes de pago en cuotas. </p>
                                <div className="mb-2">
                                    <label className="block  font-semibold text-gray-700 mb-1"> Titular de la tarjeta </label>
                                    <input required type="text" placeholder="Nombre del titular" className="w-full h-8 p-2 border rounded-lg text-gray-700" />
                                    
                                    <label className="block font-semibold text-gray-700 mt-3 mb-1"> Número de la tarjeta </label>
                                    <input required type="text" maxlength="19" maxLength={19} onInput={(e) => { let value = e.target.value.replace(/\D/g, ""); value = value.match(/.{1,4}/g)?.join("-") || value; e.target.value = value.slice(0, 19); }}  placeholder="0000-0000-0000-0000" className="w-full p-2 border rounded-lg text-gray-700 h-8" />
                                </div>
                                <div className="flex gap-3 mt-3">
                                    <div className="flex-grow">
                                        <label className=" font-semibold text-gray-700"> Fecha de vencimiento </label>
                                        <div className="flex space-x-2">
                                            <select required className="w-full p-2 border rounded-lg text-gray-700"> <option>Mes</option> <option>01</option> <option>02</option> <option>03</option> <option>04</option> <option>05</option> <option>06</option> <option>07</option> <option>08</option> <option>09</option> <option>10</option> <option>11</option><option>12</option>
                                            </select>
                                            <select className="w-full p-2 border rounded-lg text-gray-700"> <option>Año</option> <option>2023</option> <option>2024</option> <option>2025</option> <option>2026</option> <option>2027</option> <option>2028</option> <option>2029</option> <option>2030</option>
                                            </select>
                                        </div>
                                        <div className="w-1/3">
                                        <label className="block font-semibold text-gray-700 "> CVV </label>
                                        <input required type="text" placeholder="000" maxLength="3" onInput={(e) => { e.target.value = e.target.value.replace( /\D/g, "" ); }} className="w-full p-2 border rounded-lg text-gray-700" />
                                    </div>
                                    </div>
                                    
                                </div>
                            </div>
                        )}

                        {/* Opción de PayPal */}
                        <label className="flex items-center mt-2 cursor-pointer">
                            <input required type="radio" name="metodo_pago" className="cursor-pointer form-radio h-4 w-4 text-gray-800" value="paypal" checked={paymentOption === "paypal"} onChange={togglePaymentOptions} />
                            <span className="ml-2 text-gray-800 justify-center items-center flex"><img class="h-4 pr-1" src="https://cdn-icons-png.flaticon.com/512/174/174861.png"/>PayPal</span>
                        </label>

                        {paymentOption === "paypal" && (
                            <div className="mt-2">
                                <input required type="email" placeholder="Example@gmail.com" className="w-full h-8 p-2 border rounded-lg text-gray-700" />
                            </div>
                        )}

                        {/* Opción de OXXO */}
                        <label className="flex items-center mt-2 cursor-pointer">
                            <input required type="radio" name="metodo_pago" className="form-radio h-4 w-4 text-gray-800 cursor-pointer" value="oxxo" checked={paymentOption === "oxxo"} onChange={togglePaymentOptions} />
                            <span className="ml-2 text-gray-800 justify-center items-center flex"><img class="h-4 pr-1" src="https://cdn.worldvectorlogo.com/logos/oxxo-logo.svg"/>Pago en OXXO</span>
                        </label>

                        {paymentOption === "oxxo" && (
                            <div className="p-4 border rounded-lg bg-gray-50 mt-2">
                                <p className=" text-slate-700"> Puedes pagar en efectivo en cualquier tienda OXXO con el código de pago que recibirás al finalizar tu compra. </p>
                            </div>
                        )}
                    </div>




                </div>

            </div>




            <div class="lg:w-1/3 md:px-20 lg:px-5 text-lg p-5 py-5 m-2 bg-white space-y-5 h-full rounded-lg">
                    <h2 class="text-3xl justify-center flex mb-10">Confirma tu compra</h2>
                    <div class="flex wrap">
                        <div class="w-1/2 text-left">
                            <p class="">Producto(s) </p>
                            <p class="mt-2">Envío</p>
                            <p class="mt-8 border-t-2 pt-2">Pago total</p>
                        </div>
                        <div class="w-1/2 flex flex-col justify-end ">
                          <div class="flex justify-end">
                            <span>$ {integerPart}</span><p class="text-sm ml-1 inline ">{decimalPart}</p>
                          </div>
                          <p class="text-right mt-2 text-emerald-500">Gratis</p>
                          <div class="flex justify-end mt-8 border-t-2 pt-2">
                            <span>$ {integerPart}</span><p class="text-sm ml-1 inline ">{decimalPart}</p>
                          </div>
                        </div>
                    </div><br/>
                    {error && <p className="text-red-500">Por favor, selecciona una direccion.</p>}
                    {/* <Link class="justify-center flex hover:bg-cyan-600 bg-cyan-500 text-white rounded-full p-1">Confirmar compra</Link><br/> */}
                    <input type="submit" value="Confirmar compra" class="cursor-pointer justify-center flex w-full hover:bg-cyan-600 bg-cyan-500 text-white rounded-full p-1"/><br/>
                    {/* <Link href={`/recibo/${id}`} class="rounded-xl w-full justify-center flex text-white hover:bg-cyan-600 bg-cyan-500 p-1 px-4 items-center text">Comprar ahora</Link> */}


                    <div class="bg-gray-200 mx-10 px rounded-lg flex">
                        <div class="w-1/12 border-l-4 rounded-lg border-cyan-500 py-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>
                        </div>
                        <div class="w-11/12 p-2 text-sm">
                            <p>Ahora, es posible elegri qué datos quieres mostrar en tu factura de compras.</p>
                            <p class="mt-2 hover:underline cursor-pointer text-blue-500">Ir a facturación</p>
                        </div>
                    </div>
            </div>

            </div>
    </form>




            {showConfetti && (
                <Confetti
                    style={{
                        opacity: opacity,
                        transition: 'opacity 2s ease-out', // Transición suave de opacidad
                    }}
                />
            )}

            {/* <button
                onClick={handleClick}
                className="bg-green-500 text-white py-2 px-4 rounded"
            >
                Done
            </button> */}












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
export default Pago;