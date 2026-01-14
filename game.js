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
