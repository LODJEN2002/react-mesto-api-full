class Auth {
    constructor(options) {
        this._BASE_URL = options.BASE_URL
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`)
    }


    login(password, email) {
        return fetch(`${this._BASE_URL}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, email })
        })
            .then(this._checkRes)

    }

    register(password, email) {
        return fetch(`${this._BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password, email })
        })
            .then(this._checkRes)
    }

    checkToken(JWT) {
        return fetch(`${this._BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JWT}`
            },
        })
            .then(this._checkRes)
    }
}

const auth = new Auth({
    BASE_URL: 'http://api.domainname.students.nomoredomains.club'
});

export default auth