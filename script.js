document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const feedbackDiv = document.getElementById("feedback");
    const adventCal = document.getElementById("adventCal"); // The calendar image
    const audio = new Audio();
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();
    let playCount = 0; // Track play button clicks

    console.log("The current day of the month is: " + dayOfMonth);

    // CSV Data (can be fetched or included directly)
    const csvData = `
1,Laterne,Kerze,https://wordly.org/de?challenge=a2VyemU
2,Mond,Stern,https://wordly.org/de?challenge=c3Rlcm4
3,Spinnrad,Märchen,https://wordly.org/de?challenge=bcOkcmNoZW4
4,Bär brumm,Teddy,https://wordly.org/de?challenge=dGVkZHk
5,Pilz,Trüffel,https://wordly.org/de?challenge=dHLDvGZmZWw
6,Nikolaus,Stiefel,https://wordly.org/de?challenge=c3RpZWZlbA
7,Nase,Rudolph,https://wordly.org/de?challenge=cnVkb2xwaA
8,Ding dong,Glocke,https://wordly.org/de?challenge=Z2xvY2tl
9,Mama,Maria,https://wordly.org/de?challenge=bWFyaWE
10,Pferd,Esel,https://wordly.org/de?challenge=ZXNlbA
11,Kuchen,Stollen,https://wordly.org/de?challenge=c3RvbGxlbg
12,Bach,Oratorium,https://wordly.org/de?challenge=b3JhdG9yaXVt
13,umblättern,Geschichte,https://wordly.org/de?challenge=Z2VzY2hpY2h0ZQ
14,Vogel,Rotkehlchen,https://wordly.org/de?challenge=cm90a2VobGNoZW4
15,Drei Fünf Sechs Sieben Neun,Kalender,https://wordly.org/de?challenge=a2FsZW5kZXI
16,Aufwachen!,Morgenstern,https://wordly.org/de?challenge=bW9yZ2Vuc3Rlcm4
17,rutschen,Schlitten,https://wordly.org/de?challenge=c2NobGl0dGVu
18,Tütata laut,Feuerwerk,https://wordly.org/de?challenge=ZmV1ZXJ3ZXJr
19,Bitte,Geschenk,https://wordly.org/de?challenge=Z2VzY2hlbms
20,Reh,Rentier,https://wordly.org/de?challenge=cmVudGllcg
21,Entchen,Braten,https://wordly.org/de?challenge=YnJhdGVu
22,schaukel schaukel schaukel,Krippe,https://wordly.org/de?challenge=a3JpcHBl
23,Junge,Jesus,https://wordly.org/de?challenge=amVzdXM
24,Weihnachtsmann,Bescherung,https://wordly.org/de?challenge=YmVzY2hlcnVuZw
    `;

    // Parse the CSV data
    const parsed = Papa.parse(csvData.trim(), { header: false });
    const rows = parsed.data;

    // Function to play sound
    function playSound(keyword) {
        keyword = keyword.toLowerCase();
        audio.src = `sounds/${keyword}.mp3`;
        audio.play();
    }

    // Function to create a "Play" button
    function createPlayButton(keyword, iframe, link) {
        const playButton = document.createElement("button");
        playButton.textContent = "Ellis Hinweis";
        playButton.classList.add("glow-on-hover");
        playButton.style.margin = "20px auto"; // Center the button
        playButton.style.display = "block"; // Ensure it's centered in the feedbackDiv

        // Track button clicks and handle logic for showing the keyword
        playButton.addEventListener("click", () => {
            playCount++;
            playSound(keyword);

            // On the third click, display the sentence above the iframe
            if (playCount === 3) {
                const sentence = document.createElement("p");
                sentence.textContent = `Elli hat ${keyword} gesagt.`;
                sentence.style.textAlign = "center"; // Center the text
                sentence.style.color = "red"; // Optional: make it visually distinctive
                feedbackDiv.insertBefore(sentence, iframe); // Insert the sentence above the iframe
            }
        });

        return playButton;
    }

    // Function to display trivia and link
    function showContent(keyword, link) {
        // Reset play count for this keyword
        playCount = 0;

        // Hide the calendar and overlays
        adventCal.style.display = "none"; // Hide the calendar image
        calendar.style.display = "none"; // Hide the entire calendar container

        // Clear the feedback div
        feedbackDiv.innerHTML = "";

        // Add the embedded link
        const iframe = document.createElement("iframe");
        iframe.src = link;
        iframe.style.width = "80%";
        iframe.style.height = "70vh"; // Make the iframe larger and place it lower
        iframe.style.border = "none";
        iframe.style.marginTop = "50px"; // Push the iframe lower on the page
        iframe.style.display = "block"; // Center horizontally
        iframe.style.marginLeft = "auto";
        iframe.style.marginRight = "auto";

        // Add the "Play" button
        const playButton = createPlayButton(keyword, iframe, link);

        // Add the hyperlink below the iframe
        const linkElement = document.createElement("a");
        linkElement.textContent = "Rätsel in eigenem Tab öffnen";
        linkElement.href = link;
        linkElement.target = "_blank"; // Open in a new tab
        linkElement.style.display = "block";
        linkElement.style.textAlign = "center";
        linkElement.style.marginTop = "20px";
        linkElement.style.fontSize = "16px";
        linkElement.style.color = "#007BFF"; // Optional: make the link visually distinct
        linkElement.style.textDecoration = "underline";

        // Append elements to the feedback div
        feedbackDiv.appendChild(playButton);
        feedbackDiv.appendChild(iframe);
        feedbackDiv.appendChild(linkElement);
    }

    // Function to handle number overlay click
    function handleOverlayClick(clickedNumber) {
        // Find the corresponding row in the CSV
        const row = rows.find(([number]) => parseInt(number, 10) === clickedNumber);
        if (row) {
            const [, keyword, , link] = row; // Extract keyword (2nd column) and link (4th column)
            showContent(keyword, link);
        } else {
            console.error(`No matching row found for number ${clickedNumber}`);
        }
    }

    // Attach click event listener to each number overlay
    const numberOverlays = document.querySelectorAll(".number-overlay");
    numberOverlays.forEach((overlay) => {
        overlay.addEventListener("click", function () {
            const clickedNumber = parseInt(this.dataset.number, 10);

            // Check if the clicked number is valid for the current day
            if (clickedNumber <= dayOfMonth) {
                handleOverlayClick(clickedNumber);
            } else {
                alert("You can't open this door yet!");
            }
        });
    });
});

