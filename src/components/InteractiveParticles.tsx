//@ts-nocheck
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const InteractiveParticles = () => {
  const [particles, setParticles] = useState([]);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const lastParticleRef = useRef(0);
  
  const MAX_PARTICLES = 50;
  const PARTICLE_SPAWN_DELAY = 50;

  const createParticle = useCallback((x, y) => {
    const now = Date.now();
    if (now - lastParticleRef.current < PARTICLE_SPAWN_DELAY) return;
    
    lastParticleRef.current = now;
    
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1 + 0.5;
    
    setParticles(prev => {
      const newParticles = prev.length >= MAX_PARTICLES ? prev.slice(1) : prev;
      return [...newParticles, {
        id: now,
        initialX: x,
        initialY: y,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        size: Math.random() * 3 + 1
      }];
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (Math.random() > 0.5) {
        createParticle(event.clientX, event.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [createParticle]);

  const animate = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = (time - previousTimeRef.current) / 16;

      setParticles(prevParticles => 
        prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx * deltaTime,
            y: particle.y + particle.vy * deltaTime,
            vx: particle.vx * 0.95,
            vy: particle.vy * 0.95,
            life: particle.life - 0.02 * deltaTime
          }))
          .filter(particle => particle.life > 0)
      );
    }
    
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ 
            opacity: 1,
            scale: 1,
            x: particle.initialX,
            y: particle.initialY
          }}
          style={{
            position: 'absolute',
            width: particle.size,
            height: particle.size,
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            boxShadow: `0 0 ${particle.size * 2}px rgba(239, 68, 68, ${particle.life})`,
            transform: `translate(${particle.x - particle.initialX}px, ${particle.y - particle.initialY}px)`,
            opacity: particle.life
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveParticles;