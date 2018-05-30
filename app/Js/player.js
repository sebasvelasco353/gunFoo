/*
* Objeto Jugador
* 
* Se encarga de pintar el personaje en las posiciones x, y
* tiene los metodos pintar, mover, saltar,
* get de la posicion y disparar.
*/

function Player(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.getX = function () {
        return this.x;
    }
    this.getY = function () {
        return this.y;
    }
    this.draw = function () {
        console.log('drawing');
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}