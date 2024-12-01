import React, { useEffect, useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLabel, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';  // Import useHistory for navigation
import { arrowBackOutline, homeOutline } from 'ionicons/icons';  // Import icons
import './Tab16.css';

const Tab1: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const history = useHistory();  // Initialize useHistory
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#FF4081');
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [paths, setPaths] = useState<any[]>([]);

  // Function to handle drawing
  const startDrawing = (e: React.MouseEvent) => {
    if (!isDrawingMode) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        setIsDrawing(true);
        const rect = canvas.getBoundingClientRect();
        const newPath = [
          { 
            x: e.clientX - rect.left, 
            y: e.clientY - rect.top 
          }
        ];

        // Set brush color to transparent if erasing
        const color = isErasing ? 'rgba(255, 255, 255, 1)' : brushColor;

        // Add new path to the paths array
        setPaths((prevPaths) => [
          ...prevPaths,
          { points: newPath, color, size: brushSize }
        ]);
      }
    }
  };

  // Function to handle drawing or erasing while moving the mouse
  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !isDrawingMode) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const newPoint = { 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        };

        // Set brush color to transparent if erasing
        const color = isErasing ? 'rgba(255, 255, 255, 1)' : brushColor;

        // Update the current path with the new point
        setPaths((prevPaths) => {
          const newPaths = [...prevPaths];
          newPaths[newPaths.length - 1].points.push(newPoint);
          return newPaths;
        });
      }
    }
  };

  // Function to stop drawing
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Effect to handle the canvas rendering and redrawing paths
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth - 40;
        canvas.height = 300;

        const redrawCanvas = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
          ctx.lineCap = 'round';
          paths.forEach((path) => {
            ctx.beginPath();
            ctx.moveTo(path.points[0].x, path.points[0].y);
            path.points.forEach((point: { x: number; y: number }) => {
              ctx.lineWidth = path.size;
              ctx.strokeStyle = path.color;
              ctx.lineTo(point.x, point.y);
              ctx.stroke();
            });
          });
        };

        redrawCanvas(); // Redraw the canvas whenever paths or color changes
      }
    }
  }, [paths, brushColor, brushSize]); // Redraw on paths, color or size change

  // Toggle drawing mode
  const toggleDrawingMode = () => {
    setIsDrawingMode((prevMode) => !prevMode);
  };

  // Handle brush size changes via buttons
  const increaseBrushSize = () => {
    setBrushSize((prev) => Math.min(prev + 5, 50)); // Limit max size to 50
  };

  const decreaseBrushSize = () => {
    setBrushSize((prev) => Math.max(prev - 5, 1)); // Limit min size to 1
  };

  // Clear all the drawing paths
  const clearAll = () => {
    setPaths([]); // Clear all paths
  };

  // Toggle eraser mode
  const toggleEraser = () => {
    setIsErasing((prev) => !prev);
  };

  // Automatically set music volume when the component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to 50% by default
      audioRef.current.play(); // Automatically start the music
    }
  }, [isDrawingMode]); // Play music when drawing mode is enabled

  // Navigate to tab13 when Home button is clicked
  const goHome = () => {
    history.push('/tab13');
  };

  // Navigate to previous page when Back button is clicked
  const goBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" onClick={goBack}>
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
          <IonTitle>{isDrawingMode ? 'Drawing Mode' : 'Musical Drawing'}</IonTitle>
          <IonButton slot="end" onClick={goHome}>
            <IonIcon icon={homeOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="home-screen">
        {!isDrawingMode ? (
          <div className="splash-container">
            <h1 className="title">Musical Drawing</h1>
            <p className="sub-title">Create Art & Explore Music!</p>
            <IonButton expand="full" shape="round" className="start-btn" onClick={toggleDrawingMode}>
              Start Drawing!
            </IonButton>
          </div>
        ) : (
          <div className="drawing-container">
            <div className="moving-title">Musical Drawing</div>
            <div className="canvas-container">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              ></canvas>
            </div>

            <div className="tools-bar">
              <div className="brush-size">
                <IonLabel>Brush Size</IonLabel>
                <div className="size-controls">
                  <IonButton onClick={decreaseBrushSize} color="primary">
                    Smaller
                  </IonButton>
                  <IonButton onClick={increaseBrushSize} color="secondary">
                    Larger
                  </IonButton>
                </div>
                <div className="brush-size-preview" style={{ width: brushSize * 2, height: brushSize * 2 }}></div>
              </div>

              <div className="color-picker">
                <IonLabel>Brush Color</IonLabel>
                <div className="color-swatches">
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: '#FF4081' }}
                    onClick={() => setBrushColor('#FF4081')}
                  ></div>
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: '#FFEB3B' }}
                    onClick={() => setBrushColor('#FFEB3B')}
                  ></div>
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: '#4CAF50' }}
                    onClick={() => setBrushColor('#4CAF50')}
                  ></div>
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: '#2196F3' }}
                    onClick={() => setBrushColor('#2196F3')}
                  ></div>
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: '#9C27B0' }}
                    onClick={() => setBrushColor('#9C27B0')}
                  ></div>
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: '#FF5722' }}
                    onClick={() => setBrushColor('#FF5722')}
                  ></div>
                </div>
              </div>
            </div>

            <div className="side-buttons">
              <IonButton expand="block" color="danger" onClick={clearAll}>
                Clear All
              </IonButton>
              <IonButton expand="block" color="warning" onClick={toggleEraser}>
                {isErasing ? 'Stop Erasing' : 'Erase'}
              </IonButton>
            </div>

            <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" preload="auto" />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
