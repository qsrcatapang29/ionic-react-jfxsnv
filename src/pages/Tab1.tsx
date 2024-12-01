import './Tab1.css'; // Ensure the CSS contains the styling for the background
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/react';
import { homeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const Tab1: React.FC = () => {
  const history = useHistory(); // Use history hook to navigate

  // Navigate to tab13 (Home)
  const goHome = () => {
    history.push('/tab13');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>FunLearn</IonTitle>
          <IonButton slot="end" onClick={goHome}>
            <IonIcon icon={homeOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center page-background">
        {/* Bubble Animation Effect */}
        <div className="bubble-animation"></div>

        {/* Description Section */}
        <div className="description-container">
          <h2 className="description-title">MINI QUIZ</h2>
          <p className="description-text">
            Are you ready to start the mini quiz? Choose a category before you start! Enjoy and Good Luck!
          </p>
        </div>

        {/* Container for Alphabet Category */}
        <div className="feature-card feature-1" onClick={() => window.location.href = "/tab2"}>
          <div className="dark-overlay"></div>
          <div className="text-content">
            <p className="feature-title">Alphabet</p>
            <p>Explore the alphabet category and test your knowledge!</p>
            <IonButton expand="block" color="primary" onClick={() => window.location.href = "/tab2"}>
              Take Quiz
            </IonButton>
          </div>
        </div>

        {/* Container for Numbers Category */}
        <div className="feature-card feature-2" onClick={() => window.location.href = "/tab6"}>
          <div className="dark-overlay"></div>
          <div className="text-content">
            <p className="feature-title">Numbers</p>
            <p>Test your skills in the Numbers category!</p>
            <IonButton expand="block" color="primary" onClick={() => window.location.href = "/tab6"}>
              Take Quiz
            </IonButton>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
