import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import './style.scss';

const images = [
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/1.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/2.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/3.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/4.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/5.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/6.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/7.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/8.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/9.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/10.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/11.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/12.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/13.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/14.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/15.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/16.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/17.jpg',
  'https://raw.githubusercontent.com/99narii/invitation-app/gh-pages/imgs/Gallery/18.jpg',
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const sliderRef = useRef<Slider>(null);
  const thumbnailRef = useRef<Slider>(null);

  const handleThumbnailClick = (image: string, index: number) => {
    setSelectedImage(image);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
    if (thumbnailRef.current) {
      thumbnailRef.current.slickGoTo(0); // 썸네일 슬라이드를 항상 첫 번째로 이동
    }
  };

  const handleAfterChange = (current: number) => {
    if (thumbnailRef.current) {
      thumbnailRef.current.slickGoTo(current); // 현재 슬라이드에 맞춰 썸네일 이동
    }
  };

  const nextThumbnailSlide = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.slickNext();
    }
  };

  const prevThumbnailSlide = () => {
    if (thumbnailRef.current) {
      thumbnailRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: handleAfterChange,
    adaptiveHeight: true,
  };

  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    initialSlide: 0,
  };

  return (
    <div className="gallery">
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
        {/* <button onClick={prevThumbnailSlide} className="slider-button prev-button">◀</button> */}
        <Slider ref={thumbnailRef} {...thumbnailSettings}>
          {images.map((image, index) => (
            <div key={index} className="thumbnail" onClick={() => handleThumbnailClick(image, index)}>
              <img src={image} alt={`Thumbnail ${index}`} />
            </div>
          ))}
        </Slider>
        {/* <button onClick={nextThumbnailSlide} className="slider-button next-button">▶</button> */}
      </div>
    </div>
  );
};

export default Gallery;
