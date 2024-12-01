import './Tab2.css';  // Make sure to import the CSS for styling
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/react';
import { arrowBack } from 'ionicons/icons'; // Import the arrow icon

const Tab2: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButton 
          slot="start" 
          routerLink="/tab1" 
          fill="clear" 
          className="custom-back-button">
          <IonIcon icon={arrowBack} className="custom-back-icon" />
        </IonButton>
        <IonTitle>FunLearn | Difficulty</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding page-background"> {/* Add the page-background class */}
      <div className="description-container">
        <h2 className="description-title">Select Difficulty</h2>
        
      </div>
      <IonButton expand="block" routerLink="/tab3" className="custom-ion-button success">
  Easy
</IonButton>
<IonButton expand="block" routerLink="/tab4" className="custom-ion-button warning">
  Medium
</IonButton>
<IonButton expand="block" routerLink="/tab5" className="custom-ion-button danger">
  Hard
</IonButton>


    </IonContent>
  </IonPage>
);

export default Tab2;
