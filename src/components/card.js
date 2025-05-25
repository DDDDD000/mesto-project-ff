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

//Image Like
function handleCardLike(evt) {
    if (evt.target.classList.contains('card__like-button'))
        evt.target.classList.toggle('card__like-button_is-active')
}
