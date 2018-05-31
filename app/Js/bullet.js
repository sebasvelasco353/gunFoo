/*
* Este objeto es la bala, tiene una posicion X y una posicion Y, una velocidad
*/
function Bullet(ctx, x, y) {
    this.ctx = ctx; //Este es el contexto en el que se movera el personaje.
    this.x = x; //posicion en el eje X
    this.y = y; //posicion en el eje Y
    this.width = 10; //Ancho del personaje
    this.height = 10; //Alto del personaje
    this.velocity = 2;;

    // Funcion que pinta el personaje en una posicion dada por X y Y
    this.draw = function () {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.move = function() {
        this.x += 3;
    }

}