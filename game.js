// ============================================================================
// CONFIGURACIÓN Y CONSTANTES
// ============================================================================

const config = {
    turretRadius: 30,
    baseWordSpeed: 0.3,
    baseSpawnInterval: 2500,
    baseMaxLives: 5
};

const wordList = [
    // Short words (3-4 letters)
    'cat', 'dog', 'sun', 'moon', 'star', 'fire', 'wind', 'wave', 'tree', 'leaf',
    'bird', 'fish', 'bear', 'wolf', 'lion', 'frog', 'duck', 'swan', 'hawk', 'crow',
    'book', 'desk', 'door', 'wall', 'roof', 'ship', 'boat', 'code', 'data', 'chip',
    'gold', 'coin', 'ring', 'gift', 'love', 'hope', 'life', 'time', 'path', 'game',

    // Medium words (5-7 letters)
    'dragon', 'wizard', 'knight', 'castle', 'sword', 'shield', 'magic', 'potion',
    'forest', 'mountain', 'ocean', 'river', 'valley', 'desert', 'jungle', 'island',
    'tiger', 'eagle', 'shark', 'whale', 'snake', 'spider', 'rabbit', 'turtle',
    'thunder', 'lightning', 'rainbow', 'crystal', 'diamond', 'emerald', 'silver',
    'keyboard', 'monitor', 'printer', 'network', 'router', 'server', 'memory',
    'planet', 'galaxy', 'cosmos', 'nebula', 'comet', 'meteor', 'asteroid',
    'warrior', 'archer', 'rogue', 'mage', 'paladin', 'hunter', 'druid',
    'treasure', 'victory', 'battle', 'combat', 'defense', 'attack', 'power',
    'energy', 'force', 'spirit', 'shadow', 'light', 'darkness', 'flame',
    'wisdom', 'courage', 'honor', 'justice', 'freedom', 'destiny', 'legend',

    // Longer words (8+ letters)
    'adventure', 'champion', 'guardian', 'sorcerer', 'necromancer', 'barbarian',
    'mountain', 'waterfall', 'volcano', 'earthquake', 'hurricane', 'blizzard',
    'butterfly', 'dragonfly', 'scorpion', 'octopus', 'dinosaur', 'elephant',
    'computer', 'software', 'hardware', 'algorithm', 'database', 'internet',
    'universe', 'dimension', 'parallel', 'infinite', 'eternity', 'immortal',
    'enchanted', 'mystical', 'powerful', 'legendary', 'ultimate', 'supreme',
    'lightning', 'thunder', 'tempest', 'avalanche', 'typhoon', 'tornado',
    'sanctuary', 'fortress', 'citadel', 'stronghold', 'bastion', 'rampart',
    'challenge', 'conquest', 'triumph', 'domination', 'supremacy', 'excellence'
];

// Colores estilo Game & Watch auténtico
const colors = {
    background: '#e8e8c0',  // LCD amarillo claro
    primary: '#1a1a1a',     // Negro
    secondary: '#3a3a3a',   // Gris oscuro
    light: 'rgba(26, 26, 26, 0.2)'
};

// Tipos de enemigos
const enemyTypes = {
    NORMAL: 'normal',
    SHIELDED: 'shielded',
    SPLITTER: 'splitter'
};

// Configuración de tipos de enemigos
const enemyTypeConfig = {
    [enemyTypes.NORMAL]: {
        spawnWeight: 70,  // Probabilidad relativa de spawn
        shapeOptions: [0, 1, 2]  // Círculo, triángulo, cuadrado
    },
    [enemyTypes.SHIELDED]: {
        spawnWeight: 10,  // Spawn poco frecuente
        shapeOptions: [0, 1, 2]
    },
    [enemyTypes.SPLITTER]: {
        spawnWeight: 20,
        shapeOptions: [3, 4]  // Formas especiales: rombo (3), rectángulo (4)
    }
};

