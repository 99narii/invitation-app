import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faTrainSubway, faBusSimple } from "@fortawesome/free-solid-svg-icons";
import './style.scss';
import ToastNotification from '../Modal';

function Location() {
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
      <div className="location">
        <div onClick={copyAddress}>
            <FontAwesomeIcon icon={faCar} size="2x" />
            <span><b>서울특별시 광진구 자양동 2-2</b></span>
        </div>
        <div className='car'>
            <span>건물 내 B1 ~ B5 / 외부 주차장 / 주차 요원의 안내를 받으세요.</span>
        </div>

        <div>
            <FontAwesomeIcon icon={faTrainSubway} size="2x" />
            <span>지하철 2호선, 7호선 <b>건대입구역 5번 출구 30m</b></span>
        </div>
        <div >
            <FontAwesomeIcon icon={faBusSimple} size="2x" />
            <span><b>건대로데오거리입구</b> 정류장 하차</span>
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
  }
  
  export default Location;