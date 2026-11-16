# Pip y Bolt: motor de animación y producción diaria

Shorts verticales en 3D (1080×1920, 30 fps) de **Pip** (pajarita rosa, curiosa) y **Bolt** (robot diminuto, pantalla oscura con ojos menta). Estética: juguete 3D suave y colorido, cielo azul, pasto verde, sombras suaves. Texto en pantalla en **inglés**, letra Fredoka gruesa con borde morado.

El calendario de qué video toca cada día está en la hoja de Claude Sheets
**https://claude.ai/artifact/XbLHWuDkgb99vs8ccad2is** (artifact id `f7bd5527-32d7-4dad-8e81-e4385d492070`), hoja `Calendario`:
A Fecha · B Hora · C Formato (🔤 Aprende / ⚡ Gag / 🎬 Episodio) · D Título · E Estado (Idea / En producción / Listo / Publicado) · F Idea · G Texto gancho en pantalla · H Tema de la semana · I Producción 3D. La hoja `Guía` explica formatos y temas.

## Puesta en marcha (cada sesión empieza desde cero)

```bash
npm i                      # three + fuente Fredoka (registry de npm está permitido)
# Chrome: /usr/bin/google-chrome · Playwright: /opt/npm-tools/node_modules (render.mjs lo encuentra solo) · ffmpeg · python3 con numpy
```

## Cómo se hace un video

1. Crear `episodes/<id>.js` (copiar la estructura de `episodes/ep2_ultima_manzana.js`). `<id>` = `AAAA-MM-DD_<formato>_<slug>`, p. ej. `2026-11-18_episodio_huevo_misterioso`.
2. `python3 tools/build.py <id>` → `<id>.html`.
3. **Revisar antes de renderizar**: `node render.mjs stills 0.5,3.2,7.8,12.0 <id>` y `tools/contact.sh A 0.5 3.2 7.8 12.0` → mirar `stills/A.jpg` con Read. Elegir los momentos con más cosas en pantalla (gancho, cada tropiezo, remate). Corregir y repetir hasta que se vea bien.
4. Crear `audio/<id>.py` (copiar `audio/ep2_ultima_manzana.py`: `from alib import *`, `theme(...)` para música, `add(sfx, t, sonido, volumen)` para efectos sincronizados con la acción, `finish()` al final).
5. `tools/make_video.sh <id> <nombre_final>.mp4` → renderiza todas las escenas en 2 procesos, sintetiza el audio, une todo en `out/final/<nombre_final>.mp4` y deja una hoja de contactos `out/final/<nombre>_sheet.jpg`. Mirarla con Read como control final.
6. `git add episodes audio core && git commit && git push` para que los próximos días puedan reutilizar escenarios y objetos.

Una escena de 6 s tarda ~1 min en renderizar por proceso. Un episodio de 30 s ≈ 4–5 min.

## Estructura de un archivo de episodio

```js
// 1) Textos en pantalla (antes del separador)
ov('TEXTO',t0,t1,y,tamaño,{color:YEL,rot:-5,x:0,shake:1});   // y = píxel superior (0–1920)
//@@SPLIT@@
// 2) Escenario, objetos, partículas y escenas
M.g.visible=false;prop.g.visible=false;gear.visible=false;   // ocultar la máquina voladora si no se usa
function s1(u){ ... }      // u = segundos desde el inicio de la escena
const SC=[[0,3.4,s1],[3.4,9.2,s2], ...];   // [inicio, fin, función] en segundos — OBLIGATORIO, al final
```

Todo es **determinista**: cada fotograma se dibuja solo a partir del tiempo (`T` global, `u` local). Nada de estado que dependa del fotograma anterior.

### API del motor (definida en `core/`)

- **Personajes**: `setPip(pip,{x,y,z,rx,ry,rz,s, sy (aplastar/estirar), look:[x,y] (-1..1), eye (tamaño ojos), pup (pupila), lid (0 abierto..1 cerrado), brow (-1 feliz..1 preocupado), browY, beak (0..1 abrir pico), wl, wr (alas 0..1), blink})`.
  `setBolt(bolt,{x,y,z,rx,ry,rz,s, sy, look:[x,y], eye:'dot'|'arc'|'ring'|'line', es (tamaño ojos), cut (0..1 párpado enojado/triste), tilt, mouth:'smile'|'frown'|'o'|'flat', al, ar (brazos 0..1 arriba), alf, arf, face (0..1 brazo izq. a la cara), ant (antena), glow (0..1 antena luminosa), hx, hy (cabeza)})`.
  Posiciones de pie habituales: Pip `x:PX (-0.95)`, Bolt `x:BX (0.95)`, `z:CZ (1.8)`. Pip mide ~1.2, Bolt ~1.1.
- **Animación**: `kf(t,[[t0,v0],[t1,v1,'io'|'out'|'in'|'back'|'el'|'bounce'|'lin']])` interpola por claves; `seg(t,a,b)` 0..1; `hop(t,t0,dur,altura)` salto; `pulse(t,t0,dur)` 0→1→0; `E.*` curvas; `lerp`, `clamp`; `spin(u,keys)` integra velocidad angular.
- **Cámara**: `camSet([x,y,z],[mirar_x,y,z],fov=38)`. Plano general del jardín: `camSet([0,3.0,14.2],[0,3.2,0])`. Primer plano de los dos: `camSet([0,1.6,8.6],[0,1.0,CZ])`.
- **Objetos**: `mesh`, `sph(mat,r,pos,escala)`, `cyl`, `std(color,{...})` (material mate), `bas(color)` (sin luz), `RoundedBoxGeometry`. `place(obj,padre)` cambia de padre (p. ej. llevar algo en la cabeza: `bolt.hat`, `pip.crown`, `bolt.ant`).
- **Escenario base**: pasto, colinas, árboles, flores, hongos, nubes que se mueven, arcoíris. Para invierno/noche/interiores: cambiar colores de materiales o tapar con objetos nuevos dentro del episodio.
- **Máquina voladora y piezas** (Ep. 1): `machine({x,y,z,rz,sy,glow})`, `balloons(i=>escala)`, `propOnMast/propFree/propHat`, `gearSlot/gearCrown/gearFree`, `seatPip/seatBolt`.
- **Partículas** (declarar fuera de las escenas, con tiempo absoluto): `burst('puff'|'spark'|'conf', t0, [x,y,z], n, {sp,up,g,life,s0,s1,color,ring,spread})`. `CONF` = colores de confeti.
- **Textos**: `ov(...)` arriba. Mantener los textos en y < 1300 y lejos del borde derecho/inferior (ahí YouTube pone botones y título).

## Reglas de calidad (revisar en cada video)

- **Gancho** visible y entendible en los primeros 2 s (sin texto de introducción largo).
- Personajes siempre dentro del cuadro y sin que el texto les tape la cara.
- Expresiones claras: ojos grandes para sorpresa, `lid`/`cut` para cansancio o enojo, saltitos para alegría.
- Cada tropiezo tiene efecto de sonido sincronizado; la música baja en los momentos tristes.
- Personajes y diseños originales: nunca copiar personajes, logos ni canciones con derechos.
- Duraciones: 🔤 Aprende 25–40 s · ⚡ Gag 10–15 s y que termine donde empezó (loop) · 🎬 Episodio 30–45 s.
- Reutilizar escenarios ya hechos de la semana (ver `episodes/`) para mantener el mismo look día a día.
