import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Menu, X, Phone, Mail, Instagram, ArrowRight, Play, TrendingUp, Clock, Cpu, Moon, Sun, Rocket, Zap, Settings2, ShieldCheck, Lightbulb, Target, Check, Globe } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as THREE from 'three';
import PerspectiveMarquee from './components/PerspectiveMarquee';
import ImprovedContactForm from './components/ImprovedContactForm';
import ClientLogos from './components/ClientLogos';
import ContactPage from './pages/ContactPage';
import { useLanguage } from './LanguageContext';
import { translations } from './i18n';

// Lazy-loaded components for code-splitting
const ContainerScroll = lazy(() => import('./components/ContainerScrollAnimation').then(m => ({ default: m.ContainerScroll })));
const StaggerTestimonials = lazy(() => import('./components/StaggerTestimonials'));
const Cube3D = lazy(() => import('./components/Cube3D'));

const LoadingFallback = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full" />
  </div>
);

// ─── THREE.JS Physics Engine Classes ────────────────────────────

class SceneManager {
  constructor(canvas, isDarkMode) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.isDarkMode = isDarkMode;
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 30;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x030712, 0);
    this.ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 1.5 : 2.5);
    this.scene.add(this.ambientLight);
    this.pointLight = new THREE.PointLight(0xffffff, isDarkMode ? 3 : 2);
    this.pointLight.position.set(10, 10, 10);
    this.scene.add(this.pointLight);
    this.physics = null;
    this.mesh = null;
    this.mousePos = { x: 0, y: 0 };
    this.targetMousePos = { x: 0, y: 0 };
    this.mouseMoveHandler = null;
    this.resizeHandler = null;
    this.setupEventListeners();
  }
  setupEventListeners() {
    this.mouseMoveHandler = (e) => {
      this.targetMousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    this.resizeHandler = () => this.handleResize();
    window.addEventListener('mousemove', this.mouseMoveHandler);
    window.addEventListener('resize', this.resizeHandler);
  }
  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  setPhysics(physics) { this.physics = physics; }
  setMesh(mesh) { this.mesh = mesh; }
  updateMousePos() {
    this.mousePos.x += (this.targetMousePos.x - this.mousePos.x) * 0.1;
    this.mousePos.y += (this.targetMousePos.y - this.mousePos.y) * 0.1;
  }
  render() {
    this.updateMousePos();
    this.renderer.render(this.scene, this.camera);
  }
  dispose() {
    this.renderer.dispose();
    if (this.mouseMoveHandler) window.removeEventListener('mousemove', this.mouseMoveHandler);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
  }
}

class PhysicsEngine {
  constructor(count = 200) {
    this.count = count;
    this.positions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);
    this.gravity = 0.4;
    this.friction = 0.995;
    this.wallBounce = 0.2;
    for (let i = 0; i < count; i++) {
      this.positions[i * 3] = (Math.random() - 0.5) * 50;
      this.positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      this.positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      this.velocities[i * 3] = (Math.random() - 0.5) * 0.5;
      this.velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      this.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
  }
  update(mousePos) {
    for (let i = 0; i < this.count; i++) {
      const x = this.positions[i * 3];
      const y = this.positions[i * 3 + 1];
      const z = this.positions[i * 3 + 2];
      this.velocities[i * 3 + 1] -= this.gravity;
      this.velocities[i * 3] *= this.friction;
      this.velocities[i * 3 + 1] *= this.friction;
      this.velocities[i * 3 + 2] *= this.friction;
      this.positions[i * 3] += this.velocities[i * 3];
      this.positions[i * 3 + 1] += this.velocities[i * 3 + 1];
      this.positions[i * 3 + 2] += this.velocities[i * 3 + 2];
      if (this.positions[i * 3] > 25) { this.positions[i * 3] = 25; this.velocities[i * 3] *= -this.wallBounce; }
      if (this.positions[i * 3] < -25) { this.positions[i * 3] = -25; this.velocities[i * 3] *= -this.wallBounce; }
      if (this.positions[i * 3 + 1] > 20) { this.positions[i * 3 + 1] = 20; this.velocities[i * 3 + 1] *= -this.wallBounce; }
      if (this.positions[i * 3 + 1] < -25) { this.positions[i * 3 + 1] = -25; this.velocities[i * 3 + 1] *= -this.wallBounce; }
      if (this.positions[i * 3 + 2] > 25) { this.positions[i * 3 + 2] = 25; this.velocities[i * 3 + 2] *= -this.wallBounce; }
      if (this.positions[i * 3 + 2] < -25) { this.positions[i * 3 + 2] = -25; this.velocities[i * 3 + 2] *= -this.wallBounce; }
      const dx = mousePos.x * 25 - x;
      const dy = mousePos.y * 20 - y;
      const dz = -z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < 10) {
        const force = (10 - dist) * 0.3;
        this.velocities[i * 3] += (dx / dist) * force;
        this.velocities[i * 3 + 1] += (dy / dist) * force;
        this.velocities[i * 3 + 2] += (dz / dist) * force;
      }
    }
  }
}

