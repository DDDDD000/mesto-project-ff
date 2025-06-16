import './pages/index.css';
import { openModal, closeModal } from './components/modal.js';
import { handleCardLike, createCard } from './components/card.js';
import { clearValidation, enableValidation } from './components/validation.js';
import { addCard, editProfile, getCards, getProfileInfo, updateAvatar } from './components/api.js';


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
const profilePictureButton = document.querySelector('.profile__image');
const popupCloseButtons = document.querySelectorAll('.popup__close');


//Popups
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const pfpPopup = document.querySelector('.popup_type_change-pfp');

//Forms
const editForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const pfpForm = document.forms['pfp-change'];

const placesList = document.querySelector('.places__list');

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');


const handleLoadingState = (button, promise, {
    loadingText = 'Сохранение...',
    successCallBack = () => { },
    errorCallBack = (err) => console.error('Ошибка', err)
} = {}) => {
    const originalText = button.textContent;

    button.textContent = loadingText;
    button.disabled = true;

    return promise
        .then(data => {
            successCallBack(data);
            return data
        })
        .catch(err => {
            errorCallBack(err)
            throw err
        })
        .finally(() => {
            button.textContent = originalText
            button.disabled = false
        })
}

//Show Cards
let currentUserId = '';
const loadPageData = () => {
    Promise.all([getProfileInfo(), getCards()])
        .then(([profile, cards]) => {
            currentUserId = profile._id;
            profileName.textContent = profile.name;
            profileDescription.textContent = profile.about;
            profilePicture.style.backgroundImage = `url('${profile.avatar}')`;

            // Рендерим карточки
            renderCards(cards);
        })
        .catch(err => {
            console.error('Ошибка загрузки данных:', err);
        });
}

const renderCards = (cards) => {
    const placesList = document.querySelector('.places__list');
    placesList.innerHTML = '';
    cards.forEach(data => {
        const cardData = createCard(data, { handleCardLike, handleImageOpen }, currentUserId);
        placesList.append(cardData);
    })
}

//POPUPS

//Any Popup Close
popupCloseButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
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

    const submitButton = editForm.querySelector('.popup__button');
    const name = editForm.elements.name.value;
    const about = editForm.elements.description.value;

    handleLoadingState(submitButton, editProfile(name, about), {
        successCallBack: (data) => {
            profileName.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(editPopup);
        },
        errorCallBack: (err) => {
            console.error('Ошибка при обновлении профиля:', err);
            alert('Не удалось сохранить изменения. Пожалуйста, попробуйте ещё раз.');
        }
    }
    );
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

    const submitButton = addCardForm.querySelector('.popup__button');
    const data = {
        name: addCardForm.elements['place-name'].value,
        link: addCardForm.elements['link'].value,
    }
    handleLoadingState(submitButton, addCard(data.name, data.link), {
        successCallBack: (cardData) => {
            const cardElement = createCard(cardData, { handleCardLike, handleImageOpen }, currentUserId);
            placesList.prepend(cardElement);
            closeModal(newCardPopup);
        },
        errorCallback: (err) => {
            console.error('Ошибка при добавлении карточки:', err);
            alert('Не удалось сохранить изменения. Пожалуйста, попробуйте ещё раз.');
        }
    }
    );
}
addCardForm.addEventListener('submit', handleFormCardAdd);

// Card Image Open
function handleImageOpen({ link, name }) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
}


//Profile Picture Edit Open
profilePictureButton.addEventListener('click', () => {
    pfpForm.reset();
    clearValidation(pfpForm, validationConfig);
    openModal(pfpPopup)
})

const handlePfpFormSubmit = (evt) => {
    evt.preventDefault();

    const submitButton = pfpForm.querySelector('.popup__button');
    const link = pfpForm.elements['link'].value;

    handleLoadingState(submitButton, updateAvatar(link), {
        successCallBack: (data) => {
            profilePicture.style.backgroundImage = `url('${data.avatar}')`;
            closeModal(pfpPopup);
        },
        errorCallback: (err) => {
            console.error('Ошибка при обновлении аватара:', err);
            alert('Не удалось сохранить изменения. Пожалуйста, попробуйте ещё раз.');
        }
    })
}
pfpForm.addEventListener('submit', handlePfpFormSubmit);
enableValidation(validationConfig);

loadPageData();