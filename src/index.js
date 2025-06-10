import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { handleCardLike, createCard, deleteCard } from './components/card.js';
import { clearValidation, enableValidation } from './components/validation.js';
import { addCard, editProfile, getCards, getProfileInfo } from './components/api.js';


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

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

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

//Show Cards

getCards()
    .then(cards => {
        const placesList = document.querySelector('.places__list');
        cards.forEach(data => {
            const cardData = createCard(data, { deleteCard, handleCardLike, handleImageOpen });
            placesList.append(cardData);
        })
    })
    .catch(err => {
        console.error('Не удалось загрузить карточки:', err);
    })

//POPUPS

//Any Popup Close
popupCloseButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
        const form = popup.querySelector('.popup__form');
        if (form) {
            form.reset();
            clearValidation(form, validationConfig);
        }
        closeModal(popup)
    })
    popup.classList.add('popup_is-animated')
})

//PROFILE FORM
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profilePicture = document.querySelector('.profile__image')

//Profile Open
profileEditButton.addEventListener('click', () => {
    editForm.elements.name.value = profileName.textContent
    editForm.elements.description.value = profileDescription.textContent
    clearValidation(editForm, validationConfig)
    openModal(editPopup)
});

//Profile Save
function handleFormSubmit(evt) {
    evt.preventDefault();

    const name = editForm.elements.name.value;
    const about = editForm.elements.description.value;

    editProfile(name, about)
        .then(data => {
            profileName.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(editPopup);
        })
        .catch(err => {
            console.error('Ошибка при обновлении профиля:', err);
        })
}
editForm.addEventListener('submit', handleFormSubmit)

//Add Card Open
profileAddButton.addEventListener('click', () => {
    addCardForm.reset()
    clearValidation(addCardForm, validationConfig)
    openModal(newCardPopup)
})

//Card Add
function handleFormCardAdd(evt) {
    evt.preventDefault();
    const data = {
        name: addCardForm.elements['place-name'].value,
        link: addCardForm.elements['link'].value,
    }
    addCard(data.name, data.link)
        .then(cardData => {
            const cardElement = createCard(cardData, { deleteCard, handleCardLike, handleImageOpen });
            placesList.prepend(cardElement)
            closeModal(newCardPopup);
        })
        .catch(err => {
            console.error("Ошибка при добавлении карточки:", err);
        });
}
addCardForm.addEventListener('submit', handleFormCardAdd);

// Card Image Open
function handleImageOpen({ link, name }) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
}

enableValidation();

getProfileInfo()
    .then(userData => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profilePicture.style.backgroundImage = `url('${userData.avatar || 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg'}')`;
    })
    .catch(err => {
        console.error('Ошибка при загрузке профиля:', err);
    });