class MeshRenderer {
  constructor(scene, count, isDarkMode) {
    this.count = count;
    const geometry = new THREE.IcosahedronGeometry(0.3, 4);
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.7,
      roughness: 0.3,
      color: isDarkMode ? 0x6366f1 : 0x4F46E5,
      emissive: isDarkMode ? 0x6366f1 : 0x4F46E5,
      emissiveIntensity: 0.2
    });
    this.mesh = new THREE.InstancedMesh(geometry, material, count);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    const colors = [];
    const colorArray = isDarkMode ? [0x6366f1, 0xa855f7, 0x0ea5e9] : [0x4F46E5, 0x8B5CF6, 0x06B6D4];
    for (let i = 0; i < count; i++) {
      const color = colorArray[i % 3];
      colors.push(((color >> 16) & 255) / 255, ((color >> 8) & 255) / 255, (color & 255) / 255);
    }
    this.geometry = geometry;
    this.material = material;
    this.mesh.geometry.setAttribute('instanceColor', new THREE.BufferAttribute(new Float32Array(colors), 3));
    scene.add(this.mesh);
  }
  updatePositions(positions) {
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < this.count; i++) {
      matrix.setPosition(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      this.mesh.setMatrixAt(i, matrix);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }
  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}

const InteractiveHeroBackground = ({ isDarkMode = true }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView || !containerRef.current) return;
    const count = window.innerWidth > 1024 ? 200 : (window.innerWidth > 640 ? 150 : 100);
    const sceneManager = new SceneManager(containerRef.current, isDarkMode);
    sceneRef.current = sceneManager;
    const physics = new PhysicsEngine(count);
    sceneManager.setPhysics(physics);
    const renderer = new MeshRenderer(sceneManager.scene, count, isDarkMode);
    sceneManager.setMesh(renderer.mesh);
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      physics.update(sceneManager.mousePos);
      renderer.updatePositions(physics.positions);
      sceneManager.render();
    };
    animate();
    const handleResize = () => { sceneManager.handleResize(); };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sceneManager.dispose();
    };
  }, [isDarkMode, isInView]);
  return <canvas ref={containerRef} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />;
};

// ─── Tech Code Particles (Código flotante) ─────────────────────
const TechParticles = () => {
  const codeSymbols = ['<', '>', '/', '{', '}', '(', ')', '0', '1', '[', ']', '=', '&', '|'];
  const particleCount = window.innerWidth > 1024 ? 30 : 15;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 2,
    size: Math.random() * 1.5 + 0.8
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute text-indigo-400/30 font-mono text-sm font-bold"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: `${particle.size}rem`
          }}
          animate={{
            y: [0, -200, 0],
            opacity: [0, 0.6, 0],
            x: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {particle.symbol}
        </motion.div>
      ))}
    </div>
  );
};

