let warningCount = 0;
let audioUnlocked = false;
let gameStarted = false;

const bg = document.getElementById("bgSound");
const scream = document.getElementById("screamSound");
const startBtn = document.getElementById("startBtn");

bg.volume = 0.35;
bg.loop = true;

// =====================
// ▶ START 버튼
// =====================
startBtn.addEventListener("click", () => {
  if (gameStarted) return;

  // 🔓 오디오 권한 해제
  bg.play().then(() => {
    bg.muted = false;
  }).catch(() => {});

  scream.play().then(() => {
    scream.pause();
    scream.currentTime = 0;
  }).catch(() => {});

  audioUnlocked = true;
  gameStarted = true;

  startBtn.style.display = "none";
});

// =====================
// ❌ 잘못된 선택
// =====================
function wrongChoice() {
  if (!audioUnlocked) return;

  scream.currentTime = 0;
  scream.volume = 1;
  scream.play();

  setTimeout(() => {
    alert("You lost.");
  }, 300);
}

// =====================
// ⚠️ 경고
// =====================
function showWarning() {
  if (!gameStarted) return;

  warningCount++;

  if (warningCount === 1) {
    const w = document.getElementById("warning");
    w.style.display = "flex";

    setTimeout(() => {
      w.style.display = "none";
    }, 3000);
  }

  if (warningCount === 2) {
    triggerBSOD();
  }
}

// =====================
// 💀 BSOD
// =====================
function triggerBSOD() {
  scream.currentTime = 0;
  scream.play();

  document.body.style.cursor = "none";
  document.getElementById("bsod").style.display = "block";

  setTimeout(() => {
    document.getElementById("blackout").style.display = "block";
  }, 2500);
}

// =====================
// 🖱️ 나가기 시도 감지
// =====================
document.addEventListener("mousemove", (e) => {
  if (!gameStarted) return;

  if (
    e.clientY < 10 ||
    e.clientX < 10 ||
    e.clientX > window.innerWidth - 10
  ) {
    showWarning();
  }
});
