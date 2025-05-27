const userTemplate = document.querySelector('#card-template').content;

export function createCard(data, { deleteCard, handleCardLike, handleImageOpen }) {

    const userCard = userTemplate.querySelector('.places__item').cloneNode(true);

    const deleteButton = userCard.querySelector('.card__delete-button');
    const cardImage = userCard.querySelector('.card__image');
    const cardTitle = userCard.querySelector('.card__title');
    const cardAlternative = userCard.querySelector('.card__image');
    const cardLike = userCard.querySelector('.card__like-button')

    cardImage.src = data.link;
    cardTitle.textContent = data.name;
    cardAlternative.alt = data.name;

    deleteButton.addEventListener('click', () => deleteCard(userCard));

    cardImage.addEventListener('click', (evt) => handleImageOpen({
        link: data.link,
        name: data.name,
        target: evt.target
    }));

    cardLike.addEventListener('click', (evt) => handleCardLike(evt));

    return userCard
}
//Delete Card
export function deleteCard(userCard) {
    userCard.remove()
}

//Image Like
export function handleCardLike(evt) {
    if (evt.target.classList.contains('card__like-button'))
        evt.target.classList.toggle('card__like-button_is-active')
}
