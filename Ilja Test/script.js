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

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 52.5200, lng: 13.4050 }, // Beispielkoordinaten (Berlin)
      zoom: 12,
    });
  
    const markers = [
      {
        position: { lat: 52.5200, lng: 13.4050 },
        title: "Delmenhorst",
        imageUrl: "beach-landscape.jpg", // Bild des Ortes
        description: "Ein cooler, versteckter Ort in der Stadt, ideal für entspannte Stunden oder ein gemütliches Picknick.",
        googleMapsLink: "https://www.google.com/maps?q=52.5200,13.4050"
      },
      {
        position: { lat: 52.5300, lng: 13.3750 },
        title: "Geheimer Ort 2",
        imageUrl: "geheimer-ort-2.jpg", // Bild des Ortes
        description: "Ein ruhiger Ort, perfekt zum Entspannen und die Aussicht zu genießen.",
        googleMapsLink: "https://www.google.com/maps?q=52.5300,13.3750"
      }
      // Weitere Marker...
    ];
  
    markers.forEach(markerData => {
      const marker = new google.maps.Marker({
        position: markerData.position,
        map: map,
        title: markerData.title,
      });
  
      const infoWindowContent = `
        <div class="info-window-content">
          <img src="${markerData.imageUrl}" alt="Bild des Ortes">
          <div class="place-name">${markerData.title}</div>
          <p>${markerData.description}</p>
          <button onclick="window.open('${markerData.googleMapsLink}', '_blank')">In Google Maps ansehen</button>
        </div>
      `;
  
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });
  
      // Marker-Hover-Effekt
      marker.addListener('mouseover', function() {
        infoWindow.open(map, marker); // InfoWindow wird beim Hovern geöffnet
      });
  
      // InfoWindow bleibt sichtbar, auch wenn der Benutzer die Markierung verlässt
      marker.addListener('mouseout', function() {
        // Die InfoBox bleibt sichtbar, bis der Benutzer den Marker komplett verlässt
      });
    });
  }
  