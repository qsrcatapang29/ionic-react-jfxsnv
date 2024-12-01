import React, { useState } from 'react';
import { IonPage, IonContent, IonButton, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonButtons } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Tab18.css';

const Home: React.FC = () => {
  const history = useHistory();
  const [gender, setGender] = useState<string>('male');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('/assets/images/boy1.png');

  const handleGenderChange = (newGender: string) => {
    setGender(newGender);
    setSelectedAvatar(`/assets/images/${newGender}1.png`);
  };

  const handleSelectAvatar = (avatarNumber: string) => {
    setSelectedAvatar(`/assets/images/${gender}${avatarNumber}.png`);
  };

  const avatarNumbers = [1, 2, 3, 4, 5];
  const backgroundClass = gender === 'boy' ? 'theme-blue' : 'theme-pink';

  const handleBack = () => {
    history.goBack();
  };

  const handleSave = () => {
    console.log("Avatar saved: ", selectedAvatar);
    alert('Avatar has been saved!');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBack} className="back-button">Back</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handleSave} className="save-button">Save</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className={`content ${backgroundClass}`}>
        <div className="gender-toggle">
          <IonButton className={`gender-button ${gender === 'boy' ? 'active' : ''}`} onClick={() => handleGenderChange('boy')}>
            <img src="/assets/images/male.png" alt="Male" className="gender-image" />
            <span className="gender-label">Male</span>
          </IonButton>
          <IonButton className={`gender-button ${gender === 'girl' ? 'active' : ''}`} onClick={() => handleGenderChange('girl')}>
            <img src="/assets/images/female.png" alt="Female" className="gender-image" />
            <span className="gender-label">Female</span>
          </IonButton>
        </div>

        <div className="avatar-container">
          <img className="avatar" src={selectedAvatar} alt="Selected Avatar" />
        </div>

        <IonGrid className="avatar-grid">
          <IonRow>
            {avatarNumbers.map((avatarNumber) => (
              <IonCol key={avatarNumber} size="6" sizeMd="2" className="avatar-col">
                <IonButton onClick={() => handleSelectAvatar(avatarNumber.toString())} className="avatar-button">
                  <img
                    className="avatar-thumbnail"
                    src={`/assets/images/${gender}${avatarNumber}.png`}
                    alt={`Avatar ${avatarNumber}`}
                  />
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
