# Portafolio 3D Interactivo

Un portafolio web personal impresionante con animaciones 3D, efectos de scroll inmersivos y una experiencia visual cautivadora.

## ✨ Características

- **Escenas 3D Inmersivas**: Objetos flotantes y partículas renderizadas con Three.js
- **Animaciones de Scroll**: Efectos parallax, zoom y rotación sincronizados con el scroll
- **Smooth Scroll**: Navegación fluida con Lenis
- **Responsive Design**: Adaptado a todos los dispositivos
- **Glassmorphism UI**: Interfaz moderna con efectos de vidrio
- **Optimizado**: Alto rendimiento y carga rápida

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
