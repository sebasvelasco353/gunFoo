/*
* Clase Mundo
* 
* Se encarga de toda la logica del juego, de los movimientos, instanciar
* y pintar los diferentes agentes que aparecen.
*/

// Funcion que se encarga de obtener los frames con lo cual haremos un render constante o un loop donde se dibujaran e interactuaran los agentes.
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

// Window dimensions
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight - 100;
// Canvas element and 2d context
var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");
// set width and height of the canvas
canvas.width = windowWidth;
canvas.height = windowHeight;
// friccion de el jugador con el suelo, esto con el fin de que no pare totalmente al soltar una tecla sino que se deslice un poco
var friction = 0.8;
// La gravedad hace que poco a poco disminuya la velocidad hacia arriba del personaje y vuelva a bajar
var gravity = 0.3;
// creo una instancia de mi jugador
const player = new Player(context, 100, windowHeight - 20);
// Array where i store my obstacles
var obstacles = [];
// Array de enemigos
var enemies = [];
// Array donde guardo las balas
var bullets = [];
// Metodo que se encarga de generar un color para cada enemigo 
function generateColor() {
    var uno = Math.floor(Math.random() * 9);
    var dos = Math.floor(Math.random() * 9);
    var tres = Math.floor(Math.random() * 9);
    var cuatro = Math.floor(Math.random() * 9);
    var cinco = Math.floor(Math.random() * 9);
    var seis = Math.floor(Math.random() * 9);
    var color = "#" + uno + dos + tres + cuatro + cinco + seis;
    return color;
}
// crear y agregar al array las instancias de los obstaculos, estos son creados con numeros random
// la posicion esta enmarcada de forma random entre los valores 0 y el alto y ancho de la pantalla
// el alto y ancho con random entre valores predefinidos
for (let i = 0; i < 4; i++) {
    let element = new Obstacle(context, Math.floor((Math.random() * windowWidth) + 1), Math.floor((Math.random() * windowHeight) + 1), Math.floor((Math.random() * 600) + 1), Math.floor((Math.random() * 1000) + 1));
    obstacles.push(element);
}
// lleno el arreglo con enemigos creados a nivel del suelo en posiciones X aleatorias
for (let i = 0; i < 4; i++) {
    let element = new Enemy(context, Math.floor((Math.random() * windowWidth) + 1), windowHeight - 30, generateColor());
    enemies.push(element);
}
// Variables para verificar collide
var centerA = {
    x: null,
    y: null
};
var centerB = {
    x: null,
    y: null
};
var minDist = {
    x: null,
    y: null
};
var dist = {
    x: null,
    y: null
};
var step = true;
// Metodo que ayuda a detectar si hay o no collide entre dos objetos
function checkCollide(objectA, objectB) {
    /*
    * Este metodo realiza la verificacion en dos partes, primero con x y despues con y
    * primero verifica si la distancia entre los dos puntos centrales de los objetos 
    * es mayor que la suma de las distancias entre el centro y el vertice exterior
    * de cada objeto, si es mayor significa que no estan chocando en ese eje y pasa al siguiente
    */

    var direction = []
    // Encuentro distancia entre un corner y el punto central
    centerA.x = objectA.x + (objectA.width / 2);
    centerA.y = objectA.y + (objectA.height / 2);
    centerB.x = objectB.x + (objectB.width / 2);
    centerB.y = objectB.y + (objectB.height / 2);
    // Encuentro distancia minima para no collide
    minDist.x = (objectA.width / 2) + (objectB.width / 2);
    minDist.y = (objectA.height / 2) + (objectB.height / 2);
    // Encuentro la distancia entre el centro de a y el centro de B
    dist.x = centerA.x - centerB.x;
    dist.y = centerA.y - centerB.y;
    // convierto a positivo en caso de obtener un numero negativo
    if (dist.x < 0) {
        dist.x = dist.x * (-1);
    }
    if (dist.y < 0) {
        dist.y = dist.y * (-1);
    }
    // verifico el collide
    if ((dist.x <= minDist.x) && (dist.y <= minDist.y)) {
        if (objectA.y >= objectB.y) {
            direction[0] = 'top';
        } else {
            direction[0] = 'bot';
            gravity = 0;
        }
        if (objectA.x <= objectB.x) {
            direction[1] = 'right';
        } else {
            direction[1] = 'left';
        }
    } else {
        gravity = 0.3;
    }
    return direction;
}

