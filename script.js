document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const feedbackDiv = document.getElementById("feedback");
    const audio = new Audio();
    let globalTrivia = '';

    // Create a new Date object
	var currentDate = new Date();
	// Get the day of the month
	var dayOfMonth = currentDate.getDate();
	console.log("The current day of the month is: " + dayOfMonth);

    function playSound(day, type) {
        audio.src = `sounds/sound${day}_${type}.mp3`;
        audio.play();
    }

    function createButton(label, type, callback) {
        const button = document.createElement("button");
        button.textContent = label;
        button.setAttribute("data-type", type);
        button.setAttribute("class", "glow-on-hover");
        button.addEventListener("click", callback);
        return button;
    }

function createDay(day, type) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = `${day}. Dezember`;

    // Container for the day text
    const textContainer = document.createElement("div");

    // Container for the buttons
    const buttonsContainer = document.createElement("div");

    const replayButton = createButton("Nochmal", type, () => handleReplayClick(day, type));
    buttonsContainer.appendChild(replayButton);

    const babyButton = createButton("Elli", "baby", () => handleButtonClick("baby"));
    buttonsContainer.appendChild(babyButton);

    const birdButton = createButton("Nicht Elli", "bird", () => handleButtonClick("bird"));
    buttonsContainer.appendChild(birdButton);

    // Append the text and buttons containers to the main dayDiv
    dayDiv.appendChild(textContainer);
    dayDiv.appendChild(buttonsContainer);

    return dayDiv;
}

    function handleButtonClick(type,trivia) {
        const buttonType = type.toLowerCase();
        const soundType = audio.src.includes("baby") ? "baby" : "bird";

 		const feedback = document.createElement("p");


		        const triviaContent = globalTrivia.toLowerCase();
            if (triviaContent.includes("jpg")) {
                const img = document.createElement("img");
                img.src = "sounds/" + globalTrivia;
                img.style.maxHeight = "500px";
                feedback.appendChild(img);
            } else if (triviaContent.includes("http")) {
                const link = document.createElement("a");
                link.href = globalTrivia;
                link.textContent = "Das verbrigt sich hinter dem Geräusch";
                feedback.appendChild(link);
            } else if (buttonType === soundType) {
            feedback.textContent = "Richtig gehört!" + globalTrivia;
        } else {
            feedback.textContent = "Ups, da haben wir Dich in die Irre geführt." + globalTrivia;
        }

        // Update the feedback div
        feedbackDiv.innerHTML = "";
        feedbackDiv.appendChild(feedback);
        
        

        
    }

    function handleReplayClick(day, type) {
        playSound(day, type);
    }

    function showDay(clickedDay,clickedSound,clickedTrivia) {
        calendar.innerHTML = "";
        const soundType = clickedSound;
        const dayDiv = createDay(clickedDay, soundType);
        calendar.appendChild(dayDiv);
        playSound(clickedDay, soundType);
        
        //
        globalTrivia = clickedTrivia;
        
                // Clear the feedback
        feedbackDiv.innerHTML = "";
        
                // Display trivia information in feedback div
        handleButtonClick(clickedType);
    }
    

    // Attach click event listener to each number overlay
    const numberOverlays = document.querySelectorAll(".number-overlay");
    numberOverlays.forEach(overlay => {
        overlay.addEventListener("click", function() {
            const clickedNumber = parseInt(this.dataset.number, 10);
            const clickedType = this.dataset.type;
            const clickedTrivia = this.dataset.trivia;
            
            if (clickedNumber <= dayOfMonth) {
                        
            	showDay(clickedNumber,clickedType,clickedTrivia);;
             }
            
        });
    });


});
