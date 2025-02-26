// Definiere die Callback-Funktion global
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
          "stylers": [
            { "color": "#f1f1f1" }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            { "visibility": "off" }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            { "color": "#2e2e2e" }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            { "color": "#ffffff" }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            { "color": "#A5D6A7" }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            { "color": "#81C784" }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
            { "color": "#66BB6A" }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            { "color": "#A5D6A7" }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            { "color": "#81C784" }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
            { "color": "#C8E6C9" }
          ]
        }
      ]
    });
  
    // Marker im Zentrum von Berlin hinzufügen
    new google.maps.Marker({
      position: berlinCoords,
      map: map,
      title: "Berlin Zentrum"
    });
  };
  