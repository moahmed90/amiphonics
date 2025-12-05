// State
let currentWord = "";
let currentGuess = "";
let score = 0;
let stars = 0;
let currentLevel = 1;

// Fetch a new word for the current level
async function fetchWord() {
  const response = await fetch(`/api/word?level=${currentLevel}`);
  const data = await response.json();

  currentWord = data.word;
  currentGuess = "";

  renderSlots();
  renderLetterButtons();

  const feedbackEl = document.getElementById("feedback");
  if (feedbackEl) feedbackEl.textContent = "";
}

// Show blanks _ _ _
function renderSlots() {
  const display = currentWord
    .split("")
    .map(() => "_")
    .join(" ");

  document.getElementById("word-display").textContent = display;
}

// Show shuffled letters
function renderLetterButtons() {
  const container = document.getElementById("letter-buttons");
  container.innerHTML = "";

  const letters = currentWord.split("");

  const shuffled = letters
    .map(l => ({ l, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(obj => obj.l);

  shuffled.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.className = "letter-btn";
    btn.addEventListener("click", () => handleLetterClick(letter, btn));
    container.appendChild(btn);
  });
}

// Update guess display
function renderGuessSlots() {
  const display = currentWord
    .split("")
    .map((_, i) => currentGuess[i] || "_")
    .join(" ");

  const el = document.getElementById("word-display");
  el.textContent = display;
  el.classList.add("reveal");
  setTimeout(() => el.classList.remove("reveal"), 300);
}

function handleLetterClick(letter, button) {
  currentGuess += letter;
  button.disabled = true;

  renderGuessSlots();

  if (currentGuess.length === currentWord.length) {
    checkAnswer();
  }
}

// Check if guess is correct
function checkAnswer() {
  const feedback = document.getElementById("feedback");
  const scoreEl = document.getElementById("score");
  const starsEl = document.getElementById("stars");
  const unicorn = document.getElementById("unicorn");

  if (currentGuess === currentWord) {
    feedback.textContent = "Well done!";
    score += 1;
    if (scoreEl) scoreEl.textContent = score;

    // Stars: reward more for higher levels
    stars += currentLevel;
    if (starsEl) starsEl.textContent = stars;

    // Unicorn reacts
    if (unicorn) {
      unicorn.classList.add("happy");
      setTimeout(() => unicorn.classList.remove("happy"), 1800);
    }

    launchConfetti();
  } else {
    feedback.textContent = "Try again!";
  }
}

// Confetti
function launchConfetti() {
  const confetti = document.getElementById("confetti");
  if (!confetti) return;

  for (let i = 0; i < 35; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");

    const colors = ["#ff66b3", "#ffcc00", "#66ccff", "#99ff66", "#ff4444", "#aa66cc"];
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    piece.style.left = Math.random() * window.innerWidth + "px";
    piece.style.top = "-40px";

    confetti.appendChild(piece);

    setTimeout(() => piece.remove(), 3000);
  }
}

// Level selection
const levelButtons = document.querySelectorAll(".level-btn");

function updateLevelUI() {
  levelButtons.forEach(btn => {
    const lvl = Number(btn.dataset.level);
    if (lvl === currentLevel) {
      btn.classList.add("active-level");
    } else {
      btn.classList.remove("active-level");
    }
  });
}

levelButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentLevel = Number(btn.dataset.level);
    updateLevelUI();
    fetchWord();
  });
});

// Hook up "new word" button and load first word
document.getElementById("new-word-btn").addEventListener("click", fetchWord);
updateLevelUI();
fetchWord();