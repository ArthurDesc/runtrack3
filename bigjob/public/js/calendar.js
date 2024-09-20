let calendar;
let selectedDate;

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
            selectedDate = info.startStr;
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

function validerDateSelectionnee() {


    fetch('/api/reservation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: selectedDate }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Rendez-vous réservé avec succès pour le ' + selectedDate + ' !');
            calendar.addEvent({
                title: 'Réservé',
                start: selectedDate,
                allDay: true
            });
            selectedDate = null;
        } else {
            alert('Erreur lors de la réservation : ' + data.error);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la réservation');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initCalendar();
    document.getElementById('valider-dates').addEventListener('click', validerDateSelectionnee);
});