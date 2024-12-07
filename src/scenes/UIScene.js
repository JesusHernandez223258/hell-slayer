import Phaser from "phaser";
import { addBitmapTextToPhaser } from "../components/BitmapText"; // Asegúrate de importar correctamente

export default class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene");
  }

  create() {
    // Fondo del HUD
    this.add.image(400, 700, "hud-background").setOrigin(0.5, 1);

    // Crear elementos de texto usando bitmap
    this.createTextElement("74", 50, 700);
    this.createTextElement("69%", 150, 700);
    this.createTextElement("157%", 250, 700);

    // Otros elementos del HUD
    this.arms = this.add.image(350, 700, "arms-sprite").setOrigin(0.5, 1);
    this.items = this.add.image(450, 700, "items-sprite").setOrigin(0.5, 1);
    this.stats = this.add.image(550, 700, "stats-sprite").setOrigin(0.5, 1);
    this.doomHero = this.add
      .sprite(700, 700, "doom-hero-sprite")
      .setOrigin(0.5, 1);
  }

  createTextElement(text, x, y) {
    // Usar la función para crear y agregar el texto bitmap
    addBitmapTextToPhaser(this, text, x, y);
  }

  update() {
    // Aquí puedes actualizar los valores del HUD según el juego
  }
}
