// listener for scrolling
window.addEventListener('scroll', function() {
    const windowHeight = window.innerHeight;
    // CALCULATE THE ENTIRE HEIGHT OF THE PAGE
    const documentHeight = document.documentElement.scrollHeight;
    // CALCULATE HOW MUCH WE SCROLLED DOWN
    const scrollTop = window.pageYOffset;
    const scrollValue = (scrollTop / (documentHeight - windowHeight)) ;

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.transform = `scaleX(${scrollValue})`;

    // Change the color depending on the scroll value
    const hue = Math.floor(scrollValue * 120); // 120 degrés = vert
    progressBar.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
});