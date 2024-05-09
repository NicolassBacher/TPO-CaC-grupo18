


const meses = document.querySelector('#mes')
const paquetes = document.querySelectorAll('.paq_box')
const noDisponible = document.querySelector('.paq_falla')


const hoy = new Date()
const anioActual = new Date().getFullYear()
const mesActual = new Date().getMonth() + 1
const diaActual = new Date().getDate()
let viajesVigentes = []
let viajesProx6 = []
let viajess = {}
let mostrar = []


function validador(data) {
    viajesVigentes = []
    Object.entries(data.viajes).forEach(([key, value]) => {
        if (new Date(key) > hoy) {              //Filtrar tambien para que sea menores a un anio, osea, por ejemplo de mayo del 24 a abril de 25
            viajesVigentes.push(key)
        }
    })
    viajesVigentes.sort()
    console.log(viajesVigentes)
}

function arrayFiltro(viajes) {
    mostrar = []
    if (mes.value == 'prox') {

        mostrar = [viajesVigentes[0], viajesVigentes[1], viajesVigentes[2], viajesVigentes[3], viajesVigentes[4], viajesVigentes[5]]
        console.log(mostrar, 'proximos viajes')
    } else {
        viajesVigentes.forEach((viajeVigente) => {
            console.log(new Date(viajeVigente).getMonth() + 1, 'mes', mes.value)
            if (new Date(viajeVigente).getMonth() + 1 == mes.value) {
                console.log('entre')
                mostrar.push(viajeVigente)

            }
        })
        //if(viajesVigentes.getMonth())
    } console.log(mostrar)

}

function apagarTodo() {
    paquetes.forEach(paquete => paquete.style.display = 'none')
}

function armado(armar, datos) {
    console.log(armar)
    if (armar.length == 0 || datos == null) {
        console.log('entre')
        noDisponible.innerHTML = 'Lo sentimos, no disponemos de viajes para la fecha seleccionada, intente con otra fecha :)'
        noDisponible.style.display = 'block'

    }
    else {
        noDisponible.style.display = 'none'
    }
    //console.log(armar)
    armar.forEach((fecha, i) => {
        if (datos.viajes[fecha] != undefined) {
            //console.log(datos.viajes[fecha])
            //console.log(i, paquetes[i], 'aca' + datos.viajes[fecha].titulo)
            paquetes[i].childNodes[3].childNodes[1].innerHTML = datos.viajes[fecha].titulo
            paquetes[i].childNodes[3].childNodes[3].innerHTML = datos.viajes[fecha].tiempo
            paquetes[i].childNodes[3].childNodes[5].innerHTML = datos.viajes[fecha].descripcion
            paquetes[i].childNodes[3].childNodes[9].childNodes[1].innerHTML = "$" + datos.viajes[fecha].precio
            paquetes[i].style.display = 'flex'
        }
    })
}


async function cargarJSON() {
    try {
        const response = await fetch(('../JSON/viajes.json'))
        const viajes = await response.json()
        viajess = viajes
        validador(viajes)
        //console.log('JSON', e.target.value)
        arrayFiltro(viajes)
        apagarTodo()
        armado(mostrar, viajes)
    }
    catch (error) {
        console.log('ERROR AL CARGAR API', error)
        noDisponible.innerHTML = 'Lo sentimos, ha ocurrido un error al cargar los datos, vuelva a intentarlo mas tarde :)'
        noDisponible.style.display = 'block'
    }
}

meses.addEventListener('change', cargarJSON)
cargarJSON()