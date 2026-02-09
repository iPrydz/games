# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

## [1.0.0-beta] - 2024-02-09

### Añadido
- Sistema core de typing game con torreta central
- Palabras atacando desde todos los ángulos (360°)
- 3 tipos de formas geométricas (círculo, triángulo, cuadrado)
- Sistema de escritura sin input visual
- 47 palabras en español
- Sistema roguelike con 6 tipos de mejoras
- Sistema de experiencia y niveles
- Barra de XP visual (sin números)
- Menú de mejoras al subir nivel
- Selección de mejoras con teclado (1, 2, 3)
- Sistema de combo con multiplicador
- Críticos con chance configurable
- Sistema de vidas con barras visuales
- HUD completo (nivel, puntos, combo, vidas, mejoras)
- Tutorial integrado con teclas visuales
- Estética Game & Watch auténtica (LCD años 80)
- Fullscreen responsivo sin marcos
- Efectos de partículas al destruir palabras
- Animaciones LCD parpadeantes
- Game over con estadísticas
- Estructura preparada para base de datos futura

### Controles
- A-Z: Escribir letras
- Backspace: Borrar última letra (mantiene progreso)
- Espacio: Reset palabra completa
- 1, 2, 3: Elegir mejora al subir nivel
- F11: Pantalla completa

### Técnico
- HTML5 Canvas con resize automático
- CSS3 con variables y animaciones
- JavaScript Vanilla (ES6+)
- Sin dependencias externas
- Preparado para deployment en Vercel
- Esquema de base de datos documentado

### Decisiones de Diseño
- Paleta: Negro (#1a1a1a) sobre LCD amarillo (#e8e8c0)
- Sin gradientes ni efectos modernos
- Tutorial con opacidad 0.2 (no intrusivo)
- Barra XP visual sin texto numérico
- ESPACIO para reset (más accesible que ESC)

## [Unreleased]

### Por Añadir
- Efectos de sonido retro
- Más palabras (objetivo: 100+)
- Menú principal
- Sistema de pausa
- Backend y base de datos
- Leaderboards globales
- Sistema de logros
- Mejoras permanentes
- Enemigos especiales (jefes)
- Eventos temporales
- PWA para móviles

---

## Tipos de Cambios

- **Añadido** para nuevas características.
- **Cambiado** para cambios en funcionalidad existente.
- **Obsoleto** para características que serán eliminadas.
- **Eliminado** para características eliminadas.
- **Corregido** para correcciones de bugs.
- **Seguridad** para vulnerabilidades.
