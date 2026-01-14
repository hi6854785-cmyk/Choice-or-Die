<script>
let warningCount = 0;
let audioUnlocked = false;

const bg = document.getElementById("bgSound");
const scream = document.getElementById("screamSound");
const startBtn = document.getElementById("startBtn");

bg.volume = 0.3;

startBtn.addEventListener("click", () => {
    if (!audioUnlocked) {
        // 🔓 오디오 권한 열기
        bg.play();
        scream.play();
        scream.pause();
        scream.currentTime = 0;

        audioUnlocked = true;
        startBtn.style.display = "none";
    }
});

function wrong() {
    scream.currentTime = 0;
    scream.play();

    // alert 대신 연출용 텍스트 권장
    setTimeout(() => {
        alert("You lost. Try again.");
    }, 300);
}

function showWarning() {
    warningCount++;

    if (warningCount === 1) {
        document.getElementById("warning").style.display = "flex";
        setTimeout(() => {
            document.getElementById("warning").style.display = "none";
        }, 3000);
    }

    if (warningCount === 2) {
        triggerBSOD();
    }
}

function triggerBSOD() {
    scream.currentTime = 0;
    scream.play();

    document.body.style.cursor = "none";
    document.getElementById("bsod").style.display = "block";

    setTimeout(() => {
        document.getElementById("blackout").style.display = "block";
    }, 2500);
}

// ❗ 마우스 상단 감지
document.addEventListener("mousemove", (e) => {
    if (audioUnlocked && (e.clientY < 10 || e.clientX > window.innerWidth - 10)) {
        showWarning();
    }
});
</script>

<script>
const bg = document.getElementById("bg");
const scream = document.getElementById("scream");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  bg.volume = 0.4;
  bg.muted = false;
  bg.play();          // 🔓 여기서 오디오 권한 언락됨
  startBtn.style.display = "none";
});

// ❌ 잘못된 선택
function wrongChoice() {
  scream.currentTime = 0;
  scream.volume = 1;
  scream.play();
}

// ❌ 경고 2회째
function finalWarning() {
  scream.currentTime = 0;
  scream.play();
}
</script>
