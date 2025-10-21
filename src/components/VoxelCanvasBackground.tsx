import { FC, useEffect, useRef } from 'react';

interface VoxelCanvasBackgroundProps {
  className?: string;
}

export const VoxelCanvasBackground: FC<VoxelCanvasBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Устанавливаем размер canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Параметры воксельной сетки
    const voxelSize = 40; // Размер одного "вокселя"
    const cols = Math.ceil(canvas.width / voxelSize);
    const rows = Math.ceil(canvas.height / voxelSize);

    // Создаём сетку воксельных блоков
    interface Voxel {
      x: number;
      y: number;
      brightness: number;
      targetBrightness: number;
      speed: number;
    }

    const voxels: Voxel[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        voxels.push({
          x: col * voxelSize,
          y: row * voxelSize,
          brightness: Math.random() * 15 + 8, // 8-23 (более тёмный диапазон)
          targetBrightness: Math.random() * 15 + 8,
          speed: Math.random() * 0.002 + 0.001, // Очень медленная скорость
        });
      }
    }

    // Анимационный цикл
    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Очищаем canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Рисуем и обновляем каждый воксель
      voxels.forEach((voxel) => {
        // Плавно меняем яркость
        const diff = voxel.targetBrightness - voxel.brightness;
        voxel.brightness += diff * voxel.speed * (deltaTime / 16);

        // Когда достигли цели, выбираем новую
        if (Math.abs(diff) < 0.5) {
          voxel.targetBrightness = Math.random() * 15 + 8;
        }

        // Рисуем воксель как квадрат с небольшим gap
        const brightness = Math.floor(voxel.brightness);
        const gap = 2;
        
        // Основной квадрат
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
        ctx.fillRect(
          voxel.x + gap,
          voxel.y + gap,
          voxelSize - gap * 2,
          voxelSize - gap * 2
        );

        // Добавляем легкий 3D эффект (светлая грань) - только для более светлых блоков
        if (brightness > 15) {
          ctx.fillStyle = `rgba(${brightness + 10}, ${brightness + 10}, ${brightness + 10}, 0.2)`;
          ctx.fillRect(
            voxel.x + gap,
            voxel.y + gap,
            voxelSize - gap * 2,
            2
          );
          ctx.fillRect(
            voxel.x + gap,
            voxel.y + gap,
            2,
            voxelSize - gap * 2
          );
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};
