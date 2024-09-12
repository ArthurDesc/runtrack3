<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des Utilisateurs</title>
</head>
<body>
    <h1>Liste des Utilisateurs</h1>
    <button id="updateBtn">Mettre à jour</button>
    <table id="usersTable">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <!-- Les données seront insérées ici -->
        </tbody>
    </table>

    <script>
    function fetchUsers() {
        fetch('users.php')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#usersTable tbody');
                tableBody.innerHTML = ''; // Vide le contenu existant du tableau

                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.nom}</td>
                        <td>${user.prenom}</td>
                        <td>${user.email}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    document.getElementById('updateBtn').addEventListener('click', fetchUsers);

    // Chargement initial
    fetchUsers();
    </script>
</body>
</html>
