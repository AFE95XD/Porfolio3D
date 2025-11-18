# Portafolio 3D Interactivo 🚀

Un portafolio web personal **ULTRA IMPRESIONANTE** con animaciones 3D de última generación, efectos de scroll cinematográficos y una experiencia visual que dejará a todos con la boca abierta.

## ✨ Características Principales

### 🎯 Objeto Central Rotante (Inspirado en Brew District)
- **Cilindro 3D principal** que rota directamente con el scroll
- Anillos decorativos con material metálico brillante
- Efecto de **zoom dramático** basado en la posición del scroll
- Wireframe exterior animado

### 🌌 Sistema de Partículas Avanzado
- **4000+ partículas interactivas** que responden al movimiento
- **Esfera de partículas** que se expande/contrae con el scroll
- Campo de partículas de fondo tipo "espacio"
- Colores vibrantes (cyan, magenta, verde, amarillo)

### 🔮 Objetos 3D Impactantes
- **5 esferas orbitales** que giran alrededor del objeto central
- **Morphing shape** que cambia entre wireframe y sólido
- **Túnel geométrico** de 30 segmentos que avanza con el scroll
- **DNA Helix** doble hélice animada
- **Helix simple** con 60 esferas pulsantes

### 📜 Scroll Horizontal para Proyectos
- **Galería deslizante horizontal** controlada por scroll vertical
- 5 tarjetas de proyectos con efectos hover impresionantes
- Números de proyecto con gradiente
- Tech tags interactivos

### 🎨 Animaciones Cinemáticas
- **Text reveal** animado en el hero
- **Fade-in staggered** en tarjetas de habilidades
- **Scale animations** al hacer scroll
- **Timeline pulsante** con dots luminosos
- **Indicador de scroll** animado

### ⚡ Rendimiento Optimizado
- Smooth scroll ultra fluido con Lenis
- GSAP para animaciones de alta performance
- Renderizado eficiente de Three.js
- Responsive en todos los dispositivos

## 🚀 Tecnologías

- **Astro** - Framework web ultrarrápido
- **Three.js** - Biblioteca 3D WebGL
- **GSAP** - Animaciones avanzadas
- **Lenis** - Smooth scroll
- **Vanilla JavaScript** - Sin dependencias de frameworks pesados

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🎨 Estructura del Proyecto

```
/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── layouts/           # Layouts de página
│   │   └── Layout.astro   # Layout principal
│   ├── lib/               # Utilidades y clases
│   │   ├── SceneManager.js      # Gestor de escena Three.js
│   │   ├── Objects3D.js         # Generadores de objetos 3D
│   │   └── ScrollAnimations.js # Sistema de animaciones
│   ├── pages/
│   │   └── index.astro    # Página principal
│   └── styles/
│       └── global.css     # Estilos globales
├── astro.config.mjs       # Configuración de Astro
└── package.json
```

## 🎯 Secciones

1. **Hero** - Introducción impactante con objetos 3D flotantes
2. **About/Skills** - Presentación de habilidades con tarjetas interactivas
3. **Projects** - Showcase de proyectos destacados
4. **Experience** - Timeline de experiencia profesional
5. **Contact** - Formulario de contacto y enlaces sociales

## 🔧 Personalización

### Colores

Edita las variables CSS en `src/styles/global.css`:

```css
:root {
  --color-bg: #0a0a0a;
  --color-text: #ffffff;
  --color-accent: #00ffff;
  --color-accent-secondary: #ff00ff;
}
```

### Objetos 3D

Añade o modifica objetos en `src/lib/Objects3D.js` y úsalos en `src/pages/index.astro`.

### Contenido

Edita `src/pages/index.astro` para cambiar textos, proyectos y enlaces.

## 🎮 Controles de Interacción

- **Scroll**: Navega por las secciones
- **Mouse Move**: Parallax sutil de la cámara
- **Click en botones**: Navegación suave entre secciones

## 📱 Responsive

El portafolio está optimizado para:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## ⚡ Optimización

- Lazy loading de recursos
- Code splitting automático con Astro
- Renderizado SSG (Static Site Generation)
- Minificación de assets
- Pixel ratio máximo de 2 para mejor performance

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de:
- Reportar bugs
- Sugerir nuevas características
- Enviar pull requests

---

Hecho con ❤️ usando Astro y Three.js
