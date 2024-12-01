import './Tab3.css';  // Ensure CSS for styling is imported
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton, IonLabel, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Tab5: React.FC = () => {
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
      question: "Which of these words is spelled correctly?",
      pictureUrl: "https://i.pinimg.com/474x/4d/55/69/4d5569d4246e9f9a9f0e7c38f62cbf7f.jpg", // Image of a bat
      choices: ["Bat", "Baat", "Btt", "Baat"],
      correctAnswer: "Bat",
    },
    {
      question: "What letter comes after 'L' in the alphabet?",
      pictureUrl: "https://i.pinimg.com/474x/1f/5d/26/1f5d26f2e9f1fc59f2d7fe52f2b167d8.jpg", // Image of a lion
      choices: ["M", "N", "K", "L"],
      correctAnswer: "M",
    },
    {
      question: "Which of these words is spelled correctly?",
      pictureUrl: "https://i.pinimg.com/474x/2e/56/69/2e5669a876a60ab0392ee57ab8552743.jpg", // Image of a starfish
      choices: ["Starfish", "Starfissh", "Starfih", "Starfishh"],
      correctAnswer: "Starfish",
    },
    {
      question: "What letter comes after 'S' in the alphabet?",
      pictureUrl: "https://i.pinimg.com/474x/85/f8/99/85f8998c2b8f62f40fd5aab57d1f0c61.jpg", // Image of a squid
      choices: ["T", "U", "R", "P"],
      correctAnswer: "T",
    },
    {
      question: "Which of these words is spelled correctly?",
      pictureUrl: "https://i.pinimg.com/474x/f3/26/a5/f326a51964d9fef60405bc61e6e557b1.jpg", // Image of a night owl
      choices: ["Owl", "Oull", "Owl", "Owll"],
      correctAnswer: "Owl",
    },
    {
      question: "Which of these words is spelled correctly?",
      pictureUrl: "https://i.pinimg.com/474x/0c/f1/8d/0cf18d4d71a469bcf0a9a87f0e6b3ac4.jpg", // Image of a jellyfish
      choices: ["Jellyfish", "Jellfish", "Jellyfissh", "Jellifish"],
      correctAnswer: "Jellyfish",
    },
    {
      question: "Which word is missing a letter to complete '_ent'?",
      pictureUrl: "https://i.pinimg.com/474x/29/26/d3/2926d3cbf3c37c59b570f6ebd64fe581.jpg", // Image of a night bat
      choices: ["Bat", "Ant", "Tent", "Pant"],
      correctAnswer: "Tent",
    },
    {
      question: "What letter comes before 'G' in the alphabet?",
      pictureUrl: "https://i.pinimg.com/474x/0b/68/d7/0b68d723efae8697fa69f3a0879a7354.jpg", // Image of a seahorse
      choices: ["F", "E", "H", "G"],
      correctAnswer: "F",
    },
    {
      question: "Which of these words is spelled correctly?",
      pictureUrl: "https://i.pinimg.com/474x/ef/13/64/ef13648e3ad0a8a301df8f4595057c83.jpg", // Image of a shark
      choices: ["Shark", "Sharrk", "Sharkk", "Sharck"],
      correctAnswer: "Shark",
    },
    {
      question: "Which word is missing a letter to complete the word 'ST_R'?",
      pictureUrl: "https://i.pinimg.com/474x/d3/fe/f2/d3fef2abfc1a44e1bd88e00b9f53d66a.jpg", 
      choices: ["A", "O", "S", "R"],
      correctAnswer: "R",
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
    history.push('/tab2');
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

export default Tab5;
