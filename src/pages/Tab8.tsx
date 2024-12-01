import './Tab6.css';  // Ensure CSS for styling is imported
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton, IonLabel, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Tab8: React.FC = () => {
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

// Sample data for questions, pictures, and choices
const questions = [
  {
    question: "How many sheeps are in the field? ",
    pictureUrl: "https://i.pinimg.com/474x/5b/d4/70/5bd470242a1ec5d32a624f5c8de524b7.jpg",
    choices: ["5", "6", "4", "3"],
    correctAnswer: "5",
  },
  {
    question: "How many apples are in the tree?",
    pictureUrl: "https://i.pinimg.com/474x/be/41/91/be41916656d19c97dbbd648f163e5bec.jpg",
    choices: ["4", "5", "6", "7"],
    correctAnswer: "4",
  },
  {
    question: "How many chickens are in the barn?",
    pictureUrl: "https://i.pinimg.com/474x/36/fb/dc/36fbdc1ef2725ada7574a18123e25b2d.jpg",
    choices: ["3", "5", "4", "6"],
    correctAnswer: "4",
  },
  {
    question: "How many blue objects can you see in the picture?",
    pictureUrl: "https://i.pinimg.com/474x/f8/9a/1d/f89a1d624579556deb37480a03710bb1.jpg",
    choices: ["3", "5", "4", "6"],
    correctAnswer: "3",
  },
  {
    question: "What number comes before 20?",
    pictureUrl: "https://i.pinimg.com/474x/dc/93/d7/dc93d7ee373b9bcce3dc7c61608b2474.jpg",
    choices: ["11", "19", "12", "17"],
    correctAnswer: "19",
  },
  {
    question: "What is 10 - 4?",
    pictureUrl: "https://i.pinimg.com/474x/95/6f/48/956f484de1706a865faf0a6370150f8a.jpg",
    choices: ["7", "6", "5", "8"],
    correctAnswer: "6",
  },
  {
    question: "What number comes next after 18?",
    pictureUrl: "https://i.pinimg.com/474x/dc/93/d7/dc93d7ee373b9bcce3dc7c61608b2474.jpg",
    choices: ["19", "20", "17", "21"],
    correctAnswer: "19",
  },
  {
    question: "How many wild animals are on the land?",
    pictureUrl: "https://i.pinimg.com/474x/2e/5b/44/2e5b44363b1acc265216988e967473d0.jpg",
    choices: ["3", "7", "4", "5"],
    correctAnswer: "3",
  },
  {
    question: "What is 6 + 3?",
    pictureUrl: "https://i.pinimg.com/474x/75/c5/3e/75c53e6a3b60001e37227882ca7f4aa6.jpg",
    choices: ["9", "10", "11", "12"],
    correctAnswer: "9",
  },
  {
    question: "How many ducks are walking?",
    pictureUrl: "https://i.pinimg.com/474x/52/b0/a4/52b0a41c77db7f3f33df158f0598e053.jpg",
    choices: ["6", "4", "5", "7"],
    correctAnswer: "5",
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
          <IonTitle>Medium</IonTitle>
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

export default Tab8;