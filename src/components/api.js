const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-40',
    headers: {
        authorization: '3288a148-b765-4961-8ec1-f86ec90a7c0a',
        'Content-Type': 'application/json'
    }
}

export const getProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
        .then(getResponseData)
}

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
        .then(getResponseData)
}

export const editProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about })
    })
        .then(getResponseData)
}

export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    })
        .then(getResponseData)
}

export const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(getResponseData)
}

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(getResponseData)
}

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(getResponseData)
}

export const updateAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: link })
    })
        .then(getResponseData)
}

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}