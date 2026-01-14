function checkAnswer(choice) {
  if (choice === questions[current].answer) {
    current++;
    saveProgress();
    showQuestion();
  } else {
    jumpScare();
  }
}

