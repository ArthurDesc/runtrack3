$(document).ready(function() {
    $('#button').on('click', function() {
        fetch('expression.txt')
            .then(response => response.text())
            .then(data => {
                $('<p>').text(data).appendTo('body');
            })
            .catch(error => console.error('Erreur:', error));
    });
});