// ─── Holograma animado (Líneas pulsantes) ─────────────────────
const HologramEffect = () => {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none" style={{ opacity: 0.15 }}>
      <defs>
        <linearGradient id="holoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {/* Líneas verticales pulsantes */}
      {[...Array(8)].map((_, i) => (
        <motion.line
          key={`v-${i}`}
          x1={150 + i * 150}
          y1="0"
          x2={150 + i * 150}
          y2="800"
          stroke="url(#holoGradient)"
          strokeWidth="2"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
        />
      ))}

      {/* Líneas horizontales pulsantes */}
      {[...Array(6)].map((_, i) => (
        <motion.line
          key={`h-${i}`}
          x1="0"
          y1={100 + i * 120}
          x2="1200"
          y2={100 + i * 120}
          stroke="url(#holoGradient)"
          strokeWidth="2"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </svg>
  );
};

// ─── Cinematic Tech Scene (Escena cinematográfica) ────────────
const CinematicTechScene = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(10, 14, 39, 0.99) 100%)' }} />
      <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
          </linearGradient>
          <filter id="techGlow"><feGaussianBlur stdDeviation="3" /><feComponentTransfer><feFuncA type="linear" slope="0.8" /></feComponentTransfer></filter>
        </defs>
        {[...Array(12)].map((_, i) => (
          <motion.line key={`grid-h${i}`} x1="0" y1={65 + i * 65} x2="1200" y2={65 + i * 65} stroke="url(#techGrad)" strokeWidth="2" filter="url(#techGlow)" animate={{ opacity: [0.1, 0.35, 0.1] }} transition={{ duration: 5 + i * 0.3, repeat: Infinity, ease: 'sine.inOut' }} />
        ))}
        {[...Array(18)].map((_, i) => (
          <motion.line key={`grid-v${i}`} x1={66 + i * 67} y1="0" x2={66 + i * 67 + 250} y2="800" stroke="url(#techGrad)" strokeWidth="1.5" filter="url(#techGlow)" animate={{ opacity: [0.08, 0.3, 0.08] }} transition={{ duration: 6 + Math.random() * 2, repeat: Infinity, delay: i * 0.12 }} />
        ))}
        {[...Array(10)].map((_, i) => {
          const x1 = 150 + Math.random() * 900, y1 = 100 + Math.random() * 600, x2 = x1 + (Math.random() * 300 - 150), y2 = y1 + (Math.random() * 250 - 125);
          return (
            <g key={`circuit${i}`}>
              <motion.path d={`M ${x1} ${y1} Q ${(x1 + x2) / 2 + 30} ${(y1 + y2) / 2} ${x2} ${y2}`} stroke={i % 2 ? "#0ea5e9" : "#6366f1"} strokeWidth="2" fill="none" filter="url(#techGlow)" animate={{ strokeDashoffset: [100, -100], opacity: [0, 0.7, 0] }} transition={{ duration: 4 + i * 0.25, repeat: Infinity }} strokeDasharray="5,5" />
              <motion.circle cx={x2} cy={y2} r="4" fill={i % 2 ? "#0ea5e9" : "#6366f1"} filter="url(#techGlow)" animate={{ r: [2, 6, 2], opacity: [0.2, 1, 0.2] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }} />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div key={`particle${i}`} className="absolute rounded-full blur-sm" style={{ width: Math.random() * 3 + 1.5, height: Math.random() * 3 + 1.5, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, background: ['#6366f1', '#0ea5e9', '#a855f7'][i % 3], boxShadow: `0 0 ${Math.random() * 12 + 6}px currentColor` }} animate={{ y: [0, -200, 0], x: [0, Math.random() * 80 - 40, 0], opacity: [0.1, 0.8, 0] }} transition={{ duration: Math.random() * 14 + 16, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 8 }} />
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)' }} />
    </div>
  );
};

// ─── Scan lines (Efecto de escaneo) ──────────────────────────
const ScanLines = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(99, 102, 241, 0.03) 0px, rgba(99, 102, 241, 0.03) 1px, transparent 1px, transparent 2px)',
        zIndex: 2
      }}
      animate={{ backgroundPosition: ['0px 0px', '0px 100px'] }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />
  );
};

// ─── MAGIC UI: Particles Background ───────────────────────────────
const Particles = ({ quantity = 100, className = '', color = '#6366f1' }) => {
  const particles = Array.from({ length: quantity }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 2
  }));

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            opacity: 0.3
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
};

