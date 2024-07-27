"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";


type Props = {
  audioSrc: string;
};


const TopicGenerator = ({ audioSrc }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div>
      <Button
        onClick={handlePlayAudio}
        variant={isPlaying ? "secondary" : "default"} // Switch button variant
      >
        // WAVEFORM HERE
      </Button>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="auto"
        onEnded={() => setIsPlaying(false)} // Reset button state when audio ends
      />
    </div>
  );
};

export default TopicGenerator;
