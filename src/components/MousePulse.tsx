//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MousePulse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });
  const [pulses, setPulses] = useState([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPrevMousePosition(mousePosition);
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
      
      const distance = Math.hypot(
        event.clientX - prevMousePosition.x,
        event.clientY - prevMousePosition.y
      );
      
      if (distance > 5) {
        setPulses(prev => [
          ...prev.slice(-10),
          {
            id: Date.now(),
            x: event.clientX,
            y: event.clientY,
            angle: Math.atan2(
              event.clientY - prevMousePosition.y,
              event.clientX - prevMousePosition.x
            )
          }
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition, prevMousePosition]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {pulses.map((pulse, index) => {
        const length = Math.min(50, Math.hypot(
          mousePosition.x - prevMousePosition.x,
          mousePosition.y - prevMousePosition.y
        ));
        
        return (
          <motion.div
            key={pulse.id}
            initial={{ 
              opacity: 0.8,
              scale: 1,
              x: pulse.x,
              y: pulse.y,
              rotate: (pulse.angle * 180) / Math.PI
            }}
            animate={{ 
              opacity: 0,
              scale: 0.5
            }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
            style={{
              position: 'absolute',
              width: `${length}px`,
              height: '2px',
              backgroundColor: '#ef4444',
              transformOrigin: 'left center',
              boxShadow: '0 0 8px #ef4444',
              borderRadius: '1px'
            }}
          />
        );
      })}
      
      {/* Текущая полоска */}
      <motion.div
        style={{
          position: 'absolute',
          left: prevMousePosition.x,
          top: prevMousePosition.y,
          width: Math.hypot(
            mousePosition.x - prevMousePosition.x,
            mousePosition.y - prevMousePosition.y
          ),
          height: '2px',
          backgroundColor: '#ef4444',
          transformOrigin: 'left center',
          transform: `rotate(${Math.atan2(
            mousePosition.y - prevMousePosition.y,
            mousePosition.x - prevMousePosition.x
          )}rad)`,
          boxShadow: '0 0 8px #ef4444, 0 0 12px #ef4444',
          borderRadius: '1px'
        }}
      />
    </div>
  );
};

export default MousePulse;