import * as THREE from 'three';

/**
 * Crea objetos 3D flotantes con materiales y animaciones
 */

// Material brillante con efectos
export function createGlowMaterial(color = 0x00ffff, emissive = 0x00ffff) {
  return new THREE.MeshStandardMaterial({
    color: color,
    emissive: emissive,
    emissiveIntensity: 0.5,
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.9
  });
}

// Material de wireframe
export function createWireframeMaterial(color = 0x00ffff) {
  return new THREE.MeshBasicMaterial({
    color: color,
    wireframe: true,
    transparent: true,
    opacity: 0.6
  });
}

// Crear esfera flotante
export function createFloatingSphere(radius = 0.5, color = 0x00ffff) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = createGlowMaterial(color, color);
  const sphere = new THREE.Mesh(geometry, material);

  // Animación personalizada
  sphere.userData.animate = (mesh, time, scrollY, index) => {
    mesh.rotation.x = time * 0.5 + index;
    mesh.rotation.y = time * 0.3 + index;
    mesh.position.y += Math.sin(time + index) * 0.002;

    // Efecto de scroll
    mesh.position.z = (scrollY * 0.001) - 5 + (index * 2);
  };

  return sphere;
}

// Crear torus (dona)
export function createFloatingTorus(radius = 1, tube = 0.4, color = 0xff00ff) {
  const geometry = new THREE.TorusGeometry(radius, tube, 16, 100);
  const material = createGlowMaterial(color, color);
  const torus = new THREE.Mesh(geometry, material);

  torus.userData.animate = (mesh, time, scrollY, index) => {
    mesh.rotation.x = time * 0.7;
    mesh.rotation.y = time * 0.5;
    mesh.position.y += Math.cos(time + index) * 0.003;

    mesh.position.z = (scrollY * 0.0015) - 5 + (index * 2);
  };

  return torus;
}

// Crear cubo rotante
export function createFloatingCube(size = 1, color = 0x00ffff) {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = createGlowMaterial(color, color);
  const cube = new THREE.Mesh(geometry, material);

  cube.userData.animate = (mesh, time, scrollY, index) => {
    mesh.rotation.x = time * 0.4 + index;
    mesh.rotation.y = time * 0.6 + index;
    mesh.rotation.z = time * 0.2 + index;

    mesh.position.z = (scrollY * 0.002) - 5 + (index * 2);
  };

  return cube;
}

// Crear icosaedro (poliedro complejo)
export function createFloatingIcosahedron(radius = 0.8, color = 0x00ffff) {
  const geometry = new THREE.IcosahedronGeometry(radius, 0);
  const material = createGlowMaterial(color, color);
  const icosahedron = new THREE.Mesh(geometry, material);

  icosahedron.userData.animate = (mesh, time, scrollY, index) => {
    mesh.rotation.x = time * 0.3 + index * 0.5;
    mesh.rotation.y = time * 0.8 + index * 0.5;
    mesh.position.y += Math.sin(time * 2 + index) * 0.001;

    mesh.position.z = (scrollY * 0.0008) - 5 + (index * 2);
  };

  return icosahedron;
}

// Crear octaedro
export function createFloatingOctahedron(radius = 0.7, color = 0xff00ff) {
  const geometry = new THREE.OctahedronGeometry(radius, 0);
  const material = createGlowMaterial(color, color);
  const octahedron = new THREE.Mesh(geometry, material);

  octahedron.userData.animate = (mesh, time, scrollY, index) => {
    mesh.rotation.x = time * 0.6 + index;
    mesh.rotation.z = time * 0.4 + index;
    mesh.position.y += Math.cos(time * 1.5 + index) * 0.0015;

    mesh.position.z = (scrollY * 0.0012) - 5 + (index * 2);
  };

  return octahedron;
}

// Crear grupo de partículas
export function createParticleField(count = 1000, color = 0x00ffff) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const color1 = new THREE.Color(0x00ffff);
  const color2 = new THREE.Color(0xff00ff);

  for (let i = 0; i < count * 3; i += 3) {
    // Posiciones aleatorias en un cubo
    positions[i] = (Math.random() - 0.5) * 50;
    positions[i + 1] = (Math.random() - 0.5) * 50;
    positions[i + 2] = (Math.random() - 0.5) * 50;

    // Colores aleatorios entre dos colores
    const mixedColor = color1.clone().lerp(color2, Math.random());
    colors[i] = mixedColor.r;
    colors[i + 1] = mixedColor.g;
    colors[i + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);

  particles.userData.animate = (mesh, time, scrollY) => {
    mesh.rotation.y = time * 0.05;
    mesh.position.z = (scrollY * 0.0005) - 10;
  };

  return particles;
}

// Crear wireframe sphere
export function createWireframeSphere(radius = 2, color = 0x00ffff) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = createWireframeMaterial(color);
  const sphere = new THREE.Mesh(geometry, material);

  sphere.userData.animate = (mesh, time, scrollY, index) => {
    mesh.rotation.x = time * 0.1;
    mesh.rotation.y = time * 0.2;

    mesh.position.z = (scrollY * 0.001) - 8;
    mesh.scale.setScalar(1 + Math.sin(time) * 0.05);
  };

  return sphere;
}

// Crear torus knot (nudo toroidal)
export function createTorusKnot(radius = 1, tube = 0.3, color = 0xff00ff) {
  const geometry = new THREE.TorusKnotGeometry(radius, tube, 100, 16);
  const material = createGlowMaterial(color, color);
  const torusKnot = new THREE.Mesh(geometry, material);

  torusKnot.userData.animate = (mesh, time, scrollY, index) => {
    mesh.rotation.x = time * 0.3;
    mesh.rotation.y = time * 0.5;

    mesh.position.z = (scrollY * 0.002) - 5 + (index * 2);
  };

  return torusKnot;
}

// Función helper para posicionar objetos en una grilla
export function positionInGrid(object, row, col, spacing = 3) {
  object.position.x = (col - 1) * spacing;
  object.position.y = (row - 1) * spacing;
  return object;
}

// Función helper para posicionar objetos aleatoriamente
export function positionRandomly(object, rangeX = 10, rangeY = 10, rangeZ = 10) {
  object.position.x = (Math.random() - 0.5) * rangeX;
  object.position.y = (Math.random() - 0.5) * rangeY;
  object.position.z = (Math.random() - 0.5) * rangeZ;
  return object;
}
