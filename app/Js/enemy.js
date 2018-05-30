/*
* Clase Enemigo
* 
* Se encarga de pintar el enemigo en las posiciones x, y
*/

function Player(ctx, x, y, color) {
    this.ctx = ctx; //Este es el contexto en el que se movera el personaje.
    this.x = x; //posicion en el eje X
    this.y = y; //posicion en el eje Y
    this.width = 20; //Ancho del personaje
    this.height = 50; //Alto del personaje

    // Funcion que pinta el personaje en una posicion dada por X y Y
    this.draw = function () {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

}