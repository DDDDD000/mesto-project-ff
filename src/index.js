import './pages/index.css';
import { openModal, closeModal } from './components/modal.js';
import { showCards, handleFormCardAdd, handleCardLike, handleImageOpen } from './components/card.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');

//Popups
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

//Forms
const editForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];

const placesList = document.querySelector('.places__list');

showCards()
//POPUPS

//Any Popup Close
popupCloseButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const popup = evt.currentTarget.closest('.popup');
        closeModal(popup)
    })
})

//PROFILE FORM
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

//Profile Open
profileEditButton.addEventListener('click', () => {
    editForm.elements.name.value = profileName.textContent
    editForm.elements.description.value = profileDescription.textContent
    openModal(editPopup)
});

//Profile Save
function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = editForm.elements.name.value
    profileDescription.textContent = editForm.elements.description.value

    closeModal(editPopup)
}
editForm.addEventListener('submit', handleFormSubmit)

//Add Card Open
profileAddButton.addEventListener('click', () => {
    addCardForm.elements['place-name'].value = ''
    addCardForm.elements['link'].value = ''
    openModal(newCardPopup)
})
addCardForm.addEventListener('submit', handleFormCardAdd);

//Image Like & Open
placesList.addEventListener('click', (evt) => {
    handleImageOpen(evt)
    handleCardLike(evt)
})