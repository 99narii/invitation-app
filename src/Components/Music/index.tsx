import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect, useState } from 'react';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import './style.scss';

export const Music: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = async () => {
        if (audioRef.current) {
            try {
                audioRef.current.src = `${process.env.PUBLIC_URL}/Bgm/bgm.mp3`;
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Audio playback error:", error);
            }
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        handlePlay();
    }, []);

    return (
        <div className="musicPlay">
            {isPlaying ? (
                <button onClick={handlePause}>
                    <FontAwesomeIcon icon={faPause} />
                </button>
            ) : (
                <button onClick={handlePlay}>
                    <FontAwesomeIcon icon={faPlay} />
                </button>
            )}
            <audio ref={audioRef} autoPlay></audio>
        </div>
    );
};