import React, { useEffect, useRef, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './Styles/style.scss';
import Carousel from './Components/Carousel';
import Countdown from './Components/CountDown';
import Calendar from './Components/Calendar';
import Gallery from './Components/Gallery';
import { Map } from './Components/Map';
import { BRIDE_NAME, GROOM_NAME, WEDDING_DATE } from './config';
import AccordionAccount from './Components/Accordion';
import ToastNotification from './Components/Modal';
import Footer from './Components/Footer';

function App() {
  const [dateVisible, setDateVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [scrollDisabled, setScrollDisabled] = useState(false);
  const { showToast } = ToastNotification();

  const dateRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (event: WheelEvent) => {
    if (scrollDisabled) return;

    const delta = event.deltaY;
    const scrollSensitivity = 0.3; // 스크롤 민감도 조정

    event.preventDefault(); // 기본 스크롤 동작 방지

    const currentScroll = window.scrollY;
    const newScroll = currentScroll + delta * scrollSensitivity;

    window.scrollTo({
      top: newScroll,
      behavior: 'smooth',
    });
  };

  const checkVisibility = () => {
    const dateElement = dateRef.current;
    const textElement = textRef.current;
    const calendarElement = calendarRef.current;
    const galleryElement = galleryRef.current;

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

    if (galleryElement) {
      const galleryInView = galleryElement.getBoundingClientRect().top < window.innerHeight && galleryElement.getBoundingClientRect().bottom >= 0;
      if (galleryInView) {
        setScrollDisabled(true);
        setTimeout(() => {
          setScrollDisabled(false); 
        }, 1000);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('wheel', handleScroll); // 스크롤 이벤트 리스너 추가
    checkVisibility();
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('wheel', handleScroll);
    };
  }, [scrollDisabled]);

  const copyAddress = () => {
    navigator.clipboard.writeText('서울특별시 광진구 자양동 2-2')
      .then(() => {
        showToast('주소가 복사되었습니다.', '#9b819b');
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
        <div ref={galleryRef} className='section_title'>Gallery</div>
        <Gallery />
        <section className='calendar_section'>
          <Calendar className={`fade-in ${calendarVisible ? 'visible' : ''}`} ref={calendarRef} />
        </section>
        <section>
          <div className='section_title'>마음 전하실 곳</div>
          <AccordionAccount />
        </section>
        <section>
          <div className='section_title'>오시는 길</div>
          <Map />
        </section>
        <div>
          <span style={{ cursor: 'pointer' }} onClick={copyAddress}>서울특별시 광진구 자양동 2-2</span>
        </div>
      </div>
      <Footer/>
    </ChakraProvider>
  );
}

export default App;
