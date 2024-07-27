"use client";

import React, { useState } from "react";
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
  const [badges, setBadges] = useState<BadgeItem[]>([
    { content: "Tes", variant: "outline" as const },
    { content: "Tes1", variant: "outline" as const },
    { content: "Programming", variant: "outline" as const },
    { content: "Gaming", variant: "outline" as const },
  ]);

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
        <Nameplate />
      </CardHeader>
      <CardContent className="mb-20">
        <InterestsBadge badges={badges} onBadgeClick={handleBadgeClick} />
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button>Start conversation</Button>
      </CardFooter>
    </Card>
  );
};

export default MainCard;
