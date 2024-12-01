import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonImg } from '@ionic/react';
import './Tab15.css';




// Define an array of stories with images, titles, descriptions, and multiple scenarios
const stories = [
  { 
    id: 1, 
    title: 'The Adventure Begins', 
    imgSrc: 'https://img.freepik.com/premium-vector/kids-go-hiking-adventures-summer-camp-woods_763064-661.jpg?w=996', 
    description: 'An exciting adventure begins as you embark on a journey!',
    scenarios: [
      { 
        text: 'Once upon a time, in a land far away, an exciting adventure began...',
        imgSrc: 'https://th.bing.com/th/id/OIP.SEJoSvFoCuSQF4H76AncqAHaHa?w=700&h=700&rs=1&pid=ImgDetMain',
      },
      { 
        text: 'The adventurer packed their bags, ready to face whatever challenges lay ahead...',
        imgSrc: 'https://img.freepik.com/premium-photo/pixel-adventure-enchanting-cover-children-s-book-set-dark-forests_931866-24293.jpg',
      },
      { 
        text: 'And so, the journey began as they entered the dense forest, full of mysteries...',
        imgSrc: 'https://img.freepik.com/premium-photo/pixel-adventure-enchanting-cover-children-s-book-set-dark-forests_931866-24537.jpg',
      },
      { 
        text: 'Suddenly, they heard a rustling in the trees. Something was moving near them...',
        imgSrc: 'https://img.freepik.com/premium-photo/pixel-adventure-enchanting-cover-children-s-book-set-dark-forests_931866-24310.jpg',
      },
    ],
  },
  { 
    id: 2, 
    title: 'Jungle Quest', 
    imgSrc: 'https://i.pinimg.com/originals/69/a1/a2/69a1a276b2f7160a5867085766ec6907.jpg', 
    description: 'The jungle holds secrets and treasures waiting to be discovered.',
    scenarios: [
      { 
        text: 'Deep in the jungle, hidden amongst the trees, a great treasure awaited...',
        imgSrc: 'https://st2.depositphotos.com/2835207/9749/v/600/depositphotos_97496876-stock-illustration-jungle-forest-landscape.jpg',
      },
      { 
        text: 'The adventurer noticed strange markings on the trees, leading them deeper into the jungle...',
        imgSrc: 'https://img.freepik.com/free-vector/cartoon-jungle-background-with-tall-trees_23-2148948480.jpg',
      },
      { 
        text: 'Finally, they arrived at the heart of the jungle, where the treasure was hidden beneath the vines...',
        imgSrc: 'https://cdnb.artstation.com/p/assets/images/images/048/145/017/large/w-sofa-a.jpg?1649308114',
      },
      { 
        text: 'A huge waterfall blocked their path. Would they be able to cross and reach the treasure?',
        imgSrc: 'https://static.vecteezy.com/system/resources/previews/000/684/764/non_2x/a-simple-waterfall-nature-landscape-vector.jpg',
      },
    ],
  },
  { 
    id: 3, 
    title: 'The Lost Treasure', 
    imgSrc: 'https://static.vecteezy.com/system/resources/previews/015/485/998/non_2x/cave-with-treasure-gold-coins-and-jewelry-free-vector.jpg', 
    description: 'An ancient treasure map leads you on a thrilling quest.',
    scenarios: [
      { 
        text: 'With the map in hand, the search for the lost treasure began. The path was long, but the reward was worth it...',
        imgSrc: 'path/to/treasure1.jpg',
      },
      { 
        text: 'They crossed mountains and valleys, following the cryptic symbols on the map...',
        imgSrc: 'path/to/treasure2.jpg',
      },
      { 
        text: 'At last, they reached the ancient temple where the treasure was said to be hidden...',
        imgSrc: 'path/to/treasure3.jpg',
      },
      { 
        text: 'Inside the temple, the air was thick with mystery, and the treasure seemed just within reach...',
        imgSrc: 'path/to/treasure4.jpg',
      },
    ],
  },
  { 
    id: 4, 
    title: 'Magic in the Forest', 
    imgSrc: 'https://static.vecteezy.com/system/resources/previews/003/843/723/non_2x/enchanted-forest-landscape-background-free-vector.jpg', 
    description: 'Magic lurks in the heart of the forest, waiting to be uncovered.',
    scenarios: [
      { 
        text: 'As the sun set, the forest began to glow with magical lights, beckoning the adventurer closer...',
        imgSrc: 'path/to/forest1.jpg',
      },
      { 
        text: 'The adventurer discovered a hidden path that led deep into the enchanted woods...',
        imgSrc: 'path/to/forest2.jpg',
      },
      { 
        text: 'A wise old owl appeared, offering a cryptic riddle that would unlock the forest’s secrets...',
        imgSrc: 'path/to/forest3.jpg',
      },
      { 
        text: 'At the heart of the forest, a mystical creature emerged, offering the adventurer a gift...',
        imgSrc: 'path/to/forest4.jpg',
      },
    ],
  },
  { 
    id: 5, 
    title: 'Space Journey', 
    imgSrc: 'https://www.shutterstock.com/image-vector/space-adventure-cartoon-set-astronaut-600nw-2153284009.jpg', 
    description: 'A journey beyond the stars in search of alien life and adventure.',
    scenarios: [
      { 
        text: 'Blast off into the unknown, as you travel through the stars on a quest to discover alien life...',
        imgSrc: 'path/to/space1.jpg',
      },
      { 
        text: 'The spaceship soared past distant planets and asteroids, speeding towards an unknown galaxy...',
        imgSrc: 'path/to/space2.jpg',
      },
      { 
        text: 'Suddenly, a strange signal appeared on the radar. Was it an alien ship or something else?',
        imgSrc: 'path/to/space3.jpg',
      },
      { 
        text: 'They encountered a strange alien race who offered to share their advanced technology...',
        imgSrc: 'path/to/space4.jpg',
      },
    ],
  },
  { 
    id: 6, 
    title: 'The Haunted House', 
    imgSrc: 'https://media.istockphoto.com/vectors/cartoon-creepy-haunted-house-halloween-night-vector-id1054493570?k=6&m=1054493570&s=612x612&w=0&h=EP1_0GIGPTHh15vsHTqOLROBLibgb-YgisDWQQhq09g=', 
    description: 'Explore a spooky haunted house filled with mystery and secrets.',
    scenarios: [
      { 
        text: 'The doors creaked open slowly as the adventurer stepped inside the haunted house, ready for the mystery that awaited...',
        imgSrc: 'path/to/haunted1.jpg',
      },
      { 
        text: 'The air grew colder as they explored the eerie corridors, each room more unsettling than the last...',
        imgSrc: 'path/to/haunted2.jpg',
      },
      { 
        text: 'A shadow moved quickly across the wall, sending a chill down the adventurer’s spine...',
        imgSrc: 'path/to/haunted3.jpg',
      },
      { 
        text: 'At the heart of the house, a ghostly figure appeared, revealing the dark secret of the mansion...',
        imgSrc: 'path/to/haunted4.jpg',
      },
    ],
  },
  { 
    id: 7, 
    title: 'The Time Traveler', 
    imgSrc: 'https://i.pinimg.com/originals/48/c7/9f/48c79fe600a1928140c52abe66876b49.jpg', 
    description: 'Travel through time to uncover ancient secrets and future mysteries.',
    scenarios: [
      { 
        text: 'With a twist of the dial, the time traveler was whisked away to the past, to uncover secrets long forgotten...',
        imgSrc: 'path/to/time1.jpg',
      },
      { 
        text: 'In ancient Egypt, the adventurer discovered a hidden tomb filled with treasures from a forgotten era...',
        imgSrc: 'path/to/time2.jpg',
      },
      { 
        text: 'A mysterious figure appeared, warning the adventurer about the consequences of meddling with time...',
        imgSrc: 'path/to/time3.jpg',
      },
      { 
        text: 'The adventurer then traveled to the distant future, where humanity had evolved into something beyond recognition...',
        imgSrc: 'path/to/time4.jpg',
      },
    ],
  },
  { 
    id: 8, 
    title: 'Dragon’s Lair', 
    imgSrc: 'https://theretronetwork.com/wp-content/uploads/2023/01/Dragons-Lair.jpg', 
    description: 'A perilous journey to a dragon’s lair to recover a stolen treasure.',
    scenarios: [
      { 
        text: 'Braving the dark caves, the adventurer approached the dragon’s lair, hoping to recover the stolen treasure before it was too late...',
        imgSrc: 'path/to/dragon1.jpg',
      },
      { 
        text: 'The dragon’s eyes glowed in the darkness, watching the adventurer’s every move...',
        imgSrc: 'path/to/dragon2.jpg',
      },
      { 
        text: 'The adventurer found the treasure, but the dragon was guarding it fiercely. What will happen next?',
        imgSrc: 'path/to/dragon3.jpg',
      },
      { 
        text: 'A battle ensued, but the adventurer used their wits to outsmart the dragon and escape with the treasure...',
        imgSrc: 'path/to/dragon4.jpg',
      },
    ],
  },
  { 
    id: 9, 
    title: 'Mystery Island', 
    imgSrc: 'https://img.freepik.com/premium-photo/tropical-island-sea-illustration_35766-3084.jpg', 
    description: 'Solve the mystery of a strange island that appears on no maps.',
    scenarios: [
      { 
        text: 'A mysterious island suddenly appeared on the horizon, and the adventurer was determined to uncover its secrets...',
        imgSrc: 'path/to/island1.jpg',
      },
      { 
        text: 'On the island, strange ruins were scattered everywhere, hinting at a long-lost civilization...',
        imgSrc: 'path/to/island2.jpg',
      },
      { 
        text: 'As they explored deeper, the adventurer discovered an ancient artifact that could unlock the island’s mystery...',
        imgSrc: 'path/to/island3.jpg',
      },
      { 
        text: 'But the artifact also triggered a series of dangerous traps! Will the adventurer escape unscathed?',
        imgSrc: 'path/to/island4.jpg',
      },
    ],
  },
];




