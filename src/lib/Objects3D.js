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
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.3,
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

// ========== OBJETOS MEJORADOS CON SCROLL CONTROL ==========

/**
 * OBJETO CENTRAL - Lata 3D metálica realista (inspirado en Brew District)
 * Material sólido con reflejos, sin wireframe
 */
export function createHeroCentralObject() {
  const group = new THREE.Group();

  // ===== CILINDRO PRINCIPAL (CUERPO DE LA LATA) =====
  const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2.5, 64); // Más segmentos para suavidad

  // Material metálico SÓLIDO con gradiente naranja cálido
  const cylinderMaterial = new THREE.MeshStandardMaterial({
    color: 0xE8A66F, // Naranja claro #E8A66F
    metalness: 0.85, // Muy metálico
    roughness: 0.15, // Poco rugoso para reflejos brillantes
    emissive: 0xD4834F, // Emisión naranja cálido #D4834F
    emissiveIntensity: 0.2, // Brillo sutil
  });
  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinder.castShadow = true;
  cylinder.receiveShadow = true;

  // ===== TAPAS SUPERIOR E INFERIOR =====
  const capGeometry = new THREE.CylinderGeometry(1.05, 1.05, 0.1, 64);
  const capMaterial = new THREE.MeshStandardMaterial({
    color: 0xD4834F, // Naranja más oscuro para contraste
    metalness: 0.95,
    roughness: 0.05, // Muy brillante
    emissive: 0xC47340,
    emissiveIntensity: 0.15,
  });

  const topCap = new THREE.Mesh(capGeometry, capMaterial);
  topCap.position.y = 1.3;
  topCap.castShadow = true;

  const bottomCap = new THREE.Mesh(capGeometry, capMaterial);
  bottomCap.position.y = -1.3;
  bottomCap.castShadow = true;

  // ===== ANILLOS DECORATIVOS (DORADOS) =====
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(1.08, 0.04, 16, 100),
    new THREE.MeshStandardMaterial({
      color: 0xFFB347, // Dorado claro
      metalness: 1,
      roughness: 0.1,
      emissive: 0xE8A66F,
      emissiveIntensity: 0.3,
    })
  );
  ring1.rotation.x = Math.PI / 2;
  ring1.position.y = 0.9;
  ring1.castShadow = true;

  const ring2 = ring1.clone();
  ring2.position.y = -0.9;

  // ===== BANDA CENTRAL (ACENTO) =====
  const bandGeometry = new THREE.CylinderGeometry(1.02, 1.02, 0.3, 64);
  const bandMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFD700, // Dorado brillante
    metalness: 1,
    roughness: 0.05,
    emissive: 0xFFB347,
    emissiveIntensity: 0.4,
  });
  const band = new THREE.Mesh(bandGeometry, bandMaterial);
  band.position.y = 0;
  band.castShadow = true;

  // Ensamblar grupo
  group.add(cylinder);
  group.add(topCap);
  group.add(bottomCap);
  group.add(ring1);
  group.add(ring2);
  group.add(band);

  // ===== ANIMACIÓN SUAVE Y PROFESIONAL =====
  group.userData.animate = (mesh, time, scrollY) => {
    // Rotación fluida con scroll
    mesh.rotation.y = scrollY * 0.002; // Más lento y suave
    mesh.rotation.x = Math.sin(time * 0.2) * 0.05; // Oscilación muy sutil

    // Zoom progresivo con scroll
    const scrollProgress = Math.min(scrollY / 1500, 1);
    const scale = 1 + scrollProgress * 0.3; // Menos dramático
    mesh.scale.setScalar(scale);

    // Levitación suave
    mesh.position.y = Math.sin(time * 0.4) * 0.15;
  };

  return group;
}

/**
 * ESFERAS ORBITALES - Orbitan alrededor del objeto central
 */
