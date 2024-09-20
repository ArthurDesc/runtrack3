let calendar;
let selectedDates = [];

function initCalendar() {
    var calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        locale: 'fr', // Pour avoir le calendrier en français
        buttonText: {
            today: 'Aujourd\'hui',
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour'
        },
        firstDay: 1, // Commence la semaine le lundi
        height: 'auto',
        selectable: true, // Permet la sélection de dates
        select: function(info) {
            let dateStr = info.startStr;
            if (!selectedDates.includes(dateStr)) {
                selectedDates.push(dateStr);
                calendar.addEvent({
                    title: 'Sélectionné',
                    start: dateStr,
                    allDay: true,
                    color: 'green'
                });
            }
        }
    });
    chargerRendezVousExistants();
    calendar.render();
}

function chargerRendezVousExistants() {
    fetch('/api/reservations')
    .then(response => response.json())
    .then(data => {
        data.forEach(reservation => {
            calendar.addEvent({
                title: 'Réservé',
                start: reservation.date,
                allDay: true
            });
        });
    })
    .catch(error => console.error('Erreur lors du chargement des rendez-vous:', error));
}

function validerDatesSelectionnee() {
    const datesSelectionnees = calendar.getEvents().map(event => event.startStr);
    if (datesSelectionnees.length === 0) {
        M.toast({html: 'Veuillez sélectionner au moins une date.'});
        return;
    }

    // Envoyer une demande d'autorisation au lieu d'une réservation directe
    fetch('/api/demande-reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dates: datesSelectionnees }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.toast({html: 'Demande de réservation envoyée avec succès. En attente d\'approbation.'});
            calendar.removeAllEvents();
        } else {
            M.toast({html: 'Erreur lors de l\'envoi de la demande de réservation.'});
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        M.toast({html: 'Une erreur est survenue lors de l\'envoi de la demande.'});
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initCalendar();
    document.getElementById('valider-dates').addEventListener('click', validerDatesSelectionnee);
});