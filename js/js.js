import { getData } from "./getData.js";

const allProducts = await getData();
const productContainer = document.getElementById("product-main")
const searcher = document.getElementById('find')
const showOffers = document.getElementById('showOffer')
const showAll = document.getElementById('showAll')
const cartDiv = document.getElementById('cart')
const productCart = document.getElementById("items-compra")
const cart = []

showAllp(allProducts)
recuperar2()

function recuperar2() {
    let recuperarLS = JSON.parse(localStorage.getItem('cart')) || []
    recuperarLS.forEach(element => {
        cart.push(element)
    })
}

function showAllp(products) {
    productContainer.innerHTML = "";
    products.forEach(element => {
        let newDiv = document.createElement('div')
        newDiv.className = 'product';
        newDiv.innerHTML = `<div class="card" style="width: 18rem;">
        <img src=${element.imgurl} class="card-img-top" alt="Bozal de cuero, caballo carreras, salto exhibición y Polo">
        <!-- SEO, agregamos palabras clave caballo carreras, polo, salto  -->
        <div class="card-body">
            <h5 class="card-title">${element.nombre}</h5>
            <p class="card-text">${element.descripcion}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Stock: ${element.stock}</li>    
            <li class="list-group-item">Precio $ ${element.precio}</li>
            <li class="list-group-item">Talle: ${element.size}</li>
            <div class="card-body">
                <button id="btnAdd1${element.cod}" type="button" class="btn btn-outline-secondary">Agregar al Carrito!</button></a>
            </div>
        </div>`;

        productContainer.appendChild(newDiv);
        let btnAdd = document.getElementById(`btnAdd1${element.cod}`)
        btnAdd.addEventListener('click', () => {
            /* Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Producto agregado con exito!',
                showConfirmButton: false,
                timer: 1500
            }) */
            addToCart(element.cod)

        })

    });
}


searcher.addEventListener('input', (product) => {
    let searching = allProducts.filter(element => element.nombre.toLocaleLowerCase().includes(product.target.value.toLocaleLowerCase()))
    if (searching == false) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `No existe producto que coincida con su busqueda, pruebe otra referencia!`,
        })
    }
    showAllp(searching)
});

showOffers.addEventListener('click', () => {
    let sOnlyOffer = allProducts.filter(element => element.nombre.includes('OFERTA'))
    showAllp(sOnlyOffer);
})

showAll.addEventListener('click', () => {
    showAllp(allProducts);
})

function addToCart(cod) {
    let existe = cart.find(item => item.cod === cod)
    if (existe) {
        if (existe.stock == 0) {
            existe.stock = 0
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Producto sin Stock Disponiblle!`,
            })
            let btnAdd = document.getElementById(`btnAdd1${existe.cod}`)
            btnAdd.style.display = 'none'
        } else {
            existe.cantidad += 1
            existe.stock--
                console.log(existe.stock);
            showAllp(allProducts)
        }

    } else {
        let addProduct = allProducts.find(item => item.cod === cod)
        console.log(addProduct.cantidad)
        console.log(addProduct.stock)
        if (addProduct.stock > 0) {
            addProduct.cantidad = addProduct.cantidad + 1;
            addProduct.stock--
                cart.push(addProduct)
            showAllp(allProducts)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Producto sin Stock Disponiblle!`,
            })
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(cart)

}