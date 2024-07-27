import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {};

const Nameplate = (props: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-24 h-24">
        <Avatar className="relative w-full h-full">
          <AvatarImage
            className="rounded-full w-full h-full object-cover"
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback className="rounded-full w-full h-full flex items-center justify-center">
            CN
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="text-3xl font-bold">John Doe</div>
    </div>
  );
};

export default Nameplate;
