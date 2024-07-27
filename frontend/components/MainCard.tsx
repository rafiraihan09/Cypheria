"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Nameplate from "@/components/Nameplate";
import { Button } from "@/components/ui/button";
import { BadgeItem } from "@/types/badgeItem";
import InterestsBadge from "@/components/InterestsBadge";

type Props = {};

const MainCard: React.FC<Props> = () => {
  const [badges, setBadges] = useState<BadgeItem[]>([]);
  const [driverName, setDriverName] = useState<string>("");
  const [driverImage, setDriverImage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://192.168.137.33:3000/topics/drivers/1/passengers/2"
        );
        const result = await response.json();

        if (result.message === "success" && result.data.topics) {
          const fetchedBadges = result.data.topics.map((topic: any) => ({
            content: topic.topic,
            variant: topic.match ? "default" : "outline",
          }));
          setBadges(fetchedBadges);
          setDriverName(result.data.driverName);
          setDriverImage(`data:image/jpeg;base64,${result.data.driverImage}`);
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
              variant: badge.variant === "outline" ? "default" : "outline",
            }
          : badge
      )
    );
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <Nameplate name={driverName} imageUrl={driverImage} />
      </CardHeader>
      <CardContent className="mb-20">
        <InterestsBadge badges={badges} onBadgeClick={handleBadgeClick} />
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button>Generate Topic</Button>
      </CardFooter>
    </Card>
  );
};

export default MainCard;
