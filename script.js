const choices = ["rock", "paper", "scissors"];


// Load scores from localStorage or initialize
function loadScores() {
	const saved = localStorage.getItem('rps-scores');
	if (saved) {
		try {
			return JSON.parse(saved);
		} catch (e) {
			// fallback to default if corrupted
		}
	}
	return { wins: 0, ties: 0, losses: 0 };
}

function saveScores(scores) {
	localStorage.setItem('rps-scores', JSON.stringify(scores));
}

const scores = loadScores();

const winsEl = document.getElementById("wins");
const tiesEl = document.getElementById("ties");
const lossesEl = document.getElementById("losses");
const resultText = document.getElementById("resultText");
const computerChoiceEl = document.getElementById("computerChoice");
const choiceButtons = document.querySelectorAll(".choice");


function updateScoreDisplay() {
	winsEl.textContent = scores.wins;
	tiesEl.textContent = scores.ties;
	lossesEl.textContent = scores.losses;
}


function updateScore(result) {
	if (result === "You win!") scores.wins++;
	else if (result === "You lose!") scores.losses++;
	else if (result === "It's a tie!") scores.ties++;
	saveScores(scores);
	updateScoreDisplay();
}

function getComputerChoice() {
	const options = ["rock", "paper", "scissors"];
	return options[Math.floor(Math.random() * options.length)];
}

function decideWinner(player, computer) {
	if (player === computer) return "It's a tie!";
	if (
		(player === "rock" && computer === "scissors") ||
		(player === "paper" && computer === "rock") ||
		(player === "scissors" && computer === "paper")
	)
		return "You win!";
	return "You lose!";
}

function showComputerChoice(choice) {
	// simple text or image, keep minimal so it integrates with your HTML
	computerChoiceEl.innerHTML = `<div class="choice-display">${
		choice.charAt(0).toUpperCase() + choice.slice(1)
	}</div>`;
}

choiceButtons.forEach((btn) => {
	btn.addEventListener("click", () => {
		const player = btn.id; // expects buttons with id="rock" | "paper" | "scissors"
		const computer = getComputerChoice();
		const result = decideWinner(player, computer);

		// show result + computer choice
		resultText.textContent = result;
		showComputerChoice(computer);

		// add pop animation to clicked image if present
		const img = btn.querySelector("img");
		if (img) {
			img.classList.add("pop");
			setTimeout(() => img.classList.remove("pop"), 300);
		}

		updateScore(result);
	});
});

// initialize display
updateScoreDisplay();

// Clear scores button logic
const clearBtn = document.getElementById("clearScores");
if (clearBtn) {
	clearBtn.addEventListener("click", () => {
		scores.wins = 0;
		scores.ties = 0;
		scores.losses = 0;
		saveScores(scores);
		updateScoreDisplay();
	});
}
