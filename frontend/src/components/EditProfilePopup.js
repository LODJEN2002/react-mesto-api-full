import React, { useEffect } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
    const { isOpen, onClose, onUpdateUser } = props
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const currentUser = React.useContext(CurrentUserContext)

    useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser, isOpen])

    function handleChangeTitle(e) {
        setName(e.target.value)
    }

    function handleChangeSubtitle(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='profile-popup'
            title='Редактировать профиль'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input id="title-input" className="popup__input popup__input_field_title" onChange={handleChangeTitle} type="text" name="name" value={name || ''} placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="title-input-error popup__error-hidden"></span>
            <input id="subtitle-input" className="popup__input popup__input_field_subtitle" type="text" name="job" onChange={handleChangeSubtitle} value={description || ''} placeholder="Профессиональная деятельность" minLength="2" maxLength="200" required />
            <span className="subtitle-input-error popup__error-hidden popup__error-subtitle"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup