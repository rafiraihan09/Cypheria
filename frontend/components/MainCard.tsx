"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Nameplate from "@/components/Nameplate";
import { BadgeItem } from "@/types/badgeItem";
import InterestsBadge from "@/components/InterestsBadge";
import { Button } from "@/components/ui/button";

// Constants
const API_URL = "http://192.168.137.33:3001/topics/drivers/1/passengers/2";
const START_TOPIC_URL = "http://192.168.137.33:3001/start-topic"; // Add your endpoint here
const DEFAULT_VARIANT = "default";
const OUTLINE_VARIANT = "secondary";
const BASE64_IMAGE_PREFIX = "data:image/jpeg;base64,";
const SUCCESS_MESSAGE = "success";

type Props = {};

const MainCard: React.FC<Props> = () => {
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [driverName, setDriverName] = useState<string>("");
  const [driverImage, setDriverImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Manage loading state if needed
  const [error, setError] = useState<string | null>(null); // Manage error state if needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (result.message === SUCCESS_MESSAGE && result.data.topics) {
          const fetchedBadges = result.data.topics.map((topic: any) => ({
            content: topic.topic,
            variant: topic.match ? DEFAULT_VARIANT : OUTLINE_VARIANT,
          }));
          setBadges(fetchedBadges);
          setDriverName(result.data.driverName);
          setDriverImage(`${BASE64_IMAGE_PREFIX}${result.data.driverImage}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBadgeClick = (content: string) => {
    setBadges((prevBadges) =>
      prevBadges.map((badge) =>
        badge.content === content
          ? {
              ...badge,
              variant:
                badge.variant === OUTLINE_VARIANT
                  ? DEFAULT_VARIANT
                  : OUTLINE_VARIANT,
            }
          : badge
      )
    );
  };

  const handleStartTopicClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(START_TOPIC_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      // Handle result as needed
      console.log("Started topic:", result);
    } catch (error) {
      console.error("Error starting topic:", error);
      setError("Failed to start the topic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full h-screen max-w-md mx-auto flex flex-col">
      <CardHeader>
        <Nameplate name={driverName} imageUrl={driverImage} />
      </CardHeader>
      <CardContent className="flex-1 mb-4">
        <InterestsBadge badges={badges} onBadgeClick={handleBadgeClick} />
      </CardContent>
      <CardFooter className="flex flex-col items-center pb-4">
        <Button onClick={handleStartTopicClick} disabled={loading}>
          {loading ? "Starting..." : "Start a Topic!"}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </CardFooter>
    </Card>
  );
};

export default MainCard;
