import './Tab3.css';  // Ensure CSS for styling is imported
import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButton, IonLabel, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Tab4: React.FC = () => {
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
      question: "What is the last letter of the alphabet?",
      pictureUrl: "https://i.pinimg.com/474x/19/93/24/199324526a8b4c69b26e2f75194f2873.jpg",
      choices: ["X", "Y", "Z", "A"],
      correctAnswer: "Z",
    },
    {
      question: "What letter is missing in the word _OX",
      pictureUrl: "https://i.pinimg.com/474x/34/00/5a/34005a3dd9424fb53d69db767ae3a4e2.jpg",
      choices: ["F", "D", "P", "B"],
      correctAnswer: "F",
    },
    {
      question: " In the word GRAPE, which letter is second?",
      pictureUrl: "https://i.pinimg.com/474x/73/eb/58/73eb581d1fee288fc8226db646da0d56.jpg",
      choices: ["R", "G", "A", "E"],
      correctAnswer: "R",
    },
    {
      question: "Which word is spelled correctly?",
      pictureUrl: "https://i.pinimg.com/474x/cd/b5/85/cdb585d006958fe9b5967fef06bbf6b1.jpg",
      choices: ["Happle", "Apple", "Applle", "Appl"],
      correctAnswer: "Apple",
    },
    {
      question: " Which of the following words starts with the letter C and is an animal?",
      pictureUrl: "https://i.pinimg.com/474x/0a/f8/88/0af888f25bbc67420bafd9ff16bb337c.jpg",
      choices: ["Cat", "Dog", "Elephant", "Mouse"],
      correctAnswer: "Cat",
    },
    {
      question: "Which of these words is an example of a 4-letter word?",
      pictureUrl: "https://i.pinimg.com/474x/ed/00/ed/ed00ed5438b7771dddd5f118d907c553.jpg",
      choices: ["Giraffe", "Bear", "Elephant", "Sheep"],
      correctAnswer: "Bear",
    },
    {
      question: " Which of these words contains the letter B twice?",
      pictureUrl: "https://i.pinimg.com/474x/93/78/e0/9378e0a9b7ae2417607fda0ccc48b4e6.jpg",
      choices: ["Bubble", "Book", "Bunny", "Bee"],
      correctAnswer: "Bubble",
    },
    {
      question: "Which of the following is a word that ends with the letter 'Y'?",
      pictureUrl: "https://i.pinimg.com/474x/7a/9a/ea/7a9aea98208c577dbdd59367628aa92f.jpg",
      choices: ["Happy", "Run", "Jump", "Smile"],
      correctAnswer: "Happy",
    },
    {
      question: "Which of the following letters comes after P in the alphabet?",
      pictureUrl: "https://i.pinimg.com/474x/a9/f5/c0/a9f5c05caffea27df53a43e17919019e.jpg",
      choices: ["Q", "R", "S", "T"],
      correctAnswer: "Q",
    },
    {
      question: "Which of these letters is used to start the word for the color of the SKY?",
      pictureUrl: "https://i.pinimg.com/474x/79/4e/15/794e1570a8ad62d736aaa88c46a5e02f.jpg",
      choices: ["Q", "S", "B", "C"],
      correctAnswer: "B",
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

export default Tab4;
