function bisextile(annee) {

    if ((annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}

// Exemples d'utilisation :
console.log(bisextile(2000));  // true