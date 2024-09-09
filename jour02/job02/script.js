function showhide() {
    const container = document.getElementById('container');
    const existingArticle = container.querySelector('article');

    if (existingArticle) {
        container.removeChild(existingArticle);
    } else {
        const article = document.createElement('article');
        article.textContent = "L'important n'est pas la chute, mais l'atterrissage.";
        container.appendChild(article);
    }
}

document.getElementById('button').addEventListener('click', showhide);