# Esquema de Base de Datos - Typing Defense

Este documento describe la estructura de datos necesaria para la implementación futura con base de datos.

## Colecciones/Tablas

### Users (Usuarios)
```javascript
{
  id: String,              // ID único del usuario
  username: String,         // Nombre de usuario único
  email: String,            // Email del usuario
  createdAt: Date,          // Fecha de registro
  lastLogin: Date,          // Último acceso

  // Estadísticas globales
  stats: {
    totalScore: Number,           // Mejor puntuación total
    highestLevel: Number,         // Nivel más alto alcanzado
    totalWordsDestroyed: Number,  // Palabras destruidas en total
    totalGamesPlayed: Number,     // Partidas jugadas
    totalPlayTime: Number,        // Tiempo total jugado (ms)
    averageScore: Number,         // Puntuación media
    favoriteUpgrade: String       // Mejora más elegida
  },

  // Mejoras permanentes (sistema roguelike persistente)
  permanentUpgrades: {
    startingHealth: Number,       // Vida inicial extra
    startingShield: Number,       // Escudos iniciales
    xpMultiplier: Number,         // Multiplicador de XP
    luckyStart: Boolean,          // Empieza con mejora aleatoria
    wordBank: Number              // Más variedad de palabras
  },

  // Moneda del juego
  currency: {
    gems: Number,                 // Gemas (moneda premium)
    gold: Number                  // Oro (moneda normal)
  }
}
```

### GameSessions (Partidas)
```javascript
{
  id: String,
  userId: String,           // Referencia al usuario
  startTime: Date,
  endTime: Date,
  duration: Number,         // Duración en ms

  // Resultados
  finalScore: Number,
  finalLevel: Number,
  wordsDestroyed: Number,
  maxCombo: Number,

  // Mejoras elegidas durante la partida
  upgradesPicked: [
    {
      upgradeId: String,    // ID de la mejora
      level: Number,        // Nivel alcanzado
      pickedAt: Number      // Nivel del jugador al elegirla
    }
  ],

  // Causa de muerte
  deathCause: String,       // 'words_reached_center', 'quit', etc.

  // Metadatos
  platform: String,         // 'web', 'mobile', etc.
  version: String           // Versión del juego
}
```

### Leaderboards (Clasificaciones)
```javascript
{
  id: String,
  type: String,             // 'daily', 'weekly', 'all_time'
  entries: [
    {
      userId: String,
      username: String,
      score: Number,
      level: Number,
      timestamp: Date,
      rank: Number
    }
  ],
  startDate: Date,          // Para leaderboards temporales
  endDate: Date
}
```

### Upgrades (Catálogo de Mejoras)
```javascript
{
  id: String,
  name: String,
  description: String,
  icon: String,
  category: String,         // 'offense', 'defense', 'utility'
  maxLevel: Number,

  // Para mejoras permanentes
  isPermanent: Boolean,
  costGold: Number,
  costGems: Number,
  requiredLevel: Number,    // Nivel mínimo para desbloquear

  // Balanceo
  rarity: String,           // 'common', 'rare', 'epic', 'legendary'
  weight: Number            // Probabilidad de aparecer
}
```

### Achievements (Logros)
```javascript
{
  id: String,
  name: String,
  description: String,
  icon: String,
  category: String,

  // Requisitos
  requirement: {
    type: String,           // 'score', 'level', 'words', 'combo', etc.
    value: Number
  },

  // Recompensas
  rewards: {
    gold: Number,
    gems: Number,
    title: String           // Título especial
  }
}
```

### UserAchievements (Logros de Usuarios)
```javascript
{
  id: String,
  userId: String,
  achievementId: String,
  unlockedAt: Date,
  progress: Number          // Para logros progresivos
}
```

## Queries Comunes

### Al cargar el juego
```javascript
// Obtener datos del usuario
getUserData(userId) -> User

// Obtener mejoras permanentes activas
getPermanentUpgrades(userId) -> User.permanentUpgrades

// Obtener ranking del usuario
getUserRanking(userId, leaderboardType) -> rank, position
```

### Durante la partida
```javascript
// Guardar progreso (cada X segundos)
saveGameSession(sessionData)

// Al subir nivel o evento importante
updateSessionProgress(sessionId, updates)
```

### Al terminar partida
```javascript
// Guardar partida completa
saveCompletedGame(sessionData) -> GameSession

// Actualizar estadísticas del usuario
updateUserStats(userId, sessionStats)

// Verificar nuevos logros
checkAchievements(userId, sessionData) -> [newAchievements]

// Actualizar leaderboards
updateLeaderboards(userId, score, level)

// Calcular recompensas
calculateRewards(sessionData) -> { gold, gems, xp }
```

### Leaderboards
```javascript
// Obtener top jugadores
getTopPlayers(leaderboardType, limit) -> [entries]

// Obtener ranking cercano al usuario
getRankingNearUser(userId, leaderboardType, range) -> [entries]
```

## Índices Recomendados

### Users
- `username` (unique)
- `email` (unique)
- `stats.totalScore` (descendente)
- `stats.highestLevel` (descendente)

### GameSessions
- `userId` + `startTime` (compuesto)
- `finalScore` (descendente)
- `finalLevel` (descendente)

### Leaderboards
- `type` + `entries.score` (compuesto)

### UserAchievements
- `userId` + `achievementId` (compuesto, unique)
- `userId` + `unlockedAt` (compuesto)

## Implementación Recomendada

### Backend
- **API REST** o **GraphQL** para comunicación
- **WebSockets** para actualizaciones en tiempo real (leaderboards)
- **JWT** para autenticación

### Base de Datos
Opciones:
1. **MongoDB** - Flexible, buena para documentos anidados
2. **PostgreSQL** - Relacional, excelente para leaderboards con queries complejas
3. **Firebase/Supabase** - Solución completa con auth y realtime

### Caché
- **Redis** para leaderboards en tiempo real
- Caché de estadísticas de usuario (5 minutos)

## Seguridad

### Validaciones
- Todas las puntuaciones deben validarse server-side
- Límite de velocidad en escritura de datos
- Detección de valores imposibles (anti-cheat básico)

### Anti-Cheat
```javascript
// Validaciones server-side
function validateGameSession(session) {
  // Tiempo mínimo por nivel
  const minTimePerLevel = 10000; // 10 segundos
  if (session.duration < session.finalLevel * minTimePerLevel) {
    return { valid: false, reason: 'impossible_time' };
  }

  // Puntuación máxima teórica
  const maxScorePerWord = 100;
  const maxPossibleScore = session.wordsDestroyed * maxScorePerWord;
  if (session.finalScore > maxPossibleScore * 2) {
    return { valid: false, reason: 'impossible_score' };
  }

  return { valid: true };
}
```

## Migración de Datos Actuales

El objeto `gameState.stats` actual ya está preparado para migración:

```javascript
// En el frontend actual
const statsToSave = {
  totalScore: gameState.stats.totalScore,
  highestLevel: gameState.stats.highestLevel,
  totalWordsDestroyed: gameState.stats.totalWordsDestroyed,
  totalGamesPlayed: gameState.stats.totalGamesPlayed,
  upgradesPicked: gameState.stats.upgradesPicked
};

// POST /api/users/{userId}/stats
await saveUserStats(userId, statsToSave);
```

## Monetización (Opcional)

### Sistema de Gemas
- Gemas premium (compra con dinero real)
- Oro gratuito (jugando)

### Mejoras Permanentes
- Compra con oro o gemas
- Desbloqueos por logros

### Battle Pass / Temporadas
- Recompensas semanales/mensuales
- Eventos especiales con palabras temáticas
