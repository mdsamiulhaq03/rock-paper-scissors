const choices = ["rock", "paper", "scissors"];
const resultText = document.getElementById("resultText");
const computerChoiceDiv = document.getElementById("computerChoice");

const choiceImages = {
	rock: "https://www.shutterstock.com/image-vector/rocks-cartoon-vector-illustration-hand-600nw-278371901.jpg",
	paper:
		"https://p7.hiclipart.com/preview/368/847/792/paper-clip-printing-and-writing-paper-clip-art-paper-cliparts.jpg",
	scissors:
		"https://www.shutterstock.com/image-vector/scissors-cutting-paper-welcome-back-600nw-2314075513.jpg",
};

document.querySelectorAll(".choice").forEach((button) => {
	button.addEventListener("click", function () {
		const img = this.querySelector("img");
		img.classList.remove("pop"); // Reset animation
		void img.offsetWidth; // Trigger reflow
		img.classList.add("pop");

		const userChoice = this.id;
		const computerChoice = choices[Math.floor(Math.random() * 3)];
		let result = "";
		let color = "";

		// Show computer's choice
		computerChoiceDiv.innerHTML = `
            <p>Computer chose:</p>
            <img src="${
							choiceImages[computerChoice]
						}" alt="${computerChoice}" width="100" height="100"><br>
            <span>${capitalize(computerChoice)}</span>
        `;

		if (userChoice === computerChoice) {
			result = "It's a draw!";
			color = "#888"; // Ash color
		} else if (
			(userChoice === "rock" && computerChoice === "scissors") ||
			(userChoice === "paper" && computerChoice === "rock") ||
			(userChoice === "scissors" && computerChoice === "paper")
		) {
			result = `You win! ${capitalize(userChoice)} beats ${capitalize(
				computerChoice
			)}.`;
			color = "#4caf50"; // Green
		} else {
			result = `You lose! ${capitalize(computerChoice)} beats ${capitalize(
				userChoice
			)}.`;
			color = "#e53935"; // Red
		}

		resultText.textContent = result;
		resultText.style.color = color;
	});
});

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}
