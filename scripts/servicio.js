
contProductos = document.getElementById("contenedorProductos")

// Creamos una clase para los servicios que ofrece la empresa.
// El método renderizar nos permite mostrar los productos en el DOM.
class Servicio {
    constructor(id, imagen, nombreS, descripcion) {
        this.id = id
        this.nombre = nombreS
        this.imagen = imagen
        this.descripcion = descripcion
    }

    renderizar(){
        let htmlProducto = `
        <div class="col-4">
            <div class="card cardProducto text-center">
                <img src="${this.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${this.nombre}</h5>
                    <p class="card-text">${this.descripcion}</p>
                    <button onclick="eligioProducto(${this.id})" class="btn btn-primary">¡Lo quiero!</a>
                </div>
            </div>
        </div>
        `
        contProductos.innerHTML += htmlProducto
    }
}

// Creamos los objetos, los ponemos en un array.
let servicio1 = new Servicio(1, './imgs/internet.jpg', "Internet", "La mejor conexión a internet para empresas y hogares con un servicio de alta disponibilidad y con la mayor cobertura del mercado.")
let servicio2 = new Servicio(2, './imgs/clow.jpg', "Television", "Televisión satelital, la mayor variedad de canales nacionales e internacionales y contenido on-demand las 24 horas.")
let servicio3 = new Servicio(3, './imgs/redmovil.jpg', "Telefonia", "Servicio de red movil con la mayor cobertura del mercado, roaming gratuito en toda américa, llamadas y SMS gratis.")
let listaServicios = []
listaServicios.push(servicio1, servicio2, servicio3)

// Llamamos al método para renderizar los servicios
listaServicios.forEach(function(servicio) {
    servicio.renderizar()
})

// Cuando el usuario elije un producto llama a esta función con el ID del producto, se guarda en storage y se avanza
function eligioProducto(idProducto) {
    localStorage.setItem('idProducto',idProducto)
    console.log(`ingrese al eligio y el id es ${idProducto}`)
    window.location.href='memotest.html'
}