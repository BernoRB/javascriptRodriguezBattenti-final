/*
    Rodriguez Battenti Bernabe - Primera Entrega Trabajo Final Javascript

    -En esta primer versión las entradas y salidas se manejan completamente por prompts y alerts.
    -Tengo el proyecto en un estado más avanzado pero lo reduje al punto de utilizar sólo los contenidos vistos hasta el momento en las clases y utilizando de parámetro las rúbricas.
    -Entiendo que el HTML no es evaluado en esta instancia por lo que le puse una versión simplificada del "index.html", con un form que no hace nada. En la entrega final este index será una de varias páginas html.
    -Un punto central del simulador, que será un juego de tipo memotest, necesita sí o sí de contenidos que aún no vimos por lo que en esta entrega es reemplazado por otra cosa más simple.
*/

// Declaramos textos estáticos que usaremos más adelante, para que luego no 'ensucien' visualmente el código
const textoNombre = '¡Bienvenido a Tivicom juega! podrás ganar descuentos en el producto que decidas contratar participando en divertidos juegos.\n\nAntes que nada, decime tu nombre:'
const textoMail = `¡Lindo nombre!. \n\nAhora por favor decime tu mail:`
const textoProducto = `Y bien, ¿en qué producto estás interesado? escribí INTERNET, TELEVISION o TELEFONIA.`

// Creamos una CLASE productos para poner en práctica objetos.
class Productos {
    constructor(id, nombre, descripcion, precio) {
        this.id = id,
            this.nombre = nombre,
            this.descripcion = descripcion,
            this.precio = precio
    }

    // Muestra el nombre y descripción del producto
    mostrar() {
        alert(`¡Te muestro ahora los productos que ofrecemos! \n\n(${this.id} de ${Object.keys(this).length - 1}) ${this.nombre}: ${this.descripcion}`)
    }

    // Calcula el precio final en función del descuento ganado
    calcularPrecioFinal(descuento) {
        let precioFinal = this.precio * (1 - descuento / 100)
        return precioFinal
    }
}

// Creamos los productos llamando al constructor de la clase
let producto1 = new Productos(1, "Internet", "La mejor conexión a internet para empresas y hogares con un servicio de alta disponibilidad y con la mayor cobertura del mercado.", 3500)
let producto2 = new Productos(2, "Television", "Televisión satelital, la mayor variedad de canales nacionales e internacionales y contenido on-demand las 24 horas.", 2900)
let producto3 = new Productos(3, "Telefonia", "Servicio de red movil con la mayor cobertura del mercado, roaming gratuito en toda américa, llamadas y SMS gratis.", 1600)

// Creamos un array para poner en práctica el tema y usamos el método push para agregar nuestros productos
let listaProductos = []
listaProductos.push(producto1, producto2, producto3)

function iniciaSimulador() {
    //Pedimos nombre
    let nombre = pidoDatos(textoNombre)

    //Pedimos mail y lo validamos (pedimos hasta que ingrese uno válido)
    do {
        mail = pidoDatos(textoMail)
    } while (!validoMail(mail))

    // Muestro los productos disponibles y luego elije
    listaProductos.forEach(prod => prod.mostrar())
    let nombreProducto = pidoDatos(textoProducto).toUpperCase()

    // Vamos al juego que todavía no está desarrollado por requerir temas que aún no vimos
    let descuento = juego(nombre)

    // Nos traemos el producto elejido en función del texto ingresado antes
    let productoElegido = retornoProducto(nombreProducto)

    // Mostramos los resultados finales
    resultados(nombre, mail, descuento, productoElegido)
}

// Función que recibe un texto para mostrar y devuelve el dato que ingrese el usuario
function pidoDatos(texto) {
    datoRetorno = prompt(texto)
    return datoRetorno
}

// Simple validador usando expresiones regulares 
function validoMail(mail) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
}

// En la versión final el juego será un memotest
// En función de los aciertos y el tiempo tardado será el descuento obtenido
// Como no es posible desarrollarlo con los conocimientos actuales, lo omito y obtenemos el descuento de otra forma
function juego(nombre) {
    alert(`¡${nombre}!. En este punto jugarías a un Memotest para determinar el descuento.\n\nComo nuestros empleados aún lo están desarrollando, vamos a dejar que VOS elijas el descuento que te merecés. \n\nGenerosos, ¿no?`)
    let descuento = 0
    let quiereMas = ''
    // Sumamos un 2% de descuento hasta que el usuario no quiera más
    do {
        if (quiereMas == '')
            descuento += 2
        quiereMas = prompt(`Actualmente tu descuénto es de ${descuento}%.\n\nSi creés que te merecés MÁS, ¡dale al enter sin escribir nada!. Si creés que es suficiente, escribi LISTO (nuestras finanzas te lo agradecen`).toUpperCase()
    } while (quiereMas != 'LISTO' && descuento < 30)
    // Si descuento es 30, salió por límite. Se le informa.
    if (descuento == 30) {
        alert("¡Listo, che! no te podemos dar más de un 30%. ¿Continuamos?")
    }
    return descuento
}

function retornoProducto(nombreProducto) {
    switch (nombreProducto) {
        case 'INTERNET':
            return producto1
        case 'TELEVISION':
            return producto2
        case 'TELEFONIA':
            return producto3
        default:
            alert("Mmm, parece que anteriormente no escribiste ni INTERNET, ni TELEFONIA, ni TELEVISION.\n\nEntonces vamos a tratar de engancharte... ¡UN COMBO POR LOS TRES!")
            let producto4 = new Productos(4, "Combo Internet - Television - Telefonia", "", 8000)
            return producto4
    }
}

function resultados(nombre, mail, descuento, productoElegido) {
    alert(`¡Bueno ${nombre}! el precio original del producto que elegiste (${productoElegido.nombre}) es ${productoElegido.precio}. Con tu merecido ${descuento}% de descuento, el precio final pasa a ser de ${productoElegido.calcularPrecioFinal(descuento)} \n\n¡En breve un ejecutivo te está contactando en ${mail} para mandarte la propuesta por escrito!\n\n(FIN)`)
}

iniciaSimulador()