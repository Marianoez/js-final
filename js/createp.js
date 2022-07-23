let efectivoContado = 0;
const rendicionesArray = [];

class Producto {
    constructor(cod, nombre, descripcion, imagen, precio) {
        this.cod = cod;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.img = imagen;
        this.precio = Number(precio);
    }
    precioFinal() {
        return this.precio * 1.21;
    }
}


function mainMenu() {
    contar = prompt('Buenas tardes! Presione: \n1: Para iniciar el contador. \n2: Para Guardar Rendiciones. \n3: Para mostrar Rendiciones anteriores \n4: Para cerrar.')
    switch (contar) {
        case '1':
            contador();
            break;
        case '2':
            saveR1();
            break;
        case '3':
            showR();
            break;
        case '4':
            alert('Gracias por utilizar nuestra App!');
            break;


    }
}
mainMenu();

function contador() {
    let b1000 = parseInt(prompt(`Ingrese la cantidad de billetes de 1000`)) * 1000;
    let b500 = parseInt(prompt(`Ingrese la cantidad de billetes de 500`)) * 500;
    let b200 = parseInt(prompt(`Ingrese la cantidad de billetes de 200`)) * 200;
    let b100 = parseInt(prompt(`Ingrese la cantidad de billetes de 100`)) * 100;
    let b50 = parseInt(prompt(`Ingrese la cantidad de billetes de 50`)) * 50;
    let b20 = parseInt(prompt(`Ingrese la cantidad de billetes de 20`)) * 20;
    let b10 = parseInt(prompt(`Ingrese la cantidad de billetes de 10`)) * 10;
    let b5 = parseInt(prompt(`Ingrese la cantidad de billetes de 5`)) * 5;
    let b2 = parseInt(prompt(`Ingrese la cantidad de billetes de 2`)) * 2;
    let b1 = parseInt(prompt(`Ingrese la cantidad de billetes de 1`)) * 1;
    let contador1 = 0;

    let suma = b1000 + b500 + b200 + b100 + b50 + b20 + b10 + b5 + b2 + b1;
    contar = prompt(`El monto total de los billetes es: ${suma}\n Presione:\n 1: Para iniciar un nuevo contador. \n 2: Para guardar rendicion. \n 3: Para Volver al Menu Principal. `);
    efectivoContado = suma;
    if (contar == 1) {
        contador();
    } else if (contar == 2) {
        saveR();
    } else if (contar == 3) {
        mainMenu();
    }
}

function saveR() {
    let cod = prompt('CODIGO');
    let nombre = prompt('NOMBRE');
    let descripcion = prompt('DESCRIPCION');
    let imagen = prompt('URL IMAGEN');
    let precio = Number(prompt('PRECIO'));
    rendicionesArray.push(new Rendicion(cod, nombre, descripcion, img, precio));
    mainMenu();
}

function saveR1() {
    let cod = prompt('CODIGO');
    let nombre = prompt('NOMBRE');
    let descripcion = prompt('DESCRIPCION');
    let imagen = prompt('URL IMAGEN');
    let precio = Number(prompt('PRECIO'));
    rendicionesArray.push(new Rendicion(cod, nombre, descripcion, img, precio));
    mainMenu();
}

function showR() {
    console.log(rendicionesArray);
    mainMenu();
}