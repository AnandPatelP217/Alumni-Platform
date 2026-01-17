import React from "react";
import alumniAPI from "../../APIs/alumniAPI";
import "./FirstComponent.css";

const FirstComponent = () => {
  const alumni = alumniAPI;

  return (
    <section className="hero-slider">
      <div id="alumniCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          {alumni.map((alum, index) => (
            <button
              key={alum.id}
              type="button"
              data-bs-target="#alumniCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : ""}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {alumni.map((alum) => (
            <div className={`carousel-item ${alum.classes}`} key={alum.id}>
              <div className="slider-link">
                <img
                  src={alum.imagePath}
                  className="d-block w-100 slider-image"
                  alt={`${alum.name}`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#alumniCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#alumniCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
};

export default FirstComponent;