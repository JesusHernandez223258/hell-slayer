import Phaser from "phaser";
import ResourceManager from "../utils/ResourceManager"; // Ajusta la ruta

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
    this.resourceManager = new ResourceManager();
    this.resources = {};
  }

  preload() {
    // Pre-cargar las imágenes, fuentes, y sonidos usando el gestor de recursos
    const imageUrls = [
      "/assets/img/enemies/dummy1.png",
      "/assets/img/enemies/dummy2.png",
      "/assets/img/enemies/spritesAssets.png",
      "/assets/img/hud/hud_bg.png",
      "/assets/img/hud/boton.png",
      "/assets/img/hud/hero-face.png",
      "/assets/img/scenes/doom.webp",
      "/assets/img/scenes/evilzone_scns.png",
      "/assets/img/weapons/weapons.png",
    ];

    const fontUrls = [
      "/assets/fonts/big-numbers.png",
      "/assets/fonts/doom.woff",
      "/assets/fonts/doom.woff2",
      "/assets/fonts/entercommand.woff",
      "/assets/fonts/entercommand.woff2",
    ];

    const soundUrls = [
      "/assets/sounds/SND_Inteface/Confirm_tones/style3/confirm_style_3_001.wav",
      "/assets/sounds/SND_Pistol/SND_Pistol.wav",
      "/assets/sounds/SND_Songtrack/track1.mp3",
      "/assets/sounds/SND_Songtrack/track2.mp3",
      "/assets/sounds/SND_Songtrack/track3.mp3",
    ];

    // Pre-cargar imágenes, fuentes y sonidos
    this.resourceManager
      .preload([...imageUrls, ...fontUrls, ...soundUrls])
      .then(() => {
        console.log("Todos los recursos han sido cargados");
        this.scene.start("GameScene"); // Inicia la siguiente escena cuando los recursos se han cargado
      })
      .catch((error) => {
        console.error("Error al cargar los recursos:", error);
      });
  }

  create() {
    // Verificar si el contexto de sonido está suspendido
    document.addEventListener("click", () => {
      if (this.sound.context.state === "suspended") {
        this.sound.context.resume().then(() => {
          console.log("Contexto de sonido reanudado tras el clic.");
        });
      }
    });
  }
}
