const productos = [
    {id:1,
        nombre: "TV LG",
        precio: 313,
        tipo: "tv"
    },
    {id:2,
        nombre: "TV Samsung",
        precio: 369,
        tipo: "tv"
    },
    {id:3,
        nombre: "TV Xiaomi",
        precio: 145,
        tipo: "tv"
    },
    {id:4,
        nombre: "TV Tesla",
        precio: 299,
        tipo: "tv"
    },
    {id:5,
        nombre: 'iphone 16',
        precio: 1500,
        tipo: "celular"
    },
    {id:6,
        nombre: 'samsung s23',
        precio: 650,
        tipo: "celular"
    },
    {id:7,
        nombre: 'iphone 16 pro, edicion male',
        precio: 1950,
        tipo: "celular"
    },
    {id:8,
        nombre: 'samsung s24',
        precio: 1450,
        tipo: "celular"
    },
    {id:9,
        nombre: 'iphone 11',
        precio: 300,
        tipo: "celular"
    }
]

const carrito = [];

let logo = document.getElementById('logo');

logo.innerHTML = `
                    </div>
        <div class="logo">
            <img src="../assets/img/lamp-charge-logo.svg" alt="logo">
        </div>`

let barra = document.getElementById ('barra');

barra.innerHTML =`
                <div class="barra">
                            <nav>
                                <ul>
                                    <li><a href="">inicio</a></li>
                                    <li><a href="">productos</a></li>
                                    <li><a href="">contactos</a></li>
                                </ul>
                            </nav>
                        </div>`

let titulo = document.getElementById('titulo');

titulo.innerText = "MULTIMAX";

let contenedorCards = document.getElementById("contenedor-cards");

contenedorCards.innerHTML = `
                    <article class="card">
                        <div class="card-img">
                            <img src="../assets/img/tv-samsung.webp" alt="TV Samsung UE65CU7092UXXH 65 LED Crystal UltraHD 4K HDR10+">
                        </div>
                        <div class="card-info">
                            <h3>TV Samsung UE65CU7092UXXH 65" LED Crystal UltraHD 4K HDR10+</h3>
                            <button>comprar</button>
                        </div>
                    </article>
                        `;


const listaProductos = document.getElementById('productos');
const cartItems = document.getElementById('cartItems');
const precioTotal = document.getElementById('precio-total');
const contadorCarrito = document.getElementById('contador-carrito');
const carritoSeccion = document.getElementById('carrito');



function mostrarProducto(FILTRADO_PRODUCTOS){
    const PRODUCTOS_SECTION = document.getElementById('productos')
    PRODUCTOS_SECTION.innerHTML = '';
    FILTRADO_PRODUCTOS.forEach(producto => {
        const CARD_DIV = document.createElement('div');
        CARD_DIV.classList.add('card-container');
        CARD_DIV.innerHTML =
        `
        <img src="${productos.imagen}" alt="${productos.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button onClick="agregarAlCarrito(${producto.id})">Comprar</button>
        `
        
        listaProductos.appendChild(CARD_DIV);
        PRODUCTOS_SECTION.appendChild(CARD_DIV);
        
    })
}
function agregarAlCarrito(id) {
    const carritoJson = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = productos.find(item => item.id === id);
    carrito.push(productoExistente);
    actualizarCarrito();
    Toastify({
        text: `${productoExistente.nombre} agregado al carrito`,
        duratiom:1500,
        gravity: 'top',
        position: "rigth",
        backgroundColor: "violet"
    }).showToast();
}

function filtrarProductos(tipo){
    let FILTRADO_PRODUCTOS;
    if(tipo){
        FILTRADO_PRODUCTOS = productos.filter(producto => producto.tipo === tipo)
    }else{
        FILTRADO_PRODUCTOS = productos
    }
    mostrarProducto(FILTRADO_PRODUCTOS)
}

function eliminarDelCarrito(indice){
    carrito.splice(indice,1);
    actualizarCarrito()
}


function actualizarCarrito(){
    mostrarCarrito();
    actualizarTotal();
    actualizarContador();
}

function mostrarCarrito(){
    cartItems.innerHTML = '';
    carrito.forEach((item, indice) => {
        const li = document.createElement('li');
        li.innerHTML=`
            ${item.nombre} - ${item.precio}
            <button onclick = "eliminarDelCarrito(${indice})"> X </button>
        `
        cartItems.appendChild(li);
    })
}

function actualizarTotal(){
    const total = carrito.reduce((acum, item) => acum + item.precio, 0);
    precioTotal.textContent = `${total}`;
}

function actualizarContador(){
    contadorCarrito.textContent = carrito.length;
}

function alternarCarrito(){
    carritoSeccion.style.display = carritoSeccion.style.display === 'none' || carritoSeccion.style.display === '' ? 'block' : 'none';
}

function finalizarCompra(){
    if(carrito.length === 0){
        Swal.fire({
            icon: 'warning',
            title: 'carrito vacio',
            text: 'No existen productos'
    });
    }else{
        Swal.fire({
            icon: 'success',
            title: 'compra exitosa',
            text: 'Gracias por tu compra'
    }).then(()=>{
        carrito.length = 0;
        actualizarCarrito();
    })
    }
}

document.getElementById('todos').addEventListener('click',()=>filtrarProductos(''));
document.getElementById('tv').addEventListener('click',()=>filtrarProductos('tv'));
document.getElementById('celular').addEventListener('click',()=>filtrarProductos('celular'));


    mostrarProducto(productos)


