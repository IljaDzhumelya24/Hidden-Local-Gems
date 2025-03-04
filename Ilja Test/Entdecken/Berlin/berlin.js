// Globale Callback-Funktion für Google Maps
window.initMap = function() {
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

  // Umfangreiche Marker-Daten – achte darauf, dass auch Marker der Kategorie "Natur" enthalten sind
  const markerData = [
    {
      position: { lat: 52.5163, lng: 13.3777 },
      title: "Brandenburger Tor",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Brandenburger_Tor.jpg",
      description: "Eines der bekanntesten Wahrzeichen Berlins, Symbol der Wiedervereinigung.",
      mapsUrl: "https://www.google.com/maps?q=Brandenburger+Tor"
    },
    {
      position: { lat: 52.5076, lng: 13.3904 },
      title: "Nikolaiviertel",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Nikolaiviertel.jpg",
      description: "Ein historisches Viertel mit engen Gassen, gemütlichen Cafés und kleinen Läden.",
      mapsUrl: "https://www.google.com/maps?q=Nikolaiviertel"
    },
    {
      position: { lat: 52.5230, lng: 13.4120 },
      title: "Restaurant Zum Goldenen Stern",
      category: "Essen",
      imageUrl: "Bilder Home/Restaurant_Goldener_Stern.jpg",
      description: "Ein beliebtes Restaurant mit regionalen Spezialitäten und traditioneller Atmosphäre.",
      mapsUrl: "https://www.google.com/maps?q=Restaurant+Zum+Goldenen+Stern"
    },
    {
      position: { lat: 52.5208, lng: 13.4094 },
      title: "Currywurst am Checkpoint Charlie",
      category: "Essen",
      imageUrl: "Bilder Home/Currywurst_Checkpoint.jpg",
      description: "Ein klassischer Currywurst-Stand in unmittelbarer Nähe des Checkpoint Charlie.",
      mapsUrl: "https://www.google.com/maps?q=Currywurst+Checkpoint+Charlie"
    },
    {
      position: { lat: 52.5186, lng: 13.4081 },
      title: "Shopping Center Berlin",
      category: "Shoppen",
      imageUrl: "Bilder Home/Shopping_Center_Berlin.jpg",
      description: "Ein modernes Einkaufszentrum mit zahlreichen Geschäften und Boutiquen.",
      mapsUrl: "https://www.google.com/maps?q=Shopping+Center+Berlin"
    },
    {
      position: { lat: 52.5051, lng: 13.3331 },
      title: "KaDeWe",
      category: "Shoppen",
      imageUrl: "Bilder Home/KaDeWe.jpg",
      description: "Das Kaufhaus des Westens – ein Muss für Shoppingliebhaber.",
      mapsUrl: "https://www.google.com/maps?q=KaDeWe"
    },
    {
      position: { lat: 52.5205, lng: 13.4300 },
      title: "Tiergarten",
      category: "Natur",
      imageUrl: "Bilder Home/Tiergarten.jpg",
      description: "Ein weitläufiger Park im Herzen Berlins, ideal zum Entspannen und Spazierengehen.",
      mapsUrl: "https://www.google.com/maps?q=Tiergarten"
    },
    {
      position: { lat: 52.5096, lng: 13.4291 },
      title: "Volkspark Friedrichshain",
      category: "Natur",
      imageUrl: "Bilder Home/Volkspark_Friedrichshain.jpg",
      description: "Ein beliebter Park im Stadtteil Friedrichshain, ideal für Freizeitaktivitäten.",
      mapsUrl: "https://www.google.com/maps?q=Volkspark+Friedrichshain"
    },
    {
      position: { lat: 52.5210, lng: 13.4100 },
      title: "Parkplatz Alexanderplatz",
      category: "Parken",
      imageUrl: "Bilder Home/Parkplatz_Alexanderplatz.jpg",
      description: "Ein gut erreichbarer Parkplatz in der Nähe des Alexanderplatzes.",
      mapsUrl: "https://www.google.com/maps?q=Parkplatz+Alexanderplatz"
    },
    {
      position: { lat: 52.5150, lng: 13.3770 },
      title: "Parkplatz am Potsdamer Platz",
      category: "Parken",
      imageUrl: "Bilder Home/Parkplatz_Potsdamer.jpg",
      description: "Ein zentral gelegener Parkplatz in der Nähe des Potsdamer Platzes.",
      mapsUrl: "https://www.google.com/maps?q=Parkplatz+Potsdamer+Platz"
    },
    {
      position: { lat: 52.5169, lng: 13.4010 },
      title: "Museumsinsel",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Museumsinsel.jpg",
      description: "Ein Komplex aus fünf Museen, der zu den kulturellen Highlights Berlins zählt.",
      mapsUrl: "https://www.google.com/maps?q=Museumsinsel"
    },
    {
      position: { lat: 52.5351, lng: 13.3903 },
      title: "Berliner Mauer Gedenkstätte",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Berliner_Mauer.jpg",
      description: "Eine Gedenkstätte, die an die Teilung Berlins erinnert.",
      mapsUrl: "https://www.google.com/maps?q=Berliner+Mauer+Gedenkst%C3%A4tte"
    },
    {
      position: { lat: 52.5176, lng: 13.3980 },
      title: "Coffee Shop Berlin",
      category: "Essen",
      imageUrl: "Bilder Home/Coffee_Shop_Berlin.jpg",
      description: "Ein trendiger Coffee Shop mit exzellentem Kaffee und entspannter Atmosphäre.",
      mapsUrl: "https://www.google.com/maps?q=Coffee+Shop+Berlin"
    },
    {
      position: { lat: 52.5194, lng: 13.4020 },
      title: "Hackescher Markt",
      category: "Shoppen",
      imageUrl: "Bilder Home/Hackescher_Markt.jpg",
      description: "Ein belebter Bereich mit vielen Geschäften, Boutiquen und Restaurants.",
      mapsUrl: "https://www.google.com/maps?q=Hackescher+Markt"
    },
    {
      position: { lat: 52.4730, lng: 13.4030 },
      title: "Tempelhofer Feld",
      category: "Natur",
      imageUrl: "Bilder Home/Tempelhofer_Feld.jpg",
      description: "Ein riesiges, stillgelegtes Flughafengelände, das heute als Freizeitpark genutzt wird.",
      mapsUrl: "https://www.google.com/maps?q=Tempelhofer+Feld"
    },
    {
      position: { lat: 52.5220, lng: 13.3750 },
      title: "Gendarmenmarkt",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Gendarmenmarkt.jpg",
      description: "Ein eleganter Platz in Berlin mit historischer Architektur.",
      mapsUrl: "https://www.google.com/maps?q=Gendarmenmarkt"
    },
    {
      position: { lat: 52.5190, lng: 13.3500 },
      title: "East Side Gallery",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/East_Side_Gallery.jpg",
      description: "Eine Open-Air-Galerie an der Berliner Mauer.",
      mapsUrl: "https://www.google.com/maps?q=East+Side+Gallery"
    },
    {
      position: { lat: 52.5145, lng: 13.3755 },
      title: "Hackescher Höfe",
      category: "Shoppen",
      imageUrl: "Bilder Home/Hackescher_Hoefe.jpg",
      description: "Ein Komplex von Innenhöfen mit Boutiquen und Cafés.",
      mapsUrl: "https://www.google.com/maps?q=Hackescher+Höfe"
    },
    {
      position: { lat: 52.5170, lng: 13.3800 },
      title: "Checkpoint Charlie",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Checkpoint_Charlie.jpg",
      description: "Ein historischer Ort, der an die Zeiten der Berliner Mauer erinnert.",
      mapsUrl: "https://www.google.com/maps?q=Checkpoint+Charlie"
    },
    {
      position: { lat: 52.5202, lng: 13.3902 },
      title: "Berlin Hauptbahnhof",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Berlin_Hauptbahnhof.jpg",
      description: "Einer der größten Bahnhöfe Europas mit moderner Architektur.",
      mapsUrl: "https://www.google.com/maps?q=Berlin+Hauptbahnhof"
    },
    {
      position: { lat: 52.5025, lng: 13.3317 },
      title: "Parkhaus am Kurfürstendamm",
      category: "Parken",
      imageUrl: "Bilder Home/Parkhaus_Kurfurstendamm.jpg",
      description: "Ein modernes Parkhaus in der Nähe des berühmten Kurfürstendamms.",
      mapsUrl: "https://www.google.com/maps?q=Parkhaus+Kurfurstendamm"
    },
    {
      position: { lat: 52.5070, lng: 13.3370 },
      title: "Parkhaus am Zoologischen Garten",
      category: "Parken",
      imageUrl: "Bilder Home/Parkhaus_Zoologischer_Garten.jpg",
      description: "Ein zentral gelegenes Parkhaus in der Nähe des Berliner Zoos.",
      mapsUrl: "https://www.google.com/maps?q=Parkhaus+Zoologischer+Garten"
    },
    {
      position: { lat: 52.5080, lng: 13.4980 },
      title: "Parkplatz an der Messe Berlin",
      category: "Parken",
      imageUrl: "Bilder Home/Parkplatz_Messe_Berlin.jpg",
      description: "Ein geräumiger Parkplatz an der Messe Berlin, ideal für Messebesucher.",
      mapsUrl: "https://www.google.com/maps?q=Parkplatz+Messe+Berlin"
    },
    {
      position: { lat: 52.5240, lng: 13.4100 },
      title: "Café am Gendarmenmarkt",
      category: "Essen",
      imageUrl: "Bilder Home/Cafe_Gendarmenmarkt.jpg",
      description: "Ein gemütliches Café direkt am Gendarmenmarkt, ideal für eine entspannte Kaffeepause.",
      mapsUrl: "https://www.google.com/maps?q=Cafe+am+Gendarmenmarkt"
    },
    {
      position: { lat: 52.5185, lng: 13.4025 },
      title: "Bäckerei Müller",
      category: "Essen",
      imageUrl: "Bilder Home/Baeckerei_Mueller.jpg",
      description: "Frisch gebackene Brote, Croissants und süße Teilchen – hier beginnt dein Tag lecker.",
      mapsUrl: "https://www.google.com/maps?q=Baeckerei+Mueller+Berlin"
    },
    {
      position: { lat: 52.5172, lng: 13.3950 },
      title: "Sushi Bar Berlin",
      category: "Essen",
      imageUrl: "Bilder Home/Sushi_Bar_Berlin.jpg",
      description: "Eine angesagte Sushi-Bar mit einer großen Auswahl an frischen Sushis und japanischen Spezialitäten.",
      mapsUrl: "https://www.google.com/maps?q=Sushi+Bar+Berlin"
    },
    {
      position: { lat: 52.5200, lng: 13.3800 },
      title: "Pizza Express",
      category: "Essen",
      imageUrl: "Bilder Home/Pizza_Express.jpg",
      description: "Leckere Pizza und Pasta in einem modernen Ambiente – perfekt für einen schnellen Genuss.",
      mapsUrl: "https://www.google.com/maps?q=Pizza+Express+Berlin"
    },
    {
      position: { lat: 52.5225, lng: 13.4150 },
      title: "Burger House Berlin",
      category: "Essen",
      imageUrl: "Bilder Home/Burger_House_Berlin.jpg",
      description: "Saftige Burger und kreative Beilagen – ideal, um den schnellen Hunger zu stillen.",
      mapsUrl: "https://www.google.com/maps?q=Burger+House+Berlin"
    },
    {
      position: { lat: 52.501, lng: 13.448 },
      title: "Mall of Berlin",
      category: "Shoppen",
      imageUrl: "Bilder Home/Mall_of_Berlin.jpg",
      description: "Eine der größten Shopping-Malls in Berlin mit zahlreichen internationalen Marken.",
      mapsUrl: "https://www.google.com/maps?q=Mall+of+Berlin"
    },
    {
      position: { lat: 52.512, lng: 13.447 },
      title: "Alexa Berlin",
      category: "Shoppen",
      imageUrl: "Bilder Home/Alexa_Berlin.jpg",
      description: "Ein modernes Einkaufszentrum mit vielen Shops und Freizeitmöglichkeiten.",
      mapsUrl: "https://www.google.com/maps?q=Alexa+Berlin"
    },
    {
      position: { lat: 52.523, lng: 13.405 },
      title: "Bikini Berlin",
      category: "Shoppen",
      imageUrl: "Bilder Home/Bikini_Berlin.jpg",
      description: "Ein innovatives Concept Store und Shopping-Erlebnis mit Blick auf den Berliner Zoo.",
      mapsUrl: "https://www.google.com/maps?q=Bikini+Berlin"
    },
    {
      position: { lat: 52.531, lng: 13.230 },
      title: "Grunewald",
      category: "Natur",
      imageUrl: "Bilder Home/Grunewald.jpg",
      description: "Ein ausgedehnter Wald im Westen Berlins, ideal zum Wandern und Entspannen.",
      mapsUrl: "https://www.google.com/maps?q=Grunewald+Berlin"
    },
    {
      position: { lat: 52.500, lng: 13.420 },
      title: "Treptower Park",
      category: "Natur",
      imageUrl: "Bilder Home/Treptower_Park.jpg",
      description: "Ein weitläufiger Park entlang der Spree, perfekt für Spaziergänge und Erholung.",
      mapsUrl: "https://www.google.com/maps?q=Treptower+Park"
    },
    {
      position: { lat: 52.516, lng: 13.297 },
      title: "Schlosspark Charlottenburg",
      category: "Natur",
      imageUrl: "Bilder Home/Schlosspark_Charlottenburg.jpg",
      description: "Ein historischer Park rund um das Schloss Charlottenburg, ideal für entspannte Spaziergänge.",
      mapsUrl: "https://www.google.com/maps?q=Schlosspark+Charlottenburg"
    },
    {
      position: { lat: 52.521, lng: 13.400 },
      title: "Pergamonmuseum",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Pergamonmuseum.jpg",
      description: "Ein weltbekanntes Museum auf der Museumsinsel, das beeindruckende antike Monumente und Exponate präsentiert.",
      mapsUrl: "https://www.google.com/maps?q=Pergamonmuseum"
    },
    {
      position: { lat: 52.520, lng: 13.398 },
      title: "Altes Museum",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Altes_Museum.jpg",
      description: "Ein klassisches Museum, das die Kunst und Kultur der Antike in einem beeindruckenden Gebäude zeigt.",
      mapsUrl: "https://www.google.com/maps?q=Altes+Museum+Berlin"
    },
    {
      position: { lat: 52.5205, lng: 13.399 },
      title: "Neues Museum",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Neues_Museum.jpg",
      description: "Das Neue Museum auf der Museumsinsel bietet faszinierende Einblicke in die ägyptische Geschichte und andere Kulturen.",
      mapsUrl: "https://www.google.com/maps?q=Neues+Museum+Berlin"
    },
    {
      position: { lat: 52.520, lng: 13.401 },
      title: "Bode-Museum",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Bode_Museum.jpg",
      description: "Das Bode-Museum beeindruckt mit einer umfangreichen Sammlung von Skulpturen und Kunstwerken in einem historischen Gebäude.",
      mapsUrl: "https://www.google.com/maps?q=Bode+Museum+Berlin"
    },
    {
      position: { lat: 52.523, lng: 13.397 },
      title: "Deutsches Historisches Museum",
      category: "Sehenswürdigkeiten",
      imageUrl: "Bilder Home/Deutsches_Historisches_Museum.jpg",
      description: "Das Deutsche Historische Museum bietet einen tiefen Einblick in die deutsche Geschichte von den Anfängen bis zur Gegenwart.",
      mapsUrl: "https://www.google.com/maps?q=Deutsches+Historisches+Museum+Berlin"
    },
    
    // Beispielmarker für Kategorie "Natur" hinzufügen:
    {
      position: { lat: 52.5250, lng: 13.3800 },
      title: "Botanischer Garten",
      category: "Natur",
      imageUrl: "Bilder Home/Botanischer_Garten.jpg",
      description: "Ein wunderschöner Garten mit exotischen Pflanzen, ideal für Naturliebhaber.",
      mapsUrl: "https://www.google.com/maps?q=Botanischer+Garten+Berlin"
    }
  ];

  let markers = [];
  let activeInfoWindow = null;

  // Objekt, das den aktiven Status jeder Kategorie speichert
  const activeCategories = {
    "Essen": true,
    "Shoppen": true,
    "Parken": true,
    "Natur": true,
    "Sehenswürdigkeiten": true
  };

  // Funktion zur Erstellung eines Markers inkl. Infofenster (Infofenster wird per Klick geöffnet)
  function createMarker(data) {
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

    // Speichere die Kategorie direkt im Marker-Objekt
    marker.category = data.category;

    // Erstelle das Infofenster (ohne zusätzlichen Schließbutton – nutze den Standard von Google Maps)
    const infoWindowContent = document.createElement("div");
    infoWindowContent.classList.add("info-window-content");
    infoWindowContent.innerHTML = `
      <div class="info-window-header">
        <span class="place-name">${data.title}</span>
      </div>
      <div class="info-window-body">
        <img src="${data.imageUrl}" alt="${data.title}">
        <p>${data.description}</p>
        <a href="${data.mapsUrl}" target="_blank" class="map-link">📍 Auf Google Maps</a>
      </div>
    `;
    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent,
      maxWidth: 350
    });

    marker.addListener("click", () => {
      if (activeInfoWindow) {
        activeInfoWindow.close();
      }
      infoWindow.open(map, marker);
      activeInfoWindow = infoWindow;
    });

    return marker;
  }

  // Alle Marker erstellen und speichern
  markerData.forEach(data => {
    const marker = createMarker(data);
    markers.push(marker);
  });

  // Verwende klickbare Legenden-Items, um Marker nach Kategorie zu toggeln
  // Voraussetzung: Im HTML existiert eine Liste mit der Klasse "legend-list"
  const legendItems = document.querySelectorAll('.legend-list li');
  legendItems.forEach(item => {
    item.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      // Toggle den aktiven Status für die Kategorie
      activeCategories[category] = !activeCategories[category];
      // Visuelle Rückmeldung: Wenn deaktiviert, füge Klasse "inactive" hinzu
      this.classList.toggle('inactive');

      // Marker anhand ihrer Kategorie ein- oder ausblenden
      markers.forEach(marker => {
        if (activeCategories[marker.category]) {
          marker.setMap(map);
        } else {
          marker.setMap(null);
        }
      });
    });
  });
};
