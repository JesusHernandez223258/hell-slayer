import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import GameScene from "./scenes/GameScene";

class App {
  constructor(container) {
    this.container = container;
    this.config = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      parent: container, // Vincula el juego al contenedor
      scene: [BootScene, GameScene],
    };
  }

  render() {
    new Phaser.Game(this.config); // Inicia Phaser con la configuración
  }
}

export default App;
