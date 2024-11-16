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
                console.error("음악 재생 오류:", error);
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
                    <FontAwesomeIcon icon={faPause} style={{color: '#6b5a6b',}} />
                </button>
            ) : (
                <button onClick={handlePlay}>
                    <FontAwesomeIcon icon={faPlay} style={{color: '#6b5a6b',}}/>
                </button>
            )}
            <audio ref={audioRef} autoPlay></audio>
        </div>
    );
};