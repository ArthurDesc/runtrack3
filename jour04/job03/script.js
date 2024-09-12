document.addEventListener('DOMContentLoaded', function() {
    let pokemonData = [];

    // Fonction pour isoler le type de chaque pokémon dans un Set
        function loadPokemonData() {
        fetch('pokemon.json')
            .then(response => response.json())
            .then(data => {
                pokemonData = data;
                let types = new Set();
                data.forEach(pokemon => {
                    pokemon.type.forEach(type => types.add(type));
                });
                const typeFilter = document.getElementById('typeFilter');
                types.forEach(type => {
                    let option = document.createElement('option');
                    option.value = type;
                    option.textContent = type;
                    typeFilter.appendChild(option);
                });
            })
            .catch(error => console.error('Erreur:', error));
    }

    // Fonction pour filtrer les Pokémon
    function filterPokemon() {
        let idFilter = document.getElementById('idFilter').value.toLowerCase();
        let nameFilter = document.getElementById('nameFilter').value.toLowerCase();
        let typeFilter = document.getElementById('typeFilter').value;

        let filteredPokemon = pokemonData.filter(pokemon => {
            return (idFilter === '' || pokemon.id.toString().includes(idFilter)) &&
                   (nameFilter === '' || pokemon.name.french.toLowerCase().includes(nameFilter)) &&
                   (typeFilter === '' || pokemon.type.includes(typeFilter));
        });

        displayResults(filteredPokemon);
    }

    // Fonction pour afficher les résultats
    function displayResults(results) {
        let resultsHtml = '';
        results.forEach(pokemon => {
            resultsHtml += `
                <div>
                    <h3>${pokemon.name.french} (ID: ${pokemon.id})</h3>
                    <p>Types: ${pokemon.type.join(', ')}</p>
                </div>
            `;
        });
        document.getElementById('results').innerHTML = resultsHtml;
    }

    // Chargement initial des données
    loadPokemonData();

    // Gestionnaire d'événement pour le bouton de filtrage
    document.getElementById('filterButton').addEventListener('click', filterPokemon);
});
