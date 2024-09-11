document.getElementById('button').addEventListener('click', function() {
    fetch('expression.txt')
        .then(response => response.text())
        .then(data => {
            const paragraph = document.createElement('p');
            paragraph.textContent = data;
            document.body.appendChild(paragraph);
        })
        .catch(error => console.error('Erreur:', error));
});