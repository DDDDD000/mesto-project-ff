// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const userTemplate = document.querySelector('#card-template').content;

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