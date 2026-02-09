# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📋 Project Summary

Roguelike typing game with retro Game & Watch aesthetic (1980s). Player defends a central turret by typing words attacking from all angles. Roguelike-style progression system with upgrades.

**Domain:** amoniz.dev
**Status:** Local development
**Tech Stack:** HTML5, CSS3, Vanilla JavaScript (no dependencies)

---

## 🎨 Decisiones de Diseño

### Estética Visual
- **Inspiración:** Nintendo Game & Watch (años 80)
- **Paleta de colores:**
  - Fondo Canvas: `#e8e8c0` (amarillo LCD)
  - Fondo General: `#d4d4aa` (beige vintage)
  - Primario: `#1a1a1a` (negro)
  - Secundario: `#3a3a3a` (gris oscuro)
- **Sin gradientes ni sombras modernas** - Solo diseño plano LCD
- **Fullscreen responsivo** - Se adapta al tamaño de ventana

### Mecánicas de Juego
- **Sin input visual** - Captura de teclas directa
- **Tutorial integrado** - Teclas visuales con opacidad 0.2
- **Sistema de combo** - Multiplicador por encadenar palabras
- **XP visual** - Barra que se llena de izquierda a derecha sin números

### Controles
- **A-Z:** Escribir
- **Backspace:** Borrar letra (mantiene progreso de palabra)
- **Espacio:** Reset palabra completa
- **1, 2, 3:** Elegir mejora al subir nivel
- **F11:** Pantalla completa (recomendado)

---

## 🏗️ Arquitectura Técnica

### Archivos Principales

```
typing/
├── index.html           # Estructura HTML del juego
├── style.css            # Estilos Game & Watch + fullscreen
├── game.js              # Lógica del juego y sistema roguelike
├── README.md            # Documentación para usuarios
├── CLAUDE.md            # Este archivo (memoria del proyecto)
├── DATABASE_SCHEMA.md   # Esquema para futura base de datos
├── TODO.md              # Lista de tareas pendientes
├── CHANGELOG.md         # Historial de cambios y versiones
├── package.json         # Configuración npm y scripts útiles
├── .gitignore           # Archivos ignorados por Git
└── .vscode/             # Configuración de Visual Studio Code
    ├── settings.json    # Preferencias del editor
    └── extensions.json  # Extensiones recomendadas
```

### Core Configuration (`game.js`)

```javascript
const config = {
    turretRadius: 30,
    baseWordSpeed: 0.3,
    baseSpawnInterval: 2500,
    baseMaxLives: 5
};
```

### Word List
~120 English words (themes: nature, fantasy, tech, animals)

### Game State Structure

```javascript
gameState = {
    // Core gameplay
    score, level, xp, xpToNextLevel, lives, maxLives,
    words: [],          // Array of Word instances
    particles: [],      // Array of Particle instances
    projectiles: [],    // Array of Projectile instances

    // Input & combo
    currentInput: '',
    combo: 0,
    wordsDestroyed: 0,

    // Upgrades & power-ups
    upgrades: {},       // { fireRate: 0, slowWords: 0, ... }
    shieldActive: 0,

    // Statistics (prepared for future DB integration)
    stats: {
        totalScore, highestLevel, totalWordsDestroyed,
        totalGamesPlayed, upgradesPicked: []
    }
}
```

### Main Classes

- **Word**: Enemy words moving toward turret
  - `text`, `angle`, `distance`, `speed`, `matched`, `shape`
  - Updates position radially toward center
  - Draws with highlighted matched letters

- **Particle**: Visual effects on word destruction
  - Simple physics with velocity decay

- **Projectile**: Visual projectiles from turret to destroyed word
  - Travels from center to target position

### Game Loop & Core Mechanics

**Input Handling:**
- Direct keyboard event listeners (no input field)
- `currentInput` tracks typed letters
- Each keypress updates all words' `matched` property
- Backspace removes last letter, Space resets input
- Complete matches trigger word destruction

**Word Spawning:**
- Timer-based with configurable interval (`baseSpawnInterval`)
- Spawn rate affected by "Fire Rate" upgrade
- Words start at screen edge, move radially toward center

**Collision Detection:**
- Words check `distance < turretRadius + 25`
- Reaching center triggers life loss (or shield absorption)
- Combo resets on damage

**Upgrade System:**
- 6 upgrade types defined in `upgradeDefinitions`
- Each has `effect` function that calculates value based on level
- Upgrades applied on selection: modify gameState properties
- Max 3 random options offered per level-up

---

## 🎮 Sistema de Mejoras Roguelike

### 6 Tipos de Mejoras

| Mejora | Icono | Descripción | Efecto | Max Nivel |
|--------|-------|-------------|--------|-----------|
| Fuego Rápido | ⚡ | Más palabras aparecen | -15% spawn interval | 5 |
| Campo Lento | 🐌 | Palabras más lentas | -15% velocidad | 5 |
| Vida Extra | ❤️ | Aumenta vida máxima | +1 vida | 5 |
| Multiplicador | 💎 | Más puntos | +30% puntos | 5 |
| Escudo | 🛡️ | Absorbe golpes | +1 escudo | 3 |
| Crítico | ⭐ | Doble puntos chance | +15% probabilidad | 5 |

### Progresión
- **XP por palabra:** `longitud * 5`
- **Puntos por palabra:** `(longitud * 10) * multiplicador * (1 + combo * 0.1)`
- **XP siguiente nivel:** `nivel actual * 1.5` (redondeado)
- **Curación automática:** +1 vida al subir nivel

---

## 🎯 Características Implementadas

