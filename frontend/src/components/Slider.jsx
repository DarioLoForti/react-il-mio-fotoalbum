import React, { useState, useEffect } from 'react';

export default function Slider({ photos }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (photos && photos.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
            }, 10000); 
            return () => clearInterval(interval);
        }
    }, [photos]);

    if (!photos || photos.length === 0) {
        return <div>Loading...</div>;
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    };

    return (
        <div className="slider">
            <button onClick={handlePrev}>Prev</button>
            <div className="slider-content">
                {photos.length > 0 && (
                    <div className="slide">
                        <img src={photos[currentIndex].image} alt={photos[currentIndex].title} />
                        <div className="slide-info">
                            <h3>{photos[currentIndex].title}</h3>
                            <p>{photos[currentIndex].description}</p>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}
