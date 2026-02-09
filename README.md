# 🎮 Games - amoniz.dev

Colección de minijuegos retro con estética **Game & Watch** de los años 80.

**🌐 Live:** [games.amoniz.dev](https://games.amoniz.dev)

---

## 📁 Estructura

```
games/
├── index.html              # Landing page con lista de juegos
└── typing/                 # Typing Defense - Roguelike typing game
    ├── index.html
    ├── game.js
    └── style.css
```

---

## 🕹️ Juegos Disponibles

### ⌨️ [Typing Defense](https://games.amoniz.dev/typing)

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
git clone https://github.com/iPrydz/games.git
cd games

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

Todos los juegos siguen la estética **Game & Watch** de Nintendo (1980s):
- LCD monocromático negro sobre amarillo (`#1a1a1a` sobre `#e8e8c0`)
- Diseño minimalista y plano (sin gradientes ni sombras modernas)
- Tipografía monoespaciada (`Courier New`)
- Animaciones simples tipo LCD parpadeante

---

## 📦 Añadir Nuevo Juego

Para añadir un nuevo juego a la colección:

1. **Crear carpeta:** `mkdir nuevo-juego/`
2. **Añadir archivos:** `index.html`, `game.js`, `style.css`
3. **Actualizar landing:** Añadir card en `/index.html`
4. **Mantener estética:** Seguir guía de estilo Game & Watch

```html
<!-- Ejemplo de card en index.html -->
<a href="/nuevo-juego/" class="game-card">
    <div class="game-icon">🎯</div>
    <div class="game-title">Nuevo Juego</div>
    <div class="game-description">
        Descripción breve del juego...
    </div>
</a>
```

---

## 🚀 Deployment

El proyecto está deployado en **Vercel** con configuración automática:

**Configuración (`vercel.json` no necesario):**
```json
{
  "buildCommand": null,
  "outputDirectory": "./",
  "framework": null
}
```

**Dominio:**
- Producción: `games.amoniz.dev`
- Preview: `games-git-main-iprydz.vercel.app`

**Deploy automático:**
- Push a `main` → Deploy automático en Vercel
- Pull Request → Preview deployment

---

## 📝 Documentación

Cada juego tiene su propia documentación en subcarpetas:
- `/typing/CLAUDE.md` - Memoria del proyecto Typing Defense
- `/typing/TODO.md` - Tareas pendientes

Para documentación general del proyecto, ver archivos raíz:
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
- **Games:** [games.amoniz.dev](https://games.amoniz.dev)
- **GitHub:** [github.com/iPrydz](https://github.com/iPrydz)

---

**Última actualización:** Febrero 2024