// ─── MAGIC UI: Retro Grid ────────────────────────────────────────
const RetroGrid = ({ angle = 65 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(${angle}deg, transparent 24%, rgba(99, 102, 241, 0.05) 25%, rgba(99, 102, 241, 0.05) 26%, transparent 27%, transparent 74%, rgba(99, 102, 241, 0.05) 75%, rgba(99, 102, 241, 0.05) 76%, transparent 77%, transparent), linear-gradient(${angle + 90}deg, transparent 24%, rgba(99, 102, 241, 0.05) 25%, rgba(99, 102, 241, 0.05) 26%, transparent 27%, transparent 74%, rgba(99, 102, 241, 0.05) 75%, rgba(99, 102, 241, 0.05) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px',
          backgroundPosition: `${mousePosition.x / 100}px ${mousePosition.y / 100}px`
        }}
      />
    </div>
  );
};

// ─── MAGIC UI: Shiny Button ──────────────────────────────────────
const ShinyButton = ({ children, variant = 'primary', onClick = () => {} }) => {
  const isSecondary = variant === 'secondary';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-8 py-3 rounded-full font-space-grotesk font-bold overflow-hidden group transition-all ${
        isSecondary
          ? 'bg-transparent border-2 border-indigo-500 text-white hover:bg-indigo-500/10'
          : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-lg hover:shadow-purple-500/50'
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {!isSecondary && (
        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.button>
  );
};

// ─── Morphing Shapes Background ────────────────────────────────
const MorphingShapes = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.svg
        className="absolute w-full h-full"
        viewBox="0 0 1200 600"
        initial={{ opacity: 0.15 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </defs>

        <motion.circle
          cx="200"
          cy="150"
          r="150"
          fill="url(#morphGradient)"
          filter="url(#blur)"
          animate={{
            cx: [200, 300, 200],
            cy: [150, 250, 150],
            r: [150, 180, 150]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        <motion.path
          d="M 1000 200 Q 1100 100 1200 200 T 1200 400 Q 1100 500 1000 400 T 1000 200"
          fill="url(#morphGradient)"
          filter="url(#blur)"
          animate={{
            d: [
              'M 1000 200 Q 1100 100 1200 200 T 1200 400 Q 1100 500 1000 400 T 1000 200',
              'M 1000 150 Q 1150 80 1200 200 T 1200 450 Q 1100 550 1000 400 T 1000 150',
              'M 1000 200 Q 1100 100 1200 200 T 1200 400 Q 1100 500 1000 400 T 1000 200'
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.svg>
    </div>
  );
};

// ─── MAGIC UI: Hero Video Dialog (Enhanced) ────────────────────
const HeroVideoDialog = ({ thumbnailSrc }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <motion.div
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 aspect-video flex items-center justify-center overflow-hidden">
          <img
            src={thumbnailSrc}
            alt="Video de demostración: sistema automático de captura y cierre de leads"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all" />
          <motion.div
            className="relative z-10 bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.2 }}
          >
            <Play className="w-12 h-12 text-white fill-white" />
          </motion.div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/40 group-hover:to-purple-500/40 transition-all" />
        </div>
      </motion.div>

      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-2xl">
              <div className="relative rounded-lg overflow-hidden bg-black aspect-video flex items-center justify-center">
                <img
                  src={thumbnailSrc}
                  alt="Demostración en vivo del pipeline de automatización: captura, calificación y cierre de clientes"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <motion.div
                  className="relative z-10 bg-white/20 backdrop-blur-sm rounded-full p-8"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="w-16 h-16 text-white fill-white" />
                </motion.div>
              </div>
              <p className="text-slate-400 text-sm text-center mt-4 font-dm-sans">
                Video de demostración - Integración de solución AALTI SYSTEMS
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// ─── Testimonial Card with 3D Rotation ────────────────────────
// ─── Bento Grid Item ──────────────────────────────────────────
const BentoCard = ({ icon: Icon, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(99, 102, 241, 0.3)' }}
      className="group relative p-8 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/20 via-purple-950/10 to-transparent backdrop-blur-xl hover:border-indigo-500/50 transition-all"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all" />
      <div className="relative z-10">
        <div className="w-12 h-12 mb-4 text-indigo-400">
          <Icon className="w-full h-full" strokeWidth={1.5} />
        </div>
        <h3 className="font-space-grotesk text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-300 font-dm-sans leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};


// ─── Contact Form Modal ────────────────────────────────────────
// ─── Marquee Component ────────────────────────────────────────
const Marquee = ({ children, speed = 50 }) => {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-transparent via-slate-900 to-transparent py-8">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-12">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ─── Navigation Header ─────────────────────────────────────────
const Header = ({ isDarkMode, setIsDarkMode, language, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed w-full z-40 transition-all ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-indigo-500/20'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Aalti Systems"
            className="h-10 w-auto"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className="text-white font-space-grotesk font-bold text-lg">AALTI SYSTEMS</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a href="tel:+34647119040" className="p-2 hover:bg-indigo-500/20 rounded-full transition" title="Teléfono">
            <Phone className="w-5 h-5 text-indigo-400" />
          </a>
          <a href="mailto:aaltistudio@gmail.com" className="p-2 hover:bg-indigo-500/20 rounded-full transition" title="Email">
            <Mail className="w-5 h-5 text-indigo-400" />
          </a>
          <a href="https://wa.me/34647119040" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-green-500/20 rounded-full transition" title="WhatsApp">
            <Phone className="w-5 h-5 text-green-400" />
          </a>
          <a href="https://instagram.com/aaltisystems" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-pink-500/20 rounded-full transition" title="Instagram">
            <Instagram className="w-5 h-5 text-pink-400" />
          </a>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 hover:bg-indigo-500/20 rounded-full transition"
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-400" />}
          </button>
          <button
            onClick={toggleLanguage}
            className="p-2 hover:bg-purple-500/20 rounded-full transition"
            title={language === 'es' ? 'English' : 'Español'}
            aria-label={language === 'es' ? 'Cambiar a inglés' : 'Cambiar a español'}
          >
            <Globe className="w-5 h-5 text-purple-400" />
          </button>
          <span className="text-xs font-dm-sans text-slate-400 font-bold ml-2 min-w-max">
            {language.toUpperCase()}
          </span>
          <a href="tel:+34647119040" className="text-white text-sm font-dm-sans ml-3">+34 647 119 040</a>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-indigo-500/20 p-4 space-y-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <a href="tel:+34647119040" className="text-white text-sm flex items-center gap-2">
            <Phone className="w-4 h-4" /> +34 647 119 040
          </a>
          <a href="mailto:aaltistudio@gmail.com" className="text-white text-sm flex items-center gap-2">
            <Mail className="w-4 h-4" /> aaltistudio@gmail.com
          </a>
          <div className="flex gap-2">
            <a href="https://wa.me/34647119040" target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 bg-green-500/20 rounded-lg text-white text-sm flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> WhatsApp
            </a>
            <a href="https://instagram.com/aaltisystems" target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 bg-pink-500/20 rounded-lg text-white text-sm flex items-center justify-center gap-2">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

// ─── Main App Component ────────────────────────────────────────
export default function App() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [showContactForm, setShowContactForm] = useState(false);
  const [showContactPage, setShowContactPage] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  if (showContactPage) {
    return <ContactPage onBack={() => setShowContactPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; }
        .font-dm-sans { font-family: 'DM Sans', sans-serif; }
        .text-gradient { background: linear-gradient(135deg, #6366f1, #a855f7, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      <RetroGrid angle={65} />
      <Particles quantity={100} color="#6366f1" />

      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} language={language} toggleLanguage={toggleLanguage} />

      <ImprovedContactForm isOpen={showContactForm} onClose={() => setShowContactForm(false)} />

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20 overflow-hidden">
        {/* Three.js Physics Background */}
        <InteractiveHeroBackground isDarkMode={isDarkMode} />

        {/* Hero Content */}
        <motion.div
          className="text-center max-w-4xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo Animated */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 1 }}
          >
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <img
                src="/logo.png"
                alt="AALTI SYSTEMS - Automatización de ventas B2B con inteligencia artificial"
                className="h-20 md:h-28 w-auto drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.5))',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* Glow halo around logo */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent)',
                  filter: 'blur(20px)',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          <motion.p
            className="text-indigo-400 text-sm md:text-base font-space-grotesk font-bold mb-4 uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t.heroMain.label}
          </motion.p>

          <motion.h1
            className="text-gradient text-5xl md:text-7xl font-space-grotesk font-bold mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {t.heroMain.headline}
          </motion.h1>

          <motion.p
            className="text-slate-300 text-lg md:text-xl font-dm-sans mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t.heroMain.description}
          </motion.p>

          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <button onClick={() => setShowContactPage(true)}>
              <ShinyButton variant="primary">
                {t.heroMain.cta}
                <ArrowRight className="w-4 h-4" />
              </ShinyButton>
            </button>
          </motion.div>

          {/* Tech accent line */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent max-w-sm mx-auto"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          />
        </motion.div>
      </section>

      {/* ─── CLIENT LOGOS (SOCIAL PROOF) ─── */}
      <ClientLogos language={language} />

      {/* ─── AI PLATFORMS PERSPECTIVE MARQUEE ─── */}
      <section className="relative py-40 overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950/30 to-slate-950">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"
            animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-4 mb-20 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center space-y-4">
            <motion.p
              className="text-cyan-400 text-sm md:text-base font-space-grotesk font-bold uppercase tracking-widest"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {t.aiEcosystem.label}
            </motion.p>
            <motion.h2
              className="text-gradient text-4xl md:text-5xl font-space-grotesk font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t.aiEcosystem.title}
            </motion.h2>
            <motion.p
              className="text-slate-400 text-lg font-dm-sans max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.aiEcosystem.description}
            </motion.p>
          </div>
        </motion.div>

        {/* Perspective Marquee Container */}
        <motion.div
          className="relative h-96 overflow-hidden rounded-3xl border-2 border-indigo-500/30 bg-gradient-to-b from-slate-900/50 to-slate-950 mx-4 md:mx-auto md:max-w-6xl backdrop-blur-sm shadow-2xl z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <PerspectiveMarquee
            items={[
              'OpenAI GPT-4',
              'Claude 3.5',
              'Google Gemini',
              'Anthropic',
              'Perplexity AI',
              'Cohere Command',
              'Mistral 7B',
              'LLaMA 2',
            ]}
            fontSize={32}
            color="#6366f1"
            fontWeight={700}
            rotateY={-25}
            rotateX={8}
            perspective={1200}
            background="#0f172a"
            fadeColor="#030712"
            speed={0.8}
            className="w-full h-full"
          />

          {/* Enhanced overlay gradient for depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-slate-950 via-transparent to-slate-950 opacity-50" />
        </motion.div>

        {/* Feature Grid - No empty spaces */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mt-20 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="relative group p-6 rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent hover:border-indigo-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute top-4 right-4 text-indigo-400"><Rocket className="w-5 h-5" /></div>
            <h3 className="text-indigo-400 font-space-grotesk font-bold mb-2">{t.features.compatible}</h3>
            <p className="text-slate-400 text-sm font-dm-sans">{t.features.compatibleDesc}</p>
          </motion.div>

          <motion.div
            className="relative group p-6 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent hover:border-purple-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute top-4 right-4 text-purple-400"><Zap className="w-5 h-5" /></div>
            <h3 className="text-purple-400 font-space-grotesk font-bold mb-2">{t.features.availability}</h3>
            <p className="text-slate-400 text-sm font-dm-sans">{t.features.availabilityDesc}</p>
          </motion.div>

          <motion.div
            className="relative group p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent hover:border-cyan-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute top-4 right-4 text-cyan-400"><Settings2 className="w-5 h-5" /></div>
            <h3 className="text-cyan-400 font-space-grotesk font-bold mb-2">{t.features.latency}</h3>
            <p className="text-slate-400 text-sm font-dm-sans">{t.features.latencyDesc}</p>
          </motion.div>

          <motion.div
            className="relative group p-6 rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-transparent hover:border-pink-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute top-4 right-4 text-pink-400"><ShieldCheck className="w-5 h-5" /></div>
            <h3 className="text-pink-400 font-space-grotesk font-bold mb-2">{t.features.security}</h3>
            <p className="text-slate-400 text-sm font-dm-sans">{t.features.securityDesc}</p>
          </motion.div>
        </motion.div>

        {/* Additional info section */}
        <motion.div
          className="max-w-5xl mx-auto px-4 mt-20 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid md:grid-cols-2 gap-8 p-8 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-slate-900/50 to-indigo-950/20 backdrop-blur">
            <div>
              <h3 className="text-indigo-400 font-space-grotesk font-bold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-indigo-400" /> {t.capabilitiesSection.title}
              </h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                {t.capabilitiesSection.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400 shrink-0" /> {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-cyan-400 font-space-grotesk font-bold mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" /> {t.useCasesSection.title}
              </h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                {t.useCasesSection.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400 shrink-0" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── CUBE 3D SECTION ─── */}
      <section className="relative max-w-7xl mx-auto px-4 py-24">
        <motion.h2
          className="text-4xl md:text-5xl font-space-grotesk font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {t.cube3d.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Cube3D faces={t.cube3d.faces} />
          </Suspense>
        </motion.div>
      </section>

      {/* ─── BENTO GRID ─── */}
      <section className="relative max-w-7xl mx-auto px-4 py-24">
        <motion.h2
          className="text-4xl md:text-5xl font-space-grotesk font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {t.bentoGridSection.title}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          <BentoCard
            icon={TrendingUp}
            title={t.bentoGridSection.card1.title}
            description={t.bentoGridSection.card1.description}
            index={0}
          />
          <BentoCard
            icon={Clock}
            title={t.bentoGridSection.card2.title}
            description={t.bentoGridSection.card2.description}
            index={1}
          />
          <BentoCard
            icon={Cpu}
            title={t.bentoGridSection.card3.title}
            description={t.bentoGridSection.card3.description}
            index={2}
          />
        </div>
      </section>

      {/* ─── SCROLL ANIMATION SECTION ─── */}
      <section className="relative overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <ContainerScroll
          titleComponent={
            <div className="space-y-4">
              <motion.p
                className="text-indigo-400 text-sm md:text-base font-space-grotesk font-bold uppercase tracking-widest"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {t.automation.label}
              </motion.p>
              <motion.h2
                className="text-gradient text-4xl md:text-6xl font-space-grotesk font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {t.automation.title}
              </motion.h2>
              <motion.p
                className="text-slate-400 text-lg md:text-xl font-dm-sans max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t.automation.description}
              </motion.p>
              {/* Stats row: Automatización + IA unificados */}
              <motion.div
                className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-indigo-400">{t.automation.stat1}</div>
                  <p className="text-slate-400 text-sm">{t.automation.stat1Label}</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-purple-400">{t.automation.stat2}</div>
                  <p className="text-slate-400 text-sm">{t.automation.stat2Label}</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">{t.automation.stat3}</div>
                  <p className="text-slate-400 text-sm">{t.automation.stat3Label}</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-pink-400">{t.automation.stat4}</div>
                  <p className="text-slate-400 text-sm">{t.automation.stat4Label}</p>
                </div>
              </motion.div>
            </div>
          }
        >
          <motion.div className="relative w-full h-full">
            {/* Background Image */}
            <motion.img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=720&fit=crop&q=80"
              alt={t.dashboard.alt}
              className="mx-auto rounded-2xl object-cover h-full w-full object-center"
              style={{ objectPosition: 'center' }}
              loading="lazy"
              width={1400}
              height={720}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            />

            {/* Overlay: métricas de automatización + IA en un único panel */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-between p-6 md:p-8">
              {/* Top: pills de tecnología IA */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-3"
              >
                <div className="bg-cyan-500/20 backdrop-blur border border-cyan-500/30 rounded-xl px-4 py-2">
                  <p className="text-cyan-300 text-sm font-bold">{t.dashboard.mlEngine}</p>
                  <p className="text-slate-300 text-xs">{t.dashboard.mlEngineDesc}</p>
                </div>
                <div className="bg-purple-500/20 backdrop-blur border border-purple-500/30 rounded-xl px-4 py-2">
                  <p className="text-purple-300 text-sm font-bold">{t.dashboard.nlp}</p>
                  <p className="text-slate-300 text-xs">{t.dashboard.nlpDesc}</p>
                </div>
                <div className="bg-indigo-500/20 backdrop-blur border border-indigo-500/30 rounded-xl px-4 py-2">
                  <p className="text-indigo-300 text-sm font-bold">{t.dashboard.realtime}</p>
                  <p className="text-slate-300 text-xs">{t.dashboard.realtimeDesc}</p>
                </div>
              </motion.div>

              {/* Bottom: métricas de negocio + barras de IA */}
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {/* Metrics grid */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className="bg-indigo-500/20 backdrop-blur border border-indigo-500/30 rounded-xl p-3 md:p-4">
                    <div className="text-2xl md:text-3xl font-bold text-indigo-300">+500</div>
                    <p className="text-slate-300 text-xs md:text-sm mt-1">{t.dashboard.leadsDaily}</p>
                    <motion.div
                      className="mt-2 h-1 bg-indigo-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.2, delay: 0.9 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                  <div className="bg-purple-500/20 backdrop-blur border border-purple-500/30 rounded-xl p-3 md:p-4">
                    <div className="text-2xl md:text-3xl font-bold text-purple-300">95%</div>
                    <p className="text-slate-300 text-xs md:text-sm mt-1">{t.dashboard.accuracyRate}</p>
                    <motion.div
                      className="mt-2 h-1 bg-purple-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.2, delay: 1 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                  <div className="bg-cyan-500/20 backdrop-blur border border-cyan-500/30 rounded-xl p-3 md:p-4">
                    <div className="text-2xl md:text-3xl font-bold text-cyan-300">24/7</div>
                    <p className="text-slate-300 text-xs md:text-sm mt-1">{t.dashboard.noIntervention}</p>
                    <motion.div
                      className="mt-2 h-1 bg-cyan-400 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1.2, delay: 1.1 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                </div>

                {/* AI progress bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-300 text-xs">{t.dashboard.predictionAccuracy}</span>
                      <span className="text-indigo-300 font-bold text-xs">98%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: '98%' }}
                        transition={{ duration: 1.5, delay: 1.1 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-300 text-xs">{t.dashboard.adaptationSpeed}</span>
                      <span className="text-purple-300 font-bold text-xs">Real-time</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 1.2 }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-300 text-xs">{t.dashboard.modelOptimization}</span>
                      <span className="text-cyan-300 font-bold text-xs">+45%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: '87%' }}
                        transition={{ duration: 1.5, delay: 1.3 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          </ContainerScroll>
        </Suspense>
      </section>

      {/* ─── TESTIMONIALS - STAGGER CAROUSEL ─── */}
      <section className="relative py-24">
        <motion.div
          className="max-w-7xl mx-auto px-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-center mb-4 text-gradient">
            {t.testimonials.title}
          </h2>
          <p className="text-center text-slate-400 max-w-2xl mx-auto">
            {t.testimonials.subtitle}
          </p>
        </motion.div>
        <Suspense fallback={<LoadingFallback />}>
          <StaggerTestimonials />
        </Suspense>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="relative max-w-4xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold mb-6 text-gradient">
            {t.ctaFinal.title}
          </h2>
          <p className="text-slate-300 text-lg font-dm-sans mb-8">
            {t.ctaFinal.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowContactForm(true)}>
              <ShinyButton variant="primary">
                {t.ctaFinal.cta}
                <ArrowRight className="w-4 h-4" />
              </ShinyButton>
            </button>
          </div>
        </motion.div>
      </section>


      {/* ─── FOOTER ─── */}
      <footer className="relative border-t border-indigo-500/20 py-12 text-center text-slate-400 text-sm font-dm-sans">
        <p className="mb-4">{t.footer.copyright}</p>
        <div className="flex justify-center gap-6 mb-4 flex-wrap">
          <a href="tel:+34647119040" className="hover:text-indigo-400 transition flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> +34 647 119 040
          </a>
          <a href="mailto:aaltistudio@gmail.com" className="hover:text-indigo-400 transition flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> aaltistudio@gmail.com
          </a>
        </div>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="https://wa.me/34647119040" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition flex items-center gap-1">
            <Phone className="w-4 h-4" /> WhatsApp
          </a>
          <a href="https://instagram.com/aaltisystems" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition flex items-center gap-1">
            <Instagram className="w-4 h-4" /> @aaltisystems
          </a>
        </div>
      </footer>
    </div>
  );
}
