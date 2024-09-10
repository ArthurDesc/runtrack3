function showhide() {
    // ADD THE ID ON THE VARIABLE
    const container = document.getElementById('container');
    // CHECK IF THE ARTICLE EXIST IN THE CONTAINER DIV
    const existingArticle = container.querySelector('article');

    if (existingArticle) {
        // REMOVE ARTICLE
        container.removeChild(existingArticle);
    } else {
        // CREATE ARTICLE
        const article = document.createElement('article');
        article.textContent = "L'important n'est pas la chute, mais l'atterrissage.";
        // ADD (article) AS LAST ELEMENT
        container.appendChild(article);
    }
}
document.getElementById('button').addEventListener('click', showhide);