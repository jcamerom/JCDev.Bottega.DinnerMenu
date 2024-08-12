/*
Proyecto: Dinner_Menu
Objetivo: Conseguir un programa que mediante prompts y alerts, recoja la reserva de un desayuno, almuerzo o cena de un restaurante,
    escogiendo una franja horaria. Además, es capaz de elegir los platos a escoger, según la reserva, y de tres posibles en cada modalidad:
    principal, segundo y postre. Por ultimo realiza un cálculo del total a pagar con esos platos.  
*/

// Función principal del programa DinnerMenu
function obtenerMenu() {
    /*
    Bloque 1: 
    Lanzar el mensaje de bienvenida y preguntar por la hora de la reserva con el formato esperado.
    Depuración de entradas incorrectas: botón cancelar, formato incorrecto, horario de cierre, y horario correcto.
    Pasar la hora correcta al objeto Date.
    */
    let hora;
    let formatoCorrecto = false;
    let horas;
    let minutos;
  
    while (!formatoCorrecto){
        hora = prompt("¡Gracias por acudir a nuestro Restaurante! ¿A qué hora quieres reservar mesa? (Formato hh:mm de 24 horas)");

        // Validar el formato de la hora
        let regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
        if (hora === null) {
            alert("Muchas gracias por tu visita, ¡hasta la próxima!");
            return;
        } else if (!regex.test(hora)) {
            alert("Por favor, escriba en el formato correcto");
        } else if (regex.test(hora)) {
            [horas, minutos] = hora.split(':').map(Number);
            if (horas >= 0 && horas < 7){
                alert("El horario de apertura del restaurate es de 07:00 a 00:00 horas")
            } else {
                formatoCorrecto = true; // La hora es válida
            }
        }
    }
    // utilizar el objeto Date para establecer la hora de la reserva
    let tiempo = new Date();
    tiempo.setHours(horas, minutos);
    
    /*
    Bloque 2: 
    Definir los distintos menús.
    Adjudicar el menú correspondiente a la hora de la reserva
    */
    
    // Definir los menús disponibles
    const menuDesayuno = {
        principal: ["TOSTADAS (1.5€)", "TORTILLA (2€)", "BOLLERIA (1€)"],
        secundario: ["GALLETAS (1€)", "YOGUR (1.5€)", "CEREALES (0.75€)"],
        postre: ["CAFE (1€)", "CACAO (0.85€)", "ZUMO (1.5€)"]
    };

    const menuAlmuerzo = {
        principal: ["ARROZ (3€)", "PASTA (2.5€)", "ALUBIAS (3.5€)"],
        secundario: ["SOPA (2€)", "ENSALADA (3€)", "PURE (2.5€)"],
        postre: ["HELADO (1.5€)", "TARTA (2.5€)", "FRUTA (2€)"]
    };

    const menuCena = {
        principal: ["PESCADO (4€)", "CARNE (5€)", "VERDURAS (3.5€)"],
        secundario: ["SOPA (2€)", "PURE (2.5€)", "ENSALADA (3€)"],
        postre: ["HELADO (1.5€)", "TARTA (2.5€)", "FRUTA (2€)"]
    };

    // Determinar el menú según la hora
    let menu;
    if (tiempo.getHours() >= 7 && tiempo.getHours() <= 12) {
        alert("Ha reservado un DESAYUNO\nA continuación debe elegir un único plato de cada modalidad.");
        menu = menuDesayuno;
    } else if (tiempo.getHours() < 17) {
        alert("Ha reservado un ALMUERZO\nA continuación debe elegir un único plato de cada modalidad.");
        menu = menuAlmuerzo;
    } else {
        alert("Ha reservado un CENA\nA continuación debe elegir un único plato de cada modalidad.");
        menu = menuCena;
    }
    
    /* 
    Bloque 3: 
    Presentar los platos opcionables
    Llamar a la función para validar los platos elegidos.
    */
    
    // Preguntar por los platos elegidos
    let platoPrincipal = prompt(`Principal: \n${menu.principal.join('\n')} \n¿Qué plato prefieres?:`);
    let primero = validarPlatos(menu.principal, platoPrincipal);
    if (primero === null) {
        alert("Muchas gracias por tu visita, ¡hasta la próxima!");
        return;
    }
    let platoSecundario = prompt(`Secundario: \n${menu.secundario.join('\n')} \n¿Cuál vas a escoger?`);
    let segundo = validarPlatos(menu.secundario, platoSecundario);
    if (primero === null) {
        alert("Muchas gracias por tu visita, ¡hasta la próxima!");
        return;
    }
    let platoPostre = prompt(`Postre: \n${menu.postre.join('\n')} \n¿Y de postre, cuál vas a elegir?`);
    let postre = validarPlatos(menu.postre, platoPostre);    
    if (primero === null) {
        alert("Muchas gracias por tu visita, ¡hasta la próxima!");
        return;
    }
    
    /*
    Bloque 4: 
    Definir los precios de las distintas opciones.
    Adjudicar los precios correspondientes a los platos seleccionados.
    Presentar el menú seleccionado y el total del importe. 
    Mensaje de despedida.
    */
    
    // Definir precios
    const precios = {
        "tostadas": 1.5, 
        "tortilla": 2,
        "bolleria": 1,
        "galletas": 1,
        "yogur": 1.5, 
        "cereales": 0.75,
        "cafe": 1, 
        "cacao": 0.85, 
        "zumo": 1.5,
        "arroz": 3, 
        "pasta": 2.5, 
        "alubias": 3.5,
        "sopa": 2, 
        "ensalada": 3, 
        "pure": 2.5, 
        "helado": 1.5, 
        "tarta": 2.5,
        "fruta": 2,
        "pescado": 4,
        "carne": 5, 
        "verduras": 3.5
    };

    // Calcular el total
    let total = precios[primero.toLowerCase()] + precios[segundo.toLowerCase()] + precios[postre.toLowerCase()];

    // Mostrar el total a pagar
    alert(`El menú seleccionado es:\n\n Primero: ${primero.toUpperCase()} - ${precios[primero.toLowerCase()]}€\n Segundo: ${segundo.toUpperCase()} - ${precios[segundo.toLowerCase()]}€\n Postre: ${postre.toUpperCase()} - ${precios[postre.toLowerCase()]}€\n\n El total a pagar es: ${total}€\n Gracias, esperamos su visita, ¡les gustará!`);
}

function validarPlatos(arrayPlatos, platoElegido) {
    let validez = false;
    let i = 0;
    const arrayLimpio = arrayPlatos.map(str => str.replace(/[^a-z]/gi, '').trim().toLowerCase());
    
    while (!validez){
        platoElegido = platoElegido.replace(/^[a-z]/gi, '').trim().toLowerCase();
        while (i < arrayLimpio.length && arrayLimpio[i] != platoElegido) {
            i++;
        }
        if (i == arrayLimpio.length) {
            alert("El plato elegido no está disponible");
            platoElegido = prompt(`Los platos disponibles son: \n${arrayPlatos.join('\n')} \nElige de nuevo:`);
            i = 0;
        } else if (arrayLimpio[i] == platoElegido) {
            validez = true;
            let mensajeAleatorio = generarMensAleatorio();
            alert(`${mensajeAleatorio}`);
            return platoElegido;
        }
    }
}

function generarMensAleatorio() {
    const mensaje = ["¡Elegiste bien!", "¡Excelente decisión!", "¡Apuntado!", "¡Oído cocina!"];
    const indiceAleatorio = Math.floor(Math.random() * mensaje.length);
    return mensaje[indiceAleatorio];
}

// Llamar a la función
obtenerMenu();
