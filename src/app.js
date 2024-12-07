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

    // Escuchar un clic en el contenedor para inicializar el juego
    this.container.addEventListener("click", this.initializeGame.bind(this));
  }

  initializeGame() {
    // Solo inicializar el juego si aún no está creado
    if (!this.game) {
      this.game = new Phaser.Game(this.config);
      console.log("Juego inicializado después de la interacción del usuario.");
    }
  }

  render() {
    console.log("Haz clic para inicializar el juego.");
  }
}

export default App;
