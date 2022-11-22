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
    baseUrl: 'https://api.domainname.students.nomoredomains.club',
    headers: {
        authorization: 'cfdf9933bdd2a52dbec6c991352bc5d4e70b7cd9c27bbac079dc72e1c47db40b',
        'Content-Type': 'application/json'
    }
});

export default api