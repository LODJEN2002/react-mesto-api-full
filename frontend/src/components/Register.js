import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Register(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        props.use()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

        props.onUpdateReg({
            email,
            password
        })
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    return (
        <>
            <h2 className="xx">
                Регистрация
            </h2>
            <form className="form_reg" onSubmit={handleSubmit}>
                <input className="input_reg" value={email} onChange={handleChangeEmail} type='Email' placeholder="Email" />
                <input className="input_reg" value={password} onChange={handleChangePassword} type='password' placeholder="Пароль" />
                <button className="button_reg" type="submit" >Зарегистрироваться</button>
            </form>
            <p className="text_reg">Уже зарегистрированы?
                <Link className="link_reg" to="/sign-in"> Войти</Link>
            </p>
        </>
    )
}

export default Register