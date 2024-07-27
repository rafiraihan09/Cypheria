import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
  imageUrl: string; // Base64 image data
};

const Nameplate: React.FC<Props> = ({ name, imageUrl }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-24 h-24">
        <Avatar className="relative w-full h-full">
          <AvatarImage
            className="rounded-full w-full h-full object-cover"
            src={imageUrl}
            alt={name}
          />
          <AvatarFallback className="rounded-full w-full h-full flex items-center justify-center">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="text-3xl font-bold">{name}</div>
    </div>
  );
};

export default Nameplate;
