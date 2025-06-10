import { deleteCardFromServer, deleteLike, putLike } from "./api";

const userTemplate = document.querySelector('#card-template').content;

export function createCard(data, { handleCardLike, handleImageOpen }) {

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
        deleteButton.remove();
    }

    deleteButton.addEventListener('click', () => {
        deleteCardFromServer(data._id)
            .then(() => userCard.remove())
            .catch(err => console.error('Ошибка удаления:', err));
    });

    cardImage.addEventListener('click', () => handleImageOpen({
        link: data.link,
        name: data.name,
    }));

    const isLikedByMe = data.likes.some(like => like._id === "ba745ef116e75b64f2466c34")
    if (isLikedByMe) {
        cardLike.classList.add('card__like-button_is-active');
    }

    cardLike.addEventListener('click', (evt) => {
        handleCardLike(evt, data._id, likeCount)
    });

    return userCard
}
//Delete Card
export function deleteCard(userCard, cardId) {
    deleteCardFromServer(cardId)
        .then(() => {
            userCard.remove()
        })
        .catch(err => {
            console.error('Ошибка при удалении карточки:', err);
        })
}

//Image Like
export function handleCardLike(evt, cardId, likeCountElement) {
    const likeButton = evt.target;
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    const likePromise = isLiked ? deleteLike(cardId) : putLike(cardId)
    likePromise
        .then(updatedCard => {
            likeButton.classList.toggle('card__like-button_is-active')
            likeCountElement.textContent = updatedCard.likes.length;
        })
        .catch(err => {
            console.error('Ошибка при лайке:', err);
        });
}
