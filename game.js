let warningCount = 0;
let audioUnlocked = false;

// 오디오
const bg = document.getElementById("bgSound");
const scream = document.getElementById("screamSound");

// 버튼
const startBtn = document.getElementById("startBtn");

// 배경음 기본 설정
bg.volume = 0.35;
bg.loop = true;

// =====================
// 🔓 START 클릭 → 오디오 권한 해제
// =====================
startBtn.addEventListener("click", () => {
  if (audioUnlocked) return;

  // 배경음 재생 (이게 핵심)
  bg.play().catch(() => {});

  // 비명음도 한번 재생했다가 바로 멈춤 (권한 언락용)
  scream.play().then(() => {
    scream.pause();
    scream.currentTime = 0;
  }).catch(() => {});

  audioUnlocked = true;
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
    alert("You lost. Try again.");
  }, 300);
}

// =====================
// ⚠️ 경고 처리
// =====================
function showWarning() {
  if (!audioUnlocked) return;

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
// 💀 가짜 블루스크린
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
  if (!audioUnlocked) return;

  if (
    e.clientY < 10 ||
    e.clientX < 10 ||
    e.clientX > window.innerWidth - 10
  ) {
    showWarning();
  }
});
