let warningCount = 0;
let gameStarted = false;

const bg = document.getElementById("bgSound");
const scream = document.getElementById("screamSound");
const startBtn = document.getElementById("startBtn");

// =====================
// 초기 오디오 설정
// =====================
bg.loop = true;
bg.volume = 0.35;
bg.muted = true;

scream.volume = 1;

// =====================
// ▶ START 버튼 (오디오 언락 핵심)
// =====================
startBtn.addEventListener("click", () => {
  if (gameStarted) return;

  // 🔓 브라우저 오디오 언락 (이게 핵심)
  bg.muted = false;
  bg.currentTime = 0;
  bg.play(); // ← 반드시 클릭 이벤트 안에서 직접 실행

  gameStarted = true;
  startBtn.style.display = "none";
});

// =====================
// ❌ 잘못된 선택
// =====================
function wrongChoice() {
  if (!gameStarted) return;

  scream.pause();
  scream.currentTime = 0;
  scream.play();

  setTimeout(() => {
    alert("You lost. Try again.");
  }, 300);
}

// =====================
// ⚠️ 경고 처리
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
// 💀 가짜 BSOD
// =====================
function triggerBSOD() {
  scream.pause();
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