// Definición de mejoras tipo roguelike
const upgradeDefinitions = {
    fireRate: {
        name: 'Fuego Rápido',
        icon: '⚡',
        description: 'Reduce el intervalo entre palabras',
        maxLevel: 5,
        effect: (level) => config.baseSpawnInterval * Math.pow(0.85, level)
    },
    slowWords: {
        name: 'Campo Lento',
        icon: '🐌',
        description: 'Las palabras se mueven más lento',
        maxLevel: 5,
        effect: (level) => config.baseWordSpeed * Math.pow(0.85, level)
    },
    maxHealth: {
        name: 'Vida Extra',
        icon: '❤️',
        description: 'Aumenta tu vida máxima',
        maxLevel: 5,
        effect: (level) => config.baseMaxLives + level
    },
    scoreMultiplier: {
        name: 'Multiplicador',
        icon: '💎',
        description: 'Más puntos por palabra',
        maxLevel: 5,
        effect: (level) => 1 + (level * 0.3)
    },
    shield: {
        name: 'Escudo',
        icon: '🛡️',
        description: 'Absorbe el próximo golpe',
        maxLevel: 3,
        effect: (level) => level
    },
    criticalHit: {
        name: 'Crítico',
        icon: '⭐',
        description: 'Chance de doble puntos',
        maxLevel: 5,
        effect: (level) => level * 0.15
    }
};

// ============================================================================
// ELEMENTOS DOM
// ============================================================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const comboDisplay = document.getElementById('combo');
const xpBar = document.getElementById('xpBar');
const livesBars = document.getElementById('livesBars');
const typingDisplay = document.getElementById('typingDisplay');
const upgradesMini = document.getElementById('upgradesMini');
const upgradeMenu = document.getElementById('upgradeMenu');
const upgradeOptions = document.getElementById('upgradeOptions');
const currentUpgrades = document.getElementById('currentUpgrades');
const levelUpNumber = document.getElementById('levelUpNumber');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
const finalLevelDisplay = document.getElementById('finalLevel');
const wordsDestroyedDisplay = document.getElementById('wordsDestroyed');
const restartBtn = document.getElementById('restartBtn');

