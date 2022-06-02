// Variables
let hayVolteada = false
let impedirVoltear = false
let primeraTarjeta, segundaTarjeta
let yaInicio = false
let sigueSegundero = true
let rtasCorrectas = 0
let segundos = 0
let tiempoFinal = 0
let puntaje = 0
const sonidoError = new Audio('./audio/Error.wav');
const sonidoAcierto = new Audio('./audio/Acierto.wav');
const tarjetas = document.querySelectorAll('.tarjeta-ind')

// Alerta reglas
document.getElementById('botonReglas').addEventListener('click', alertaReglas)

function alertaReglas() {
    Swal.fire(
        'REGLAS',
        'Al hacer click en INICIAR JUEGO se mostrarán las cartas por unos segundos. Luego tenés que adivinar los pares. Por cada acierto sumás 3 puntos, por cada error restás 1. ¡Buena suerte!',
        'question'
    )
}

// Click iniciar juego
document.getElementById('botonInicio').addEventListener('click', iniciarJuego)

function iniciarJuego() {
    // Si presiona 'iniciar' más de una vez, que no tenga efecto
    if (yaInicio) return
    yaInicio = true

    // Mezclamos las tarjetas y las mostramos unos segundos
    mezclarTarjetas()
    muestraInicial()

    //Ejecuta sumaSegundos cada 1000ms para simular un cronómetro
    setInterval(sumaSegundos, 1000)

    // Recien ahora se añade listener click a cada tarjeta, puede comenzar a jugar
    tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', voltearTarjeta))
}

// Mezclo (recorremos y les asignamos un número random a la propiedad order)
function mezclarTarjetas() {
    tarjetas.forEach(tarjeta => {
        tarjeta.style.order = Math.floor(Math.random() * 12)
    })
}

// Muestra las imagenes unos segundos y luego las vuelve a ocultar
function muestraInicial() {
    setTimeout(() => {
        tarjetas.forEach(tarjeta => tarjeta.classList.add('volteada'))
    }, 500);
    setTimeout(() => {
        tarjetas.forEach(tarjeta => tarjeta.classList.remove('volteada'))
    }, 2500);
}

// Cada vez que clickean una tarjeta
function voltearTarjeta() {
    if ((impedirVoltear) || (this == primeraTarjeta))   // Con esto no puede voltear mas de dos al mismo tiempo + No puede dar dos clicks a la misma y romper todo
        return
    this.classList.add('volteada')   // Agregamos la clase 'volteada' a esta tarjeta si está todo OK
    if (!hayVolteada) {   // Si no hay ninguna ya volteada, ahora sí la hay y esta es la primera
        hayVolteada = true
        primeraTarjeta = this
    } else {
        segundaTarjeta = this     // Esta es la segunda volteada
        hayVolteada = false       // Reseteamos
        impedirVoltear = true     // Ya hay dos, impedimos voltear una tercera y luego lo volvemos a habilitar al terminar de analizar si es o no igual
        verCoincidencia()    // Llamamos a la función que se encarga de ver si las dos volteadas coinciden
    }
}

// Vemos si coinciden las volteadas
function verCoincidencia() {
    if (primeraTarjeta.dataset.producto == segundaTarjeta.dataset.producto) {
        bloquearTarjetas()    // Si hay acierto, quitamos el listener para que no se puedan voltear nuevamente
        sumarPuntos()
    } else { // Si no hay acierto, las desvolteamos y restamos puntos
        desVoltearTarjetas()
        restarPuntos()
    }
}

function bloquearTarjetas() {
    primeraTarjeta.removeEventListener('click', voltearTarjeta)
    segundaTarjeta.removeEventListener('click', voltearTarjeta)
    //primeraTarjeta = null // Sin esto, por lo de clickeada != primera tarjeta, no podrias tocar dos veces seguidas la misma como primera, cosa que es muy normal en este juego
    impedirVoltear = false
}

function desVoltearTarjetas() {
    setTimeout(() => { // Esperamos unos segundos antes de desvoltearlas para que se vea mas lindo
        primeraTarjeta.classList.remove('volteada')
        segundaTarjeta.classList.remove('volteada')
        primeraTarjeta = null // Sin esto, por lo de clickeada != primera tarjeta, no podrias tocar dos veces seguidas la misma como primera, cosa que es muy normal en este juego
        impedirVoltear = false
    }, 1000);
}


// Conteo de puntaje + Sonido acierto/error
function sumarPuntos() {
    puntaje += 3
    setTimeout(() => { //con delay asi coincide más o menos con la animación de volteada
        document.getElementById('seccionPuntaje').innerHTML = "Puntaje: " + puntaje
    }, 1000);
    sonidoAcierto.play()
    rtasCorrectas++
    if (rtasCorrectas == 6)
        terminoJuego()
}

function restarPuntos() {
    if (puntaje > 0) // Que no quede en negativo
        puntaje--
    setTimeout(() => {
        document.getElementById('seccionPuntaje').innerHTML = "Puntaje: " + puntaje
    }, 1000);
    sonidoError.play()
}

// Cronometro
function sumaSegundos() {
    if (sigueSegundero) {
        segundos += 1;
        document.getElementById('seccionTiempo').innerHTML = "Tiempo: " + segundos + " segs";
    }
}

// Termino el juego (disparado cuando todos los pares están volteados)
function terminoJuego() {
    sigueSegundero = false // Detenemos el timer
    // Ocultamos botones previos, mostramos nuevo botón de avanzar
    document.getElementById('botonAvanzar').style.display = "flex"
    document.getElementById('botonReglas').style.display = "none"
    document.getElementById('botonInicio').style.display = "none"

    // Disparamos notificación para que sepa que terminó
    Toastify({
        text: "¡Bien!",
        duration: 5000,
        gravity: "bottom",      
    }).showToast();

    // Guardamos en storage
    localStorage.setItem('puntajeObtenido', puntaje)
    localStorage.setItem('segundosTardados', segundos)
}