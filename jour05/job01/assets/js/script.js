$(document).ready(function() {
    $('#inscriptionForm').submit(function(e) {
        e.preventDefault();
        var errors = {};
        
        // Validation des champs
        if ($('#nom').val().trim() === '') {
            errors.nom = "Le nom est requis.";
        }
        if ($('#prenom').val().trim() === '') {
            errors.prenom = "Le prénom est requis.";
        }
        if (!isValidEmail($('#email').val().trim())) {
            errors.email = "L'adresse email est invalide.";
        }
        if ($('#password').val().length < 8) {
            errors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        }
        if ($('#password').val() !== $('#confirmPassword').val()) {
            errors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }
        
        // Affichage des erreurs ou envoi du formulaire
        if (Object.keys(errors).length > 0) {
            // Afficher les erreurs
            $('.error').text(''); // Effacer les anciennes erreurs
            $.each(errors, function(key, value) {
                $('#' + key + 'Error').text(value);
            });
        } else {
            // Envoyer le formulaire
            this.submit();
        }
    });
    
    $('#connexionForm').submit(function(e) {
        e.preventDefault();
        var errors = {};
        
        // Validation de l'email
        if ($('#email').val().trim() === '' || !isValidEmail($('#email').val().trim())) {
            errors.email = "Veuillez entrer une adresse email valide.";
        }
        
        // Validation du mot de passe
        if ($('#password').val().trim() === '') {
            errors.password = "Le mot de passe est requis.";
        }
        
        // Affichage des erreurs ou envoi du formulaire
        if (Object.keys(errors).length > 0) {
            // Afficher les erreurs
            $('.error').text(''); // Effacer les anciennes erreurs
            $.each(errors, function(key, value) {
                $('#' + key + 'Error').text(value);
            });
        } else {
            // Envoyer le formulaire via AJAX
            $.ajax({
                url: 'traitement_connexion.php',
                method: 'POST',
                data: $(this).serialize(),
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        window.location.href = 'index.php';
                    } else {
                        $('.error').text(response.message);
                    }
                },
                error: function() {
                    $('.error').text("Une erreur est survenue lors de la connexion.");
                }
            });
        }
    });

    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
