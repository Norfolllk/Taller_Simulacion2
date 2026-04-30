let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

clientes.push({cedula: "1712345678", nombre: "Juan",   apellido: "Pérez",   ingresos: 1200, egresos: 500});
clientes.push({cedula: "1723456789", nombre: "María",  apellido: "Gómez",   ingresos: 1500, egresos: 600});
clientes.push({cedula: "1734567890", nombre: "Carlos", apellido: "Ramírez", ingresos: 900,  egresos: 350});

function ocultarSecciones(){
    let componente = document.getElementById("parametros");
    let listaClass = componente.classList;
    listaClass.remove("activa");

    let componente2 = document.getElementById("clientes");
    let listaClass2 = componente2.classList;
    listaClass2.remove("activa");
}

function mostrarSeccion(id){
    ocultarSecciones();

    let componente = document.getElementById(id);
    let listaClass = componente.classList;
    listaClass.add("activa");
}

function guardarTasa(){
    let tasa = recuperarInt("tasaInteres");
    if (tasa >= 10 && tasa <= 20) {
        tasaInteres = tasa;
        mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasaInteres + "%");
    } else {
        mostrarTexto("mensajeTasa", "La tasa debe estar entre 10 y 20");
    }
}

function guardarCliente() {
    let valorCedula   = recuperaraTexto("txtCedula");
    let valorNombre   = recuperaraTexto("txtNombre");
    let valorApellido = recuperaraTexto("txtApellido");
    let valorIngresos = recuperarFloat("txtIngresos");
    let valorEgresos  = recuperarFloat("txtEgresos");

    let datoCliente = {};
    datoCliente.cedula   = valorCedula;
    datoCliente.nombre   = valorNombre;
    datoCliente.apellido = valorApellido;
    datoCliente.ingresos = valorIngresos;
    datoCliente.egresos  = valorEgresos;

    let resultado = buscarCliente(datoCliente.cedula);
    if (resultado == null) {
        clientes.push(datoCliente);
        alert("Cliente agregado");
    } else {
        resultado.nombre   = datoCliente.nombre;
        resultado.apellido = datoCliente.apellido;
        resultado.ingresos = datoCliente.ingresos;
        resultado.egresos  = datoCliente.egresos;
        alert("Cliente actualizado");
    }
    pintarClientes();
    limpiar();
}

pintarClientes = function() {
    let cmpTabla = document.getElementById("tablaClientes");
    let contenidoTabla = "";
    let elementoCliente;
    for (let i = 0; i < clientes.length; i++) {
        elementoCliente = clientes[i];
        contenidoTabla += `<tr>` +
            `<td>` + elementoCliente.cedula   + `</td>` +
            `<td>` + elementoCliente.nombre   + `</td>` +
            `<td>` + elementoCliente.apellido + `</td>` +
            `<td>` + elementoCliente.ingresos + `</td>` +
            `<td>` + elementoCliente.egresos  + `</td>` +
            `<td>` +
                `<input type='button' value='Actualizar' onclick="seleccionarCliente('` + elementoCliente.cedula + `');">` +
                `<input type='button' value='Eliminar'   onclick="eliminarCliente('`   + elementoCliente.cedula + `');">` +
            `</td>` +
            `</tr>`;
    }
    cmpTabla.innerHTML = contenidoTabla;
}

function buscarCliente(cedula) {
    let elementoCliente;
    let clienteEncontrado = null;
    for (let i = 0; i < clientes.length; i++) {
        elementoCliente = clientes[i];
        if (elementoCliente.cedula == cedula) {
            clienteEncontrado = elementoCliente;
            break;
        }
    }
    return clienteEncontrado;
}

function seleccionarCliente(cedula) {
    let clienteEncontrado = buscarCliente(cedula);
    if (clienteEncontrado != null) {
        clienteSeleccionado = clienteEncontrado;
        mostrarTextoEnCaja("txtCedula",   clienteEncontrado.cedula);
        mostrarTextoEnCaja("txtNombre",   clienteEncontrado.nombre);
        mostrarTextoEnCaja("txtApellido", clienteEncontrado.apellido);
        mostrarTextoEnCaja("txtIngresos", clienteEncontrado.ingresos);
        mostrarTextoEnCaja("txtEgresos",  clienteEncontrado.egresos);
    } else {
        alert("Cliente no encontrado");
    }
}

function eliminarCliente(cedula) {
    let elementoCliente;
    for (let i = 0; i < clientes.length; i++) {
        elementoCliente = clientes[i];
        if (elementoCliente.cedula == cedula) {
            clientes.splice(i, 1);
            alert("Cliente eliminado");
            break;
        }
    }
    pintarClientes();
}

function limpiar() {
    mostrarTextoEnCaja("txtCedula",   "");
    mostrarTextoEnCaja("txtNombre",   "");
    mostrarTextoEnCaja("txtApellido", "");
    mostrarTextoEnCaja("txtIngresos", "");
    mostrarTextoEnCaja("txtEgresos",  "");
    clienteSeleccionado = null;
}
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios