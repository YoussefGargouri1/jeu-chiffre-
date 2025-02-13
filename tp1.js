function startGame() {
    const difficulty = document.getElementById("difficulty").value;
    const gameContainer = document.getElementById("gameContainer");
    const gameInfo = document.getElementById("gameInfo");

    let maxAttempts, maxRange;
    if (difficulty === "easy") {
        maxAttempts = 10;
        maxRange = 50;
    } else if (difficulty === "medium") {
        maxAttempts = 7;
        maxRange = 100;
    } else if (difficulty === "hard") {
        maxAttempts = 5;
        maxRange = 200;
    }

    const secretNumber = Math.floor(Math.random() * maxRange) + 1;
    let attemptsLeft = maxAttempts;

    gameInfo.innerHTML = `Vous avez ${attemptsLeft} tentatives pour deviner un nombre entre 1 et ${maxRange}. Bonne chance !`;
    gameContainer.style.display = "block";  

    function guessNumber() {
        const userGuess = parseInt(document.getElementById("userGuess").value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > maxRange) {
            alert("Veuillez entrer un nombre valide dans la plage spécifiée.");
            return;
        }

        attemptsLeft--;

        if (userGuess === secretNumber) {
            alert("Félicitations, vous avez deviné le bon nombre !");
            if (confirm("Voulez-vous recommencer ?")) {
                startGame();  
            }
        } else if (attemptsLeft === 0) {
            alert(`Désolé, vous avez épuisé vos tentatives. Le nombre secret était ${secretNumber}.`);
            if (confirm("Voulez-vous recommencer ?")) {
                startGame();  
            }
        } else {
            if(userGuess > secretNumber){
                gameInfo.innerHTML = `Ce n'est pas le bon nombre, Trop grand. Il vous reste ${attemptsLeft} tentatives.`;
            }
            else{
                gameInfo.innerHTML = `Ce n'est pas le bon nombre, Trop petit. Il vous reste ${attemptsLeft} tentatives.`;
            }
        }
    }

    // Attach the guessNumber function to the button click
    const guessButton = document.querySelector("button[onclick='guessNumber()']");
    guessButton.onclick = guessNumber;
}
