import { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import LoadingScreen from "./LoadingScreen";
import { signOut } from "firebase/auth";

// 🦷 캐릭터
import excellent from "./assets/excellent.png";
import good from "./assets/good.png";
import okay from "./assets/okay.png";
import bad from "./assets/bad.png";
import soBad from "./assets/so_bad.png";

// 📱 네비 아이콘
import home from "./assets/home.png";
import homeLight from "./assets/home-light.png";
import check from "./assets/check.png";
import checkLight from "./assets/check-light.png";
import book from "./assets/book.png";
import bookLight from "./assets/book-light.png";
import chart from "./assets/chart.png";
import chartLight from "./assets/chart-light.png";
import menu from "./assets/menu.png";

// 아이콘
import menuDark from "./assets/menu1.png";
import notification from "./assets/notification.png";
import notificationDark from "./assets/notification1.png";
import defaultPfp from "./assets/pfp.png";
import confetti from "canvas-confetti";

function App() {

  const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);

  setUser({
    name: result.user.displayName,
    img: result.user.photoURL
  });

  setLoading(false);
};
  const loginAsGuest = () => {
  setUser({
    name: "Guest",
    img: null,
    guest: true
  });
  setLoading(false); 
};

  const [page, setPage] = useState("home");
  const [score, setScore] = useState(50);
  const [displayScore, setDisplayScore] = useState(50); // 👈 추가
  const [stars, setStars] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const isHome = page === "home";
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tempImg, setTempImg] = useState("");
  const [touchStart, setTouchStart] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [activePoint, setActivePoint] = useState(null);
  const [tempName, setTempName] = useState("");
  const [animating, setAnimating] = useState(false);
  const [userBadges, setUserBadges] = useState([]);
  const [newBadge, setNewBadge] = useState(null);
  

  const sendNotification = (title, body) => {
  if (!notifications) return;

  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
};
  const [appLoaded, setAppLoaded] = useState(false);


  useEffect(() => {
    setTimeout(() => setAppLoaded(true), 300);
  }, []);

  const changePage = (nextPage) => {
  setAnimating(true);
  setTimeout(() => {
    setPage(nextPage);
    setAnimating(false);
  }, 200);
};
  

  const colors = {
  bg: darkMode ? "#1F2937" : "#F4F6F9",
  card: darkMode ? "#374151" : "#E6ECF3",
  text: darkMode ? "#F9FAFB" : "#2B2D42",
  subText: darkMode ? "#9CA3AF" : "#6B7280",
  border: darkMode ? "#4B5563" : "#A8C4E6"
  };

  const menuIcon = isHome ? menu : menuDark;
  const notifIcon = isHome ? notification : notificationDark;

  const menuBtn = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  marginBottom: "10px",
  background: "#E6EAF0",
  color: "#2B2D42",
  textAlign: "left"
  };

  const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning ☀️";
  if (h < 18) return "Good afternoon 🌤";
  return "Good evening 🌙";
};

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    setUser(null);
  };

  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

const isBroken = () => {
  if (history.length === 0) return false;

  const lastDate = new Date(history[history.length - 1].date);
  const today = new Date();

  const diff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

  return diff > 1; // 하루 이상 쉬었으면 끊김
};

const getStreakStatus = () => {
  if (isBroken()) {
    return {
      emoji: "💙",
      text: "So close... don’t lose it!",
      color: "#3B82F6" // 파란색
    };
  }


  if (streak <= 2) {
    return {
      emoji: "🌱",
      text: "Good start! Keep going!",
      color: "#6B7280"
    };
  }

  if (streak <= 5) {
    return {
      emoji: "🔥",
      text: "You're building momentum!",
      color: "#F97316"
    };
  }

  return {
    emoji: "🚀",
    text: "You're unstoppable!",
    color: "#22C55E"
  };
};

const getMessage = (score) => {
  const low = [
    "You got this!",
    "Don't give up!",
    "Keep trying!",
    "I believe in you!",
    "Don't forget today!"
  ];

  const mid = [
    "Nice progress!",
    "Keep going!",
    "You're doing good!",
    "Stay consistent!"
  ];

  const high = [
    "You are awesome!",
    "You did it!",
    "Keep smiling today!",
    "Great job!",
    "So proud of you!"
  ];

  if (score < 40) return low[Math.floor(Math.random() * low.length)];
  if (score < 70) return mid[Math.floor(Math.random() * mid.length)];
  return high[Math.floor(Math.random() * high.length)];
};

  const fireConfetti = () => {
    const duration = 1500;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

const badgeList = [
  {
    id: "streak3",
    name: "🔥 3 Day Streak",
    condition: (data) => data.streak >= 3
  },
  {
    id: "streak7",
    name: "🔥 7 Day Streak",
    condition: (data) => data.streak >= 7
  },
  {
    id: "score50",
    name: "🥇 50 Points",
    condition: (data) => data.totalScore >= 50
  },
  {
    id: "perfect",
    name: "💯 Perfect Day",
    condition: (data) =>
      data.history.some(h => h.score === 100)
  }
];

const earnedBadges = badgeList.filter(b =>
  userBadges.includes(b.id)
);

  const cardStyle = {
  background: "white",
  borderRadius: "20px",
  padding: "18px",
  marginBottom: "15px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.06)"
};

const questionStyle = {
  marginBottom: "12px",
  fontSize: "14px",
  color: "#2B2D42",
  fontWeight: "500"
};

const optionWrap = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  justifyContent: "center"
};

