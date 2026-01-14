function checkAnswer(choice) {
  if (choice === questions[current].answer) {
    current++;
    saveProgress();
    showQuestion();
  } else {
    jumpScare();
  }
}

function jumpScare() {
  const img = document.getElementById("scare");
  img.style.display = "block";

  setTimeout(() => {
    img.style.display = "none";
    showQuestion(); // 실패 지점부터 재개
  }, 400);
}

function saveProgress() {
  localStorage.setItem("progress", current);
}


const saved = localStorage.getItem("progress");
if (saved !== null) {
  current = parseInt(saved);
}
showQuestion();


document.body.addEventListener("click", () => {
  document.getElementById("bgm").play();
}, { once: true });



function jumpScare() {
  document.getElementById("scareSound").play();
  // 이미지 표시 로직
}
