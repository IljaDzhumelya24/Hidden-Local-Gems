document.addEventListener("DOMContentLoaded", function() {
    const words = ["Stockholm ?", "Amsterdam ?", "Berlin ?", "Paris ?", "London ?", "Prag ?"];
    let currentWordIndex = 0;
    const span = document.querySelector('.typing-animation');
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 150; // Geschwindigkeit in Millisekunden
  
    function type() {
      const currentWord = words[currentWordIndex];
  
      if (!isDeleting) {
        span.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
          setTimeout(() => { 
            isDeleting = true;
            type();
          }, 1500); // Pause am Ende des Wortes
          return;
        }
      } else {
        span.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          currentWordIndex = (currentWordIndex + 1) % words.length;
        }
      }
      setTimeout(type, typingSpeed);
    }
    type();
  });
  
  

let activeInfoWindow = null;

function createMarker(position, title, imageUrl, description, mapsUrl, map) {
    // Benutzerdefiniertes Marker-Icon mit eigenem Bild
    const markerIcon = {
        url: "Bilder Home/ort.png", // Dein eigenes Bild hier
        scaledSize: new google.maps.Size(40, 40), // Skaliert das Bild auf die gewünschte Größe
        origin: new google.maps.Point(0, 0), // Ursprungsposition des Icons
        anchor: new google.maps.Point(20, 20) // Position des Markers im Bild (hier im Zentrum)
    };

    const marker = new google.maps.Marker({
        position,
        map,
        title,
        icon: markerIcon, // Das benutzerdefinierte Symbol
    });

    const infoWindowContent = document.createElement("div");
    infoWindowContent.innerHTML = `
        <div id="info-${title.replace(/\s/g, '')}" style="
            max-width: 350px; 
            text-align: center; 
            padding: 12px; 
            border-radius: 10px; 
            background: white; 
            box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
            font-family: Arial, sans-serif;
            word-wrap: break-word;
            overflow: visible;
            white-space: normal;
        ">
            <h3 style="margin: 5px 0; font-size: 18px; color: #333; font-weight: bold;">${title}</h3>
            <img src="${imageUrl}" alt="${title}" style="width: 100%; border-radius: 8px; margin-top: 5px;">
            <p style="font-size: 14px; color: #555; margin: 8px 0; line-height: 1.6; max-height: none;">${description}</p>
            <a href="${mapsUrl}" target="_blank" style="display: inline-block; margin-top: 6px; padding: 10px 16px; background: linear-gradient(135deg, #007BFF, #0056b3); color: white; text-decoration: none; border-radius: 6px; font-size: 14px; transition: background 0.3s, transform 0.2s;">📍 Auf Google Maps</a>
        </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent,
        maxWidth: 350, // Maximalbreite für das InfoWindow
    });

    let timeout;

    // Funktion zum Schließen des InfoWindows mit Delay
    function closeInfoWindow() {
        timeout = setTimeout(() => {
            if (activeInfoWindow === infoWindow) {
                infoWindow.close();
                activeInfoWindow = null;
            }
        }, 700); // Verzögerung für sanftes Schließen (0.7 Sek.)
    }

    // Mouseover auf Marker: InfoWindow öffnen
    marker.addListener("mouseover", () => {
        if (activeInfoWindow) {
            activeInfoWindow.close();
        }
        infoWindow.open(map, marker);
        activeInfoWindow = infoWindow;

        if (timeout) clearTimeout(timeout); // Falls Timeout läuft, abbrechen
    });

    // Maus verlässt Marker → InfoWindow mit Delay schließen
    marker.addListener("mouseout", closeInfoWindow);

    // Sicherstellen, dass die InfoBox nicht zu früh schließt
    google.maps.event.addListener(infoWindow, "domready", () => {
        const infoDiv = document.getElementById(`info-${title.replace(/\s/g, '')}`);

        infoDiv.addEventListener("mouseenter", () => {
            if (timeout) clearTimeout(timeout); // Timeout abbrechen, wenn Maus drüber ist
        });

        infoDiv.addEventListener("mouseleave", closeInfoWindow);
    });
}

// Initiiert die Karte mit Markierungen
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 52.5200, lng: 13.4050 }, // Berlin
        zoom: 12,
        gestureHandling: "greedy", // Ermöglicht Scroll-Zoom
        zoomControl: true, // Zeigt die Zoom-Steuerung in der Ecke
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f1f1f1" // Heller Hintergrund für die Karte
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off" // Entfernt die POI-Icons (z.B. Restaurants, Cafés)
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#2e2e2e" // Dunkler Text für Straßennamen
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff" // Weißer Hintergrund für bessere Lesbarkeit der Straßennamen
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#A5D6A7" // Helle grüne Straßen (sanftes Grün)
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#81C784" // Arterielle Straßen in einem stärkeren Grünton
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#66BB6A" // Lokale Straßen in einem lebendigen, aber beruhigenden Grün
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#A5D6A7" // ÖPNV-Strecken in einem sanften Grünton
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#81C784" // Wasserflächen in einem frischen Grün
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#C8E6C9" // Landschaften in einem sehr hellen Grün für einen natürlichen Look
                    }
                ]
            }
        ]
    });

    createMarker(
        { lat: 52.5163, lng: 13.3777 },
        "Brandenburger Tor",
        "Bilder Home/Brandenburger Tor mehr Himmel.jpg",
        "Eines der bekanntesten Wahrzeichen Berlins.",
        "https://www.google.com/maps?q=Brandenburger+Tor",
        map
    );

    createMarker(
        { lat: 52.5076, lng: 13.3904 },
        "Nikolaiviertel",
        "Bilder Home/View_Berlin_TV_Tower_Jan2015_img4.jpg",
        "Ein historisches Viertel mit vielen gemütlichen Cafés und Shops.",
        "https://www.google.com/maps?q=Nikolaiviertel",
        map
    );

    createMarker(
        { lat: 52.4994, lng: 13.4034 },
        "Bergmannkiez",
        "Bilder Home/Berlin_-_Balkone_im_Bergmannkiez_(2014).jpg",
        "Ein angesagtes Viertel mit tollen Restaurants und Bars.",
        "https://www.google.com/maps?q=Bergmannkiez",
        map
    );
}

