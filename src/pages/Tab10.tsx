import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSpinner,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Tab10.css';

const Tab1: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  // Update credentials here
  const validUsername = 'funlearn';
  const validPassword = '123';

  const handleLogin = async () => {
    setError('');

    if (!username || !password) {
      setError('Both username and password are required.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      if (username === validUsername && password === validPassword) {
        history.push('/tab13'); // Redirect to tab3 on success
      } else if (username !== validUsername) {
        setError('Invalid username!');
      } else if (password !== validPassword) {
        setError('Invalid password!');
      } else {
        setError('Invalid username or password!');
      }
    }, 1500); // Simulate a 1.5-second network delay
  };

  return (
    <IonPage>
      {isSplashVisible ? (
        <IonContent className="splash-screen">
          <div className="splash-content">
            <img
              className="splash-image"
              src="https://i.pinimg.com/736x/5f/bb/89/5fbb89771e0a38d5663694bbf27f36eb.jpg"
              alt="Splash"
            />
            <h1>Welcome to FunLearn!</h1>
            <div className="loading-spinner"></div>
          </div>
        </IonContent>
      ) : (
        <>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle style={{ textAlign: 'center', color: '#fff' }}>
                FunLearn Log In
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen className="login-content">
            <IonGrid>
              <IonRow className="ion-justify-content-center">
                <IonCol size="10" sizeMd="6">
                  <img
                    src="https://i.pinimg.com/736x/5f/bb/89/5fbb89771e0a38d5663694bbf27f36eb.jpg"
                    alt="FunLearn Logo"
                    className="logo"
                  />
                  <h2>Welcome to FunLearn!</h2>
                  <IonItem
                    className={`ion-item ${
                      !username && error ? 'error' : ''
                    }`}
                  >
                    <IonLabel position="floating">Username</IonLabel>
                    <IonInput
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onIonChange={(e) => setUsername(e.detail.value!)}
                    />
                  </IonItem>
                  {!username && error && (
                    <IonText color="danger">Username is required.</IonText>
                  )}
                  <IonItem
                    className={`ion-item ${
                      !password && error ? 'error' : ''
                    }`}
                  >
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                  </IonItem>
                  {!password && error && (
                    <IonText color="danger">Password is required.</IonText>
                  )}
                  {error && (
                    <IonText
                      color="danger"
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        marginTop: '10px',
                      }}
                    >
                      {error}
                    </IonText>
                  )}
                  <IonButton
                    expand="full"
                    color="success"
                    className="animated-button"
                    onClick={handleLogin}
                  >
                    {isLoading ? <IonSpinner name="dots" /> : 'Log In'}
                  </IonButton>
                  <IonText
                    color="medium"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      marginTop: '10px',
                    }}
                  >
                    Don't have an account?{' '}
                    <span
                      className="register-link"
                      onClick={() => history.push('/tab14')}
                    >
                      Register here
                    </span>
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};

export default Tab1;
