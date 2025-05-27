function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const popupElement = document.querySelector('.popup_is-opened')
        closeModal(popupElement)
    }
}

function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget)
    }
}
export function openModal(popupElement) {
    popupElement.classList.add("popup_is-opened");

    document.addEventListener('keydown', handleEscape);
    popupElement.addEventListener('click', handleOverlayClick);
}

export function closeModal(popupElement) {
    popupElement.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', handleEscape)
    popupElement.removeEventListener('click', handleOverlayClick)
}
