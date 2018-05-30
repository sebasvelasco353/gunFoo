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