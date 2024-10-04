import "./src/components/BitmapFont.js";
import "./src/components/DoomHero.js";
import "./src/components/DoomEnemy.js";

// Inicializa tu juego Phaser
import App from "./src/app";

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = document.getElementById("app");
  const app = new App(appContainer);
  app.render();
});
