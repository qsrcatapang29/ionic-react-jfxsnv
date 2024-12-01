import './Tab3.css';  // Ensure CSS for styling is imported
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton, IonLabel, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Tab3: React.FC = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timer, setTimer] = useState(30); 
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
      question: "What letter comes after C?",
      pictureUrl: "https://i.pinimg.com/474x/6f/16/e5/6f16e5e7a1558aaf474200da3123425c.jpg",
      choices: ["A", "B", "C", "D"],
      correctAnswer: "D",
    },
    {
      question: "What is the first letter of the word BICYCLE?",
      pictureUrl: "https://i.pinimg.com/474x/88/0b/a8/880ba8ebcc02838f5282982430e38c77.jpg",
      choices: ["A", "B", "V", "P"],
      correctAnswer: "B",
    },
    {
      question: "What letter starts the word MOUNTAIN?",
      pictureUrl: "https://i.pinimg.com/474x/88/e5/ae/88e5aebf87ff96aad45975142e83917e.jpg",
      choices: ["M", "E", "N", "C"],
      correctAnswer: "M",
    },
    {
      question: "What letter comes after G?",
      pictureUrl: "https://i.pinimg.com/474x/89/bb/d4/89bbd4060f28789f10afaaa9c2c99163.jpg",
      choices: ["H", "I", "J", "K"],
      correctAnswer: "H",
    },
    {
      question: "What is the missing letter in the word FAR_ERS?",
      pictureUrl: "https://i.pinimg.com/736x/9f/a1/c1/9fa1c11120ec0a91c37debad506c3b28.jpg",
      choices: ["N", "E", "R", "M"],
      correctAnswer: "M",
    },
    // Add more questions as necessary
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
    setTimer(30);
    startQuiz();
    history.push('/tab2');
  };

  const goToMenu = () => {
    history.push('/tab1');
  };

  useEffect(() => {
    if (startTime !== null && !isQuizFinished && !gameOver) {
      const intervalId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remainingTime = 30 - elapsed;
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
    <IonTitle>Easy</IonTitle>
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

export default Tab3;
