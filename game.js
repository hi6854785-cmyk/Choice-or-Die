let current = 0;

/* ===== 타이머 ===== */
const LIMIT = 60 * 60 * 1000;
let startTime = localStorage.getItem("startTime");

if (!startTime) {
  startTime = Date.now();
  localStorage.setItem("startTime", startTime);
}

function updateTimer() {
  const left = LIMIT - (Date.now() - startTime);
  if (left <= 0) {
    timeOver();
    return;
  }

  const m = Math.floor(left / 60000);
  const s = Math.floor((left % 60000) / 1000);
  document.getElementById("timer").innerText =
    `남은 시간: ${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

setInterval(updateTimer, 1000);

/* ===== 질문 표시 ===== */
function showQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.q;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(i);
    choices.appendChild(btn);
  });
}

/* ===== 정답 체크 ===== */
function checkAnswer(choice) {
  if (choice === questions[current].answer) {
    current++;
    showQuestion();
  } else {
    lose();
  }
}

/* ===== 오답 처리 ===== */
function lose() {
  alert("You lost. Try again.");
  jumpScare(() => {
    showQuestion(); // 같은 질문부터 재시작
  });
}

/* ===== 점프스케어 ===== */
function jumpScare(callback) {
  const img = document.getElementById("scare");
  const sound = document.getElementById("scareSound");

  img.style.display = "block";
  sound.currentTime = 0;
  sound.play();

  setTimeout(() => {
    img.style.display = "none";
    if (callback) callback();
  }, 800);
}

/* ===== 시간 초과 ===== */
function timeOver() {
  fakeBlackout();
}

/* ===== 경고 ===== */
function showWarning() {
  alert(
    "경고! 이 사이트는 중도 포기가 불가 합니다.\n" +
    "이 규칙을 어기면 그에 따른 결과가 부여 됩니다.\n" +
    "질문에 대한 답변을 계속해 주십시오."
  );
}

/* ===== 나가려는 시도 감지 ===== */
document.addEventListener("mouseleave", (e) => {
  if (e.clientY <= 0) {
    showWarning();
  }
});

/* ===== 가짜 전원 종료 ===== */
function fakeBlackout() {
  document.body.innerHTML = "";
  document.body.style.background = "black";
  document.body.style.cursor = "none";

  const scream = document.getElementById("scareSound");
  scream.currentTime = 0;
  scream.play();
}

/* ===== 시작 ===== */
document.addEventListener("click", () => {
  document.getElementById("bgm").play();
}, { once: true });

showQuestion();