export function createOrbitalSphere(radius = 0.3, orbitRadius = 3, color = 0x00ffff, offset = 0) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = createGlowMaterial(color, color);
  const sphere = new THREE.Mesh(geometry, material);

  sphere.userData.orbitRadius = orbitRadius;
  sphere.userData.orbitOffset = offset;

  sphere.userData.animate = (mesh, time, scrollY) => {
    const angle = time * 0.5 + mesh.userData.orbitOffset + scrollY * 0.002;
    mesh.position.x = Math.cos(angle) * mesh.userData.orbitRadius;
    mesh.position.z = Math.sin(angle) * mesh.userData.orbitRadius;
    mesh.position.y = Math.sin(time + mesh.userData.orbitOffset) * 0.5;

    // Rotación propia
    mesh.rotation.x = time;
    mesh.rotation.y = time * 0.5;

    // Pulso de escala
    const pulse = 1 + Math.sin(time * 2 + mesh.userData.orbitOffset) * 0.2;
    mesh.scale.setScalar(pulse);
  };

  return sphere;
}

/**
 * MORPHING SHAPE - Cambia de forma con el scroll
 */
export function createMorphingShape() {
  // Empezamos con un icosaedro
  const geometry = new THREE.IcosahedronGeometry(1.5, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    emissive: 0xff00ff,
    emissiveIntensity: 0.5,
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.85,
    wireframe: false
  });

  const shape = new THREE.Mesh(geometry, material);

  shape.userData.animate = (mesh, time, scrollY) => {
    // Rotación basada en scroll
    mesh.rotation.x = scrollY * 0.002;
    mesh.rotation.y = scrollY * 0.004;

    // Morphing: cambiar entre wireframe y sólido
    const scrollMod = (scrollY / 500) % 2;
    mesh.material.wireframe = scrollMod > 1;

    // Escala pulsante
    const scale = 1 + Math.sin(time) * 0.3;
    mesh.scale.setScalar(scale);

    // Movimiento ondulante
    mesh.position.y = Math.sin(scrollY * 0.01) * 2;
    mesh.position.z = -5 + Math.cos(scrollY * 0.005) * 2;
  };

  return shape;
}

/**
 * PARTICLE SPHERE - Esfera hecha de partículas que se expande/contrae
 */
export function createParticleSphere(particleCount = 2000, radius = 3) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color(0x00ffff);
  const color2 = new THREE.Color(0xff00ff);
  const color3 = new THREE.Color(0x00ff00);

  for (let i = 0; i < particleCount; i++) {
    // Distribuir partículas en una esfera
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // Colores aleatorios
    const mixFactor1 = Math.random();
    const mixFactor2 = Math.random();
    const mixedColor = color1.clone().lerp(color2, mixFactor1).lerp(color3, mixFactor2);

    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });

  const particleSphere = new THREE.Points(geometry, material);

  particleSphere.userData.animate = (mesh, time, scrollY) => {
    mesh.rotation.y = time * 0.1;
    mesh.rotation.x = Math.sin(time * 0.3) * 0.2;

    // Expandir/contraer con scroll
    const scrollFactor = Math.sin(scrollY * 0.005) * 0.5 + 1;
    mesh.scale.setScalar(scrollFactor);

    // Posición basada en scroll
    mesh.position.z = -8 + (scrollY * 0.003);
  };

  return particleSphere;
}

/**
 * GEOMETRIC TUNNEL - Crea un túnel de formas geométricas
 */
export function createGeometricTunnel(segmentCount = 20) {
  const group = new THREE.Group();

  for (let i = 0; i < segmentCount; i++) {
    const geometry = new THREE.TorusGeometry(2 + i * 0.2, 0.1, 16, 100);
    const hue = (i / segmentCount) * 0.5; // De cyan a magenta
    const color = new THREE.Color().setHSL(hue, 1, 0.5);

    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.4,
      wireframe: true
    });

    const torus = new THREE.Mesh(geometry, material);
    torus.position.z = -i * 3;
    group.add(torus);
  }

  group.userData.animate = (mesh, time, scrollY) => {
    // Mover el túnel hacia adelante con el scroll
    mesh.position.z = (scrollY * 0.05) % (segmentCount * 3);

    // Rotar todo el túnel
    mesh.rotation.z = time * 0.2;

    // Rotar cada segmento individualmente
    mesh.children.forEach((child, index) => {
      child.rotation.x = time * (0.3 + index * 0.05);
      child.rotation.y = time * (0.2 + index * 0.03);
    });
  };

  return group;
}

