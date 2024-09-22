import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import './style.scss'; // SCSS 파일을 불러옵니다.

const images = [
  '/imgs/gallery/1.jpg',
  '/imgs/gallery/2.jpg',
  '/imgs/gallery/3.jpg',
  '/imgs/gallery/4.jpg',
  '/imgs/gallery/5.jpg',
  '/imgs/gallery/6.jpg',
  '/imgs/gallery/7.jpg',
  '/imgs/gallery/8.jpg',
  '/imgs/gallery/9.jpg',
  '/imgs/gallery/10.jpg',
  '/imgs/gallery/11.jpg',
  '/imgs/gallery/12.jpg',
  '/imgs/gallery/13.jpg',
  '/imgs/gallery/14.jpg',
  '/imgs/gallery/15.jpg',
  '/imgs/gallery/16.jpg',
  '/imgs/gallery/17.jpg',
  '/imgs/gallery/18.jpg',
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
    adaptiveHeight: true,
  };

  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
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
      <button onClick={prevSlide} className="slider-button prev-button">◁</button>

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
