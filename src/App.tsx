import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5';
import Tab6 from './pages/Tab6';
import Tab7 from './pages/Tab7';
import Tab8 from './pages/Tab8';
import Tab9 from './pages/Tab9';
import Tab10 from './pages/Tab10';
import Tab11 from './pages/Tab11';
import Tab12 from './pages/Tab12';
import Tab13 from './pages/Tab13';
import Tab14 from './pages/Tab14';
import Tab15 from './pages/Tab15';
import Tab16 from './pages/Tab16';
import Tab17 from './pages/Tab17';
import Tab18 from './pages/Tab18';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/tab1" component={Tab1} exact={true} />
        <Route path="/tab2" component={Tab2} exact={true} />
        <Route path="/tab3" component={Tab3} exact={true} />
        <Route path="/tab4" component={Tab4} exact={true} />
        <Route path="/tab5" component={Tab5} exact={true} />
        <Route path="/tab6" component={Tab6} exact={true} />
        <Route path="/tab7" component={Tab7} exact={true} />
        <Route path="/tab8" component={Tab8} exact={true} />
        <Route path="/tab9" component={Tab9} exact={true} />
        <Route path="/tab10" component={Tab10} exact={true} />
        <Route path="/tab11" component={Tab11} exact={true} />
        <Route path="/tab12" component={Tab12} exact={true} />
        <Route path="/tab13" component={Tab13} exact={true} />
        <Route path="/tab14" component={Tab14} exact={true} />
        <Route path="/tab15" component={Tab15} exact={true} />
        <Route path="/tab16" component={Tab16} exact={true} />
        <Route path="/tab17" component={Tab17} exact={true} />
        <Route path="/tab18" component={Tab18} exact={true} />
        <Route path="/" render={() => <Redirect to="/tab10" />} exact={true} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
