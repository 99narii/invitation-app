import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar,faLocationDot, faTrainSubway, faBusSimple } from "@fortawesome/free-solid-svg-icons";
import './style.scss';
import ToastNotification from '../Modal';
import React, { forwardRef } from 'react';

interface LocationProps {
  className?: string;
}

const Location = forwardRef<HTMLDivElement, LocationProps>(({ className }, ref) => {
  const { showToast } = ToastNotification();
  
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
    <div className={`location ${className}`} ref={ref}>
      <div onClick={copyAddress}>
          <a target="_blank" rel="noopener noreferrer" href='https://m.map.kakao.com/actions/routeView?startLoc=&endLoc=%EA%B9%8C%EC%82%AC%EA%B7%B8%EB%9E%91%EB%8D%B0+%EC%84%BC%ED%8A%B8%EB%A1%9C&exEnc=MNSNUM&eyEnc=QNLOMNS&ids=%2CP67986660&service='>
          <FontAwesomeIcon icon={faLocationDot} size="2x" style={{color: '#fff',}} />
          카카오 길찾기</a>
      </div>
      <div onClick={copyAddress}>
          <FontAwesomeIcon icon={faCar} size="2x" style={{color: '#6b5a6b',}} />
          <span><b>서울특별시 광진구 자양동 2-2</b></span>
      </div>
      <div className='car'>
          <span>건물 내 B1 ~ B5 / 외부 주차장 / 주차 요원의 안내를 받으세요.</span>
      </div>
      <div>
          <FontAwesomeIcon icon={faTrainSubway} size="2x" style={{color: '#6b5a6b',}}/>
          <span>지하철 2호선, 7호선 건대입구역 5번 출구 30m</span>
      </div>
      <div>
          <FontAwesomeIcon icon={faBusSimple} size="2x" style={{color: '#6b5a6b',}}/>
          <span>건대로데오거리입구 정류장 하차</span>
      </div>
      <div className='bus'>
          <span>간선버스 : 240, 721</span>
          <span>공항버스 : 6013</span>
          <span>지선버스 : 2222, 2224</span>
          <span>마을버스 : 광진05</span>
          <span>직행버스 : 3500</span>
      </div>
    </div>
  );
});

export default Location;
