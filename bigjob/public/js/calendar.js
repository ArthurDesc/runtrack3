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
            alert('Date sélectionnée : ' + selectedDate);
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

function reserverRendezVous(date) {
    fetch('/api/reserver', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: date }),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Rendez-vous réservé avec succès pour le ' + date);
            calendar.addEvent({
                title: 'Réservé',
                start: date,
                allDay: true
            });
        } else {
            alert(data.error || 'Erreur lors de la réservation');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la réservation');
    });
}

function verifierConnexionAvantReservation(date) {
    fetch('/api/check-session', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.isAuthenticated) {
            reserverRendezVous(date);
        } else {
            alert('Votre session a expiré. Veuillez vous reconnecter.');
            window.location.href = '/connexion.html';
        }
    })
    .catch(error => {
        console.error('Erreur de vérification de session:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    });
}

// Modifier la fonction existante pour utiliser verifierConnexionAvantReservation
function validerDateSelectionnee() {
    if (selectedDate) {
        verifierConnexionAvantReservation(selectedDate);
    } else {
        alert('Veuillez sélectionner une date avant de valider.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initCalendar();
    document.getElementById('valider-dates').addEventListener('click', validerDateSelectionnee);
});