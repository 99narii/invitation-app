import React, { useRef, useEffect, useCallback } from 'react';
import Slider from 'react-slick';
import './style.scss';

const images = [
  `${process.env.PUBLIC_URL}/imgs/Gallery/1.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/2.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/3.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/4.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/5.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/6.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/7.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/8.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/9.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/10.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/11.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/12.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/13.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/14.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/15.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/16.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/17.webp`,
  `${process.env.PUBLIC_URL}/imgs/Gallery/18.webp`,
];

const Gallery: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const thumbnailRef = useRef<Slider>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  // 스와이프 상태 ref
  const touchState = useRef({
    startX: 0,
    startY: 0,
    isTracking: false,
    direction: null as 'horizontal' | 'vertical' | null,
  });

  const directionLockDistance = 10;
  const angleLimit = 30;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      isTracking: true,
      direction: null,
    };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchState.current.isTracking) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchState.current.startX;
    const deltaY = touch.clientY - touchState.current.startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // 방향 미정 상태에서 최소 이동 이후 방향 결정
    if (!touchState.current.direction) {
      if (absX < directionLockDistance && absY < directionLockDistance) return;

      const angle = Math.atan2(absY, absX) * (180 / Math.PI);
      touchState.current.direction = angle <= angleLimit ? 'horizontal' : 'vertical';
    }

    // 수평 스와이프로 판별되면 수직 스크롤 차단
    if (touchState.current.direction === 'horizontal') {
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchState.current.isTracking = false;
    touchState.current.direction = null;
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    gallery.addEventListener('touchstart', handleTouchStart, { passive: true });
    gallery.addEventListener('touchmove', handleTouchMove, { passive: false });
    gallery.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      gallery.removeEventListener('touchstart', handleTouchStart);
      gallery.removeEventListener('touchmove', handleTouchMove);
      gallery.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const handleThumbnailClick = (image: string, index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
    if (thumbnailRef.current) {
      thumbnailRef.current.slickGoTo(index);
    }
  };

  const handleAfterChange = (current: number) => {
    if (thumbnailRef.current) {
      thumbnailRef.current.slickGoTo(current);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: handleAfterChange,
    swipeToSlide: true,
    touchThreshold: 10,
  };

  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '0px',
    initialSlide: 0,
    swipe: false,
  };

  return (
    <div className="gallery" ref={galleryRef}>
      <div className="large-image">
        <Slider ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <div key={index} className="image-slide">
              <img src={image} alt={`Slide ${index}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="thumbnails">
        <Slider ref={thumbnailRef} {...thumbnailSettings}>
          {images.map((image, index) => (
            <div key={index} className="thumbnail" onClick={() => handleThumbnailClick(image, index)}>
              <img src={image} alt={`Thumbnail ${index}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;
