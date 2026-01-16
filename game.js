let started = false;
let warningCount = 0;

const bg = document.getElementById("bgSound");
const scream = document.getElementById("screamSound");

// 볼륨 확실히
bg.volume = 1;
scream.volume = 1;

// =====================
// ▶ START 버튼
// =====================
document.getElementById("startBtn").addEventListener("click", () => {
  if (started) return;

  // 🔓 브라우저 오디오 잠금 해제 (핵심)
  bg.muted = false;
  bg.currentTime = 0;
  bg.play();

  scream.muted = false;
  scream.currentTime = 0;
  scream.play();
  scream.pause();

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  started = true;
});

// =====================
// ❌ 잘못된 선택
// =====================
function wrongChoice() {
  scream.currentTime = 0;
  scream.play();

  setTimeout(() => {
    alert("You lost. Try again.");
  }, 300);
}

// =====================
// ⚠️ 경고 시스템
// =====================
function showWarning() {
  if (!started) return;

  warningCount++;

  if (warningCount === 1) {
    warning.style.display = "flex";
    setTimeout(() => warning.style.display = "none", 2500);
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
  bsod.style.display = "flex";

  setTimeout(() => blackout.style.display = "block", 2500);
}

// =====================
// 🖱️ 나가기 시도 감지
// =====================
document.addEventListener("mousemove", e => {
  if (!started) return;

  if (e.clientY < 10 || e.clientX < 10 || e.clientX > window.innerWidth - 10) {
    showWarning();
  }
});
