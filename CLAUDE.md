# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 📋 Project Summary

**Games Collection Repository** - Colección de minijuegos retro y experimentales desarrollados por Alejandro Moñiz Mesa.

**Live URL:** [games.amoniz.dev](https://games.amoniz.dev)
**Main Site:** [amoniz.dev](https://amoniz.dev)
**Repository:** github.com/iPrydz/games
**Tech Stack:** Vanilla JavaScript, HTML5, CSS3 (sin dependencias)
**Deployment:** Vercel (auto-deploy desde main)

---

## 🏗️ Repository Structure

```
games/
├── index.html              # Landing page con estilo de amoniz.dev
├── README.md               # Documentación del repositorio
├── CLAUDE.md               # Este archivo (memoria del proyecto)
├── CHANGELOG.md            # Historial de versiones
├── TODO.md                 # Tareas pendientes
├── DATABASE_SCHEMA.md      # Esquema para futura BD
├── package.json            # Scripts y configuración npm
├── .gitignore              # Archivos ignorados (incluye .claude/)
├── .vscode/                # Configuración VS Code
└── typing/                 # ⌨️ Typing Defense (primer juego)
    ├── index.html          # HTML del juego
    ├── game.js             # Lógica del juego (31KB)
    └── style.css           # Estilos Game & Watch
```

---

## 🎮 Games in Collection

### 1. Typing Defense (`/typing/`)

**URL:** [games.amoniz.dev/typing](https://games.amoniz.dev/typing)

Roguelike typing game con estética Game & Watch de los años 80. El jugador defiende una torreta central escribiendo palabras que atacan desde todos los ángulos.

**Features:**
- Sistema de escritura directo (sin input field visible)
- 6 tipos de mejoras roguelike
- Sistema de combo y multiplicadores
- ~120 palabras en inglés
- Visualización del texto escribiendo debajo de la torreta
- Menú de level-up con mejoras actuales visibles
- Estética LCD monocromática auténtica

**Tech Details:**
- Vanilla JS puro (no dependencies)
- HTML5 Canvas para rendering
- Sistema de clases: Word, Particle, Projectile
- Game loop optimizado con requestAnimationFrame

---

## 🎨 Design System

### Landing Page (`/index.html`)
**Estilo:** Moderno con gradientes, matching amoniz.dev

**Colors:**
- Background: `linear-gradient(135deg, #1e293b 0%, #0f172a 100%)`
- Primary gradient: `linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)`
- Text primary: `#e2e8f0`
- Text secondary: `#94a3b8`
- Text muted: `#64748b`

**Typography:**
- Font: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- H1: 56px, gradient text
- Body: 15-16px

**Layout:**
- Header: Logo "AM" + Nav (Home, Projects, Games, Contact)
- Profile section con icono 🎮
- Games grid: auto-fit, minmax(320px, 1fr)
- Cards con hover effects y backdrop blur

### Typing Defense Game (`/typing/`)
**Estilo:** Game & Watch retro (años 80)

**Colors:**
- Background: `#e8e8c0` (LCD amarillo)
- Primary: `#1a1a1a` (negro)
- Secondary: `#3a3a3a` (gris oscuro)
- Light: `rgba(26, 26, 26, 0.2)`

**Design principles:**
- Sin gradientes ni sombras modernas
- Diseño plano LCD
- Tipografía: 'Courier New', monospace
- Filtros grayscale en emojis/iconos

---

## 🔧 Development Commands

### Running Locally

```bash
# Start development server (port 5500)
npm start

# or
npm run dev

# Direct browser open (no build needed)
open index.html
```

### Code Quality

```bash
# Validate HTML
npm run validate

# Minify for production
npm run minify
```

**Note:** No build step required - vanilla JS runs directly.

---

## 🚀 Deployment

### Vercel Configuration

**Project:** games
**Domain:** games.amoniz.dev
**Branch:** main (auto-deploy enabled)

**Vercel Settings:**
- Framework Preset: Other
- Build Command: *(empty)*
- Output Directory: `./`
- Install Command: *(empty)*

**DNS (Cloudflare):**
- Type: CNAME
- Name: games
- Target: cname.vercel-dns.com
- Proxy: Enabled (orange cloud)

### Deployment Flow

1. Push to `main` → Vercel auto-deploy
2. Build time: ~30-60 seconds
3. URL: games.amoniz.dev

---

## 🎯 Typing Defense: Technical Details

### Core Configuration

```javascript
const config = {
    turretRadius: 30,
    baseWordSpeed: 0.3,
    baseSpawnInterval: 2500,
    baseMaxLives: 5
};
```

### Game State Structure

```javascript
gameState = {
    // Core gameplay
    score, level, xp, xpToNextLevel, lives, maxLives,
    words: [],          // Word instances
    particles: [],      // Particle effects
    projectiles: [],    // Visual projectiles

    // Input & combo
    currentInput: '',   // What player is typing
    combo: 0,           // Combo multiplier
    wordsDestroyed: 0,

    // Upgrades & power-ups
    upgrades: {},       // { fireRate: 0, slowWords: 0, ... }
    shieldActive: 0,

    // Statistics (ready for DB)
    stats: {
        totalScore, highestLevel, totalWordsDestroyed,
        totalGamesPlayed, upgradesPicked: []
    }
}
```

### Main Classes

**Word:**
- Enemy words moving toward turret
- Properties: `text`, `angle`, `distance`, `speed`, `matched`, `shape`
- Updates position radially toward center
- Draws with highlighted matched letters

**Particle:**
- Visual effects on word destruction
- Simple physics with velocity decay

**Projectile:**
- Visual projectiles from turret to destroyed word
- Travels from center to target position

### Game Loop & Core Mechanics

**Input Handling:**
- Direct keyboard event listeners (no input field)
- `currentInput` tracks typed letters
- Each keypress updates all words' `matched` property
- Backspace removes last letter, Space resets input
- Complete matches trigger word destruction

**Word Spawning:**
- Timer-based with configurable interval
- Spawn rate affected by "Fire Rate" upgrade
- Words start at screen edge, move radially toward center

**Collision Detection:**
- Words check `distance < turretRadius + 25`
- Reaching center triggers life loss (or shield absorption)
- Combo resets on damage

**Upgrade System:**
- 6 upgrade types in `upgradeDefinitions`
- Each has `effect` function calculating value based on level
- Upgrades applied on selection
- Max 3 random options per level-up

**Current Input Display:**
- Drawn on canvas below turret (not in HUD)
- Shows only what you're typing (no target word visible)
- Black background with yellow text when matching
- Strikethrough when no match

**Level-up Menu:**
- Shows current upgrades at top with dot indicators
- Displays all purchased upgrades with their levels
- Visual dots show progress (filled = purchased level)
- 3 random upgrade options to choose from

---

## 🎮 Upgrade System

### 6 Types of Upgrades

| Upgrade | Icon | Description | Effect | Max Level |
|---------|------|-------------|--------|-----------|
| Fire Rate | ⚡ | More words spawn | -15% spawn interval | 5 |
| Slow Field | 🐌 | Words move slower | -15% speed | 5 |
| Extra Life | ❤️ | Increase max HP | +1 life | 5 |
| Multiplier | 💎 | More points | +30% score | 5 |
| Shield | 🛡️ | Absorb hits | +1 shield | 3 |
| Critical | ⭐ | Double points chance | +15% probability | 5 |

### Progression

- **XP per word:** `length * 5`
- **Points per word:** `(length * 10) * multiplier * (1 + combo * 0.1)`
- **XP to next level:** `current_level * 1.5` (rounded)
- **Auto-heal:** +1 life on level up

---

## 🗄️ Future: Database Integration

### Current Stats Structure

```javascript
stats: {
    totalScore: 0,
    highestLevel: 1,
    totalWordsDestroyed: 0,
    totalGamesPlayed: 0,
    upgradesPicked: []
}
```

### Planned Features (see DATABASE_SCHEMA.md)

- User system with authentication
- Global leaderboards
- Achievement system
- Permanent upgrades between runs
- Currency system (gold/gems)
- Anti-cheat validation

### Recommended Backend

- **API:** REST or GraphQL
- **Database:** MongoDB (flexible) or PostgreSQL (leaderboards)
- **Auth:** JWT
- **Real-time:** WebSockets for leaderboards
- **Cache:** Redis for statistics

---

## 📝 Key Design Decisions

### Landing Page

1. **Match amoniz.dev style** - Consistent brand identity
2. **Modern gradients** - Blue/purple theme matching portfolio
3. **Responsive grid** - Auto-fit cards for scalability
4. **Future-proof** - Easy to add more games

### Typing Defense

1. **No frameworks** - Vanilla JS for simplicity and performance
2. **Fullscreen responsive** - Immersive gameplay experience
3. **SPACE for reset** - More accessible than ESC
4. **XP bar without numbers** - Cleaner visual design
5. **Integrated tutorial** - Non-intrusive overlay with opacity 0.2
6. **Direct keyboard capture** - No input field needed
7. **Canvas-based input display** - Text below turret, not in HUD

---

## 🐛 Problems Solved

### Repository Restructure (Feb 2024)

**Challenge:** Initial repo was only for Typing Defense
**Solution:** Renamed repo to "games" and restructured:
- Created `/typing/` subdirectory for game
- Added landing page at root
- Updated all documentation and deployments

### Input Visualization

**Challenge:** User couldn't see what they were typing
**Solution:** Added canvas-based text display below turret
- Renders directly on canvas
- Subtle integration with game aesthetic
- Shows only typed letters (no target word spoilers)

### Backspace Bug

**Problem:** Erased matched state from all words
**Solution:** Only update words matching new input

### Level-up Menu Enhancement

**Problem:** Couldn't see purchased upgrades
**Solution:** Added "Current Upgrades" section at top
- Shows all purchased upgrades
- Visual dot indicators for levels
- Compact grid layout

---

## 🎯 Roadmap

### ✅ Completed (v1.0)

- Typing Defense MVP
- Repository restructure
- Landing page with amoniz.dev style
- Deployment to games.amoniz.dev
- Documentation complete

### Fase 2: Polish

- [ ] Sound effects (retro beeps via Web Audio API)
- [ ] Better animations
- [ ] More words (~200-300)
- [ ] Balance adjustments

### Fase 3: New Games

- [ ] Second game in collection
- [ ] Shared UI components
- [ ] Game selection improvements

### Fase 4: Backend

- [ ] User system
- [ ] Database integration
- [ ] Leaderboards
- [ ] Achievements

---

## 💡 Adding New Games

### Steps to Add Game

1. **Create folder:** `mkdir new-game/`
2. **Add files:** `index.html`, `game.js`, `style.css`
3. **Update landing:** Add card to `/index.html`
4. **Match aesthetic:** Follow design system
5. **Update README:** Document new game
6. **Commit & push:** Auto-deploy via Vercel

### Landing Page Card Template

```html
<a href="/new-game/" class="game-card">
    <div class="game-header">
        <div class="game-icon">🎯</div>
        <div class="game-title">Game Title</div>
    </div>
    <div class="game-description">
        Brief description of the game...
    </div>
    <div class="game-tech">
        <span class="tech-tag">Tech 1</span>
        <span class="tech-tag">Tech 2</span>
    </div>
</a>
```

---

## 📊 Metrics & Balance (Typing Defense)

### Current Difficulty

- **Initial spawn:** 2500ms between words
- **Initial speed:** 0.3 units/frame
- **Initial lives:** 5
- **Turret radius:** 30px

### Balance Testing

- Level 1-3: Easy (learning curve)
- Level 4-7: Medium (challenging)
- Level 8+: Hard (requires upgrades)

---

## 🔗 Important Links

- **Live Site:** [games.amoniz.dev](https://games.amoniz.dev)
- **Main Portfolio:** [amoniz.dev](https://amoniz.dev)
- **Repository:** [github.com/iPrydz/games](https://github.com/iPrydz/games)
- **Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)
- **Cloudflare DNS:** [dash.cloudflare.com](https://dash.cloudflare.com)

---

**Version:** 1.0.0
**Last Updated:** February 2024
**Developer:** Alejandro Moñiz Mesa
**Location:** Barcelona, Spain
