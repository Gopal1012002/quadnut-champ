// TestimonialVideoCard.jsx
import React from 'react';
import { GiPlayButton } from "react-icons/gi";
import styles from './testimonial-video-card.module.css';

const TestimonialVideoCard = ({
    index,
    isPlaying,
    onTogglePlay,
    videoSrc,
    imageSrc,
    name,
    description
}) => {
    const handleTogglePlay = () => {
        onTogglePlay(index);
    };

    const isLooping = index === 1;

    return (
        <div className={styles.videoCard}>
            {isPlaying ? (
                <video
                    autoPlay
                    muted
                    loop={isLooping}
                    playsInline
                    className={styles.videoThumb}
                    onClick={handleTogglePlay}
                >
                    <source src={videoSrc}  />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <>
                    <img
                        src={imageSrc}
                        alt={`${name}-thumbnail`}
                        className={styles.videoThumb}
                    />
                    <div className={`${styles.overlay} d-flex align-items-center justify-content-center`}>
                        <button onClick={handleTogglePlay} className={`${styles.playButton}  d-flex align-items-center justify-content-center`}>
                            <GiPlayButton />
                        </button>
                    </div>
                </>
            )}
            <div className={styles.info}>
                <h4>{name}</h4>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default TestimonialVideoCard;
