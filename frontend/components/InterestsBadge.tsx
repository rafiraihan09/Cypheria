import React from "react";
import { Badge } from "@/components/ui/badge";

type BadgeItem = {
  content: string;
  variant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | null
    | undefined;
};

type Props = {
  badges: BadgeItem[];
};

const InterestsBadge: React.FC<Props> = ({ badges }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {badges.map((badge, index) => (
        <Badge key={index} variant={badge.variant}>
          {badge.content}
        </Badge>
      ))}
    </div>
  );
};

export default InterestsBadge;
