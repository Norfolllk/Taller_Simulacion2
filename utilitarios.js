function recuperaraTexto(idComponente){
    let componente;
    let valorIngresado;
    componente=document.getElementById(idComponente);
    valorIngresado=componente.value;
    return valorIngresado;
}
    
function recuperarInt(idComponente){
    let valorCaja=recuperaraTexto(idComponente);
    let valorEntero=parseInt(valorCaja);
    return valorEntero;
}

function recuperarFloat(idComponente){
    let valorCaja=recuperaraTexto(idComponente);
    let valorFlotante=parseFloat(valorCaja);
    return valorFlotante;
}

function mostrarTexto(idComponente,mensaje){
    let componente;
    componente=document.getElementById(idComponente);
    componente.innerText=mensaje;
}

function mostrarTextoEnCaja(idComponente,mensaje){
    let componente;
    componente=document.getElementById(idComponente);
    componente.value=mensaje;
}
    
function mostrarImagen(idComponente,rutaImagen){
    let componente;
    componente=document.getElementById(idComponente);
    componente.src = rutaImagen;
    
}

function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    return disponible;
}

function calcularCapacidadPago(ingresos, egresos, monto) {
    let disponible = calcularDisponible(ingresos, egresos);
    let capacidad = disponible * 0.3;
    return capacidad;
}

function calcularInteresSimple(monto, tasa, plazo) {
    let interes = monto * tasa * plazo;
    return interes;
}

function calcularTotalPagar(monto, interes) {
    let total = monto + interes;
    return total;
}

function calcularCuotaMensual(total, plazo) {
    let cuota = total / plazo;
    return cuota;
}

function analizarCredito() {
    alert('Análisis de crédito finalizado');
}

function aprobarCredito(credito) {
    return credito === true ? "CREDITO APROBADO" : "CREDITO RECHAZADO" ;
}
