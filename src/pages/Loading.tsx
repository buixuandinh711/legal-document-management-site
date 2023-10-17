import React, { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Optional: To make it centered relative to the viewport
      }}
    >
      <RingLoader size={150} color={"#0066CC"} loading={true} />
    </div>
  );
}
