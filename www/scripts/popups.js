function togglePopUp(i) { 
    switch (i) {
        case 2:
            var overlay = document.getElementById('popupOverlayAdd'); 
            overlay.classList.toggle('show'); 
            break;
        case 3:
            var overlay = document.getElementById('popupOverlayEdit'); 
            overlay.classList.toggle('show');
            break;
        default:
            break;
    }
}