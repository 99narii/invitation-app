import React, { useEffect, useRef } from "react";
import './style.scss';

export const Map: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null); // 지도 컨테이너 접근

  useEffect(() => {
    const loadMap = () => {
      if (container.current) {
        const position = new (window as any).kakao.maps.LatLng(37.53916746934834, 127.06966568023567);
        const options = {
          center: position, // 지도의 중심 좌표
          level: 3, // 지도 확대 레벨
        };
        
        // 지도 생성
        const map = new (window as any).kakao.maps.Map(container.current, options);

        // 마커 생성
        const marker = new (window as any).kakao.maps.Marker({
          position: position, // 마커 위치
          map: map, // 마커를 표시할 지도
        });
      }
    };

    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=e969b8fecceb75ea37f96100d4047054&autoload=false"; // API 키 사용
    script.onload = () => {
      (window as any).kakao.maps.load(loadMap); // kakao.maps.load 사용
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
        <div className="map" ref={container}></div>
    </>
  );
};
