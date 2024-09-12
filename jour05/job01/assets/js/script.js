$(document).ready(function() {
    // Regex pour chaque type de champ
    var regexPatterns = {
        nom: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
        prenom: /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    };

    // Fonction de validation pour chaque champ
    function validateField(field) {
        var value = field.val().trim();
        var id = field.attr('id');
        var error = '';

        switch(id) {
            case 'nom':
            case 'prenom':
                if (value === '') {
                    error = 'Ce champ est requis.';
                } else if (!regexPatterns[id].test(value)) {
                    error = 'Format invalide. Utilisez uniquement des lettres, espaces, apostrophes et tirets (2-50 caractères).';
                }
                break;
            case 'email':
                if (value === '') {
                    error = 'L\'email est requis.';
                } else if (!regexPatterns.email.test(value)) {
                    error = 'L\'adresse email est invalide.';
                }
                break;
            case 'password':
                if (value === '') {
                    error = 'Le mot de passe est requis.';
                } else if (!regexPatterns.password.test(value)) {
                    error = 'Le mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial.';
                }
                break;
            case 'confirmPassword':
                if (value === '') {
                    error = 'La confirmation du mot de passe est requise.';
                } else if (value !== $('#password').val()) {
                    error = 'Les mots de passe ne correspondent pas.';
                }
                break;
        }

        // Afficher ou cacher le message d'erreur
        var errorSpan = $('#' + id + 'Error');
        errorSpan.text(error);
        errorSpan.toggle(error !== '');

        return error === '';
    }

    // Valider chaque champ lors de la saisie
    $('#inscriptionForm input, #connexionForm input').on('input', function() {
        validateField($(this));
    });

    // Validation du formulaire d'inscription lors de la soumission
    $('#inscriptionForm').submit(function(e) {
        e.preventDefault();
        var isValid = true;

        // Valider tous les champs
        $(this).find('input').each(function() {
            if (!validateField($(this))) {
                isValid = false;
            }
        });

        if (isValid) {
            // Envoyer le formulaire via AJAX
            $.ajax({
                url: 'traitement_inscription.php',
                method: 'POST',
                data: $(this).serialize(),
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        window.location.href = 'connexion.php?inscription=success';
                    } else {
                        // Gérer les erreurs spécifiques à chaque champ
                        if (response.errors) {
                            $.each(response.errors, function(key, value) {
                                $('#' + key + 'Error').text(value).show();
                            });
                        } else {
                            $('#generalError').text(response.message).show();
                        }
                    }
                },
                error: function() {
                    $('#generalError').text("Une erreur est survenue lors de l'inscription.").show();
                }
            });
        }
    });

    // Code pour le formulaire de connexion
    $('#connexionForm').submit(function(e) {
        e.preventDefault();
        var isValid = true;

        // Valider tous les champs
        $(this).find('input').each(function() {
            if (!validateField($(this))) {
                isValid = false;
            }
        });

        if (isValid) {
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
                        // Gérer les erreurs spécifiques à chaque champ
                        if (response.errors) {
                            $.each(response.errors, function(key, value) {
                                $('#' + key + 'Error').text(value).show();
                            });
                        } else {
                            $('#generalError').text(response.message).show();
                        }
                    }
                },
                error: function() {
                    $('#generalError').text("Une erreur est survenue lors de la connexion.").show();
                }
            });
        }
    });
});
