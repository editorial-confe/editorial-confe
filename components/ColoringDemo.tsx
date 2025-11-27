import React, { useState, useRef, useEffect } from 'react';
import { playSound, speakText } from '../utils/audio';
import './ColoringDemo.css';

// RUTAS LOCALES: Al ser del mismo origen, NO NECESITAN PROXY NI WESERV.NL
// Esto soluciona los problemas de "tainted canvas" (CORS) y el bote de pintura funcionará perfecto.
const SCENE_BAUTISMO = "/bautismo.png";
const SCENE_HUIDA = "/huida.png";

const PALETTE = [
  "#ea251b", "#fa9a0a", "#fce314", "#0a894e", "#0a83bd",
  "#371a5a", "#8a2281", "#f5c3b0", "#5c4033", "#000000",
];

const STAMPS = ["⭐", "❤️", "🕊️", "✝️", "✨"];

const SCENE_STORIES: {[key: string]: string} = {
  [SCENE_BAUTISMO]: "¡Qué momento tan mágico! Jesús está en el río. El cielo se abre y baja una palomita blanca llena de luz. ¡Es el Espíritu Santo! Todos celebran con alegría.",
  [SCENE_HUIDA]: "Es una noche estrellada. San José camina valiente guiando al burrito. Mamá María abraza fuerte al bebé Jesús para que esté calientito y seguro. ¡Los ángeles los cuidan!",
};

