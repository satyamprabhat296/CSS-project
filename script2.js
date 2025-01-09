document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");
    const progressClass = document.querySelector(".progress");
    const name = document.querySelector(".name");
    const totalSolved = document.querySelector(".totalSolved");
    const ranking = document.querySelector(".ranking");
    const contribution = document.querySelector(".contribution");
    const reputation = document.querySelector(".reputation");

    // Return true or false based on regex
    function validateUsername(username) {
        if (username == "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) alert("Invalid username");
        return isMatching;
    }

    // To display the information on cards
    function displayCards(data) {
        totalSolved.textContent = `Total Problems Solved : ${data.totalSolved}`;
        ranking.textContent = `Ranking : ${data.ranking}`;
        contribution.textContent = `Contribution Points : ${data.contributionPoints}`;
        reputation.textContent = `Reputation : ${data.reputation}`;

        cardStatsContainer.style.display = "flex";
    }

    function displayUserData(data) {
        const easySolved = (data.easySolved / data.totalEasy) * 100;
        const mediumSolved = (data.mediumSolved / data.totalMedium) * 100;
        const hardSolved = (data.hardSolved / data.totalHard) * 100;

        easyProgressCircle.style.setProperty("--progress-degree", `${easySolved}%`);
        mediumProgressCircle.style.setProperty("--progress-degree", `${hardSolved}%`);
        hardProgressCircle.style.setProperty("--progress-degree", `${mediumSolved}%`);

        easyLabel.textContent = `${data.easySolved}/${data.totalEasy}`;
        mediumLabel.textContent = `${data.mediumSolved}/${data.totalMedium}`;
        hardLabel.textContent = `${data.hardSolved}/${data.totalHard}`;

        name.style.display = "block";
        progressClass.style.display = "flex";

        // Trigger celebration if total problems solved is greater than 50
        if (data.totalSolved > 50) {
            triggerCelebration();
        }
    }

    // Trigger a celebration game (confetti and sound)
    function triggerCelebration() {
        // Create confetti effect
        const confettiContainer = document.createElement("div");
        confettiContainer.id = "confetti-container";
        document.body.appendChild(confettiContainer);

        // Adding styles for confetti container
        confettiContainer.style.position = "absolute";
        confettiContainer.style.top = "0";
        confettiContainer.style.left = "0";
        confettiContainer.style.width = "100%";
        confettiContainer.style.height = "100%";
        confettiContainer.style.pointerEvents = "none";
        confettiContainer.style.zIndex = "9999";

        // Adding confetti animation (simple)
        let confettiCount = 150;
        for (let i = 0; i < confettiCount; i++) {
            const confettiPiece = document.createElement("div");
            confettiPiece.classList.add("confetti");
            confettiPiece.style.position = "absolute";
            confettiPiece.style.width = `${Math.random() * 10 + 5}px`;
            confettiPiece.style.height = `${Math.random() * 10 + 5}px`;
            confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confettiPiece.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear infinite`;

            confettiPiece.style.top = `${Math.random() * 100}%`;
            confettiPiece.style.left = `${Math.random() * 100}%`;

            confettiContainer.appendChild(confettiPiece);
        }

        // Play celebration sound
        const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
        audio.play();

        // Clean up confetti after 3 seconds
        setTimeout(() => {
            confettiContainer.remove();
            alert("Congratulations! You've solved more than 50 problems!");
        }, 3000);
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchBtn.textContent = "Generating...";
            searchBtn.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch user-details...");
            }
            const data = await response.json();
            console.log("user details: ", data);
            displayUserData(data);
            displayCards(data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            // Reset everything
            searchBtn.innerHTML = `<span>Generate</span><span class="material-symbols-outlined">query_stats</span>`;
            searchBtn.disabled = false;
            usernameInput.value = "";
        }
    }

    searchBtn.addEventListener("click", () => {
        const username = usernameInput.value;
        name.textContent = `Welcome! ${username}`;

        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });

    // On clicking the user input field, hide all details
    usernameInput.addEventListener("click", () => {
        name.style.display = "none";
        progressClass.style.display = "none";
        cardStatsContainer.style.display = "none";
    });

    // To resume and play the toggle animation
    function toggleAnimation(element) {
        const currentState = window.getComputedStyle(element).animationPlayState;

        if (currentState === "running") {
            element.style.animationPlayState = "paused";
        } else {
            element.style.animationPlayState = "running";
        }
    }

    name.addEventListener("click", function () {
        toggleAnimation(name);
    });
});
