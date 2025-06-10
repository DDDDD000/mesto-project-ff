const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profilePicture = document.querySelector('.profile__image');

export const getProfileInfo = () => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-40/users/me', {
        headers: {
            authorization: '3288a148-b765-4961-8ec1-f86ec90a7c0a',
        }
    })
        .then(res => res.json())
}

export const getCards = () => {
    return fetch('https://nomoreparties.co/v1/wff-cohort-40/cards', {
        headers: {
            authorization: '3288a148-b765-4961-8ec1-f86ec90a7c0a',
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error('Ошибка при загрузке карточек:', err);
            throw err;
        })
}

export const editProfile = (name, about) => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-40/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '3288a148-b765-4961-8ec1-f86ec90a7c0a',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, about })
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`)
            }
            return res.json();
        });
}

export const addCard = (name, link) => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-40/cards', {
        method: 'POST',
        headers: {
            authorization: '3288a148-b765-4961-8ec1-f86ec90a7c0a',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, link })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`);
            }
            return res.json()
        })
        .catch(err => {
            console.error("Ошибка в addCard:", err);
            throw err;
        });
}

const cardDelete = () => {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-40/cards', {
        method: 'DELETE',
        headers: {
            authorization: '3288a148-b765-4961-8ec1-f86ec90a7c0a',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, link })
    })
}