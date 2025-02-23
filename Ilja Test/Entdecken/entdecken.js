// Beim Klick auf eine Karte wird sie aktiviert
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function(event) {
      // Verhindere, dass ein Klick auf den Close-Button erneut das Öffnen auslöst
      if (!event.target.closest('.close-btn')) {
        // Nur öffnen, wenn sie noch nicht aktiv ist
        if (!this.classList.contains('active')) {
          this.classList.add('active');
        }
      }
    });
  });
  
  // Der Close-Button schließt die Karte
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function(event) {
      event.stopPropagation(); // Verhindere, dass der Klick an die Karte weitergegeben wird
      this.parentElement.classList.remove('active');
    });
  });



  
// Suchfeld und Container der Karten abrufen
const searchInput = document.querySelector('.search-input');
const cardsContainer = document.querySelector('.cards-container');

// Alle Karten in ein Array umwandeln
const cards = Array.from(cardsContainer.children);

// Event-Listener für Eingaben in der Suchleiste
searchInput.addEventListener('input', function () {
  const query = searchInput.value.trim().toLowerCase();

  // Fade-Out vor dem Sortieren
  cardsContainer.style.opacity = '0';

  setTimeout(() => {
    // Sortiere die Karten so, dass Karten, die den Suchbegriff im Titel haben, nach vorne rücken
    const sortedCards = cards.sort((a, b) => {
      const titleA = a.querySelector('.card-caption h3').textContent.toLowerCase();
      const titleB = b.querySelector('.card-caption h3').textContent.toLowerCase();
      const aMatches = titleA.includes(query);
      const bMatches = titleB.includes(query);
      
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });

    // Entferne alle Karten aus dem Container
    cardsContainer.innerHTML = '';

    // Füge die sortierten Karten wieder ein
    sortedCards.forEach(card => cardsContainer.appendChild(card));

    // Fade-In nach dem Sortieren
    cardsContainer.style.opacity = '1';
  }, 300); // Warte 300ms für den Fade-Out, bevor die Sortierung erfolgt
});

  