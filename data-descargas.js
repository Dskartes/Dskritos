// Metadatos "bonitos" para archivos conocidos de la carpeta /descargas.
// Si un archivo nuevo no aparece aquí, la página igual lo muestra,
// pero con título genérico (su nombre de archivo) en la sección "Otros documentos".
// Para agregarle una descripción propia, solo añade una entrada más abajo
// usando el nombre EXACTO del archivo como aparece en GitHub.

window.DESCARGAS_META = {
  "ePSD Akkadian Index.pdf": {
    titulo: "Índice acádico",
    descripcion: "Listado de palabras y formas acadias del ePSD2, con referencias cruzadas a las entradas sumerias correspondientes.",
    glifo: "𒀝",
    seccion: "Índices ePSD2"
  },
  "ePSD Emesal Index.pdf": {
    titulo: "Índice emesal",
    descripcion: "Vocabulario del emesal, el registro dialectal usado en lamentaciones y en el habla de ciertos personajes de los textos literarios.",
    glifo: "𒂊",
    seccion: "Índices ePSD2"
  },
  "ePSD_Indice_Emesal_ES (1).pdf": {
    titulo: "Índice emesal (traducido al español)",
    descripcion: "Versión en español del índice emesal, con las glosas traducidas del inglés original del ePSD2.",
    glifo: "𒂊",
    seccion: "Índices ePSD2"
  },
  "ePSD English index.pdf": {
    titulo: "Índice en inglés",
    descripcion: "Índice de glosas en inglés del ePSD2, útil para buscar una palabra sumeria a partir de su significado.",
    glifo: "𒂍",
    seccion: "Índices ePSD2"
  },
  "ePSD List of Suppletive Verbs.pdf": {
    titulo: "Verbos supletivos",
    descripcion: "Lista de verbos sumerios con raíces supletivas — formas distintas según número o aspecto (ej. singular / plural).",
    glifo: "𒀸",
    seccion: "Índices ePSD2"
  },
  "ePSD Sumerian citation form index.pdf": {
    titulo: "Formas de cita",
    descripcion: "Índice de las formas de cita (lemas) usadas por el ePSD2 para normalizar la entrada de cada palabra sumeria.",
    glifo: "𒁇",
    seccion: "Índices ePSD2"
  },
  "ePSD Sumerian sign name index.pdf": {
    titulo: "Nombres de signos",
    descripcion: "Catálogo de nombres de signos cuneiformes sumerios, la base de referencia para identificar cada signo por su transliteración estándar.",
    glifo: "𒐕",
    seccion: "Índices ePSD2"
  },
  "ePSD Sumerian transliteracion.pdf": {
    titulo: "Transliteración sumeria",
    descripcion: "Índice general de transliteración del corpus sumerio del ePSD2 — el listado más extenso del signario.",
    glifo: "𒌷",
    seccion: "Índices ePSD2"
  },
  "Refranes_sumerios.pdf": {
    titulo: "Refranes sumerios",
    descripcion: "Recopilación de refranes y proverbios sumerios, con su transliteración y traducción al español.",
    glifo: "𒌓",
    seccion: "Textos"
  },
  "ogsl_signos_valores_foneticos.xlsx": {
    titulo: "OGSL — valores fonéticos",
    descripcion: "Catálogo Oracc Global Sign List: 2.695 signos con sus valores fonéticos documentados y concordancias con listas de referencia (MZL, HZL, ABZL, ASY, SYA).",
    glifo: "𒑐",
    seccion: "Catálogos de signos"
  },
  "valores_foneticos_homofonos.xlsx": {
    titulo: "Valores fonéticos y homófonos",
    descripcion: "Los 9.065 valores fonéticos del combinador, agrupados por sílaba base (ej. sa, sa2, sa3...) junto con su signo correspondiente.",
    glifo: "𒑐",
    seccion: "Catálogos de signos"
  }
};

// Orden en que se muestran las secciones (las que no estén aquí van al final)
window.DESCARGAS_ORDEN_SECCIONES = ["Índices ePSD2", "Textos", "Catálogos de signos", "Otros documentos"];