const ColoringDemo: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>(PALETTE[0]);
  const [currentSceneUrl, setCurrentSceneUrl] = useState<string>(SCENE_BAUTISMO);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(15);
  const [tool, setTool] = useState<'brush' | 'bucket' | 'eraser' | 'rainbow' | 'stamp'>('brush');
  const [selectedStamp, setSelectedStamp] = useState(STAMPS[0]);
  const [currentStory, setCurrentStory] = useState<string>("");
  const [isImageReady, setIsImageReady] = useState(false);
  const [smartBrush, setSmartBrush] = useState(true); 
  
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastSoundTimeRef = useRef<number>(0);
  const hueRef = useRef<number>(0);
  const lastPosRef = useRef<{x: number, y: number} | null>(null);

  const bgImageDataRef = useRef<Uint8ClampedArray | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 800;
    canvas.height = 1000;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = selectedColor;
      contextRef.current = ctx;
      ctx.fillStyle = "transparent";
      ctx.clearRect(0,0, canvas.width, canvas.height);
      saveHistoryState(); 
    }
  }, []);

  useEffect(() => {
    if (contextRef.current) {
        contextRef.current.lineWidth = brushSize;
        if (tool === 'eraser') {
            contextRef.current.globalCompositeOperation = 'destination-out';
        } else {
            contextRef.current.globalCompositeOperation = 'source-over';
            contextRef.current.globalAlpha = tool === 'stamp' ? 1 : 0.9;
            if (tool !== 'rainbow' && tool !== 'stamp') {
                contextRef.current.strokeStyle = selectedColor;
            }
        }
    }
  }, [brushSize, selectedColor, tool]);

  useEffect(() => {
    setIsImageReady(false);
    const loadBgData = () => {
        const img = new Image();
        // Para archivos locales, crossOrigin "Anonymous" suele funcionar bien en dev servers modernos (Vite),
        // pero si da problemas se puede quitar. Lo dejamos por ahora.
        img.crossOrigin = "Anonymous"; 
        img.src = currentSceneUrl;
        
        img.onload = () => {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 800;
            tempCanvas.height = 1000;
            const bgCtx = tempCanvas.getContext('2d');
            if (bgCtx) {
                bgCtx.fillStyle = "white";
                bgCtx.fillRect(0, 0, 800, 1000);
                // Draw image stretched to match canvas exactly for accurate pixel detection
                bgCtx.drawImage(img, 0, 0, 800, 1000);
                
                try {
                    const data = bgCtx.getImageData(0, 0, 800, 1000).data;
                    bgImageDataRef.current = data;
                    setIsImageReady(true);
                } catch (e) {
                    console.error("Error loading image data", e);
                    setIsImageReady(true); 
                }
            }
        };
        img.onerror = () => setIsImageReady(true);
    };
    
    resetDrawing(); 
    loadBgData();
  }, [currentSceneUrl]);

  const changeScene = (url: string) => {
      playSound('pop');
      setCurrentSceneUrl(url);
      
      const story = SCENE_STORIES[url];
      setCurrentStory(story);
      speakText(story);
      
      setTimeout(() => setCurrentStory(""), 10000);
  };

  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;
    const newHistory = history.slice(0, historyStep + 1);
    if (newHistory.length > 10) newHistory.shift();
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep <= 0) return;
    playSound('woosh');
    const prevStep = historyStep - 1;
    const imageData = history[prevStep];
    const ctx = contextRef.current;
    if (ctx && imageData) {
        ctx.clearRect(0, 0, 800, 1000);
        ctx.putImageData(imageData, 0, 0);
        setHistoryStep(prevStep);
    }
  };

  const redo = () => {
    if (historyStep >= history.length - 1) return;
    playSound('woosh');
    const nextStep = historyStep + 1;
    const imageData = history[nextStep];
    const ctx = contextRef.current;
    if (ctx && imageData) {
        ctx.clearRect(0, 0, 800, 1000);
        ctx.putImageData(imageData, 0, 0);
        setHistoryStep(nextStep);
    }
  };

  const triggerDrawSound = () => {
    const now = Date.now();
    if (now - lastSoundTimeRef.current > 100) {
        playSound(tool === 'eraser' ? 'eraser' : 'paint');
        lastSoundTimeRef.current = now;
    }
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const performFloodFill = (startX: number, startY: number) => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    const bgData = bgImageDataRef.current;
    
    if (!canvas || !ctx || !bgData) return;

    const width = 800;
    const height = 1000;
    
    if (startX < 0 || startX >= width || startY < 0 || startY >= height) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const fillColor = hexToRgb(selectedColor);
    
    const stack = [startX, startY];
    const visited = new Uint8Array(width * height); 
    
    const isBoundary = (idx: number) => {
        const r = bgData[idx];
        const g = bgData[idx + 1];
        const b = bgData[idx + 2];
        // Line detection threshold
        return (r < 180 && g < 180 && b < 180);
    };

    const isSameColor = (idx: number) => {
        return data[idx] === fillColor.r &&
               data[idx+1] === fillColor.g &&
               data[idx+2] === fillColor.b &&
               data[idx+3] === 255;
    };

    let iterations = 0;
    const maxIterations = width * height; 

    while (stack.length > 0 && iterations < maxIterations) {
        iterations++;
        const y = stack.pop()!;
        const x = stack.pop()!;
        
        const pixelPos = (y * width + x);
        if (visited[pixelPos]) continue;
        
        const idx = pixelPos * 4;

        if (isBoundary(idx)) continue;
        if (isSameColor(idx)) { visited[pixelPos] = 1; continue; }

        data[idx] = fillColor.r;
        data[idx+1] = fillColor.g;
        data[idx+2] = fillColor.b;
        data[idx+3] = 255; 
        
        visited[pixelPos] = 1;

        if (x + 1 < width) { stack.push(x + 1, y); }
        if (x - 1 >= 0)    { stack.push(x - 1, y); }
        if (y + 1 < height){ stack.push(x, y + 1); }
        if (y - 1 >= 0)    { stack.push(x, y - 1); }
    }

    ctx.putImageData(imageData, 0, 0);
    playSound('magic'); 
    saveHistoryState();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;

    if ('touches' in e) {
       clientX = e.touches[0].clientX;
       clientY = e.touches[0].clientY;
    } else {
       clientX = (e as React.MouseEvent).clientX;
       clientY = (e as React.MouseEvent).clientY;
    }

    return {
      offsetX: (clientX - rect.left) * scaleX,
      offsetY: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isImageReady) return;

    const { offsetX, offsetY } = getCoordinates(e);

    if (tool === 'bucket') {
        playSound('pop');
        setTimeout(() => {
            performFloodFill(Math.floor(offsetX), Math.floor(offsetY));
        }, 10);
        return;
    }

    if (tool === 'stamp') {
        playSound('stamp');
        if (contextRef.current) {
            contextRef.current.font = `${brushSize * 3}px serif`;
            contextRef.current.textAlign = 'center';
            contextRef.current.textBaseline = 'middle';
            contextRef.current.fillText(selectedStamp, offsetX, offsetY);
            saveHistoryState();
        }
        return;
    }

    setIsDrawing(true);
    triggerDrawSound();
    
    lastPosRef.current = { x: offsetX, y: offsetY };

    if(contextRef.current) {
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    }
  };

  // Robust line collision detection (Ray Casting)
  const checkLineCollision = (x0: number, y0: number, x1: number, y1: number) => {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;

    let cx = x0;
    let cy = y0;

    const bgData = bgImageDataRef.current;
    if (!bgData) return false;

    while (true) {
        if (cx >= 0 && cx < 800 && cy >= 0 && cy < 1000) {
            const idx = (Math.floor(cy) * 800 + Math.floor(cx)) * 4;
            // Line detection
            if (bgData[idx] < 180) return true; 
        }

        if (Math.abs(cx - x1) < 1 && Math.abs(cy - y1) < 1) break;
        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; cx += sx; }
        if (e2 < dx) { err += dx; cy += sy; }
    }
    return false;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !contextRef.current || tool === 'stamp' || tool === 'bucket') return;
    
    const { offsetX, offsetY } = getCoordinates(e);
    
    if (smartBrush && tool === 'brush' && bgImageDataRef.current && lastPosRef.current) {
        if (checkLineCollision(lastPosRef.current.x, lastPosRef.current.y, offsetX, offsetY)) {
            // Hit a wall, stop drawing
            contextRef.current.beginPath(); 
            contextRef.current.moveTo(offsetX, offsetY); 
            lastPosRef.current = { x: offsetX, y: offsetY };
            return; 
        }
    }

    triggerDrawSound();

    if (tool === 'rainbow') {
        hueRef.current = (hueRef.current + 5) % 360;
        contextRef.current.strokeStyle = `hsl(${hueRef.current}, 100%, 50%)`;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    } else {
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    }
    
    lastPosRef.current = { x: offsetX, y: offsetY };
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    if(contextRef.current) {
        contextRef.current.closePath();
    }
    setIsDrawing(false);
    saveHistoryState();
  };

  const resetDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas && contextRef.current) {
      playSound('magic');
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
      setHistory([]);
      setHistoryStep(-1);
    }
  };

  const handleDownload = () => {
      playSound('success');
      const canvas = canvasRef.current;
      if (!canvas) return;

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const ctx = tempCanvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = currentSceneUrl;
      img.onload = () => {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
          ctx.drawImage(canvas, 0, 0);
          ctx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
          
          const link = document.createElement('a');
          link.download = 'mi-arte-jesus-y-maria.png';
          link.href = tempCanvas.toDataURL('image/png');
          link.click();
      };
  };

  return (
    <section id="demo" className="section demo-section">
      <div className="container">
        <h2 className="section-title">¡Intenta colorear aquí!</h2>
        <p className="section-subtitle">Usa el Bote para rellenar o el Pincel para detalles 🎨</p>

        <div className="demo-layout">
          
          <div className="demo-controls-top">
            <div className="scene-tabs">
              <button 
                className={`tab-btn ${currentSceneUrl === SCENE_BAUTISMO ? 'active' : ''}`} 
                onClick={() => changeScene(SCENE_BAUTISMO)}
              >
                Escena 1: Bautismo
              </button>
              <button 
                className={`tab-btn ${currentSceneUrl === SCENE_HUIDA ? 'active' : ''}`} 
                onClick={() => changeScene(SCENE_HUIDA)}
              >
                Escena 2: Huida
              </button>
            </div>
            
            <div className="control-panel glass-panel">
                <div className="tools-row">
                    <button className={`tool-btn ${tool === 'brush' ? 'active' : ''}`} onClick={() => { playSound('click'); setTool('brush'); }}>🖌️ Pincel</button>
                    <button className={`tool-btn ${tool === 'bucket' ? 'active' : ''}`} onClick={() => { playSound('click'); setTool('bucket'); }}>🪣 Bote</button>
                    <button className={`tool-btn rainbow-btn ${tool === 'rainbow' ? 'active' : ''}`} onClick={() => { playSound('magic'); setTool('rainbow'); }}>🌈 Mágico</button>
                    <button className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`} onClick={() => { playSound('click'); setTool('eraser'); }}>🧼 Borrar</button>
                </div>
                
                <div className="tools-row">
                     <button className={`tool-btn ${tool === 'stamp' ? 'active' : ''}`} onClick={() => { playSound('click'); setTool('stamp'); }}>⭐ Estampas</button>
                     {tool === 'stamp' && (
                         <div className="stamp-selector">
                             {STAMPS.map(s => (
                                 <button key={s} className={`stamp-opt ${selectedStamp === s ? 'selected' : ''}`} onClick={() => setSelectedStamp(s)}>{s}</button>
                             ))}
                         </div>
                     )}
                </div>

                <div className="tools-row history-controls">
                     <button className="tool-btn small-btn" onClick={undo} disabled={historyStep <= 0}>↩️ Deshacer</button>
                     <button className="tool-btn small-btn" onClick={redo} disabled={historyStep >= history.length - 1}>↪️ Rehacer</button>
                     <button 
                        className={`tool-btn small-btn ${smartBrush ? 'active' : ''}`} 
                        onClick={() => setSmartBrush(!smartBrush)}
                        title="Evita pintar sobre las líneas negras"
                     >
                        {smartBrush ? '🛡️ Líneas: ON' : '🛡️ Líneas: OFF'}
                     </button>
                </div>

                <div className="size-control">
                    <label>Grosor:</label>
                    <input type="range" min="5" max="60" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} className="size-slider"/>
                    <div className="size-preview" style={{
                            width: brushSize/2 + 10, 
                            height: brushSize/2 + 10, 
                            background: tool === 'rainbow' ? 'linear-gradient(45deg, red, blue)' : (tool === 'eraser' ? '#ccc' : selectedColor)
                    }}></div>
                </div>

                {tool !== 'stamp' && (
                <div className="palette-grid">
                    {PALETTE.map(color => (
                    <button
                        key={color}
                        className={`color-btn ${selectedColor === color && (tool === 'brush' || tool === 'bucket') ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => { playSound('pop'); setSelectedColor(color); if(tool !== 'bucket') setTool('brush'); }}
                    />
                    ))}
                </div>
                )}
                
                 <button className="tool-btn narrator-btn" onClick={() => { playSound('magic'); speakText(SCENE_STORIES[currentSceneUrl]); }}>
                     🗣️ Repetir Historia
                 </button>
            </div>
          </div>

          <div className="canvas-wrapper-outer">
            {currentStory && (
                <div className="story-bubble animate-up">
                    {currentStory}
                    <div className="bubble-arrow"></div>
                </div>
            )}
            
            <div className="canvas-container-stack">
               {!isImageReady && <div className="loading-overlay">Cargando Dibujo...</div>}
               
               <canvas
                 ref={canvasRef}
                 className="drawing-canvas"
                 style={{ cursor: tool === 'stamp' ? 'copy' : (tool === 'bucket' ? 'cell' : 'crosshair') }}
                 onMouseDown={startDrawing}
                 onMouseMove={draw}
                 onMouseUp={stopDrawing}
                 onMouseLeave={stopDrawing}
                 onTouchStart={startDrawing}
                 onTouchMove={draw}
                 onTouchEnd={stopDrawing}
               />
               <img 
                 src={currentSceneUrl} 
                 alt="Fondo" 
                 className="coloring-bg-img" 
                 crossOrigin="anonymous"
                 loading="lazy" // Added lazy loading for optimization
               />
            </div>

            <div className="canvas-actions">
              <button onClick={resetDrawing} className="btn-action reset">🗑️ Borrar Todo</button>
              <button onClick={handleDownload} className="btn-action download">💾 Guardar Obra</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ColoringDemo;