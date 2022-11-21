import { useEffect, useState } from "react"

function Login(props) {
    const [emailLog, setEmailLog] = useState('')
    const [passwordLog, setPasswordLog] = useState('')

    useEffect(() => {
        props.handleTextInLog()
    }, [])

    function onSubmit(e) {
        e.preventDefault()

        props.onUpdateLog({
            emailLog,
            passwordLog
        })
    }

    function handleChangeemailLog(e) {
        setEmailLog(e.target.value)
    }

    function handleChangePasswordLog(e) {
        setPasswordLog(e.target.value)
    }

    return (
        <>
            <h2 className="xx">
                Вход
            </h2>
            <form className="form_reg" onSubmit={onSubmit}>
                <input className="input_reg" value={emailLog} placeholder='Email' type='Email' onChange={handleChangeemailLog} />
                <input className="input_reg" value={passwordLog} placeholder='Пароль' type='password' onChange={handleChangePasswordLog} />
                <button className="button_reg" type="submit">Войти</button>
            </form>
        </>
    )
}

export default Login