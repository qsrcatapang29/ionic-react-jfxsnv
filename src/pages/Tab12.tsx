import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonModal, IonIcon } from '@ionic/react';
import { homeOutline, arrowBack } from 'ionicons/icons'; // Import the necessary icons
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
import './Tab12.css';

// Activity data
const activities = [
  { title: 'Math Games', progress: '75%', lastPlayed: '2 days ago', description: 'A collection of fun math games to improve calculation skills.' },
  { title: 'Reading Skills', progress: '60%', lastPlayed: '3 days ago', description: 'Activities focused on improving vocabulary and reading comprehension.' },
  { title: 'Exploration', progress: '40%', lastPlayed: '5 days ago', description: 'Interactive science experiments and explorations.' },
];

// ActivityCard component for individual activity details
const ActivityCard: React.FC<{ activity: any; onClick: () => void }> = ({ activity, onClick }) => (
  <IonCard className="activity-card" onClick={onClick} button>
    <IonCardHeader>
      <IonCardTitle>{activity.title}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <p>Progress: {activity.progress}</p>
      <p>Last Played: {activity.lastPlayed}</p>
    </IonCardContent>
  </IonCard>
);

const Tab3: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const history = useHistory(); // Use history hook for navigation

  // Open the modal and set the selected activity
  const openActivityModal = (activity: any) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  // Navigate to Tab4 (Home)
  const goToHome = () => {
    history.push('/tab13'); // Navigate to Tab4
  };

  // Navigate back to the previous page
  const goBack = () => {
    history.goBack(); // Go back to the previous page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" onClick={goBack}>
            <IonIcon icon={arrowBack} /> {/* Back arrow icon */}
          </IonButton>
          <IonTitle>Parental Dashboard</IonTitle>
          <IonButton slot="end" onClick={goToHome}>
            <IonIcon icon={homeOutline} /> {/* House icon */}
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="dashboard-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Parental Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Child's Summary Section */}
        <IonCard className="summary-card">
          <IonCardHeader>
            <IonCardSubtitle>Overview</IonCardSubtitle>
            <IonCardTitle>Child's Activity Summary</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Total Learning Time: 5 hours</p>
            <p>Achievements Unlocked: 8</p>
            <p>Last Login: 1 day ago</p>
          </IonCardContent>
        </IonCard>

        {/* Activity Cards */}
        <IonGrid>
          <IonRow>
            {activities.map((activity, index) => (
              <IonCol size="12" key={index}>
                <ActivityCard activity={activity} onClick={() => openActivityModal(activity)} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Modal for Activity Details */}
        <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedActivity?.title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedActivity && (
              <>
                <p><strong>Progress:</strong> {selectedActivity.progress}</p>
                <p><strong>Last Played:</strong> {selectedActivity.lastPlayed}</p>
                <p><strong>Description:</strong> {selectedActivity.description}</p>
              </>
            )}
            <IonButton expand="block" color="medium" onClick={closeModal}>
              Close
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
