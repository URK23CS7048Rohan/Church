"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export function GenerativeArtScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
    currentMount.appendChild(renderer.domElement);

    // Optimized detail size for mobile smooth rendering
    const geometry = new THREE.IcosahedronGeometry(1.2, 32);
    
    // ShaderMaterial with branded gold coloring
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointLightPos: { value: new THREE.Vector3(0, 0, 5) },
        color: { value: new THREE.Color("#C9A84C") }, // Branded gold color
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        // Perlin Noise helper
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
                        i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }

        void main() {
            vNormal = normal;
            vPosition = position;
            float displacement = snoise(position * 2.0 + time * 0.5) * 0.18;
            vec3 newPosition = position + normal * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform vec3 pointLightPos;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
            vec3 normal = normalize(vNormal);
            vec3 lightDir = normalize(pointLightPos - vPosition);
            float diffuse = max(dot(normal, lightDir), 0.0);
            
            // Fresnel effect for outline glow
            float fresnel = 1.0 - dot(normal, vec3(0.0, 0.0, 1.0));
            fresnel = pow(fresnel, 2.0);
            
            vec3 finalColor = color * diffuse + color * fresnel * 0.5;
            
            gl_FragColor = vec4(finalColor, 0.8);
        }
      `,
      wireframe: true,
      transparent: true,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 1. Solid gold inner core
    const innerGeometry = new THREE.SphereGeometry(0.85, 32, 32);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C9A84C"),
      metalness: 0.9,
      roughness: 0.15,
      flatShading: false,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    // 2. Floating stardust field (particles)
    const particleCount = 180;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.1 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.3, "rgba(201, 168, 76, 0.8)");
        grad.addColorStop(1, "rgba(201, 168, 76, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      map: createParticleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // 3. Dynamic lights for standard material reflection
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0xffd700, 2.5, 40);
    light1.position.set(3, 4, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x7eb8f7, 2.0, 40);
    light2.position.set(-3, -4, 2);
    scene.add(light2);

    const interactiveLight = new THREE.PointLight(0xfff5e6, 2.0, 30);
    interactiveLight.position.set(0, 0, 4);
    lightRef.current = interactiveLight;
    scene.add(interactiveLight);

    // Smooth entry transition scale
    mesh.scale.set(0.1, 0.1, 0.1);
    innerMesh.scale.set(0.1, 0.1, 0.1);
    particleSystem.scale.set(0.1, 0.1, 0.1);

    let frameId: number;
    const animate = (t: number) => {
      const timeVal = t * 0.0003;
      material.uniforms.time.value = timeVal;
      
      mesh.rotation.y += 0.0003;
      mesh.rotation.x += 0.0001;

      innerMesh.rotation.y -= 0.0005;
      innerMesh.rotation.z += 0.0002;

      particleSystem.rotation.y += 0.001;
      particleSystem.rotation.x -= 0.0004;

      if (mesh.scale.x < 1.0) {
        const newScale = Math.min(1.0, mesh.scale.x + 0.035);
        mesh.scale.set(newScale, newScale, newScale);
        innerMesh.scale.set(newScale, newScale, newScale);
        particleSystem.scale.set(newScale, newScale, newScale);
      }

      light1.position.x = Math.cos(timeVal) * 3;
      light1.position.z = Math.sin(timeVal) * 3;
      light1.position.y = Math.sin(timeVal * 0.5) * 2;

      light2.position.x = -Math.cos(timeVal * 0.7) * 3;
      light2.position.z = -Math.sin(timeVal * 0.7) * 3;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate(0);

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    const handleMove = (clientX: number, clientY: number) => {
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      const vec = new THREE.Vector3(x, y, 0.5).unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(dist));
      
      if (lightRef.current) {
        lightRef.current.position.copy(pos);
      }
      material.uniforms.pointLightPos.value.copy(pos);

      // Interactive subtle tilt based on mouse positioning
      mesh.rotation.x = y * 0.15;
      mesh.rotation.y = x * 0.15;
      innerMesh.rotation.x = -y * 0.12;
      innerMesh.rotation.y = -x * 0.12;
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />;
}
