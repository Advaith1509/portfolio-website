import { Html, useProgress } from "@react-three/drei";
import React from "react";

const Loader3D = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          fontFamily: "'Press Start 2P', monospace",
          color: "var(--accent, #2ad4e6)",
          fontSize: "0.7rem",
          textAlign: "center",
          whiteSpace: "nowrap",
          userSelect: "none",
          lineHeight: "1.9",
        }}
      >
        <div>LOADING</div>
        <div style={{ fontSize: "0.6rem", opacity: 0.85 }}>
          {Math.floor(progress)}%
        </div>
      </div>
    </Html>
  );
};

export default Loader3D;
