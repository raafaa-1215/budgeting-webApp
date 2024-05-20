function togglePopUp(i) { 
    switch (i) {
        case 2:
            var overlay = document.getElementById('popupOverlayAddTax'); 
            overlay.classList.toggle('show'); 
            break;
        case 3:
            var overlay = document.getElementById('popupOverlayEditTax'); 
            overlay.classList.toggle('show');
            break;
        default:
            break;
    }
}