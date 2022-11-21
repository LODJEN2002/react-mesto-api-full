import closeIcon from '../images/Close-Icon.svg'

//popup_opened
function InfoTooltip(props) {
    const { name, isOpen, onClose, popupText, popupImg } = props

    return (
        <div className={`popup ${name} ${isOpen ? `popup_opened` : ''}`} >
            <div className="popup__container">
                <img className="popup__close-icon" src={closeIcon} alt="Закрытие" onClick={onClose} />
                <img className='popup__img' src={popupImg} />
                <p className='popup__reg_text'>{popupText}</p>
            </div>
        </div>
    )
}

export default InfoTooltip 