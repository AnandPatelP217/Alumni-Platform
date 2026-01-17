import React from "react";
import "./FourthComponent.css";
import { Image } from "antd";
import { sliderSettings } from "../../utils/common.js";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

// Import images
import image1 from "../../Images/gallery/1.jpg";
import image2 from "../../Images/gallery/2.jpg";
import image3 from "../../Images/gallery/3.jpg";
import image4 from "../../Images/gallery/4.jpg";
import image5 from "../../Images/gallery/1.jpg";
import image6 from "../../Images/gallery/2.jpg";
import image7 from "../../Images/gallery/4.jpg";
import image8 from "../../Images/gallery/3.jpg";
import image9 from "../../Images/gallery/4.jpg";
import image10 from "../../Images/gallery/1.jpg";

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

const FourthComponent = () => {
  return (
    <section className="gallery-section">
      <div className="section-header">
        <h2 className="section-title">2025 Gradutes</h2>
        <p className="section-subtitle">
          Showcasing our successful graduates with premium placements
        </p>
      </div>

      <div className="gallery-container">
        <Swiper {...sliderSettings} className="custom-swiper">
          <SliderButtons />
          
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="gallery-card">
                <div className="image-container">
                  <Image
                    src={src}
                    alt={`Alumni ${index + 1}`}
                    className="gallery-image"
                    preview={false}
                  />
                  <div className="image-overlay">
                    <span className="alumni-badge">Class of {2020 + index}</span>
                  </div>
                </div>
                <div className="card-footer">
                  <h3 className="alumni-name">Alumni Name</h3>
                  <p className="alumni-company">Company Name</p>
                  <p className="alumni-package">₹{(15 + index).toFixed(2)} LPA</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const SliderButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="navigation-controls">
      <button 
        onClick={() => swiper.slidePrev()} 
        className="nav-button prev-button"
        aria-label="Previous slide"
      >
        &lt;
      </button>
      <button 
        onClick={() => swiper.slideNext()} 
        className="nav-button next-button"
        aria-label="Next slide"
      >
        &gt;
      </button>
    </div>
  );
};

export default FourthComponent;