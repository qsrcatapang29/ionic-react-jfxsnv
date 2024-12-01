import React, { useState } from 'react';
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
} from '@ionic/react';
import { useHistory } from 'react-router-dom'; 
import './Tab2.css';

const Tab2: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  /**
   * Updates the form state when an input changes.
   */
  const handleInputChange = (field: string, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));

    // Clear errors when the user types
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };

  /**
   * Validates the form fields and returns whether the form is valid.
   */
  const validateForm = () => {
    const newErrors: any = {};
    if (!form.username.trim()) newErrors.username = 'Username is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required.';
    if (!form.password.trim()) newErrors.password = 'Password is required.';
    if (!form.confirmPassword.trim()) newErrors.confirmPassword = 'Confirm password is required.';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles the registration process.
   */
  const handleRegister = () => {
    if (!validateForm()) {
      return;
    }

    console.log('Registration logic here:', form);

    // Navigate to login after successful registration
    history.push('/tab1');
  };

  /**
   * Navigates to the login page.
   */
  const navigateToLogin = () => {
    history.push('/tab1');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ textAlign: 'center', color: '#fff' }}>FunLearn Registration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="register-content">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="10" sizeMd="6">
              <img 
                src="https://tinyurl.com/2ecwwaaa" 
                alt="FunLearn Logo" 
                className="logo" 
              />
              <h2>Create Your Account!</h2>

              {/* Username Input */}
              <IonItem className={`ion-item ${errors.username ? 'error' : ''}`}>
                <IonLabel position="floating">Username</IonLabel>
                <IonInput
                  type="text"
                  placeholder="Enter your username"
                  value={form.username}
                  onIonChange={(e) => handleInputChange('username', e.detail.value!)}
                />
              </IonItem>
              {errors.username && <IonText color="danger">{errors.username}</IonText>}

              {/* Email Input */}
              <IonItem className={`ion-item ${errors.email ? 'error' : ''}`}>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onIonChange={(e) => handleInputChange('email', e.detail.value!)}
                />
              </IonItem>
              {errors.email && <IonText color="danger">{errors.email}</IonText>}

              {/* Phone Number Input */}
              <IonItem className={`ion-item ${errors.phoneNumber ? 'error' : ''}`}>
                <IonLabel position="floating">Phone Number</IonLabel>
                <IonInput
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phoneNumber}
                  onIonChange={(e) => handleInputChange('phoneNumber', e.detail.value!)}
                />
              </IonItem>
              {errors.phoneNumber && <IonText color="danger">{errors.phoneNumber}</IonText>}

              {/* Password Input */}
              <IonItem className={`ion-item ${errors.password ? 'error' : ''}`}>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onIonChange={(e) => handleInputChange('password', e.detail.value!)}
                />
              </IonItem>
              {errors.password && <IonText color="danger">{errors.password}</IonText>}

              {/* Confirm Password Input */}
              <IonItem className={`ion-item ${errors.confirmPassword ? 'error' : ''}`}>
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onIonChange={(e) => handleInputChange('confirmPassword', e.detail.value!)}
                />
              </IonItem>
              {errors.confirmPassword && <IonText color="danger">{errors.confirmPassword}</IonText>}

              {/* Register Button */}
              <IonButton expand="full" color="success" className="animated-button" onClick={handleRegister}>
                Register
              </IonButton>

              {/* Navigate to Login */}
              <IonText color="medium" style={{ display: 'block', textAlign: 'center', marginTop: '10px' }}>
                Already have an account? <span className="login-link" onClick={navigateToLogin}>Log in here</span>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
