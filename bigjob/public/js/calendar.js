let calendar;
let selectedDate = null; // Remplace selectedDates

function initCalendar() {
  var calendarEl = document.getElementById('calendar');
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable: true,
    select: function(info) {
      // Sélectionner uniquement la nouvelle date
      selectDate(info.startStr);
    },
    events: selectedDate ? [{
      start: selectedDate,
      display: 'background',
      color: '#3788d8'
    }] : []
  });
  calendar.render();
}

function selectDate(date) {
  selectedDate = date;
  updateCalendarEvents();
}

function updateCalendarEvents() {
  calendar.removeAllEvents();
  if (selectedDate) {
    calendar.addEvent({
      start: selectedDate,
      display: 'background',
      color: '#3788d8'
    });
  }
}

function validerDateSelectionnee() {
  if (!selectedDate) {
    M.toast({html: "Veuillez sélectionner une date."});
    return;
  }

  // Vérifier si la date est dans le futur
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (new Date(selectedDate) < today) {
    M.toast({html: "Veuillez sélectionner une date future."});
    return;
  }

  fetch('/api/reserver-date', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date: selectedDate }),
  })
  .then(response => response.json())
  .then(data => {
    M.toast({html: data.message || 'Date réservée avec succès'});
    selectedDate = null;
    updateCalendarEvents();
  })
  .catch((error) => {
    console.error('Erreur:', error);
    M.toast({html: 'Erreur lors de la réservation de la date'});
  });
}

// Initialiser le calendrier une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
  initCalendar();
  document.getElementById('valider-dates').addEventListener('click', validerDateSelectionnee);
});
