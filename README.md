# Sitio 2º Aniversario — Abdel & Iman

🎉 ¡Felicidades por vuestro 2º aniversario! Este sitio estático fue creado especialmente para celebrar vuestro amor.

## 📁 Estructura de archivos

- `index.html` — página principal (título, fotos, dedicatoria, countdown).
- `styles.css` — estilos y diseño responsivo.
- `script.js` — lógica del countdown (confetti, música).
- `photos/` — carpeta para tus 6 fotos (foto1.jpg a foto6.jpg).
- `music/` — carpeta para la canción (blue-love.mp3).
- `SETUP.md` — instrucciones paso a paso para completar el sitio.

## ⚡ Próximos pasos

1. **Lee `SETUP.md`** para saber exactamente dónde copiar las fotos y la música.
2. **Sube tus 6 fotos** a la carpeta `photos/` con los nombres indicados.
3. **Descarga la música** "Toto - Blue Love" y guarda en `music/blue-love.mp3`.
4. **Prueba localmente** abriendo `index.html` en tu navegador.
5. **Publica online** con GitHub Pages o Netlify (ver sección de abajo).

## 🌐 Publicar en GitHub Pages (recomendado)

### Opción 1: Desde GitHub Web (sin terminal)
1. Ve a github.com y crea una cuenta (si no tienes).
2. Haz clic en "+" > "New repository".
3. Nombre: `2-aniversario` (o el que prefieras).
4. Copia todo el contenido de la carpeta `wbb` al repo.
5. En Settings > Pages, elige la rama `main` como fuente.
6. GitHub te dará una URL pública en unos minutos.

### Opción 2: Desde PowerShell (si sabes de git)
```powershell
cd c:\Users\Abdel\Downloads\wbb
git init
git add .
git commit -m "Sitio 2º aniversario Abdel & Iman"
git branch -M main
git remote add origin https://github.com/TuUsuario/2-aniversario.git
git push -u origin main
```
Luego habilita Pages en las configuraciones del repo.

## 🚀 Publicar en Netlify (alternativa más rápida)

1. Ve a netlify.com > Sign up.
2. Arrastra la carpeta `wbb` a la zona de upload.
3. Netlify generará una URL pública en segundos.
4. Personaliza el dominio si quieres.

## 🎨 Personalización

- **Colores:** Edita `:root { --accent:#ff6b81; }` en `styles.css`.
- **Texto:** Cambia el contenido en los `<h1>`, `<p>`, `<blockquote>` de `index.html`.
- **Fecha del countdown:** Edita `targetDate` en `script.js`.

## 📞 Ayuda

Si necesitas cambiar algo o no ves las fotos/música:
1. Verifica que los archivos estén en las carpetas correctas.
2. Abre la consola del navegador (F12) para ver si hay errores.
3. Pregunta — estoy aquí para ayudarte.

---

**Creado con ❤️ para Abdel & Iman — 2 años juntos.**