// Configurar canvas responsivo
function resizeCanvas() {
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ============================================================================
// ESTADO DEL JUEGO
// ============================================================================

let gameState = {
    score: 0,
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    lives: config.baseMaxLives,
    maxLives: config.baseMaxLives,
    words: [],
    particles: [],
    projectiles: [],
    isGameOver: false,
    isPaused: false,
    lastSpawnTime: 0,
    currentInput: '',
    combo: 0,
    wordsDestroyed: 0,
    upgrades: {},
    shieldActive: 0,
    currentUpgradeOptions: [],
    stats: {
        totalScore: 0,
        highestLevel: 1,
        totalWordsDestroyed: 0,
        totalGamesPlayed: 0,
        upgradesPicked: []
    }
};

// Inicializar niveles de mejoras
Object.keys(upgradeDefinitions).forEach(key => {
    gameState.upgrades[key] = 0;
});

// ============================================================================
// CLASES
// ============================================================================

class Word {
    constructor(text, type = enemyTypes.NORMAL) {
        this.text = text;
        this.type = type;
        this.angle = Math.random() * Math.PI * 2;
        const maxDist = Math.max(canvas.width, canvas.height);
        this.distance = maxDist / 2 + 100;
        this.speed = upgradeDefinitions.slowWords.effect(gameState.upgrades.slowWords);
        this.updatePosition();
        this.matched = 0;

        // Forma según el tipo de enemigo
        const shapeOptions = enemyTypeConfig[type].shapeOptions;
        this.shape = shapeOptions[Math.floor(Math.random() * shapeOptions.length)];

        // Propiedades del escudo
        if (this.type === enemyTypes.SHIELDED) {
            this.shieldWord = this.generateShieldWord();
            this.shieldActive = true;
            this.shieldMatched = 0;
        }
    }

    generateShieldWord() {
        // Generar una palabra corta para el escudo (3-5 letras)
        const shortWords = wordList.filter(w => w.length >= 3 && w.length <= 5);
        return shortWords[Math.floor(Math.random() * shortWords.length)];
    }

    updatePosition() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        this.x = centerX + Math.cos(this.angle) * this.distance;
        this.y = centerY + Math.sin(this.angle) * this.distance;
    }

    update() {
        this.distance -= this.speed;
        this.updatePosition();
    }

    draw() {
        const size = 15;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Dibujar escudo si está activo (misma forma que el enemigo)
        if (this.type === enemyTypes.SHIELDED && this.shieldActive) {
            ctx.strokeStyle = colors.primary;
            ctx.lineWidth = 3;
            ctx.setLineDash([4, 4]);

            if (this.shape === 0) {
                // Escudo circular
                ctx.beginPath();
                ctx.arc(0, 0, size + 8, 0, Math.PI * 2);
                ctx.stroke();
            } else if (this.shape === 1) {
                // Escudo triangular
                const shieldSize = size + 8;
                ctx.beginPath();
                ctx.moveTo(0, -shieldSize);
                ctx.lineTo(shieldSize, shieldSize);
                ctx.lineTo(-shieldSize, shieldSize);
                ctx.closePath();
                ctx.stroke();
            } else if (this.shape === 2) {
                // Escudo cuadrado
                const shieldSize = size + 8;
                ctx.strokeRect(-shieldSize, -shieldSize, shieldSize * 2, shieldSize * 2);
            }

            ctx.setLineDash([]);
        }

        ctx.fillStyle = colors.primary;
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 2;

        if (this.shape === 0) {
            // Círculo
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.shape === 1) {
            // Triángulo
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size, size);
            ctx.lineTo(-size, size);
            ctx.closePath();
            ctx.fill();
        } else if (this.shape === 2) {
            // Cuadrado
            ctx.fillRect(-size, -size, size * 2, size * 2);
        } else if (this.shape === 3) {
            // Rombo (diamante)
            ctx.beginPath();
            ctx.moveTo(0, -size * 1.3);      // Top
            ctx.lineTo(size, 0);             // Right
            ctx.lineTo(0, size * 1.3);       // Bottom
            ctx.lineTo(-size, 0);            // Left
            ctx.closePath();
            ctx.fill();

            // Línea divisoria para indicar división (si es SPLITTER)
            if (this.type === enemyTypes.SPLITTER) {
                ctx.strokeStyle = colors.background;
                ctx.lineWidth = 2;
                ctx.setLineDash([3, 2]);
                // Línea horizontal que atraviesa el rombo
                ctx.beginPath();
                ctx.moveTo(-size * 0.8, 0);
                ctx.lineTo(size * 0.8, 0);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        } else if (this.shape === 4) {
            // Rectángulo horizontal
            ctx.fillRect(-size * 1.5, -size * 0.7, size * 3, size * 1.4);

            // Línea divisoria para indicar división (si es SPLITTER)
            if (this.type === enemyTypes.SPLITTER) {
                ctx.strokeStyle = colors.background;
                ctx.lineWidth = 2;
                ctx.setLineDash([3, 2]);
                // Línea vertical que atraviesa el rectángulo
                ctx.beginPath();
                ctx.moveTo(0, -size * 0.5);
                ctx.lineTo(0, size * 0.5);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }

        ctx.restore();

        // Dibujar texto (escudo o palabra principal)
        const displayText = (this.type === enemyTypes.SHIELDED && this.shieldActive)
            ? this.shieldWord
            : this.text;
        const displayMatched = (this.type === enemyTypes.SHIELDED && this.shieldActive)
            ? this.shieldMatched
            : this.matched;

        ctx.fillStyle = colors.primary;
        ctx.font = 'bold 14px "Courier New"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textY = this.y + 30;
        for (let i = 0; i < displayText.length; i++) {
            const charX = this.x - (displayText.length * 9) / 2 + i * 9 + 4.5;

            if (i < displayMatched) {
                // Letra coincidente - con fondo
                ctx.fillStyle = colors.primary;
                ctx.fillRect(charX - 5, textY - 8, 10, 16);
                ctx.fillStyle = colors.background;
            } else {
                ctx.fillStyle = colors.primary;
            }

            ctx.fillText(displayText[i], charX, textY);
        }
    }

    hasReachedCenter() {
        return this.distance < config.turretRadius + 25;
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.life = 1;
        this.size = Math.random() * 3 + 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.life -= 0.02;
    }

    draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = colors.primary;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.globalAlpha = 1;
    }
}

class Projectile {
    constructor(targetX, targetY) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        this.x = centerX;
        this.y = centerY;
        this.targetX = targetX;
        this.targetY = targetY;

        // Calcular dirección
        const dx = targetX - centerX;
        const dy = targetY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Velocidad base con variación aleatoria (15-22)
        const speed = 15 + Math.random() * 7;
        this.vx = (dx / distance) * speed;
        this.vy = (dy / distance) * speed;

        // Añadir ligera variación a la trayectoria
        this.vx += (Math.random() - 0.5) * 2;
        this.vy += (Math.random() - 0.5) * 2;

