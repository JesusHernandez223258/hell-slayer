class ResourceManager {
  constructor() {
    this.worker = new Worker(
      new URL("../workers/resourceWorker.js", import.meta.url)
    );
    this.callbacks = {};
    this.worker.onmessage = (e) => {
      const { url, status, resource, error, isCached } = e.data;
      if (this.callbacks[url]) {
        this.callbacks[url](status, resource, error, isCached);
        delete this.callbacks[url]; // Elimina el callback tras usarlo
      }
    };
  }

  // Carga un recurso de manera asíncrona usando el worker
  loadAsync(url) {
    return new Promise((resolve, reject) => {
      this.callbacks[url] = (status, resource, error) => {
        if (status === "loaded") {
          resolve(resource);
        } else if (status === "error") {
          reject(error);
        }
      };
      this.worker.postMessage({ type: "load", url });
    });
  }

  // Pre-carga un conjunto de recursos
  preload(urls) {
    const promises = urls.map((url) => this.loadAsync(url));
    return Promise.all(promises);
  }

  // Liberar un recurso
  unload(url) {
    this.worker.postMessage({ type: "unload", url });
  }

  // Verificar si el recurso está en caché
  isCached(url) {
    return new Promise((resolve) => {
      this.callbacks[url] = (status, _, __, isCached) => {
        if (status === "cached") {
          resolve(isCached);
        }
      };
      this.worker.postMessage({ type: "isCached", url });
    });
  }
}

// Ejemplo de uso
const resourceManager = new ResourceManager();

// Definir las rutas a los recursos basadas en la estructura de directorios
const imageUrls = [
  "public/assets/img/enemies/dummy1.png",
  "public/assets/img/enemies/dummy2.png",
  "public/assets/img/enemies/spritesAssets.png",
  "public/assets/img/hud/hud_bg.png",
  "public/assets/img/hud/boton.png",
  "public/assets/img/hud/hero-face.png",
  "public/assets/img/scenes/doom.webp",
  "public/assets/img/scenes/evilzone_scns.png",
  "public/assets/img/weapons/weapons.png",
];

const fontUrls = [
  "public/assets/fonts/big-numbers.png",
  "public/assets/fonts/doom.woff",
  "public/assets/fonts/doom.woff2",
  "public/assets/fonts/entercommand.woff",
  "public/assets/fonts/entercommand.woff2",
];

const soundUrls = [
  "public/assets/sounds/SND_Inteface/Confirm_tones/style3/confirm_style_3_001.wav",
  "public/assets/sounds/SND_Pistol/SND_Pistol.wav",
  "public/assets/sounds/SND_Pistol/SND_Pistol.yy",
  "public/assets/sounds/SND_Songtrack/track1.mp3",
  "public/assets/sounds/SND_Songtrack/track2.mp3",
  "public/assets/sounds/SND_Songtrack/track3.mp3",
];

// Pre-cargar imágenes
resourceManager.preload(imageUrls).then(() => {
  console.log("Todas las imágenes han sido cargadas");
});

// Pre-cargar fuentes
resourceManager.preload(fontUrls).then(() => {
  console.log("Todas las fuentes han sido cargadas");
});

// Pre-cargar sonidos
resourceManager.preload(soundUrls).then(() => {
  console.log("Todos los sonidos han sido cargados");
});

// Cargar un recurso específico cuando lo necesites
resourceManager.loadAsync("public/enemies/imp.png").then((resource) => {
  // Usa el recurso, por ejemplo, dibujarlo en el canvas
});

// Liberar un recurso que ya no necesitas
resourceManager.unload("public/enemies/imp.png");

// Comprobar si un recurso está en caché
resourceManager.isCached("public/enemies/imp.png").then((isCached) => {
  console.log("Está en caché:", isCached);
});

export default ResourceManager;
