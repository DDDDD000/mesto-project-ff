let currentOpenedPopup = null

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        closeModal(currentOpenedPopup)
    }
}

export function openModal(popupElement) {
    currentOpenedPopup = popupElement
    popupElement.style.display = 'flex';
    document.addEventListener('keydown', handleEscape)
}

export function closeModal(popupElement) {
    popupElement.style.display = 'none';
    document.removeEventListener('keydown', handleEscape)
    currentOpenedPopup = null
}