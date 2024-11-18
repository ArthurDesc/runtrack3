function jourtravaille(date) {

    const joursFeries2020 = [
        new Date(2020, 0, 1),
        new Date(2020, 3, 13),
        new Date(2020, 4, 1),
        new Date(2020, 4, 8),
        new Date(2020, 4, 21),
        new Date(2020, 5, 1),
        new Date(2020, 6, 14),
        new Date(2020, 7, 15),
        new Date(2020, 10, 1),
        new Date(2020, 10, 11),
        new Date(2020, 11, 25)
    ];

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('fr-FR', options);

    if (joursFeries2020.some(ferieDate => 
        ferieDate.getDate() === date.getDate() &&
        ferieDate.getMonth() === date.getMonth() &&
        ferieDate.getFullYear() === date.getFullYear())) {
        console.log(`Le ${dateString} est un jour férié`);
    }
    else if (date.getDay() === 0 || date.getDay() === 6) {
        console.log(`Non, ${dateString} est un week-end`);
    }

    else {
        console.log(`Oui, ${dateString} est un jour travaillé`);
    }
}

jourtravaille(new Date(2020, 0, 1));  
jourtravaille(new Date(2020, 0, 4));  
jourtravaille(new Date(2020, 0, 6)); 