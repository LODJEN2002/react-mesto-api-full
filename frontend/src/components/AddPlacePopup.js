import PopupWithForm from './PopupWithForm'
import React from 'react'

function AddPlacePopup(props) {
    const { isOpen, onClose, onUpdateCards } = props
    const refTitle = React.useRef()
    const refSubtitle = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateCards({
            place: refTitle.current.value,
            link: refSubtitle.current.value
        })
    }

    React.useEffect(() => {
        refTitle.current.value = ''
        refSubtitle.current.value = ''
    }, [isOpen])

    return (
        <PopupWithForm
            name='popup-cards'
            title='Новое место'
            buttonText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input ref={refTitle} id="name-input" className="popup__input popup-cards__container-field-title-plus" type="text" name="field-text-title" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="name-input-error popup__error-hidden"></span>
            <input ref={refSubtitle} id="link-input" className="popup__input popup-cards__container-field-subtitle-plus" type="url" name="field-text-subtitle" placeholder="Ссылка на картинку" required />
            <span className="link-input-error popup__error-hidden popup__error-subtitle"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup