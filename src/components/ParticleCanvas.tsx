"use client";

import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    class Particle {
      x = 0;
      y = 0;
      size = 0;
      speedX = 0;
      speedY = 0;
      rotation = 0;
      rotSpeed = 0;
      type: "leaf" | "mote" = "leaf";
      opacity = 0;
      color = "#4caf50";

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -100;
        this.size = Math.random() * 12 + 6;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.03;
        this.type = Math.random() > 0.45 ? "leaf" : "mote";
        this.opacity = Math.random() * 0.35 + 0.15;
        // Logo colors: sun gold (#ffd600), vivid grass green (#4caf50), lime green (#76c442)
        this.color = Math.random() > 0.75 ? "#ffd600" : Math.random() > 0.5 ? "#4caf50" : "#76c442";
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.008) * 0.6 + this.speedX;
        this.rotation += this.rotSpeed;

        if (this.y > height + 50 || this.x < -50 || this.x > width + 50) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;

        if (this.type === "leaf") {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 0.42, 0, 0, Math.PI * 2);
          ctx.fill();
          // Organic vein
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(-this.size * 0.75, 0);
          ctx.lineTo(this.size * 0.75, 0);
          ctx.stroke();
        } else {
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    const particleCount = window.innerWidth < 768 ? 20 : 44;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const p = new Particle();
      p.y = Math.random() * height;
      particles.push(p);
    }

    let rafId: number | null = null;
    let isRunning = false;

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      rafId = requestAnimationFrame(animate);
    }

    // Observe hero to pause when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isRunning) {
              isRunning = true;
              animate();
            }
          } else {
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = null;
              isRunning = false;
            }
          }
        });
      },
      { threshold: 0 }
    );

    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true" />;
}
