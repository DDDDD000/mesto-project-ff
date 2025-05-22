// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './pages/index.css';
import { openModal, closeModal } from './components/modal.js';
import { initialCards } from './scripts/cards.js';

const userTemplate = document.querySelector('#card-template').content;


const profileEditButton = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close');

//popups
const editPopup = document.querySelector('.popup_type_edit')
const newCardPopup = document.querySelector('.popup_type_new-card')
const imagePopup = document.querySelector('.popup_type_image')

//forms
const editForm = document.forms.edit_profile


const placesList = document.querySelector('.places__list');

function createCard(data, { deleteCard }) {

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
        const cardData = createCard(data, { deleteCard })
        placesList.append(cardData);
    });
}

showCards()

//PROFILE FORM
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

//Profile save
function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = editForm.elements.name.value
    profileDescription.textContent = editForm.elements.description.value

    closeModal(editPopup)
}
//Profile open
profileEditButton.addEventListener('click', () => {
    editForm.elements.name.value = profileName.textContent
    editForm.elements.description.value = profileDescription.textContent
    openModal(editPopup)
});
//Profile close
popupClose.addEventListener('click', () => closeModal(editPopup))

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closeModal(editPopup)
    }
})

editForm.addEventListener('submit', handleFormSubmit)

//ADD CARD FORM
