import PopupWithForm from './PopupWithForm'
import React from 'react'

function EditAvatarPopup(props) {
    const { isOpen, onClose, onUpdateAvatar } = props
    const refAvatar = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: refAvatar.current.value,
        });
    }

    React.useEffect(() => {
        refAvatar.current.value = ''
    }, [isOpen])

    return (
        <PopupWithForm
            name='popup-avatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input ref={refAvatar} id="avatar-input" className="popup__input popup-avatar__input" type="url" name="avatar" placeholder="Ссылка на аватар" required />
            <span className="avatar-input-error popup__error-hidden"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup