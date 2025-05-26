let currentOpenedPopup = null
const popupContent = document.querySelector(".popup__content_content_image")

function handleEscape(evt) {
    if (evt.key === 'Escape') {
        closeModal(currentOpenedPopup)
    }
}
function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget)
    }
}
export function openModal(popupElement) {
    currentOpenedPopup = popupElement
    popupElement.classList.add("popup_is-animated");
    setTimeout(() => {
        popupElement.classList.add("popup_is-opened");
    }, 10);

    document.addEventListener('keydown', handleEscape);
    popupElement.style.cursor = 'pointer'
    popupContent.style.cursor = 'default'
    popupElement.addEventListener('click', handleOverlayClick);
}

export function closeModal(popupElement) {
    popupElement.classList.remove("popup_is-opened");
    setTimeout(() => {
        popupElement.classList.remove("popup_is-animated");
    }, 600);
    document.removeEventListener('keydown', handleEscape)
    popupElement.removeEventListener('click', handleOverlayClick)
    currentOpenedPopup = null
}
