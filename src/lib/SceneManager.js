import * as THREE from 'three';

/**
 * SceneManager - Gestiona la escena principal de Three.js
 */
export class SceneManager {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();
    this.objects = [];
    this.scrollY = 0;

    this.init();
    this.setupLights();
    this.addEventListeners();
  }

  init() {
    // Escena
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);

    // Cámara
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x0a0a0a, 1);
    this.container.appendChild(this.renderer.domElement);
  }

  setupLights() {
    // ===== ILUMINACIÓN PROFESIONAL PARA METAL =====

    // Luz ambiental cálida (base general)
    const ambientLight = new THREE.AmbientLight(0xFFE4B5, 0.4); // Tono melocotón suave
    this.scene.add(ambientLight);

    // Luz direccional principal (key light) - naranja cálido
    const keyLight = new THREE.DirectionalLight(0xFFB347, 1.2); // Naranja dorado
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    this.scene.add(keyLight);

    // Luz de relleno (fill light) - naranja más suave
    const fillLight = new THREE.DirectionalLight(0xFFD9A0, 0.6); // Naranja pastel
    fillLight.position.set(-5, 3, -3);
    this.scene.add(fillLight);

    // Luz de contorno (rim light) - dorado brillante
    const rimLight = new THREE.DirectionalLight(0xFFD700, 0.8); // Dorado puro
    rimLight.position.set(0, -3, -5);
    this.scene.add(rimLight);

    // Luces puntuales para reflejos especulares
    const spotLight1 = new THREE.PointLight(0xFFB347, 1.5, 20);
    spotLight1.position.set(3, 4, 3);
    this.scene.add(spotLight1);

    const spotLight2 = new THREE.PointLight(0xFFD9A0, 1.2, 20);
    spotLight2.position.set(-3, 2, 4);
    this.scene.add(spotLight2);
    this.animatedLight = spotLight2; // Esta se animará

    // Luz de acento desde abajo (para brillo inferior)
    const accentLight = new THREE.PointLight(0xE8A66F, 0.8, 15);
    accentLight.position.set(0, -2, 0);
    this.scene.add(accentLight);

    // Habilitar sombras en el renderer
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  addObject(object) {
    this.objects.push(object);
    this.scene.add(object);
  }

  removeObject(object) {
    const index = this.objects.indexOf(object);
    if (index > -1) {
      this.objects.splice(index, 1);
      this.scene.remove(object);
    }
  }

  updateScroll(scrollY) {
    this.scrollY = scrollY;
  }

  addEventListeners() {
    // Resize
    window.addEventListener('resize', () => this.onWindowResize());

    // Mouse move para efectos parallax
    window.addEventListener('mousemove', (event) => this.onMouseMove(event));
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onMouseMove(event) {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Pequeño movimiento de cámara basado en mouse
    this.camera.position.x += (x * 0.5 - this.camera.position.x) * 0.05;
    this.camera.position.y += (y * 0.5 - this.camera.position.y) * 0.05;
  }

  animate() {
    const elapsedTime = this.clock.getElapsedTime();

    // Animar luz
    if (this.animatedLight) {
      this.animatedLight.position.x = Math.sin(elapsedTime) * 10;
      this.animatedLight.position.z = Math.cos(elapsedTime) * 10;
    }

    // Animar objetos
    this.objects.forEach((object, index) => {
      if (object.userData.animate) {
        object.userData.animate(object, elapsedTime, this.scrollY, index);
      }
    });

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    window.removeEventListener('resize', this.onWindowResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.renderer.dispose();
  }
}