### ✅ Core Gameplay
- [x] Torreta central con diseño minimalista
- [x] Palabras atacando desde todos los ángulos
- [x] 3 tipos de formas geométricas (círculo, triángulo, cuadrado)
- [x] Sistema de escritura sin input visual
- [x] Resaltado de letras escritas
- [x] Detección de palabras completas
- [x] Sistema de vidas con barras visuales
- [x] Game Over con estadísticas

### ✅ Sistema Roguelike
- [x] Experiencia y niveles
- [x] Barra XP visual sin números
- [x] Menú de mejoras al subir nivel
- [x] 6 tipos de mejoras con 3-5 niveles cada una
- [x] Selección de mejoras con teclado (1, 2, 3)
- [x] Indicadores de mejoras activas
- [x] Sistema de combo con timer
- [x] Críticos visuales

### ✅ UI/UX
- [x] HUD superior (Nivel, Puntos, Combo)
- [x] Barra de XP visual
- [x] HUD inferior (Vidas, Escritura, Mejoras)
- [x] Tutorial integrado con teclas visuales
- [x] Fullscreen responsivo
- [x] Animaciones LCD parpadeantes
- [x] Efectos de partículas

### ✅ Código
- [x] Canvas responsivo con resize
- [x] Sistema de estados del juego
- [x] Clases para Word, Particle
- [x] Event listeners optimizados
- [x] Estructura preparada para BD

---

## 🗄️ Preparación para Base de Datos

### Estado Actual
El juego guarda estadísticas en `gameState.stats`:
```javascript
stats: {
    totalScore: 0,
    highestLevel: 1,
    totalWordsDestroyed: 0,
    totalGamesPlayed: 0,
    upgradesPicked: []
}
```

### Base de Datos Futura
Ver `DATABASE_SCHEMA.md` para:
- Esquema completo de usuarios
- Leaderboards globales
- Sistema de logros
- Mejoras permanentes entre partidas
- Sistema de monedas (oro/gemas)
- Anti-cheat y validaciones

### Backend Recomendado
- **API:** REST o GraphQL
- **BD:** MongoDB (flexible) o PostgreSQL (leaderboards)
- **Auth:** JWT
- **Real-time:** WebSockets para leaderboards
- **Cache:** Redis para estadísticas

---

## 🚀 Deployment

### Actual (Local)
```bash
# Abrir directamente en navegador
open index.html
```

### Futuro (Producción)
1. **GitHub:** Repositorio público/privado
2. **Vercel:** Deployment automático desde main
3. **Cloudflare:** DNS para amoniz.dev
4. **Backend:** Vercel Serverless o Railway

#### Configuración Vercel
```json
{
  "buildCommand": null,
  "outputDirectory": "./",
  "framework": null
}
```

---

## 🐛 Problemas Resueltos

### Backspace
**Problema:** Borraba el matched de todas las palabras
**Solución:** Actualiza solo las palabras que coinciden con el nuevo input

### Barra XP
**Problema:** Texto numérico ocupaba espacio
**Solución:** Solo barra visual que se llena, sin texto

### Reset de Palabra
**Problema:** ESC muy incómodo de usar
**Solución:** Cambiado a ESPACIO (más accesible)

### Tutorial
**Problema:** Tapaba la torreta central
**Solución:** Reposicionado al 20% superior con opacidad 0.2

---

## 📊 Métricas y Balance

### Dificultad Actual
- **Spawn inicial:** 2500ms entre palabras
- **Velocidad inicial:** 0.3 unidades/frame
- **Vidas iniciales:** 5
- **Radio torreta:** 30px

### Balance Testing
- Nivel 1-3: Fácil (aprendizaje)
- Nivel 4-7: Medio (desafiante)
- Nivel 8+: Difícil (requiere mejoras)

---

## 🎯 Roadmap

### Fase 1: MVP ✅ (Completado)
- Core gameplay
- Sistema roguelike
- UI completa

### Fase 2: Polish (En progreso)
- [ ] Efectos de sonido retro (beeps)
- [ ] Animaciones mejoradas
- [ ] Más palabras
- [ ] Ajustes de balance

### Fase 3: Backend
- [ ] Sistema de usuarios
- [ ] Base de datos
- [ ] Leaderboards
- [ ] Logros

### Fase 4: Advanced
- [ ] Mejoras permanentes
- [ ] Eventos especiales
- [ ] Enemigos especiales (jefes)
- [ ] Más tipos de mejoras
- [ ] Sistema de monedas

### Fase 5: Mobile
- [ ] Controles táctiles
- [ ] PWA
- [ ] Optimización móvil

---

## 🔧 Development Commands

### Running the Game

```bash
# Start development server (port 5500)
npm start
# or
npm run dev

# Direct browser open (no build step needed)
open index.html
```

### Code Quality

```bash
# Validate HTML
npm run validate

# Minify for production
npm run minify
```

**Note:** No build step required - vanilla JS runs directly in browser.

---

## 📝 Key Design Decisions

1. **No frameworks** - Vanilla JS for simplicity and performance
2. **Fullscreen responsive** - Immersive gameplay experience
3. **SPACE for reset** - More accessible than ESC
4. **XP bar without numbers** - Cleaner visual design
5. **Integrated tutorial** - Non-intrusive overlay with opacity 0.2
6. **Direct keyboard capture** - No input field needed

---

## 💡 Code Style

- **Vanilla JS** (ES6+) - No transpilation needed
- Clear section comments in game.js
- Descriptive variable names
- No external dependencies

---

**Version:** 1.0.0-beta
**Last Updated:** 2024-02-09
