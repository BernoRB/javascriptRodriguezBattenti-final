// Se capturan los valores del form y se guardan en sessionStorage para usarlos luego
document.getElementById('botonJugar').addEventListener('click', guardarValores)

function guardarValores() {
    localStorage.setItem('nombre', document.getElementById('nombreInput').value)
    localStorage.setItem('mail', document.getElementById('mailInput').value)
}