const formulario = document.getElementById('form');

const nombre = document.getElementById('firstName');
const apellido = document.getElementById('lastName');

const sector = document.getElementById('sector');
const nroOperacion = document.getElementById('operation');
const descripcion = document.getElementById('descrip');
const nroReclamo = [0]
let IDReclamo = "";
const delSector = document.getElementById('delSector');
const solicitante = document.getElementById('solicitante');
const info = document.getElementById('info');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    crearCaso();
})

function crearCaso() {
    crearNroSeguimiento(sector)
    const reclamo =  new Reclamos(IDReclamo);

    pintarReclamo(reclamo);

    guardarReclamoStorage(reclamo);

    almacenarCaso(reclamo)

    //Pintar la cantidad de reclamos que hay 
    const cantR = nroReclamo[nroReclamo.length - 1];
    mostrarQReclamos(cantR);
    validarCampo()
}

const almacenarCaso = async (caso) => {
    /*const response = await fetch('/casos' , {
        method: 'POST',
        body: JSON.stringify(caso)
    })
    const data = await response.json();
    console.log(data)
*/
fetch('/js/casos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(caso)
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.error('Error:', error);
});

}

const crearNroSeguimiento = () => {
    const section = sector.value
    const generarID = (section) => {
        let numerito = nroReclamo[nroReclamo.length - 1] + 1;
        nroReclamo.push(numerito);
        return IDReclamo = sector.value.charAt(0) + numerito;
    }
    switch (section) {
        case 'Recargas':
            generarID();
            break;
        case  'SUBE':
            generarID();
            break;
        case 'Cobro de servicios':
            generarID();
            break;
        case 'Medios de pagos':
            generarID();
            break;
        case 'Transferencias':
            generarID();
            break;
        case 'Plataforma':
            generarID();
            break;
        case 'App':
            generarID();
            break;
        default:
            alert('No elegiste una opción válida')
            break;
    }
}
const pintarReclamo = (reclamo) => {
    IDpintado.innerText = `${reclamo.IDReclamo}`;
    delSector.innerText = `${reclamo.sector}`;
    solicitante.innerText = `${reclamo.solicitante}`;
    info.innerText = `${reclamo.descripcion}`;
}

const mostrarQReclamos = (cantR) => {
    QReclamos.innerText = `${cantR}`
}

const guardarReclamoStorage = (reclamo) => {
    localStorage.setItem('reclamo', JSON.stringify(reclamo));
}

const obtenerReclamoStorage = () => {
    const reclamoStorage = JSON.parse(localStorage.getItem('reclamo'))
    return reclamoStorage;
}


const obtenerReclamo = () => {
    if (localStorage.getItem('reclamo')) {
        const prestamoStorage = obtenerReclamoStorage();
        pintarReclamo(prestamoStorage);
    }
}

obtenerReclamo();

//alert de reclamo realizado

const boton = document.querySelector('#form')
boton.addEventListener('submit', () => {
    Toastify({
        text: "Tu reclamo ha sido realizado",
        duration: 2000,
        gravity: 'bottom',
        position: 'left',
        style:{
            background: 'linear-gradient(to right, #EA6523, tomato)'
        }
        }).showToast();
}) 

// Agregar los casos que están cerrados en el DOM

const mostrarCasos = document.getElementById('botonCasos')

mostrarCasos.addEventListener('click', (e) => {
    e.preventDefault();
    pintarCerrados();
})
const pintarCerrados = () => {
    const casosClose = document.querySelector('#casesClose')

    fetch('/js/casosCerrados.json')
        .then( (resp) => resp.json())
        .then( (data) => {
            data.forEach((caso) => {
                const div = document.createElement('div')
                div.innerHTML = `<div class="cerrados">
                                    <h5>Casos cerrados</h5>
                                    <ul class="list-group mb-3">
                                        <li class="list-group-item d-flex justify-content-between lh-sm">
                                            <h6>ID:</h6>
                                            <span>${caso.IDReclamo}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between lh-sm">
                                            <h6>Sector:</h6>
                                            <span>${caso.sector}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between lh-sm">
                                            <h6>Solicitante:</h6>
                                            <span>${caso.solicitante}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between lh-sm">
                                            <h6>Descripción:</h6>
                                            <span>${caso.descripcion}</span>
                                        </li>
                                    </ul>
                                </div>`
                                casosClose.append(div)
            });
        })
}
