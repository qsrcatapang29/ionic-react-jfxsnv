import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonLabel, IonItem, IonInput, IonButton } from '@ionic/react';
import './Tab17.css';




const Tab1: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [currentActivity, setCurrentActivity] = useState<string>('');
  const [originalActivity, setOriginalActivity] = useState<string>('');
  const [activityType, setActivityType] = useState<'letter' | 'number' | 'word'>('letter');
  const [gameOver, setGameOver] = useState(false);
  const [activityCount, setActivityCount] = useState(0);




  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const words = ['cat', 'dog', 'sun', 'ball', 'tree'];




  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);




  // Initialize the canvas when component mounts
  const initializeCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctxRef.current = ctx;
        ctx.lineWidth = 5; // Make the stroke width larger
        ctx.lineCap = 'round'; // Rounded ends for better visuals
        ctx.strokeStyle = '#000000'; // Drawing color (black)
      }
    }
  };




  // Start drawing when the user touches/clicks the canvas
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (ctxRef.current && canvasRef.current) {
      setDrawing(true);
      const { offsetX, offsetY } = e.nativeEvent;
      setLastX(offsetX);
      setLastY(offsetY);
    }
  };




  const stopDrawing = () => {
    setDrawing(false);
  };




  // Draw on the canvas
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;




    if (ctxRef.current) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(lastX, lastY);
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
      setLastX(offsetX);
      setLastY(offsetY);
    }
  };




  // Clear the entire canvas (called when "Erase" is clicked)
  const eraseAll = () => {
    if (canvasRef.current && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clears the canvas
      setDrawing(false); // Reset drawing state to stop drawing mode
      setLastX(0); // Reset last position
      setLastY(0); // Reset last position
    }
  };




  const startActivity = () => {
    let randomActivityType: 'letter' | 'number' | 'word';




    if (activityCount < 8) {
      // First 8 activities: randomly choose between letters and numbers
      randomActivityType = ['letter', 'number'][Math.floor(Math.random() * 2)] as 'letter' | 'number';
    } else {
      // Last 2 activities: word activities
      randomActivityType = 'word';
    }




    setActivityType(randomActivityType);




    let shuffled = '';
    if (randomActivityType === 'letter') {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      shuffled = randomLetter;
      setOriginalActivity(randomLetter);
      eraseAll(); // Erase all traces when starting a new activity
    } else if (randomActivityType === 'number') {
      const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
      shuffled = randomNumber;
      setOriginalActivity(randomNumber);
      eraseAll(); // Erase all traces when starting a new activity
    } else if (randomActivityType === 'word') {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      shuffled = randomWord;
      setOriginalActivity(randomWord);
      // Do NOT clear the canvas if it's a word activity (let the trace persist)
    }




    setCurrentActivity(shuffled);
    setInputValue('');
  };




  const checkAnswer = () => {
    if (activityType === 'word') {
      const userInput = inputValue ? inputValue.trim().toLowerCase() : ''; // Normalize the input
      const original = originalActivity.toLowerCase(); // Normalize the correct answer




      if (userInput !== original) {
        // If it's incorrect, do nothing (no feedback)
      }
    } else {
      if (canvasRef.current && ctxRef.current) {
        const imageData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        const pixels = imageData.data;
        let isDrawn = false;
        for (let i = 0; i < pixels.length; i += 4) {
          if (pixels[i + 3] > 0) { // Check if any pixel is drawn
            isDrawn = true;
            break;
          }
        }
        if (!isDrawn) {
          // If no drawing is done, do nothing (no feedback)
        }
      }
    }




    setActivityCount(activityCount + 1);
    if (activityCount + 1 === 10) {
      setGameOver(true); // Game over after 10 activities
    } else {
      setTimeout(() => {
        startActivity(); // Start a new activity after checking the answer
      }, 1000);
    }
  };




  useEffect(() => {
    startActivity(); // Start the first activity
    initializeCanvas(); // Initialize the canvas
  }, []);

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
          <IonTitle>Practice Writing</IonTitle>
          <IonButton slot="end" onClick={() => window.location.href = '/tab13'} color="primary">
      Home
    </IonButton>
        </IonToolbar>
      </IonHeader>




      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Fun Tracing</IonTitle>
          </IonToolbar>
        </IonHeader>




        {!gameOver ? (
          <IonCard className="activity-card">
            <IonCardHeader>
              <IonTitle>{activityType === 'letter' ? 'Trace the Letter' : activityType === 'number' ? 'Trace the Number' : 'Type the Word'}</IonTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonLabel className="activity-label">
                {activityType === 'word' ? 'Type the word: ' : 'Trace the: '}
                <strong>{currentActivity}</strong>
              </IonLabel>
              {activityType === 'word' ? (
                <IonItem>
                  <IonInput
                    value={inputValue}
                    onIonInput={(e) => setInputValue(e.detail.value!)}
                    placeholder="Write here"
                    clearInput={true}
                    style={{
                      textAlign: 'center',
                      fontSize: '4em',
                      fontFamily: 'Comic Sans MS',
                      color: '#ff6347',
                      padding: '10px',
                      background: '#f0f8ff',
                      borderRadius: '10px',
                    }}
                  />
                </IonItem>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={200}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    onTouchCancel={stopDrawing}
                    style={{
                      border: '2px solid black',
                      cursor: 'pointer',
                      backgroundColor: '#f0f8ff',
                    }}
                  />
                </div>
              )}




              <IonButton expand="full" onClick={checkAnswer} color="primary" style={{ marginTop: '20px' }}>
                Next
              </IonButton>




              <IonButton expand="full" onClick={eraseAll} color="warning" style={{ marginTop: '20px' }}>
                Erase All
              </IonButton>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonCard className="score-card">
            <IonCardContent>
              <IonLabel
                className="score-label"
                style={{
                  textAlign: 'center',
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                  color: '#28a745',
                }}
              >
                Amazing job! You did great!
              </IonLabel>
              <IonButton
                expand="full"
                onClick={() => window.location.reload()}
                color="tertiary"
                style={{ marginTop: '20px' }}
              >
                Play Again
              </IonButton>




              <IonButton
                expand="full"
                onClick={() => window.location.href = '/tab13'}
                color="medium"
                style={{ marginTop: '20px' }}
              >
                Done
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};




export default Tab1;