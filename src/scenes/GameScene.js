import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");

    // Lista de pistas de música y un índice para llevar el control
    this.musicTracks = ["music1", "music2", "music3"];
    this.currentTrackIndex = 0;
  }

  preload() {
    // Asegúrate de que las rutas sean correctas
    this.load.image("background", "/assets/img/scenes/evilzone_scns.png");
    this.load.audio("music1", "/assets/sounds/SND_Songtrack/track1.mp3");
    this.load.audio("music2", "/assets/sounds/SND_Songtrack/track2.mp3");
    this.load.audio("music3", "/assets/sounds/SND_Songtrack/track3.mp3");

    // Listener para reanudar el contexto de audio tras el primer clic
    document.addEventListener("click", () => {
      if (this.sound.context.state === "suspended") {
        this.sound.context.resume().then(() => {
          console.log("AudioContext reanudado tras el clic.");
        });
      }
    });
  }

  create() {
    // Obtener el tamaño del canvas
    const { width, height } = this.sys.game.config;

    // Añadir el fondo del escenario y ajustarlo al tamaño del canvas
    const background = this.add.image(0, 0, "background").setOrigin(0, 0);
    background.displayWidth = width;
    background.displayHeight = height;

    // Barajar las pistas de música al inicio
    this.shuffleMusicTracks();

    // Reproducir la primera pista
    this.playNextTrack();
  }

  shuffleMusicTracks() {
    // Algoritmo simple para barajar la lista de pistas
    for (let i = this.musicTracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.musicTracks[i], this.musicTracks[j]] = [
        this.musicTracks[j],
        this.musicTracks[i],
      ];
    }
  }

  playNextTrack() {
    // Obtener la pista actual
    const nextTrackKey = this.musicTracks[this.currentTrackIndex];

    // Reproducir la música
    const music = this.sound.add(nextTrackKey);
    music.play();

    // Al terminar, pasar a la siguiente pista y reproducirla
    music.once("complete", () => {
      // Avanzar al siguiente track
      this.currentTrackIndex++;

      // Si llegamos al final de la lista, reiniciamos y barajamos de nuevo
      if (this.currentTrackIndex >= this.musicTracks.length) {
        this.currentTrackIndex = 0;
        this.shuffleMusicTracks();
      }

      // Reproducir la siguiente pista
      this.playNextTrack();
    });
  }
}
