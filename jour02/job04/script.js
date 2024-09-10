document.addEventListener('keypress', function(event) {
    const keylogger = document.getElementById('keylogger');
    const key = event.key.toLowerCase();
    
    if (key.match(/[a-z]/)) {
        if (document.activeElement === keylogger) {
            keylogger.value += key + key;
        } else {
            keylogger.value += key;
        }
    }
});