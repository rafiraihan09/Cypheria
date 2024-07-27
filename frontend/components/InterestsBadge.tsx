import React from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeItem } from "@/types/badgeItem";

type Props = {
  badges: BadgeItem[];
  onBadgeClick: (content: string) => void;
};

const InterestsBadge: React.FC<Props> = ({ badges, onBadgeClick }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {badges.map((badge) => (
        <Badge
          onClick={() => onBadgeClick && onBadgeClick(badge.content)}
          key={badge.content}
          className="font-light select-none"
          variant={badge.variant}
        >
          {badge.content}
        </Badge>
      ))}
    </div>
  );
};

export default InterestsBadge;
