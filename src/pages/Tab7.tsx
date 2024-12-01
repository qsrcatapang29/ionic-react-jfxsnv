import './Tab7.css';  // Ensure CSS for styling is imported
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton, IonLabel, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';


const Tab7: React.FC = () => {
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


// Sample data for questions, pictures, and choices
const questions = [
  {
    question: "How many trees are there?",
    pictureUrl: "https://i.pinimg.com/474x/27/99/73/279973e6ea58db8d22dce274692478f8.jpg",
    choices: ["1", "4", "2", "3"],
    correctAnswer: "3",
  },
  {
    question: "What number comes after 3?",
    pictureUrl: "https://i.pinimg.com/474x/b5/21/4e/b5214e19bcce3031eccdf0cf5176f6d5.jpg",
    choices: ["5", "4", "2", "6"],
    correctAnswer: "4",
  },
  {
    question: "2 + 3 = ?",
    pictureUrl: "https://i.pinimg.com/474x/22/38/e1/2238e166ba8dfb20d5c3acce021d1da1.jpg",
    choices: ["6", "4", "5", "2"],
    correctAnswer: "5",
  },
  {
    question: "How many BIRDS are there in the picture?",
    pictureUrl: "https://i.pinimg.com/474x/3c/83/8b/3c838b5e1a9cacda4be133e09733c792.jpg",
    choices: ["5", "4", "2", "3"],
    correctAnswer: "3",
  },
  {
    question: "How many COWS are there in the picture?",
    pictureUrl: "https://i.pinimg.com/474x/15/dc/36/15dc36f8db7a955d29cf0e72796e355c.jpg",
    choices: ["8", "5", "9", "7"],
    correctAnswer: "8",
  },
  // Add more questions as needed
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
    history.push('/tab6');
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


export default Tab7;


