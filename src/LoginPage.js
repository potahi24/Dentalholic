import React, { useEffect, useState } from "react";

function LoginPage({ onLogin, onGuest }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 20 }).map(() => ({
      top: Math.random() * 60,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: 3 + Math.random() * 2,
      opacity: Math.random()
    }));

    setStars(generatedStars);
  }, []);

  const getTheme = () => {
    const h = new Date().getHours();
    if (h < 12) return "linear-gradient(#89CFF0,#B7E4C7)";
    if (h < 18) return "linear-gradient(#F6BD60,#84A98C)";
    return "linear-gradient(#3D405B,#1F2937)";
  };

  return (
    <div style={{
      height: "100vh",
      overflow: "hidden",
      position: "relative",
      background: "#1F2937"
    }}>

      {/* 🌅 배경 */}
      <div style={{
        position: "absolute",
        width: "100%",
        height: "60%",
        background: getTheme()
      }} />

      {/* ⭐ 별 */}
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: "white",
            borderRadius: "50%",
            opacity: s.opacity,
            animation: `floatStar ${s.duration}s infinite`
          }}
        />
      ))}

      {/* 🦷 중앙 콘텐츠 */}
      <div style={{
        position: "relative",
        zIndex: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        textAlign: "center"
      }}>

        {/* 제목 */}
        <h1 style={{
          color: "white",
          fontSize: "28px",
          margin: 0
        }}>
          Welcome 🦷
        </h1>

        <p style={{
          color: "white",
          opacity: 0.8,
          fontSize: "14px"
        }}>
          Take care of your smile every day
        </p>

        {/* 🔘 버튼 영역 */}
        <div style={{
          width: "260px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "20px"
        }}>

          {/* Google */}
          <button
            onClick={onLogin}
            className="clickable"
            style={{
              padding: "14px",
              borderRadius: "20px",
              border: "none",
              background: "#2B2D42",
              color: "white",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            🔐 Continue with Google
          </button>

          {/* Guest */}
          <button
            onClick={onGuest}
            className="clickable"
            style={{
              padding: "14px",
              borderRadius: "20px",
              border: "2px solid #2B2D42",
              background: "transparent",
              color: "#2B2D42",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            👀 Continue as Guest
          </button>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;