import React from 'react';
import './App.css';
import TripOrganizer from './TripOrganizer';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Journey Jumble!</h1>
      <TripOrganizer />
    </div>
  );
}

export default App;
