const userTemplate = document.querySelector('#card-template').content;

export function createCard(data, { deleteCard, handleCardLike, handleImageOpen }) {

    const userCard = userTemplate.querySelector('.places__item').cloneNode(true);

    const deleteButton = userCard.querySelector('.card__delete-button');
    const cardImage = userCard.querySelector('.card__image');
    const cardTitle = userCard.querySelector('.card__title');
    const cardAlternative = userCard.querySelector('.card__image');
    const cardLike = userCard.querySelector('.card__like-button')
    const likeCount = userCard.querySelector('.card__like-count');

    cardImage.src = data.link;
    cardTitle.textContent = data.name;
    cardAlternative.alt = data.name;
    likeCount.textContent = data.likes.length

    if (data.owner._id != 'ba745ef116e75b64f2466c34') {
        deleteButton.style.display = 'none';
    }

    deleteButton.addEventListener('click', () => deleteCard(userCard));

    cardImage.addEventListener('click', () => handleImageOpen({
        link: data.link,
        name: data.name,
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
