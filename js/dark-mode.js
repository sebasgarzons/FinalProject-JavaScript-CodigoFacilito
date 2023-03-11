const darkmode = document.querySelector('#dark-mode'); 


darkmode.addEventListener('click', () => {
    document.body.classList.toggle('light');
    darkmode.classList.toggle('on');
    
} )