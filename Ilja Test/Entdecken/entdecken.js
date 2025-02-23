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
  