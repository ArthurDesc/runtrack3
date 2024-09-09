function bisextile(annee) {
    // Une année est bisextile si elle est divisible par 4
    // Sauf si elle est divisible par 100
    // Auquel cas, elle doit aussi être divisible par 400 pour être bisextile
    if ((annee % 4 === 0 && annee % 100 !== 0) || (annee % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}

// Exemples d'utilisation :
console.log(bisextile(2000));  // true