function checkCollideBullet(objectA, objectB) {
    /*
    * Este metodo realiza la verificacion en dos partes, primero con x y despues con y
    * primero verifica si la distancia entre los dos puntos centrales de los objetos 
    * es mayor que la suma de las distancias entre el centro y el vertice exterior
    * de cada objeto, si es mayor significa que no estan chocando en ese eje y pasa al siguiente
    */

    var direction = []
    // Encuentro distancia entre un corner y el punto central
    centerA.x = objectA.x + (objectA.width / 2);
    centerA.y = objectA.y + (objectA.height / 2);
    centerB.x = objectB.x + (objectB.width / 2);
    centerB.y = objectB.y + (objectB.height / 2);
    // Encuentro distancia minima para no collide
    minDist.x = (objectA.width / 2) + (objectB.width / 2);
    minDist.y = (objectA.height / 2) + (objectB.height / 2);
    // Encuentro la distancia entre el centro de a y el centro de B
    dist.x = centerA.x - centerB.x;
    dist.y = centerA.y - centerB.y;
    // convierto a positivo en caso de obtener un numero negativo
    if (dist.x < 0) {
        dist.x = dist.x * (-1);
    }
    if (dist.y < 0) {
        dist.y = dist.y * (-1);
    }
    // verifico el collide
    if ((dist.x <= minDist.x) && (dist.y <= minDist.y)) {
        // console.log('mataste el bicho ', objectB);
        var indexEnemy = enemies.indexOf(objectB);
        var indexBullet = bullets.indexOf(objectA);
        bullets.splice(indexBullet, 1);
        enemies.splice(indexEnemy, 1);
    }
}

// Creo un arreglo donde tendre las teclas que se presionaran para asi poder conectarlas con las acciones,
// no lo hago con un solo metodo keypressed por cada una de las teclas que se presionaran pues el usuario debe poder usar varias teclas al mismo tiempo
// como por ejemplo caminar y disparar o saltar y moverse hacia el frente.
var keys = [];
// Como no se puede hacer un addEventListener con los keypressed en el canvas lo hago en el body para poder encontrar cual es la tecla que se esta usando
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
// Este metodo es el encargado de revisar cuales teclas estan presionadas y cambiar la velocidad del jugador en el eje correspondiente
// para generar el movimiento del mismo
function movePlayer() {
    // verifica las teclas que vamos a usar en el juego
    if (keys[38]) {
        // Arriba
        player.velY = -6;
    }
    if (keys[39]) {
        // der
        player.velX = 6;
    }
    if (keys[37]) {
        // izq
        player.velX = -6;
    }
    if (keys[32]) {
        // new Bullet
        bullets.push(new Bullet(context, player.x + player.width, player.y + player.height / 4));
    }

    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].draw();
        var dir = checkCollide(player, obstacles[i]);
        if (dir[1] === "right") {
            player.velX = -1;
        } else if (dir[1] === "left") {
            player.velX = 1;
        }
        if (dir[0] === 'bot') {
            player.velY = -1;
            step = true;
        } else if (dir[0] === 'top') {
            player.velY *= -1;
            parado = false;
        }
        else {
            player.velY = player.velY;
        }
    }

    if (step) {
        gravity = 0.3;
    }
    // Aplicar la friccion del suelo sobre la superficie del personaje
    player.velX *= friction;
    // aplico la gravedad al personaje
    player.velY += gravity;
    // Mover el personaje
    player.x += player.velX;
    player.y += player.velY;
    // para que no se salga de la pantalla en x
    if (player.x >= windowWidth - player.width) {
        player.x = windowWidth - player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }
    // para que no se salga de la pantalla en Y
    if (player.y >= windowHeight - player.height) {
        player.y = windowHeight - player.height;
    } else if (player.y <= 0) {
        player.y = 0;
    }
}
// funcion update que corre los metodos de pintar y controlar las cosas cada frame
function update() {
    // borro lo que estaba antes
    context.clearRect(0, 0, windowWidth, windowHeight);
    // Primero muevo el personaje, despues lo dibujo en la pantalla
    movePlayer();
    player.draw();
    for (let z = 0; z < enemies.length; z++) {
        enemies[z].draw();
    }
    for (let i = 0; i < bullets.length; i++) {
        // console.log(bullets[i]);
        bullets[i].draw();
        bullets[i].move();
        for (let a = 0; a < enemies.length; a++) {
            checkCollideBullet(bullets[i], enemies[a]);
        }
    }
    requestAnimationFrame(update);
}
// Cuando la ventana cargue va a correr por primera vez el metodo update, este se llamara constantemente a si mismo
window.addEventListener("load", function () {
    update();
});