/**
 * HELIX - Espiral 3D que se desenrolla con scroll
 */
export function createHelix(count = 50, height = 20, radius = 3) {
  const group = new THREE.Group();

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 8; // 4 vueltas

    const geometry = new THREE.SphereGeometry(0.2, 16, 16);
    const color = new THREE.Color().setHSL(t * 0.5, 1, 0.5);
    const material = createGlowMaterial(color.getHex(), color.getHex());

    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.x = Math.cos(angle) * radius;
    sphere.position.y = (t - 0.5) * height;
    sphere.position.z = Math.sin(angle) * radius;

    sphere.userData.originalY = sphere.position.y;
    sphere.userData.index = i;

    group.add(sphere);
  }

  group.userData.animate = (mesh, time, scrollY) => {
    mesh.rotation.y = scrollY * 0.001;

    // Animar cada esfera individualmente
    mesh.children.forEach((sphere, index) => {
      const offset = index * 0.1;
      sphere.position.y = sphere.userData.originalY + Math.sin(time + offset) * 0.5;
      sphere.rotation.x = time + offset;
      sphere.rotation.y = time * 0.5 + offset;

      // Pulso de escala
      const pulse = 1 + Math.sin(time * 2 + offset) * 0.3;
      sphere.scale.setScalar(pulse);
    });
  };

  return group;
}

/**
 * INTERACTIVE PARTICLES - Partículas que reaccionan al mouse
 */
export function createInteractiveParticles(count = 3000) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const color1 = new THREE.Color(0x00ffff);
  const color2 = new THREE.Color(0xff00ff);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

    const mixedColor = color1.clone().lerp(color2, Math.random());
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;

    sizes[i] = Math.random() * 0.1 + 0.05;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(geometry, material);

  particles.userData.mouseX = 0;
  particles.userData.mouseY = 0;

  particles.userData.animate = (mesh, time, scrollY) => {
    const positions = mesh.geometry.attributes.position.array;

    for (let i = 0; i < positions.length; i += 3) {
      // Movimiento ondulante
      positions[i + 1] = Math.sin(time + positions[i] * 0.5) * 2;

      // Reacción al scroll
      positions[i + 2] += Math.sin(time + i) * 0.01;
    }

    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.rotation.y = time * 0.02;
  };

  return particles;
}

/**
 * DNA HELIX - Doble hélice de ADN
 */
export function createDNAHelix(segments = 60, height = 15) {
  const group = new THREE.Group();

  for (let i = 0; i < segments; i++) {
    const t = i / segments;
    const angle = t * Math.PI * 12;

    // Primera hebra
    const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 16, 16),
      createGlowMaterial(0x00ffff, 0x00ffff)
    );
    sphere1.position.x = Math.cos(angle) * 2;
    sphere1.position.y = (t - 0.5) * height;
    sphere1.position.z = Math.sin(angle) * 2;

    // Segunda hebra (opuesta)
    const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 16, 16),
      createGlowMaterial(0xff00ff, 0xff00ff)
    );
    sphere2.position.x = Math.cos(angle + Math.PI) * 2;
    sphere2.position.y = (t - 0.5) * height;
    sphere2.position.z = Math.sin(angle + Math.PI) * 2;

    // Conexión entre hebras (cada 3 segmentos)
    if (i % 3 === 0) {
      const points = [sphere1.position.clone(), sphere2.position.clone()];
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      group.add(line);
    }

    group.add(sphere1);
    group.add(sphere2);
  }

  group.userData.animate = (mesh, time, scrollY) => {
    mesh.rotation.y = time * 0.3 + scrollY * 0.001;
    mesh.position.z = -10 + Math.sin(scrollY * 0.003) * 3;
  };

  return group;
}