const optionStyle = {
  padding: "10px 14px",
  borderRadius: "15px",
  border: "none",
  fontSize: "14px",
  background: "#E6EAF0",
  color: "#2B2D42"
};

const selectedStyle = {
  background: "#2B2D42",
  color: "white"
};

const statCard = {
  flex: 1,
  background: "#E6ECF3",
  borderRadius: "20px",
  border: "2px solid #A8C4E6",
  padding: "10px",
  textAlign: "center"
};

const smallTitle = {
  fontSize: "13px",
  color: "#6B7280"
};

const bigNumber = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#2B2D42"
};

const smallText = {
  fontSize: "12px"
};

const subText = {
  fontSize: "11px",
  color: "#6B7280"
};


const [showBadges, setShowBadges] = useState(false);

  // 📊 상태
  const [brush, setBrush] = useState(0);
  const [floss, setFloss] = useState(false);
  const [visit, setVisit] = useState("3to12");
  const [plan, setPlan] = useState(false);
  const [fact, setFact] = useState("");

  const status = getStreakStatus();

  // 🎲 랜덤 fun fact
  const facts = [
    "Brush for 2 minutes!",
    "Flossing cleans 40% of teeth!",
    "Sugar feeds bacteria!",
    "Enamel is super strong!",
    "Bacteria love nighttime!",
    "Replace your toothbrush every 3 months!",
    "Saliva protects your teeth!"
  ];
  
  const [selected, setSelected] = useState(null);
  const learningData = [
  {
    title: "Why brushing matters",
    emoji: "🪥",
    short: "Brushing removes plaque and prevents cavities.",
    full: "Brushing your teeth removes plaque, a sticky film of bacteria that forms on your teeth. If not removed, plaque can harden into tartar and lead to cavities and gum disease."
  },
  {
    title: "Brush before breakfast?",
    emoji: "🌅",
    short: "Morning brushing protects your enamel.",
    full: "Brushing before breakfast removes bacteria that built up overnight and protects your enamel from acidic foods eaten during breakfast."
  },
  {
    title: "Cavities spread fast",
    emoji: "⚠️",
    short: "Small cavities can grow quickly.",
    full: "Untreated cavities can grow deeper into the tooth, causing pain and requiring more serious treatment like root canals."
  },
  {
    title: "Braces",
    emoji: "😁",
    short: "Braces align your teeth over time.",
    full: "Braces gradually move teeth into the correct position. Proper care is essential to avoid plaque buildup around brackets."
  }
];

  const headerStyle = {
  position: "sticky", // or "fixed"
  top: 0,
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  padding: "12px 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 1000
};

  useEffect(() => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

    setVH();
    window.addEventListener('resize', setVH);

    return () => window.removeEventListener('resize', setVH);
  }, []);

    useEffect(() => {
      badgeList.forEach(badge => {
        const isEarned = badge.condition({ streak, totalScore, history });
        if (
          badge.condition({ streak, totalScore, history }) &&
          !userBadges.includes(badge.id)
        ) {
          setUserBadges(prev => [...prev, badge.id]);

          // 🔔 알림도 가능
          sendNotification("🎉 New Badge!", badge.name);
        }
          if (!isEarned) return;

          const alreadyHave = userBadges.includes(badge.id);
          if (alreadyHave) return;

          // ✅ 1. 먼저 상태 업데이트
          setUserBadges(prev => [...prev, badge.id]);
        
            // 🎉 팝업 트리거
          setNewBadge(badge);

          // 🎊 confetti 실행
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
          });

          // ⏱ 2초 후 사라짐
          setTimeout(() => {
            setNewBadge(null);
          }, 2000);
          });
    }, [streak, totalScore, history]);

  useEffect(() => {
  setLoading(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();

      // 🌅 아침 (8~9시)
      if (hour === 8) {
        sendNotification("Good morning 🦷", "Don't forget to brush!");
      }

      // 🌙 저녁 (21~22시)
      if (hour === 21) {
        sendNotification("Good night 🌙", "Brush before sleep!");
      }

    }, 60000); // 1분마다 체크

    return () => clearInterval(interval);
  }, [notifications]);

  useEffect(() => {
  if (history.length === 0) return;

  const lastDate = new Date(history[history.length - 1].date);
  const now = new Date();

  const diff = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

  if (diff === 1) {
    sendNotification("⚠️ Almost lost!", "Keep your streak alive!");
  }
}, [history]);

