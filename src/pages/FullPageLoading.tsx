import React, { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

export default function FullPageLoading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <RingLoader size={150} color={"#0066CC"} loading={true} />
    </div>
  );
}
