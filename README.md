# 🎮 Typing Defense - Roguelike

Un juego web roguelike estilo **Game & Watch** retro donde defiendes una torreta central escribiendo palabras que atacan desde todos los ángulos. Mejora tu personaje con un sistema de progresión tipo roguelike.

## 🕹️ Estilo Visual

Inspirado en las consolas **Game & Watch** de Nintendo (1980s):
- Pantalla LCD monocromática negro/amarillo
- Fondo beige/amarillento vintage tipo LCD retro
- Diseño minimalista y pixelado
- Sin gradientes ni efectos modernos
- Tutorial integrado con representaciones visuales de teclas
- Fullscreen responsive sin marcos

## ✨ Características

### 🎯 Mecánicas de Juego
- **Torreta central minimalista** - Defiende tu base en el centro
- **Sistema de escritura directo** - Sin input visual, escribe directamente
- **Palabras enemigas** - Atacan desde todos los ángulos con formas geométricas variadas
- **Sistema de combo** - Encadena palabras para multiplicar tu puntuación
- **Tutorial integrado** - Instrucciones sutiles en el fondo de la pantalla
- **Controles por teclado completos** - Juega sin necesidad de ratón
- **Fullscreen responsivo** - Se adapta al tamaño de tu ventana

### 🎲 Sistema Roguelike
- **Experiencia y niveles** - Sube de nivel completando palabras
- **6 tipos de mejoras**:
  - ⚡ **Fuego Rápido** - Más palabras aparecen (más desafío y puntos)
  - 🐌 **Campo Lento** - Las palabras se mueven más despacio
  - ❤️ **Vida Extra** - Aumenta tu vida máxima
  - 💎 **Multiplicador** - Más puntos por palabra
  - 🛡️ **Escudo** - Absorbe golpes
  - ⭐ **Crítico** - Chance de doble puntos
- **Curación al subir nivel** - Recupera vida automáticamente
- **Sistema de progresión** - Cada partida es única

### 🎨 Visuales
- **Estilo Game & Watch retro** - LCD monocromático auténtico
- Paleta negro sobre amarillo LCD (estilo años 80)
- Diseño minimalista sin gradientes
- Efectos de partículas pixelados
- Sistema de grid de fondo retro sutil
- Animaciones tipo LCD parpadeante
- Tutorial con teclas visuales estilo kbd
- Fullscreen responsivo sin marcos

### 📊 Estadísticas
- Puntuación en tiempo real
- Sistema de combos con multiplicador
- Nivel y barra de experiencia
- Vidas visuales con barras
- Indicadores de mejoras activas

## 🎮 Cómo Jugar

1. **Abre** `index.html` en tu navegador
2. **Escribe** las palabras que aparecen en pantalla (sin necesidad de input visual)
3. **Completa** palabras para destruirlas y ganar XP
4. **Sube de nivel** y elige mejoras estratégicamente
5. **Sobrevive** el mayor tiempo posible

### ⌨️ Controles
- **A-Z**: Escribe letras
- **Backspace**: Borra última letra
- **Espacio**: Resetea la palabra actual (si te equivocas)
- **1, 2, 3**: Elige mejora al subir de nivel (sin ratón)
- **F11**: Pantalla completa (recomendado)
- Las palabras se resaltan automáticamente al escribir

### 💡 Consejos
- Mantén el combo alto para maximizar puntos
- Prioriza palabras cercanas al centro
- Combina mejoras de forma estratégica
- El escudo es tu mejor amigo
- La vida se recupera al subir de nivel

## 🛠️ Tecnologías

- **HTML5 Canvas** - Renderizado responsivo del juego
- **CSS3** - Animaciones retro y diseño fullscreen
- **JavaScript Vanilla** - Lógica del juego y sistema roguelike
- **Responsive Design** - Se adapta a cualquier tamaño de pantalla
- Sin dependencias externas

## 📁 Estructura del Proyecto

```
typing/
├── index.html          # Estructura HTML del juego
├── style.css           # Estilos Game & Watch y animaciones
├── game.js             # Lógica del juego y sistema roguelike
├── README.md           # Este archivo (documentación de usuario)
├── CLAUDE.md           # Memoria del proyecto (contexto completo)
├── DATABASE_SCHEMA.md  # Esquema para futura implementación con BD
├── TODO.md             # Lista de tareas pendientes
├── CHANGELOG.md        # Historial de cambios y versiones
├── package.json        # Configuración npm y scripts
├── .gitignore          # Archivos ignorados por Git
└── .vscode/            # Configuración de Visual Studio Code
    ├── settings.json   # Preferencias del editor
    └── extensions.json # Extensiones recomendadas
```

## 🚀 Desarrollo Local

No requiere servidor web ni instalación. El juego se adapta automáticamente al tamaño de tu ventana:

```bash
# Abre el archivo en tu navegador
open index.html
# o
start index.html
```

**Tip**: Para mejor experiencia, usa pantalla completa (F11 en la mayoría de navegadores)

## 🗄️ Futuro: Base de Datos

El juego está preparado para integración con base de datos. El archivo `DATABASE_SCHEMA.md` contiene:

- Esquema completo de tablas/colecciones
- Sistema de usuarios y autenticación
- Leaderboards globales
- Logros y recompensas
- Mejoras permanentes entre partidas
- Sistema de monedas (oro/gemas)
- Anti-cheat y validaciones server-side

### Estadísticas Rastreadas (listas para BD)
```javascript
gameState.stats = {
  totalScore: 0,
  highestLevel: 1,
  totalWordsDestroyed: 0,
  totalGamesPlayed: 0,
  upgradesPicked: []
}
```

## 🎯 Sistema de Mejoras

### Mejoras Disponibles

| Mejora | Efecto | Niveles |
|--------|--------|---------|
| ⚡ Fuego Rápido | -15% intervalo entre palabras | 5 |
| 🐌 Campo Lento | -15% velocidad de palabras | 5 |
| ❤️ Vida Extra | +1 vida máxima | 5 |
| 💎 Multiplicador | +30% puntos | 5 |
| 🛡️ Escudo | +1 escudo | 3 |
| ⭐ Crítico | +15% probabilidad crítico | 5 |

## 🎨 Paleta de Colores (Game & Watch Auténtico)

Inspirado en los LCD originales de los años 80:
- **Fondo Canvas**: Amarillo LCD (`#e8e8c0`)
- **Fondo General**: Beige claro (`#d4d4aa`)
- **Primario**: Negro (`#1a1a1a`)
- **Secundario**: Gris oscuro (`#3a3a3a`)
- **Transparente**: Negro con opacidad (`rgba(26, 26, 26, 0.2)`)

## 📈 Próximas Mejoras

- [ ] Integración con base de datos
- [ ] Sistema de usuarios y autenticación
- [ ] Leaderboards globales
- [ ] Más tipos de mejoras
- [ ] Enemigos especiales (jefes)
- [ ] Eventos limitados
- [ ] Efectos de sonido retro tipo beep
- [ ] Más paletas de colores (original Game & Watch, verde, rojo)
- [ ] Controles táctiles para móviles
- [ ] PWA (Progressive Web App)

## 🌐 Deployment

Cuando esté listo para producción:

1. **GitHub**: Sube el código
2. **Vercel**: Conecta el repositorio
3. **Cloudflare**: Configura DNS para `amoniz.dev`

## 📝 Licencia

Proyecto personal - © 2024 amoniz.dev

## 🤝 Contribuciones

Por ahora es un proyecto personal, pero ideas y sugerencias son bienvenidas.

---

**¿Disfrutas el juego? ¡Comparte tu mejor puntuación!**
