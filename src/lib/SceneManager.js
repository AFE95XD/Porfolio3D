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
    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Luces direccionales para mejor visualización
    const directionalLight1 = new THREE.DirectionalLight(0x00ffff, 1);
    directionalLight1.position.set(5, 5, 5);
    this.scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xff00ff, 0.5);
    directionalLight2.position.set(-5, -5, -5);
    this.scene.add(directionalLight2);

    // Punto de luz animada
    const pointLight = new THREE.PointLight(0x00ffff, 2, 100);
    pointLight.position.set(0, 0, 10);
    this.scene.add(pointLight);
    this.animatedLight = pointLight;
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
