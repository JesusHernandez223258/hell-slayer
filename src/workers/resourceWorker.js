// resourceWorker.js

self.resources = {};

self.onmessage = async function (e) {
  const { type, url } = e.data;

  switch (type) {
    case "load":
      // Cargar el recurso asíncronamente
      if (!self.resources[url]) {
        try {
          const response = await fetch(url);
          const resource = await response.blob(); // Cargar como Blob, ajusta si necesitas otro tipo
          self.resources[url] = resource;
          self.postMessage({ url, status: "loaded", resource });
        } catch (error) {
          self.postMessage({ url, status: "error", error: error.message });
        }
      }
      break;

    case "unload":
      // Liberar el recurso
      delete self.resources[url];
      self.postMessage({ url, status: "unloaded" });
      break;

    case "isCached":
      // Verificar si el recurso está en caché
      const isCached = self.resources.hasOwnProperty(url);
      self.postMessage({ url, status: "cached", isCached });
      break;
  }
};
