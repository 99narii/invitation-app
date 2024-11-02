import React, { useEffect, useRef, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import logo from './logo.svg';
import './Styles/style.scss';
import { Button } from '@chakra-ui/react';
import Carousel from './Components/Carousel';
import Countdown from './Components/CountDown';
import Calendar from './Components/Calendar';
import Gallery from './Components/Gallery';
import { Map } from './Components/Map';

function App() {
  const [dateVisible, setDateVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const dateRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const dateElement = dateRef.current;
    const textElement = textRef.current;

    if (dateElement) {
      const dateInView = dateElement.getBoundingClientRect().top < window.innerHeight && dateElement.getBoundingClientRect().bottom >= 0;
      setDateVisible(dateInView);
    }

    if (textElement) {
      const textInView = textElement.getBoundingClientRect().top < window.innerHeight && textElement.getBoundingClientRect().bottom >= 0;
      setTextVisible(textInView);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 렌더링 시 상태 체크
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <ChakraProvider>
      <div className="App">
        <Countdown targetDate="2025-01-04T18:30:00" />
        <Carousel />
        <div className={`name fade-up fade-in ${dateVisible ? 'visible' : ''}`} ref={dateRef}>
          <span>유성래</span><i></i><span>김나희</span>   
        </div>
        <div className={`date fade-in ${dateVisible ? 'visible' : ''}`} ref={dateRef}>
          <span>2025년01월04일 토요일 6시30분</span>
          <span>건대 까사그랑데 센트로 6F</span>
        </div>
        <div className={`text fade-up ${textVisible ? 'visible' : ''}`} ref={textRef}>
          <p>모시는 글</p>
          하얀 눈 처럼 순수한 마음을 가진 두 사람이<br/>
          가장 따뜻한 마음으로 서로를 지켜주는 <br/>
          든든한 가족으로 이제 하나가 되려합니다.<br/>
          귀중한 시간 내어주시어 뜻 깊은 자리에<br/>
          함께 해주시면 감사하겠습니다.
          <p>- 신랑 유성래, 신부 김나희 올림</p>
        </div>
        <div>Gallery</div>
        <Gallery />
        <section className='calendar_section'>
          <Calendar />
        </section>
        <section>
          <div>오시는 길</div>
          <Map />
        </section>
        <div>
          <span>주소</span>
          <span>주소</span>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
