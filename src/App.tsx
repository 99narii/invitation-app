import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import logo from './logo.svg';
import './Styles/style.scss';
import { Button } from '@chakra-ui/react';
import Carousel from './Components/Carousel';
import Countdown from './Components/CountDown';
import Calendar from './Components/Calendar';
import Gallery from './Components/Gallery';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Countdown targetDate="2025-01-04T18:30:00" />
        <Carousel />
        <div className="name">
          <span>유성래</span><i></i><span>김나희</span>   
        </div>
        <div className='date'>
          <span>2025년01월04일 토요일 6시30분</span>
          <span>건대 까사그랑데 센트로 6F</span>
        </div>
        <div className='text'>
          <p>모시는 글</p>
          하얀 눈 처럼 순수한 마음을 가진 두 사람이<br/>
          가장 따뜻한 마음으로 서로를 지켜주는 <br/>
          든든한 가족으로 이제 하나가 되려합니다.<br/>
          귀중한 시간 내어주시어 뜻 깊은 자리에<br/>
          함께 해주시면 감사하겠습니다.
          <p>- 신랑 유성래, 신부 김나희 올림</p>
        </div>
        <Calendar />
        <Gallery />
        <p>Learn React</p>
      </div>
    </ChakraProvider>
  );
}

export default App;
