let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;
let cliente_existe = "";

clientes.push({cedula: "1712345678", nombre: "Juan",   apellido: "Pérez",   ingresos: 1200, egresos: 500});
clientes.push({cedula: "1723456789", nombre: "María",  apellido: "Gómez",   ingresos: 1500, egresos: 600});
clientes.push({cedula: "1734567890", nombre: "Carlos", apellido: "Ramírez", ingresos: 900,  egresos: 350});

creditos.push({cedula: "1712345678", nombre: "Juan",   apellido: "Pérez",   monto: 3000, tasa: 15, plazo: 1,   cuota: 287.50});
creditos.push({cedula: "1723456789", nombre: "María",  apellido: "Gómez",   monto: 5000, tasa: 14, plazo: 2,   cuota: 237.50});
creditos.push({cedula: "1734567890", nombre: "Carlos", apellido: "Ramírez", monto: 1500, tasa: 16, plazo: 0.5, cuota: 290.00});

function ocultarSecciones(){
    let componente = document.getElementById("parametros");
    let listaClass = componente.classList;
    listaClass.remove("activa");

    let componente2 = document.getElementById("clientes");
    let listaClass2 = componente2.classList;
    listaClass2.remove("activa");

    let componente3 = document.getElementById("credito");
    let listaClass3 = componente3.classList;
    listaClass3.remove("activa");

    let componente4 = document.getElementById("listaCreditos");
    let listaClass4 = componente4.classList;
    listaClass4.remove("activa");
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

    if (clienteSeleccionado != null) {
        clienteSeleccionado.nombre   = datoCliente.nombre;
        clienteSeleccionado.apellido = datoCliente.apellido;
        clienteSeleccionado.ingresos = datoCliente.ingresos;
        clienteSeleccionado.egresos  = datoCliente.egresos;
        alert("Cliente actualizado");
    } else {
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

function buscarClienteCredito() {
    let cedula = recuperaraTexto("buscarCedulaCredito");
    let clienteEncontrado = buscarCliente(cedula);
    let cmpDatos = document.getElementById("datosClienteCredito");

    if (clienteEncontrado != null) {
        clienteSeleccionado = clienteEncontrado;
        cmpDatos.innerHTML =
            `<h3>Datos del Cliente</h3>` +
            `<p><strong>Cédula:</strong> `   + clienteEncontrado.cedula   + `</p>` +
            `<p><strong>Nombre:</strong> `   + clienteEncontrado.nombre   + `</p>` +
            `<p><strong>Apellido:</strong> ` + clienteEncontrado.apellido + `</p>` +
            `<p><strong>Ingresos:</strong> ` + clienteEncontrado.ingresos + `</p>` +
            `<p><strong>Egresos:</strong> `  + clienteEncontrado.egresos  + `</p>`;
    } else {
        cmpDatos.innerHTML = `<p>Cliente no encontrado</p>`;
        clienteSeleccionado = null;
    }

    let cmpResultado = document.getElementById("resultadoCredito");
    cmpResultado.innerHTML = "";
    cmpResultado.className = "";

    let btnSolicitar = document.getElementById("btnSolicitarCredito");
    btnSolicitar.disabled = true;
}

function calcularCredito() {
    if (clienteSeleccionado == null) {
        alert("Primero busque un cliente");
        return;
    }

    let monto = recuperarFloat("montoCredito");
    let plazo = recuperarFloat("plazoCredito");
    let disponible = clienteSeleccionado.ingresos - clienteSeleccionado.egresos;
    if (disponible < 0) {
        disponible = 0;
    }
    let capacidadPago = disponible / 2;
    let interes = monto * (tasaInteres / 100) * plazo;
    const SOLCA = 100;
    let totalPagar = monto + interes + SOLCA;
    let plazoMeses = plazo * 12;
    let cuotaMensual = totalPagar / plazoMeses;

    montoCalculado  = monto;
    plazoCalculado  = plazo;
    cuotaCalculada  = cuotaMensual;

    let cmpResultado = document.getElementById("resultadoCredito");
    let btnSolicitar = document.getElementById("btnSolicitarCredito");

    if (capacidadPago >= cuotaMensual) {
        creditoAprobado = true;
        cmpResultado.className = "aprobado";
        cmpResultado.innerHTML =
            `Capacidad de pago: ` + capacidadPago.toFixed(2) + `<br>` +
            `Total a pagar: `     + totalPagar.toFixed(2)    + `<br>` +
            `Cuota mensual: `     + cuotaMensual.toFixed(2)  + `<br>` +
            `RESULTADO: APROBADO`;
        btnSolicitar.disabled = false;
    } else {
        creditoAprobado = false;
        cmpResultado.className = "rechazado";
        cmpResultado.innerHTML =
            `Capacidad de pago: ` + capacidadPago.toFixed(2) + `<br>` +
            `Total a pagar: `     + totalPagar.toFixed(2)    + `<br>` +
            `Cuota mensual: `     + cuotaMensual.toFixed(2)  + `<br>` +
            `RESULTADO: RECHAZADO`;
        btnSolicitar.disabled = true;
    }
}

function solicitarCredito() {
    let credito = {
        cedula:   clienteSeleccionado.cedula,
        nombre:   clienteSeleccionado.nombre,
        apellido: clienteSeleccionado.apellido,
        monto:    montoCalculado,
        tasa:     tasaInteres,
        plazo:    plazoCalculado,
        cuota:    cuotaCalculada
    };
    creditos.push(credito);
    alert("Crédito asignado correctamente");
}

function buscarCreditos(cedula) {
    let creditosEncontrados = [];
    let elementoCredito;
    for (let i = 0; i < creditos.length; i++) {
        elementoCredito = creditos[i];
        if (elementoCredito.cedula == cedula) {
            creditosEncontrados.push(elementoCredito);
        }
    }
    return creditosEncontrados; 
}

function pintarCreditos(listadoCreditos) {
    let cmpTabla = document.getElementById("tablaCreditos");
    let contenidoTabla = "";
    let elementoCredito;
    for (let i = 0; i < listadoCreditos.length; i++) {
        elementoCredito = listadoCreditos[i];
        contenidoTabla += `<tr>` +
            `<td>` + elementoCredito.cedula              + `</td>` +
            `<td>` + elementoCredito.nombre              + `</td>` +
            `<td>` + elementoCredito.apellido            + `</td>` +
            `<td>` + elementoCredito.monto.toFixed(2)    + `</td>` +
            `<td>` + elementoCredito.tasa                + `%</td>` +
            `<td>` + elementoCredito.plazo               + ` años</td>` +
            `<td>` + elementoCredito.cuota.toFixed(2)    + `</td>` +
            `<td><input type='button' value='Eliminar' onclick="eliminarCredito(` + i + `);">` + `</td>` +
            `</tr>`;
    }
    cmpTabla.innerHTML = contenidoTabla;
}

function buscarCreditosCliente() {
    let cedula = recuperaraTexto("buscarCedulaListado");
    let creditosEncontrados = buscarCreditos(cedula);
    pintarCreditos(creditosEncontrados);
}

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios