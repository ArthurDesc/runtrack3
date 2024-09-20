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
            let selectedDate = new Date(dateStr);
            let today = new Date();
            today.setHours(0, 0, 0, 0); // Réinitialiser l'heure à minuit

            if (selectedDate < today) {
                alert('Vous ne pouvez pas réserver une date dans le passé.');
                return;
            }

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

function validerDatesSelectionnees() {
    if (selectedDates.length === 0) {
        alert('Veuillez sélectionner au moins une date.');
        return;
    }

    fetch('/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dates: selectedDates }),
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Rendez-vous réservés avec succès !');
            selectedDates.forEach(date => {
                calendar.addEvent({
                    title: 'Réservé',
                    start: date,
                    allDay: true
                });
            });
            selectedDates = [];
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
    document.getElementById('valider-dates').addEventListener('click', validerDatesSelectionnees);
});