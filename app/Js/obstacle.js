/*
* Clase Obstaculo
* 
* Se encarga de pintar el obstaculo
*/

function Obstacle(ctx, x, y, width, height) {
    this.ctx = ctx; //Este es el contexto en el que se movera el personaje.
    this.x = x; //posicion en el eje X
    this.y = y; //posicion en el eje Y
    this.width = width; //Ancho del personaje
    this.height = height; //Alto del personaje
    

    // Funcion que pinta el personaje en una posicion dada por X y Y
    this.draw = function () {
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}