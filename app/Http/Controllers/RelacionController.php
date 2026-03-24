<?php

namespace App\Http\Controllers;
use App\Models\Carrito;
use App\Models\Product;
use App\Models\Compras;
use Illuminate\Support\Facades\Redirect;

use Illuminate\Http\Request;

class RelacionController extends Controller
{
    public function index(){
        $productos = Product::all();
        return view('/dashboard', compact('productos'));
    }
}
