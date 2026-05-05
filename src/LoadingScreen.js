import React from "react";

function LoadingScreen() {
  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(#3D405B,#1F2937)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      color: "white"
    }}>

      {/* 🔵 바운스 점 */}
      <div style={{
        display: "flex",
        gap: "10px"
      }}>
        {[0,1,2].map(i => (
          <div
            key={i}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#ffffff",
              animation: `bounce 1.2s infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* 🦷 텍스트 */}
      <p style={{
        fontSize: "14px",
        opacity: 0.8
      }}>
        Preparing your smile... 🦷
      </p>

    </div>
  );
}

export default LoadingScreen;