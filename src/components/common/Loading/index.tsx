"use client";

import Lottie from "lottie-react";
import LoadingAnimation from "@/assets/animations/Loading.json";

export default function Loading() {
  return (
    <div>
      <Lottie animationData={LoadingAnimation} loop={true} />
    </div>
  );
}
