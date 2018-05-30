// Window dimensions
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Canvas element and 2d context
var canvas = document.querySelector('canvas');
var world = canvas.getContext("2d");
// set width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// creo una instancia de mi jugador
const player = new Player(world, 100, 100, 10, 10);
// pinto a mi jugador en el mundo
player.draw();