useEffect(() => {
  if (history.length === 0) return;

  const lastDate = new Date(history[history.length - 1].date);
  const now = new Date();

  const diff = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

  if (diff > 1) {
    sendNotification("😢 You missed a day", "Let's start again!");
  }
}, [history]);

  useEffect(() => {
  if ("Notification" in window) {
    Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
  const saved = localStorage.getItem("notifications");
  if (saved !== null) setNotifications(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
  const saved = localStorage.getItem("user");
  if (saved) {
    setUser(JSON.parse(saved));
    setPage("home");
  }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
  const saved = localStorage.getItem("oralAppData");
  if (saved) {
    const data = JSON.parse(saved);
    setHistory(data.history || []);
    setStreak(data.streak || 0);
    setTotalScore(data.totalScore || 0);
  }
}, []);

  useEffect(() => {
  const data = { history, streak, totalScore };
  localStorage.setItem("oralAppData", JSON.stringify(data));
}, [history, streak, totalScore]);
  
  useEffect(() => {
  const generatedStars = Array.from({ length: 20 }).map(() => ({
    top: Math.random() * 40,
    left: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: 3 + Math.random() * 2,
    opacity: Math.random()
  }));

  setStars(generatedStars);
}, []);

    useEffect(() => {
    setMessage(getMessage(score));
    }, [score]);

    useEffect(() => {
      setFact(facts[Math.floor(Math.random() * facts.length)]);
    }, []);

    useEffect(() => {
      localStorage.setItem("badges", JSON.stringify(userBadges));
    }, [userBadges]);

    useEffect(() => {
      const saved = localStorage.getItem("userBadges");
      if (saved) {
        setUserBadges(JSON.parse(saved));
      }
    }, []);

    useEffect(() => {
      const saved = localStorage.getItem("badges");
      if (saved) setUserBadges(JSON.parse(saved));
    }, []);

  useEffect(() => {
  const today = new Date().toISOString().slice(0, 10);

  setHistory(prev => {
    if (prev.length === 0) {
      return [{ date: today, score }];
    }

    const last = prev[prev.length - 1];

    // 👉 같은 날짜면 업데이트
    if (last.date === today) {
      const updated = [...prev];
      updated[updated.length - 1] = { date: today, score };
      return updated;
    }

    // 👉 새로운 날짜면 추가
    return [...prev, { date: today, score }];
  });

}, [score]);

  // 🧠 점수 계산 애니메이션
  useEffect(() => {
    let start = displayScore;
    let end = score;

    if (start === end) return;

    let increment = end > start ? 1 : -1;

    let interval = setInterval(() => {
      start += increment;
      setDisplayScore(start);

      if (start === end) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [score]);

  // 🧠 점수 계산
  useEffect(() => {
    let s = 0;

    // brushing
    if (brush === 1) s += 25;
    else if (brush === 2) s += 45;
    else if (brush >= 3) s += 50;

    // floss
    if (floss) s += 20;

    // visit
    if (visit === "3mo") s += 20;
    else if (visit === "3to12") s += 15;
    else s += 5;

    // plan
    if (plan) s += 10;

    setScore(s);
  }, [brush, floss, visit, plan]);

  useEffect(() => {
  const today = new Date().toISOString().slice(0, 10);

  if (history.length === 0 || history[history.length - 1].date !== today) {
    const newEntry = { date: today, score };

    const updated = [...history, newEntry];
    setHistory(updated);

    // 총 점수 (10%당 1점)
    setTotalScore(prev => prev + Math.floor(score / 10));
  }
    }, [score]);
    useEffect(() => {
    let count = 0;

    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].score > 0) count++;
      else break;
      }
  
    setStreak(count);
    }, [history]);

  if (loading) {
  return <LoadingScreen />;
    }

  if (!user) {
  return (
    <LoginPage
      onLogin={loginWithGoogle}
      onGuest={loginAsGuest}
    />
  );
}

  // 🦷 캐릭터
  const getCharacter = () => {
    if (score >= 80) return excellent;
    if (score >= 60) return good;
    if (score >= 40) return okay;
    if (score >= 20) return bad;
    return soBad;
  };

  // 🌅 시간 테마
  const getTheme = () => {
    const h = new Date().getHours();
    if (h < 12) return "linear-gradient(#89CFF0,#B7E4C7)";
    if (h < 18) return "linear-gradient(#F6BD60,#84A98C)";
    return "linear-gradient(#3D405B,#1F2937)";
  };

  // 📱 네비 아이콘 선택
  const getIcon = (name) => {
    if (page === name) {
      if (name === "home") return homeLight;
      if (name === "check") return checkLight;
      if (name === "book") return bookLight;
      if (name === "chart") return chartLight;
    } else {
      if (name === "home") return home;
      if (name === "check") return check;
      if (name === "book") return book;
      if (name === "chart") return chart;
    }
  };

  
  return (
    <div style={{
      minHeight: "calc(var(--vh) * 100)",
      position: "relative",
      background: "white",
      paddingTop: "env(safe-area-inset-top)",
      transition: "none",
      transform: "none",
      opacity: "none"
    }}>
      
      {page === "home" && (
        <div className="page-enter"
            style={{ position: "relative", paddingBottom: "120px" }}>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "230px",
            width: "100%",
            maxWidth: "100%",
            margin: "0 auto 20px auto",
            position: "relative",
            top: "20px",
            zIndex: 2
          }}>
            <div style={headerStyle}>
              <img
                src={menuIcon}
                alt=""
                className="clickable"
                style={{ width: "40px" }}
                onClick={() => setMenuOpen(true)}
              />

              <img
                src={notifIcon}
                alt=""
                className="clickable"
                style={{ width: "40px" }}
                onClick={() => setNotifOpen(true)}
              />
            </div>
          </div>

          {/* 🌅 하늘 */}
          <div style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "55%",
            background: getTheme(),
            zIndex: 0
          }} />

          {/* ⭐ 별 (항상 표시) */}
          {stars.map((star, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: star.size,
                height: star.size,
                background: "white",
                borderRadius: "50%",
                opacity: star.opacity,
                animation: `floatStar ${star.duration}s infinite`,
                pointerEvents: "none"
              }}
            />
          ))}


          <div style={{
            width: "320px",
            margin: "0 auto",
            paddingTop: "60px",
            position: "relative"
          }}>

            {/* 🌄 언덕 */}
            <div style={{
              position: "absolute",
              top: "250px",
              left: "-85px",
              width: "500px",
              height: "300px",
              background: "linear-gradient(#84A98C, white)",
              borderRadius: "200px 200px 0 0",
              zIndex: 1
            }} />

            <div style={{
              position: "absolute",
              top: "20px",
              width: "100%",
              textAlign: "center",
              zIndex: 3
            }}>
              {/* 인사 */}
              <p style={{
                margin: 0,
                fontSize: "14px",
                color: "white",
                opacity: 0.9
              }}>
                {getGreeting()}
              </p>

              {/* 메인 메시지 */}
              <h2 style={{
                margin: "5px 0",
                fontSize: "22px",
                color: "white",
                fontWeight: "bold"
              }}>
                {message}
              </h2>
            </div>

            {/* 🦷 캐릭터 */}
            <div style={{
              position: "absolute",
              top: "50px",
              left: "-20%",
              transform: "translateX(-50%)",
              width: "400px",
              textAlign: "center",
              zIndex: 3,
              animation: "floatChar 2.5s ease-in-out infinite"
            }}>

              <img
                src={getCharacter()}
                alt=""
                style={{
                  width: "100%",
                  display: "block",
                  margin: "0 auto"
                }}
              />

              <div style={{
                width: "100px",
                height: "20px",
                background: "rgba(0,0,0,1)",
                borderRadius: "50%",
                margin: "-150px 170px 10px",
                filter: "blur(4px)",
                animation: "shadowPulse 3s ease-in-out infinite"
              }} />
            </div>
            <div style={{
              marginTop: "100%",
              background: "white",
              padding: "20px",
              borderRadius: "20px",
              textAlign: "center",
              position: "relative",
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              zIndex: 3
            }}>
              <p style={{ color: "#666" }}>Your smile score</p>

              {/* 🔢 점수 디자인 */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
                <span style={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "#2B2D42"
                }}>
                  {displayScore}
                </span>
                <span style={{
                  marginLeft: "5px",
                  color: "#999",
                  fontSize: "16px"
                }}>
                  /100
                </span>
              </div>

              {/* 📊 progress bar */}
              <div style={{
                height: "8px",
                background: "#ddd",
                borderRadius: "10px",
                margin: "15px 0",
                overflow: "hidden"
              }}>
                <div style={{
                  width: `${score}%`,
                  height: "100%",
                  background: "#2B2D42"
                }} />
              </div>

              {/* 버튼 */}
              <button 
                onClick={() => setBrush(brush + 1)}
                className="clickable"
                style={{
                  width: "100%",
                  padding: "15px",
                  background: "#2B2D42",
                  color: "white",
                  borderRadius: "20px",
                  border: "none"
                }}
              >
                I BRUSHED MY TEETH 🪥
              </button>
            </div>

            {/* 🦷 fun fact */}
            <div style={{
              marginTop: "15px",
              background: "#E6EEF5",
              padding: "15px",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
            }}>
              
              {/* 🦷 이모지 아이콘 */}
              <div style={{
                fontSize: "28px",
                marginRight: "12px"
              }}>
                🦷
              </div>

              {/* 텍스트 영역 */}
              <div>
                <p style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#6C8EBF",
                  fontWeight: "600"
                }}>
                  Fun dental fact!
                </p>

                <p style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#2B2D42"
                }}>
                  {fact}
                </p>
              </div>

            </div>

            {/* ✨ 애니메이션 */}
          </div>
        </div>
      )}
      {/* ===== DAILY CHECK ===== */}
      {page === "check" && (
        <div className="page-enter"
            style={{
          minHeight: "calc(var(--vh) * 100)",
          display: "flex",
          justifyContent: "center",
          background: "#F7F9FC",
          paddingTop: "40px",
          paddingBottom: "120px"
        }}>
          <div style={{ width: "90%" }}>

            <h2 style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "#2B2D42"
            }}>
              Daily Check
            </h2>

            {/* ===== 1. Brushing ===== */}
            <div style={cardStyle}>
              <p style={questionStyle}>
                🪥 How many times did you brush today?
              </p>

              <div style={optionWrap}>
                {[
                  { label: "0", sublabel: "None", value: 0 },
                  { label: "1", sublabel: "Once", value: 1 },
                  { label: "2", sublabel: "Twice", value: 2 },
                  { label: "3+", sublabel: "Great!", value: 3 }
                ].map(opt => (
                  <button
                    key={opt.value}
                    className="clickable"
                    onClick={() => setBrush(opt.value)}
                    style={{
                      ...optionStyle,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      ...(brush === opt.value && selectedStyle)
                    }}
                  >
                    <div style={{ fontSize: "25px", fontWeight: "600" }}>
                      {opt.label}
                    </div>
                    <div style={{ 
                      fontSize: "11px",
                      opacity: 0.7
                    }}>
                      {opt.sublabel}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ===== 2. Floss ===== */}
            <div style={cardStyle}>
              <p style={questionStyle}>
                🧵 Did you floss today?
              </p>

              <div style={optionWrap}>
                {[
                  { label: "Yes", sublabel: "Flossed", value: "Yes" },
                  { label: "No", sublabel: "Skipped", value: "No" }
                ].map(opt => (
                  <button
                    key={opt.value}
                    className="clickable"
                    onClick={() => setFloss(opt.value === "Yes")}
                    style={{
                      ...optionStyle,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      ...( (floss && opt.value==="Yes") || (!floss && opt.value==="No") ? selectedStyle : {})
                    }}
                  >
                    <div style={{ fontSize: "18px", fontWeight: "600" }}>
                      {opt.label === "Yes" ? "🦷" : "🙈"} {opt.label}
                    </div>
                    <div style={{ fontSize: "11px", opacity: 0.7 }}>
                      {opt.sublabel}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ===== 3. Dentist ===== */}
            <div style={cardStyle}>
              <p style={questionStyle}>
                🦷 When was your last dentist visit?
              </p>

              <div style={optionWrap}>
                {[
                  { emoji: "✨", label: "less than 3 months", sublabel: "Recently", value: "3mo" },
                  { emoji: "🙂", label: "about 3–12 months", sublabel: "Overdue", value: "3to12" },
                  { emoji: "😬", label: "more than 1 year", sublabel: "Way overdue", value: "1yr" }
                ].map(opt => (
                  <button
                    key={opt.value}
                    className="clickable"
                    onClick={() => setVisit(opt.value)}
                    style={{
                      ...optionStyle,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      ...(visit === opt.value && selectedStyle)
                    }}
                  >
                    <div style={{ fontSize: "18px", fontWeight: "600" }}>
                      {opt.emoji} {opt.label}
                    </div>
                    <div style={{ fontSize: "11px", opacity: 0.7 }}>
                      {opt.sublabel}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ===== 4. Plan ===== */}
            <div style={cardStyle}>
              <p style={questionStyle}>
                📅 Do you have a dentist appointment planned?
              </p>

              <div style={optionWrap}>
                {[
                  { label: "Yes", sublabel: "Scheduled", value: "Yes" },
                  { label: "No", sublabel: "Not yet", value: "No" }
                ].map(opt => (
                  <button
                    key={opt.value}
                    className="clickable"
                    onClick={() => setPlan(opt.value === "Yes")}
                    style={{
                      ...optionStyle,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                      ...( (plan && opt.value==="Yes") || (!plan && opt.value==="No") ? selectedStyle : {})
                    }}
                  >
                    <div style={{ fontSize: "18px", fontWeight: "600" }}>
                      {opt.label === "Yes" ? "✅" : "❌"} {opt.label}
                    </div>
                    <div style={{ fontSize: "11px", opacity: 0.7 }}>
                      {opt.sublabel}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ===== 빈 페이지 ===== */}
      {page === "book" && (
        <div className="page-enter"
            style={{ padding: "20px", paddingBottom: "120px" }}>
    
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Learning 🧠
        </h2>
         {learningData.map((item, i) => (
        <div
          key={i}
          onClick={() => setSelected(item)}
          style={{
            background: "#E6ECF3",
            borderRadius: "20px",
            padding: "15px",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer"
          }}
        >
          <div style={{ fontSize: "30px" }}>
            {item.emoji}
          </div>

          <div>
            <div style={{ fontWeight: "600" }}>
              {item.title}
            </div>
            <div style={{ fontSize: "13px", color: "#6B7280" }}>
              {item.short}
            </div>
          </div>
        </div>
      ))}
    </div>
      )}


      {page === "chart" && (
  <div className="page-enter"
      style={{
    minHeight: "calc(var(--vh) * 100)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "#F4F6F9",
    paddingTop: "30px",
    paddingBottom: "120px",
    overflow: "auto"
  }}>
    <div style={{ width: "90%" }}>

      {/* ===== 상단 카드 ===== */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "15px"
      }}>

        {/* Streak */}
            <div style={{
              ...statCard,
              border: `2px solid ${status.color}`
            }}>
              <p style={smallTitle}>Streaks</p>

              <div style={{
                fontSize: "40px",
                color: status.color
              }}>
                {status.emoji}
              </div>

              <div style={{
                ...bigNumber
              }}>
                {streak}
              </div>

              <p style={smallText}>Days</p>

              <p style={{
                fontSize: "11px",
                color: status.color
              }}>
                {status.text}
              </p>
            </div>

        {/* Total Score */}
        <div style={statCard}>
          <p style={smallTitle}>Total score</p>
          <div style={{ fontSize: "40px" }}>🏆</div>
          <div style={bigNumber}>{totalScore}</div>
          <p style={smallText}>points</p>
        </div>

          </div>

          {/* ===== 그래프 ===== */}
          <div style={{
            height: "200px",
            borderRadius: "25px",
            border: "4px solid #A8C4E6",
            marginBottom: "15px",
            padding: "10px"
          }}>
            {/* 간단한 라인 그래프 */}
            <svg
            width="100%"
            height="220"
            onTouchMove={(e) => {
              const touchX = e.touches[0].clientX;

              const index = Math.round((touchX - 40) / 35);

              if (history[index]) {
                const y = 180 - history[index].score * 1.4;
                const x = index * 35 + 40;

                setActivePoint({
                  x,
                  y,
                  score: history[index].score
                });
              }
            }}
            onClick={() => setActivePoint(null)}
          >
                          

      {/* ===== 배경 그리드 라인 ===== */}
      {[0, 25, 50, 75, 100].map(p => {
        const y = 180 - p * 1.4;

        return (
          <line
            key={"grid" + p}
            x1="30"
            y1={y}
            x2="100%"
            y2={y}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        );
      })}

      {/* ===== Y축 ===== */}
      <line x1="30" y1="0" x2="30" y2="180" stroke="#9CA3AF" strokeWidth="1" />

      {/* ===== X축 ===== */}
      <line x1="30" y1="180" x2="100%" y2="180" stroke="#9CA3AF" strokeWidth="1" />

      {/* ===== Y축 퍼센트 ===== */}
      {[0, 25, 50, 75, 100].map(p => (
        <text
          key={p}
          x="5"
          y={180 - p * 1.4 + 3}
          fontSize="10"
          fill="#6B7280"
        >
          {p}%
        </text>
      ))}

      {/* ===== 선 ===== */}
      {history.map((h, i) => {
        if (i === 0) return null;

        const x1 = (i - 1) * 35 + 40;
        const y1 = 180 - history[i - 1].score * 1.4;

        const x2 = i * 35 + 40;
        const y2 = 180 - h.score * 1.4;

        return (
          <line
            key={"line" + i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#2B2D42"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            style={{
              animation: "drawLine 1s ease forwards"
            }}
          />
        );
      })}

      {/* ===== 점 + 점수 ===== */}
      {history.map((h, i) => {
        const x = i * 35 + 40;
        const y = 180 - h.score * 1.4;

        return (
          <g key={"point" + i}>
            <circle
              cx={x}
              cy={y}
              r={activePoint?.x === x ? 7 : 5}
              fill="#2B2D42"
              style={{
                cursor: "pointer",
                transition: "0.2s ease"
              }}
              onMouseEnter={(e) => e.target.setAttribute("r", 7)}
              onMouseLeave={(e) => {
                if (activePoint?.x !== x) e.target.setAttribute("r", 5);
              }}
              onClick={(e) => {
                e.stopPropagation();

                if (activePoint?.x === x) {
                  setActivePoint(null);
                } else {
                  setActivePoint({ x, y, score: h.score });
                }
                 }}
                  onMouseEnter={(e) => e.target.setAttribute("r", 7)}
                  onMouseLeave={(e) => {
                    if (activePoint?.x !== x) e.target.setAttribute("r", 5);
              }}
            />
          </g>
        );
      })}

      {activePoint && (
        <g>
          <rect
            x={activePoint.x - 20}
            y={activePoint.y - 40}
            width="40"
            height="20"
            rx="5"
            fill="#2B2D42"
          />
          <text
            x={activePoint.x}
            y={activePoint.y - 25}
            fill="white"
            fontSize="12"
            textAnchor="middle"
          >
            {activePoint.score}
          </text>
        </g>
      )}

      {/* ===== 날짜 (아래로 분리) ===== */}
      {history.map((h, i) => {
        const x = i * 35 + 40;

        const label =
          i === history.length - 1
            ? "Today"
            : h.date.slice(5);

        return (
          <text
            key={"date" + i}
            x={x}
            y="198"
            fontSize="10"
            textAnchor="middle"
            fill="#6B7280"
          >
            {label}
          </text>
        );
      })}

            </svg>
     </div>

      {/* ===== Badges ===== */}
      <div style={{
  background: "#DCE3EC",
  borderRadius: "20px",
  padding: "15px",
  marginTop: "10px"
}}>

  {/* 🔥 헤더 */}
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  }}>
    <span style={{
      fontWeight: "600",
      color: "#2B2D42"
    }}>
      My badges
    </span>

    <span
      className="clickable"
      onClick={() => setShowBadges(true)}
      style={{
        fontSize: "13px",
        color: "#6B7280",
        cursor: "pointer"
      }}
    >
      See all
    </span>
  </div>

  {/* 🔥 미리보기 (3개만 보여주기) */}
  <div style={{
    display: "flex",
    gap: "10px"
  }}>
    {earnedBadges.map(b => (
      <div key={b.id} style={{
        background: "white",
        padding: "8px 10px",
        borderRadius: "12px",
        fontSize: "12px"
      }}>
        {b.name}
      </div>
    ))}
  </div>

</div>

</div>
</div>
      )}
<>
      <div style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "70%",
          height: "100%",
          background: "white",
          transform: notifOpen ? "translateX(0)" : "translateX(100%)",
          transition: "0.3s ease",
          zIndex: 2000,
          padding: "20px"
        }}>

          {/* 🔔 헤더 */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <h3>Notifications</h3>

            {/* ✖ 닫기 버튼 */}
            <button onClick={() => setNotifOpen(false)}>✕</button>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <span>Allow Notifications</span>

            {/* 👉 이게 두번째 코드 (스위치) */}
            <div
              onClick={() => setNotifications(!notifications)}
              style={{
                width: "40px",
                height: "22px",
                borderRadius: "20px",
                background: notifications ? "#22C55E" : "#D1D5DB",
                position: "relative",
                cursor: "pointer",
                transition: "0.3s"
              }}
            >
              <div style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "white",
                position: "absolute",
                top: "2px",
                left: notifications ? "20px" : "2px",
                transition: "0.3s"
              }} />
            </div>
  </div>

  {/* 🔔 알림 리스트 */}
  <div>
    {notifications ? (
      <p>No new notifications</p>
    ) : (
      <p style={{ color: "#9CA3AF" }}>
        Notifications are turned off 😴
      </p>
    )}
  </div>

          <button onClick={() => setNotifOpen(false)}>Close</button>
        </div>
        
      <div
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const touchEnd = e.changedTouches[0].clientX;

          if (touchStart - touchEnd > 50) {
            setMenuOpen(false); // 왼쪽으로 밀면 닫힘
          }
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "70%",
          height: "100%",
          background: "white",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "0.3s ease",
          zIndex: 2000,
          padding: "20px"
        }}>

          <div style={{
              display: "flex",
              justifyContent: "flex-end"
            }}>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: "20px",
                  background: "none",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                ✕
              </button>
            </div>

          <div style={{
  textAlign: "center",
  marginBottom: "25px"
}}>

  {/* 🔵 원형 프로필 */}
      <div
        onClick={() => setShowProfile(true)}
        style={{
          width: "90px",
          height: "90px",
          position: "relative",
          margin: "0 auto",
          cursor: "pointer"
        }}>
        <div style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          overflow: "hidden",
          background: "#ccc"
        }}>
          <img
            src={user?.img || defaultPfp}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>

        {/* ✏️ 펜 버튼 */}
        <label style={{
          position: "absolute",
          bottom: "-6px",
          right: "-6px",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "#2B2D42",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          cursor: "pointer",
          zIndex: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
        }}>
          ✏️

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();

              reader.onload = () => {
                setUser(prev => ({
                  ...prev,
                  img: reader.result
                }));
              };

              reader.readAsDataURL(file);
            }}
          />
        </label>
      </div>

      {/* 이름 */}
      <h3 style={{ marginTop: "10px" }}>
        {user?.name || "User"}
      </h3>

      {/* streak */}
      <p style={{ color: "#6B7280" }}>
        🔥 {streak} days
      </p>

    </div>

          {/* 🔵 메뉴 버튼들 */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={menuBtn}
          >
            🌙 Dark Mode
          </button>
          <button
            className="clickable"
            onClick={() => changePage("chart")}
            style={menuBtn}
          >
            📊 My Progress
          </button>

          <button
            className="clickable"
            onClick={() => changePage("check")}
            style={menuBtn}
          >
            🪥 Daily Check
          </button>

          {/* 🔴 로그아웃 */}
          <button
            className="clickable"
            onClick={handleLogout}
            style={{
              ...menuBtn,
              background: "#EF4444",
              color: "white",
              marginTop: "20px"
            }}
          >
            Logout
          </button>

</div>
</>
      {showProfile && (
        <>
          {/* 배경 */}
          <div
            onClick={() => setShowProfile(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 4000
            }}
          />

          {/* 이미지 */}
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 5000
          }}>
            <img
              src={user?.img || defaultPfp}
              alt=""
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "20px",
                objectFit: "cover"
              }}
            />
          </div>
        </>
      )}

      <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: showBadges ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2500,
          padding: "20px"
        }}>
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            width: "90%",
            maxWidth: "400px",
            maxHeight: "80vh",
            overflow: "auto",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              <h2 style={{ margin: 0 }}>All Badges</h2>
              <button
                onClick={() => setShowBadges(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer"
                }}
              >
                ✕
              </button>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px"
            }}>
              {earnedBadges.slice(0, 3).map((b, i) => (
                <div
                  key={i}
                  style={{
                    background: "#DCE3EC",
                    padding: "15px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    textAlign: "center",
                    fontWeight: "500",
                    color: "#2B2D42"
                  }}
                >
                  {b.name}
                </div>
              ))}
            </div>

            {earnedBadges.slice(0, 3).length === 0 && (
              <p style={{ textAlign: "center", color: "#6B7280" }}>
                No badges earned yet. Keep brushing! 🦷
              </p>
            )}
          </div>
        </div>

       {selected && (
  <>
    {/* 배경 */}
    <div
      onClick={() => setSelected(null)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 3000
      }}
    />

        {/* 팝업 */}
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "25px",
          borderRadius: "20px",
          width: "85%",
          maxWidth: "350px",
          zIndex: 4000
        }}>
          <div style={{ fontSize: "40px", textAlign: "center" }}>
            {selected.emoji}
          </div>

          <h3 style={{ textAlign: "center" }}>
            {selected.title}
          </h3>

          <p style={{
            fontSize: "14px",
            color: "#4B5563",
            textAlign: "center"
          }}>
            {selected.full}
          </p>

          <button
            onClick={() => setSelected(null)}
            style={{
              marginTop: "15px",
              width: "100%",
              padding: "10px",
              borderRadius: "12px",
              border: "none",
              background: "#2B2D42",
              color: "white"
            }}
          >
            Close
          </button>
        </div>
      </>
    )} 

    {newBadge && (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}>
        <div className="badge-popup">
          <div style={{ fontSize: "50px" }}>🏆</div>
          <h2 style={{ margin: "10px 0" }}>New Badge!</h2>
          <p>{newBadge.name}</p>
        </div>
      </div>
    )}

      {/* ===== 네비 ===== */}
      <div style={{
          position: "fixed",
          bottom: "calc(20px + env(safe-area-inset-bottom))",
          left: 0,
          right: 0,
          margin: "0 auto",
          width: "90%",
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 9999,
          paddingBottom: "10px"
        }}>
          <div style={{
            width: "100%",
            background: "#2B2D42",
            padding: "15px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "space-around"
          }}>
        {["home","check","book","chart"].map(p => (
          <img
             className="clickable"
            key={p}
            src={getIcon(p)}
            alt=""
            style={{ width: "30px", cursor: "pointer" }}
            onClick={() => changePage(p)}
          />
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;