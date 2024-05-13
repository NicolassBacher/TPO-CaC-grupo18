const meses = document.querySelector('#mes')
const contenido = document.querySelector('.paq_contenido')

const hoy = new Date()
const anioActual = new Date().getFullYear()
const mesActual = new Date().getMonth() + 1
const diaActual = new Date().getDate()
let viajesVigentes = []
let viajess = {}
let mostrar = []
let semana = {
    '0': 'Dom',
    '1': 'Lun',
    '2': 'Mar',
    '3': 'Mie',
    '4': 'Jue',
    '5': 'Vie',
    '6': 'Sab'
}

function validador(data) {
    viajesVigentes = []
    Object.entries(data.viajes).forEach(([key, value]) => {
        let salida = new Date(value.salida)
        if (salida > hoy && (salida.getFullYear() == anioActual || (salida.getFullYear() == anioActual + 1 && salida.getMonth() <= mesActual))) {
            viajesVigentes.push(key)
        }
    })
    viajesVigentes.sort()
}

function arrayFiltro(viajes) {
    mostrar = []
    if (mes.value == 'prox') {
        mostrar = [viajesVigentes[0], viajesVigentes[1], viajesVigentes[2], viajesVigentes[3], viajesVigentes[4], viajesVigentes[5], viajesVigentes[6], viajesVigentes[7]]
        mostrar.forEach((fecha, i) => {
            console.log(mostrar, i)
            if (fecha == undefined) {
                mostrar.splice(i)
            }
        })
    } else {
        viajesVigentes.forEach((viajeVigente) => {
            if (new Date(viajes.viajes[viajeVigente].salida).getMonth() + 1 == mes.value) {
                mostrar.push(viajeVigente)
            }
        })
    }
}

function armado(armar, datos) {
    contenido.innerHTML = ''
    if (armar.length == 0 || datos == null) {
        contenido.innerHTML = '<h3 class="paq_falla">Lo sentimos, no disponemos de viajes para la fecha seleccionada, intente con otra fecha :)</h3>'
    }
    else {
        const box = `<div class="paq_box">
        <img class="paq_portada" src="" alt=""/>
            <div class="paq_data">
                <h3></h3>
                <p class="paq_fecha"></p>
                <p class="paq_fecha"></p>
                <p class="paq_descripcion"></p>
                <hr class="paq_linea" />
                <div class="paq_precio">
                    <h2></h2>
                    <button class="paq_btn_info">+ info</button>
                </div>
            </div>
        </div > `
        for (var i = 0; i < armar.length; i++) {
            contenido.innerHTML += box
        }
        let paquetes = document.querySelectorAll('.paq_box')

        armar.forEach((id, i) => {
            let dato = datos.viajes[id]
            if (dato.salida != undefined) {
                let paq = paquetes[i].childNodes
                let salida = new Date(dato.salida)
                let regreso = new Date(dato.regreso)
                let tiempoDeViaje = ` ${dato.dias} dias ${dato.noches} noches | ${semana[salida.getDay()]} ${salida.getDate()}/${regreso.getMonth() + 1
                    } al ${semana[regreso.getDay()]} ${regreso.getDate()} /${regreso.getMonth() + 1}`

                let transporte = (a) => {
                    if (a.toLowerCase() == 'avion') {
                        return '<img src="../images/avion.png" alt="avion"/>'
                    } else {
                        return '<img src="../images/autobus.png" alt="avion"/>'
                    }

                }
                paq[1].src = dato.img
                paq[1].alt = dato.alt
                paq[3].childNodes[1].innerHTML = dato.titulo
                paq[3].childNodes[3].innerHTML = '<img src="../images/calendario.png" alt="calendario"/>' + ' &nbsp' + tiempoDeViaje
                paq[3].childNodes[5].innerHTML = transporte(dato.transporte) + ' &nbsp ' + dato.transporte
                paq[3].childNodes[7].innerHTML = dato.descripcion
                paq[3].childNodes[11].childNodes[1].innerHTML = "$" + dato.precio
            }
        })
    }
}


async function cargarJSON() {
    try {
        const response = await fetch(('../JSON/viajes.json'))
        const viajes = await response.json()
        viajess = viajes
        validador(viajes)
        arrayFiltro(viajes)
        armado(mostrar, viajes)
    }
    catch (error) {
        console.log('ERROR AL CARGAR API', error)
        contenido.innerHTML = ''
        contenido.innerHTML = '<h3 class="paq_falla">Lo sentimos, ha ocurrido un error al cargar los datos, vuelva a intentarlo mas tarde :)</h3>'
    }
}
meses.addEventListener('change', cargarJSON)
cargarJSON()