const StorySelectionScreen: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<any | null>(null); // State for selected story
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0); // Track current scenario
  const [action, setAction] = useState<'reading' | 'listening' | null>(null); // State for action (reading or listening)
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false); // State to track if reading aloud is active




  // Handle story selection
  const handleStorySelect = (story: any) => {
    setSelectedStory(story); // Set the selected story
    setCurrentScenarioIndex(0); // Start from the first scenario
  };




  // Handle 'Begin Reading' button click
  const handleBeginReading = () => {
    setAction('reading');
  };




  // Handle 'Listen to Story' button click
  const handleListenToStory = () => {
    setAction('listening');
  };


  const handleBackSelection = () => {
    setAction('listening');
  };


  // Handle Next button click in the Reading Screen
  const handleNextScenario = () => {
    if (currentScenarioIndex < selectedStory.scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1); // Go to the next scenario
    }
  };




  // Handle Back button click in the Reading Screen
  const handleBackScenario = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1); // Go back to the previous scenario
    }
  };


  // Function to speak the text using the SpeechSynthesis API
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Set language to English
      utterance.pitch = 1; // Adjust pitch (optional)
      utterance.rate = 1; // Adjust rate of speech (optional)




      // Add event listener for when the speech ends
      utterance.onend = () => {
        setIsReadingAloud(false); // Set to "not reading aloud" once the speech ends
      };




      // Start the speech synthesis
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };




  // Handle Read Aloud button click
  const handleReadAloud = () => {
    const currentText = selectedStory.scenarios[currentScenarioIndex].text;




    if (!isReadingAloud) {
      setIsReadingAloud(true); // Mark as reading aloud
      speakText(currentText); // Start reading aloud the current scenario text
    } else {
      window.speechSynthesis.cancel(); // Stop speech synthesis if already reading aloud
      setIsReadingAloud(false); // Mark as not reading aloud
    }
  };




  // Update useEffect to NOT speak automatically when entering listening mode
  useEffect(() => {
    // No automatic speaking here, only speak when the user presses "Read Aloud"
  }, [currentScenarioIndex, action, selectedStory]);




  // Reading Screen component with content for kids
  const ReadingScreen: React.FC<{ story: any }> = ({ story }) => {
    const currentScenario = story.scenarios[currentScenarioIndex]; // Get the current scenario




    return (
      <div className="reading-screen">
        <h2>{story.title}</h2>
        <IonImg className="story-detail-image" src={currentScenario.imgSrc} alt={story.title} />
        <p>{currentScenario.text}</p>




        <div className="navigation-buttons">
          <IonButton
            expand="block"
            fill="solid"
            color="secondary"
            onClick={handleBackScenario}
            disabled={currentScenarioIndex === 0} // Disable back button on the first scenario
          >
            Back
          </IonButton>
          <IonButton
            expand="block"
            fill="solid"
            color="primary"
            onClick={handleNextScenario}
            disabled={currentScenarioIndex === story.scenarios.length - 1} // Disable next button on the last scenario
          >
            Next
          </IonButton>
        </div>




        <IonButton
          expand="block"
          fill="solid"
          color="primary"
          onClick={() => setAction(null)} // Go back to Story Selection screen
        >
          Go Back to Story Selection
        </IonButton>
      </div>
    );
  };




  // Listening Screen component with audio content for kids
  const ListeningScreen: React.FC<{ story: any }> = ({ story }) => {
    const currentScenario = story.scenarios[currentScenarioIndex]; // Get the current scenario




    return (
      <div className="reading-screen">
        <h2>{story.title}</h2>
        <IonImg className="story-detail-image" src={currentScenario.imgSrc} alt={story.title} />
        <p>{currentScenario.text}</p>




        <div className="navigation-buttons">
          <IonButton
            expand="block"
            fill="solid"
            color="secondary"
            onClick={handleBackScenario}
            disabled={currentScenarioIndex === 0} // Disable back button on the first scenario
          >
            Back
          </IonButton>
          <IonButton
            expand="block"
            fill="solid"
            color="primary"
            onClick={handleNextScenario}
            disabled={currentScenarioIndex === story.scenarios.length - 1} // Disable next button on the last scenario
          >
            Next
          </IonButton>
        </div>




        {/* Read Aloud Button */}
        <IonButton
          expand="block"
          fill="solid"
          color="primary"
          onClick={handleReadAloud}
        >
          {isReadingAloud ? "Stop Reading" : "Read Aloud"}
        </IonButton>




        <IonButton
          expand="block"
          fill="solid"
          color="primary"
          onClick={() => setAction(null)} // Go back to Story Selection screen
        >
          Go Back to Story Selection
        </IonButton>
      </div>
    );
  };




  return (
    <IonPage>
      <IonHeader>
  <IonToolbar>
    
    <IonTitle>Storytime Adventure</IonTitle>
    <IonButton slot="end" onClick={() => window.location.href = '/tab13'} color="primary">
      Home
    </IonButton>
  </IonToolbar>
</IonHeader>

      <IonContent fullscreen>
        <div className="storytime-container">
          {/* Conditionally render based on whether a story is selected and the action */}
          {!selectedStory ? (
            // Story Selection Screen
            <div className="story-selection">
              <h2>Select a Story to Begin</h2>
              <p>Choose one of the exciting stories to begin your adventure!</p>




              <div className="story-grid">
                {stories.map((story) => (
                  <div key={story.id} className="story-box" onClick={() => handleStorySelect(story)}>
                    <IonImg className="story-image" src={story.imgSrc} alt={story.title} />
                    <h3 className="story-title">{story.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          ) : action === 'reading' ? (
            // Reading Screen
            <ReadingScreen story={selectedStory} />
          ) : action === 'listening' ? (
            // Listening Screen
            <ListeningScreen story={selectedStory} />
          ) : (
            // Story Detail Screen
            <div className="story-detail">
              <h2>{selectedStory.title}</h2>
              <IonImg className="story-detail-image" src={selectedStory.imgSrc} alt={selectedStory.title} />
              <p>{selectedStory.description}</p>




              <IonButton expand="block" color="primary" onClick={handleBeginReading}>
                Begin Reading
              </IonButton>




              <IonButton expand="block" color="secondary" onClick={handleListenToStory}>
                Listen to Story
              </IonButton>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};




export default StorySelectionScreen;