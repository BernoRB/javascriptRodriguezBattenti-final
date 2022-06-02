// Recojo del storage las variables
nombre = localStorage.getItem('nombre')
mail = localStorage.getItem('mail')
puntajeObtenido = localStorage.getItem('puntajeObtenido')
segundosTardados = localStorage.getItem('segundosTardados')
idProducto = localStorage.getItem('idProducto')

// Mostramos los resultados
function muestraRdos() {
    document.getElementById('rdosFinales').innerHTML = `Hiciste un puntaje de ${puntajeObtenido} en ${segundosTardados} segundos`
    document.getElementById('rdosGanaste').innerHTML = "Eso significa que tenés un " + puntajeObtenido * 2 + "% de descuento en el servicio que elijas contratar"
    document.getElementById('rdosTitulo').innerHTML = `Felicitaciones ${nombre}`
    rdosBonus = document.getElementById('rdosBonus')

    rdosBonus.innerHTML = segundosTardados < 20 ? "Y como tardaste menos de 20 segundos, te llevás de regalo un TERMO"
        : segundosTardados < 30 ? "Y como tardaste menos de 30 segundos, te llevás de regalo una BOTELLA TERMICA"
            : segundosTardados < 60 ? "Y como tardaste menos de 60 segundos, te llevás de regalo una GORRA"
                : ""
    traigoProductos()
}

muestraRdos()

// Traigo productos del JSON
async function traigoProductos() {
    const response = await fetch('../datosProductos.json')
    if (!response.ok)
        throw new Error(`Error! status: ${response.status}`);
    const data = await response.json()
    productos = data.productos

    // De todos los productos del JSON muestro sólo los del id servicio que le interesó en un principio
    for (i = 0; i < productos.length; i++)
        if (productos[i].numProducto == idProducto)
            mostrarProductos(productos[i])
}


elem = document.getElementById('contenedorProductosOfrecidos')

// Renderizamos los productos, del servicio que elijió originalmente, con el precio en función de su descuento
function mostrarProductos(producto) {
    precioOriginal = producto.precio
    precioDesc = Math.round(precioOriginal * (1 - ((puntajeObtenido * 2) / 100)))
    productoNombre = producto.nombre
    htmlProductoOf = `
    <div class="col-4">
        <div class="card cardProducto text-center">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text"><i>Precio original: $${precioOriginal}</i></p>
                <p class="card-text"><b>Precio con descuento: $${precioDesc}</b></p>
                <button onclick="eligioContratar('${productoNombre}')" class="btn btn-primary">¡Contratar!</a>
            </div>
        </div>
    </div>
    `
    elem.innerHTML = elem.innerHTML + htmlProductoOf
}

finalContrato = document.getElementById('tarjetaRdosFinal')

// Eligió contratar alguno, ocultamos las opciones y le damos un mensaje final
function eligioContratar(productoNombre) {
    finalContrato.innerHTML =
        `
        ¡Perfecto ${nombre}!, en breve un ejecutivo se estará contactando a tu mail ${mail} para finalizar
        la contratación del servicio "${productoNombre}". ¡Gracias!
        `
    document.getElementById('contenedorProductosOfrecidos').style.display = "none"
}