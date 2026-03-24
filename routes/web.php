<?php
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/masCategorias', function () {
    return Inertia::render('MasCategorias');
});

Route::get('/productos', function () {
    return Inertia::render('Productos');
});

Route::get('/historial', function () {
    return Inertia::render('Historial');
});

Route::get('/ofertas', function () {
    return Inertia::render('Ofertas');
});

Route::get('/carrito', function () {
    return Inertia::render('Carrito');
});

Route::get('/ayuda', function () {
    return Inertia::render('Ayuda');
});

Route::get('/perfil', function () {
    return Inertia::render('Perfil');
});

Route::get('/compras', function () {
    return Inertia::render('Miscompras');
});

Route::get('/pago', function () {
    return Inertia::render('Pago');
});

Route::get('/recibo', function () {
    return Inertia::render('Recibo');
});

Route::get('/detalles/{id}', function ($id) {
    $product = Product::find($id);
    if (!$product) {
        abort(404, 'Producto no encontrado');
    }
    return Inertia::render('Detalles', [
        'product' => $product
    ]);
});

Route::get('/pago/{id}', function ($id) {
    $product = Product::find($id);
    if (!$product) {
        abort(404, 'Producto no encontrado');
    }
    return Inertia::render('Pago', [
        'product' => $product
    ]);
});

Route::get('/recibo/{id}', function ($id) {
    $product = Product::find($id);
    if (!$product) {
        abort(404, 'Producto no encontrado');
    }
    return Inertia::render('Recibo', [
        'product' => $product
    ]);
});


Route::delete('/product/{id}', [ProductController::class, 'destroy']);

Route::put('/product/{id}', [ProductController::class, 'update']);

Route::get('/crear', function () {
    return Inertia::render('Crear');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index');
    Route::post('/products', 'store');
    Route::get('/products/{id}', 'show');
    Route::put('/products/{id}', 'update');
    Route::delete('/products/{id}', 'destroy');
});


require __DIR__.'/auth.php';
