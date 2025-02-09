document.addEventListener("DOMContentLoaded", function() {
    const words = ["Stockholm", "Amsterdam", "Berlin", "Paris", "London"];
    let currentWordIndex = 0;
    const span = document.querySelector('.typing-animation');

    function changeWord() {
        span.style.width = '0';  // Anfang des Wortes auf 0 setzen

        setTimeout(() => {
            span.textContent = words[currentWordIndex];  // Wort ändern
            span.style.width = `${span.scrollWidth}px`;  // Setze die Breite auf die Breite des Textes
        }, 500);  // Verzögerung, damit der alte Text verschwinden kann

        currentWordIndex = (currentWordIndex + 1) % words.length; // Nächsten Index
    }

    setInterval(changeWord, 5000); // Alle 5 Sekunden
    changeWord(); // Initialer Wortwechsel
});
