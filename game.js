let current = 0;

// 시작 시 저장된 진행도 불러오기
const saved = localStorage.getItem("progress");
if (saved !== null) current = parseInt(saved);

// 배경음 (첫 클릭 후 재생)
document.addEventListener("click", () => {
  document.getElementById("bgm").play();
}, { once: true });

function showQuestion() {
  document.getElementById("scare").style.display = "none";

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

function checkAnswer(choice) {
  if (choice === questions[current].answer) {
    current++;
    localStorage.setItem("progress", current);
    showQuestion();
  } else {
    jumpScare();
  }
}

function jumpScare() {
  const img = document.getElementById("scare");
  const sound = document.getElementById("scareSound");

  img.style.display = "block";
  sound.currentTime = 0;
  sound.play();

  setTimeout(() => {
    img.style.display = "none";
    showQuestion(); // 실패한 질문부터 다시
  }, 500);
}

checkTime();
showQuestion();



const LIMIT = 60 * 60 * 1000; // 1시간

let startTime = localStorage.getItem("startTime");

if (!startTime) {
  startTime = Date.now();
  localStorage.setItem("startTime", startTime);
}

function checkTime() {
  const now = Date.now();
  if (now - startTime > LIMIT) {
    timeOver();
  }
}

function timeOver() {
  document.body.innerHTML = "<h1 style='color:red'>시간 초과</h1>";
}


document.addEventListener("mouseleave", (e) => {
  if (e.clientY <= 0) {
    showWarning();
  }
});


function showWarning() {
  alert(
    "경고! 이 사이트는 중도 포기가 불가 합니다.\n" +
    "이 규칙을 어기면 그에 따른 결과가 부여 됩니다.\n" +
    "질문에 대한 답변을 계속해 주십시오."
  );

  // 경고 무시한 대가
  punishment();
}

function punishment() {
  document.body.innerHTML = `
    <div style="
      background:black;
      color:white;
      width:100vw;
      height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:24px;
    ">
      시스템 오류가 발생했습니다.<br>
      강제 종료 중...
    </div>
  `;

  document.documentElement.requestFullscreen();
}
