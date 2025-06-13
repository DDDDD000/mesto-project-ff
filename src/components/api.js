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
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
        .catch(err => {
            console.error('Ошибка при загрузке профиля:', err);
            throw err;
        });
}

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers,
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
        .catch(err => {
            console.error('Ошибка при загрузке карточек:', err);
            throw err;
        });
}

export const editProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ name, about })
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
        .catch(err => {
            console.error('Ошибка при обновлении профиля:', err);
            throw err;
        });
}

export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({ name, link })
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`);
            }
            return res.json()
        })
        .catch(err => {
            console.error("Ошибка при добавлении карточки:", err);
            throw err;
        });
}

export const deleteCardFromServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
        .catch(err => {
            console.error('Ошибка при удалении карточки:', err);
            throw err;
        });
}

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
        .catch(err => {
            console.error('Ошибка при попытке поставить лайк:', err);
            throw err;
        });
}

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
        .catch(err => {
            console.error('Ошибка при попытке убрать лайк:', err);
            throw err;
        });
}

export const updateAvatar = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: link })
    })
        .then(res => {
            if (!res.ok) {
                return Promise.reject(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
        .catch(err => {
            console.error('Ошибка при обновления аватара:', err);
            throw err;
        });
}