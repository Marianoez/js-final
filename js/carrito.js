let cartHTML = document.getElementById('cart')
const clearBtn = document.getElementById('clearCart')
const payBtn = document.getElementById('payBtn')

//Boton Vaciar Carrito.
clearBtn.addEventListener('click', () => {
    cleanCart();
})

//Generamos cart, y recuperamos información de carrito llamando a función recuperar.
let cart = []
recuperar()

//Boton de finalizar Compra.
payBtn.addEventListener('click', () => {
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'MUCHAS GRACIAS POR SU COMPRA!!',
        showConfirmButton: false,
        timer: 1500
    })
    cart = []
    localStorage.setItem('cart', JSON.stringify(cart))
    recuperar()
    cartHTML.innerHTML = ""

})

//Funcion de recuperación datos de carrito desde Local Storage.
function recuperar() {
    cartHTML.innerHTML = ""
    cart = []
    let recuperarLS = JSON.parse(localStorage.getItem('cart')) || []
    recuperarLS.forEach(element => {
        showCart(element)
        cart.push(element)
    })
    console.log('2', cart)
    const totalBuy = cart.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
    let p = document.getElementById('total1')
    p.innerText = `TOTAL: ${totalBuy}`
    console.log('3', cart)
}

//Función de vaciar carrito desde Local Storage.
function cleanCart() {
    localStorage.clear()
    recuperar()
}

//Función para mostrar todos los productos que se recuperaron de carrito.
function showCart(car) {
    let div = document.createElement('div')
    div.className = 'product';
    div.innerHTML = `<div class="card" style="width: 18rem;">
                <img src=${car.imgurl} class="card-img-top" alt="Bozal de cuero, caballo carreras, salto exhibición y Polo">
                <!-- SEO, agregamos palabras clave caballo carreras, polo, salto  -->
                <div class="card-body">
                    <h5 class="card-title">${car.nombre}</h5>
                    <p class="card-text">${car.descripcion}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Cantidad: ${car.cantidad}</li>    
                    <li class="list-group-item">Precio $ ${car.precio}</li>
                    <li class="list-group-item">Talle: ${car.size}</li>
                    <div class="card-body">
                        <button id="btnDelete${car.cod}" type="button" class="btn btn-outline-secondary">quitar</button></a>
                    </div>
                </div>`;
    cartHTML.appendChild(div)

    //Boton de eliminar 1 producto.       
    let btnDelete = document.getElementById(`btnDelete${car.cod}`)

    btnDelete.addEventListener('click', () => {
        if (car.cantidad == 1) {
            btnDelete.parentElement.parentElement.parentElement.remove();
            cart = cart.filter(item => item.cod !== car.cod)
            localStorage.setItem('cart', JSON.stringify(cart))
            recuperar()
            console.log('ASI QUEDA EL CART DESPUES DEL ELSE', cart)
        } else {
            car.cantidad -= 1
                /* document.getElementById(`cant${car.cod}`).innerHTML = `<li class="list-group-item" id="cant${car.cod}">Cantidad: ${car.cantidad}</li>` */
            console.log('CART ANTES DEL FILTRO', cart)
            const newCart = cart.findIndex(item => item.cod == car.cod)
            cart[newCart].cantidad = car.cantidad
            console.log('CART DESPUES DEL FIND', cart)

            localStorage.setItem('cart', JSON.stringify(cart))
            recuperar()
            console.log('ASI QUEDA EL CART DESPUES DEL ELSE', cart)
        }

    })
}