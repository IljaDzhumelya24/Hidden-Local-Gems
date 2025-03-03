// Globales Objekt, um immer nur ein Infofenster gleichzeitig anzuzeigen
let activeInfoWindow = null;

function createMarker(position, title, imageUrl, description, mapsUrl, map) {
  const markerIcon = {
    url: "Bilder Berlin/ort.png", 
    scaledSize: new google.maps.Size(40, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(20, 20)
  };

  const marker = new google.maps.Marker({
    position,
    map,
    title,
    icon: markerIcon
  });

  // Erstelle das Infofenster-Element mit all deinen Infos
  const infoWindowContent = document.createElement("div");
  infoWindowContent.classList.add("info-window-content");
  infoWindowContent.innerHTML = `
    <h3 class="place-name">${title}</h3>
    <img src="${imageUrl}" alt="${title}">
    <p>${description}</p>
    <a href="${mapsUrl}" target="_blank" class="map-link">📍 Auf Google Maps</a>
  `;

  const infoWindow = new google.maps.InfoWindow({
    content: infoWindowContent,
    maxWidth: 350
  });

  let timeout;
  function closeInfoWindow() {
    timeout = setTimeout(() => {
      if (activeInfoWindow === infoWindow) {
        infoWindow.close();
        activeInfoWindow = null;
      }
    }, 700);
  }

  marker.addListener("mouseover", () => {
    if (activeInfoWindow) {
      activeInfoWindow.close();
    }
    infoWindow.open(map, marker);
    activeInfoWindow = infoWindow;
    if (timeout) clearTimeout(timeout);
  });

  marker.addListener("mouseout", closeInfoWindow);

  google.maps.event.addListener(infoWindow, "domready", () => {
    infoWindowContent.addEventListener("mouseenter", () => {
      if (timeout) clearTimeout(timeout);
    });
    infoWindowContent.addEventListener("mouseleave", closeInfoWindow);
  });
}

window.initMap = function() {
  const berlinCoords = { lat: 52.5200, lng: 13.4050 };

  const map = new google.maps.Map(document.getElementById("berlin-map"), {
    center: berlinCoords,
    zoom: 12,
    gestureHandling: "greedy",
    zoomControl: true,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [{ "color": "#f1f1f1" }]
      },
      {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#2e2e2e" }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#ffffff" }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#A5D6A7" }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{ "color": "#81C784" }]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{ "color": "#66BB6A" }]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{ "color": "#A5D6A7" }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#81C784" }]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{ "color": "#C8E6C9" }]
      }
    ]
  });

  // Marker mit ausführlichen Infos hinzufügen
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
};

  