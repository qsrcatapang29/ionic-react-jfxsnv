import './Tab6.css';  // Ensure CSS for styling is imported
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton, IonLabel, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Tab9: React.FC = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timer, setTimer] = useState(35);  // Change to 20 seconds
  const [gameOver, setGameOver] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, []);

  const questions = [
    {
      question: "How many seahorses are in the sea?",
      pictureUrl: "https://i.pinimg.com/474x/ef/ba/d4/efbad41d6075786a177583103dfc96af.jpg",
      choices: ["5", "7", "9", "6"],
      correctAnswer: "7",
    },
    {
      question: "How many starfish are on the reef?",
      pictureUrl: "https://i.pinimg.com/474x/fd/ec/42/fdec42ba025bd413866dc4c32b23f3b7.jpg",
      choices: ["4", "6", "5", "8"],
      correctAnswer: "5",
    },
    {
      question: "How many clown fish can you see in the ocean?",
      pictureUrl: "https://i.pinimg.com/474x/8d/76/37/8d76373a24917de186d9abbf5a767a9b.jpg",
      choices: ["3", "4", "6", "5"],
      correctAnswer: "4",
    },
    {
      question: "How many turtles are swimming near the coral?",
      pictureUrl: "https://i.pinimg.com/474x/9f/26/3b/9f263b51411da2d325f7392d11353517.jpg",
      choices: ["3", "7", "5", "4"],
      correctAnswer: "3",
    },
  
    {
      question: "2 fish + 6 fish = ?",
      pictureUrl: "https://i.pinimg.com/474x/d7/58/c0/d758c02170c7bb64dca1f18b2ab2ecc7.jpg",
      choices: ["8", "9", "7", "6"],
      correctAnswer: "8",
    },
    {
      question: "How many crabs are on the sand? = ?",
      pictureUrl: "https://i.pinimg.com/474x/ef/53/f0/ef53f07c31bd9ccab6b885e53642be69.jpg",
      choices: ["9", "8", "7", "6"],
      correctAnswer: "6",
    },
    {
      question: "10 squid - 6 squid = ?",
      pictureUrl: "https://i.pinimg.com/474x/94/30/72/943072eb2c8a81407a228101a7526315.jpg",
      choices: ["6", "5", "4", "8"],
      correctAnswer: "4",
    },
  
    {
      question: "If there are 5 jellyfish and 5 more swim by, how many jellyfish are there now?",
      pictureUrl: "https://i.pinimg.com/474x/0b/4c/e5/0b4ce5c8ffd2c0f3c6dfbcd0196968db.jpg",
      choices: ["10", "11", "12", "14"],
      correctAnswer: "10",
    },
    {
      question: "If there are 6 goldfish and 3 swim away, how many goldfish are left?",
      pictureUrl: "https://i.pinimg.com/474x/29/09/4a/29094a28cc953c449ca66d1d51c808c5.jpg",
      choices: ["4", "5", "6", "3"],
      correctAnswer: "3",
    },
    {
      question: "There are 3 sharks on the beach. 5 more sharks join them. How many crabs are there now?",
      pictureUrl: "https://i.pinimg.com/474x/44/e0/2c/44e02cba12d72c0ee149d98471caa0e9.jpg",
      choices: ["9", "8", "7", "6"],
      correctAnswer: "8",
    },
  ];

  const currentQuestion = questions[questionIndex];

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem('bestScore', newScore.toString());
      }
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setIsQuizFinished(true);
      }
    }, 1000);
  };

  const startQuiz = () => {
    setStartTime(Date.now());
  };

  const restartQuiz = () => {
    setScore(0);
    setQuestionIndex(0);
    setIsQuizFinished(false);
    setGameOver(false);
    setTimer(35);  
    startQuiz();
    history.push('/tab6');
  };

  const goToMenu = () => {
    history.push('/tab1');
  };

  useEffect(() => {
    if (startTime !== null && !isQuizFinished && !gameOver) {
      const intervalId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remainingTime = 35 - elapsed;  // Set to countdown from 30 seconds
        if (remainingTime <= 0) {
          clearInterval(intervalId);
          setTimer(0);
          setGameOver(true);
          handleAnswerClick(''); // Game over, no more answers accepted
        } else {
          setTimer(remainingTime);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [startTime, isQuizFinished, gameOver]);

  useEffect(() => {
    if (questionIndex === 0 && startTime === null) {
      startQuiz();
    }
  }, [questionIndex, startTime]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonTitle>Hard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding quiz-content">
        {isQuizFinished || gameOver ? (
          <div
            className="quiz-result"
            style={{
              backgroundColor: gameOver ? '#dc3545' : '#28a745', // Red for Game Over, Green for Quiz Finished
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <h2>{gameOver ? "Game Over!" : "Quiz Finished!"}</h2>
            <IonText>Your Score: {score} / {questions.length}</IonText>
            <br />
            <IonText>Best Score: {bestScore} / {questions.length}</IonText>
            <div className="action-buttons">
              <IonButton expand="block" onClick={restartQuiz}>
                Restart Quiz
              </IonButton>
              <IonButton expand="block" color="secondary" onClick={goToMenu}>
                Back to Menu
              </IonButton>
            </div>
          </div>
        ) : (
          <>
            <div className="quiz-status-container">
              <div className="quiz-status">
                <div className="quiz-status-item score">
                  <IonText>Your Score {score}</IonText>
                </div>
                <div className="quiz-status-item best-score">
                  <IonText>Best Score {bestScore}</IonText>
                </div>
                <div className="quiz-status-item question">
                  <IonText>Question {questionIndex + 1} / {questions.length}</IonText>
                </div>
                <div className="quiz-status-item time-left">
                  <IonText>Time Left {timer}s</IonText>
                </div>
              </div>
            </div>
            <div className="question-container">
              <h2>{currentQuestion.question}</h2>
              <IonImg 
                src={currentQuestion.pictureUrl} 
                alt="Question illustration" 
                className="question-image" 
              />
              {currentQuestion.choices.map((choice, index) => (
                <IonButton
                  key={index}
                  expand="block"
                  onClick={() => handleAnswerClick(choice)}
                  color={
                    gameOver
                      ? "danger" // Red for Game Over
                      : isQuizFinished
                      ? "success" // Green for quiz finished
                      : selectedAnswer === choice
                      ? choice === currentQuestion.correctAnswer
                        ? "success" // Correct answer, green
                        : "danger"  // Incorrect answer, red
                      : "primary" // Default color for unselected answers
                  }
                  disabled={gameOver || isQuizFinished} // Disable buttons when game is over or quiz is finished
                  className="answer-button"
                >
                  {choice}
                </IonButton>
              ))}
              {selectedAnswer && (
                <IonLabel color="primary" className="selected-answer">You selected: {selectedAnswer}</IonLabel>
              )}
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab9;
