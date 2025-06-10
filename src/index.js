import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openModal, closeModal } from './components/modal.js';
import { handleCardLike, createCard, deleteCard } from './components/card.js';
import { clearValidation, enableValidation } from './components/validation.js';


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
function showCards() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-40/cards', {
        headers: {
            authorization: '3288a148-b765-4961-8ec1-f86ec90a7c0a',
        }
    })
        .then(res => res.json())
        .then((result) => {
            const cards = Array.from(result)
            cards.forEach(data => {
                const cardData = createCard(data, { deleteCard, handleCardLike, handleImageOpen })
                placesList.append(cardData);
            });
        })
}

showCards()
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
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-40/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '3288a148-b765-4961-8ec1-f86ec90a7c0a',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: editForm.elements.name.value,
            about: editForm.elements.description.value,
        })
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`)
            }
            return res.json();
        })
        .then(data => {
            profileName.textContent = data.name;
            profileDescription.textContent = data.about;

            closeModal(editPopup);
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
    const cardData = createCard(data, { deleteCard, handleCardLike, handleImageOpen })
    placesList.prepend(cardData)
    closeModal(newCardPopup);
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


const getProfile = () => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-40/users/me', {
        headers: {
            authorization: '3288a148-b765-4961-8ec1-f86ec90a7c0a',
        }
    })
        .then(res => res.json())
        .then((result) => {
            profileName.textContent = result.name
            profileDescription.textContent = result.about
            profilePicture.style.backgroundImage = "url('https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg')"
            console.log("Your id: " + result._id)
        })
}

getProfile()

const addCard = () => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-40/cards', {
        method: 'POST',
        headers: {
            authorization: '3288a148-b765-4961-8ec1-f86ec90a7c0a',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: '',
            link: ''
        })
    })
}