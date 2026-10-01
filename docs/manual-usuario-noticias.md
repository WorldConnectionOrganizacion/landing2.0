# Manual de usuario — Panel de Noticias

Guía completa para cargar, editar y borrar noticias en el sitio de World Connection.

## Índice

1. [Qué es y cómo funciona](#1-qué-es-y-cómo-funciona)
2. [Cómo ingresar al panel](#2-cómo-ingresar-al-panel)
3. [El listado de noticias](#3-el-listado-de-noticias)
4. [Crear una noticia paso a paso](#4-crear-una-noticia-paso-a-paso)
5. [Los campos de la noticia](#5-los-campos-de-la-noticia)
   - [Ocultar partes de una noticia](#ocultar-partes-de-una-noticia)
6. [El contenido: bloques de texto, imagen y video](#6-el-contenido-bloques-de-texto-imagen-y-video)
7. [Guía de imágenes](#7-guía-de-imágenes)
8. [Guía de videos](#8-guía-de-videos)
9. [Publicar, ocultar y fechas](#9-publicar-ocultar-y-fechas)
10. [Editar y borrar noticias](#10-editar-y-borrar-noticias)
11. [Limpieza de imágenes sin usar](#11-limpieza-de-imágenes-sin-usar)
12. [Dónde se ven las noticias en el sitio](#12-dónde-se-ven-las-noticias-en-el-sitio)
13. [Buenas prácticas de redacción](#13-buenas-prácticas-de-redacción)
    - [Cómo se ve en Google y en redes](#cómo-se-ve-en-google-y-en-redes)
14. [Problemas frecuentes](#14-problemas-frecuentes)
15. [Límites y cosas que el panel no hace](#15-límites-y-cosas-que-el-panel-no-hace)
16. [Para quien administra el sistema](#16-para-quien-administra-el-sistema)
17. [Resumen rápido](#17-resumen-rápido)

---

## 1. Qué es y cómo funciona

El sitio tiene una sección **Noticias** con tres partes:

- **Carrusel en la página de inicio:** muestra las 6 noticias más recientes, moviéndose solo despacio.
- **Página `/noticias`:** listado completo, de 9 noticias por página.
- **Página de cada noticia:** una plantilla fija con etiqueta, título, fecha, portada, extracto y el contenido que cargues.

El diseño es siempre el mismo. Vos solo cargás el contenido, igual que en WordPress: no hace falta tocar código ni diseñar nada. Si una noticia no necesita alguna parte (por ejemplo la portada), la podés **ocultar solo en esa noticia** y el diseño se acomoda solo (ver [Ocultar partes de una noticia](#ocultar-partes-de-una-noticia)).

Cada noticia se compone de:

| Parte | Dónde aparece |
|---|---|
| Título, categoría, fecha | Tarjetas y página de la noticia |
| Extracto | Tarjetas y debajo de la portada en la noticia |
| Imagen de portada | Tarjetas y encabezado de la noticia |
| Bloques (texto, imagen, video) | Cuerpo de la noticia, en el orden que elijas |

Todas las partes, salvo el título, se pueden ocultar noticia por noticia.

---

## 2. Cómo ingresar al panel

1. Abrí la dirección del panel: **`https://TU-SITIO/paginas-admin`** (reemplazá `TU-SITIO` por el dominio real de la web).
2. Escribí el **usuario** y la **contraseña** que te dio quien administra el sistema.
3. Tocá **Ingresar**.

Datos a tener en cuenta:

- **La dirección es interna.** No hay ningún link al panel desde el sitio público. No la compartas fuera del equipo.
- **Es un único usuario compartido.** Todo el equipo usa las mismas credenciales.
- **La sesión dura 8 horas.** Después el sistema te pide ingresar de nuevo. Si te vence mientras editabas, volvés a la pantalla de login y **lo que no guardaste se pierde**. En noticias largas, guardá cada tanto.
- **Protección contra intentos fallidos:** después de 5 intentos con datos incorrectos desde la misma conexión, se bloquea el acceso durante 15 minutos.
- Para cerrar sesión, tocá **Salir** arriba a la derecha. Hacelo siempre si usás una computadora compartida.

---

## 3. El listado de noticias

Al ingresar ves todas las noticias, publicadas y borradores, ordenadas de la más reciente a la más antigua.

| Columna | Qué muestra |
|---|---|
| Título | Nombre de la noticia |
| Categoría | Por ejemplo "Noticias" o "Comunicados de prensa" |
| Fecha | Fecha de publicación |
| Estado | **Publicada** (visible en la web) o **Borrador** (oculta) |

Acciones de cada fila:

- **Ver:** abre la noticia como la ve el público, en una pestaña nueva. Solo aparece en noticias publicadas.
- **Editar:** abre el editor.
- **Borrar:** elimina la noticia definitivamente (pide confirmación).

Botones de arriba:

- **+ Nueva noticia:** abre el editor en blanco.
- **Limpiar imágenes sin usar:** ver [sección 11](#11-limpieza-de-imágenes-sin-usar).

---

## 4. Crear una noticia paso a paso

1. En el listado, tocá **+ Nueva noticia**.
2. Escribí el **título** (obligatorio).
3. Elegí o escribí la **categoría**.
4. Revisá la **fecha de publicación** (por defecto es ahora).
5. Escribí un **extracto** corto.
6. Subí la **imagen de portada**.
7. Si alguna parte no hace falta en esta noticia (categoría, fecha, extracto o portada), apagá el interruptor que está al lado de ese campo (ver [Ocultar partes de una noticia](#ocultar-partes-de-una-noticia)).
8. En **Contenido**, agregá los bloques que necesites con **+ Texto**, **+ Imagen** y **+ Video**, y ordenalos.
9. Marcá **Publicada** si querés que se vea en la web ya mismo. Si no, queda como borrador.
10. Tocá **Guardar**.

Al guardar por primera vez, el sistema te lleva a la pantalla de edición de esa noticia y a partir de ahí cada **Guardar** actualiza la misma noticia. Verás el aviso **Guardado ✓**.

Para volver al listado, tocá **← Volver**. Ojo: si volvés sin guardar, se pierden los cambios.

> **Importante:** no existe una vista previa de borradores. Un borrador no se puede ver en el sitio. Si querés ver cómo queda, publicala, mirala con **Ver**, y si hace falta corregila o pasala a borrador.

---

## 5. Los campos de la noticia

### Título (obligatorio)
- Hasta 200 caracteres. Recomendado: **entre 40 y 90**, así se lee completo en las tarjetas.
- Es lo que más se ve. Que sea claro y describa la novedad.

### Categoría
- Es la etiqueta que aparece arriba de cada tarjeta y de la noticia (por ejemplo **NOTICIAS**).
- Debajo del campo hay dos botones de atajo, **Noticias** y **Comunicados de prensa**: tocá uno para completarlo. También podés escribir otra categoría (hasta 40 caracteres).
- Si la dejás vacía, se usa "Noticias".
- **Consistencia:** escribí siempre igual el nombre ("Eventos", no "eventos" o "Evento"), porque cada variante se muestra como una etiqueta distinta.

### Fecha de publicación
- Es la fecha que se ve en la noticia y la que **define el orden** (la más reciente va primera).
- Podés poner una fecha pasada para cargar una noticia antigua.
- Ver [sección 9](#9-publicar-ocultar-y-fechas) sobre fechas futuras.

### Extracto
- Resumen breve, hasta 500 caracteres. Recomendado: **entre 100 y 160**.
- En las tarjetas se muestran solo **3 líneas**; lo que exceda se corta con "…".
- En la página de la noticia aparece debajo de la portada, destacado, como introducción.
- Es opcional, pero conviene completarlo: sin extracto la tarjeta queda sin descripción. Si no lo querés en una noticia, apagá su interruptor.

### Slug (URL)
- Es la parte final de la dirección de la noticia: `/noticias/**mi-noticia**`.
- **En noticias nuevas, dejalo vacío:** se genera solo a partir del título, sin tildes ni caracteres raros (por ejemplo "Ñandú" pasa a `nandu`).
- Si escribís uno propio, se convierte a minúsculas, sin acentos y con guiones.
- Debe ser único. Si ya existe otra noticia con ese slug, verás el error **"Ya existe una noticia con ese slug"**; cambialo.
- **No lo cambies en una noticia ya publicada** salvo necesidad: el link anterior dejaría de funcionar (por ejemplo, en redes o mails ya enviados).

### Imagen de portada
- Ver [sección 7](#7-guía-de-imágenes).

### Ocultar partes de una noticia

No todas las noticias necesitan todo. Al lado de **Categoría**, **Fecha de publicación**, **Extracto** e **Imagen de portada** hay un **interruptor**:

- **Se muestra** (azul): la parte aparece en la web.
- **Oculto** (gris): esa parte **no se muestra en esa noticia**, y el campo queda atenuado y bloqueado.

Cómo funciona:

- **Afecta solo a esa noticia.** Las demás no cambian.
- **Se aplica en todos lados:** en la tarjeta del carrusel, en el listado `/noticias` y en la página de la noticia.
- **El diseño se reacomoda solo, sin huecos.** Por ejemplo, sin portada la tarjeta y la página arrancan directo con el título; sin extracto la tarjeta se acorta; sin categoría o sin fecha desaparece esa línea.
- **No se pierde lo cargado.** Si lo volvés a encender y guardás, todo reaparece tal como estaba. Ideal si dudás.
- **Recordá guardar:** el cambio se aplica al tocar **Guardar**.
- Si ocultás la **fecha**, no se muestra pero **sigue ordenando** las noticias (la más reciente va primero).
- El **título** y el **slug** no se pueden ocultar.
- Una portada o imagen oculta **sigue almacenada** y cuenta como "en uso": la limpieza de imágenes no la borra.

Ejemplos de uso:

| Situación | Qué apagar |
|---|---|
| Noticia sin foto disponible | Imagen de portada |
| Aviso corto que no necesita resumen | Extracto |
| Comunicado atemporal (sin fecha relevante) | Fecha de publicación |
| No querés clasificarla | Categoría |

> **Nota sobre tarjetas:** en el listado y en el carrusel las tarjetas de una misma fila tienen la misma altura. Una noticia con muy pocas partes visibles se verá con más espacio en blanco que sus vecinas; es lo esperado.

---

## 6. El contenido: bloques de texto, imagen y video

El cuerpo de la noticia se arma con **bloques**. Se muestran en el mismo orden en que están en el editor. Podés usar todos los que quieras (hasta 100) y mezclarlos.

Abajo de los bloques están los botones **+ Texto**, **+ Imagen** y **+ Video**, que agregan un bloque nuevo al final.

Cada bloque tiene, arriba a la derecha:

- **Interruptor Se muestra / Oculto:** oculta el bloque en la web **sin borrarlo**. El bloque queda atenuado y con borde punteado en el panel. Sirve para guardar un texto, foto o video "en pausa" y volver a mostrarlo cuando quieras.
- **↑ / ↓:** subir o bajar el bloque de posición.
- **✕:** quitar el bloque definitivamente.

### Bloque de texto
- Escribí el texto tal cual.
- **Una línea en blanco separa los párrafos.** Ejemplo:

  ```
  Primer párrafo con la novedad principal.

  Segundo párrafo con más detalle.
  ```
- Los saltos de línea simples también se respetan.
- Límite: 20.000 caracteres por bloque. Para textos largos, es más cómodo usar varios bloques.
- **Es texto plano:** no hay negritas, cursivas, títulos internos ni links. Si escribís una dirección web (`https://...`), se ve como texto y no es clickeable. Podés poner emojis.

### Bloque de imagen
- Tocá **Subir imagen** y elegí un archivo (ver [sección 7](#7-guía-de-imágenes)).
- Podés agregar un **pie de imagen** (hasta 300 caracteres): aparece centrado debajo de la foto, en letra chica. Es opcional pero recomendable para describir quién o qué se ve.
- **Cambiar imagen** reemplaza la foto. **Quitar** la deja vacía, y **no se puede guardar una noticia con un bloque de imagen vacío** (verás "Imagen con URL inválida"): subí una foto o borrá el bloque con ✕.

### Bloque de video
- Pegá el **link** del video (ver [sección 8](#8-guía-de-videos)). No se suben archivos de video al panel.
- **No se puede guardar con un bloque de video vacío** (verás "Video con URL inválida"): pegá un link o borrá el bloque con ✕.
- Si el link es reconocido, el video se ve incrustado en la noticia.
- Si el link no se reconoce (por ejemplo TikTok o Facebook), verás el aviso **"Link no reconocido: se mostrará como botón 'Ver video'"**. El visitante verá un botón que abre el link en otra pestaña.

### Ejemplo de estructura recomendada

1. Texto: apertura con lo más importante (quién, qué, cuándo).
2. Imagen: foto principal del evento con pie.
3. Texto: desarrollo y detalles.
4. Video: resumen o cobertura del evento.
5. Texto: cierre y datos de contacto o próximos pasos.

---

## 7. Guía de imágenes

### Formatos y tamaño permitidos

| Regla | Valor |
|---|---|
| Formatos | **JPG, PNG, WebP, GIF** |
| Peso máximo | **5 MB** por imagen |

Cualquier otro formato (por ejemplo HEIC de iPhone, TIFF, PDF, SVG) es rechazado con el mensaje **"Formato no permitido"**. Si tu celular saca fotos en HEIC, exportalas como JPG antes de subirlas o cambiá el formato de cámara a "Más compatible".

Si superás 5 MB verás **"La imagen supera los 5 MB"**. Reducí el tamaño (ver abajo).

### Qué formato usar en cada caso

| Tipo de imagen | Formato recomendado | Por qué |
|---|---|---|
| Fotos de personas, eventos, oficina | **JPG** o **WebP** | Buena calidad con poco peso |
| Gráficos, capturas de pantalla, logos, imágenes con texto | **PNG** | Bordes y texto nítidos |
| Animaciones cortas | **GIF** | Se mueve; pesa mucho, usalo con moderación |

**WebP** da el mejor equilibrio (calidad y peso), si tu herramienta de edición lo permite.

### Tamaño recomendado (en píxeles)

| Uso | Medida recomendada | Notas |
|---|---|---|
| **Portada** | **1600 × 900 px** (proporción 16:9, horizontal) | Es lo más importante. Ver "Cómo se recorta la portada" |
| **Imagen dentro del texto** | **1200 a 1600 px de ancho** | Puede ser horizontal, vertical o cuadrada |

- **Peso ideal:** entre **150 KB y 500 KB** por imagen. Cargan más rápido, sobre todo en celulares con datos móviles. El límite de 5 MB es un tope, no un objetivo.
- **No subas fotos originales de cámara** de 8 a 20 MB: aunque las comprimas después, conviene reducirlas antes con cualquier editor o con un sitio de compresión (Squoosh, TinyPNG, etc.).

### Cómo se recorta la portada

La portada se muestra **siempre en formato horizontal 16:9**, tanto en las tarjetas del carrusel y del listado como en el encabezado de la noticia. Si tu imagen tiene otra proporción, **se recorta desde el centro**.

Por eso:

- Preferí fotos **horizontales**.
- Mantené lo importante (caras, logos, texto) **en el centro** de la imagen.
- Evitá portadas con texto pegado a los bordes: se cortan.
- Una foto vertical se recorta arriba y abajo. Puede cortar cabezas o pies.

### Cómo se muestran las imágenes dentro del texto

- Se muestran **sin recortar**, centradas, con esquinas redondeadas.
- Tienen una **altura máxima de 560 px**: una foto muy vertical se reduce para no ocupar toda la pantalla.
- Ocupan como máximo el ancho de la columna de texto.

### Consejos

- **No repitas la portada dentro del cuerpo:** la portada ya se ve arriba de todo.
- Usá imágenes reales del equipo y de eventos; se ven mejor que las genéricas.
- Escribí un **pie de imagen** cuando aporte contexto.
- Respetá derechos de autor: subí solo imágenes propias o con permiso de uso.

---

## 8. Guía de videos

### Cómo funciona

Los videos **no se suben al panel**. Se suben primero a **YouTube** o **Vimeo** (o se usa un reel de **Instagram** o una publicación de **LinkedIn** ya publicada), y en la noticia se pega el **link**. Así el sitio no se hace lento y no ocupa espacio propio.

### Plataformas compatibles

| Plataforma | Formatos de link aceptados | Resultado |
|---|---|---|
| **YouTube** | `https://www.youtube.com/watch?v=XXXX`<br>`https://youtu.be/XXXX`<br>`https://www.youtube.com/shorts/XXXX` | Video incrustado |
| **Vimeo** | `https://vimeo.com/123456789` | Video incrustado |
| **Instagram** | `https://www.instagram.com/reel/XXXX/`<br>`https://www.instagram.com/p/XXXX/`<br>`https://www.instagram.com/tv/XXXX/` | Publicación incrustada (ver más abajo) |
| **LinkedIn** | `https://www.linkedin.com/posts/...-activity-123...`<br>`https://www.linkedin.com/feed/update/urn:li:share:123...` | Publicación incrustada (ver más abajo) |
| Otras (Facebook, TikTok, Drive, etc.) | Cualquier link `https://...` | **Solo un botón "Ver video"** que abre el link en otra pestaña |

El link debe empezar con `https://`.

### Videos de Instagram

Se pueden usar links de **Reels** y de **publicaciones** de Instagram. Funcionan así:

1. En Instagram, abrí el reel o la publicación, tocá los tres puntos (**…**) o **Compartir**, y elegí **Copiar link**.
2. En la noticia, tocá **+ Video** y pegá el link. Los parámetros extra que agrega Instagram (`?igsh=...`) no molestan.
3. En la web se muestra la **tarjeta de Instagram** dentro de la noticia, centrada y en formato vertical (hasta 540 px de ancho y 700 px de alto), con el video y su descripción.

Tené en cuenta:

- La cuenta que publicó tiene que ser **pública**. Si es privada, o la publicación se borra, el visitante verá un error o un pedido de inicio de sesión.
- Instagram controla cómo se ve esa tarjeta: el diseño, los botones ("Ver en Instagram") y la descripción son suyos, no del sitio.
- Un link a un **perfil** (por ejemplo `instagram.com/worldconnection`) no se puede incrustar: hace falta el link de un reel o una publicación concreta. En ese caso se mostrará solo el botón "Ver video".
- Las **historias** (stories) no se pueden incrustar.
- Si Instagram cambia sus reglas o el visitante tiene bloqueadores de contenido, la tarjeta puede no cargar. Si el video es importante, subilo además a YouTube.

### Videos de LinkedIn

Se pueden usar publicaciones de LinkedIn que tengan un video (por ejemplo, las de la página de la empresa). Funcionan así:

1. En LinkedIn, abrí la publicación, tocá los tres puntos (**…**) y elegí **Copiar enlace de la publicación**.
2. En la noticia, tocá **+ Video** y pegá el link.
3. En la web se muestra la **tarjeta de LinkedIn** con el video, centrada, en formato vertical (hasta 504 px de ancho y 716 px de alto).

Tené en cuenta:

- La publicación tiene que ser **pública**. Si la publicó un perfil o una página con visibilidad restringida, el visitante verá un error o un pedido de inicio de sesión.
- Sirve el link **completo** de la publicación. Los links acortados (`lnkd.in/...`) y los de un perfil o una página (`linkedin.com/company/...`) **no se pueden incrustar**: en ese caso se muestra solo el botón "Ver video".
- Si el link completo no funciona, en LinkedIn podés usar los tres puntos, **Insertar esta publicación**, y copiar solo la dirección que aparece dentro del código (la que empieza con `https://www.linkedin.com/embed/feed/update/...`) para pegarla en el panel.
- LinkedIn controla el diseño de la tarjeta. Un bloqueador de contenido del visitante puede impedir que cargue.
- Los videos subidos directamente a LinkedIn **solo se pueden mostrar a través de su publicación**. No existe un link propio del archivo de video.

### Cómo cargar un video paso a paso

1. Subí el video a YouTube (o Vimeo) desde la cuenta de la empresa.
2. Configurá la **visibilidad**:
   - **Público** o **No listado**: se ve incrustado en la noticia. *No listado* es útil si no querés que aparezca en el buscador de YouTube, pero sí en la web.
   - **Privado**: **no funciona**, el visitante verá un error.
3. Copiá el link del video.
4. En la noticia, tocá **+ Video** y pegá el link.
5. Si no aparece el aviso de "Link no reconocido", está correcto.

En **Vimeo**, revisá que la configuración de privacidad permita **incrustar** el video en otros sitios.

### Formato recomendado del archivo de video

Lo que subas a YouTube o Vimeo:

| Característica | Recomendado |
|---|---|
| Formato | **MP4** |
| Códec de video | **H.264** |
| Proporción | **16:9 (horizontal)** |
| Resolución | **1920 × 1080 (Full HD)** |
| Cuadros por segundo | Los originales (24, 25, 30 o 60) |
| Audio | AAC |

- Los videos **verticales** subidos a YouTube o Vimeo (como los de celular o los Shorts) se muestran dentro de un marco horizontal 16:9, con franjas a los costados. Se ven, pero más chicos. Si es posible, grabá en horizontal. Los de **Instagram** sí se muestran en su formato vertical.
- Un video de **1 a 3 minutos** funciona mejor para noticias.

### Dónde va el video

El video aparece **donde pongas el bloque**: podés colocarlo al final, o entre dos textos. Cada bloque de video muestra **un solo video**; para más de uno, agregá más bloques.

---

## 9. Publicar, ocultar y fechas

### Publicada / Borrador
- La casilla **Publicada (visible en la web)** está en la barra de guardado, abajo de todo.
- **Marcada:** la noticia se ve en el carrusel, en el listado y con su link directo.
- **Sin marcar (borrador):** nadie del público puede verla, ni siquiera con el link. Solo se ve en el panel.
- Para **ocultar una noticia completa** sin borrarla, desmarcá la casilla y guardá. Podés volver a publicarla cuando quieras.
- No confundir con los interruptores de cada campo: esos ocultan **una parte** de la noticia (por ejemplo la portada), no la noticia entera.

### Fecha de publicación
- Define el **orden**: la más reciente va primero, en el carrusel y en el listado.
- **Fecha pasada:** sirve para cargar noticias antiguas en su lugar cronológico.
- **Fecha futura:** el sistema **no programa publicaciones**. Una noticia marcada como Publicada se ve **de inmediato**, aunque tenga fecha futura, y ocupará el primer lugar. Si querés que salga más adelante, dejala como borrador y publicala ese día.

### Qué noticias entran en el carrusel de inicio
Las **6 más recientes entre las publicadas**, según la fecha de publicación. Si publicás una noticia con fecha antigua, puede no aparecer en el carrusel (aunque sí en `/noticias`).

---

## 10. Editar y borrar noticias

### Editar
1. En el listado, tocá **Editar** en la noticia.
2. Hacé los cambios.
3. Tocá **Guardar**. Los cambios se ven en el sitio enseguida (puede hacer falta recargar la página).

Si quitás o reemplazás una imagen, la imagen anterior se **elimina automáticamente** del almacenamiento (siempre que ninguna otra noticia la esté usando).

### Borrar
1. En el listado, tocá **Borrar**.
2. Confirmá en la ventana que aparece.

**Es definitivo. No hay papelera ni forma de recuperarla.** Se eliminan la noticia y sus imágenes (si no las usa otra noticia).

Si dudás, es más seguro **pasarla a borrador** (desmarcar "Publicada"): deja de verse pero conserva todo el contenido.

> Tras borrar o cambiar una imagen, puede que unos minutos la imagen siga viéndose en el sitio por una memoria temporal (caché). Es normal y se corrige solo.

---

## 11. Limpieza de imágenes sin usar

A veces quedan imágenes subidas que ninguna noticia usa, por ejemplo si subiste una foto y cerraste el editor sin guardar.

Para eliminarlas, en el listado tocá **Limpiar imágenes sin usar**:

1. El sistema cuenta cuántas hay. Si no hay, lo indica.
2. Si hay, te pide confirmación con la cantidad.
3. Al aceptar, las borra definitivamente.

Reglas de seguridad:

- Solo borra imágenes **que ninguna noticia usa**. Cuentan como usadas las de noticias publicadas y borradores, y también las de portadas o bloques ocultos con el interruptor.
- Solo borra las que tienen **más de 24 horas**. Así no elimina una foto que otra persona acaba de subir en un editor abierto.

No es necesario hacerlo seguido; con una vez al mes alcanza.

---

## 12. Dónde se ven las noticias en el sitio

### Carrusel de la página de inicio
- Aparece bajo el título "Mantenete al día con World Connection", cerca del final de la página.
- Muestra las **6 noticias más recientes**, con etiqueta, imagen, fecha, título, extracto y "Más información →" (salvo las partes que hayas ocultado en cada noticia).
- **Se mueve solo, lento y de forma continua**, en bucle infinito.
- Se **detiene** cuando el visitante pasa el mouse por encima o lo toca.
- Las **flechas** ‹ › permiten avanzar o retroceder una tarjeta.
- El botón **Entérate de todo** lleva a la página `/noticias`.
- **Si no hay ninguna noticia publicada, la sección completa se oculta** de la página de inicio, y también el link **Noticias** del menú superior y del pie de página. Reaparecen solos cuando publiques la primera.
- Si el visitante tiene activada la opción de "reducir movimiento" en su dispositivo, el carrusel no se mueve solo, pero sí con las flechas.

### Página `/noticias`
- Muestra todas las noticias publicadas, **9 por página**, con paginación (Anterior, Siguiente y números).
- El número de página va en la dirección (`/noticias?pagina=2`), así se puede compartir.
- También hay un link **Noticias** en el menú principal y en el pie de página (solo se muestra si hay al menos una noticia publicada). Si alguien entra a `/noticias` directamente sin noticias, ve el mensaje "Todavía no hay noticias publicadas".

### Página de cada noticia
De arriba hacia abajo: link "← Todas las noticias", etiqueta de categoría, título, fecha, portada, extracto y los bloques en orden. Las partes y los bloques ocultos no se muestran y el resto se acomoda sin dejar huecos.

---

## 13. Buenas prácticas de redacción

- **Lo más importante primero:** en el primer párrafo respondé qué pasó, quién, cuándo y dónde.
- **Títulos claros:** que se entienda la novedad sin abrir la noticia. Evitá títulos genéricos como "Novedades".
- **Párrafos cortos:** de 2 a 4 líneas. Se lee mejor en celular, donde entra la mayoría del público.
- **Un extracto que no repita el título:** que aporte un dato más.
- **Revisá ortografía** antes de publicar.
- **Fechas y datos exactos:** nombres propios, cargos, cifras.
- **Tono:** cercano y profesional, como en el resto del sitio (voseo, claro y directo).
- **Imágenes:** una buena portada y, si corresponde, una o dos fotos dentro del texto. No hace falta llenar de imágenes.
- **Categorías consistentes:** usá pocas y siempre las mismas.

### Cómo se ve en Google y en redes

Cada noticia genera sola su ficha para buscadores y para las vistas previas de WhatsApp, Facebook, LinkedIn y similares. No hay que configurar nada, pero lo que escribas la define:

| Qué ves | De dónde sale |
|---|---|
| Título azul en Google y título de la vista previa | El **título** de la noticia, más "| World Connection". Conviene que tenga **menos de 60 caracteres** para que no se corte |
| Descripción bajo el título | El **extracto**; si está vacío, las primeras palabras del **primer bloque de texto**. Google muestra unos **150 a 160 caracteres** |
| Imagen de la vista previa en redes | La **portada**. Si la portada está oculta o no hay, se usa el logo de World Connection |
| Fecha | La **fecha de publicación** |

Por eso:

- **Completá siempre el extracto** con una frase clara que invite a leer; es lo que más pesa en el clic.
- **Poné una portada horizontal** (16:9): es la que aparece al compartir el link.
- **Ocultar el extracto con el interruptor solo lo oculta a los visitantes en la web:** Google lo sigue usando como descripción. Si no querés que figure, dejá el campo vacío. Los bloques de texto ocultos, en cambio, nunca se usan.
- Las noticias **borrador** no aparecen en Google. Al publicarlas, se agregan solas al mapa del sitio.
- Google puede tardar **desde unos días hasta un par de semanas** en mostrar una noticia nueva. Para acelerarlo, quien administra puede pedir la indexación en Search Console.

### Lista de control antes de publicar

- [ ] El título es claro y no está cortado.
- [ ] La categoría está bien escrita.
- [ ] La fecha es correcta.
- [ ] Hay un extracto de 100 a 160 caracteres (es la descripción en Google).
- [ ] El título tiene menos de 60 caracteres.
- [ ] La portada es horizontal y lo importante está al centro.
- [ ] Las imágenes pesan menos de 500 KB (idealmente).
- [ ] Los videos son públicos o no listados, no privados.
- [ ] El texto no tiene errores.
- [ ] La casilla **Publicada** está marcada.
- [ ] Después de guardar, revisé con **Ver** cómo quedó.

---

## 14. Problemas frecuentes

| Mensaje o síntoma | Causa | Qué hacer |
|---|---|---|
| "Usuario o contraseña incorrectos" | Datos mal escritos | Revisá mayúsculas y espacios. Pedí las credenciales a quien administra el sistema |
| "Demasiados intentos. Probá más tarde." | 5 intentos fallidos seguidos | Esperá 15 minutos |
| Vuelve al login mientras editaba | La sesión venció (8 horas) o se cerró | Ingresá de nuevo. Lo no guardado se perdió |
| "Formato no permitido (JPG, PNG, WebP o GIF)" | El archivo es de otro tipo (HEIC, PDF, SVG…) | Convertilo a JPG o PNG |
| "La imagen supera los 5 MB" | Archivo demasiado pesado | Reducí su tamaño o calidad |
| "No se pudo subir la imagen" | Falla de conexión o problema del servicio | Reintentá; si persiste, avisá a quien administra el sistema |
| "Ya existe una noticia con ese slug" | Otro contenido tiene la misma dirección | Cambiá el slug o el título |
| "El título es obligatorio" | Título vacío | Completalo |
| "Imagen con URL inválida" al guardar | Hay un bloque de imagen sin foto | Subí la foto o borrá el bloque con ✕ |
| "Video con URL inválida" al guardar | Hay un bloque de video sin link, o el link no empieza con `https://` | Pegá un link válido o borrá el bloque |
| Apagué un campo y en la web se sigue viendo | No se guardó | Tocá **Guardar** y recargá la página con `Ctrl + F5` |
| Un campo aparece gris y no puedo escribir | Su interruptor está en "Oculto" | Encendelo ("Se muestra") para editarlo |
| Una tarjeta se ve con mucho espacio en blanco | Tiene casi todo oculto; las tarjetas de una fila igualan su altura | Es lo esperado; mostrá más partes o aceptalo |
| "Link no reconocido" en un video | El link no es de YouTube, Vimeo, Instagram ni LinkedIn, es el de un perfil o página, o es un link acortado (`lnkd.in`) | Usá el link de un video o reel concreto, o aceptá que se muestre como botón |
| El reel de Instagram pide iniciar sesión o da error | La cuenta es privada o la publicación se borró | Verificá que la cuenta sea pública, o subí el video a YouTube |
| El video incrustado muestra error | El video es privado o no permite incrustarse | Cambiá su visibilidad a Público o No listado y revisá que permita incrustar |
| Guardé pero en el sitio no aparece | Está como borrador, o el navegador guarda una copia vieja | Marcá **Publicada**. Recargá con `Ctrl + F5` |
| La noticia está publicada pero no sale en el carrusel | No está entre las 6 más recientes por fecha | Se ve igual en `/noticias`. Revisá la fecha de publicación |
| Una imagen borrada se sigue viendo | Memoria temporal (caché) | Esperá unos minutos |
| La portada se ve cortada | Proporción distinta de 16:9 | Subí una versión horizontal 16:9 con lo importante en el centro |
| Desapareció la sección Noticias de inicio y el link "Noticias" del menú | No hay noticias publicadas | Publicá al menos una: vuelven a aparecer solas |

---

## 15. Límites y cosas que el panel no hace

- **Solo gestiona noticias.** Los demás textos del sitio (Inicio, Nosotros, Servicios, etc.) no se editan desde el panel.
- **Un único usuario.** No hay cuentas individuales ni registro de quién hizo cada cambio.
- **No hay vista previa** de borradores.
- **No hay papelera ni deshacer.** Borrar es definitivo.
- **No hay programación de publicaciones** (fecha y hora futura automática).
- **Solo se pueden ocultar** categoría, fecha, extracto, portada y bloques. El título no.
- **El texto es plano:** sin negritas, títulos internos ni links clickeables.
- **No se suben archivos de video**, solo links de YouTube, Vimeo, Instagram o LinkedIn (otras plataformas se muestran como botón).
- **No hay comentarios de los visitantes** en las noticias.
- **Límites técnicos:** título 200 caracteres, extracto 500, categoría 40, pie de imagen 300, texto 20.000 por bloque, hasta 100 bloques por noticia, imágenes de hasta 5 MB.

---

## 16. Para quien administra el sistema

Esta sección es técnica y no la necesita el equipo que carga noticias.

### Datos de acceso
Se definen como variables de entorno (en `.env.local` para desarrollo local y en **Vercel, Settings, Environment Variables** para producción):

| Variable | Uso |
|---|---|
| `ADMIN_USER` | Usuario del panel |
| `ADMIN_PASSWORD` | Contraseña del panel (usar una larga y única) |
| `ADMIN_SESSION_SECRET` | Clave para firmar las sesiones (mínimo 32 caracteres). Generar con `openssl rand -hex 32` |
| `VITE_SUPABASE_URL` | URL del proyecto de Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Clave pública de Supabase (`sb_publishable_...`) |
| `SUPABASE_SECRET_KEY` | Clave secreta de Supabase (`sb_secret_...`). **Nunca** debe compartirse ni subirse al repositorio |
| `VITE_SITE_URL` | **Dirección pública del sitio** sin barra final (ej. `https://wconnectionarg.com`). La usan el `canonical`, el mapa del sitio y las vistas previas en redes. Debe coincidir con el dominio principal |
| `VITE_WEB3FORMS_KEY` | (Opcional, no es de noticias) Clave del formulario de contacto |

Reglas:

- Las variables que empiezan con `VITE_` quedan visibles en el navegador y deben estar cargadas **antes de compilar** el sitio. El resto solo las lee el servidor.
- Para **cambiar la contraseña**: modificar `ADMIN_PASSWORD` y redeployar.
- Para **cerrar todas las sesiones abiertas**: cambiar `ADMIN_SESSION_SECRET` y redeployar.
- Tras cambiar variables en Vercel hay que hacer un nuevo deploy para que apliquen.

### Base de datos y almacenamiento (Supabase)
- El archivo `supabase/schema.sql` crea la tabla `posts`, las reglas de seguridad, el bucket `news-media` y la columna `hidden_fields`. Se ejecuta una sola vez en **SQL Editor**, por bloques si el editor falla.
- Además hay que aplicar los límites del bucket (5 MB y solo imágenes), incluidos al final de ese archivo.
- **Base ya creada antes de los interruptores de visibilidad:** hay que correr una vez `supabase/migrations-hidden-fields.sql` (agrega la columna `hidden_fields`). Sin ella, el sitio no puede leer las noticias y muestra error.
- La lectura pública solo ve noticias con `published = true`. Toda escritura pasa por el servidor con la clave secreta, previa autenticación.

### Seguridad
- Cookie de sesión firmada, `HttpOnly`, `SameSite=Strict`, y `Secure` en producción. Dura 8 horas.
- Límite de 5 intentos fallidos por conexión cada 15 minutos. En Vercel cada instancia lleva su propio contador, por eso conviene una contraseña larga.
- El panel lleva `noindex` (etiqueta y cabecera `X-Robots-Tag`), así que los buscadores no lo indexan.
- Todas las operaciones de escritura (`/api/posts`, `/api/upload`, `/api/cleanup`) exigen la sesión de administrador y validan el contenido en el servidor.
- Las funciones del panel están en la carpeta `api/`, y `vercel.json` redirige el resto de las rutas a la aplicación.

### SEO y posicionamiento

- El sitio genera solo `robots.txt` y `sitemap.xml` (con todas las noticias publicadas). El mapa está en `/sitemap.xml`.
- La home y `/noticias` se **pre-renderizan** al compilar: llegan a los buscadores con el contenido escrito. Cada noticia se sirve con su título, descripción, imagen y datos estructurados reales (función `api/news-meta`), y devuelve **404 real** si no existe.
- Las rutas inexistentes responden con estado 404 y `noindex`.
- Pasos fuera del código, necesarios para aparecer en Google:
  1. **Dominio principal:** que `wconnectionarg.com` sirva el sitio y que `world-connection.vercel.app` redirija a él (en Vercel, Settings, Domains). Después actualizar `VITE_SITE_URL` y redesplegar.
  2. **Google Search Console:** verificar el dominio, enviar `https://TU-DOMINIO/sitemap.xml` y pedir la indexación de la página de inicio.
  3. **Google Business Profile:** crear la ficha de la oficina (Av. San Martín 1425, Mendoza) con los mismos datos que muestra el sitio.
  4. Incluir el link del sitio en los perfiles de LinkedIn e Instagram.

### Ejecutar en local
```bash
npm install
npm run dev      # http://localhost:5173  (panel en /paginas-admin)
npm run build    # compilación de producción
```
Para exponerlo en la red local: `npm run dev -- --host`.

---

## 17. Resumen rápido

| Quiero… | Hago… |
|---|---|
| Entrar | `/paginas-admin` con usuario y contraseña |
| Crear una noticia | **+ Nueva noticia**, completar, marcar **Publicada**, **Guardar** |
| Agregar texto, foto o video | **+ Texto**, **+ Imagen**, **+ Video** al final del editor |
| Reordenar contenido | Botones **↑ ↓** de cada bloque |
| Ocultar una noticia entera sin borrarla | Desmarcar **Publicada** y **Guardar** |
| No mostrar la portada, el extracto, la fecha o la categoría | Apagar el interruptor al lado del campo y **Guardar** |
| Dejar un bloque en pausa sin borrarlo | Apagar el interruptor del bloque y **Guardar** |
| Corregir una noticia | **Editar**, cambiar, **Guardar** |
| Eliminar una noticia | **Borrar** y confirmar (definitivo) |
| Liberar imágenes sin uso | **Limpiar imágenes sin usar** |
| Ver cómo quedó | **Ver** en el listado |

**Cifras clave**

- Imágenes: **JPG, PNG, WebP o GIF, hasta 5 MB**. Portada **1600 × 900 px** horizontal. Ideal menos de **500 KB**.
- Videos: **link de YouTube, Vimeo, Instagram o LinkedIn (publicación pública)**, video público o no listado, **MP4 H.264 1080p 16:9**.
- Se pueden ocultar por noticia: **categoría, fecha, extracto, portada y cada bloque**. El título no.
- Carrusel de inicio: **6 noticias más recientes**. Listado: **9 por página**.
- Sesión: **8 horas**. Bloqueo por intentos fallidos: **15 minutos**.
