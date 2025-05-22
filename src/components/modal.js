const editPopup = document.querySelector('.popup_type_edit')
export function openModal() {
    editPopup.style.display = 'flex'
}

export function closeModal() {
    editPopup.style.display = 'none'
}