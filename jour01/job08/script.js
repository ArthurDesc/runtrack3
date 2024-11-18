function sommenombrespremiers(a, b) {
    function estPremier(nombre) {
        if (nombre <= 1) return false;
        for (let i = 2; i <= Math.sqrt(nombre); i++) {
            if (nombre % i === 0) return false;
        }
        return true;
    }

    if (estPremier(a) && estPremier(b)) {
        return a + b;
    } else {
        return false;
    }
}

// Exemples d'utilisation
console.log(sommenombrespremiers(2, 3));  // Devrait retourner 5
console.log(sommenombrespremiers(2, 4));  // Devrait retourner false
console.log(sommenombrespremiers(17, 19));  