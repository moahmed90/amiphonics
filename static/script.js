// Store state
let currentWord = "";
let currentGuess = "";
let score = 0;

// Fetch a new word from Flask
async function fetchWord() {
  const response = await fetch("/api/word");
  const data = await response.json();

  currentWord = data.word;
  currentGuess = "";

  renderSlots();
  renderLetterButtons();

  document.getElementById("feedback").textContent = "";
}

// Show blanks _ _ _
function renderSlots() {
  const display = currentWord
    .split("")
    .map(() => "_")
    .join(" ");

  document.getElementById("word-display").textContent = display;
}

// Show the shuffled letters as buttons
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

// Update the word display to show guess so far
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
  const unicorn = document.getElementById("unicorn");

  if (currentGuess === currentWord) {
    feedback.textContent = "Well done!";
    score += 1;
    scoreEl.textContent = score;

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

// Confetti logic
function launchConfetti() {
  const confetti = document.getElementById("confetti");
  if (!confetti) return;

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");

    const colors = ["#FF66B3", "#FFD93D", "#6EC1E4", "#7ED957", "#FF6F59", "#B28DFF"];
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    piece.style.left = Math.random() * window.innerWidth + "px";
    piece.style.top = "-40px";

    const size = Math.random() * 12 + 10;
    piece.style.width = size + "px";
    piece.style.height = size + "px";

    const duration = Math.random() * 1 + 2.2;
    piece.style.animationDuration = `${duration}s`;

    confetti.appendChild(piece);

    setTimeout(() => piece.remove(), 4000);
  }
}

// Hook up button and load first word
document.getElementById("new-word-btn").addEventListener("click", fetchWord);
fetchWord();