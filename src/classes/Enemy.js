// Enemy.js
export default class Enemy {
    constructor(scene, x, y, texture) {
      // Crear el sprite del enemigo y asignar la imagen
      this.sprite = scene.add.sprite(x, y, texture); 
      this.scene = scene;
      
      // Establecer las propiedades de movimiento
      this.speed = 100; // Velocidad de movimiento (pixeles por segundo)
      this.direction = 1; // 1 significa moviéndose a la derecha, -1 a la izquierda
      this.movementRange = 400; // El rango de movimiento (cuánto se mueve antes de cambiar de dirección)
      this.initialX = x; // Almacena la posición inicial X
    }
  
    update(time, delta) {
      // Movimiento de lado a lado
      this.sprite.x += this.speed * this.direction * (delta / 1000); // Multiplicamos por delta para hacerlo frame-rate independiente
  
      // Verificamos si el enemigo ha llegado al límite de su movimiento
      if (this.sprite.x >= this.initialX + this.movementRange || this.sprite.x <= this.initialX) {
        this.direction *= -1; // Cambiar dirección
      }
    }
  }
  