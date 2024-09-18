import React from 'react';
import logo from './logo.svg';
import './Styles/style.scss';
import { Button } from '@chakra-ui/react';
import Carousel from './Components/Carousel';

function App() {
  return (
    <div className="App">
      <Carousel />
      <div>
        <div>
          <span>신랑</span>  
          <span>유성래</span>  
        </div>
        <div>
          <span>신부</span>  
          <span>김나희</span>  
        </div>
      </div>
    </div>
  );
}

export default App;
