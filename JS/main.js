


const meses = document.querySelector('#mes')
const paquetes = document.querySelectorAll('.paq_box')

const paquete1 = document.querySelector('#lugar1')


const hoy = new Date()
const anioActual = new Date().getFullYear()
const mesActual = new Date().getMonth() + 1
const diaActual = new Date().getDate()
let viajesVigentes = []
let viajesProx6 = []
let datos = {}

//muestra u oculta los viajes en los meses seleccionados
function filtroXmes(e) {
    console.log(viajes)
    let mes = e.target.value
    paquetes.forEach((paquete) => {
        if (paquete.classList[1] == mes) {
            paquete.style.display = 'flex'
        }
        else {
            paquete.style.display = 'none'
        }
    })
}

function armado(armar) {
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
        else {
            console.log('no definido', datos.viajes[fecha])
        }

    })
}

function proximos(dato) {
    datos = dato
    //console.log('asd', datos.viajes)
    viajesVigentes = []
    Object.entries(datos.viajes).forEach(([key, value]) => {
        let comparar = new Date(key)
        console.log(key, comparar)
        if (comparar > hoy) {
            //console.log('entre', comparar, hoy)
            //hasta ca llegue, logre comparar las fechas descarta los anteriores al dia de hoy
            //hay que filtrar a un anio y armar un nuevo objeto con el filtro de aca a un anio
            // luego ordenar y tomar los primeros 6

            viajesVigentes.push(key)


        }
        //else { console.log('no entre', comparar, hoy) } //borrar esta linea, no sirve el else


    })
    //console.log('antes', viajesVigentes)
    viajesVigentes.sort()
    //console.log('despues', viajesVigentes)
    viajesProx6 = [viajesVigentes[0], viajesVigentes[1], viajesVigentes[2], viajesVigentes[3], viajesVigentes[4], viajesVigentes[5]]

    paquetes.forEach((paquete) => {
        paquete.style.display = 'none'
    })
    armado(viajesProx6)
}



fetch('../JSON/viajes.json')
    .then(response => viajes = response.json())
    .then(response => proximos(response))



//evento de escucha de cambios en el filtor por mes
meses.addEventListener('change', filtroXmes)