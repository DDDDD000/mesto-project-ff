// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const userTemplate = document.querySelector('#card-template').content;

function createCard(cardLink, cardName) {

    const userCard = userTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = userCard.querySelector('.card__delete-button');

    userCard.querySelector('.card__image').src = cardLink;
    userCard.querySelector('.card__title').textContent = cardName;
    userCard.querySelector('.card__image').alt = cardName;

    placesList.append(userCard);
    deleteButton.addEventListener('click', function () {
        deleteCard(userCard)
    });
    return userCard
}

function deleteCard(userCard) {
    userCard.remove()
}

function showCards() {
    initialCards.forEach(element => {
        createCard(element.link, element.name)
    });
}

showCards()
