import Phaser from "phaser";

export default class EntityScene extends Phaser.Scene {
  constructor() {
    super("EntityScene");
  }

  preload() {
    // Carga tus recursos (sprites de enemigos, héroe, etc.)
    this.load.image("enemy-sprite", "/assets/img/enemies/dummy1.png");
    // Otros recursos
  }

  create() {
    // Aquí puedes agregar personajes o enemigos
    this.enemy = this.add.sprite(400, 300, "enemy-sprite");

    // Lógica para el movimiento de los enemigos
    this.tweens.add({
      targets: this.enemy,
      x: 600,
      duration: 2000,
      yoyo: true,
      repeat: -1,
    });
  }

  update() {
    // Lógica de juego, detección de colisiones, etc.
  }
}
