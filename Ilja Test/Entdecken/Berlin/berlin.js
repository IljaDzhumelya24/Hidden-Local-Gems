// Globale Callback-Funktion für Google Maps
window.initMap = function() {
  // Karte initialisieren
  const berlinCoords = { lat: 52.5200, lng: 13.4050 };
  const map = new google.maps.Map(document.getElementById("berlin-map"), {
    center: berlinCoords,
    zoom: 12,
    gestureHandling: "greedy",
    zoomControl: true,
    styles: [
      { "elementType": "geometry", "stylers": [{ "color": "#f1f1f1" }] },
      { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
      { "elementType": "labels.text.fill", "stylers": [{ "color": "#2e2e2e" }] },
      { "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] },
      { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#A5D6A7" }] },
      { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#81C784" }] },
      { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#66BB6A" }] },
      { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#A5D6A7" }] },
      { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#81C784" }] },
      { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#C8E6C9" }] }
    ]
  });

  // Marker-Daten inklusive Detailinformationen
  const markerData = [
    {
      position: { lat: 52.5080, lng: 13.4980 },
      title: "Parkplatz an der Messe Berlin",
      category: "Parken",
      imageUrl: "Bilder Berlin/1.jpg",
      description: "Ein geräumiger Parkplatz an der Messe Berlin, ideal für Messebesucher.",
      mapsUrl: "https://www.google.com/maps?q=Parkplatz+Messe+Berlin",
      detail: {
        info: `
          <p><strong>Beschreibung:</strong> Ein geräumiger Parkplatz in unmittelbarer Nähe der Messe Berlin.</p>
          <p><strong>Öffnungszeiten:</strong> Mo-Fr 07:00 - 22:00 Uhr</p>
          <p><strong>Preis:</strong> 3€ pro Stunde</p>
        `,
        reviews: `
          <div class="detail-reviews">
  <h3>Bewertungen</h3>
  <div class="review">
    <div class="review-header">
      <span class="reviewer-name">Max</span>
      <span class="review-rating">★★★★★</span>
    </div>
    <p>"Sehr praktisch, wenn man zur Messe fährt. Der Parkplatz war sauber und sicher."</p>
  </div>
  <div class="review">
    <div class="review-header">
      <span class="reviewer-name">Anna</span>
      <span class="review-rating">★★★★☆</span>
    </div>
    <p>"Gute Lage und günstige Preise. Empfehlenswert für Messebesucher."</p>
  </div>
  <div class="review">
    <div class="review-header">
      <span class="reviewer-name">Peter</span>
      <span class="review-rating">★★★☆☆</span>
    </div>
    <p>"Nicht ideal, wenn man längere Wartezeiten in Kauf nehmen muss, aber insgesamt okay."</p>
  </div>
  <!-- Weitere Bewertungskarten -->
  <button class="review-btn" onclick="showAllReviews()">Alle Bewertungen anzeigen</button>
</div>
        `,
        gallery: [
          "Bilder Berlin/1.jpg",
          "Bilder Berlin/2.jpg",
          "Bilder Berlin/3.jpg",
          "Bilder Berlin/4.jpg",
          "Bilder Berlin/5.jpg",
          "Bilder Berlin/6.jpg",
          "Bilder Berlin/7.jpg"
        ]
      }
    },
    // Weitere Marker-Daten ...
  ];
  
  let markers = [];
  let activeInfoWindow = null;

  // Objekt für aktiven Status der Kategorien (optional, falls du Kategorien filtern möchtest)
  const activeCategories = {
    "Essen": true,
    "Shoppen": true,
    "Parken": true,
    "Natur": true,
    "Sehenswürdigkeiten": true
  };

  // Funktion zur Erstellung eines Markers inkl. Infofenster
  function createMarker(data) {
    // Icon-Zuordnung für Kategorien
    const iconMapping = {
      "Essen": "Bilder Berlin/essen.svg",
      "Shoppen": "Bilder Berlin/shoppen.svg",
      "Natur": "Bilder Berlin/natur.svg",
      "Parken": "Bilder Berlin/parken.svg",
      "Sehenswürdigkeiten": "Bilder Berlin/sehenswürdigkeiten.svg"
    };
    const iconUrl = iconMapping[data.category] || "Bilder Home/ort.png";
    const markerIcon = {
      url: iconUrl,
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(20, 20)
    };

    const marker = new google.maps.Marker({
      position: data.position,
      map: map,
      title: data.title,
      icon: markerIcon
    });

    // Speichere die Kategorie direkt im Marker
    marker.category = data.category;

    // Infofenster erstellen
    const infoWindowContent = document.createElement("div");
    infoWindowContent.classList.add("info-window-content");
    infoWindowContent.innerHTML = `
      <div class="info-window-header">
        <span class="place-name">${data.title}</span>
      </div>
      <div class="info-window-body">
        <img src="${data.imageUrl}" alt="${data.title}">
        <p>${data.description}</p>
        <div class="info-window-buttons">
          <a href="${data.mapsUrl}" target="_blank" class="map-link">📍 Auf Google Maps</a>
          <a href="#detail-section" onclick="return showDetailSection('${
            encodeURIComponent(JSON.stringify({
              title: data.title,
              info: data.detail.info,
              reviews: data.detail.reviews,
              gallery: data.detail.gallery
            }))
          }')" class="more-info-link">Mehr erfahren</a>
        </div>
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
      maxWidth: 350
    });

    // Beim Klick auf den Marker Infofenster öffnen
    marker.addListener("click", () => {
      if (activeInfoWindow) {
        activeInfoWindow.close();
      }
      infoWindow.open(map, marker);
      activeInfoWindow = infoWindow;
    });

    return marker;
  }

  // Marker erstellen
  markerData.forEach(data => {
    const marker = createMarker(data);
    markers.push(marker);
  });

  // Optional: Legenden-Items für Filter (falls vorhanden)
  const legendItems = document.querySelectorAll('.legend-list li');
  legendItems.forEach(item => {
    item.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      activeCategories[category] = !activeCategories[category];
      this.classList.toggle('inactive');
      markers.forEach(marker => {
        if (activeCategories[marker.category]) {
          marker.setMap(map);
        } else {
          marker.setMap(null);
        }
      });
    });
  });
}; // Ende initMap

// Funktion zum Öffnen und dynamischen Befüllen der Detail-Sektion
function showDetailSection(encodedDetailContent) {
  // Detail-Daten aus dem JSON-String lesen
  const detailData = JSON.parse(decodeURIComponent(encodedDetailContent));
  const detailSection = document.getElementById("detail-section");
  detailSection.classList.remove("hidden");

  // Detail-Sektion mit modernem, strukturiertem Inhalt füllen
  detailSection.innerHTML = `
    <div class="detail-content">
      <span class="close-btn" onclick="closeDetailSection()">&times;</span>
      <h2 class="detail-title">${detailData.title}</h2>
      <div class="detail-body">
        <div class="detail-info">
          <h3>Informationen</h3>
          ${detailData.info}
        </div>
        <div class="detail-reviews">
          <h3>Bewertungen</h3>
          ${detailData.reviews}
        </div>
      </div>
      <div class="detail-gallery">
        ${buildGallery(detailData.gallery)}
      </div>
    </div>
  `;

  // Sanftes Scrollen zur Detail-Sektion
  detailSection.scrollIntoView({ behavior: "smooth" });
  return false;
}


function buildGallery(galleryArray) {
  let galleryHTML = '';
  const maxImages = 5;
  const total = galleryArray.length;
  const showCount = Math.min(total, maxImages);
  for (let i = 0; i < showCount; i++) {
    if (i === maxImages - 1 && total > maxImages) {
      galleryHTML += `
        <div class="gallery-item gallery-item-more">
          <img src="${galleryArray[i]}" alt="Gallery Image ${i + 1}">
          <div class="more-overlay">+${total - maxImages + 1}</div>
        </div>
      `;
    } else {
      galleryHTML += `
        <div class="gallery-item">
          <img src="${galleryArray[i]}" alt="Gallery Image ${i + 1}">
        </div>
      `;
    }
  }
  return galleryHTML;
}

function closeDetailSection() {
  document.getElementById("detail-section").classList.add("hidden");
}
