document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();
    chargerDemandesReservation();
});

function fetchUsers() {
    fetch('/api/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des utilisateurs');
            }
            return response.json();
        })
        .then(users => {
            displayUsers(users);
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Erreur lors de la récupération des utilisateurs');
        });
}

function displayUsers(users) {
    const tableBody = document.getElementById('users-table-body');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.prenom}</td>
            <td>${user.nom}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn-small waves-effect waves-light" onclick="openRoleModal(${user.id}, '${user.role}')">Rôle</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function openRoleModal(userId, currentRole) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h4>Gérer le rôle de l'utilisateur</h4>
            <p>ID de l'utilisateur : ${userId}</p>
            <p>Rôle actuel : ${currentRole}</p>
            <p>
                <label>
                    <input type="checkbox" id="role-moderator" ${currentRole === 'moderator' ? 'checked' : ''} />
                    <span>Modérateur</span>
                </label>
            </p>
            <p>
                <label>
                    <input type="checkbox" id="role-admin" ${currentRole === 'admin' ? 'checked' : ''} />
                    <span>Administrateur</span>
                </label>
            </p>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Annuler</a>
            <a href="#!" onclick="updateRole(${userId})" class="waves-effect waves-green btn">Mettre à jour</a>
        </div>
    `;
    document.body.appendChild(modal);

    // Initialiser le modal avec Materialize
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    instances[0].open();
}

function updateRole(userId) {
    const isModerator = document.getElementById('role-moderator').checked;
    const isAdmin = document.getElementById('role-admin').checked;
    
    let newRole = 'user';
    if (isAdmin) {
        newRole = 'admin';
    } else if (isModerator) {
        newRole = 'moderator';
    }
    
    fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du rôle');
        }
        return response.json();
    })
    .then(data => {
        alert('Rôle mis à jour avec succès');
        fetchUsers(); // Rafraîchir la liste des utilisateurs
        var instance = M.Modal.getInstance(document.querySelector('.modal'));
        instance.close();
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de la mise à jour du rôle');
    });
}

function chargerDemandesReservation() {
    fetch('/api/demandes-reservation')
        .then(response => response.json())
        .then(demandes => {
            const tbody = document.querySelector('#table-demandes-reservation tbody');
            tbody.innerHTML = '';
            demandes.forEach(demande => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${demande.nom_utilisateur}</td>
                    <td>${demande.date}</td>
                    <td>
                        <button class="btn-small green" onclick="approuverDemande(${demande.id})">Approuver</button>
                        <button class="btn-small red" onclick="refuserDemande(${demande.id})">Refuser</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => console.error('Erreur:', error));
}

function approuverDemande(id) {
    gererDemande(id, 'approuver');
}

function refuserDemande(id) {
    gererDemande(id, 'refuser');
}

function gererDemande(id, action) {
    fetch(`/api/gerer-demande-reservation/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            M.toast({html: `Demande ${action === 'approuver' ? 'approuvée' : 'refusée'} avec succès`});
            chargerDemandesReservation();
        } else {
            M.toast({html: 'Erreur lors du traitement de la demande'});
        }
    })
    .catch(error => console.error('Erreur:', error));
}
