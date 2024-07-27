import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Nameplate from "@/components/Nameplate";
import { Button } from "@/components/ui/button";
import InterestsBadge from "@/components/InterestsBadge";

type Props = {};

const MainCard = (props: Props) => {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <Nameplate />
      </CardHeader>
      <CardContent>
        <InterestsBadge
          badges={[
            { content: "Tes", variant: "outline" },
            { content: "Tes1", variant: "outline" },
            { content: "Programming", variant: "outline" },
            { content: "Gaming", variant: "outline" },
          ]}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <Button>Start conversation</Button>
      </CardFooter>
    </Card>
  );
};

export default MainCard;
