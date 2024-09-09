function citation() {
    const texte = document.getElementById('citation').textContent;
    console.log(texte);
}

document.getElementById('button').addEventListener('click', citation);