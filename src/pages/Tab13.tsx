import React from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader,
IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/react';
import { bulbOutline, pencilOutline, musicalNotesOutline, puzzleOutline,
personCircleOutline, bookOutline, documentTextOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom'; // Import useHistory
import './Tab13.css';

const Dashboard: React.FC = () => {
  const history = useHistory(); // Use history hook

  const navigateToTab = (tab: string) => {
    history.push(`/${tab}`); // Navigate to the specified tab
  };

  // Handle log out
  const handleLogOut = () => {
    // Perform logout logic here, e.g., clear tokens or user data
    console.log('Logging out...');
    // Redirect to the login page or home page
    history.push('/tab10'); // Adjust the route to your login page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Kids Learning Dashboard</IonTitle>
          <IonButton slot="end" onClick={handleLogOut}>
            <IonIcon icon={logOutOutline} /> {/* Log out icon */}
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="dashboard-content">
        <IonGrid className="grid-container">
          <IonRow>
            {/* Alphabet & Number Games */}
            <IonCol size="12" size-md="4">
              <IonCard className="feature-card feature-1">
                <div className="dark-overlay"></div>
                <IonCardHeader>
                  <div className="icon-container">
                    <IonIcon icon={bulbOutline} className="feature-icon" />
                  </div>
                  <h2 className="feature-title">Alphabet & Number Games</h2>
                </IonCardHeader>
                <IonCardContent>
                  <p>Engage with fun games to learn the alphabet and numbers!</p>
                  <IonButton expand="full" className="feature-btn" onClick={() => navigateToTab('tab1')}>Start Game</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            {/* Musical Drawing */}
            <IonCol size="12" size-md="4">
              <IonCard className="feature-card feature-2">
                <div className="dark-overlay"></div>
                <IonCardHeader>
                  <div className="icon-container">
                    <IonIcon icon={musicalNotesOutline} className="feature-icon" />
                  </div>
                  <h2 className="feature-title">Musical Drawing</h2>
                </IonCardHeader>
                <IonCardContent>
                  <p>Draw and create beautiful art while listening to music!</p>
                  <IonButton expand="full" className="feature-btn" onClick={() => navigateToTab('tab16')}>Start Drawing</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            {/* Practice Writing */}
            <IonCol size="12" size-md="4">
              <IonCard className="feature-card feature-3">
                <div className="dark-overlay"></div>
                <IonCardHeader>
                  <div className="icon-container">
                    <IonIcon icon={pencilOutline} className="feature-icon" />
                  </div>
                  <h2 className="feature-title">Practice Writing</h2>
                </IonCardHeader>
                <IonCardContent>
                  <p>Practice writing letters and numbers with guided instructions!</p>
                  <IonButton expand="full" className="feature-btn" onClick={() => navigateToTab('tab17')}>Start Writing</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            {/* StoryTime Adventures */}
            <IonCol size="12" size-md="4">
              <IonCard className="feature-card feature-4">
                <div className="dark-overlay"></div>
                <IonCardHeader>
                  <div className="icon-container">
                    <IonIcon icon={bookOutline} className="feature-icon" />
                  </div>
                  <h2 className="feature-title">StoryTime Adventures</h2>
                </IonCardHeader>
                <IonCardContent>
                  <p>Immerse yourself in fun and educational stories!</p>
                  <IonButton expand="full" className="feature-btn" onClick={() => navigateToTab('tab15')}>Start Story</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            {/* Mini Quizzes */}
            <IonCol size="12" size-md="4">
              <IonCard className="feature-card feature-5">
                <div className="dark-overlay"></div>
                <IonCardHeader>
                  <div className="icon-container">
                    <IonIcon icon={documentTextOutline} className="feature-icon" />
                  </div>
                  <h2 className="feature-title">Mini Quizzes</h2>
                </IonCardHeader>
                <IonCardContent>
                  <p>Test your knowledge with fun and short quizzes!</p>
                  <IonButton expand="full" className="feature-btn" onClick={() => navigateToTab('tab1')}>Take Quiz</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            {/* Feature 6: Customizable Avatar */}
            <IonCol size="12" size-md="4">
              <IonCard className="feature-card feature-6">
                <div className="dark-overlay"></div>
                <IonCardHeader>
                  <div className="icon-container">
                    <IonIcon icon={personCircleOutline} className="feature-icon" />
                  </div>
                  <h2 className="feature-title">Customizable Avatar</h2>
                </IonCardHeader>
                <IonCardContent>
                  <p>Create and customize your own avatar!</p>
                  <IonButton expand="full" className="feature-btn" onClick={() => navigateToTab('tab18')}>Customize Avatar</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
            {/* Feature 7: Parental Dashboard */}
            <IonCol size="12" size-md="4">
              <IonCard className="feature-card feature-7">
                <div className="dark-overlay"></div>
                <IonCardHeader>
                  <div className="icon-container">
                    <IonIcon icon={personCircleOutline} className="feature-icon" />
                  </div>
                  <h2 className="feature-title">Parental Dashboard</h2>
                </IonCardHeader>
                <IonCardContent>
                  <p>Monitor your child’s progress and manage settings!</p>
                  <IonButton expand="full" className="feature-btn" onClick={() => navigateToTab('tab12')}>Go to Dashboard</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
