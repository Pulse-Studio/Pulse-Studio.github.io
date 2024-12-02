import { FC, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroContent } from '../types/content';
import InteractiveParticles from './InteractiveParticles';
import MousePulse from './MousePulse';

interface HeroProps {
  content: HeroContent;
}

const FluidBackground: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return;

    // Установка размеров canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Вершинный шейдер
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);
    gl.compileShader(vertexShader);

    // Фрагментный шейдер для создания эффекта жидкости
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        
        // Создаем несколько слоев волн
        float wave1 = sin(uv.x * 10.0 + time) * 0.5 + 0.5;
        float wave2 = sin(uv.y * 8.0 - time * 1.5) * 0.5 + 0.5;
        float wave3 = sin((uv.x + uv.y) * 5.0 + time * 0.7) * 0.5 + 0.5;
        
        // Смешиваем цвета
        vec3 color1 = vec3(0.5, 0.0, 0.0); // темно-красный
        vec3 color2 = vec3(0.8, 0.0, 0.0); // красный
        vec3 color3 = vec3(0.3, 0.0, 0.0); // еще более темный красный
        
        vec3 finalColor = mix(
          mix(color1, color2, wave1),
          color3,
          wave2 * wave3
        );
        
        gl_FragColor = vec4(finalColor, 0.5);
      }
    `);
    gl.compileShader(fragmentShader);

    // Создаем программу
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Создаем буфер для квадрата, заполняющего экран
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    // Получаем местоположение атрибутов и uniform-переменных
    const position = gl.getAttribLocation(program, 'position');
    const timeLocation = gl.getUniformLocation(program, 'time');
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');

    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    // Анимационный цикл
    let startTime = Date.now();
    const render = () => {
      const time = (Date.now() - startTime) / 1000;
      
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ mixBlendMode: 'overlay' }}
    />
  );
};

export const Hero: FC<HeroProps> = ({ content }) => {
  const [currentText, setCurrentText] = useState(0);
  const isLastText = currentText === content.texts.length - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % content.texts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [content.texts.length]);

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isLastText ? 0.8 : 0.5,
        ease: isLastText ? "easeOut" : "easeInOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3 
      }
    }
  };

  const glowVariants = {
    initial: { 
      textShadow: "0 0 0px #ff0000" 
    },
    animate: {
      textShadow: [
        "0 0 5px #ff0000, 0 0 15px #ff0000",
        "0 0 10px #ff0000, 0 0 30px #ff0000",
        "0 0 5px #ff0000, 0 0 15px #ff0000"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <section className="h-screen flex items-center justify-center text-center relative overflow-hidden bg-dark-bg">
      {/* Анимированный фон */}
      <FluidBackground />
      
      {/* TODO: Interactive Particles Layer 
      <InteractiveParticles />
      <MousePulse />
      */}
      {/* Градиентный оверлей */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-red-900/20 to-dark-bg"
        animate={{
          opacity: [0.2, 0.3, 0.2],
          transition: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />

      {/* Основной контент */}
      <div className="relative z-10 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentText}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-6xl font-bold mb-6 text-white"
          >
            {isLastText ? (
              <motion.div
                variants={glowVariants}
                initial="initial"
                animate="animate"
                className="tracking-wider"
                dangerouslySetInnerHTML={{ __html: content.texts[currentText] }}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: content.texts[currentText] }} />
            )}
          </motion.div>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xl mb-8 text-white"
        >
          {content.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link
            to={content.ctaButton.link}
            className="inline-block bg-red-900 hover:bg-red-800 px-8 py-3 rounded-full 
                     text-lg text-white transition-all duration-300 
                     hover:shadow-lg hover:shadow-red-500/50"
          >
            {content.ctaButton.text}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;