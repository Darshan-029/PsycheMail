import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import React from "react";
import Typed from "typed.js";

const Hero = () => {
  const sphere3DRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Check initially
    checkIsDesktop();

    // Listen for resize events
    window.addEventListener("resize", checkIsDesktop);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  useEffect(() => {
    // Skip 3D rendering if element not available or on mobile
    if (!sphere3DRef.current || !isDesktop) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      300 / 300, // Square aspect ratio for the small 3D element
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(300, 300);
    sphere3DRef.current.appendChild(renderer.domElement);

    // Create a sphere geometry
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);

    // Create shader material for a cool effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vec3 color1 = vec3(0.353, 0.333, 1.0); // #5A55FF
          vec3 color2 = vec3(0.498, 0.867, 1.0); // #7FDDFF
          vec3 color3 = vec3(1.0, 0.702, 0.4);   // #FFB366

          float noise = sin(vPosition.x * 10.0 + time) * sin(vPosition.y * 10.0 + time) * sin(vPosition.z * 10.0 + time);
          noise = (noise + 1.0) / 2.0; // Normalize to 0-1

          // Create gradient based on position and time
          vec3 finalColor = mix(color1, color2, noise);
          finalColor = mix(finalColor, color3, sin(time * 0.5) * 0.5 + 0.5);

          // Add glow effect
          float edge = 1.0 - max(0.0, dot(vec3(0.0, 0.0, 1.0), normalize(vPosition)));
          finalColor += edge * 0.5 * vec3(0.498, 0.867, 1.0);

          gl_FragColor = vec4(finalColor, 0.8);
        }
      `,
      transparent: true,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update time uniform for shader
      material.uniforms.time.value += 0.01;

      // Rotate sphere
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.007;

      renderer.render(scene, camera);
    };

    animate();
    const typed = new Typed(".auto-type", {
      strings: [
        "Decode Emotions.",
        "Automate Responses.",
        "Boost Productivity.",
      ],
      typeSpeed: 120,
      backSpeed: 120,
      loop: true,
      showCursor: false,
    });

    // Clean up
    return () => {
      if (sphere3DRef.current) {
        sphere3DRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [isDesktop]);

  return (
    <div className="glass-card mb-4 main-card" style={{ margin: "auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "90px",
          padding: "40px 20px",
          position: "relative",
        }}
      >
        {/* 3D Element */}
        <div
          ref={sphere3DRef}
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "300px",
            height: "300px",
            display: isDesktop ? "block" : "none",
          }}
        />

        <div style={{ maxWidth: "600px" }}>
          <h1
            className="text-gradient"
            style={{ fontSize: "3rem", marginBottom: "1rem" }}
          >
            <span className="auto-type"></span>
            <span className="blinking-cursor">|</span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            InScribe AI analyzes sentiment from user feedback and generates
            intelligent email responses. Save time, ensure consistency, and
            never miss the emotional tone of your communications.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button className="btn btn-primary">Try InScribe AI Now</button>
            <button className="btn btn-secondary">See How It Works</button>
          </div>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div className="tag tag-Positive">Positive</div>
              <span>AI Sentiment</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div className="tag tag-urgent">Urgent</div>
              <span>Smart Priority</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div className="tag tag-informative">Email</div>
              <span>Auto Response</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