        this.size = 2 + Math.random() * 1.5;
        this.life = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Verificar si llegó al objetivo (distancia cercana)
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 10) {
            this.life = 0;
        }
    }

    draw() {
        ctx.fillStyle = colors.primary;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ============================================================================
// FUNCIONES DE DIBUJO
// ============================================================================

function drawTurret() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Escudo si está activo
    if (gameState.shieldActive > 0) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, config.turretRadius + 15, 0, Math.PI * 2);
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Círculo exterior con segmentos de vida (quesito)
    const outerRadius = config.turretRadius;
    const anglePerSegment = (Math.PI * 2) / gameState.maxLives;
    const startAngle = -Math.PI / 2; // Empezar desde arriba

    // Dibujar fondo completo primero (vidas actuales - color claro)
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.fillStyle = colors.background;
    ctx.fill();

    // Dibujar segmentos de vidas perdidas en negro
    const livesMissing = gameState.maxLives - gameState.lives;
    for (let i = 0; i < livesMissing; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(
            centerX,
            centerY,
            outerRadius,
            startAngle + ((gameState.lives + i) * anglePerSegment),
            startAngle + ((gameState.lives + i + 1) * anglePerSegment)
        );
        ctx.closePath();
        ctx.fillStyle = colors.primary;
        ctx.fill();
    }

    // Dibujar las líneas divisorias entre segmentos
    for (let i = 0; i < gameState.maxLives; i++) {
        const angle = startAngle + (i * anglePerSegment);
        const x1 = centerX;
        const y1 = centerY;
        const x2 = centerX + Math.cos(angle) * outerRadius;
        const y2 = centerY + Math.sin(angle) * outerRadius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Borde exterior
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Anillos interiores
    for (let i = 1; i >= 0; i--) {
        const radius = config.turretRadius - ((i + 1) * 8);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? colors.primary : colors.light;
        ctx.fill();
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Centro
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
    ctx.fillStyle = colors.primary;
    ctx.fill();
}

function drawCurrentInput() {
    if (gameState.currentInput === '') return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const yOffset = config.turretRadius + 50; // Debajo de la torreta

    // Buscar palabra que coincida
    let targetWord = null;
    for (const word of gameState.words) {
        if (word.text.startsWith(gameState.currentInput)) {
            targetWord = word;
            break;
        }
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 18px "Courier New"';

    if (targetWord) {
        // Mostrar solo lo que has escrito con fondo negro
        const matched = gameState.currentInput;
        const textWidth = ctx.measureText(matched).width;

        // Dibujar fondo negro
        ctx.fillStyle = colors.primary;
        ctx.fillRect(centerX - textWidth / 2 - 4, centerY + yOffset - 11, textWidth + 8, 22);

        // Dibujar texto en amarillo
        ctx.fillStyle = colors.background;
        ctx.fillText(matched, centerX, centerY + yOffset);
    } else {
        // Sin coincidencia - mostrar texto tachado
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = colors.primary;
        ctx.fillText(gameState.currentInput, centerX, centerY + yOffset);

        // Línea de tachado
        const textWidth = ctx.measureText(gameState.currentInput).width;
        ctx.beginPath();
        ctx.moveTo(centerX - textWidth / 2, centerY + yOffset);
        ctx.lineTo(centerX + textWidth / 2, centerY + yOffset);
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

function drawBackground() {
    // Grid retro sutil
    ctx.strokeStyle = 'rgba(26, 26, 26, 0.05)';
    ctx.lineWidth = 1;

    const gridSize = 30;

    for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }

    for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}

// ============================================================================
// LÓGICA DEL JUEGO
// ============================================================================

function spawnWord(forceType = null) {
    const word = wordList[Math.floor(Math.random() * wordList.length)];

    // Determinar tipo de enemigo
    let type = forceType;
    if (!type) {
        // Selección aleatoria basada en pesos
        const rand = Math.random() * 100;
        let cumulative = 0;

        for (const [enemyType, config] of Object.entries(enemyTypeConfig)) {
            cumulative += config.spawnWeight;
            if (rand < cumulative) {
                type = enemyType;
                break;
            }
        }

        // Fallback por si acaso
        if (!type) type = enemyTypes.NORMAL;
    }

    gameState.words.push(new Word(word, type));
}

function spawnSplitEnemies(x, y, angle, distance, parentShape) {
    // Determinar forma y cantidad de hijos según el padre
    let childShape;
    let childCount;

    if (parentShape === 3) {
        // Rombo → 2 triángulos
        childShape = 1;
        childCount = 2;
    } else if (parentShape === 4) {
        // Rectángulo → 2 cuadrados
        childShape = 2;
        childCount = 2;
    } else {
        // Fallback (no debería ocurrir)
        childShape = 0;
        childCount = 2;
    }

    // Palabras cortas para los hijos (3-5 letras)
    const shortWords = wordList.filter(w => w.length >= 3 && w.length <= 5);

    // Calcular separación angular para distribuir equitativamente
    const angleSpread = 0.6; // Radianes de separación total (más amplio)

    for (let i = 0; i < childCount; i++) {
        const childWord = shortWords[Math.floor(Math.random() * shortWords.length)];
        const child = new Word(childWord, enemyTypes.NORMAL);

        // Forzar la forma del hijo
        child.shape = childShape;

        // Distribuir los hijos con separación angular clara
        // Para 2 hijos: uno a la izquierda (-angleSpread/2), otro a la derecha (+angleSpread/2)
        const angleOffset = (i - (childCount - 1) / 2) * (angleSpread / (childCount - 1 || 1));
        child.angle = angle + angleOffset;

        // RETROCEDER: aumentar distancia para que retrocedan al dividirse
        child.distance = distance + 80; // Retroceden 80 píxeles
        child.updatePosition();

        // Los hijos se mueven un poco más rápido
        child.speed = child.speed * 1.2;

        gameState.words.push(child);
    }
}

function createExplosion(x, y, intense = false) {
    const particleCount = intense ? 20 : 12;
    for (let i = 0; i < particleCount; i++) {
        gameState.particles.push(new Particle(x, y));
    }
}

function fireProjectiles(targetX, targetY) {
    // Disparar entre 3-5 proyectiles con ligeros delays
    const projectileCount = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < projectileCount; i++) {
        // Crear proyectil con delay (algunos salen antes que otros)
        setTimeout(() => {
            gameState.projectiles.push(new Projectile(targetX, targetY));
        }, i * 20); // 20ms de delay entre cada uno
    }
}

function addXP(amount) {
    gameState.xp += amount;

    if (gameState.xp >= gameState.xpToNextLevel) {
        levelUp();
    }

    updateXPBar();
}

function levelUp() {
    gameState.level++;
    gameState.xp = gameState.xp - gameState.xpToNextLevel;
    gameState.xpToNextLevel = Math.floor(gameState.xpToNextLevel * 1.5);

    // Curar 1 vida al subir de nivel
    if (gameState.lives < gameState.maxLives) {
        gameState.lives++;
        updateLives();
    }

    levelDisplay.textContent = gameState.level;

    // Mostrar menú de mejoras
    showUpgradeMenu();

    // Efectos visuales
    createExplosion(canvas.width / 2, canvas.height / 2, true);
}

function displayCurrentUpgrades() {
    currentUpgrades.innerHTML = '';

    // Obtener todas las mejoras con nivel > 0
    const purchasedUpgrades = Object.keys(upgradeDefinitions)
        .filter(key => gameState.upgrades[key] > 0)
        .sort(); // Ordenar alfabéticamente para consistencia

    if (purchasedUpgrades.length === 0) {
        currentUpgrades.innerHTML = '<div style="text-align: center; padding: 10px; color: rgba(26, 26, 26, 0.4); font-size: 12px;">Sin mejoras aún</div>';
        return;
    }

    purchasedUpgrades.forEach(key => {
        const upgrade = upgradeDefinitions[key];
        const currentLevel = gameState.upgrades[key];
        const maxLevel = upgrade.maxLevel;

        const item = document.createElement('div');
        item.className = 'current-upgrade-item';

        // Crear los puntos para el nivel
        let dotsHTML = '';
        for (let i = 0; i < maxLevel; i++) {
            const filled = i < currentLevel ? 'filled' : '';
            dotsHTML += `<div class="current-upgrade-dot ${filled}"></div>`;
        }

        item.innerHTML = `
            <div class="current-upgrade-icon">${upgrade.icon}</div>
            <div class="current-upgrade-info">
                <div class="current-upgrade-name">${upgrade.name}</div>
                <div class="current-upgrade-level">
                    <div class="current-upgrade-dots">${dotsHTML}</div>
                </div>
            </div>
        `;

        currentUpgrades.appendChild(item);
    });
}

function showUpgradeMenu() {
    gameState.isPaused = true;
    levelUpNumber.textContent = gameState.level;

    // Mostrar mejoras actuales
    displayCurrentUpgrades();

    // Seleccionar 3 mejoras aleatorias
    const availableUpgrades = Object.keys(upgradeDefinitions).filter(key => {
        return gameState.upgrades[key] < upgradeDefinitions[key].maxLevel;
    });

    const selectedUpgrades = [];
    while (selectedUpgrades.length < 3 && availableUpgrades.length > 0) {
        const index = Math.floor(Math.random() * availableUpgrades.length);
        selectedUpgrades.push(availableUpgrades[index]);
        availableUpgrades.splice(index, 1);
    }

    // Guardar mejoras seleccionadas para acceso por teclado
    gameState.currentUpgradeOptions = selectedUpgrades;

    // Crear opciones de mejora
    upgradeOptions.innerHTML = '';
    selectedUpgrades.forEach((key, index) => {
        const upgrade = upgradeDefinitions[key];
        const currentLevel = gameState.upgrades[key];

        const option = document.createElement('div');
        option.className = 'upgrade-option';
        option.innerHTML = `
            <div class="upgrade-number">${index + 1}</div>
            <div class="upgrade-icon-big">${upgrade.icon}</div>
            <div class="upgrade-name">${upgrade.name}</div>
            <div class="upgrade-description">${upgrade.description}</div>
            <div class="upgrade-level">Nivel ${currentLevel} → ${currentLevel + 1}</div>
        `;

        option.addEventListener('click', () => selectUpgrade(key));
        upgradeOptions.appendChild(option);
    });

    upgradeMenu.classList.remove('hidden');
}

function selectUpgrade(upgradeKey) {
    gameState.upgrades[upgradeKey]++;
    gameState.stats.upgradesPicked.push(upgradeKey);

    // Aplicar efectos de mejora
    if (upgradeKey === 'maxHealth') {
        gameState.maxLives = upgradeDefinitions.maxHealth.effect(gameState.upgrades.maxHealth);
        gameState.lives = Math.min(gameState.lives + 1, gameState.maxLives);
        updateLives();
    } else if (upgradeKey === 'shield') {
        gameState.shieldActive += 1;
    }

    updateUpgradesMini();
    upgradeMenu.classList.add('hidden');
    gameState.isPaused = false;
}

function updateLives() {
    livesBars.innerHTML = '';
    for (let i = 0; i < gameState.maxLives; i++) {
        const bar = document.createElement('div');
        bar.className = 'life-bar';
        if (i >= gameState.lives) {
            bar.classList.add('empty');
        }
        livesBars.appendChild(bar);
    }
}

function updateXPBar() {
    const percentage = (gameState.xp / gameState.xpToNextLevel) * 100;
    xpBar.style.width = percentage + '%';
}

function updateUpgradesMini() {
    upgradesMini.innerHTML = '';
    Object.keys(gameState.upgrades).forEach(key => {
        const level = gameState.upgrades[key];
        if (level > 0) {
            const icon = document.createElement('div');
            icon.className = 'upgrade-icon';
            icon.textContent = upgradeDefinitions[key].icon;
            icon.title = `${upgradeDefinitions[key].name} (${level})`;
            upgradesMini.appendChild(icon);
        }
    });
}

function updateTypingDisplay() {
    // Visualización mínima - el texto principal está en el canvas
    if (gameState.currentInput === '') {
        typingDisplay.innerHTML = '<div class="typing-target" style="opacity: 0.3;">Escribe para defender</div>';
    } else {
        typingDisplay.innerHTML = '<div class="typing-target" style="opacity: 0.3;">▸ Escribiendo...</div>';
    }
}

// Combo system: increments on each word destroyed, resets on damage
// No timer needed - combo only resets when you lose a life

function takeDamage() {
    // Verificar escudo
    if (gameState.shieldActive > 0) {
        gameState.shieldActive--;
        createExplosion(canvas.width / 2, canvas.height / 2, true);
        return;
    }

    gameState.lives--;
    updateLives();

    // Shake effect
    canvas.classList.add('shake');
    setTimeout(() => canvas.classList.remove('shake'), 200);

    // Reset combo
    gameState.combo = 0;
    comboDisplay.textContent = '0x';

    if (gameState.lives <= 0) {
        gameOver();
    }
}

function update(timestamp) {
    if (gameState.isGameOver || gameState.isPaused) return;

    // Spawn words
    const spawnInterval = upgradeDefinitions.fireRate.effect(gameState.upgrades.fireRate);
    if (timestamp - gameState.lastSpawnTime > spawnInterval) {
        spawnWord();
        gameState.lastSpawnTime = timestamp;
    }

    // Update words
    for (let i = gameState.words.length - 1; i >= 0; i--) {
        const word = gameState.words[i];
        word.update();

        if (word.hasReachedCenter()) {
            gameState.words.splice(i, 1);
            takeDamage();
        }
    }

    // Update particles
    for (let i = gameState.particles.length - 1; i >= 0; i--) {
        gameState.particles[i].update();
        if (gameState.particles[i].life <= 0) {
            gameState.particles.splice(i, 1);
        }
    }

    // Update projectiles
    for (let i = gameState.projectiles.length - 1; i >= 0; i--) {
        gameState.projectiles[i].update();
        if (gameState.projectiles[i].life <= 0) {
            gameState.projectiles.splice(i, 1);
        }
    }
}

function draw() {
    // Clear
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    drawTurret();
    drawCurrentInput();

    // Draw words
    gameState.words.forEach(word => word.draw());

    // Draw projectiles
    gameState.projectiles.forEach(projectile => projectile.draw());

    // Draw particles
    gameState.particles.forEach(particle => particle.draw());
}

function gameLoop(timestamp) {
    update(timestamp);
    draw();

    if (!gameState.isGameOver) {
        requestAnimationFrame(gameLoop);
    }
}

function gameOver() {
    gameState.isGameOver = true;

    // Actualizar estadísticas
    gameState.stats.totalScore = Math.max(gameState.stats.totalScore, gameState.score);
    gameState.stats.highestLevel = Math.max(gameState.stats.highestLevel, gameState.level);
    gameState.stats.totalWordsDestroyed += gameState.wordsDestroyed;
    gameState.stats.totalGamesPlayed++;

    finalScoreDisplay.textContent = gameState.score;
    finalLevelDisplay.textContent = gameState.level;
    wordsDestroyedDisplay.textContent = gameState.wordsDestroyed;
    gameOverScreen.classList.remove('hidden');
}

function resetGame() {
    const savedStats = { ...gameState.stats };

    gameState = {
        score: 0,
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        lives: config.baseMaxLives,
        maxLives: config.baseMaxLives,
        words: [],
        particles: [],
        projectiles: [],
        isGameOver: false,
        isPaused: false,
        lastSpawnTime: 0,
        currentInput: '',
        combo: 0,
        wordsDestroyed: 0,
        upgrades: {},
        shieldActive: 0,
        currentUpgradeOptions: [],
        stats: savedStats
    };

    Object.keys(upgradeDefinitions).forEach(key => {
        gameState.upgrades[key] = 0;
    });

    scoreDisplay.textContent = '0';
    levelDisplay.textContent = '1';
    comboDisplay.textContent = '0x';
    updateLives();
    updateXPBar();
    updateUpgradesMini();
    updateTypingDisplay();
    gameOverScreen.classList.add('hidden');

    requestAnimationFrame(gameLoop);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    // Controles para menú de mejoras
    if (gameState.isPaused && !gameState.isGameOver) {
        if (key === '1' || key === '2' || key === '3') {
            const index = parseInt(key) - 1;
            if (gameState.currentUpgradeOptions && gameState.currentUpgradeOptions[index]) {
                selectUpgrade(gameState.currentUpgradeOptions[index]);
            }
        }
        return;
    }

    if (gameState.isGameOver || gameState.isPaused) return;

    // MODO TEST: Invocar enemigos específicos con teclas numéricas
    if (key >= '5' && key <= '9') {
        e.preventDefault();
        const testKey = parseInt(key);

        switch (testKey) {
            case 5:
                // Invocar enemigo normal
                spawnWord(enemyTypes.NORMAL);
                break;
            case 7:
                // Invocar enemigo que se divide
                spawnWord(enemyTypes.SPLITTER);
                break;
            // Reservado para futuros tipos de enemigos
            case 6:
            case 8:
            case 9:
                console.log(`Tipo de enemigo ${testKey} aún no implementado`);
                break;
        }
        return;
    }

    // Espacio para resetear palabra actual
    if (key === ' ') {
        e.preventDefault();
        gameState.currentInput = '';
        gameState.words.forEach(word => {
            word.matched = 0;
            if (word.type === enemyTypes.SHIELDED) {
                word.shieldMatched = 0;
            }
        });
        updateTypingDisplay();
        return;
    }

    if (key === 'backspace') {
        e.preventDefault();
        gameState.currentInput = gameState.currentInput.slice(0, -1);

        // Actualizar matched de palabras según el nuevo input
        gameState.words.forEach(word => {
            const targetText = (word.type === enemyTypes.SHIELDED && word.shieldActive)
                ? word.shieldWord
                : word.text;

            if (targetText.startsWith(gameState.currentInput)) {
                if (word.type === enemyTypes.SHIELDED && word.shieldActive) {
                    word.shieldMatched = gameState.currentInput.length;
                } else {
                    word.matched = gameState.currentInput.length;
                }
            } else {
                word.matched = 0;
                if (word.type === enemyTypes.SHIELDED) {
                    word.shieldMatched = 0;
                }
            }
        });

        updateTypingDisplay();
        return;
    }

    if (key.length === 1 && key.match(/[a-z]/)) {
        gameState.currentInput += key;

        // Buscar palabra que coincida
        let foundMatch = false;
        for (const word of gameState.words) {
            // Determinar qué palabra estamos escribiendo (escudo o principal)
            const targetText = (word.type === enemyTypes.SHIELDED && word.shieldActive)
                ? word.shieldWord
                : word.text;

            if (targetText.startsWith(gameState.currentInput)) {
                // Actualizar el matched correspondiente
                if (word.type === enemyTypes.SHIELDED && word.shieldActive) {
                    word.shieldMatched = gameState.currentInput.length;
                } else {
                    word.matched = gameState.currentInput.length;
                }
                foundMatch = true;

                // Palabra/Escudo completado
                if (gameState.currentInput === targetText) {
                    // Si es un escudo, destruirlo y resetear input
                    if (word.type === enemyTypes.SHIELDED && word.shieldActive) {
                        word.shieldActive = false;
                        word.shieldMatched = 0;
                        gameState.currentInput = '';

                        // Efecto visual de destrucción de escudo
                        createExplosion(word.x, word.y, false);

                        updateTypingDisplay();
                        break;
                    }

                    // Palabra completada (o enemigo sin escudo destruido)
                    const critChance = upgradeDefinitions.criticalHit.effect(gameState.upgrades.criticalHit);
                    const isCrit = Math.random() < critChance;
                    const basePoints = word.text.length * 10;
                    const multiplier = upgradeDefinitions.scoreMultiplier.effect(gameState.upgrades.scoreMultiplier);
                    const comboBonus = 1 + (gameState.combo * 0.1);
                    let points = Math.floor(basePoints * multiplier * comboBonus);

                    // Bonus por destruir escudo primero
                    if (word.type === enemyTypes.SHIELDED) {
                        points = Math.floor(points * 1.5);
                    }

                    if (isCrit) {
                        points *= 2;
                    }

                    gameState.score += points;
                    gameState.wordsDestroyed++;
                    scoreDisplay.textContent = gameState.score;

                    // Combo - increases with each word destroyed
                    gameState.combo++;
                    comboDisplay.textContent = gameState.combo + 'x';

                    // Efectos - disparar proyectiles
                    fireProjectiles(word.x, word.y);

                    // Remover palabra y dar XP después de que los proyectiles lleguen
                    const wordToRemove = word;
                    const xpAmount = word.text.length * 5;
                    setTimeout(() => {
                        createExplosion(wordToRemove.x, wordToRemove.y, isCrit);

                        // Si es un SPLITTER, generar enemigos hijos
                        if (wordToRemove.type === enemyTypes.SPLITTER) {
                            spawnSplitEnemies(
                                wordToRemove.x,
                                wordToRemove.y,
                                wordToRemove.angle,
                                wordToRemove.distance,
                                wordToRemove.shape
                            );
                        }

                        gameState.words = gameState.words.filter(w => w !== wordToRemove);

                        // Dar XP DESPUÉS de que la palabra muera
                        addXP(xpAmount);
                    }, 150); // Delay para que los proyectiles lleguen primero

                    gameState.currentInput = '';
                }

                break;
            }
        }

        if (!foundMatch) {
            gameState.words.forEach(word => {
                word.matched = 0;
                if (word.type === enemyTypes.SHIELDED) {
                    word.shieldMatched = 0;
                }
            });
        }

        updateTypingDisplay();
    }
});

restartBtn.addEventListener('click', resetGame);

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

updateLives();
updateXPBar();
updateTypingDisplay();
requestAnimationFrame(gameLoop);
