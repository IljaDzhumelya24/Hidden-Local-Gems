function initMap() {
    const berlin = { lat: 52.5200, lng: 13.4050 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: berlin,
    });

    // Orte auf der Route
    const locations = [
        { position: { lat: 52.5163, lng: 13.3777 }, title: "Brandenburger Tor", description: "Ein berühmtes Wahrzeichen in Berlin." },
        { position: { lat: 52.5006, lng: 13.4366 }, title: "Kreuzberg", description: "Ein Viertel mit alternativer Kultur und tollen Restaurants." },
        { position: { lat: 52.5250, lng: 13.3694 }, title: "Reichstagsgebäude", description: "Deutscher Bundestag mit beeindruckender Glaskuppel." }
    ];

    // Marker & Info-Fenster
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
