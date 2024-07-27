"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TopicGenerator from "./TopicGenerator";

type Props = {
  driverId: number;
};

const DriverCard: React.FC<Props> = ({ driverId }) => {
  useEffect(() => {
    const ws = new WebSocket(`ws://192.168.137.33:8080`);

    ws.onopen = () => {
      ws.send(driverId.toString());
      console.log(`WebSocket connection opened for driverId: ${driverId}`);
    };

    ws.onmessage = (event) => {
      console.log(event);
      const message = JSON.parse(event.data);
      console.log("Message from server:", message);

      if (message.type === "filepath") {
        const audioUrl = `https://192.168.137.33:3001${message.data}`;
        const audio = new Audio(audioUrl);
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    };

    ws.onclose = () => {
      console.log(`WebSocket connection closed for driverId: ${driverId}`);
    };

    return () => {
      ws.close();
    };
  }, [driverId]);

  return (
    <Card className="w-full h-screen max-w-md mx-auto flex flex-col">
      <CardHeader className="items-center">
        <div className="text-2xl font-bold items-center">
          Driver Application
        </div>
      </CardHeader>
      <CardContent className="flex-1 mb-4">
        {/* Additional content can be added here */}
      </CardContent>
      <CardFooter className="flex flex-col items-center pb-4">
        <TopicGenerator audioSrc="/music.wav" />
      </CardFooter>
    </Card>
  );
};

export default DriverCard;
