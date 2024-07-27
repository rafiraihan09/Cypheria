import React from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeItem } from "@/types/badgeItem";


type Props = {
  badges: BadgeItem[];
};

const InterestsBadge: React.FC<Props> = ({ badges }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {badges.map((badge, index) => (
        <Badge key={index} className="font-light" variant={badge.variant}>
          {badge.content}
        </Badge>
      ))}
    </div>
  );
};

export default InterestsBadge;
