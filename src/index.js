import './pages/index.css';
import { openModal, closeModal } from './components/modal.js';
import { initialCards } from './components/cards.js';

const userTemplate = document.querySelector('#card-template').content;

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');

//Popups
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

//Forms
const editForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];

const placesList = document.querySelector('.places__list');

function createCard(data, { deleteCard, handleCardLike, handleImageOpen }) {

    const userCard = userTemplate.querySelector('.places__item').cloneNode(true);

    const deleteButton = userCard.querySelector('.card__delete-button');
    const cardImage = userCard.querySelector('.card__image');
    const cardTitle = userCard.querySelector('.card__title');
    const cardAlternative = userCard.querySelector('.card__image');

    cardImage.src = data.link;
    cardTitle.textContent = data.name;
    cardAlternative.alt = data.name;

    deleteButton.addEventListener('click', function () {
        deleteCard(userCard)
    });

    return userCard
}

function deleteCard(userCard) {
    userCard.remove()
}

function showCards() {
    initialCards.forEach(data => {
        const cardData = createCard(data, { deleteCard, handleCardLike, handleImageOpen })
        placesList.append(cardData);
    });
}

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
//ADD CARD FORM

//Add Card Open
profileAddButton.addEventListener('click', () => {
    addCardForm.elements['place-name'].value = ''
    addCardForm.elements['link'].value = ''
    openModal(newCardPopup)
})

//Add Card Save
function handleFormCardAdd(evt) {
    evt.preventDefault();
    const data = {
        name: addCardForm.elements['place-name'].value,
        link: addCardForm.elements['link'].value,
    }
    const cardData = createCard(data, { deleteCard, handleCardLike, handleImageOpen })
    placesList.prepend(cardData)
    closeModal(newCardPopup);
}

addCardForm.addEventListener('submit', handleFormCardAdd);

//IMAGE FORM
//Image Open
function handleImageOpen(evt) {
    const cardImage = evt.target.closest('.card__image')
    if (cardImage) {
        const card = cardImage.closest('.card');

        const cardTitle = card.querySelector('.card__title').textContent;

        const popupImage = imagePopup.querySelector('.popup__image');
        const popupCaption = imagePopup.querySelector('.popup__caption');

        popupImage.src = cardImage.src;
        popupImage.alt = cardTitle
        popupCaption.textContent = cardTitle
        openModal(imagePopup);
    }
}

//Image Like
function handleCardLike(evt) {
    if (evt.target.classList.contains('card__like-button'))
        evt.target.classList.toggle('card__like-button_is-active')
}

placesList.addEventListener('click', (evt) => {
    handleImageOpen(evt)
    handleCardLike(evt)
})