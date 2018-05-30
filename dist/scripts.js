

/*
* Clase Jugador
* 
* Se encarga de pintar el personaje en las posiciones x, y
* tiene los metodos pintar, mover, saltar,
* get de la posicion y disparar.
*/

function Player(ctx, x, y) {
    this.ctx = ctx; //Este es el contexto en el que se movera el personaje.
    this.x = x; //posicion en el eje X
    this.y = y; //posicion en el eje Y
    this.width = 10; //Ancho del personaje
    this.height = 10; //Alto del personaje
    this.velX = 0; //Velocidad con la que se mueve en el eje X
    this.velY = 0; //Velocidad con la que se mueve en el eje Y

    // Funcion que pinta el personaje en una posicion dada por X y Y
    this.draw = function () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

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
const windowHeight = window.innerHeight;

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
const player = new Player(context, 100, 100);
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
        // Derecha
        player.velX = 6;
    }
    if (keys[37]) {
        // Izquierda                
        player.velX = -6;
    }
    // Aplicar la friccin del suelo sobre la superficie del personaje
    player.velX *= friction;
    // aplico la gravedad al personaje
    player.velY += gravity;
    // Mover el personaje
    player.x += player.velX;
    player.y += player.velY;
    // para que no se salga de la pantalla en x
    if (player.x >= windowWidth-player.width) {
        player.x = windowWidth-player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }
    // para que no se salga de la pantalla en Y
    if (player.y >= windowHeight-player.height) {
        player.y = windowHeight-player.height;
    } else if (player.y <= 0) {
        player.y = 0;
    }
}
// funcion update que corre los metodos de pintar y controlar las cosas cada frame
function update() {
    // Primero muevo el personaje, despues lo dibujo en la pantalla
    movePlayer();
    player.draw();
    requestAnimationFrame(update);
}
// Cuando la ventana cargue va a correr por primera vez el metodo update, este se llamara constantemente a si mismo
window.addEventListener("load", function () {
    update();
});