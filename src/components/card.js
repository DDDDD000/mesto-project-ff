import { initialCards } from './cards.js';
import { openModal, closeModal } from './modal.js';

const userTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const imagePopup = document.querySelector('.popup_type_image');
const newCardPopup = document.querySelector('.popup_type_new-card');

const addCardForm = document.forms['new-place'];

export function createCard(data, { deleteCard, handleCardLike, handleImageOpen }) {

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
//Delete Card
export function deleteCard(userCard) {
    userCard.remove()
}
//Show Cards
export function showCards() {
    initialCards.forEach(data => {
        const cardData = createCard(data, { deleteCard, handleCardLike, handleImageOpen })
        placesList.append(cardData);
    });
}


//Card Add
export function handleFormCardAdd(evt) {
    evt.preventDefault();
    const data = {
        name: addCardForm.elements['place-name'].value,
        link: addCardForm.elements['link'].value,
    }
    const cardData = createCard(data, { deleteCard, handleCardLike, handleImageOpen })
    placesList.prepend(cardData)
    closeModal(newCardPopup);
}

//Image Like
export function handleCardLike(evt) {
    if (evt.target.classList.contains('card__like-button'))
        evt.target.classList.toggle('card__like-button_is-active')
}

// Card Image Open
export function handleImageOpen(evt) {
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
