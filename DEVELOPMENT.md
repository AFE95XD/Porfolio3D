# Guía de Desarrollo

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:4321
```

## 📂 Estructura Detallada

### `/src/lib/`

Contiene las clases y utilidades principales del proyecto:

#### `SceneManager.js`
Gestiona la escena principal de Three.js:
- Inicialización de renderer, cámara y escena
- Sistema de luces dinámicas
- Gestión de objetos 3D
- Eventos de resize y mouse
- Loop de animación

#### `Objects3D.js`
Generadores de objetos 3D:
- `createFloatingSphere()` - Esferas con rotación
- `createFloatingTorus()` - Torus con animación
- `createFloatingCube()` - Cubos rotantes
- `createFloatingIcosahedron()` - Poliedros complejos
- `createParticleField()` - Sistemas de partículas
- `createWireframeSphere()` - Wireframes animados
- Funciones helper para posicionamiento

#### `ScrollAnimations.js`
Sistema de animaciones de scroll:
- Integración de Lenis para smooth scroll
- Conexión con GSAP ScrollTrigger
- Métodos de animación: fade, parallax, scale, rotate
- Scroll horizontal y secciones fijas
- Animaciones de texto revelado

### `/src/pages/`

#### `index.astro`
Página principal con todas las secciones:
- Script de inicialización en `<script>` tag
- Creación de objetos 3D
- Setup de animaciones de scroll
- Event listeners para interacciones

### `/src/styles/`

#### `global.css`
Estilos globales:
- Variables CSS personalizables
- Reset y estilos base
- Utilidades y componentes reutilizables
- Responsive breakpoints
- Animaciones CSS

## 🎨 Personalización Avanzada

### Añadir Nuevos Objetos 3D

1. Crear función generadora en `Objects3D.js`:

```javascript
export function createMyCustomObject() {
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = createGlowMaterial(0xff0000);
  const mesh = new THREE.Mesh(geometry, material);

  // Definir animación personalizada
  mesh.userData.animate = (mesh, time, scrollY, index) => {
    mesh.rotation.y = time;
    mesh.position.z = scrollY * 0.001;
  };

  return mesh;
}
```

2. Usar en `index.astro`:

```javascript
import { createMyCustomObject } from '../lib/Objects3D.js';

const myObject = createMyCustomObject();
myObject.position.set(0, 0, -5);
sceneManager.addObject(myObject);
```

### Añadir Nuevas Animaciones de Scroll

```javascript
// En el script de index.astro
scrollAnimations.setupFadeIn('.my-element');
scrollAnimations.setupParallax('.my-parallax', 0.3);
scrollAnimations.setupScale('.my-scale', 0.8, 1.2);
```

### Crear Nuevas Secciones

1. Añadir HTML en `index.astro`:

```html
<section id="new-section" class="new-section">
  <div class="container">
    <h2 class="fade-in">Nueva Sección</h2>
    <p class="fade-in">Contenido...</p>
  </div>
</section>
```

2. Añadir estilos:

```css
.new-section {
  min-height: 100vh;
  padding: 8rem 2rem;
}
```

3. Opcional: Añadir objetos 3D específicos para esa sección

## 🎯 Optimización

### Performance Tips

1. **Limitar objetos 3D**: Mantén entre 10-20 objetos para mejor rendimiento
2. **Reducir geometrías**: Usa menos segmentos en geometrías complejas
3. **Lazy loading**: Carga recursos pesados bajo demanda
4. **Pixel Ratio**: Ya está limitado a 2 en SceneManager
5. **Dispose**: Limpia recursos no utilizados

### Build para Producción

```bash
# Build optimizado
npm run build

# Preview de build
npm run preview
```

## 🔧 Configuración Avanzada

### Astro Config

Edita `astro.config.mjs` para añadir integraciones:

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tu-dominio.com',
  integrations: [sitemap()]
});
```

### Variables de Entorno

Crea `.env` para variables de entorno:

```env
PUBLIC_SITE_URL=https://tu-dominio.com
PUBLIC_CONTACT_EMAIL=tu@email.com
```

## 📱 Testing Responsive

Testea en diferentes dispositivos:

```bash
# Acceder desde otros dispositivos en la red local
npm run dev -- --host
```

## 🐛 Debugging

### Three.js

Añade helpers para debugging:

```javascript
// En SceneManager.js
const axesHelper = new THREE.AxesHelper(5);
this.scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(10, 10);
this.scene.add(gridHelper);
```

### GSAP ScrollTrigger

Añade markers para ver triggers:

```javascript
scrollTrigger: {
  trigger: el,
  start: 'top 80%',
  markers: true  // Solo para desarrollo
}
```

## 📚 Recursos Útiles

- [Three.js Docs](https://threejs.org/docs/)
- [GSAP Docs](https://greensock.com/docs/)
- [Astro Docs](https://docs.astro.build/)
- [Lenis Docs](https://github.com/studio-freight/lenis)

## 🤝 Workflow de Desarrollo

1. Hacer cambios en el código
2. Ver cambios en tiempo real (HMR)
3. Testear en diferentes resoluciones
4. Build para producción
5. Deploy a tu hosting preferido

## 🚀 Deploy

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages

```bash
npm run build
# Subir carpeta dist/
```

---

¡Feliz desarrollo! 🎉
