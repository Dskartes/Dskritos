(function () {
  var REPO_OWNER = "dskartes";
  var REPO_NAME = "Dskritos";
  var CARPETA = "descargas";
  var API_URL = "https://api.github.com/repos/" + REPO_OWNER + "/" + REPO_NAME + "/contents/" + CARPETA;

  var contenedor = document.getElementById("dl-dynamic");
  var estado = document.getElementById("dl-estado");

  function formatoDe(nombre) {
    var ext = nombre.split(".").pop().toUpperCase();
    return ext;
  }

  function tamanoLegible(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function glifoPorDefecto(ext) {
    if (ext === "PDF") return "𒀝";
    if (ext === "XLSX" || ext === "XLS" || ext === "CSV") return "𒑐";
    if (ext === "DOCX" || ext === "DOC") return "𒁇";
    return "𒀭";
  }

  function crearTarjeta(archivo) {
    var meta = window.DESCARGAS_META[archivo.name] || {};
    var ext = formatoDe(archivo.name);
    var glifo = meta.glifo || glifoPorDefecto(ext);
    var titulo = meta.titulo || archivo.name.replace(/\.[^.]+$/, "");
    var descripcion = meta.descripcion || "Documento disponible para descargar.";
    var tamano = tamanoLegible(archivo.size);

    var card = document.createElement("div");
    card.className = "dl-card";
    card.innerHTML =
      '<div class="dl-card-top">' +
        '<div class="dl-glyph">' + glifo + '</div>' +
        '<div class="dl-format">' + ext + '</div>' +
      '</div>' +
      '<h3 class="dl-title"></h3>' +
      '<p class="dl-desc"></p>' +
      '<div class="dl-meta">' +
        '<span class="dl-size">' + tamano + '</span>' +
        '<a class="dl-btn" download>Descargar</a>' +
      '</div>';

    card.querySelector(".dl-title").textContent = titulo;
    card.querySelector(".dl-desc").textContent = descripcion;
    var btn = card.querySelector(".dl-btn");
    btn.href = CARPETA + "/" + encodeURIComponent(archivo.name);

    return card;
  }

  function render(archivos) {
    contenedor.innerHTML = "";
    estado.remove();

    var porSeccion = {};
    archivos.forEach(function (a) {
      var meta = window.DESCARGAS_META[a.name] || {};
      var seccion = meta.seccion || "Otros documentos";
      (porSeccion[seccion] = porSeccion[seccion] || []).push(a);
    });

    var orden = window.DESCARGAS_ORDEN_SECCIONES || [];
    var secciones = Object.keys(porSeccion).sort(function (a, b) {
      var ia = orden.indexOf(a), ib = orden.indexOf(b);
      if (ia === -1) ia = 999;
      if (ib === -1) ib = 999;
      return ia - ib;
    });

    secciones.forEach(function (nombreSeccion) {
      var h2 = document.createElement("h2");
      h2.className = "section-label";
      h2.textContent = nombreSeccion;
      contenedor.appendChild(h2);

      var grid = document.createElement("div");
      grid.className = "dl-grid";
      porSeccion[nombreSeccion]
        .sort(function (a, b) { return a.name.localeCompare(b.name); })
        .forEach(function (archivo) {
          grid.appendChild(crearTarjeta(archivo));
        });
      contenedor.appendChild(grid);
    });

    var footer = document.createElement("footer");
    footer.textContent = archivos.length + " archivos · fuentes: ePSD2 (Pennsylvania Sumerian Dictionary) y OGSL (Oracc Global Sign List, CC0)";
    contenedor.appendChild(footer);
  }

  fetch(API_URL)
    .then(function (res) {
      if (!res.ok) throw new Error("GitHub respondió " + res.status);
      return res.json();
    })
    .then(function (data) {
      var archivos = data.filter(function (item) { return item.type === "file"; });
      render(archivos);
    })
    .catch(function (err) {
      estado.innerHTML =
        '<p class="dl-note">No se pudo cargar la lista de archivos automáticamente ahorita (' + err.message + ').' +
        ' Puedes ver los archivos directo en <a href="https://github.com/' + REPO_OWNER + '/' + REPO_NAME + '/tree/main/' + CARPETA + '" target="_blank" rel="noopener">GitHub</a>.</p>';
    });
})();
