# ⌨️ Typing Defense

Juego roguelike donde defiendes una torreta central escribiendo palabras que atacan desde todos los ángulos.

**🌐 Live:** [amoniz.dev/games/typing](https://amoniz.dev/games/typing)

---

## 📁 Estructura

```
typing-defense/
├── index.html              # Página del juego
├── game.js                 # Lógica del juego
├── style.css               # Estilos Game & Watch
├── CLAUDE.md               # Memoria del proyecto
└── TODO.md                 # Tareas pendientes
```

---

## 🎮 Sobre el Juego

### ⌨️ Typing Defense

Juego roguelike donde defiendes una torreta central escribiendo palabras que atacan desde todos los ángulos.

**Características:**
- Sistema de escritura directo sin input visual
- 6 tipos de mejoras tipo roguelike (Fire Rate, Slow Field, Extra Life, Multiplier, Shield, Critical)
- Sistema de combo y multiplicadores
- Estética LCD monocromática auténtica
- Fullscreen responsive

**Controles:**
- `A-Z`: Escribir
- `Backspace`: Borrar letra
- `Espacio`: Reset palabra
- `1, 2, 3`: Elegir mejora al subir nivel
- `F11`: Pantalla completa

**Tech Stack:**
- Vanilla JavaScript (sin dependencias)
- HTML5 Canvas
- CSS3

---

## 🛠️ Desarrollo Local

```bash
# Clonar repositorio
git clone https://github.com/iPrydz/typing-defense.git
cd typing-defense

# Abrir con Live Server (recomendado)
npm start

# O abrir directamente en navegador
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Scripts Disponibles

```bash
npm start              # Live server en puerto 5500
npm run dev            # Alias de start
npm run validate       # Validar HTML
npm run minify         # Minificar JS para producción
```

---

## 🎨 Estilo Visual

El juego sigue la estética **Game & Watch** de Nintendo (1980s):
- LCD monocromático negro sobre amarillo (`#1a1a1a` sobre `#e8e8c0`)
- Diseño minimalista y plano (sin gradientes ni sombras modernas)
- Tipografía monoespaciada (`Courier New`)
- Animaciones simples tipo LCD parpadeante

---

## 🚀 Deployment

El juego está integrado como **Git Submodule** en el portfolio principal:

**Estructura:**
- Repositorio: `github.com/iPrydz/games` (este repo)
- Integrado en: `mi-portfolio/public/games/typing/` (como submodule)
- Dominio: `amoniz.dev/games/typing`

**Deployment:**
- Este repo se desarrolla de forma independiente
- Se integra en mi-portfolio como Git Submodule
- El portfolio principal se deploya en Vercel → `amoniz.dev`

---

## 📝 Documentación

Documentación del proyecto:
- `CLAUDE.md` - Memoria del proyecto Typing Defense
- `TODO.md` - Tareas pendientes
- `CHANGELOG.md` - Historial de versiones
- `DATABASE_SCHEMA.md` - Esquema para futura integración con BD

---

## 🤝 Contribuir

Este es un proyecto personal, pero ideas y sugerencias son bienvenidas:

1. Fork el proyecto
2. Crea una branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📜 Licencia

MIT License - © 2024 amoniz.dev

---

## 🔗 Links

- **Portfolio:** [amoniz.dev](https://amoniz.dev)
- **Games Collection:** [amoniz.dev/games](https://amoniz.dev/games)
- **GitHub:** [github.com/iPrydz](https://github.com/iPrydz)

---

**Última actualización:** Febrero 2024
