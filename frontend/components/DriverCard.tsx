"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BadgeItem } from "@/types/badgeItem";
import TopicGenerator from "./TopicGenerator";

// Constants
const API_URL = "http://192.168.137.33:3000/topics/drivers/1/passengers/2";
const DEFAULT_VARIANT = "default";
const OUTLINE_VARIANT = "secondary";
const BASE64_IMAGE_PREFIX = "data:image/jpeg;base64,";
const SUCCESS_MESSAGE = "success";

type Props = {};

const MainCard: React.FC<Props> = () => {

  return (
    <Card className="w-full h-screen max-w-md mx-auto flex flex-col">
      <CardHeader className="items-center">
        <div className="text-2xl font-bold items-center">Driver Application</div>
      </CardHeader>
      <CardContent className="flex-1 mb-4">
      </CardContent>
      <CardFooter className="flex flex-col items-center pb-4">
        <TopicGenerator audioSrc="/music.wav" />
      </CardFooter>
    </Card>
  );
};

export default MainCard;
