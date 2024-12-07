// src/workers/enemyWorker.js
self.onmessage = function (e) {
  const { action, data } = e.data;

  if (action === "updatePosition") {
    const newPosition = data.position + data.speed;

    // Enviar nueva posición al hilo principal
    self.postMessage({ id: data.id, position: newPosition });
  }
};
