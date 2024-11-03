import React, { useEffect, useRef, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './Styles/style.scss';
import Carousel from './Components/Carousel';
import Countdown from './Components/CountDown';
import Calendar from './Components/Calendar';
import Gallery from './Components/Gallery';
import { Map } from './Components/Map';
import { BRIDE_NAME, GROOM_NAME, WEDDING_DATE } from './config';

function App() {
  const [dateVisible, setDateVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [scrollDisabled, setScrollDisabled] = useState(false); // 스크롤 비활성화 상태 추가

  const dateRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null); // 갤러리 참조 추가

  const handleScroll = () => {
    if (scrollDisabled) return; // 스크롤 비활성화 상태일 때는 리턴

    const dateElement = dateRef.current;
    const textElement = textRef.current;
    const calendarElement = calendarRef.current;
    const galleryElement = galleryRef.current; // 갤러리 참조

    if (dateElement) {
      const dateInView = dateElement.getBoundingClientRect().top < window.innerHeight && dateElement.getBoundingClientRect().bottom >= 0;
      setDateVisible(dateInView);
    }

    if (textElement) {
      const textInView = textElement.getBoundingClientRect().top < window.innerHeight && textElement.getBoundingClientRect().bottom >= 0;
      setTextVisible(textInView);
    }

    if (calendarElement) {
      const calendarInView = calendarElement.getBoundingClientRect().top < window.innerHeight && calendarElement.getBoundingClientRect().bottom >= 0;
      setCalendarVisible(calendarInView);
    }

    // 갤러리 섹션에 도달했는지 체크
    if (galleryElement) {
      const galleryInView = galleryElement.getBoundingClientRect().top < window.innerHeight && galleryElement.getBoundingClientRect().bottom >= 0;
      if (galleryInView) {
        setScrollDisabled(true); // 갤러리에서 스크롤 비활성화
        setTimeout(() => {
          setScrollDisabled(false); // 일정 시간 후 스크롤 활성화
        }, 1000); // 1초 후 스크롤 활성화
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 렌더링 시 상태 체크
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDisabled]);

  const copyAddress = () => {
    navigator.clipboard.writeText('서울특별시 광진구 자양동 2-2')
      .then(() => {
        alert('주소가 복사되었습니다!');
      })
      .catch(err => {
        console.error('주소 복사 실패');
      });
  };

  return (
    <ChakraProvider>
      <div className="App">
        <Countdown targetDate="2025-01-04T18:30:00" />
        <Carousel />
        <div className={`name fade-up fade-in ${dateVisible ? 'visible' : ''}`} ref={dateRef}>
          <span>{GROOM_NAME}</span><i></i><span>{BRIDE_NAME}</span>
        </div>
        <div className={`date fade-in ${dateVisible ? 'visible' : ''}`} ref={dateRef}>
          <span>{WEDDING_DATE}</span>
          <span>건대 까사그랑데 센트로 6F</span>
        </div>
        <div className={`text fade-in ${textVisible ? 'visible' : ''}`} ref={textRef}>
          <p>모시는 글</p>
          하얀 눈처럼 순수한 마음을 가진 두 사람이<br />
          가장 따뜻한 마음으로 서로를 지켜주는 <br />
          든든한 가족으로 이제 하나가 되려합니다.<br />
          귀중한 시간 내어주시어 뜻 깊은 자리에<br />
          함께 해주시면 감사하겠습니다.
          <p>- 신랑 유성래, 신부 김나희 올림</p>
        </div>
        <div ref={galleryRef}>Gallery</div>
        <Gallery />
        <section className='calendar_section'>
          <Calendar className={`fade-in ${calendarVisible ? 'visible' : ''}`} ref={calendarRef} />
        </section>
        <section>
          <div>오시는 길</div>
          <Map />
        </section>
        <div>
          <span style={{ cursor: 'pointer' }} onClick={copyAddress}>서울특별시 광진구 자양동 2-2</span>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
