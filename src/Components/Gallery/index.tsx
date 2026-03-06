import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const sliderRef = useRef<Slider>(null);
  const thumbnailRef = useRef<Slider>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isSwipingRef = useRef(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    isSwipingRef.current = false;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return;

    const deltaX = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartRef.current.y);

    // 좌우 스와이프가 상하보다 크면 스크롤 방지
    if (deltaX > deltaY && deltaX > 10) {
      isSwipingRef.current = true;
      e.preventDefault();
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
    isSwipingRef.current = false;
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
    setSelectedImage(image);
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

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: handleAfterChange,
    adaptiveHeight: false,
    swipe: true,
    touchThreshold: 10,
    verticalSwiping: false,
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
      {/* <button onClick={prevSlide} className="slider-button prev-button">◁</button> */}

        <Slider ref={thumbnailRef} {...thumbnailSettings}>
          {images.map((image, index) => (
            <div key={index} className="thumbnail" onClick={() => handleThumbnailClick(image, index)}>
              <img src={image} alt={`Thumbnail ${index}`} />
            </div>
          ))}
        </Slider>
        {/* <button onClick={nextSlide} className="slider-button next-button">▶</button> */}

      </div>
    </div>
  );
};

export default Gallery;
