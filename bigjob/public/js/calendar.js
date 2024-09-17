document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    selectable: true,
    select: function(info) {
      // Logique pour demander une autorisation de présence
      demanderAutorisation(info.startStr);
    }
  });
  calendar.render();
});

function demanderAutorisation(date) {
  // Vérifiez si la date est dans le futur
  if (new Date(date) > new Date()) {
    // Envoyez une requête au serveur pour demander l'autorisation
    fetch('/api/demande-presence', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: date }),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Affichez un message de confirmation
      // Rafraîchissez le calendrier si nécessaire
    })
    .catch((error) => {
      console.error('Erreur:', error);
    });
  } else {
    alert("Vous ne pouvez pas faire de demande pour une date passée.");
  }
}
