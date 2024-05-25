let productos;

document.addEventListener('DOMContentLoaded', () => {
    getData();
});

function getData() {
    fetch('https://fakestoreapi.com/products')
        .catch(error => mostrarError(error.message))
        .then(items => items.json())
        .then(items => {
            return items.map(pr => new Producto(pr));
        })
        .then(items => {
            productos = items;
            procesarData();
        })
        .catch(error => mostrarError(error.message));
}

function procesarData() {
    if (productos != undefined) {
        let divProductos = document.getElementById("contenedorProductos");
        for (let index = 0; index < productos.length; index++) {
            const element = productos[index];
            let card = crearElemento(element);
            divProductos.appendChild(card);
        }
    } else {
        mostrarError("Ocurrió un error");
    }
}
function crearElemento(element) {
    let nuevoElemento = document.createElement("div");
    nuevoElemento.className = "card shadow pull-up col-sm-6 col-md-2 position-relative";
    nuevoElemento.id = element.id;
    nuevoElemento.innerHTML = `
        <div class="product-img">
            <img style="width:40%" onclick="mostrarModalProducto(${element.id})" src="${element.image}" alt="${element.title}">
        </div>
        ${element.id % 2 === 0 ? '<p class="Promoción"><span class="SpanPromo">Promoción</span></p>' : ''}
        <div class="product-desc">
            <h2 class="product-title">${element.title}</h2>
            <div class="row">
                <div class="col-6">
                    <p class="ratingP">Rating</p>
                    <p class="ratingP">${element.rating.rate} (${element.rating.count})</p>
                    <p class="rating">
                        <div class="ratingInicio">
                            <span>&#9733;</span>
                            <span>&#9733;</span>
                            <span>&#9733;</span>
                            <span>&#9733;</span>
                            <span>&#9733;</span>
                        </div>
                    </p>
                </div>
                <div class="col-6 divPrecio">
                    <span class="product-price">$${element.price}</span>
                </div>
            </div>
            ${element.id % 2 === 0 ? '<span class="SpanGratis" style="font-size:15px"> Envío GRATIS en pedidos elegibles </span>' : ''}
            <div class="row">
                <button style="margin-top:5px;"  onclick="mostrarModalProducto(${element.id})" class="btn btn-warning btnVer position-absolute bottom-0 start-50 translate-middle-x mt-2">Ver <i class="bi bi-search"></i></button>
            </div>
        </div>`;

       setRatingInicio(element.rating.rate, element.id);

    return nuevoElemento;
}

function mostrarError(msg) {
    console.log(msg);
}
