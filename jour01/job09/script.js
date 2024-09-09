function tri(numbers, order) {
    return numbers.sort((a, b) => {
        if (order === "asc") {
            return a - b;
        } else if (order === "desc") {
            return b - a;
        } else {
            throw new Error("Le paramètre 'order' doit être 'asc' ou 'desc'");
        }
    });
}

// Exemples d'utilisation
let tableau = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
console.log("Tri ascendant:", tri([...tableau], "asc"));
console.log("Tri descendant:", tri([...tableau], "desc"));

// Test avec un ordre invalide
try {
    console.log(tri([...tableau], "invalid"));
} catch (error) {
    console.error("Erreur:", error.message);
}