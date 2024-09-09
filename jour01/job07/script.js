function jourtravaille(date) {
    // CONST WITH DAYS OFF
    const joursFeries2020 = [
        new Date(2020, 0, 1),  // Jour de l'an
        new Date(2020, 3, 13), // Lundi de Pâques
        new Date(2020, 4, 1),  // Fête du Travail
        new Date(2020, 4, 8),  // Victoire 1945
        new Date(2020, 4, 21), // Ascension
        new Date(2020, 5, 1),  // Lundi de Pentecôte
        new Date(2020, 6, 14), // Fête Nationale
        new Date(2020, 7, 15), // Assomption
        new Date(2020, 10, 1), // Toussaint
        new Date(2020, 10, 11),// Armistice 1918
        new Date(2020, 11, 25) // Noël
    ];

    // SPECIFIC SETTINGS FOR THE DATE FORMAT
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('fr-FR', options);

    
    

}

// Appel de la fonction
jourtravaille(date);