import React, { useState, useEffect, useRef } from 'react';
import { FastAverageColor } from 'fast-average-color';
import styles from './ImageCarousel.module.css';

interface ImageCarouselProps {
    images: { src: string; caption: string }[];
    interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, interval = 15000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bgColor, setBgColor] = useState('#000');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fac = new FastAverageColor();
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = images[currentIndex].src;

        img.onload = () => {
            const color = fac.getColor(img);
            setBgColor(color.hex);
        };
    }, [currentIndex, images]);

    useEffect(() => {
        const changeImage = () => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        };

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(changeImage, interval);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [images.length, interval]);

    const handleIndicatorClick = (index: number) => {
        setCurrentIndex(index);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, interval);
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <div
                className={styles.carouselImages}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={styles.carouselImage}
                        style={{ backgroundColor: bgColor }}
                    >
                        {/* Размытие фона */}
                        <div
                            className={styles.imageBackground}
                            style={{
                                backgroundImage: `url(${image.src})`,
                                filter: 'blur(25px)',
                            }}
                        />
                        <img src={image.src} alt={`Slide ${index + 1}`} />
                        <div className={styles.carouselText}>
                            <h2>{image.caption}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.carouselIndicators}>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.carouselIndicator} ${currentIndex === index ? styles.active : ''}`}
                        onClick={() => handleIndicatorClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export { ImageCarousel };
