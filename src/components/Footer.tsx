// src/components/Footer.tsx
import React from 'react';
import { IonFooter, IonToolbar, IonLabel } from '@ionic/react';
import './Footer.css'; // Create a CSS file for the footer styles

const Footer: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar className="footer-toolbar">
        <IonLabel className="footer-text">
          © 2024 Happy Feet | Contact: happyfeet@socks.com
        </IonLabel>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
