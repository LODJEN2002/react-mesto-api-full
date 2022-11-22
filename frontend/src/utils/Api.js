class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
        //   this._BASE_URL = 'https://auth.nomoreparties.co'
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkRes)
    }

    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkRes)
    }

    patchProfileInfo(name, job) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: job,
            })
        })
            .then(this._checkRes)
    }

    addNewCard(dataTitle, dataSubtitle) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: dataTitle,
                link: dataSubtitle,
            })
        })
            .then(this._checkRes)
    }

    newAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar `, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            })
        })
            .then(this._checkRes)
    }

    deliteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkRes)

    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._checkRes)
    }

    likeOffCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkRes)
    }
}

const api = new Api({
    baseUrl: 'http://158.160.37.170',
    headers: {
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdjOGViNjFkMmIwYTkxNmQyZjc3MmQiLCJpYXQiOjE2NjkxMDgwNjAsImV4cCI6MTY2OTcxMjg2MH0.mu0vx39W5u080fApQCxxfl3REqX8L0yiXP1MnjwMXqg',
        'Content-Type': 'application/json'
    }
});

export default api