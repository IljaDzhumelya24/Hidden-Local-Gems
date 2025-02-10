document.addEventListener("DOMContentLoaded", function() {
    const words = ["Stockholm", "Amsterdam", "Berlin", "Paris", "London", "Prag"];
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

    setInterval(changeWord, 3000); // Alle 5 Sekunden
    changeWord(); // Initialer Wortwechsel
});

let activeInfoWindow = null;

function createMarker(position, title, imageUrl, description, mapsUrl, map) {
    const marker = new google.maps.Marker({
        position,
        map,
        title,
    });

    const infoWindowContent = document.createElement("div");
    infoWindowContent.innerHTML = `
        <div id="info-${title.replace(/\s/g, '')}" style="
            max-width: 250px; 
            text-align: center; 
            padding: 10px; 
            border-radius: 8px; 
            background: white; 
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        ">
            <h3 style="margin: 5px 0;">${title}</h3>
            <img src="${imageUrl}" alt="${title}" style="width: 100%; border-radius: 8px;">
            <p style="font-size: 14px; color: #333;">${description}</p>
            <a href="${mapsUrl}" target="_blank" style="
                display: inline-block; 
                margin-top: 5px; 
                padding: 6px 12px; 
                background-color: #007BFF; 
                color: white; 
                text-decoration: none; 
                border-radius: 5px;
                font-size: 14px;
            ">📍 Auf Google Maps</a>
        </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
    });

    let timeout;

    // Funktion zum Schließen der InfoBox, wenn Maus weg ist
    function closeInfoWindow() {
        timeout = setTimeout(() => {
            if (activeInfoWindow === infoWindow) {
                infoWindow.close();
                activeInfoWindow = null;
            }
        }, 500); // Verzögerung für sanftes Verschwinden
    }

    // Mouseover auf Marker: Zeigt InfoWindow
    marker.addListener("mouseover", () => {
        if (activeInfoWindow) {
            activeInfoWindow.close();
        }
        infoWindow.open(map, marker);
        activeInfoWindow = infoWindow;

        // Falls Timeout läuft, abbrechen
        if (timeout) clearTimeout(timeout);
    });

    // Wenn Maus das InfoWindow verlässt → Timeout setzen
    google.maps.event.addListener(infoWindow, "domready", () => {
        const infoDiv = document.getElementById(`info-${title.replace(/\s/g, '')}`);

        infoDiv.addEventListener("mouseenter", () => {
            if (timeout) clearTimeout(timeout); // Timeout abbrechen, wenn Maus drüber ist
        });

        infoDiv.addEventListener("mouseleave", closeInfoWindow);
    });

    // Maus verlässt den Marker → InfoWindow wird erst später geschlossen
    marker.addListener("mouseout", closeInfoWindow);
}

// Initiiert die Karte mit Markern
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 52.5200, lng: 13.4050 }, // Berlin
        zoom: 12,
    });

    createMarker(
        { lat: 52.5163, lng: 13.3777 },
        "Brandenburger Tor",
        "Brandenburger Tor mehr Himmel.jpg",
        "Eines der bekanntesten Wahrzeichen Berlins.",
        "https://www.google.com/maps?q=Brandenburger+Tor",
        map
    );

    createMarker(
        { lat: 52.5076, lng: 13.3904 },
        "Nikolaiviertel",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Nikolaiviertel_Berlin.jpg/800px-Nikolaiviertel_Berlin.jpg",
        "Ein historisches Viertel mit vielen gemütlichen Cafés und Shops.",
        "https://www.google.com/maps?q=Nikolaiviertel",
        map
    );

    createMarker(
        { lat: 52.4994, lng: 13.4034 },
        "Bergmannkiez",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Bergmannstr._Berlin.jpg/800px-Bergmannstr._Berlin.jpg",
        "Ein angesagtes Viertel mit tollen Restaurants und Bars.",
        "https://www.google.com/maps?q=Bergmannkiez",
        map
    );
}
